export default function CarouselSkeleton() {
  return (
    <div className="relative h-96 md:h-[500px] w-full animate-pulse">
      <div className="w-full h-full bg-gray-300"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-4xl px-4">
          <div className="h-10 md:h-16 w-3/4 bg-gray-400 mx-auto mb-4 rounded"></div>
          <div className="h-6 md:h-8 w-1/2 bg-gray-400 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  );
}
