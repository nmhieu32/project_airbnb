import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getListLocationApi } from "@/services/location.api";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselHome() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-location"],
    queryFn: () => getListLocationApi(),
  });
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div className="relative w-full h-full">
        <Carousel plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem key={item.id}>
                <div className="relative w-full h-96 md:h-[500px]">
                  <img
                    src={item.hinhAnh}
                    alt={item.tenViTri}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Hero Text */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div className="max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Trải Nghiệm Nghỉ Dưỡng Đẳng Cấp
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Khám phá những căn hộ cao cấp tại những địa điểm tuyệt đẹp nhất Việt
            Nam
          </p>
        </div>
      </div>
    </section>
  );
}
