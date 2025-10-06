import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getListLocationPaginationApi } from "@/services/location.api";

import { useLocationStore } from "@/store/location.store";

import { toSlug } from "@/utils/slug";
import useLocationRoom from "@/utils/useLocationRoom";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { MapPin, Search, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SearchBarHome() {
  const {
    locationSelect,
    checkIn,
    checkOut,
    setLocationSelect,
    setGuests,
    setCheckIn,
    setCheckOut,
  } = useLocationStore();

  const navigate = useNavigate();

  const [nowGuest, setNowGuest] = useState(0);

  const { maxGuest } = useLocationRoom(locationSelect);

  const { data: location } = useQuery({
    queryKey: ["list-location"],
    queryFn: () => getListLocationPaginationApi(1, 8),
  });

  const handleSearch = () => {
    if (locationSelect === "") {
      return toast.warning("Vui lòng chọn Địa điểm đến !");
    }
    setGuests(nowGuest);
    navigate(`/list-rooms/${locationSelect}`);
  };
  return (
    <section className="relative -mt-16 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Mobile Layout (< 768px) */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {/* Location */}
              <div className="px-4 py-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Địa điểm
                    </div>
                    <select
                      value={locationSelect ? locationSelect : ""}
                      onChange={(e) => setLocationSelect(e.target.value)}
                      className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none py-1"
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

              {/* Check-in & Check-out - Side by side on mobile */}
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="px-4 py-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Nhận phòng
                        </p>
                        <p className="text-sm text-gray-600">
                          {checkIn
                            ? format(checkIn, "dd/MM/yyyy")
                            : "Chọn ngày"}
                        </p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={(date) => {
                          setCheckIn(date);
                        }}
                        disabled={(date) =>
                          checkOut ? date > checkOut : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="px-4 py-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Trả phòng
                        </p>
                        <p className="text-sm text-gray-600">
                          {checkOut
                            ? format(checkOut, "dd/MM/yyyy")
                            : "Chọn ngày"}
                        </p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={(date) => {
                          setCheckOut(date);
                        }}
                        disabled={(date) =>
                          checkIn ? date < addDays(checkIn, 1) : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
              <div className="px-4 py-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Khách
                    </div>
                    <select
                      value={nowGuest || ""}
                      onChange={(e) => setNowGuest(Number(e.target.value))}
                      className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none py-1"
                    >
                      <option value="">Thêm khách</option>
                      {locationSelect &&
                        Array.from({ length: maxGuest }).map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} khách
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button - Full width on mobile */}
              <div className="p-4">
                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer font-medium flex items-center justify-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Tìm kiếm</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tablet Layout (768px - 1024px) */}
          <div className="hidden md:block lg:hidden">
            <div className="p-4 space-y-3">
              {/* Row 1: Location + Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div className="px-4 py-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        Địa điểm
                      </div>
                      <select
                        value={locationSelect ? locationSelect : ""}
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

                <div className="px-4 py-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        Khách
                      </div>
                      <select
                        value={nowGuest || ""}
                        onChange={(e) => setNowGuest(Number(e.target.value))}
                        className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none"
                      >
                        <option value="">Thêm khách</option>
                        {locationSelect &&
                          Array.from({ length: maxGuest }).map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1} khách
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Check-in + Check-out + Search */}
              <div className="grid grid-cols-[1fr,1fr,auto] gap-3">
                <div className="px-4 py-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Nhận phòng
                        </p>
                        <p className="text-sm text-gray-600">
                          {checkIn
                            ? format(checkIn, "dd/MM/yyyy")
                            : "Chọn ngày"}
                        </p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={(date) => {
                          setCheckIn(date);
                        }}
                        disabled={(date) =>
                          checkOut ? date > checkOut : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="px-4 py-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Trả phòng
                        </p>
                        <p className="text-sm text-gray-600">
                          {checkOut
                            ? format(checkOut, "dd/MM/yyyy")
                            : "Chọn ngày"}
                        </p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={(date) => {
                          setCheckOut(date);
                        }}
                        disabled={(date) =>
                          checkIn ? date < addDays(checkIn, 1) : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout (>= 1024px) - Original horizontal layout */}
          <div className="hidden lg:block">
            <div className="p-2">
              <div className="flex items-center">
                <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0 hover:bg-gray-50 transition-colors rounded-l-xl">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        Địa điểm
                      </div>
                      <select
                        value={locationSelect ? locationSelect : ""}
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

                <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0 hover:bg-gray-50 transition-colors">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">
                          Nhận phòng
                        </p>
                        <p className="text-sm text-gray-600">
                          {checkIn
                            ? format(checkIn, "dd/MM/yyyy")
                            : "Chọn ngày"}
                        </p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={(date) => {
                          setCheckIn(date);
                        }}
                        disabled={(date) =>
                          checkOut ? date > checkOut : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0 hover:bg-gray-50 transition-colors">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">
                          Trả phòng
                        </p>
                        <p className="text-sm text-gray-600">
                          {checkOut
                            ? format(checkOut, "dd/MM/yyyy")
                            : "Chọn ngày"}
                        </p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={(date) => {
                          setCheckOut(date);
                        }}
                        disabled={(date) =>
                          checkIn ? date < addDays(checkIn, 1) : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1 px-4 py-3 min-w-0 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        Khách
                      </div>
                      <select
                        value={nowGuest || ""}
                        onChange={(e) => setNowGuest(Number(e.target.value))}
                        className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none"
                      >
                        <option value="">Thêm khách</option>
                        {locationSelect &&
                          Array.from({ length: maxGuest }).map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1} khách
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
        </div>
      </div>
    </section>
  );
}