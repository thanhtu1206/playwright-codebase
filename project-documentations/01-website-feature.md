# 01. Website Features & Testing Notes

Target Website: https://pw-practice-dev.playwrightvn.com/wp-admin
Platform: WordPress Admin Dashboard

## 1. Core Features to Test
* **Authentication**: Login với credentials, hiển thị lỗi khi sai thông tin, Logout và bảo mật session.
* **Post Management (CRUD)**:
    * Create: Tạo bài viết mới (Title, Content, Publish).
    * Read: Hiển thị danh sách bài viết.
    * Update: Chỉnh sửa nội dung bài viết, chuyển trạng thái Draft/Publish.
    * Delete: Xóa bài viết (Đưa vào Trash).
* **Categories & Tags**: Tìm kiếm, tạo mới và gán Category/Tag cho Post.
* **User Management (CRUD)**:
    * Tạo User mới với các Role khác nhau (Administrator, Editor, Author...).
    * Login bằng User mới tạo để kiểm tra phân quyền trước khi thực hiện xóa User đó.

## 2. Performance & Automation Notes (Lưu ý khi test)
* **Hệ thống WordPress tải chậm**: Các trang như `post-new.php` hoặc danh sách Users thường load nhiều script của Gutenberg Editor, dễ gây timeout. Cần áp dụng chiến lược `locator.waitFor()` thay vì dùng `page.waitForTimeout()`.
* **Giao diện linh hoạt (Dynamic Elements)**: Các thông báo thành công (Toast/Notice) như "Post published" xuất hiện và biến mất nhanh, cần bắt locator chuẩn bằng text hoặc class `notice-success`.
* **Xử lý Cookie/Session**: Để tối ưu thời gian, nên sử dụng tính năng `storageState` của Playwright cho các bài test không thuộc luồng Auth để tránh việc lặp lại bước Login ở mỗi test case.