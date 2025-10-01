import type { Location } from "@/interfaces/location.interface";
import { create } from "zustand";

type LocationStore = {
  location: Location[] | null;
  locationSelect: string | undefined;
  guests: number | null;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  setLocation: (newLoc: Location[]) => void;
  setLocationSelect: (newSelect: string) => void;
  setGuests: (newGuest: number) => void;
  setCheckIn: (newCheckIn: Date | undefined) => void;
  setCheckOut: (newCheckOut: Date | undefined) => void;
  clearSearch: () => void
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  locationSelect: undefined,
  guests: null,
  checkIn: new Date(),
  checkOut: undefined,
  setLocation: (newLoc: Location[]) => {
    set({ location: newLoc });
  },
  setLocationSelect(newSelect: string) {
    set({ locationSelect: newSelect });
  },
  setGuests(newGuest: number) {
    set({ guests: newGuest });
  },
  setCheckIn(newCheckIn: Date | undefined) {
    set({ checkIn: newCheckIn });
  },
  setCheckOut(newCheckOut: Date | undefined) {
    set({ checkOut: newCheckOut });
  },
  clearSearch() {
    set({locationSelect: "", guests: null, checkIn: new Date(), checkOut: undefined})
  }
}));
