const {test, expect} = require('playwright/test');
test('browser context test', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']")).toBeVisible();
    await expect(page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']")).toHaveAttribute("href", "https://rahulshettyacademy.com/documents-request");
    await page.waitForTimeout(3000);
});