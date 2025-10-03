import { getCommentByIdRoomApi, postCommentApi } from "@/services/comment.api";
import {
  bookRoomApi,
  getBookRoomApi,
  getRoomDetailsApi,
} from "@/services/room.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import type { PostComment, RoomComment } from "@/interfaces/comment.interface";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RoomDetailSkeleton from "../_components/Skeleton/room-details.ske";
import { AlertCircleIcon, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import type { BookRoom } from "@/interfaces/room.interface";
import { vi } from "date-fns/locale";
import { useLocationStore } from "@/store/location.store";

export default function RoomDetailsPage() {
  const { idRoom } = useParams();
  const { user } = useAuthStore();
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useLocationStore();
  const [guest, setGuest] = useState(1);
  const [rating, setRating] = useState(0);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const queryClient = useQueryClient();

  const { data: listRoom = [] } = useQuery({
    queryKey: ["list-room"],
    queryFn: () => getBookRoomApi(),
  });

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

  const { mutate: handleBooking } = useMutation({
    mutationFn: (data: BookRoom) => bookRoomApi(data),
    onSuccess: () => {
      toast.success("Đặt phòng thành công");

      setCheckIn(undefined);
      setCheckOut(undefined);
      //sau khi đặt phòng thành công thì invalidate để query fetch lại
      queryClient.invalidateQueries({ queryKey: ["list-room"] });
    },
    onError: (error) => {
      console.log("🌿 ~ RoomDetailsPage ~ error:", error);
      toast.error("Đặt phòng thất bại");
    },
  });

  const { handleSubmit, setValue } = useForm<BookRoom>({
    defaultValues: {
      id: 0,
      maPhong: Number(idRoom),
      ngayDen: checkIn ? format(checkIn, "MM/dd/yyyy") : "",
      ngayDi: checkOut ? format(checkOut, "MM/dd/yyyy") : "",
      soLuongKhach: 0,
      maNguoiDung: user?.user.id,
    },
  });

  const onSubmit = (data: BookRoom) => {
    if (!user) {
      return toast.warning("Vui lòng đăng nhập để đặt phòng");
    }
    if (!checkIn || !checkOut) return;
    const hasConflit = listRoom
      .filter((r) => r.maPhong === Number(idRoom))
      .some((r) => {
        return (
          new Date(checkIn) <= new Date(r.ngayDi) &&
          new Date(checkOut) >= new Date(r.ngayDen)
        );
      });
    if (hasConflit) {
      toast.error("Khoảng thời gian này đã có người đặt!");
      return;
    }

    handleBooking({ ...data, soLuongKhach: guest });
  };

  const { mutate: handlePostComment } = useMutation({
    mutationFn: (data: PostComment) => postCommentApi(data),
    onSuccess: () => {
      toast.success("Bình luận thành công");
      resetComment();
      setRating(0);
      queryClient.invalidateQueries({ queryKey: ["comment", idRoom] });
    },
    onError: (error) => {
      console.log("❌ Lỗi comment:", error);
      toast.error("Gửi bình luận thất bại");
    },
  });

  const {
    register,
    handleSubmit: handleSubmitComment,
    reset: resetComment,
  } = useForm<PostComment>({
    defaultValues: {
      id: 0,
      maPhong: Number(idRoom),
      maNguoiBinhLuan: user?.user.id,
      ngayBinhLuan: "",
      noiDung: "",
      saoBinhLuan: rating,
    },
  });

  const onSubmitComment = (comment: PostComment) => {
    handlePostComment({
      ...comment,
      saoBinhLuan: rating,
      ngayBinhLuan: new Date().toISOString(),
    });
  };

  const handleGuestChange = (g: number, incre: boolean) => {
    if (incre && guest < g) {
      setGuest(guest + 1);
    } else if (!incre && guest >= 1) {
      setGuest(guest - 1);
    }
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = differenceInDays(end, start);
      return diffTime;
    }
    return 0;
  };

  const nights = calculateNights();

  useEffect(() => {
    if (!listRoom) return;
    const dates: Date[] = [];
    listRoom
      .filter((r) => r.maPhong === Number(idRoom))
      .map((r) => {
        const result = eachDayOfInterval({
          start: parseISO(r.ngayDen),
          end: parseISO(r.ngayDi),
        });
        dates.push(...result);
      });
    setDisabledDates(dates);
  }, [listRoom, idRoom]);

  if (isLoading) return <RoomDetailSkeleton />;
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
              src="/images/user-room.jpg"
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
                [...comment]
                  .sort(
                    (a, b) =>
                      new Date(b.ngayBinhLuan).getTime() -
                      new Date(a.ngayBinhLuan).getTime()
                  )
                  .map((c) => (
                    <div key={c.id} className="flex gap-4 border-b pb-4">
                      {/* Avatar */}
                      <img
                        src={c.avatar ? c.avatar : "/images/logo.svg"}
                        alt={c.tenNguoiBinhLuan || "User"}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">
                            {c.tenNguoiBinhLuan}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {c.ngayBinhLuan &&
                            !isNaN(new Date(c.ngayBinhLuan).getTime())
                              ? formatDistanceToNow(new Date(c.ngayBinhLuan), {
                                  addSuffix: true,
                                  locale: vi,
                                })
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
            {user ? (
              <>
                <div className="mt-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setRating(i + 1)}
                        className={`cursor-pointer text-2xl ${
                          i < rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Viết bình luận..."
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    rows={3}
                    {...register("noiDung")}
                  />
                  <Button
                    onClick={handleSubmitComment(onSubmitComment)}
                    className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:bg-pink-600 cursor-pointer"
                  >
                    Gửi bình luận
                  </Button>
                </div>
              </>
            ) : (
              <Alert className="bg-amber-50 border border-amber-200">
                <AlertCircleIcon />
                <AlertTitle>Cần đăng nhập để bình luận</AlertTitle>
              </Alert>
            )}
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
              <Popover>
                <PopoverTrigger asChild>
                  <div className="p-3 cursor-pointer hover:bg-gray-50">
                    <p className="text-xs font-semibold uppercase">
                      Nhận phòng
                    </p>
                    <p className="text-sm text-gray-600">
                      {checkIn ? format(checkIn, "dd/MM/yyyyy") : "Chọn ngày"}
                    </p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      setCheckIn(date);

                      setValue(
                        "ngayDen",
                        date ? format(date, "MM/dd/yyyy") : ""
                      );
                    }}
                    disabled={(date) => {
                      const isBooked = disabledDates.some(
                        (d) => d.toDateString() === date.toDateString()
                      );

                      // Nếu đã chọn checkOut thì không cho chọn ngày sau checkOut
                      const isAfterCheckOut = checkOut
                        ? date >= checkOut
                        : false;

                      return isBooked || isAfterCheckOut;
                    }}
                  />
                </PopoverContent>
              </Popover>

              {/* Check-out */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="p-3 cursor-pointer hover:bg-gray-50">
                    <p className="text-xs font-semibold uppercase">Trả phòng</p>
                    <p className="text-sm text-gray-600">
                      {checkOut ? format(checkOut, "dd/MM/yyyy") : "Chọn ngày"}
                    </p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      setCheckOut(date);
                      setValue(
                        "ngayDi",
                        date ? format(date, "MM/dd/yyyy") : ""
                      );
                    }}
                    disabled={(date) => {
                      const isBooked = disabledDates.some(
                        (d) => d.toDateString() === date.toDateString()
                      );

                      const isBeforeCheckIn = checkIn ? date <= checkIn : false;

                      return isBooked || isBeforeCheckIn;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-700">
                    Khách
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    {guest} {guest === 1 ? "khách" : "khách"}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleGuestChange(room.khach, false)}
                    disabled={guest <= 1}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="min-w-[2rem] text-center font-semibold text-gray-900">
                    {guest}
                  </span>
                  <button
                    onClick={() => handleGuestChange(room.khach, true)}
                    disabled={guest >= room.khach}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {nights > 0 && (
              <div className="space-y-3 py-4 border-t border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ${room.giaTien} x {nights} {nights === 1 ? "đêm" : "đêm"}
                  </span>
                  <span className="font-medium">${room.giaTien * nights}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí dịch vụ</span>
                  <span className="font-medium">$15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Thuế</span>
                  <span className="font-medium">
                    ${Math.round(nights * room.giaTien * 0.1)}
                  </span>
                </div>
              </div>
            )}

            {/* Tổng tiền */}
            {nights > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-bold text-gray-900">
                  Tổng cộng
                </span>
                <span className="text-xl font-bold text-purple-600">
                  $
                  {nights * room.giaTien +
                    15 +
                    Math.round(nights * room.giaTien * 0.1)}
                </span>
              </div>
            )}

            {/* Button */}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  disabled={!checkIn || !checkOut}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                >
                  {checkIn && checkOut
                    ? "Đặt phòng ngay"
                    : "Chọn ngày để đặt phòng"}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Bạn có chắc chắn đặt phòng không ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Xác nhận nếu bạn muốn đặt phòng
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white cursor-pointer"
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      Đặt phòng
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
