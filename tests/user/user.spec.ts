import { test, expect } from '../../src/fixtures/test.fixture';
import { StringUtil } from '../../src/utils/string.util';

test.describe('WordPress User Management', () => {
  let uniqueID: string;
  let username: string;
  let email: string;
  let password: string;

  test.beforeEach(async ({ loginPage, page }) => {
    test.setTimeout(60000);
    uniqueID = Math.random().toString(36).substring(2, 6);
    username = `user_test_${uniqueID}`;
    email = `user_${uniqueID}@example.com`;
    password = `StrongPass@DemoUserTest`;

    await page.goto(`${process.env.BASE_URL}/users.php`).catch(() => {});

    const isLoginPage = await page
      .locator('#user_login')
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (isLoginPage) {
      await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASSWORD!);
    }
  });

  test.afterEach(async ({ loginPage, userPage, page }) => {
    if (page.isClosed()) return;

    await page.goto(`${process.env.BASE_URL}/users.php`).catch(() => {});
    const hasAdminAccess = await page
      .locator('#adminmenu')
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (hasAdminAccess) {
      await userPage.deleteUser(username);
      return;
    }

    const maxRetries = 3;
    let isLoginSuccess = false;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await page.goto(`${process.env.BASE_URL.replace('/wp-admin', '')}/wp-login.php?action=logout`).catch(() => {});
        const confirmLogoutLink = page.locator('a:has-text("log out")');
        if (await confirmLogoutLink.isVisible({ timeout: 1500 }).catch(() => false)) {
          await confirmLogoutLink.click();
        }

        await page.goto(`${process.env.BASE_URL.replace('/wp-admin', '')}/wp-login.php`);
        await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASSWORD!);

        isLoginSuccess = true;
        break;
      } catch (error) {
        if (attempt < maxRetries) await page.waitForTimeout(1500);
      }
    }

    if (isLoginSuccess) {
      await userPage.deleteUser(username);
    } else {
      throw new Error(
        `❌ Không thể đăng nhập lại Admin ở afterEach để dọn dẹp. Dữ liệu rác của user "${username}" vẫn tồn tại!`,
      );
    }
  });

  // ==========================================================================
  test('Test 1: Tạo và tìm kiếm người dùng mới', async ({ userPage, page }) => {
    await test.step('B1: Tạo user vai trò Editor', async () => {
      await userPage.createUser(username, email, password, 'Editor');
      await expect(page.locator('#message.notice p')).toContainText('New user created.');
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
      await expect(page.locator('#message.notice p')).toContainText('New user created.');
    });

    await test.step('B2: Đăng xuất admin và đăng nhập user mới tạo', async () => {
      await loginPage.logout();
      await loginPage.login(username, password);
      await expect(page.locator('#wp-admin-bar-my-account')).toBeVisible({ timeout: 5000 });
    });
  });

  // ==========================================================================
  test('Test 3: Người dùng mới tạo đăng nhập và viết bài viết mới', async ({ loginPage, userPage, postPage, page }) => {
    await test.step('B1: Tạo tài khoản user', async () => {
      await userPage.createUser(username, email, password, 'Editor');
      await expect(page.locator('#message.notice p')).toContainText('New user created.');
    });

    await test.step('B2: Đăng xuất admin và đăng nhập user mới tạo', async () => {
      await loginPage.logout();
      await loginPage.login(username, password);
    });

    await test.step('B3: Thử tạo bài viết mới bằng tài khoản user', async () => {
      const postTitle = `Post tạo bởi Editor ${uniqueID}`;
      await postPage.createSimplePost(postTitle);
      await postPage.searchPost(postTitle);
    });
  });
});
