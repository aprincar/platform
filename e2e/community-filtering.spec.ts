import { test, expect } from '@playwright/test';
import { completeOnboarding, confirmAdult } from './helpers';

test.describe('Child Mode Community Games Filtering', () => {
  test('hides community games by default and keeps the responsible opt-in protected in settings', async ({
    page,
  }) => {
    await completeOnboarding(page, 'Clara');
    await page.getByRole('link', { name: 'Jogos', exact: true }).click();
    await expect(page.locator('[data-game-id]').getByText('Comunidade')).toHaveCount(0);

    await page.getByLabel('Menu de perfis').click();
    await page.getByRole('menuitem', { name: 'Configurações' }).click();
    await confirmAdult(page);
    const toggle = page.getByRole('switch', { name: 'Mostrar jogos da comunidade' });
    await expect(toggle).not.toBeChecked();
    await toggle.click();
    await expect(toggle).toBeChecked();
  });
});
