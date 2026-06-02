const {test, expect} = require('playwright/test');

test('store variable to use again', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Store a locator in a variable
    const blinkingTextLocator = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");
    
    // Use the stored locator
    await expect(blinkingTextLocator).toBeVisible();
    await expect(blinkingTextLocator).toHaveAttribute("href", "https://rahulshettyacademy.com/documents-request");
});