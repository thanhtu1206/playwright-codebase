# 02. Folder Design

Cấu trúc thư mục được thiết kế theo mô hình chuẩn Enterprise Playwright Framework, tách biệt rõ ràng giữa Mã nguồn (src), Kịch bản kiểm thử (tests) và Tài liệu (project-documentations).

```text
playwright-codebase/
├── project-documentations/     # Tài liệu phân tích và thiết kế hệ thống kịch bản
├── src/                        # Mã nguồn chính của framework
│   ├── fixtures/               # Khởi tạo custom fixture để quản lý dependency injection
│   ├── pom/                    # Page Object Models (Quản lý UI và Actions)
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── post.page.ts
│   │   └── user.page.ts
│   └── utils/                  # Hàm tiện ích dùng chung (String, Date, Data Generator)
├── tests/                      # Thư mục chứa kịch bản kiểm thử kịch bản (.spec.ts)  
│   ├── post/
│   │     └──post.spec.ts             
│   ├── user/
│   │     └──user.spec.ts             
│   └── auth.spec.ts
├── .env                        # Cấu hình hệ thống (.env, playwright.config.ts)
├── .gitignore
├── playwirght.config.ts
└── README.md  