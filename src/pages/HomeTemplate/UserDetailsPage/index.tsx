import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/interfaces/auth.interface";
import type { BaseApiResponse } from "@/interfaces/base.interface";
import { api } from "@/services/api";
import { updateUserApi } from "@/services/auth.api";
import { getRoomByUserApi, getRoomDetailsApi } from "@/services/room.api";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import UserDetailsSke from "../_components/Skeleton/user-details.ske";

const schema = z.object({
  id: z.number().default(0),
  name: z
    .string()
    .nonempty("Họ và tên không được để trống")
    .min(2, "Họ tên ít nhất 2 ký tự")
    .max(50, "Họ tên tối đa 50 ký tự")
    .regex(
      /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
      "Họ tên không hợp lệ"
    ),
  email: z
    .string()
    .nonempty("Email không được để trống")
    .regex(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email không hợp lệ"
    ),
  phone: z
    .string()
    .nonempty("Số điện thoại không được để trống")
    .regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ"),
  birthday: z
    .string()
    .nonempty("Ngày sinh không được để trống")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
      "Ngày sinh không hợp lệ"
    ),
  gender: z.preprocess((val) => val === "true", z.boolean()),
  role: z.string().default("USER"),
});

type FormInput = z.infer<typeof schema>;

export default function UserDetailsPage() {
  const { user, setUser } = useAuthStore();
  if (!user) return <Navigate to="/" />;
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(user.user.avatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    data: listRoom,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user-detail", user.user.id],
    queryFn: () => getRoomByUserApi(user.user.id),
  });
  const mapped = listRoom?.map((item) => item.maPhong);

  const { data: roomDetails, isLoading: loadingRoomDetail } = useQuery({
    queryKey: ["room-detail", mapped],
    queryFn: async () => {
      if (!mapped?.length) return [];
      const roomDetail = await Promise.all(
        //Promise.all([...]) sẽ chờ tất cả getRoomDetailsApi(id) chạy xong, trả về mảng kết quả.
        mapped?.map((id) => getRoomDetailsApi(id))
      );
      return roomDetail;
    },
    enabled: !!mapped?.length,
  });

  const { mutate: handleUpdateUser, isPending } = useMutation({
    mutationFn: (data: FormInput) => updateUserApi(data, user.user.id),
    onSuccess: (userDetail) => {
      toast.success("Cập nhật thành công !");
      setOpenModal(false);
      setUser({ ...user, user: userDetail });
    },
    onError: (error: any) => {
      console.log("🌿 ~ UserDetailsPage ~ error:", error);
      if (error.response) {
        toast.error(error.response.data.content);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      id: 0,
      name: user.user.name,
      email: user.user.email,
      phone: user.user.phone,
      birthday: user.user.birthday,
      gender: user.user.gender,
      role: "USER",
    },
    resolver: zodResolver(schema),
  });

  const birthday = form.watch("birthday");

  const onSubmit = (data: FormInput) => {
    handleUpdateUser(data);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    form.reset({
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      phone: user.user.phone,
      birthday: user.user.birthday,
      gender: user.user.gender,
      role: "USER",
    });
  };

  const handleUpload = async () => {
    if (!selectedFile)
      return toast.warning("Vui lòng chọn ảnh trước khi upload");
    const formData = new FormData();
    formData.append("formFile", selectedFile);

    try {
      const response = await api.post<BaseApiResponse<User>>(
        "users/upload-avatar",
        formData
      );
      toast.success("Thay đổi hình đại diện thành công !");
      setUser({ ...user, user: response.data.content });
      setSelectedFile(null);
      setOpenImg(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.content);
        setSelectedFile(null);
        setPreview(user.user.avatar);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };
  if (isLoading && loadingRoomDetail) return <UserDetailsSke />;
  if (isError) return <div>Đã xảy ra lỗi</div>;

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-4 sm:p-6 gap-4 sm:gap-6">
      {/* Sidebar trái */}
      <div className="w-full lg:w-1/4 flex flex-col items-center border rounded-xl p-4 shadow-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50 [color-scheme:light]"></div>
          <img
            src={user.user.avatar}
            alt="Avatar"
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-4 border-white"></div>
        </div>

        <Dialog open={openImg} onOpenChange={setOpenImg}>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setPreview(user.user.avatar);
                setOpenImg(true);
              }}
              className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs sm:text-sm rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium cursor-pointer [color-scheme:light]"
            >
              Cập nhật ảnh
            </button>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-base sm:text-lg">
                Thay đổi ảnh đại diện
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4">
              {/* Hiển thị ảnh preview */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border">
                <img
                  src={preview}
                  alt="Avatar Preview"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Chọn file */}
              <Input
                type="file"
                id="image"
                ref={inputRef}
                accept=".png,.jpeg,.jpg, .gif"
                onChange={(events) => {
                  const hinhAnh = events.target.files?.[0];
                  if (hinhAnh) {
                    setPreview(URL.createObjectURL(hinhAnh));
                    setSelectedFile(hinhAnh);
                  }
                }}
                className="text-sm"
              />

              {/* Nút Upload */}
              <DialogFooter className="w-full">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform text-white w-full cursor-pointer text-sm [color-scheme:light]"
                  onClick={handleUpload}
                >
                  Upload Avatar
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img className="w-5 sm:w-6" src="images/verify.png" alt="Verify" />
            <h3 className="text-xs sm:text-sm font-bold text-gray-800">
              Xác minh danh tính
            </h3>
          </div>
          <p className="text-xs text-gray-600 text-center mb-3">
            Xác thực danh tính của bạn với huy hiệu xác minh
          </p>
          <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border-2 border-purple-200 rounded-xl text-xs sm:text-sm text-gray-700 font-medium hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 hover:shadow-md">
            ✨ Nhận huy hiệu
          </button>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-xl w-full">
          <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-2">
            {user.user.name} đã xác nhận
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <span className="text-green-500 font-bold">✓</span>
              <span>Địa chỉ email</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 w-full">
        <h2 className="text-xl sm:text-2xl font-bold">
          Xin chào, tôi là {user.user.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Bắt đầu tham gia vào 2021</p>
        <button
          onClick={handleOpenModal}
          className="text-xs sm:text-sm text-purple-500 hover:underline cursor-pointer font-bold"
        >
          Chỉnh sửa hồ sơ
        </button>

        <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold">{roomDetails?.length || 0} Phòng đã thuê</h3>

        {/* Danh sách phòng */}
        <div className="mt-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto space-y-3 sm:space-y-4 pr-2">
          {roomDetails?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row border rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/room-details/${item?.id}`)}
            >
              <img
                src={item?.hinhAnh}
                alt={item?.tenPhong}
                className="w-full sm:w-40 md:w-48 h-40 sm:h-36 object-cover"
              />
              <div className="flex-1 p-3 sm:p-4">
                <h4 className="font-medium text-sm sm:text-base text-gray-800">{item?.tenPhong}</h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {item?.khach} khách · Phòng studio · {item?.giuong} giường ·{" "}
                  {item?.phongTam} phòng tắm
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                  {item?.wifi && (
                    <span className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium whitespace-nowrap">
                      📶 Wifi
                    </span>
                  )}
                  {item?.bep && (
                    <span className="px-2 sm:px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium whitespace-nowrap">
                      🍳 Bếp
                    </span>
                  )}
                  {item?.dieuHoa && (
                    <span className="px-2 sm:px-3 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full font-medium whitespace-nowrap">
                      ❄️ Điều hoà
                    </span>
                  )}
                  {item?.mayGiat && (
                    <span className="px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium whitespace-nowrap">
                      🧺 Máy giặt
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3 sm:p-4 text-right sm:text-right text-left font-semibold text-sm sm:text-base text-gray-800 border-t sm:border-t-0 sm:border-l">
                {item?.giaTien}{" "}
                <span className="text-xs sm:text-sm font-normal">/ đêm</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup (modal) chỉnh sửa hồ sơ */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white animate-in fade-in zoom-in duration-300 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Chỉnh sửa hồ sơ
            </h3>
            <Form {...form}>
              <form
                className="space-y-3 sm:space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Họ tên */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Họ tên</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Giới tính</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <SelectValue placeholder="gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Nam</SelectItem>
                          <SelectItem value="false">Nữ</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Ngày sinh</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between font-normal py-2 sm:py-3 px-3 sm:px-4 bg-white/80 border-2 border-gray-200 rounded-xl hover:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-sm"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span
                                className={
                                  birthday ? "text-gray-900" : "text-gray-400"
                                }
                              >
                                {birthday || "Chọn ngày sinh"}
                              </span>
                            </div>
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={birthday ? new Date(birthday) : undefined}
                            captionLayout="dropdown"
                            onSelect={(date: any) => {
                              if (date) {
                                field.onChange(format(date, "dd/MM/yyyy"));
                              }

                              setOpen(false);
                            }}
                            className="rounded-xl"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nút */}
                <div className="flex justify-end gap-2 sm:gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    className="px-3 sm:px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm"
                  >
                    {isPending ? (
                      <div className="loader1 !w-4"></div>
                    ) : (
                      "Cập nhật"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}