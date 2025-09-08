import { Outlet } from "react-router-dom";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function HomeTemplate() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />

      {/* Default Locations */}
      {/* <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Căn Hộ Nổi Bật
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Khám phá những căn hộ cao cấp được yêu thích nhất với dịch vụ
                hoàn hảo
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {defaultLocations.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {property.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {property.name}
                    </h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-purple-600">
                          {property.price}
                        </span>
                        <span className="text-gray-500">/đêm</span>
                      </div>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

      {/* Featured Destinations */}
      {/* <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Địa Điểm Nổi Bật
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Những điểm đến tuyệt vời nhất với cảnh quan thiên nhiên và dịch
                vụ đẳng cấp
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredDestinations.map((destination) => (
                <div key={destination.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        {destination.name}
                      </h3>
                      <p className="text-sm opacity-90 mb-2">
                        {destination.description}
                      </p>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                        {destination.properties}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
