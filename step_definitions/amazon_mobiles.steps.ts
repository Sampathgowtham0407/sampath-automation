import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AmazonMobilesPage } from '../pages/amazonMobilesPage';
import { getAmazonPage } from './amazon_login.steps';

When(
  'the user clicks the Mobiles link',
  { timeout: 120000 },
  async function () {
    const mobilesPage = new AmazonMobilesPage(getAmazonPage());
    await mobilesPage.openMobiles();
  },
);

When(
  'the user selects Apple from the Brands filter',
  { timeout: 90000 },
  async function () {
    const mobilesPage = new AmazonMobilesPage(getAmazonPage());
    await mobilesPage.selectAppleBrand();
  },
);

Then(
  'the Apple-filtered products should be displayed',
  { timeout: 90000 },
  async function () {
    const mobilesPage = new AmazonMobilesPage(getAmazonPage());
    await expect(mobilesPage.firstProductResult).toBeVisible({ timeout: 60000 });
  },
);

When(
  'the user adds the Apple iPhone 16 to the cart',
  { timeout: 90000 },
  async function () {
    const mobilesPage = new AmazonMobilesPage(getAmazonPage());
    await mobilesPage.addIphone16ToCart();
  },
);

When('the user opens the cart', async function () {
  const mobilesPage = new AmazonMobilesPage(getAmazonPage());
  await mobilesPage.openCart();
});

When(
  'the user clicks Proceed to Buy and waits for the page to load',
  { timeout: 90000 },
  async function () {
    const mobilesPage = new AmazonMobilesPage(getAmazonPage());
    await mobilesPage.proceedToBuy();
  },
);

When('the user closes the page', async function () {
  const mobilesPage = new AmazonMobilesPage(getAmazonPage());
  await mobilesPage.closePage();
});
