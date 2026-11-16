import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://practice.expandtesting.com/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const inputs = await page.$$eval('input', elements => elements.map(element => {
    const input = element as HTMLInputElement;
    const label = document.querySelector(`label[for="${input.id}"]`) as HTMLLabelElement | null;
    return {
      type: input.type,
      name: input.name,
      id: input.id,
      placeholder: input.placeholder,
      label: label?.innerText.trim(),
      ariaLabel: input.getAttribute('aria-label'),
      role: input.getAttribute('role'),
    };
  }));
  const buttons = await page.$$eval('button,input[type=submit]', elements => elements.map(element => {
    const control = element as HTMLButtonElement | HTMLInputElement;
    return {
      type: control.type,
      name: control.name,
      id: control.id,
      value: control.value,
      text: control instanceof HTMLButtonElement ? control.innerText.trim() : '',
      ariaLabel: control.getAttribute('aria-label'),
    };
  }));
  const links = await page.$$eval('a', elements => elements.map(element => {
    const anchor = element as HTMLAnchorElement;
    return { href: anchor.href, text: anchor.innerText.trim() };
  }).filter(link => link.text));
  console.log('INPUTS:');
  console.log(JSON.stringify(inputs, null, 2));
  console.log('BUTTONS:');
  console.log(JSON.stringify(buttons, null, 2));
  console.log('LINKS:');
  console.log(JSON.stringify(links.slice(0,30), null, 2));
  await browser.close();
})();
