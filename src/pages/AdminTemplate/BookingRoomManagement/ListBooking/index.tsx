import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { getBookingsApi } from "@/services/booking.api";
import EditBooking from "@/pages/AdminTemplate/BookingRoomManagement/EditBooking/index"; // ✅ Import component mới

export function TableBooking() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const pageSize = 10;

  // 🟢 Gọi API lấy danh sách đặt phòng
  const { data: bookings, isLoading, isError, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingsApi,
  });

  // 🧮 Lọc danh sách theo ký tự nhập vào
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    return bookings.filter((b) => {
      const keyword = search.toLowerCase();
      return (
        b.id.toString().includes(keyword) ||
        b.maPhong.toString().includes(keyword) ||
        b.maNguoiDung.toString().includes(keyword)
      );
    });
  }, [bookings, search]);

  // 📄 Phân trang
  const totalPages = Math.ceil(filteredBookings.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentBookings = filteredBookings.slice(start, start + pageSize);

  if (isLoading)
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Lỗi khi tải dữ liệu đặt phòng.
      </div>
    );

  return (
    <div className="w-full overflow-x-auto">
      {/* Ô tìm kiếm */}
      <div className="flex justify-between items-center mb-4">
    
        <Input
          type="text"
          placeholder="🔍 Tìm kiếm theo ID, Mã phòng, Mã người dùng..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset về trang 1 khi tìm kiếm
          }}
          className="w-80"
        />
      </div>

      <Table className="table-auto border-collapse w-full">
        <TableCaption>Danh sách booking.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">STT</TableHead>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Mã phòng</TableHead>
            <TableHead className="text-center">Ngày đến</TableHead>
            <TableHead className="text-center">Ngày đi</TableHead>
            <TableHead className="text-center">Số khách</TableHead>
            <TableHead className="text-center">Mã người dùng</TableHead>
            <TableHead className="text-center">Hành động</TableHead> {/* ✅ thêm */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentBookings.length > 0 ? (
            currentBookings.map((b, index) => (
              <TableRow key={b.id}>
                <TableCell className="text-center">{start + index + 1}</TableCell>
                <TableCell className="text-center">{b.id}</TableCell>
                <TableCell className="text-center">{b.maPhong}</TableCell>
                <TableCell className="text-center">
                  {new Date(b.ngayDen).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(b.ngayDi).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="text-center">{b.soLuongKhach}</TableCell>
                <TableCell className="text-center">{b.maNguoiDung}</TableCell>
                <TableCell className="text-center">
                  {/* ✅ Nút chỉnh sửa */}
                  <EditBooking booking={b} onUpdated={refetch} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                Không tìm thấy dữ liệu phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* PHÂN TRANG */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span>
          Trang {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
