import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '') {
    await this.page.goto(path);
  }

  async clickMenu(menuText: string) {
    await this.page
      .locator('#adminmenu .wp-menu-name')
      .filter({ hasText: menuText })
      .click();
  }
}
