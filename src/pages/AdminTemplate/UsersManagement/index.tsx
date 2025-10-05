import { TableUser } from "@/pages/AdminTemplate/UsersManagement/ListUser/index";
import { Input } from "@/components/ui/input";
import { AddUserForm } from "@/pages/AdminTemplate/UsersManagement/AddUser/index";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="flex justify-between items-center pb-8">
        <AddUserForm status={0}>
          <Button>Thêm người dùng</Button>
        </AddUserForm>
      </div>

      {/* Ô tìm kiếm */}
      <div className="flex justify-between items-center pb-8">
        <Input
          type="search"
          placeholder="Tìm kiếm..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // cập nhật searchTerm
        />
      </div>

      <TableUser searchTerm={searchTerm} />
    </div>
  );
}
