import { getListLocationApi } from "@/services/location.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toSlug } from "./slug";
import { getListRoomByLocationApi } from "@/services/room.api";
import { useRoomStore } from "@/store/room.store";

export default function useLocationRoom(locationSelect: string | undefined) {
    const {setRoom} = useRoomStore()
    const { data: locations } = useQuery({
    queryKey: ["get-location"],
    queryFn: () => getListLocationApi(),
  });

  const mapped = locations?.map((loc) => {
    return {
      ...loc,
      slug: toSlug(loc.tinhThanh),
    };
  });

  const findLocation = mapped?.find((loc) => toSlug(loc.tinhThanh) === locationSelect);

  const {
    data: rooms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rooms", findLocation?.id],
    queryFn: async () => {
      const hasRoom = await getListRoomByLocationApi(findLocation?.id);
      if (hasRoom) {
        setRoom(hasRoom);
      }
      return hasRoom;
    },
    enabled: !!findLocation?.id,
    placeholderData: keepPreviousData,
  });
  const maxGuest = Math.max(...(rooms?.map((r) => r.khach) ?? [0]));
  return {
    locations: mapped,
    findLocation,
    rooms,
    maxGuest,
    isLoading,
    isError
  }
}