import { test, expect } from '../../src/fixtures/test.fixture';
import { StringUtil } from '../../src/utils/string.util';

test.describe('WordPress Post Management', () => {
  const suffix = StringUtil.generateRandomString(5);
  const categoryName = `E101 Category ${suffix}`;
  const tagName = `E101 Tag ${suffix}`;
  const postTitle = `Post Automation ${suffix}`;

  test('Chu trình E2E tuần tự quản lý Bài viết và Phân loại dữ liệu', async ({ loginPage, postPage, page }) => {
    await test.step('Đăng nhập vào hệ thống WordPress Admin', async () => {
      await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASSWORD!);
      await expect(page).toHaveURL(/.*wp-admin/);
    });

    await test.step('B1: Tạo và tìm kiếm Chuyên mục (Category)', async () => {
      await postPage.createAndSearchCategory(categoryName);
      await expect(page.locator('#the-list')).toContainText(categoryName);
    });

    await test.step('B2: Tạo và tìm kiếm Thẻ (Tag)', async () => {
      await postPage.createAndSearchTag(tagName);
      await expect(page.locator('#the-list')).toContainText(tagName);
    });

    await test.step('B3: Tạo bài viết mới, gán Category và Tag vừa tạo khi Publish', async () => {
      await postPage.createPostWithTagAndCategory(postTitle, categoryName, tagName);

      await postPage.searchPost(postTitle);
      const postRow = page.locator('tr', { hasText: postTitle });
      await expect(postRow).toBeVisible();
      await expect(postRow).toContainText(categoryName);
      await expect(postRow).toContainText(tagName);
    });

    await test.step('B4: Xóa bài viết vừa tạo và kiểm tra lại danh sách', async () => {
      await postPage.deletePost(postTitle);
      await expect(page.locator('#message.notice')).toContainText('1 post moved to the Trash.');

      // Tìm lại lần nữa để chắc chắn bài viết không còn ở mục Active
      await postPage.searchPost(postTitle);
      await expect(page.locator('#the-list')).toContainText('No posts found.');
    });

    await test.step('B5: Dọn dẹp dữ liệu hệ thống (Xóa Tag và Category)', async () => {
      await postPage.deleteTag(tagName);
      await expect(page.locator('#the-list')).not.toContainText(tagName);

      await postPage.deleteCategory(categoryName);
      await expect(page.locator('#the-list')).not.toContainText(categoryName);
    });
  });
});
