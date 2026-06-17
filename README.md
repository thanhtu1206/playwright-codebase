# Playwright Automation Codebase for WP-Admin

Dự án kiểm thử tự động cho trang quản trị WordPress sử dụng Playwright và TypeScript.

## Tài liệu Thiết kế Dự án
Vui lòng đọc các tài liệu phân tích và thiết kế dưới đây trước khi đóng góp code:
*   [Phân tích Tính năng & Lưu ý](./project-documentations/01-website-feature.md)
*   [Thiết kế Cấu trúc Thư mục](./project-documentations/02-folder-design.md)
*   [Thiết kế Page Object Model (POM)](./project-documentations/03-pom-design.md)
*   [Thiết kế Utils](./project-documentations/04-utils-design.md)
*   [Thiết kế Fixtures](./project-documentations/05-fixture-design.md)
*   [Quy ước Viết Code (Coding Convention)](./project-documentations/06-coding-convention-design.md)

## Hướng dẫn Khởi chạy
1. Sao chép file `.env.example` thành `.env` và điền thông tin tài khoản.
2. Cài đặt thư viện: `npm install`
3. Chạy test: `npx playwright test`

# Playwright Automation Codebase - WordPress Practice

Dự án kiểm thử tự động Website WordPress Practice sử dụng Playwright và TypeScript.

## 📚 Tài liệu Thiết kế (Project Documentations)
Vui lòng đọc các tài liệu phân tích chi tiết dưới đây trước khi chạy kịch bản:
1. [Website Features & Notes](./project-documentations/01-website-feature.md)
2. [Folder Architecture](./project-documentations/02-folder-design.md)
3. [Page Object Model (POM) Design](./project-documentations/03-pom-design.md)
4. [Utilities Design](./project-documentations/04-utils-design.md)
5. [Custom Fixtures](./project-documentations/05-fixture-design.md)
6. [Coding Conventions](./project-documentations/06-coding-convention-design.md)

## 🛠️ Hướng dẫn cài đặt và chạy
1. Cài đặt thư viện: `npm install`
2. Cấu hình file `.env`.
3. Chạy tất cả kịch bản: `npx playwright test`
4. Xem báo cáo: `npx playwright show-report`