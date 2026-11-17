import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { chromium, expect, type Browser, type Page } from '@playwright/test';
import { createInterface } from 'node:readline/promises';
import { RahulLoginPage } from '../../pages/rahulLoginPage';

const loginUrl = 'https://rahulshettyacademy.com/loginpagePractise/';

let browser: Browser;
let page: Page;
let loginPage: RahulLoginPage;
let username: string;
let loginPassword: string;
let formPassword: string;

Before({ timeout: 120000 }, async function () {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  username = await prompt.question('Login username: ');
  loginPassword = await prompt.question('Login password: ');
  formPassword = await prompt.question('Home form password: ');
  prompt.close();

  if (!username.trim() || !loginPassword || !formPassword) {
    throw new Error('Login username, login password, and home form password must not be empty.');
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
    await loginPage.login(username, loginPassword);
  },
);

Then('the user should be redirected to the shop page', async function () {
  await expect(page).toHaveURL(/\/angularpractice\/shop\/?$/, { timeout: 15000 });
});

When('the user clicks the Category 1 link', async function () {
  await loginPage.clickCategory1();
});

When('the user opens the Home form', async function () {
  await loginPage.openHomeForm();
});

Then('the user should be on the Home form page', async function () {
  await expect(page).toHaveURL(/\/angularpractice\/?$/, { timeout: 15000 });
  await expect(loginPage.nameInput).toBeVisible();
});

When('the user fills the Home form with the requested details', async function () {
  await loginPage.fillHomeForm({
    name: 'sampath',
    email: 'sam@yopmail.com',
    password: formPassword,
    dateOfBirth: '2000-01-30',
  });
});

Then('the Home form should show the requested values and selections', async function () {
  await expect(loginPage.nameInput).toHaveValue('sampath');
  await expect(loginPage.emailInput).toHaveValue('sam@yopmail.com');
  await expect(loginPage.formPasswordInput).toHaveValue(formPassword);
  await expect(loginPage.genderSelect).toHaveValue('Male');
  await expect(loginPage.iceCreamCheckbox).toBeChecked();
  await expect(loginPage.employedRadio).toBeChecked();
  await expect(loginPage.birthDateInput).toHaveValue('2000-01-30');
});

When('the user submits the Home form', async function () {
  await loginPage.submitHomeForm();
});

Then('the success message should be displayed', async function () {
  await expect(loginPage.successAlert).toContainText(
    'Success! The Form has been submitted successfully!',
  );
  await loginPage.waitAndClosePage();
});
