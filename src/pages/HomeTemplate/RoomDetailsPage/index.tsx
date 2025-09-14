import { getCommentByIdRoomApi } from "@/services/comment.api";
import { getRoomDetailsApi } from "@/services/room.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import type { RoomComment } from "@/interfaces/comment.interface";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RoomDetailSkeleton from "../_components/Skeleton/room-details.ske";

export default function RoomDetailsPage() {
  const { idRoom } = useParams();
  const {
    data: room,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["room-details", idRoom],
    queryFn: () => getRoomDetailsApi(idRoom),
    enabled: !!idRoom,
  });
  const { data: comment = [] } = useQuery({
    queryKey: ["comment", idRoom],
    queryFn: (): Promise<RoomComment[]> =>
      getCommentByIdRoomApi(Number(idRoom)),
    enabled: !!idRoom,
  });

  if (isLoading) return <RoomDetailSkeleton/>;
  if (isError || !room) return <p>Không tìm thấy phòng</p>;
  return (
    <div className="max-w-7xl mx-auto">
      {/* Banner image */}
      <div className="w-full h-[500px] overflow-hidden rounded-xl">
        <img
          src={room.hinhAnh}
          alt={room.tenPhong}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          {/* Title + Host avatar */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{room.tenPhong}</h1>
              <p className="text-gray-600 mt-1">
                {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong}{" "}
                giường · {room.phongTam} phòng tắm
              </p>
            </div>

            {/* Avatar host */}
            <img
              src="/images/logo.svg"
              alt="Chủ nhà"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 ml-4"
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
            <p className="text-gray-700">{room.moTa}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Tiện nghi</h2>
            <div className="grid grid-cols-2 gap-3 text-gray-700">
              {room.wifi && <span>📶 Wifi</span>}
              {room.dieuHoa && <span>❄️ Điều hoà</span>}
              {room.tivi && <span>📺 Tivi</span>}
              {room.mayGiat && <span>🧺 Máy giặt</span>}
              {room.banLa && <span>🧹 Bàn là</span>}
              {room.bep && <span>🍳 Bếp</span>}
              {room.doXe && <span>🚗 Chỗ đỗ xe</span>}
              {room.hoBoi && <span>🏊 Hồ bơi</span>}
            </div>
          </div>

          {/* Comments */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Đánh giá</h2>

            {/* Scrollable comments */}
            <div className="space-y-6 max-h-80 overflow-y-auto pr-2 w-full max-w-3xl">
              {comment.length === 0 ? (
                <p className="text-gray-500">Chưa có bình luận nào</p>
              ) : (
                comment.map((c) => (
                  <div key={c.id} className="flex gap-4 border-b pb-4">
                    {/* Avatar */}
                    <img
                      src={c.avatar ? c.avatar : "/images/logo.svg"}
                      alt={c.tenNguoiBinhLuan || "User"}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{c.tenNguoiBinhLuan}</h3>
                        <span className="text-sm text-gray-500">
                          {c.ngayBinhLuan &&
                          !isNaN(new Date(c.ngayBinhLuan).getTime())
                            ? format(new Date(c.ngayBinhLuan), "dd/MM/yyyy")
                            : ""}
                        </span>
                      </div>
                      {/* Stars */}
                      <div className="flex text-yellow-500 text-sm mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < c.saoBinhLuan ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <p className="text-gray-700 break-words">{c.noiDung}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment input */}
            <div className="mt-6">
              <Textarea
                placeholder="Viết bình luận..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                rows={3}
              />
              <Button className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:bg-pink-600 cursor-pointer">
                Gửi bình luận
              </Button>
            </div>
          </div>
        </div>

        {/* Right - Booking box */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 border rounded-2xl shadow-md p-6 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold">${room.giaTien}</span>
                <span className="text-gray-500"> / đêm</span>
              </div>
            </div>

            {/* Form check in/out */}
            <div className="grid grid-cols-2 border rounded-lg divide-x">
              <div className="p-3">
                <p className="text-xs font-semibold uppercase">Nhận phòng</p>
                <p className="text-sm text-gray-600">Thêm ngày</p>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold uppercase">Trả phòng</p>
                <p className="text-sm text-gray-600">Thêm ngày</p>
              </div>
            </div>

            {/* Guests */}
            <div className="border rounded-lg p-3">
              <p className="text-xs font-semibold uppercase">Khách</p>
              <p className="text-sm text-gray-600">1 khách</p>
            </div>

            {/* Button */}
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer">
              Đặt phòng
            </Button>

            {/* Note */}
            <p className="text-center text-gray-500 text-sm">
              Bạn chưa bị trừ tiền
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
