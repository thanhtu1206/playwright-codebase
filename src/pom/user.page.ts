import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class UserPage extends BasePage {
  menuAdminMenu: Locator;
  menuUsersLink: Locator;
  txtSearchUsers: Locator;
  btnSearchUsersSubmit: Locator;
  radDeleteAllContent: Locator;
  btnConfirmDeletion: Locator;

  constructor(page: Page) {
    super(page);
    this.menuAdminMenu = this.page.locator('#adminmenu');
    this.menuUsersLink = this.menuAdminMenu.getByRole('link', { name: 'Users', exact: true });
    this.txtSearchUsers = this.page.getByLabel('Search Users');
    this.btnSearchUsersSubmit = this.page.getByRole('button', { name: 'Search Users' });
    this.radDeleteAllContent = this.page.getByText('Delete all content');
    this.btnConfirmDeletion = this.page.getByRole('button', { name: 'Confirm Deletion' });
  }

  async navigateToUsersMenu() {
    await this.menuUsersLink.click();
  }

  async createUser(
    username: string,
    email: string,
    password: string,
    role: 'Editor' | 'Administrator' | 'Author' | 'Contributor' | 'Subscriber' = 'Editor',
  ) {
    await this.page.goto(`${process.env.BASE_URL}/user-new.php`);
    await this.page.waitForLoadState('networkidle').catch(() => {});

    await this.page.getByRole('textbox', { name: 'Username (required)' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Email (required)' }).fill(email);
    await this.page.locator('#pass1').fill('');
    await this.page.locator('#pass1').fill(password);

    // Check vào checkbox nếu mật khẩu yếu
    const chkWeakPassword = this.page.locator('input[name="pw_weak"]');
    if (await chkWeakPassword.isVisible()) {
      await chkWeakPassword.check();
    }
    await this.page.getByRole('combobox', { name: 'Role' }).selectOption(role);

    await this.page.getByRole('button', { name: 'Add User' }).click();
  }

  async searchUser(username: string) {
    await this.txtSearchUsers.fill(username);
    await this.btnSearchUsersSubmit.click();
  }

  async deleteUser(username: string) {
    await this.navigateToUsersMenu();
    await this.searchUser(username);

    const targetRow = this.page.getByRole('row', { name: username });
    const deleteBtnLocator = targetRow.getByRole('link', { name: 'Delete' });
    const deleteHref = await deleteBtnLocator.getAttribute('href');

    if (!deleteHref) {
      console.error(`❌ Không lấy được link Delete của user "${username}"`);
      return;
    }

    const fullDeleteUrl = deleteHref.startsWith('http') ? deleteHref : `${process.env.BASE_URL}/${deleteHref}`;
    await this.page.goto(fullDeleteUrl);
    await this.page.waitForLoadState('load');
    
    if (this.page.url().includes('action=delete')) {
      const isCheckboxVisible = await this.radDeleteAllContent.isVisible({ timeout: 3000 }).catch(() => false);

      if (isCheckboxVisible) {
        await this.radDeleteAllContent.check();
        await this.page.waitForTimeout(1000);
      }

      await this.btnConfirmDeletion.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
    }
  }
}
