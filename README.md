
# Project Airbnb

Ứng dụng web mô phỏng nền tảng Airbnb, build bằng **React** + **TypeScript** + **Vite**


## 🔍 Giới thiệu

**Project Airbnb** là một ứng dụng front-end hiển thị giao diện đặt chỗ, xem danh sách chỗ thuê, chi tiết chỗ thuê giống như Airbnb. Repo này sử dụng **React**, **TypeScript**, chạy trên Vite.

Ứng dụng hiện được host tại: [project-airbnb-lake.vercel.app](https://project-airbnb-lake.vercel.app/)

## 🗂️ Cấu trúc thư mục

```bash
project_airbnb/
├── public/
│   └── assets/                # Ảnh, icon, favicon,...
├── src/
│   ├── components/            # Các component tái sử dụng
│   ├── hooks/                 # Custom hooks
│   ├── interfaces/            # Định nghĩa kiểu dữ liệu (TypeScript)
│   ├── pages/
│   │   ├── AdminTemplate/     # Giao diện quản trị (quản lý user, phòng, vị trí,...)
│   │   ├── HomeTemplate/      # Giao diện chính của người dùng
│   │   └── ...                # Các trang con
│   ├── services/              # File gọi API bằng Axios
│   ├── store/                 # Quản lý trạng thái (Zustand store)
│   ├── utils/                 # Hàm tiện ích, format dữ liệu, validate,...
│   ├── App.tsx                # File gốc khởi tạo route
│   ├── main.tsx               # Entry point của ứng dụng
│   └── index.css              # Cấu hình Tailwind
├── .env                       # Biến môi trường (API_URL, TOKEN,...)
├── package.json
└── vite.config.ts
```
## 🚀 Khởi động dự án

Dưới đây là hướng dẫn để chạy ứng dụng trên máy local:

Clone repo:
```bash
  git clone https://github.com/nmhieu32/project_airbnb.git cd project_airbnb
```
Cài đặt các dependencies:

```bash
  npm install
```
Tạo file .env (nếu cần) và cấu hình biến môi trường (nếu app sử dụng API hoặc key nào đó).

Chạy ứng dụng ở chế độ dev:

```bash
  npm run dev
```

Build để deploy:

```bash
  npm run build
```

Preview bản build:

```bash
  npm run preview
```


## 🧰 Công nghệ & thư viện sử dụng

| Công nghệ | Mô tả |
|------------|--------|
| ⚛️ **React 18** | Thư viện front-end chính để xây dựng giao diện |
| 🟦 **TypeScript** | Tăng tính an toàn và dễ bảo trì code |
| 🧭 **React Router DOM v6** | Điều hướng giữa các trang trong ứng dụng |
| ⚙️ **Zustand** | Quản lý trạng thái (store) gọn nhẹ cho user authentication |
| 🎨 **Tailwind CSS** | Framework CSS tiện lợi giúp thiết kế UI nhanh chóng |
| 🧩 **Shadcn/UI** | Bộ component UI hiện đại và đồng bộ với Tailwind |
| 🌐 **Axios** | Gửi request API đến backend (fetch dữ liệu người dùng, phòng, đặt phòng,...) |
| 🧱 **Vite** | Công cụ build hiện đại, tốc độ cao |
| 🔒 **JWT Authentication** | Xác thực người dùng qua token |
| 🧭 **React Hook Form / Zod (nếu có)** | Hỗ trợ form validation và quản lý input |
| 🖼️ **Lucide React Icons** | Thư viện icon nhẹ, dễ dùng |



## 💡 Các tính năng chính
👤 **Người dùng**
- Đăng ký, đăng nhập, đăng xuất (JWT)
- Cập nhật thông tin cá nhân
- Xem danh sách phòng, chi tiết phòng
- Đặt phòng (Booking)
- Xem trải nghiệm & dịch vụ
🧑‍💼 **Quản trị viên (Admin)**
- Quản lý người dùng
- Quản lý phòng
- Quản lý vị trí
- Quản lý đơn đặt phòng
- Chỉ truy cập được khi có role = "ADMIN"
## ✨ Tác giả

Nguyễn Minh Hiếu

- Github: [@nmhieu32](https://www.github.com/octokatherine)

