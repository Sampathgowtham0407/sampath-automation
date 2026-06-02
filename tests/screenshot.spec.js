const { test } = require('@playwright/test');

test('screenshot username label text', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const usernameLabel = page.locator("label[for='username']");
  await usernameLabel.screenshot({ path: 'username-label.png' });
  await page.screenshot({path: 'full_screenshot.png', fullPage: true});

});