import { test, expect } from '@playwright/test';
test('browser context test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('teach');
    await expect(dropdown).toHaveValue('teach');

    // wait 3 seconds after selecting the teacher option before clicking sign in
    await page.waitForTimeout(3000);

    await page.locator('#signInBtn').click();
});