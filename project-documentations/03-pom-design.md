# 03. Page Object Model (POM) Design

Áp dụng nguyên lý Kế thừa (Inheritance) và Đóng gói (Encapsulation) trong OOP.

* **`base.page.ts`**: Chứa các thuộc tính và phương thức dùng chung cho mọi Page (ví dụ: `page`, `goto()`, `waitForPageLoad()`, click các menu chung).
* **`login.page.ts`**: Quản lý các element của trang Đăng nhập (Username, Password, Submit Button, Error Message).
* **Các Page chuyên biệt (`post.page.ts`, `user.page.ts`)**: Kế thừa từ `BasePage`. Chỉ chứa các Locator và Action đặc thù của chức năng đó.
* **Quy tắc thiết kế**: Không bao giờ thực hiện khâu Assert (`expect`) bên trong Page Object. Page Object chỉ trả về dữ liệu hoặc trạng thái, việc Assert thuộc về file `*.spec.ts`. 