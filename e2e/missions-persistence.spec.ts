import { test, expect } from '@playwright/test';
import { completeOnboarding } from './helpers';

test('offline missions persist and remain isolated between child profiles', async ({ page }) => {
  await completeOnboarding(page, 'Sofia');
  await page.goto('/missions');
  const mission = page.locator('[data-mission-id]').first();
  await expect(mission).toBeVisible();
  const id = await mission.getAttribute('data-mission-id');
  expect(id).toBeTruthy();
  const card = page.locator(`[data-mission-id="${id}"]`);
  await card.getByRole('button', { name: /Fizemos/ }).click();
  await expect(card.getByRole('button', { name: /Missão concluída/ })).toBeVisible();
  await page.reload();
  await expect(card.getByRole('button', { name: /Missão concluída/ })).toBeVisible();
  await page.getByRole('button', { name: 'Menu de perfis' }).click();
  await page.getByRole('menuitem', { name: 'Adicionar perfil' }).click();
  await page.getByLabel('Nome ou apelido').fill('Lucas');
  await page.getByRole('button', { name: 'Criar perfil' }).click();
  await expect(page.getByRole('button', { name: 'Menu de perfis' })).toContainText('Lucas');
  await expect(card.getByRole('button', { name: /Fizemos/ })).toBeVisible();
  await page.getByRole('button', { name: 'Menu de perfis' }).click();
  await page.getByRole('menuitem', { name: 'Sofia' }).click();
  await expect(card.getByRole('button', { name: /Missão concluída/ })).toBeVisible();
});
