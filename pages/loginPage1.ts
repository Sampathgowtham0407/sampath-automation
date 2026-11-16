import { Locator, Page } from '@playwright/test';

export class LoginPage1 {
  readonly userInputBox: Locator;
  readonly page: Page;
  readonly passInputBox: Locator;
  readonly loginBtn: Locator;
  readonly dashboardText: Locator;
  readonly adminText: Locator;
  readonly performanceText: Locator;
  readonly myInfoText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInputBox = page.getByRole('textbox', { name: 'Username' });
    this.passInputBox = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.dashboardText = page.getByRole('link', { name: 'Dashboard' });
    this.adminText = page.getByRole('link', { name: 'Admin' });
    this.performanceText = page.getByRole('link', { name: 'Performance' });
    this.myInfoText = page.getByRole('link', { name: 'My Info' });
  }

  async login(username: string, password: string) {
    await this.userInputBox.fill(username);
    await this.passInputBox.fill(password);
    await this.loginBtn.click();
  }

  async openAdminPanel() {
    await this.adminText.click();
  }

  async clickPerformance() {
    await this.performanceText.click();
  }

  async clickMyInfo() {
    await this.myInfoText.click();
  }
}