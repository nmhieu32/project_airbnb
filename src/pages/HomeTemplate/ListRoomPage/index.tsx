
import { getListLocationApi } from "@/services/location.api";
import { getListRoomByLocationApi } from "@/services/room.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ListRoomByLocationPage() {
  const { slug } = useParams();
  console.log("🍃 ~ ListRoomByLocationPage ~ slug:", slug)

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
  console.log("🍃 ~ ListRoomByLocationPage ~ mapped:", mapped)

  const findLocation = mapped?.find((loc) => toSlug(loc.tinhThanh) === slug);
  console.log("🍃 ~ ListRoomByLocationPage ~ findLocation:", findLocation)

  const { data: rooms } = useQuery({
    queryKey: ["rooms", findLocation?.id],
    queryFn: () => getListRoomByLocationApi(findLocation?.id),
    enabled: !!findLocation,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Sidebar danh sách phòng */}
      <div className="overflow-y-auto p-6 border-r">
        <h2 className="text-2xl font-bold mb-4">
          Chỗ ở tại khu vực bản đồ đã chọn
        </h2>
        <div className="space-y-4">
          {rooms?.map((room) => (
            <div
              key={room.id}
              className="flex gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {/* Ảnh */}
              <div className="w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              {/* Nội dung */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {room.tenPhong}
                  </h3>
                  <p className="text-sm text-gray-600">{room.moTa}</p>
                </div>
                <div className="mt-2 text-right">
                  <span className="font-bold">${room.giaTien}</span>{" "}
                  <span className="text-sm text-gray-500">/ tháng</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map bên phải */}
      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.4184655224!2d106.36557702485804!3d10.755292850645242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1757586661916!5m2!1svi!2s"
          width="800"
          height="600"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
