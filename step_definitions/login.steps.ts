import { Before, After, Given, Then, When } from '@cucumber/cucumber';
import { chromium, expect, type Browser, type Page } from '@playwright/test';
import { LoginPage2 } from '../pages/loginPage2';

const baseURL = 'https://practice.expandtesting.com/login';
const username = 'practice';
const password = 'SuperSecretPassword!';

let browser: Browser;
let page: Page;
let loginPage: LoginPage2;

Before({ timeout: 90000 }, async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage2(page);
});

Given('the user is on the login page', async function () {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
});

Given('the user logs in with valid credentials with', async function () {
  await loginPage.login(username, password);
});

Then('the user should see the logout link', async function () {
  await expect(loginPage.logoutLink).toBeVisible();
});

When('the user clicks the Tips link', async function () {
  await loginPage.clickTips();
});

Then('the user should be on the Tips page', async function () {
  await expect(page).toHaveURL(/tips/i);
});

When('the user clicks the Test Cases link', async function () {
  await loginPage.clickTestCases();
});

Then('the user should be on the Test Cases page', async function () {
  await expect(page).toHaveURL(/test-cases/i);
});

When('the user clicks the API Testing link', async function () {
  await loginPage.clickApiTest();
  await page.waitForURL(/api-docs/i);
});

Then('the user should be on the API Docs page', async function () {
  await expect(page).toHaveURL(/api-docs/i);
});

After({ timeout: 30000 }, async function () {
  await browser.close();
});
