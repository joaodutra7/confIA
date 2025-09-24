import { test, expect } from '@playwright/test';

test('landing page loads correctly', async ({ page }) => {
  await page.goto('/');
  
  await expect(page).toHaveTitle(/CISER CorroScan/);
  await expect(page.getByText('Detecção de corrosão em tempo real por IA')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Começar agora' })).toBeVisible();
});

test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  await page.click('text=Entrar');
  await expect(page).toHaveURL(/auth\/sign-in/);
  
  await expect(page.getByText('Digite suas credenciais')).toBeVisible();
});