import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://practice.expandtesting.com/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type=submit]');
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  const title = await page.title();
  const url = page.url();
  const navLinks = await page.$$eval('a', els => els.map(e => ({text: e.innerText.trim(), href: e.href})).filter(l => l.text));
  console.log('url', url);
  console.log('title', title);
  console.log('navLinks', JSON.stringify(navLinks.slice(0,50), null, 2));
  await browser.close();
})();
