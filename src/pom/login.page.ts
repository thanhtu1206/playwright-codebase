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
    const adminMenuItem = this.page.locator('#wp-admin-bar-my-account');
    const btnLogOutMenuItem = this.page.getByRole('menuitem', { name: 'Log Out' })
    await adminMenuItem.hover();
    await this.page.waitForTimeout(500);
    await btnLogOutMenuItem.click();
    await this.page.waitForURL(/.*wp-login.php.*/);
  }
}
