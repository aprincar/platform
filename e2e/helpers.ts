import { expect, type Frame, type Page } from '@playwright/test';

export type GameTarget = {
  value: string | number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  kind?: string;
  normalized?: { x: number; y: number };
};

export type GameState = {
  mode: string;
  variant?: string;
  familyId?: string;
  objective?: string;
  level: number;
  challenge: Record<string, unknown> & {
    answer?: string | number;
    options?: Array<string | number>;
    cards?: Array<{ id: string; pairId: string; value: string }>;
    pairs?: number;
  };
  targets: GameTarget[];
  viewport?: {
    width: number;
    height: number;
    portrait?: boolean;
  };
  selectedCount?: number;
  inputReady?: boolean;
  lastResult?: string | null;
  lastGesture?: string;
  matchedPairs?: number;
  moves?: number;
  strokeCount?: number;
  paintSaved?: boolean;
  paintStrokeCount?: number;
};

declare global {
  interface Window {
    __APRINCAR_GAME_STATE__?: GameState;
  }
}

export async function completeOnboarding(page: Page, name: string) {
  await page.goto('/');
  const state = await Promise.race([
    page
      .waitForSelector('text=Mundos de Descoberta', { timeout: 8000 })
      .then(() => 'home')
      .catch(() => null),
    page
      .waitForSelector('text=Quem vai brincar?', { timeout: 8000 })
      .then(() => 'onboarding')
      .catch(() => null),
  ]);

  if (state === 'home') {
    return;
  }

  if (state !== 'onboarding') {
    await page.goto('/onboarding');
  }

  const onboardingHeading = page.getByRole('heading', { name: 'Quem vai brincar?' });
  await expect(onboardingHeading).toBeVisible({ timeout: 15000 });
  await page.getByLabel('Nome ou apelido').fill(name);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Quantos anos?' })).toBeVisible({
    timeout: 10000,
  });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'O que já gosta de explorar?' })).toBeVisible({
    timeout: 10000,
  });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Interesses' })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Tempo para brincar' })).toBeVisible({
    timeout: 10000,
  });
  await page.getByRole('button', { name: 'Criar meu espaço' }).click();
  await expect(page.getByRole('heading', { name: 'Mundos de Descoberta' })).toBeVisible({
    timeout: 15000,
  });
}

export async function openGame(page: Page, gameId: string, title: string) {
  if (!page.url().includes('/discover')) {
    await page.getByRole('link', { name: 'Descobrir', exact: true }).click();
  }
  const card = page.locator(`[data-game-id="${gameId}"]`);
  await expect(card).toBeVisible({ timeout: 15000 });
  await card.getByRole('button', { name: 'Jogar' }).click();
  const iframe = page.locator(`iframe[title="${title}"]`);
  await expect(iframe).toBeVisible({ timeout: 15000 });
  const handle = await iframe.elementHandle();
  const frame = await handle?.contentFrame();
  expect(frame).toBeTruthy();
  await expect
    .poll(async () => Boolean(await frame!.evaluate(() => window.__APRINCAR_GAME_STATE__)), {
      timeout: 15000,
    })
    .toBe(true);
  return { frame: frame!, iframe };
}

export async function getGameState(frame: Frame): Promise<GameState> {
  const state = await frame.evaluate(() => window.__APRINCAR_GAME_STATE__);
  expect(state).toBeTruthy();
  return state!;
}

export async function waitForGameInput(frame: Frame) {
  await expect.poll(async () => (await getGameState(frame)).inputReady).toBe(true);
}

async function canvasBox(frame: Frame) {
  const canvas = frame.locator('canvas');
  await expect(canvas).toBeVisible();
  const box = await canvas.boundingBox();
  expect(box).toBeTruthy();
  return box!;
}

function logicalViewport(state: GameState) {
  const width = state.viewport?.width;
  const height = state.viewport?.height;
  if (
    typeof width === 'number' &&
    typeof height === 'number' &&
    Number.isFinite(width) &&
    Number.isFinite(height) &&
    width > 0 &&
    height > 0
  ) {
    return { width, height };
  }
  return { width: 960, height: 640 };
}

async function canvasPoint(frame: Frame, logical: { x: number; y: number }) {
  const box = await canvasBox(frame);
  const state = await getGameState(frame);
  const viewport = logicalViewport(state);
  return {
    x: box.x + (logical.x / viewport.width) * box.width,
    y: box.y + (logical.y / viewport.height) * box.height,
  };
}

export async function clickCanvasTarget(page: Page, frame: Frame, target: GameTarget) {
  expect(target.x).toBeDefined();
  expect(target.y).toBeDefined();
  const point = await canvasPoint(frame, { x: target.x!, y: target.y! });
  await page.mouse.click(point.x, point.y);
}

export async function dragCanvasTarget(page: Page, frame: Frame, from: GameTarget, to: GameTarget) {
  expect(from.x).toBeDefined();
  expect(from.y).toBeDefined();
  expect(to.x).toBeDefined();
  expect(to.y).toBeDefined();

  const start = await canvasPoint(frame, { x: from.x!, y: from.y! });
  const end = await canvasPoint(frame, { x: to.x!, y: to.y! });

  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, { steps: 12 });
  await page.mouse.up();
}

export async function drawCanvasStroke(
  page: Page,
  frame: Frame,
  points: Array<{ x: number; y: number }>,
) {
  expect(points.length).toBeGreaterThan(1);
  const [first, ...rest] = points;
  expect(first).toBeTruthy();

  const start = await canvasPoint(frame, first!);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();

  for (const point of rest) {
    const next = await canvasPoint(frame, point);
    await page.mouse.move(next.x, next.y, { steps: 5 });
  }

  await page.mouse.up();
}

export async function drawCanvasStrokeInTarget(
  page: Page,
  frame: Frame,
  target: GameTarget,
  points: Array<{ x: number; y: number }>,
) {
  expect(target.x).toBeDefined();
  expect(target.y).toBeDefined();
  expect(target.w).toBeDefined();
  expect(target.h).toBeDefined();
  expect(points.length).toBeGreaterThan(1);

  const left = target.x! - target.w! / 2;
  const top = target.y! - target.h! / 2;
  const logicalPoints = points.map((point) => ({
    x: left + point.x * target.w!,
    y: top + point.y * target.h!,
  }));

  await drawCanvasStroke(page, frame, logicalPoints);
}

export async function clickThreeTarget(page: Page, frame: Frame, target: GameTarget) {
  if (Number.isFinite(target.x) && Number.isFinite(target.y)) {
    const point = await canvasPoint(frame, { x: target.x!, y: target.y! });
    await page.mouse.click(point.x, point.y);
    return;
  }

  expect(target.normalized).toBeTruthy();
  const box = await canvasBox(frame);
  await page.mouse.click(
    box.x + target.normalized!.x * box.width,
    box.y + target.normalized!.y * box.height,
  );
}
