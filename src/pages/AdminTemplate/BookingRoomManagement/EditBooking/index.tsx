import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateBookingApi } from "@/services/booking.api";
import type { BookRoom } from "@/interfaces/room.interface";

interface EditBookingProps {
  booking: BookRoom;
  onUpdated: () => void;
}

export default function EditBooking({ booking, onUpdated }: EditBookingProps) {
  const [form, setForm] = useState<BookRoom>(booking);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof BookRoom, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateBookingApi(form.id, form);
      setIsOpen(false);
      onUpdated(); // refresh table
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          ✏️ Sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa đặt phòng #{booking.id}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <div>
            <Label>Mã phòng</Label>
            <Input
              value={form.maPhong}
              onChange={(e) => handleChange("maPhong", Number(e.target.value))}
              type="number"
            />
          </div>

          <div>
            <Label>Ngày đến</Label>
            <Input
              type="date"
              value={form.ngayDen.split("T")[0]}
              onChange={(e) =>
                handleChange("ngayDen", new Date(e.target.value).toISOString())
              }
            />
          </div>

          <div>
            <Label>Ngày đi</Label>
            <Input
              type="date"
              value={form.ngayDi.split("T")[0]}
              onChange={(e) =>
                handleChange("ngayDi", new Date(e.target.value).toISOString())
              }
            />
          </div>

          <div>
            <Label>Số lượng khách</Label>
            <Input
              type="number"
              value={form.soLuongKhach}
              onChange={(e) =>
                handleChange("soLuongKhach", Number(e.target.value))
              }
            />
          </div>

          <div>
            <Label>Mã người dùng</Label>
            <Input
              type="number"
              value={form.maNguoiDung}
              onChange={(e) =>
                handleChange("maNguoiDung", Number(e.target.value))
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
