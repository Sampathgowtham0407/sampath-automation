const { expect } = require('@playwright/test');

const LOGIN_URL = 'https://rahulshettyacademy.com/loginpagePractise/';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.signInButton = page.locator('#signInBtn');
    this.radioButtons = page.locator('.radiotextsty');
    this.okButton = page.locator('#okayBtn');
    this.alertMessage = page.locator('.alert-danger');
    this.productCard = page.locator('.card.h-100').first();
  }

  async open() {
    await this.page.goto(LOGIN_URL);
  }

  async selectUserType(index = 1) {
    await this.radioButtons.nth(index).click();
    if (await this.okButton.isVisible()) {
      await this.okButton.click();
    }
  }

  async fillCredentials(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }

  async assertLoginPageVisible() {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.radioButtons.first()).toBeVisible();
  }

  async assertShopPageVisible() {
    await this.page.waitForURL(/.*shop/);
    await expect(this.productCard).toBeVisible();
  }
}

module.exports = LoginPage;
