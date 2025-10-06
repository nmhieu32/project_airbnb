export default function UserDetailsSke() {
  return (
    <div className="flex max-w-5xl mx-auto p-6 gap-6 animate-pulse">
      {/* Sidebar trái */}
      <div className="w-1/4 flex flex-col items-center border rounded-xl p-4 shadow-sm">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200" />

        {/* Button cập nhật ảnh */}
        <div className="mt-2 h-4 w-24 bg-gray-200 rounded" />

        {/* Xác minh danh tính */}
        <div className="mt-6 w-full text-center">
          <div className="h-5 w-32 bg-gray-200 rounded mx-auto" />
          <div className="h-3 w-48 bg-gray-200 rounded mt-2 mx-auto" />
          <div className="h-8 w-28 bg-gray-200 rounded mt-3 mx-auto" />
        </div>

        {/* Email xác thực */}
        <div className="mt-6 w-full space-y-2">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1">
        {/* Tiêu đề */}
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded mt-2" />
        <div className="h-4 w-28 bg-gray-200 rounded mt-3" />

        {/* Phòng đã thuê */}
        <div className="mt-6 h-5 w-32 bg-gray-200 rounded" />

        {/* Danh sách phòng */}
        <div className="mt-4 max-h-[400px] overflow-y-auto space-y-4 pr-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex border rounded-xl overflow-hidden shadow-sm"
            >
              <div className="w-48 h-36 bg-gray-200" />
              <div className="flex-1 p-4 space-y-2">
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-3 w-52 bg-gray-200 rounded" />
                <div className="h-3 w-44 bg-gray-200 rounded" />
              </div>
              <div className="p-4 flex items-end">
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}