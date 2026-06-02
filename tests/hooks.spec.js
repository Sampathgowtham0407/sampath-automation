const {test, expect} = require('playwright/test');

const loginUrl = 'https://rahulshettyacademy.com/loginpagePractise/';

test.beforeEach(async ({page}) => {
    await page.goto(loginUrl);
});

test('browser context test - terms checkbox', async ({page}) =>
{
    console.log(await page.title());
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();
    await page.waitForTimeout(3000);
});

test('browser context test - login as teacher', async ({page}) =>
{
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