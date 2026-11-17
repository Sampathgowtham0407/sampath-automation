import { type Locator, type Page } from '@playwright/test';

export class RahulLoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly category1Link: Locator;
  readonly homeLink: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly formPasswordInput: Locator;
  readonly genderSelect: Locator;
  readonly iceCreamCheckbox: Locator;
  readonly employedRadio: Locator;
  readonly birthDateInput: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#signInBtn');
    this.category1Link = page.getByRole('link', { name: 'Category 1' });
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
    this.nameInput = page.locator("//div[@class='form-group']//input[@name='name']");
    this.emailInput = page.locator('[name="email"]');
    this.formPasswordInput = page.getByLabel('Password');
    this.genderSelect = page.getByRole('combobox', { name: 'Gender' });
    this.iceCreamCheckbox = page.getByRole('checkbox', {
      name: 'Check me out if you Love IceCreams!',
    });
    this.employedRadio = page.getByRole('radio', { name: 'Employed' });
    this.birthDateInput = page.locator('[name="bday"]');
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

  async openHomeForm(): Promise<void> {
    await this.homeLink.click();
    await this.nameInput.waitFor({ state: 'visible' });
  }

  async fillHomeForm(data: {
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.formPasswordInput.fill(data.password);
    await this.genderSelect.selectOption({ label: 'Male' });
    await this.iceCreamCheckbox.check();
    await this.employedRadio.check();
    await this.birthDateInput.fill(data.dateOfBirth);
  }

  async waitAndClosePage(): Promise<void> {
    await this.page.waitForTimeout(4000);
    await this.page.close();
  }
}
