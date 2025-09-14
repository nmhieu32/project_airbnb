import { useLocationStore } from "@/store/location.store";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SearchBarHome() {
  const { location, locationSelect, guests, setLocationSelect, setGuests } =
    useLocationStore();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  // const [guests, setGuests] = useState("1");
  const navigate = useNavigate();
  const toSlug = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const handleSearch = async() => {
    if (locationSelect === "") {
      return toast.warning("Vui lòng chọn Địa điểm đến !");
    }
    
    navigate(`/list-rooms/${locationSelect}`);
  };
  return (
    <section className="relative -mt-16 z-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-2">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Địa điểm
                  </div>
                  <select
                    value={locationSelect}
                    onChange={(e) => setLocationSelect(e.target.value)}
                    className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none"
                  >
                    <option value="">Thêm điểm đến</option>
                    {location?.map((loc) => (
                      <option key={loc.id} value={toSlug(loc.tinhThanh)}>
                        {loc.tinhThanh}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Nhận phòng
                  </div>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    placeholder="Thêm ngày"
                    className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Trả phòng
                  </div>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    placeholder="Thêm ngày"
                    className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 px-4 py-3 min-w-0">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">Khách</div>
                  <select
                    value={guests || ""}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none"
                  >
                    <option value="1">Thêm khách</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} khách
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="px-2">
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
