import { test, expect } from '@playwright/test';
import { completeOnboarding } from './helpers';

test.describe('Library and Offline Persistence', () => {
  test('adds game to library, caches offline and persists across reload', async ({ page }) => {
    await completeOnboarding(page, 'Maya');

    await page.getByRole('link', { name: 'Jogos', exact: true }).click();

    // 2. Add "Mundo das Cores" to library
    const colorCard = page.locator('[data-game-id]', { hasText: 'Mundo das Cores' });
    await expect(colorCard).toBeVisible();
    await colorCard.getByRole('button', { name: 'Biblioteca' }).click();

    // 3. Prepare offline
    const offlineBtn = colorCard.getByRole('button', { name: 'Disponibilizar offline' });
    await offlineBtn.click();
    await expect(colorCard.getByText('Offline pronto')).toBeVisible();

    // 4. Check Library page
    await page.getByRole('link', { name: 'Perfil', exact: true }).click();
    await page.getByRole('link', { name: /Favoritos e biblioteca/ }).click();
    await expect(page.getByRole('heading', { name: 'Biblioteca', exact: true })).toBeVisible();
    await expect(page.locator('[data-game-id]', { hasText: 'Mundo das Cores' })).toBeVisible();

    // 5. Reload page and check local-first state is preserved from Dexie
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Biblioteca', exact: true })).toBeVisible();
    await expect(page.locator('[data-game-id]', { hasText: 'Mundo das Cores' })).toBeVisible();
    await expect(
      page.locator('[data-game-id]', { hasText: 'Mundo das Cores' }).getByText('Offline pronto'),
    ).toBeVisible();
  });
});
