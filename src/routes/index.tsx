import { lazy, Suspense, type FC, type LazyExoticComponent } from "react";
import type { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomeTemplate/HomePage"));
const LoginPage = lazy(() => import("@/pages/AuthTemplate/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/AuthTemplate/RegisterPage"));
const AdminTemplate = lazy(() => import("@/pages/AdminTemplate"));
const AuthTemplate = lazy(() => import("@/pages/AuthTemplate"));
const ListRoom = lazy(() => import("@/pages/HomeTemplate/ListRoomPage"));
const RoomDetails = lazy(() => import("@/pages/HomeTemplate/RoomDetailsPage"));
const UserDetails = lazy(() => import("@/pages/HomeTemplate/UserDetailsPage"));
const UsersManagement = lazy(
  () => import("@/pages/AdminTemplate/UsersManagement")
);
const LocationsManagement = lazy(
  () => import("@/pages/AdminTemplate/LocationsManagement")
);
const RoomsManagement = lazy(
  () => import("@/pages/AdminTemplate/RoomsManagement")
);
const BookingRoomManagement = lazy(
  () => import("@/pages/AdminTemplate/BookingRoomManagement")
);

const withSuspense = (Component: LazyExoticComponent<FC>) => {
  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Component />
    </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: withSuspense(HomePage),
  },
  {
    path: "/list-room",
    element: withSuspense(ListRoom),
  },
  {
    path: "/room-details",
    element: withSuspense(RoomDetails),
  },
  {
    path: "/user-details",
    element: withSuspense(UserDetails),
  },
  {
    path: "/admin",
    element: withSuspense(AdminTemplate),
    children: [
      {
        path: "users-management",
        element: withSuspense(UsersManagement),
      },
      {
        path: "locations-management",
        element: withSuspense(LocationsManagement),
      },
      {
        path: "rooms-management",
        element: withSuspense(RoomsManagement),
      },
      {
        path: "booking-room-management",
        element: withSuspense(BookingRoomManagement),
      },
    ],
  },
  {
    path: "/auth",
    element: withSuspense(AuthTemplate),
    children: [
      {
        path: "login",
        element: withSuspense(LoginPage),
      },
      {
        path: "register",
        element: withSuspense(RegisterPage),
      },
    ],
  },
];
