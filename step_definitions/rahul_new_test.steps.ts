import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { RahulNewTestPage } from '../pages/rahulNewTestPage';
import { getRahulPage } from './rahul-login.steps';

When(
  'the user adds Blackberry to the cart',
  { timeout: 30000 },
  async function () {
    const shopPage = new RahulNewTestPage(getRahulPage());
    await shopPage.addBlackberryToCart();
  },
);

Then('the purchase success message should be displayed', async function () {
  const shopPage = new RahulNewTestPage(getRahulPage());
  await expect(shopPage.successMessage).toBeVisible();
});

When('the user waits 4 seconds before closing the page', async function () {
  const shopPage = new RahulNewTestPage(getRahulPage());
  await shopPage.waitAndClose();
});
When(
  'the user proceeds through Checkout to the delivery form',
  { timeout: 30000 },
  async function () {
    const shopPage = new RahulNewTestPage(getRahulPage());
    await shopPage.proceedToDeliveryForm();
  },
);

When(
  'the user fills Hyderabad as the delivery location, accepts the terms, and purchases',
  { timeout: 60000 },
  async function () {
    const shopPage = new RahulNewTestPage(getRahulPage());
    await shopPage.completePurchase();
  },
);
