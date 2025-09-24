import { test, expect } from '@playwright/test';

test('login flow works correctly', async ({ page }) => {
  await page.goto('/auth/sign-in');
  
  await page.fill('[name="email"]', 'admin@ciser.com.br');
  await page.fill('[name="password"]', 'demo123');
  
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL(/app\/captura/);
  await expect(page.getByText('Captura e Análise')).toBeVisible();
});

test('invalid credentials show error', async ({ page }) => {
  await page.goto('/auth/sign-in');
  
  await page.fill('[name="email"]', 'invalid@email.com');
  await page.fill('[name="password"]', 'wrongpassword');
  
  await page.click('button[type="submit"]');
  
  await expect(page.getByText(/credenciais inválidas/i)).toBeVisible();
});