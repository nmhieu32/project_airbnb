export default function LocationSkeleton() {
  return (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="w-20 h-20 rounded-xl bg-gray-300 mb-3"></div>

      <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-12 bg-gray-200 rounded"></div>
    </div>
  );
}