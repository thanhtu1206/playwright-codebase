import { test, expect } from '../src/fixtures/test.fixture';

test.describe('Authentication Tests', () => {
  test('Login thất bại với dữ liệu sai', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'invalid_password');
    const errMsg = await loginPage.getErrorMessage();
    expect(errMsg).toContain('Error');
  });

  test('Login thành công với tài khoản Admin', async ({ loginPage, page }) => {
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASSWORD!);
    await expect(page).toHaveURL(/.*wp-admin/);
  });
});