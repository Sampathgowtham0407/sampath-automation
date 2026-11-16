import { test, expect } from '@playwright/test';
import { LoginPage2 } from '../pages/loginPage2';

test.setTimeout(90000);

const baseURL = 'https://practice.expandtesting.com/login';
const username = 'practice';
const password = 'SuperSecretPassword!';
let loginPage: LoginPage2;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage2(page);
  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await loginPage.login(username, password);

});
test('Verify that user is able to login successfully.', async () => {
  await expect(loginPage.logoutLink).toBeVisible();
});

test('Verify that user is able to open Tips.', async () => {
  await loginPage.clickTips();
  await expect(loginPage.page).toHaveURL(/tips/i);
});

test('Verify that user is able to click on Test Cases.', async () => {
  await loginPage.clickTestCases();
  await expect(loginPage.page).toHaveURL(/test-cases/i);

});

test('Verify that user is able to click on API Testing.', async () => {
  await loginPage.clickApiTest();
  await loginPage.page.waitForURL(/api-docs/i);
  await expect(loginPage.page).toHaveURL(/api-docs/i);
});
  
//test('Verify that user is able to click on My Info.', async () => {
 // await loginPage.clickMyInfo();
 // await expect(loginPage.page).toHaveURL(/pim\/viewPersonalDetails\/empNumber\/7/i);
//});