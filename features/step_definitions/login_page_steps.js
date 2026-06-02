const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

setDefaultTimeout(60 * 1000);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

Given('I open the login page', async function () {
  await this.loginPage.open();
});

Then('I should see the username field', async function () {
  await expect(this.loginPage.username).toBeVisible();
});

Then('I should see the password field', async function () {
  await expect(this.loginPage.password).toBeVisible();
});

Then('I should see the sign in button', async function () {
  await expect(this.loginPage.signInButton).toBeVisible();
});

Then('I should see the user type radio options', async function () {
  await expect(this.loginPage.radioButtons.first()).toBeVisible();
});

When('I log in with username {string} and password {string}', async function (username, password) {
  await this.loginPage.selectUserType(1);
  await this.loginPage.fillCredentials(username, password);
  await this.loginPage.submit();
});

Then('I should be redirected to the shop page', async function () {
  await this.loginPage.assertShopPageVisible();
});

Then('I should see the products list', async function () {
  await expect(this.loginPage.productCard).toBeVisible();
});
