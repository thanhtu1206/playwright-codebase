import { test, expect } from '../../src/fixtures/test.fixture';
import { StringUtil } from '../../src/utils/string.util';

test.describe('WordPress User Management', () => {
  // Khai báo các biến dùng chung cho các test case
  let suffix = StringUtil.generateRandomString(4);
  let username = `user_test_${suffix}`;
  let email = `user_${suffix}@example.com`;
  let password = `Password@123_${suffix}`;

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASSWORD!);
  });

  test.afterEach(async ({ loginPage, userPage, page }) => {
    const accountText = await page.locator('#wp-admin-bar-my-account').innerText();
    if (!accountText.includes(process.env.ADMIN_USER!)) {
      await loginPage.logout();
      await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASSWORD!);
    }

    await userPage.deleteUser(username);
    await expect(page.locator('#message.notice')).toContainText('User deleted.');
  });

  // ==========================================================================
  test('Test 1: Tạo và tìm kiếm người dùng mới', async ({ userPage, page }) => {
    await test.step('B1: Tạo user vai trò Editor', async () => {
      await userPage.createUser(username, email, password, 'Editor');
      await expect(page.locator('#message.notice')).toContainText('New user created.');
    });

    await test.step('B2: Tìm kiếm user mới tạo', async () => {
      await userPage.searchUser(username);
      const userRow = page.getByRole('row', { name: username }).first();
      await expect(userRow).toBeVisible();
      await expect(userRow).toContainText(email);
    });
  });

  // ==========================================================================
  test('Test 2: Tạo mới và đăng nhập thử nghiệm tài khoản người dùng', async ({ loginPage, userPage, page }) => {
    await test.step('B1: Tạo tài khoản user', async () => {
      await userPage.createUser(username, email, password, 'Editor');
      await expect(page.locator('#message.notice')).toContainText('New user created.');
    });

    await test.step('B2: Đăng xuất admin và đăng nhập user mới tạo', async () => {
      await loginPage.logout();
      await loginPage.login(username, password);
      await expect(page).toHaveURL(/.*wp-admin/);
      await expect(page.locator('#wp-admin-bar-my-account')).toContainText(username);
    });
  });

  // ==========================================================================
  test('Test 3: Người dùng mới tạo đăng nhập và viết bài viết mới', async ({ loginPage, userPage, postPage, page }) => {
    await test.step('B1: Tạo tài khoản user', async () => {
      await userPage.createUser(username, email, password, 'Editor');
      await expect(page.locator('#message.notice')).toContainText('New user created.');
    });

    await test.step('B2: Đăng xuất admin và đăng nhập user mới tạo', async () => {
      await loginPage.logout();
      await loginPage.login(username, password);
    });

    await test.step('B3: Thử tạo bài viết mới bằng tài khoản user', async () => {
      const postTitle = `Post tạo bởi Editor ${suffix}`;
      await postPage.createSimplePost(postTitle);
      await postPage.searchPost(postTitle);
    });
  });
});
