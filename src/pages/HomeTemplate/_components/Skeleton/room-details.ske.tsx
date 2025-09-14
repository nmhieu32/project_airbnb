

export default function RoomDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Banner skeleton */}
      <div className="w-full h-[500px] overflow-hidden rounded-xl bg-gray-200 animate-pulse" />

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title + Host avatar */}
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-60 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-80 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse ring-2 ring-gray-200 ml-4" />
          </div>

          {/* Description */}
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="space-y-6 max-h-80 pr-2 w-full max-w-3xl">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4 border-b pb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Booking box */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 border rounded-2xl shadow-md p-6 space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-16 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-40 mx-auto bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
