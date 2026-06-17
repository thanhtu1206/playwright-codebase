# Thiết kế Custom Fixtures
Thay vì khởi tạo POM thủ công trong từng file test, ta gom chúng vào Fixtures.
*   **`pageFixture`**: Tự động inject các trang như `loginPage`, `dashboardPage` vào test block.
*   **`adminPage`**: Một fixture đã được áp dụng Auth State (đã login sẵn), các test case chỉ cần gọi `adminPage` là vào thẳng Dashboard, tiết kiệm thời gian login lại nhiều lần.

# Thiết kế Fixture

Khởi tạo sẵn các Page Object để tránh việc `new PageObject(page)` lặp đi lặp lại trong mỗi file spec.

- **`test` mở rộng:** Tạo custom fixture kết hợp `loginPage` và `dashboardPage`.
- Khi viết test, chỉ cần gọi: `test('Test...', async ({ loginPage, dashboardPage }) => { ... })` thay vì phải khởi tạo thủ công từng class.

# 05. Thiết kế Fixture

Sử dụng Custom Fixture của Playwright để thay thế hoàn toàn cho `beforeEach` truyền thống.

* **Mục đích**: Tự động khởi tạo các Page Object và inject trực tiếp vào hàm test. Giúp code test ngắn gọn, sạch sẽ và dễ bảo trì.
* **Thiết kế trong `test.fixture.ts`**:
    ```typescript
    export const test = base.extend<{
      loginPage: LoginPage;
      postPage: PostPage;
      userPage: UserPage;
    }>({ ... })
    ```
* **Cách dùng**: Trong file test chỉ cần gọi `test('Test case', async ({ postPage }) => { ... })`.