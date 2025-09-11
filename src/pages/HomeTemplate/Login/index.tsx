import { useModalStore } from "@/store/modal.store";

export default function Login() {
  const { showLogin, setShowLogin } = useModalStore();
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
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Đăng nhập
              </button>
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
