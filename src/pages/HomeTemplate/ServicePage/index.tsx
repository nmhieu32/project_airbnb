import { Car, Coffee, ShieldCheck, Wifi } from "lucide-react";

export default function ServicePage() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-700">
              Tiện ích cao cấp
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch vụ tiện ích
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              của chúng tôi
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
            Trải nghiệm những tiện ích đẳng cấp được thiết kế để mang lại sự
            thoải mái tối đa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Dịch vụ 1 - Wi-Fi */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <div className="relative flex flex-col items-center bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200 transform group-hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 text-white p-5 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Wifi className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Wi-Fi tốc độ cao
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Truy cập Internet nhanh chóng và ổn định ở mọi nơi trong khuôn
                viên.
              </p>
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Dịch vụ 2 - Bãi đỗ xe */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <div className="relative flex flex-col items-center bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-green-200 transform group-hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 text-white p-5 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Car className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                Bãi đỗ xe an toàn
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Không gian đỗ xe rộng rãi, có bảo vệ 24/7 đảm bảo an toàn tuyệt
                đối.
              </p>
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Dịch vụ 3 - Quán cà phê */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <div className="relative flex flex-col items-center bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-amber-200 transform group-hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-amber-400 to-orange-600 text-white p-5 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Coffee className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                Quán cà phê & bếp ăn
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Thưởng thức cà phê sáng hoặc bữa ăn nhẹ ngay trong khu nghỉ
                dưỡng.
              </p>
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Dịch vụ 4 - An ninh */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <div className="relative flex flex-col items-center bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-purple-200 transform group-hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-purple-400 to-pink-600 text-white p-5 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <ShieldCheck className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                An ninh 24/7
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Hệ thống camera và đội ngũ bảo vệ túc trực suốt ngày đêm.
              </p>
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce animation-delay-400"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-600"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
}