import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { registerApi } from "@/services/auth.api";
import { useModalStore } from "@/store/modal.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { AlertCircleIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống")
    .min(3, "Mật khẩu ít nhất 3 ký tự"),
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

type RegisterForm = z.infer<typeof schema>;

export default function Register() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { showRegister, setShowRegister, setShowLogin } = useModalStore();

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (data: RegisterForm) => registerApi(data),
    onSuccess: () => {
      toast.success("Đăng ký thành công !");
      setShowRegister(false);
      setShowLogin(true);
    },
    onError: (error: any) => {
      console.log("🌿 ~ Register ~ error:", error);
      if (error.response) {
        toast.error(error.response.data?.content);
      }
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: false,
      role: "USER",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterForm) => {
    handleRegister(data);
  };

  useEffect(() => {
    if (showRegister) {
      reset();
      setDate(undefined);
    }
  }, [showRegister, reset]);

  return (
    <>
      {showRegister && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden border border-white/20 animate-in slide-in-from-bottom-4 duration-500 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>

            <div className="relative p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Đăng ký tài khoản
                </h2>
                <p className="text-gray-500 mt-2">
                  Tạo tài khoản mới để bắt đầu!
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <Input
                      type="text"
                      placeholder="Nhập họ và tên của bạn"
                      className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
                      {...register("name")}
                    />
                  </div>
                  {errors.name?.message && (
                    <Alert
                      variant="destructive"
                      className="border-none p-3 bg-red-50 rounded-lg animate-in slide-in-from-top-1 duration-200"
                    >
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertTitle className="text-sm">
                        {errors.name.message}
                      </AlertTitle>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <Input
                      type="text"
                      placeholder="Nhập địa chỉ email"
                      className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
                      {...register("email")}
                    />
                  </div>
                  {errors.email?.message && (
                    <Alert
                      variant="destructive"
                      className="border-none p-3 bg-red-50 rounded-lg animate-in slide-in-from-top-1 duration-200"
                    >
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertTitle className="text-sm">
                        {errors.email.message}
                      </AlertTitle>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <Input
                      type="password"
                      placeholder="Tạo mật khẩu mạnh"
                      className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
                      {...register("password")}
                    />
                  </div>
                  {errors.password?.message && (
                    <Alert
                      variant="destructive"
                      className="border-none p-3 bg-red-50 rounded-lg animate-in slide-in-from-top-1 duration-200"
                    >
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertTitle className="text-sm">
                        {errors.password.message}
                      </AlertTitle>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <Input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone?.message && (
                    <Alert
                      variant="destructive"
                      className="border-none p-3 bg-red-50 rounded-lg animate-in slide-in-from-top-1 duration-200"
                    >
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertTitle className="text-sm">
                        {errors.phone.message}
                      </AlertTitle>
                    </Alert>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 block">
                      Ngày sinh
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-normal py-3 px-4 bg-white/80 border-2 border-gray-200 rounded-xl hover:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
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
                                date ? "text-gray-900" : "text-gray-400"
                              }
                            >
                              {date
                                ? format(date, "dd/MM/yyyy")
                                : "Chọn ngày sinh"}
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
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(date: any) => {
                            setValue("birthday", format(date, "dd/MM/yyyy"));
                            setDate(date);
                            setOpen(false);
                          }}
                          className="rounded-xl"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.birthday?.message && (
                      <Alert
                        variant="destructive"
                        className="border-none p-3 bg-red-50 rounded-lg animate-in slide-in-from-top-1 duration-200"
                      >
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertTitle className="text-sm">
                          {errors.birthday.message}
                        </AlertTitle>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 block">
                      Giới tính
                    </Label>
                    <div className="flex items-center gap-4 h-12">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <Input
                            type="radio"
                            value="true"
                            defaultChecked
                            {...register("gender")}
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200 group-hover:border-blue-400"></div>
                          <div className="absolute inset-0 w-5 h-5 rounded-full bg-white scale-0 peer-checked:scale-50 transition-transform duration-200"></div>
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                          Nam
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <Input
                            type="radio"
                            value="false"
                            {...register("gender")}
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200 group-hover:border-blue-400"></div>
                          <div className="absolute inset-0 w-5 h-5 rounded-full bg-white scale-0 peer-checked:scale-50 transition-transform duration-200"></div>
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                          Nữ
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {isPending ? (
                  <>
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                      <div className="bg-white rounded-full p-4 shadow-lg">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <button
                      disabled
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3.5 rounded-xl font-semibold shadow-lg opacity-75 cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang tạo tài khoản...</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      <span>Tạo tài khoản</span>
                    </div>
                  </button>
                )}
              </form>

              <div className="text-center mt-6 p-4 bg-gray-50/50 rounded-xl">
                <p className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setShowRegister(false);
                      setShowLogin(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200 cursor-pointer"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              </div>

              <button
                onClick={() => setShowRegister(false)}
                className="absolute top-6 right-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}