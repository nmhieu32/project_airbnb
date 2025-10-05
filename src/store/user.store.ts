import { create } from "zustand";
import type { User } from "@/interfaces/auth.interface";

type UserStore = {
  users: User[];
  setUsers: (newUsers: User[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),
}));
