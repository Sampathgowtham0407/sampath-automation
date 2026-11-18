import { type Locator, type Page } from '@playwright/test';

export class RahulNewTestPage {
  readonly blackberryItem: Locator;
  readonly addToCartButton: Locator;
  readonly checkoutLink: Locator;
  readonly checkoutButton: Locator;
  readonly deliveryLocationInput: Locator;
  readonly termsAcceptanceLabel: Locator;
  readonly purchaseButton: Locator;
  readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.blackberryItem = page.locator('.card').filter({
      has: page.getByText('Blackberry', { exact: true }),
    });
    this.addToCartButton = this.blackberryItem
      .locator('button')
      .filter({ hasText: 'Add' })
      .first();
    this.checkoutLink = page.locator('a.nav-link.btn.btn-primary');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.deliveryLocationInput = page.getByRole('textbox', {
      name: 'Please choose your delivery location. Then click on purchase button',
    });
    this.termsAcceptanceLabel = page.getByText('I agree with the term &');
    this.purchaseButton = page.locator('input.btn.btn-success.btn-lg');
    this.successMessage = page.getByText('Success!', { exact: true });
  }

  async addBlackberryToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async proceedToDeliveryForm(): Promise<void> {
    await this.checkoutLink.click();
    await this.checkoutButton.click();
  }

  async completePurchase(): Promise<void> {
    await this.deliveryLocationInput.fill('Hyderabad');
    await this.termsAcceptanceLabel.click();
    await this.purchaseButton.click();
  }

  async waitAndClose(): Promise<void> {
    await this.page.waitForTimeout(4000);
    await this.page.close();
  }
}
