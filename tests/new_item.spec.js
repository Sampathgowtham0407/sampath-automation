const {test, expect} = require('playwright/test');

test('browser context test', async ({page}) =>
{
    await page.goto('https://www.saucedemo.com/');

    const randomNum = Math.floor(Math.random() * 1000);
    const username = `standard_user_${randomNum}`;
    console.log(username);
    await page.screenshot({path: 'screenshot.png'});
    
});