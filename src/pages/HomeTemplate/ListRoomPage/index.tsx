import { getListLocationApi } from "@/services/location.api";
import { getListRoomByLocationApi } from "@/services/room.api";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import SearchBarHome from "../HomePage/SearchBar";
import { Car, Coffee, Heart, MapPin, Wifi } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ListRoomByLocationPage() {
  const { slug } = useParams();

  const [favoriteRooms, setFavoriteRooms] = useState(new Set());

  const toSlug = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const { data: locations } = useQuery({
    queryKey: ["get-location"],
    queryFn: () => getListLocationApi(),
  });

  const mapped = locations?.map((loc) => {
    return {
      ...loc,
      slug: toSlug(loc.tinhThanh),
    };
  });

  const findLocation = mapped?.find((loc) => toSlug(loc.tinhThanh) === slug);

  const { data: rooms } = useQuery({
    queryKey: ["rooms", findLocation?.id],
    queryFn: () => getListRoomByLocationApi(findLocation?.id),
    enabled: !!findLocation,
  });

  const toggleFavorite = (roomId: number) => {
    const newFavorites = new Set(favoriteRooms);
    if (newFavorites.has(roomId)) {
      newFavorites.delete(roomId);
    } else {
      newFavorites.add(roomId);
    }
    setFavoriteRooms(newFavorites);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="relative h-60 md:h-96 overflow-hidden">
        <img
          src={findLocation?.hinhAnh}
          alt="Banner"
          className="w-full h-full object-cover scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-white text-3xl md:text-6xl font-bold tracking-wide">
              {findLocation?.tinhThanh}
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light">
              Khám phá những không gian sống tuyệt vời
            </p>
          </div>
        </div>
      </div>

      <SearchBarHome />

      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 mt-8">
        <div className="overflow-y-auto p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Chỗ ở tại khu vực bản đồ đã chọn
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-lg font-semibold text-blue-600">
                  Hơn {rooms?.length || 0} chỗ ở
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>1 tháng</span>
              </div>
            </div>

            <div className="space-y-6">
              {rooms?.map((room) => (
                <NavLink
                  key={room.id}
                  to={`/room-details/${room.id}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="flex gap-6 p-6">
                    <div className="relative w-48 h-36 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={room.hinhAnh}
                        alt={room.tenPhong}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(room.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            favoriteRooms.has(room.id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-600 hover:text-red-500"
                          }`}
                        />
                      </Button>
                    </div>

                    <div className="flex flex-col justify-between flex-1">
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {room.tenPhong}
                        </h3>

                        <p className="text-gray-600 line-clamp-2 leading-relaxed">
                          {room.moTa}
                        </p>
                        <div className="flex gap-1">
                          <div className="text-gray-500">
                            <span className="text-xs">{room.khach} khách</span>
                            {" - "}
                            <span className="text-xs">
                              {room.giuong} giường
                            </span>
                            {" - "}
                            <span className="text-xs">
                              {room.phongTam} phòng tắm
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-4 pt-2">
                          {room.wifi ? (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Wifi className="h-4 w-4" />
                              <span className="text-xs">WiFi</span>
                            </div>
                          ) : (
                            ""
                          )}
                          {room.doXe ? (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Car className="h-4 w-4" />
                              <span className="text-xs">Đỗ xe</span>
                            </div>
                          ) : (
                            ""
                          )}
                          {room.bep ? (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Coffee className="h-4 w-4" />
                              <span className="text-xs">Bếp</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="text-right">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-900">
                              ${room.giaTien}
                            </span>
                            <span className="text-gray-500 text-sm">
                              / tháng
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 lg:sticky lg:top-0 h-96 lg:h-screen">
          <div className="absolute inset-0 rounded-l-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.4184655224!2d106.36557702485804!3d10.755292850645242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1757586661916!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-l-2xl"
            />
          </div>

          <div className="absolute top-6 left-6 right-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  {findLocation?.tinhThanh}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {rooms?.length || 0} chỗ ở có sẵn trong khu vực này
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
