import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-extrabold text-purple-600 tracking-widest">
        404
      </h1>
      <div className="bg-purple-600 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-6 text-lg text-gray-500">
        Oops! Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition duration-300"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}