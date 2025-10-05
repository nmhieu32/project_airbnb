import { lazy, Suspense, type FC, type LazyExoticComponent } from "react";
import type { RouteObject } from "react-router-dom";

const HomeTemplate = lazy(() => import("@/pages/HomeTemplate"));
const HomePage = lazy(() => import("@/pages/HomeTemplate/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/HomeTemplate/NotFoundPage"));
const AdminTemplate = lazy(() => import("@/pages/AdminTemplate"));
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
    <Suspense
      fallback={
        <div className="backdrop">
          {" "}
          <div className="loader mx-auto"></div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: withSuspense(HomeTemplate),
    children: [
      {
        path: "",
        element: withSuspense(HomePage),
      },
      {
        path: "list-rooms/:slug",
        element: withSuspense(ListRoom),
      },
      {
        path: "room-details/:idRoom",
        element: withSuspense(RoomDetails),
      },
      {
        path: "user-details",
        element: withSuspense(UserDetails),
      },
    ],
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
    path: "*",
    element: withSuspense(NotFoundPage),
  },
];
