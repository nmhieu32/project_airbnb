import { create } from "zustand";

type ModalStore = {
  showLogin: boolean;
  showRegister: boolean;
  setShowLogin: (login: boolean) => void;
  setShowRegister: (register: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  showLogin: false,
  showRegister: false,
  setShowLogin: (login: boolean) => {
    set({ showLogin: login });
  },
  setShowRegister: (register: boolean) => {
    set({ showRegister: register });
  },
}));