import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getListLocationApi } from "@/services/location.api";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import CarouselSkeleton from "../../_components/Skeleton/carousel.ske";

export default function CarouselHome() {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-location"],
    queryFn: () => getListLocationApi(),
  });
  const handleRetch = (): void => {
    refetch();
  };
  if (isError) {
    return (
      <div className="mx-auto">
        <p>Đã có lỗi xảy ra vui lòng thử lại.</p>
        <Button onClick={handleRetch}>Thử lại</Button>
      </div>
    );
  }
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div className="relative w-full h-full">
        {isLoading ? (
          <CarouselSkeleton />
        ) : (
          <Carousel plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent>
              {data.slice(0,3).map((item) => (
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
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div className="max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl/18 font-bold mb-4 animate-fade-in">
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