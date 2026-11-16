import { test, expect } from '@playwright/test';
import { LoginPage1 } from '../pages/loginPage1';

const baseURL = 'https://opensource-demo.orangehrmlive.com/';
const username = 'Admin';
const password = 'admin123';
let loginPage: LoginPage1;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage1(page);
  await page.goto(baseURL);
  await loginPage.login(username, password);
  await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the page has loaded
});

test('Verify that user is able to login successfully.', async () => {
  await expect(loginPage.dashboardText).toBeVisible();
});

test('Verify that user is able to open admin panel.', async () => {
  await loginPage.openAdminPanel();
  await expect(loginPage.page).toHaveURL(/admin/i);
});

test('Verify that user is able to click on Performance.', async () => {
  await loginPage.clickPerformance();
  await expect(loginPage.page).toHaveURL(/performance/i);
});

test('Verify that user is able to click on My Info.', async () => {
  await loginPage.clickMyInfo();
  await expect(loginPage.page).toHaveURL(/pim\/viewPersonalDetails\/empNumber\/7/i);
});