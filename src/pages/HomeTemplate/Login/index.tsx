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

const schema = z.object({
  email: z.string().nonempty("Email không được để trống"),
  password: z.string().nonempty("Mật khẩu không được để trống"),
});

type LoginFormInput = z.infer<typeof schema>;

export default function Login() {
  const { showLogin, setShowLogin } = useModalStore();
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (data: LoginFormInput) => loginApi(data),
    onSuccess: (currentUser) => {
      setShowLogin(false);
      setUser(currentUser),
        navigate(user?.user.role === "ADMIN" ? "/admin" : "/");
    },
    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    },
  });

  const {
    register,
    handleSubmit,
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
  return (
    <>
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="text"
                placeholder="Email"
                {...register("email")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.email?.message && (
                <Alert variant="destructive" className="border-none p-0">
                  <AlertCircleIcon/>
                  <AlertTitle>{errors.email.message}</AlertTitle>
                </Alert>
              )}
              <Input
                type="password"
                placeholder="Mật khẩu"
                {...register("password")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.password?.message && (
                <Alert variant="destructive" className="border-none p-0">
                  <AlertCircleIcon/>
                  <AlertTitle>{errors.password.message}</AlertTitle>
                </Alert>
              )}
              {isPending ? (
                <>
                  <div className="backdrop">
                    <div className="loader mx-auto"></div>
                  </div>
                  <Button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 cursor-pointer">
                    Đang đăng nhập...
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 cursor-pointer"
                >
                  Đăng nhập
                </Button>
              )}

              <Button
                type="submit"
                className="w-full bg-gray-300 text-white py-2 rounded hover:bg-gray-400 cursor-pointer"
              >
                Chưa có tài khoản
              </Button>
            </form>
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
