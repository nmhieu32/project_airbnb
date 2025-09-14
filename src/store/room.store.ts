import type { Room } from "@/interfaces/room.interface";
import { create } from "zustand";

type RoomStore = {
  room: Room[] | null;
  setRoom: (newRoom: Room[]) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  room: null,
  setRoom: (newRoom: Room[]) => {
    set({ room: newRoom });
  },
}));
