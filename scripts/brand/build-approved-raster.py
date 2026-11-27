#!/usr/bin/env python3
"""Render raster compatibility assets from the approved Aprincar SVG identity.

The SVG files are canonical. Never crop branding out of an infographic or reuse
unrelated illustration tiles as logos. This script produces only deterministic
raster fallbacks for app/hub consumers.
"""
from pathlib import Path
from shutil import copy2
import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
APP = ROOT / "apps/app/public/brand"
HUB = ROOT / "apps/hub/public/brand"

MAPPINGS = (
    ("logo-horizontal.svg", "logo-horizontal-approved.png", 1490),
    ("logo-horizontal-dark.svg", "logo-horizontal-approved-dark.png", 1490),
    ("logo-horizontal.svg", "logo-wordmark-approved.png", 1490),
    ("logo-symbol.svg", "logo-symbol-approved.png", 440),
    ("app-icon.svg", "app-icon-approved.png", 440),
)

HUB.mkdir(parents=True, exist_ok=True)
for source_name, target_name, output_width in MAPPINGS:
    source = APP / source_name
    target = APP / target_name
    cairosvg.svg2png(
        bytestring=source.read_bytes(),
        write_to=str(target),
        output_width=output_width,
    )
    with Image.open(target) as image:
        if image.mode != "RGBA":
            raise RuntimeError(f"{target}: SVG lost transparency")
        if image.getpixel((0, 0))[3] != 0:
            raise RuntimeError(f"{target}: non-transparent top-left corner")
        print(target_name, image.size, "RGBA")
    copy2(target, HUB / target_name)

# The hub must use the exact same human mascot, not an alternative mascot.
for name in ("mascot-approved.png", "mascot-approved.webp"):
    copy2(APP / name, HUB / name)
