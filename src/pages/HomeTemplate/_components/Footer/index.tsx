import { Facebook, Instagram, Twitter } from "lucide-react";


export default function Footer() {
  const link = "https://www.airbnb.com.vn/";
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">GIỚI THIỆU</h3>
          <ul className="space-y-2">
            <li><a href={link} target="blank" className="hover:underline">Phương thức hoạt động của Airbnb</a></li>
            <li><a href={link} target="blank" className="hover:underline">Trang tin tức</a></li>
            <li><a href={link} target="blank" className="hover:underline">Nhà đầu tư</a></li>
            <li><a href={link} target="blank" className="hover:underline">Airbnb Plus</a></li>
            <li><a href={link} target="blank" className="hover:underline">Airbnb Luxe</a></li>
            <li><a href={link} target="blank" className="hover:underline">HotelTonight</a></li>
            <li><a href={link} target="blank" className="hover:underline">Airbnb for Work</a></li>
            <li><a href={link} target="blank" className="hover:underline">Nhờ có Host, mọi điều đều có thể</a></li>
            <li><a href={link} target="blank" className="hover:underline">Cơ hội nghề nghiệp</a></li>
            <li><a href={link} target="blank" className="hover:underline">Thư của nhà sáng lập</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">CỘNG ĐỒNG</h3>
          <ul className="space-y-2">
            <li><a href={link} target="blank" className="hover:underline">Sự đa dạng và Cảm giác thân thuộc</a></li>
            <li><a href={link} target="blank" className="hover:underline">Tiện nghi phù hợp cho người khuyết tật</a></li>
            <li><a href={link} target="blank" className="hover:underline">Đối tác liên kết Airbnb</a></li>
            <li><a href={link} target="blank" className="hover:underline">Chỗ ở cho tuyến đầu</a></li>
            <li><a href={link} target="blank" className="hover:underline">Lượt giới thiệu của khách</a></li>
            <li><a href={link} target="blank" className="hover:underline">Airbnb.org</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">ĐÓN TIẾP KHÁCH</h3>
          <ul className="space-y-2">
            <li><a href={link} target="blank" className="hover:underline">Cho thuê nhà</a></li>
            <li><a href={link} target="blank" className="hover:underline">Tổ chức Trải nghiệm trực tuyến</a></li>
            <li><a href={link} target="blank" className="hover:underline">Tổ chức trải nghiệm</a></li>
            <li><a href={link} target="blank" className="hover:underline">Đón tiếp khách có trách nhiệm</a></li>
            <li><a href={link} target="blank" className="hover:underline">Trung tâm tài nguyên</a></li>
            <li><a href={link} target="blank" className="hover:underline">Trung tâm cộng đồng</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">HỖ TRỢ</h3>
          <ul className="space-y-2">
            <li><a href={link} target="blank" className="hover:underline">Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</a></li>
            <li><a href={link} target="blank" className="hover:underline">Trung tâm trợ giúp</a></li>
            <li><a href={link} target="blank" className="hover:underline">Các tùy chọn hủy</a></li>
            <li><a href={link} target="blank" className="hover:underline">Hỗ trợ khu dân cư</a></li>
            <li><a href={link} target="blank" className="hover:underline">Tin cậy và an toàn</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-sm text-gray-500 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © 2021 Airbnb, Inc. All rights reserved ·{" "}
            <a href={link} target="blank" className="hover:underline">Quyền riêng tư</a> ·{" "}
            <a href={link} target="blank" className="hover:underline">Điều khoản</a> ·{" "}
            <a href={link} target="blank" className="hover:underline">Sơ đồ trang web</a>
          </p>
          <div className="flex items-center space-x-4">
            <a href={link} target="blank" className="hover:underline">🌐 Tiếng Việt (VN)</a>
            <a href={link} target="blank" className="hover:underline">$ USD</a>
            <div className="flex space-x-3">
              <a href={link} target="blank" className="hover:text-gray-700"><Facebook/></a>
              <a href={link} target="blank" className="hover:text-gray-700"><Twitter/></a>
              <a href={link} target="blank" className="hover:text-gray-700"><Instagram/></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}