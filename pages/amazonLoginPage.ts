import { type Locator, type Page } from '@playwright/test';

export class AmazonLoginPage {
  readonly signInLink: Locator;
  readonly usernameInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly accountGreeting: Locator;

  constructor(private readonly page: Page) {
    this.signInLink = page.getByText('Hello, sign in', { exact: true });
    this.usernameInput = page.getByRole('textbox', {
      name: 'Enter mobile number or email',
    });
    this.continueButton = page.locator('#continue');
    this.passwordInput = page.locator('#ap_password');
    this.signInButton = page.locator('#signInSubmit');
    this.accountGreeting = page.locator('#nav-link-accountList-nav-line-1');
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=831286012508&hvpos=&hvnetw=g&hvrand=10100353279758221484&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9062177&hvtargid=kwd-64107830&hvcampaign=20577402623&hydadcr=14452_2486914&mcid=e9c68a2d0f333bcaacd29ec00843c329&hvocijid=10100353279758221484--&hvexpln=nav&gad_source=1', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.signInLink.click();
    await this.usernameInput.pressSequentially(username, { delay: 100 });
    await this.continueButton.click();
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
