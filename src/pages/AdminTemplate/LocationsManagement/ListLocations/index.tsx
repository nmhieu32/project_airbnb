import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddLocationForm } from "@/pages/AdminTemplate/LocationsManagement/AddLocation";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import {
  getListLocationPaginationApi,
  deleteLocationApi,
} from "@/services/location.api";
import type { Location } from "@/interfaces/location.interface";

interface TableLocationProps {
  searchTerm: string;
}

export function TableLocation({ searchTerm }: TableLocationProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🟢 Hàm fetch lại dữ liệu
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await getListLocationPaginationApi(page, pageSize);
      if (res) {
        setLocations(res);
        setTotalPages(5); // tạm thời fix cứng (vì API demo không trả totalPages)
      }
    } catch (error) {
      console.log("❌ ~ fetchData:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi đổi page
  useEffect(() => {
    fetchLocations();
  }, [page]);

  // 🟢 Hàm xóa vị trí
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa vị trí này?");
    if (!confirmDelete) return;

    try {
      await deleteLocationApi(id);
      alert("✅ Xóa vị trí thành công!");
      fetchLocations(); // cập nhật lại danh sách
    } catch (error: any) {
      console.error("❌ Lỗi khi xóa:", error);
      alert(error.response?.data?.content || "Xóa thất bại!");
    }
  };

  // Lọc theo từ khóa search
  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) return locations;
    return locations.filter((loc) =>
      [loc.tenViTri, loc.tinhThanh, loc.quocGia].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [locations, searchTerm]);

  return (
    <div className="w-full overflow-x-auto">
      {/* 🟢 Nút thêm vị trí */}
      <div className="flex justify-end mb-4">
        <AddLocationForm status={0} onSuccess={fetchLocations}>
          <Button className="bg-red-500 text-white hover:bg-red-600">
            + Thêm vị trí
          </Button>
        </AddLocationForm>
      </div>

      <Table className="table-auto border-collapse w-full">
        <TableCaption>Danh sách vị trí.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">STT</TableHead>
            <TableHead className="w-[70px] text-center">ID</TableHead>
            <TableHead className="w-[150px]">Tên vị trí</TableHead>
            <TableHead className="w-[200px]">Tỉnh/Thành</TableHead>
            <TableHead className="w-[150px]">Quốc gia</TableHead>
            <TableHead className="w-[120px] text-center">Hình ảnh</TableHead>
            <TableHead className="w-[50px] text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Đang tải dữ liệu...
              </TableCell>
            </TableRow>
          ) : filteredLocations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Không tìm thấy vị trí phù hợp
              </TableCell>
            </TableRow>
          ) : (
            filteredLocations.map((loc, index) => (
              <TableRow key={loc.id}>
                <TableCell className="text-center">
                  {(page - 1) * pageSize + index + 1}
                </TableCell>
                <TableCell className="text-center">{loc.id}</TableCell>
                <TableCell>{loc.tenViTri}</TableCell>
                <TableCell>{loc.tinhThanh}</TableCell>
                <TableCell>{loc.quocGia}</TableCell>
                <TableCell className="text-center">
                  <img
                    src={loc.hinhAnh}
                    alt={loc.tenViTri}
                    className="w-20 h-14 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32" align="start">
                      <DropdownMenuGroup>
                        {/* 🟢 Chỉnh sửa */}
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <AddLocationForm
                            status={1}
                            location={loc}
                            onSuccess={fetchLocations}
                          >
                            <span className="flex items-center gap-2 cursor-pointer">
                              <i className="fa-solid fa-pen-to-square"></i>
                              Chỉnh sửa
                            </span>
                          </AddLocationForm>
                        </DropdownMenuItem>

                        {/* 🟢 Xóa vị trí */}
                        <DropdownMenuItem
                          onClick={() => handleDelete(loc.id)}
                          className="text-red-500 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash mr-2"></i>
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
