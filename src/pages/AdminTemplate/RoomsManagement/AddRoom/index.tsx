import React, { useState, useEffect, useRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addRoomApi,
  updateRoomApi,
  uploadRoomImageApi,
} from "@/services/room.api";
import { getListLocationApi } from "@/services/location.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Location } from "@/interfaces/location.interface";

export function AddRoomForm({
  status,
  children,
  room,
}: {
  status: number; // 0 = add, 1 = edit
  children: React.ReactNode;
  room?: any;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    hinhAnh: null as File | null,
    hinhAnhPreview: "",
    tenPhong: "",
    moTa: "",
    maViTri: "",
    soKhach: "",
    soPhongNgu: "",
    soGiuong: "",
    soPhongTam: "",
    giaTien: "",
    tienNghi: {
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
    },
  });

  // 🟢 Lấy danh sách vị trí
  const { data: locations, isLoading: loadingLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: getListLocationApi,
  });

  // 🟢 Fill dữ liệu khi edit
  useEffect(() => {
    if (room) {
      setFormData({
        id: room.id || "",
        hinhAnh: null,
        hinhAnhPreview: room.hinhAnh || "",
        tenPhong: room.tenPhong || "",
        moTa: room.moTa || "",
        maViTri: room.maViTri?.toString() || "",
        soKhach: room.khach?.toString() || "",
        soPhongNgu: room.phongNgu?.toString() || "",
        soGiuong: room.giuong?.toString() || "",
        soPhongTam: room.phongTam?.toString() || "",
        giaTien: room.giaTien?.toString() || "",
        tienNghi: {
          mayGiat: room.mayGiat || false,
          banLa: room.banLa || false,
          tivi: room.tivi || false,
          dieuHoa: room.dieuHoa || false,
          wifi: room.wifi || false,
          bep: room.bep || false,
          doXe: room.doXe || false,
          hoBoi: room.hoBoi || false,
          banUi: room.banUi || false,
        },
      });
    }
  }, [room]);

  // 🟢 Mutation thêm phòng
  const addRoomMutation = useMutation({
    mutationFn: addRoomApi,
    onSuccess: () => {
      alert("✅ Thêm phòng thành công!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setOpen(false);
    },
    onError: (err: any) => {
      alert("❌ Lỗi khi thêm phòng!");
      console.error(err);
    },
  });

  // 🟢 Mutation cập nhật phòng + ảnh
  const updateRoomMutation = useMutation({
    mutationFn: async ({ id, data, file }: { id: number; data: any; file?: File | null }) => {
      await updateRoomApi(id, data); // Cập nhật thông tin phòng
      if (file) {
        await uploadRoomImageApi(id, file); // Upload ảnh mới nếu có
      }
    },
    onSuccess: () => {
      alert("✅ Cập nhật phòng thành công!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setOpen(false);
    },
    onError: (err: any) => {
      alert("❌ Lỗi khi cập nhật phòng!");
      console.error(err);
    },
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (field: keyof typeof formData.tienNghi) => {
    setFormData((prev) => ({
      ...prev,
      tienNghi: { ...prev.tienNghi, [field]: !prev.tienNghi[field] },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        hinhAnh: file,
        hinhAnhPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      tenPhong: formData.tenPhong,
      khach: Number(formData.soKhach),
      phongNgu: Number(formData.soPhongNgu),
      giuong: Number(formData.soGiuong),
      phongTam: Number(formData.soPhongTam),
      moTa: formData.moTa,
      giaTien: Number(formData.giaTien),
      mayGiat: formData.tienNghi.mayGiat,
      banLa: formData.tienNghi.banLa,
      tivi: formData.tienNghi.tivi,
      dieuHoa: formData.tienNghi.dieuHoa,
      wifi: formData.tienNghi.wifi,
      bep: formData.tienNghi.bep,
      doXe: formData.tienNghi.doXe,
      hoBoi: formData.tienNghi.hoBoi,
      banUi: formData.tienNghi.banUi,
      maViTri: Number(formData.maViTri),
      hinhAnh: formData.hinhAnhPreview || "https://placehold.co/200x150",
    };

    if (status === 0) {
      addRoomMutation.mutate(payload);
    } else {
      updateRoomMutation.mutate({
        id: Number(formData.id),
        data: payload,
        file: formData.hinhAnh, // chỉ gửi nếu có file mới
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {status === 0 ? "Thêm phòng thuê" : "Cập nhật phòng thuê"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Upload ảnh */}
          <div className="col-span-2">
            <Label>Hình ảnh phòng</Label>
            {formData.hinhAnhPreview && (
              <img
                src={formData.hinhAnhPreview}
                alt="preview"
                className="w-40 h-28 object-cover rounded mt-2"
              />
            )}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => fileInputRef.current?.click()}
            >
              +
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Các trường thông tin */}
          <div className="col-span-2">
            <Label htmlFor="tenPhong">Tên phòng</Label>
            <Input
              id="tenPhong"
              value={formData.tenPhong}
              onChange={(e) => handleChange("tenPhong", e.target.value)}
              placeholder="Nhập tên phòng"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="moTa">Mô tả</Label>
            <Textarea
              id="moTa"
              value={formData.moTa}
              onChange={(e) => handleChange("moTa", e.target.value)}
              placeholder="Mô tả chi tiết"
            />
          </div>

          {/* Chọn vị trí */}
          {/* Chọn vị trí (hiện khi hover) */}
<div className="col-span-2 relative group">
  <Label>Chọn vị trí</Label>
  <div className="border rounded px-3 py-2 mt-1 cursor-pointer bg-white">
    {formData.maViTri
      ? locations?.find((loc: Location) => loc.id === Number(formData.maViTri))
          ?.tenViTri || "Chưa chọn vị trí"
      : "Di chuột để chọn vị trí"}
  </div>

  {/* Danh sách vị trí ẩn - hiện khi hover */}
  {!loadingLocations && (
    <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded shadow-md hidden group-hover:block mt-1">
      {locations?.map((loc: Location) => (
        <div
          key={loc.id}
          onClick={() => handleChange("maViTri", loc.id.toString())}
          className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
            formData.maViTri === loc.id.toString() ? "bg-gray-50 font-medium" : ""
          }`}
        >
          {loc.tenViTri} - {loc.tinhThanh}, {loc.quocGia}
        </div>
      ))}
    </div>
  )}
</div>


          {/* Thông số */}
          <div>
            <Label>Số khách</Label>
            <Input
              type="number"
              value={formData.soKhach}
              onChange={(e) => handleChange("soKhach", e.target.value)}
            />
          </div>
          <div>
            <Label>Số phòng ngủ</Label>
            <Input
              type="number"
              value={formData.soPhongNgu}
              onChange={(e) => handleChange("soPhongNgu", e.target.value)}
            />
          </div>
          <div>
            <Label>Số giường</Label>
            <Input
              type="number"
              value={formData.soGiuong}
              onChange={(e) => handleChange("soGiuong", e.target.value)}
            />
          </div>
          <div>
            <Label>Số phòng tắm</Label>
            <Input
              type="number"
              value={formData.soPhongTam}
              onChange={(e) => handleChange("soPhongTam", e.target.value)}
            />
          </div>
          <div>
            <Label>Giá ($)</Label>
            <Input
              type="number"
              value={formData.giaTien}
              onChange={(e) => handleChange("giaTien", e.target.value)}
            />
          </div>

          {/* Tiện nghi */}
          <div className="col-span-2 grid grid-cols-2 gap-2 border-t pt-3">
            {Object.keys(formData.tienNghi).map((key) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={key}
                  checked={formData.tienNghi[key as keyof typeof formData.tienNghi]}
                  onCheckedChange={() =>
                    handleCheckbox(key as keyof typeof formData.tienNghi)
                  }
                />
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </Label>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-red-400 text-white hover:bg-red-500"
              disabled={addRoomMutation.isPending || updateRoomMutation.isPending}
            >
              {status === 0
                ? addRoomMutation.isPending
                  ? "Đang thêm..."
                  : "Thêm mới"
                : updateRoomMutation.isPending
                ? "Đang cập nhật..."
                : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
