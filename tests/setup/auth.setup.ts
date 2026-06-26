import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('Đăng nhập hệ thống và tạo mới session', async ({ page, context }) => {
  await context.clearCookies();

  const cleanRootUrl = process.env.BASE_URL!.replace('/wp-admin', '');
  await page.goto(`${cleanRootUrl}/wp-login.php?reauth=0`);
  await page.waitForLoadState('networkidle');

  await page.locator('#user_login').fill(process.env.ADMIN_USER!);
  await page.locator('#user_pass').fill(process.env.ADMIN_PASSWORD!);
  await page.locator('#wp-submit').click();

  await page.waitForURL(/.*wp-admin.*/, { timeout: 15000 });
  await page.context().storageState({ path: authFile });
});
