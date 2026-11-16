import { test, expect } from '@playwright/test';
test('browser context test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();
     // Wait for next page to load
    console.log(await page.locator(".card-body a").first().textContent()); 
    console.log(await page.locator(".card-body a").nth(1).textContent()); // Print title of next page
     // Close the browser
});