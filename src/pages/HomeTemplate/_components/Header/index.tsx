import { useModalStore } from "@/store/modal.store";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "../../Login";
import Register from "../../Register";
import { useAuthStore } from "@/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setShowLogin, setShowRegister } = useModalStore();
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Nơi lưu trú", icon: "🏠" },
    { to: "/experience", label: "Trải nghiệm", icon: "🎈" },
    { to: "/service", label: "Dịch vụ", icon: "🎁" },
  ];

  const handleLogout = () => {
    clearUser();
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink
                to=""
                className="group flex items-center fill-purple-600 text-purple-600 hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <svg
                    className="size-10 relative transform group-hover:rotate-12 transition-transform duration-300"
                    viewBox="0 0 14 14"
                    role="img"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M 7.0005001,10.137304 C 6.3242184,9.288951 5.9265527,8.545641 5.7939975,7.908876 5.6624427,7.395662 5.7144644,6.984991 5.9395582,6.676363 6.1781576,6.321215 6.5333055,6.148643 6.9999999,6.148643 c 0.4666944,0 0.8213422,0.172572 1.0599416,0.531221 0.2230929,0.305127 0.2791162,0.716299 0.1430596,1.232514 -0.1455607,0.64927 -0.5427261,1.39258 -1.2060024,2.228928 z M 11.801,10.707542 c -0.09254,0.622759 -0.517216,1.139475 -1.100459,1.39158 C 9.5745724,12.589326 8.459608,11.8075 7.5052104,10.747059 9.0833678,8.771235 9.3749893,7.233095 8.6977072,6.23818 8.3000415,5.667943 7.7308044,5.390327 7.0005001,5.390327 c -1.4721132,0 -2.2814504,1.245519 -1.9633179,2.691121 0.1850771,0.782326 0.6757816,1.671696 1.4581075,2.666111 C 6.0050855,11.289785 5.5403919,11.675445 5.1297208,11.914045 4.8115883,12.086116 4.5069614,12.192661 4.2153399,12.218171 2.8762821,12.417754 1.8263447,11.118713 2.3030433,9.778655 2.3690703,9.606083 2.5006256,9.288451 2.7257193,8.797746 l 0.012505,-0.02651 C 3.4700294,7.182574 4.3588997,5.376821 5.3803252,3.373987 L 5.4068362,3.307957 5.6969571,2.750224 C 5.9220509,2.339053 6.0145894,2.154976 6.3727386,1.928382 6.5453105,1.823838 6.7573989,1.771316 6.995498,1.771316 c 0.4771988,0 0.8488537,0.278616 1.0079199,0.50321 0.079033,0.11955 0.1725719,0.278616 0.2911213,0.476699 l 0.2791163,0.544226 0.040017,0.07953 C 9.6340976,5.376815 10.523968,7.179066 11.252771,8.77173 l 0.01301,0.01251 0.266611,0.610254 0.159066,0.382159 c 0.121551,0.306128 0.147061,0.610755 0.106544,0.928887 z M 12.410754,9.512544 C 12.317714,9.220923 12.158649,8.876779 11.960566,8.465608 l 0,-0.01501 C 11.016673,6.447267 10.139808,4.646517 9.3074612,3.028343 L 9.2519382,2.947313 C 8.6586911,1.730807 8.2340142,1.000002 7.0005003,1.000002 c -1.219508,0 -1.7377239,0.847353 -2.2674445,1.949312 l -0.040517,0.08003 C 3.8581912,4.647018 2.9818261,6.45027 2.0409342,8.452604 l 0,0.02651 -0.2791163,0.609754 C 1.6567741,9.340973 1.6032518,9.473028 1.589246,9.512544 c -0.67528132,1.856774 0.7162984,3.487453 2.4010002,3.487453 0.013506,0 0.066027,0 0.132055,-0.01351 l 0.1860775,0 c 0.8753647,-0.106544 1.7772404,-0.662776 2.6921215,-1.658691 0.9143809,0.994415 1.8172571,1.552147 2.6911211,1.658691 l 0.1860775,0 c 0.066028,0.01351 0.1190496,0.01351 0.1320552,0.01351 1.684701,0.0015 3.076281,-1.630679 2.401,-3.487453 z"></path>
                    </g>
                  </svg>
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  airbnb
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium ${
                      isActive ? "my-active text-purple-600 bg-purple-50" : "hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </NavLink>
              ))}
            </nav>

            {/* User Section / Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full">
                  <span className="text-gray-700 font-medium text-sm">
                    Xin chào, <span className="font-bold text-purple-600">{user.user?.name}</span>
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none cursor-pointer group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <Avatar className="w-11 h-11 border-2 border-white shadow-lg ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all duration-300 relative">
                          <AvatarImage
                            src={user.user?.avatar}
                            alt={user.user?.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                            {user.user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 mt-2 rounded-2xl shadow-xl border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.user?.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{user.user?.email}</p>
                      </div>
                      <DropdownMenuItem
                        onClick={() => navigate("user-details")}
                        className="font-medium cursor-pointer py-3 px-4 hover:bg-purple-50 rounded-lg m-1 transition-colors"
                      >
                        <span className="mr-2">👤</span>
                        Thông tin người dùng
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 cursor-pointer hover:bg-red-50 font-medium py-3 px-4 rounded-lg m-1 transition-colors"
                      >
                        <span className="mr-2">🚪</span>
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => setShowLogin(true)}
                  className="relative px-6 py-2.5 text-gray-700 hover:text-purple-600 font-semibold transition-all duration-300 rounded-xl hover:bg-gray-50 group"
                >
                  <span className="relative">
                    Đăng nhập
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                >
                  <span className="relative z-10">Đăng ký</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center space-y-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-100 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? "my-active bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600" 
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}

                {user ? (
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl mb-3">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                        <AvatarImage
                          src={user.user?.avatar}
                          alt={user.user?.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                          {user.user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.user.name}</p>
                        <p className="text-xs text-gray-500">{user.user.email}</p>
                      </div>
                    </div>
                    <NavLink
                      to="user-details"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <span>👤</span>
                      <span>Thông tin người dùng</span>
                    </NavLink>
                    <button
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors mt-2"
                      onClick={handleLogout}
                    >
                      <span>🚪</span>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 mt-4">
                    <button
                      className="w-full px-4 py-3 text-gray-700 font-semibold hover:bg-gray-50 rounded-xl transition-all duration-300"
                      onClick={() => setShowLogin(true)}
                    >
                      Đăng nhập
                    </button>
                    <button
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setShowRegister(true)}
                    >
                      Đăng ký
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <Login />
      <Register />
    </>
  );
}
