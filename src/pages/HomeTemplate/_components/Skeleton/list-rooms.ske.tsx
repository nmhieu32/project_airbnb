import { Skeleton } from "@/components/ui/skeleton";

export default function ListRoomsSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="relative h-60 md:h-96 overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Skeleton className="h-8 md:h-14 w-48 md:w-72 mx-auto rounded" />
            <Skeleton className="h-5 md:h-7 w-64 md:w-96 mx-auto rounded" />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-10">
        <Skeleton className="w-full h-16 rounded-xl shadow-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 mt-8">
        <div className="overflow-y-auto p-6 lg:p-8 space-y-6">
          <div>
            <Skeleton className="h-8 w-80 mb-2" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-1 w-1 rounded-full" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>

          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <Skeleton className="w-48 h-36 rounded-xl flex-shrink-0" />
                <div className="flex flex-col justify-between flex-1 space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-end">
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-gray-200 lg:sticky lg:top-0 h-96 lg:h-screen rounded-l-2xl overflow-hidden">
          <Skeleton className="absolute inset-0 w-full h-full" />
          <div className="absolute top-6 left-6 right-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}