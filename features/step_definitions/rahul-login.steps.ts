import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { chromium, expect, type Browser, type Page } from '@playwright/test';
import { createInterface } from 'node:readline/promises';
import { RahulLoginPage } from '../../pages/rahulLoginPage';

const loginUrl = 'https://rahulshettyacademy.com/loginpagePractise/';

let browser: Browser;
let page: Page;
let loginPage: RahulLoginPage;
let username: string;
let password: string;

Before({ timeout: 120000 }, async function () {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  username = await prompt.question('Username: ');
  password = await prompt.question('Password: ');
  prompt.close();

  if (!username.trim() || !password) {
    throw new Error('Username and password must not be empty.');
  }

  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new RahulLoginPage(page);
});

After({ timeout: 30000 }, async function () {
  if (browser) {
    await browser.close();
  }
});

Given('the user opens the Rahul Shetty Academy login page', async function () {
  await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
});

When(
  'the user signs in with credentials entered in the terminal',
  async function () {
    await loginPage.login(username, password);
  },
);

Then('the user should be redirected to the shop page', async function () {
  await expect(page).toHaveURL(/\/angularpractice\/shop\/?$/, { timeout: 15000 });
});

When('the user clicks the Category 1 link', async function () {
  await loginPage.clickCategory1();
});
