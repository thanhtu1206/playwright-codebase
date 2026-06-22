import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('Đăng nhập hệ thống trước khi test', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  await page.locator('#user_login').fill(process.env.ADMIN_USER!);
  await page.locator('#user_pass').fill(process.env.ADMIN_PASSWORD!);
  await page.locator('#wp-submit').click();

  await page.waitForURL(/.*wp-admin.*/);
  await page.context().storageState({ path: authFile });
});
