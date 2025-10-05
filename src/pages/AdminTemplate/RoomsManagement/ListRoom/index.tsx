import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { getAllRoomsApi, deleteRoomApi } from "@/services/room.api";
import type { Room } from "@/interfaces/room.interface";
import { AddRoomForm } from "@/pages/AdminTemplate/RoomsManagement/AddRoom";

export function TableRoom() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Từ khóa tìm kiếm
  const pageSize = 10;
  const queryClient = useQueryClient();

  // 🟢 Lấy danh sách phòng
  const {
    data: rooms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRoomsApi,
  });

  // 🟢 Mutation xóa phòng
  const deleteMutation = useMutation({
    mutationFn: deleteRoomApi,
    onSuccess: () => {
      alert("✅ Xóa phòng thành công!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err: any) => {
      console.error("❌ Lỗi khi xóa phòng:", err);
      alert("Lỗi khi xóa phòng!");
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng này không?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading)
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Lỗi khi tải dữ liệu.
      </div>
    );

  // 🔍 Lọc phòng theo từ khóa (không phân biệt hoa thường)
  const filteredRooms =
    rooms?.filter(
      (room: Room) =>
        room.tenPhong?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.moTa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.giaTien?.toString().includes(searchTerm)
    ) || [];

  const totalRooms = filteredRooms.length;
  const totalPages = Math.ceil(totalRooms / pageSize);
  const start = (page - 1) * pageSize;
  const currentRooms = filteredRooms.slice(start, start + pageSize);

  return (
    <div className="w-full overflow-x-auto">
      {/* 🔍 Ô tìm kiếm */}
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm phòng theo tên, mô tả, hoặc giá..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // reset về trang đầu khi tìm kiếm
          }}
          className="w-1/3"
        />

        {/* Nút thêm phòng */}
        
      </div>

      {/* BẢNG DANH SÁCH PHÒNG */}
      <Table className="table-auto border-collapse w-full">
        <TableCaption>Danh sách phòng</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">STT</TableHead>
            <TableHead className="text-center">ID</TableHead>
            <TableHead>Tên phòng</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentRooms.map((room: Room, idx: number) => (
            <TableRow key={room.id}>
              <TableCell className="text-center">{start + idx + 1}</TableCell>
              <TableCell className="text-center">{room.id}</TableCell>
              <TableCell className="truncate max-w-[180px]">
                {room.tenPhong}
              </TableCell>
              <TableCell>{room.giaTien}</TableCell>
              <TableCell>
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="h-12 w-20 object-cover rounded"
                />
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-blue-500 hover:underline">
                      Chi tiết
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Chi tiết phòng</DialogTitle>
                    </DialogHeader>
                    <p>{room.moTa || "Không có mô tả"}</p>
                  </DialogContent>
                </Dialog>
              </TableCell>

              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {/* Sửa phòng */}
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <AddRoomForm status={1} room={room}>
                          <span className="flex items-center gap-2 cursor-pointer">
                            <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                          </span>
                        </AddRoomForm>
                      </DropdownMenuItem>

                      {/* Xóa phòng */}
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleDelete(room.id)}
                      >
                        <span className="flex items-center gap-2 cursor-pointer text-red-500">
                          <i className="fa-solid fa-trash"></i> Xóa
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {currentRooms.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-5 text-gray-500">
                Không tìm thấy phòng phù hợp.
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
