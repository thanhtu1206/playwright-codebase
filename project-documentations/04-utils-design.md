# Thiết kế Tiện ích (Utils)
Các Hàm helper tĩnh (Static helpers) giúp code ngắn gọn, không lặp lại:
1.  `CryptoUtils`: Mã hóa/Giải mã mật khẩu nếu không muốn để plain-text trong `.env`.
2.  `DatabaseUtils`: Kết nối vào DB WordPress để verify dữ liệu (ví dụ: kiểm tra bài viết đã lưu vào bảng `wp_posts` chưa) hoặc clean data.
3.  `APIUtils`: Gọi API để tạo nhanh User/Post mà không cần click qua UI (giúp tăng tốc độ test).

# Thiết kế Utilities (Hàm tiện ích)

Các hàm bổ trợ không gắn liền với UI cụ thể:
- **`environment.ts`**: Hàm hỗ trợ kiểm tra và validate các biến môi trường từ file `.env` đảm bảo không bị thiếu dữ liệu khi chạy test.
- **`logger.ts`**: Tùy biến log định dạng ngày tháng phục vụ việc debug trực quan hơn.

# 04. Thiết kế Tiện ích (Utils)

Thiết kế các hàm tiện ích bổ trợ nhằm tái sử dụng code và tránh phụ thuộc vào dữ liệu tĩnh (Static Data dễ gây lỗi khi chạy song song).

* **`string.util.ts`**:
    * `generateRandomString(length)`: Tạo chuỗi ngẫu nhiên để làm tiêu đề Post hoặc Username, đảm bảo tính duy nhất (Unique) không bị trùng lặp dữ liệu giữa các test cases.
    * `extractNumberFromString(text)`: Trích xuất ID hoặc số lượng từ chuỗi thông báo thành công.