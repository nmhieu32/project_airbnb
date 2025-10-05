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
import { AddUserForm } from "@/pages/AdminTemplate/UsersManagement/AddUser/index";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { parseBirthday } from "@/utils/parseBirthday";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getListUserApi, searchUserApi, deleteUserApi } from "@/services/user.api";
import { keepPreviousData } from "@tanstack/react-query";

export function TableUser({ searchTerm }: { searchTerm: string }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const queryClient = useQueryClient();

  // Query: lấy danh sách user
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      if (searchTerm.trim()) {
        return await searchUserApi(searchTerm);
      }
      return await getListUserApi();
    },
    placeholderData: keepPreviousData,
  });

  // Mutation: xóa user
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUserApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa user này không?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (isLoading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (isError) return <p className="text-center text-red-500">Có lỗi khi tải dữ liệu</p>;
  if (!users || users.length === 0) return <p className="text-center">Không có dữ liệu người dùng.</p>;

  const totalPages = Math.ceil(users.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const currentUsers = users.slice(start, end);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="table-auto border-collapse w-full">
        <TableCaption>Danh sách người dùng.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center truncate">STT</TableHead>
            <TableHead className="w-[70px] text-center">ID</TableHead>
            <TableHead className="w-[150px]">Họ và tên</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[120px]">Ngày sinh</TableHead>
            <TableHead className="w-[80px]">Giới tính</TableHead>
            <TableHead className="w-[100px]">Vai trò</TableHead>
            <TableHead className="w-[50px] text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="text-center">{start + index + 1}</TableCell>
              <TableCell className="text-center font-medium truncate">{user.id}</TableCell>
              <TableCell className="truncate">{user.name}</TableCell>
              <TableCell className="truncate max-w-[180px]">{user.email}</TableCell>
              <TableCell className="truncate">
                {user?.birthday
                  ? (() => {
                      const d = parseBirthday(user.birthday);
                      return d ? format(d, "dd/MM/yyyy") : "";
                    })()
                  : ""}
              </TableCell>
              <TableCell className="truncate">{user.gender ? "Nam" : "Nữ"}</TableCell>
              <TableCell className="truncate">{user.role}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-10" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <AddUserForm status={1} user={user}>
                          <span className="flex items-center gap-2 cursor-pointer">
                            <i className="fa-solid fa-pen-to-square"></i>
                            Chỉnh sửa
                          </span>
                        </AddUserForm>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          handleDelete(user.id);
                        }}
                      >
                        <span className="flex items-center gap-2 cursor-pointer text-red-500">
                          <i className="fa-solid fa-trash"></i>
                          Xóa
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
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
