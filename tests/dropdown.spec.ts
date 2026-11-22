import { test, expect } from '@playwright/test';

test('dropdown',async ({ page }) => {
    await page.goto("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_option_label")
    await page.frameLocator('#iframeResult').getByRole('combobox').selectOption({label:'Audi'})
    await page.waitForTimeout(2000)
});