import type { Location } from "@/interfaces/location.interface";
import { create } from "zustand";

type LocationStore = {
  location: Location[] | null;
  setLocation: (newLoc: Location[]) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  setLocation: (newLoc: Location[]) => {
    set({ location: newLoc });
  },
}));
