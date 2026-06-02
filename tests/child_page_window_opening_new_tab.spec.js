const {test, expect} = require('playwright/test');
test('store variable to use again', async ({browser}) => {
    const Context = await browser.newContext();
    const page = await Context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkingTextLocator = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");
    const [newPage] = await Promise.all([
        Context.waitForEvent('page'),
        blinkingTextLocator.click(),
    ])
    //below step is to read the text from the new page opened in new tab
    const text = await newPage.locator(".im-para.red").textContent();
    console.log(text);
});