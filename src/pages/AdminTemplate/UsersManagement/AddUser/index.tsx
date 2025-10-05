import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { parseBirthday } from "@/utils/parseBirthday";
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
} from "@/utils/checkValidation";

import { addAdminApi, updateUserApi } from "@/services/user.api"; // ✅ sửa import
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query"; // ✅ invalidate query sau khi thêm/sửa

export function AddUserForm({
  status,
  children,
  user,
}: {
  status: number; // 0 = thêm, 1 = sửa
  children: React.ReactNode;
  user?: any;
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    role: "USER",
    password: "",
  });
  const [date, setDate] = useState<Date | undefined>(undefined);

  const queryClient = useQueryClient();

  // Fill dữ liệu khi sửa user
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender ? "male" : "female",
        role: user.role || "USER",
        password: user.password || "",
      });

      if (user.birthday) {
        const parsed = parseBirthday(user.birthday);
        if (parsed) {
          setDate(parsed);
        }
      }
    }
  }, [user]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleBlur = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "name":
        error = validateName(value) || "";
        break;
      case "email":
        error = validateEmail(value) || "";
        break;
      case "phone":
        error = validatePhone(value) || "";
        break;
      case "password":
        error = validatePassword(value) || "";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 0) {
      // thêm mới user -> ADMIN mặc định
      try {
        const res = await addAdminApi({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          birthday: date ? format(date, "yyyy-MM-dd") : "",
          gender: formData.gender === "male",
        });

        if (res) {
          toast.success("✅ Thêm Admin thành công!");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        } else {
          toast.error("❌ Thêm Admin thất bại!");
        }
      } catch (error) {
        toast.error("❌ Lỗi kết nối API!");
        console.error(error);
      }
    } else {
      // update user
      try {
        const res = await updateUserApi(Number(formData.id), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthday: date ? format(date, "yyyy-MM-dd") : "",
          gender: formData.gender === "male",
          role: formData.role,
        });

        if (res) {
          toast.success("✅ Cập nhật người dùng thành công!");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        } else {
          toast.error("❌ Cập nhật thất bại!");
        }
      } catch (error) {
        toast.error("❌ Lỗi kết nối API!");
        console.error(error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {status === 0 ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {status === 1 && (
            <div>
              <Label htmlFor="id">ID*</Label>
              <Input
                id="id"
                value={formData.id}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          {/* Tên */}
          <div>
            <Label htmlFor="name">Tên người dùng *</Label>
            <Input
              id="name"
              placeholder="Điền tên vào đây..."
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={(e) => handleBlur("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {status === 0 && (
            <div>
              <Label htmlFor="password">Password*</Label>
              <Input
                type="password"
                placeholder="********"
                id="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={(e) => handleBlur("password", e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={(e) => handleBlur("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* SĐT */}
          <div>
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              id="phone"
              placeholder="0903 123 123"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={(e) => handleBlur("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Giới tính */}
          <div>
            <Label>Giới tính *</Label>
            <Select
              value={formData.gender}
              onValueChange={(val) => handleChange("gender", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ngày sinh */}
          <div>
            <Label>Ngày sinh *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "dd/MM/yyyy")
                  ) : (
                    <span>Chọn ngày sinh</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Vai trò */}
          <div className="col-span-2">
            <Label>Chức vụ *</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={formData.role === "ADMIN"}
                  onChange={(e) => handleChange("role", e.target.value)}
                />{" "}
                Admin
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={formData.role === "USER"}
                  onChange={(e) => handleChange("role", e.target.value)}
                />{" "}
                User
              </label>
            </div>
          </div>

          {/* Nút */}
          <div className="col-span-2 flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline">
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-red-400 text-white hover:bg-red-500"
            >
              {status === 0 ? "Thêm người dùng" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
