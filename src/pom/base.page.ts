import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '') {
    const cleanRootUrl = process.env.BASE_URL!.replace('/wp-admin', '');
    await this.page.goto(`${cleanRootUrl}/wp-login.php`, { waitUntil: 'load' });
  }

  async clickMenu(menuText: string) {
    await this.page.locator('#adminmenu .wp-menu-name').filter({ hasText: menuText }).click();
  }
}
