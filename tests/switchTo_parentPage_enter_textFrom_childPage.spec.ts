import { test, expect } from '@playwright/test';
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
    // this step is to copy the text from child page and switch back to parent page and enter the text in input box
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    //this step is to switch back to parent page and enter the text read from child page in the input box
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());

    // keep the browser open for 3 seconds before the test ends (so you can see the filled input)
    await page.waitForTimeout(3000);
});