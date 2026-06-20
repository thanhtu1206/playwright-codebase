import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  txtUsername: Locator;
  txtPassword: Locator;
  btnLogin: Locator;
  lblErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.txtUsername = this.page.locator('#user_login');
    this.txtPassword = this.page.locator('#user_pass');
    this.btnLogin = this.page.locator('#wp-submit');
    this.lblErrorMessage = this.page.locator('#login_error');
  }

  async login(user: string, pass: string) {
    await this.navigateTo();
    await this.txtUsername.fill(user);
    await this.txtPassword.fill(pass);
    await this.btnLogin.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.lblErrorMessage.innerText();
  }

  async logout() {
    const logoutUrl = process.env.BASE_URL!.replace('/wp-admin', '/wp-login.php?action=logout');
    const confirmLogoutLink = this.page.locator('text=log out');

    await this.page.goto(logoutUrl);
    
    await confirmLogoutLink.waitFor({ state: 'visible', timeout: 5000 });
    await confirmLogoutLink.click();
  }
}
