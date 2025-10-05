import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginApi } from "@/services/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { useModalStore } from "@/store/modal.store";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useEffect } from "react";

const schema = z.object({
  email: z.string().nonempty("Email không được để trống"),
  password: z.string().nonempty("Mật khẩu không được để trống"),
});

type LoginFormInput = z.infer<typeof schema>;

export default function Login() {
  const { showLogin, setShowLogin, setShowRegister } = useModalStore();
  const {  setUser } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (data: LoginFormInput) => loginApi(data),
    onSuccess: (currentUser) => {
      setShowLogin(false);
      setUser(currentUser),
        navigate(currentUser?.user.role === "ADMIN" ? "/admin" : "/");
    },
    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginFormInput) => {
    handleLogin(data);
  };

  useEffect(() => {
    if (showLogin) reset();
  }, [showLogin, reset]);

  return (
    <>
      {showLogin && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-white/20 animate-in slide-in-from-bottom-4 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50"></div>

            {/* Content */}
            <div className="relative p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Đăng nhập
                </h2>
                <p className="text-gray-500 mt-2">
                  Chào mừng bạn quay trở lại!
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Email field */}
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
                      placeholder="Nhập email của bạn"
                      {...register("email")}
                      className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder:text-gray-400"
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

                {/* Password field */}
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
                      placeholder="Nhập mật khẩu"
                      {...register("password")}
                      className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder:text-gray-400"
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

                {/* Buttons */}
                <div className="space-y-4">
                  {isPending ? (
                    <>
                      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                        <div className="bg-white rounded-full p-4 shadow-lg">
                          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        </div>
                      </div>
                      <Button
                        disabled
                        className="w-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white py-3.5 rounded-xl font-semibold shadow-lg opacity-75 cursor-not-allowed"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Đang đăng nhập...</span>
                        </div>
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
                    >
                      Đăng nhập
                    </Button>
                  )}

                  <Button
                    type="button"
                    onClick={() => {
                      setShowRegister(true);
                      setShowLogin(false);
                    }}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center space-x-2">
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
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      <span>Chưa có tài khoản?</span>
                    </span>
                  </Button>
                </div>
              </form>

              {/* Close button */}
              <button
                onClick={() => setShowLogin(false)}
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
