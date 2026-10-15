#!/usr/bin/env python3
"""Derive genuinely transparent assets from the approved raster assets.

Do not redraw or restyle the symbol or mascot here. The existing approved
rasters are treated as source pixels; only the surrounding background is
isolated, and the transparent result is shared by App and Hub.
"""
from pathlib import Path
import json
import shutil
import cv2
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "apps/app/public/brand"
HUB = ROOT / "apps/hub/public/brand"


def trim(image, pad=6):
    alpha = np.asarray(image.getchannel("A"))
    ys, xs = np.where(alpha > 14)
    if len(xs) == 0:
        raise RuntimeError("Image contains no foreground pixels")
    x1, x2 = max(0, int(xs.min()) - pad), min(image.width, int(xs.max()) + pad + 1)
    y1, y2 = max(0, int(ys.min()) - pad), min(image.height, int(ys.max()) + pad + 1)
    return image.crop((x1, y1, x2, y2))


def knockout_brand_background(image):
    rgba = np.asarray(image.convert("RGBA")).copy()
    rgb = rgba[..., :3].astype(np.int16)
    # Use the actual four edge corners as the background key, not a hard-coded
    # white-only threshold. The white play knockout remains transparent.
    corners = np.stack([rgb[0, 0], rgb[-1, 0], rgb[0, -1], rgb[-1, -1]])
    bg = np.median(corners, axis=0)
    distance = np.linalg.norm(rgb.astype(np.float32) - bg.astype(np.float32), axis=2)
    key_alpha = np.clip((distance - 7.0) * (255.0 / 31.0), 0, 255).astype(np.uint8)
    rgba[..., 3] = np.minimum(rgba[..., 3], key_alpha)
    # Eliminate fringe color contamination at partially transparent edges.
    amount = rgba[..., 3].astype(np.float32) / 255
    mask = (amount > .01) & (amount < .995)
    for channel in range(3):
        v = rgba[..., channel].astype(np.float32)
        v[mask] = np.clip((v[mask] - bg[channel] * (1 - amount[mask])) / amount[mask], 0, 255)
        rgba[..., channel] = v.astype(np.uint8)
    return trim(Image.fromarray(rgba, "RGBA"))


def isolate_mascot(image):
    rgba = np.asarray(image.convert("RGBA")).copy()
    h, w = rgba.shape[:2]
    # The illustration may have already-transparent edges or a painted studio
    # background. Segment the main person using sure foreground/background seeds.
    rgb = rgba[..., :3].copy()
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    mask = np.full((h, w), cv2.GC_PR_BGD, np.uint8)
    border_x, border_y = max(3, int(w * .045)), max(3, int(h * .035))
    mask[:border_y, :] = cv2.GC_BGD
    mask[-border_y:, :] = cv2.GC_BGD
    mask[:, :border_x] = cv2.GC_BGD
    mask[:, -border_x:] = cv2.GC_BGD
    mask[rgba[..., 3] < 12] = cv2.GC_BGD

    # Central positive seeds are deliberately inside the face and the shirt;
    # white shirt pixels are retained instead of being keyed out as background.
    cv2.ellipse(mask, (int(w * .51), int(h * .42)),
                (max(3, int(w * .14)), max(3, int(h * .19))),
                0, 0, 360, cv2.GC_FGD, -1)
    cv2.ellipse(mask, (int(w * .51), int(h * .69)),
                (max(3, int(w * .12)), max(3, int(h * .11))),
                0, 0, 360, cv2.GC_FGD, -1)
    outer = max(6, int(min(w, h) * .06))
    mask[outer:h-outer, outer:w-outer] = np.where(
        mask[outer:h-outer, outer:w-outer] == cv2.GC_PR_BGD,
        cv2.GC_PR_FGD,
        mask[outer:h-outer, outer:w-outer],
    )
    bg_model = np.zeros((1, 65), np.float64)
    fg_model = np.zeros((1, 65), np.float64)
    cv2.grabCut(bgr, mask, None, bg_model, fg_model, 8, cv2.GC_INIT_WITH_MASK)
    fg = np.isin(mask, [cv2.GC_FGD, cv2.GC_PR_FGD]).astype(np.uint8)
    n, labels, stats, centers = cv2.connectedComponentsWithStats(fg)
    if n < 2:
        raise RuntimeError("Mascot segmentation found no foreground")
    center_x, center_y = w * .5, h * .5
    valid = [
        i for i in range(1, n)
        if stats[i, cv2.CC_STAT_AREA] > int(w * h * .002)
        and abs(centers[i, 0] - center_x) < w * .45
        and abs(centers[i, 1] - center_y) < h * .46
    ]
    fg = np.isin(labels, valid).astype(np.uint8) * 255
    # Preserve clothing/face interior holes — do not punch white areas out.
    filled = fg.copy()
    contours, _ = cv2.findContours(filled, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(filled, contours, -1, 255, -1)
    k = max(3, (min(w, h) // 170) * 2 + 1)
    filled = cv2.morphologyEx(filled, cv2.MORPH_CLOSE, np.ones((k, k), np.uint8))
    feathered = cv2.GaussianBlur(filled, (3, 3), .65)
    rgba[..., 3] = np.minimum(rgba[..., 3], feathered)
    return trim(Image.fromarray(rgba, "RGBA"))


def inspect(path, name):
    im = Image.open(path).convert("RGBA")
    a = np.asarray(im.getchannel("A"))
    transparent = float(np.mean(a == 0))
    # Ensure actual alpha bytes, not painted faux-transparency.
    if transparent < .035:
        raise RuntimeError(f"{name}: insufficient transparent pixels: {transparent:.2%}")
    if any(int(a[y, x]) > 5 for y, x in
           [(0, 0), (0, im.width-1), (im.height-1, 0), (im.height-1, im.width-1)]):
        raise RuntimeError(f"{name}: nontransparent corner")
    return {"width": im.width, "height": im.height, "fully_transparent_fraction": round(transparent, 4)}


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    HUB.mkdir(parents=True, exist_ok=True)
    outputs = {}

    # Source files remain untouched for reproducibility; versioned v4 names
    # invalidate old iOS/Safari caching of the previously incorrect WebP.
    mascot = isolate_mascot(Image.open(BRAND / "mascot-approved.png"))
    mascot.save(BRAND / "mascot-approved-v4.png", optimize=True)
    mascot.save(BRAND / "mascot-approved-v4.webp", "WEBP", lossless=True, method=6)
    outputs["mascot"] = inspect(BRAND / "mascot-approved-v4.png", "mascot")

    for original, target in [
        ("logo-horizontal-approved.png", "logo-horizontal-approved-v4.png"),
        ("logo-horizontal-approved-dark.png", "logo-horizontal-approved-dark-v4.png"),
        ("logo-symbol-approved.png", "logo-symbol-approved-v4.png"),
    ]:
        cleaned = knockout_brand_background(Image.open(BRAND / original))
        cleaned.save(BRAND / target, optimize=True)
        outputs[target] = inspect(BRAND / target, target)

    for filename in [
        "mascot-approved-v4.png", "mascot-approved-v4.webp",
        "logo-horizontal-approved-v4.png",
        "logo-horizontal-approved-dark-v4.png",
        "logo-symbol-approved-v4.png"
    ]:
        shutil.copy2(BRAND / filename, HUB / filename)

    report = ROOT / "docs/design/APPROVED_BRAND_ALPHA_QA.json"
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(json.dumps(outputs, indent=2) + "\n")
    print(json.dumps(outputs, indent=2))


if __name__ == "__main__":
    main()
