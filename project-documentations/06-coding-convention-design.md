# Quy ước viết code (Coding Convention)

1. **Ngôn ngữ:** TypeScript, tuân thủ Clean Code.
2. **Đặt tên:**
   - Thư mục/File: `kebab-case` (Ví dụ: `global.setup.ts`, `login-page.ts`).
   - Class: `PascalCase` (Ví dụ: `LoginPage`).
   - Hàm/Biến/Locator: `camelCase` (Ví dụ: `usernameInput`, `clickLoginButton()`).
3. **Playwright Best Practices:**
   - Tuyệt đối KHÔNG dùng XPath tuyệt đối
   - Ưu tiên các Locator theo chuẩn Hỗ trợ tiếp cận (Accessibility): `getByRole`, `getByText`, `getByPlaceholder`.
   - Sử dụng `expect` của Playwright để tận dụng cơ chế Auto-retrying.

# 06.  Quy ước viết code (Coding Convention)

* **Đặt tên:**:
    * Class: `PascalCase` (Ví dụ: `LoginPage`, `PostPage`).
    * Variables & Functions: `camelCase` (Ví dụ: `txtUsername`, `createNewPost()`).
    * Files: `kebab-case` (Ví dụ: `add-user.page.ts`, `auth.spec.ts`).
* **Locators Priority**: Luôn ưu tiên dùng Playwright Locator bám sát người dùng: `getByRole` > `getByText` > `getByPlaceholder` > CSS Selector (`#id`, `.class`).
* **Async/Await**: Bắt buộc phải có `await` trước mọi hành động tương tác với trình duyệt.
* **Clean Code**: Không Hardcode dữ liệu nhạy cảm bừa bãi, mọi thông tin cấu hình hệ thống phải đi qua `.env`.