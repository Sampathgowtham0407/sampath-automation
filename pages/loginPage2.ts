import { Locator, Page } from '@playwright/test';

export class LoginPage2 {
  readonly userInputBox: Locator;
  readonly page: Page;
  readonly passInputBox: Locator;
  readonly loginBtn: Locator;
  readonly logoutLink: Locator;
  readonly tipsLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInputBox = page.locator('#username');
    this.passInputBox = page.locator('#password');
    this.loginBtn = page.locator('button[type="submit"]');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.tipsLink = page.getByRole('link', { name: 'Tips' });
    this.testCasesLink = page.getByRole('link', { name: 'Test Cases' });
    this.apiTestLink = page.getByRole('link', { name: 'API Testing', exact: true });
  }

  async login(username: string, password: string) {
    await this.userInputBox.fill(username);
    await this.passInputBox.fill(password);
    await this.loginBtn.click();
  }

  //async opendiscoverMore() {
    //await this.discoverMore.click();
 // }
  async clickTips() {
    await this.tipsLink.click();
  }

  async clickTestCases() {
    await this.testCasesLink.click();
  }

  async clickApiTest() {
    await this.apiTestLink.click();
  }

}