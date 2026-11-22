import { type Locator, type Page } from '@playwright/test';

export class AmazonMobilesPage {
  readonly mobilesLink: Locator;
  readonly brandsHeading: Locator;
  readonly appleCheckbox: Locator;
  readonly firstProductResult: Locator;
  readonly iphone16Product: Locator;
  readonly iphone16AddToCartButton: Locator;
  readonly cartIcon: Locator;
  readonly proceedToBuyButton: Locator;

  constructor(private readonly page: Page) {
    this.mobilesLink = page.getByRole('link', { name: 'Mobiles' });
    this.brandsHeading = page.getByText('Brands', { exact: true });
    this.appleCheckbox = page.getByLabel('Apple', { exact: true });
    this.firstProductResult = page.locator('[data-component-type="s-product-image"]').first();
    this.iphone16Product = page.getByText(
      'Apple iPhone 16 128 GB: 5G Mobile Phone with Camera Control, A18 Chip and a Big Boost in Battery Life. Works with AirPods; Teal',
      { exact: true },
    );
    this.iphone16AddToCartButton = this.iphone16Product
      .locator('xpath=ancestor::*[.//input[@name="submit.addToCart"]][1]')
      .locator('input[name="submit.addToCart"]');
    this.cartIcon = page.locator('span.nav-cart-icon.nav-sprite');
    this.proceedToBuyButton = page.locator('[name="proceedToRetailCheckout"]');
  }

  async openMobiles(): Promise<void> {
    await this.mobilesLink.click();
    await this.page.waitForLoadState('load', { timeout: 60000 });
    await Promise.all([
      this.brandsHeading.waitFor({ state: 'visible', timeout: 60000 }),
      this.firstProductResult.waitFor({ state: 'visible', timeout: 60000 }),
    ]);
  }

  async selectAppleBrand(): Promise<void> {
    await this.brandsHeading.waitFor({ state: 'visible', timeout: 60000 });
    await this.appleCheckbox.click({ force: true });
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async addIphone16ToCart(): Promise<void> {
    await this.iphone16Product.waitFor({ state: 'visible', timeout: 60000 });
    await this.iphone16AddToCartButton.click({ timeout: 30000 });
  }

  async openCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async proceedToBuy(): Promise<void> {
    await this.proceedToBuyButton.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
  }

  async closePage(): Promise<void> {
    await this.page.close();
  }
}
