import { test, expect } from '@playwright/test';
test('browser context test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    // here we can add assertions , but is not rqquired as of now. 
    // below line is assertion to check if the radio button is checked or not
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.waitForTimeout(3000);
});