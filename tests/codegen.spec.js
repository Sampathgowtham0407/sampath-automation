import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.programiz.com/javascript/online-compiler/');
  await page.getByRole('button', { name: 'Run' }).click();
  await page.getByRole('button', { name: 'Clear' }).click();
});