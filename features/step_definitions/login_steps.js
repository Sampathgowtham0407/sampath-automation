const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(60 * 1000);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

Given('I open the login page', async function () {
  await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

When('I choose the second radio button', async function () {
  await this.page.locator('.radiotextsty').nth(1).click();
  await this.page.locator('#okayBtn').click();
});

Then('the second radio button should be selected', async function () {
  await expect(this.page.locator('.radiotextsty').nth(1)).toBeChecked();
});
