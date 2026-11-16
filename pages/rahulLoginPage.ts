import { type Locator, type Page } from '@playwright/test';

export class RahulLoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly category1Link: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#signInBtn');
    this.category1Link = page.getByRole('link', { name: 'Category 1' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async clickCategory1(): Promise<void> {
    await this.category1Link.click();
    await this.page.waitForTimeout(3000); // Wait for 3 seconds after clicking the link
  }
}
