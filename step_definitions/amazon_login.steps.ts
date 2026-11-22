import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { chromium, expect, type Browser, type Page } from '@playwright/test';
import 'dotenv/config';
import { AmazonLoginPage } from '../pages/amazonLoginPage';

let browser: Browser;
let page: Page;
let amazonLoginPage: AmazonLoginPage;
let username: string;
let password: string;

Before({ timeout: 120000 }, async function () {
  username = process.env.AMAZON_USERNAME ?? '';
  password = process.env.AMAZON_PASSWORD ?? '';

  if (!username.trim() || !password) {
    throw new Error(
      'Set AMAZON_USERNAME and AMAZON_PASSWORD in the project .env file before running this scenario.',
    );
  }

  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  amazonLoginPage = new AmazonLoginPage(page);
});

After({ timeout: 30000 }, async function () {
  if (browser) {
    await browser.close();
  }
});

export function getAmazonPage(): Page {
  if (!page) {
    throw new Error('The Amazon page has not been initialized.');
  }

  return page;
}

Given('the user opens the Amazon home page', { timeout: 90000 }, async function () {
  await amazonLoginPage.open();
});

When(
  'the user signs in to Amazon with credentials from the environment',
  { timeout: 90000 },
  async function () {
    await amazonLoginPage.signIn(username, password);
  },
);

Then(
  'the Amazon account greeting should be visible',
  { timeout: 90000 },
  async function () {
    await expect(amazonLoginPage.accountGreeting).toContainText('Hello', {
      timeout: 60000,
    });
  },
);

Then(
  'the Amazon sign-in prompt should no longer be visible',
  { timeout: 30000 },
  async function () {
    await expect(amazonLoginPage.signInLink).not.toBeVisible();
  },
);
