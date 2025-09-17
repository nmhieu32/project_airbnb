import type { CurrentUser } from "@/interfaces/auth.interface";
import { create } from "zustand";

const userLocal = localStorage.getItem("user");
const parseUser: CurrentUser | null = userLocal ? JSON.parse(userLocal) : null;

type AuthStore = {
  user: CurrentUser | null;
  setUser: (user: CurrentUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: parseUser,
  setUser: (user: CurrentUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
