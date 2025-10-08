Project Airbnb

Ứng dụng web mô phỏng nền tảng Airbnb, build bằng React + TypeScript + Vite

🔍 Giới thiệu

Project Airbnb là một ứng dụng front-end hiển thị giao diện đặt chỗ, xem danh sách chỗ thuê, chi tiết chỗ thuê giống như Airbnb.
Repo này sử dụng React, TypeScript, chạy trên Vite.

Ứng dụng hiện được host tại: project-airbnb-lake.vercel.app 
GitHub

📁 Cấu trúc dự án

Dưới đây là sơ lược các thư mục / file chính:

.
├── public
├── src
│   ├── components
│   ├── pages
│   ├── assets
│   └── … (logic, routing, styles,…)
├── .env
├── .gitignore
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts
└── README.md


public/ — chứa các tài nguyên tĩnh (images, favicon, …)

src/ — mã nguồn React + TypeScript

.env — cấu hình biến môi trường

vite.config.ts — cấu hình build / dev server

tsconfig*.json — cấu hình TypeScript

eslint.config.js — cấu hình linting

🚀 Khởi động dự án

Dưới đây là hướng dẫn để chạy ứng dụng trên máy local:

Clone repo:

git clone https://github.com/nmhieu32/project_airbnb.git
cd project_airbnb


Cài đặt các dependencies:

npm install


Tạo file .env (nếu cần) và cấu hình biến môi trường (nếu app sử dụng API hoặc key nào đó).

Chạy ứng dụng ở chế độ dev:

npm run dev


Ứng dụng mặc định sẽ chạy ở địa chỉ http://localhost:5173 (hoặc theo thông báo console).

Build để deploy:

npm run build


Preview bản build:

npm run preview

🧰 Công nghệ & thư viện sử dụng

React

TypeScript

Vite

ESLint (cấu hình lint, rules)

Các thư viện UI / component (tuỳ theo dự án)

CSS / SCSS / styled-components / module CSS (tùy cách tổ chức)

✨ Tính năng chính (dự kiến / đã có)

Trang chủ: hiển thị danh sách các chỗ thuê

Trang chi tiết chỗ thuê: hình ảnh, thông tin, tiện ích

Tìm kiếm / lọc theo vị trí, giá hoặc tiêu chí

Đăng nhập / đăng ký (nếu backend hỗ trợ)

Quản lý đặt chỗ

Responsive (thiết bị mobile / desktop)

Lưu ý: Tại thời điểm hiện tại repo này mới là phần front-end; nếu có backend (API) thì cần kết nối tương ứng.

🧪 Kiểm tra & phát triển

Linting: hãy chạy lint để kiểm tra lỗi cú pháp / style

Format / Prettier: nếu dùng, đảm bảo mã nguồn được format thống nhất

Testing (nếu có): viết unit tests, integration tests

Tách component: nếu component dùng nhiều nơi, tách ra để tái sử dụng

📦 Triển khai / Deploy

Bạn có thể deploy ứng dụng này lên các dịch vụ như Vercel, Netlify, Firebase Hosting, v.v.
Ví dụ, repo hiện có deploy tại project-airbnb-lake.vercel.app 
GitHub

👥 Đóng góp

Nếu bạn muốn đóng góp (fix bug, thêm tính năng), hãy fork repo và tạo pull request

Tạo issue để đề xuất tính năng hoặc báo bug

Thảo luận rõ ràng khi gửi PR (nêu mục đích, thay đổi chính)

📝 Liên hệ

Tác giả chính: nmhieu32 
GitHub

Cộng tác viên: ngh-duy 
GitHub