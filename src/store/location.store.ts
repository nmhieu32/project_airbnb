import type { Location } from "@/interfaces/location.interface";
import { create } from "zustand";

type LocationStore = {
  location: Location[] | null;
  locationSelect: string
  guests: number | null,
  setLocation: (newLoc: Location[]) => void;
  setLocationSelect: (newSelect: string) => void
  setGuests: (newGuest: number) => void
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  locationSelect: "",
  guests: null,
  setLocation: (newLoc: Location[]) => {
    set({ location: newLoc });
  },
  setLocationSelect(newSelect: string) {
    set({locationSelect: newSelect})
  },
  setGuests(newGuest: number) {
    set({guests: newGuest})
  },
}));
