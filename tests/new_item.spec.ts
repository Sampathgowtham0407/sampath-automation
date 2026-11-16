import { test, expect } from '@playwright/test';

test('capture screenshot on SauceDemo homepage', async ({page}) =>
{
    await page.goto('https://www.saucedemo.com/');

    const randomNum = Math.floor(Math.random() * 1000);
    const username = `standard_user_${randomNum}`;
    console.log(username);
    await page.screenshot({path: 'screenshot.png'});
    
});

test('capture a second screenshot on SauceDemo homepage', async ({page}) =>
{
    await page.goto('https://www.saucedemo.com/');

    const randomNum = Math.floor(Math.random() * 1000);
    const username = `standard_user_${randomNum}`;
    console.log(username);
    await page.screenshot({path: 'screenshot.png'});
    
});

test('capture screenshot on alternate SauceDemo URL', async ({page}) =>
{
    await page.goto('https://www.saucedemo1.com/');

    const randomNum = Math.floor(Math.random() * 1000);
    const username = `standard_user_${randomNum}`;
    console.log(username);
    await page.screenshot({path: 'screenshot.png'});
    
});

    