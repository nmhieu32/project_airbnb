import { getListLocationPaginationApi } from "@/services/location.api";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import LocationSkeleton from "../../_components/Skeleton/location.ske";
import { useLocationStore } from "@/store/location.store";
import { toSlug } from "@/utils/slug";

export default function DefaultLocation() {
  const { setLocation } = useLocationStore();
  const { data: defaultLocations = [], isLoading } = useQuery({
    queryKey: ["get-location-pagination"],
    queryFn: async () => {
      const loc = await getListLocationPaginationApi(1, 8);
      if (loc) {
        setLocation(loc);
      }
      return loc;
    },
  });
  
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Khám phá những điểm đến gần đây
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <LocationSkeleton key={index} />
              ))
            : defaultLocations.map((location) => {
                const slug = toSlug(location.tinhThanh);

                return (
                  <NavLink
                    to={`list-rooms/${slug}`}
                    key={location.id}
                    className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden mb-3">
                      <img
                        src={location.hinhAnh}
                        alt={location.tenViTri}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {location.tinhThanh}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 10) + 1} giờ lái xe
                    </p>
                  </NavLink>
                );
              })}
        </div>
      </div>
    </section>
  );
}
