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
import { getCountriesApi, getStatesByCountryApi } from "@/services/country.api";
import {
  addLocationApi,
  updateLocationApi,
  uploadLocationImageApi,
} from "@/services/location.api";
import type { Location } from "@/interfaces/location.interface";

function normalizeText(text: string) {
  return text
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

interface AddLocationFormProps {
  status: number; // 0 = add, 1 = edit
  children: React.ReactNode;
  location?: Location;
  onSuccess?: () => void;
}

export function AddLocationForm({
  status,
  children,
  location,
  onSuccess,
}: AddLocationFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    hinhAnh: null as File | null,
    hinhAnhPreview: "",
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [showCountries, setShowCountries] = useState(false);
  const [showStates, setShowStates] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<HTMLDivElement | null>(null);

  // 🟢 Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setShowCountries(false);
      }
      if (stateRef.current && !stateRef.current.contains(event.target as Node)) {
        setShowStates(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🟢 Lấy danh sách quốc gia
  useEffect(() => {
    const fetchCountries = async () => {
      const list = await getCountriesApi();
      setCountries(list);
    };
    fetchCountries();
  }, []);

  // 🟢 Khi mở dialog và có location → load dữ liệu vào form
  useEffect(() => {
    if (!open) return;
    const loadData = async () => {
      if (!location) {
        setFormData({
          id: 0,
          hinhAnh: null,
          hinhAnhPreview: "",
          tenViTri: "",
          tinhThanh: "",
          quocGia: "",
        });
        setStates([]);
        return;
      }

      const matchedCountry =
        countries.find(
          (c) => normalizeText(c) === normalizeText(location.quocGia || "")
        ) || location.quocGia;

      setFormData({
        id: location.id || 0,
        hinhAnh: null,
        hinhAnhPreview: location.hinhAnh || "",
        tenViTri: location.tenViTri || "",
        tinhThanh: location.tinhThanh || "",
        quocGia: matchedCountry || "",
      });

      if (matchedCountry) {
        const list = await getStatesByCountryApi(matchedCountry);
        setStates(list);
      }
    };

    loadData();
  }, [open, location, countries]);

  // 🟢 Load states khi user đổi quốc gia
  useEffect(() => {
    if (!formData.quocGia) return;
    const fetchStates = async () => {
      const list = await getStatesByCountryApi(formData.quocGia);
      setStates(list);
      setFormData((prev) =>
        list.includes(prev.tinhThanh) ? prev : { ...prev, tinhThanh: "" }
      );
    };
    fetchStates();
  }, [formData.quocGia]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        tenViTri: formData.tenViTri,
        tinhThanh: formData.tinhThanh,
        quocGia: formData.quocGia,
        hinhAnh: formData.hinhAnhPreview || "",
      };

      let savedLocation: Location;

      if (status === 0) {
        // 🟢 Thêm mới
        savedLocation = await addLocationApi(payload);
      } else {
        // 🟢 Chỉnh sửa
        savedLocation = await updateLocationApi(formData.id, {
          id: formData.id,
          ...payload,
        });
      }

      // 🟢 Upload ảnh nếu có chọn file
      if (formData.hinhAnh) {
        await uploadLocationImageApi(savedLocation.id, formData.hinhAnh);
      }

      alert("✅ Thành công!");
      onSuccess?.();
      setOpen(false);

      setFormData({
        id: 0,
        hinhAnh: null,
        hinhAnhPreview: "",
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
      });
    } catch (error: any) {
      console.error("❌ Lỗi submit:", error);
      alert(error.response?.data?.content || "Có lỗi xảy ra!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg overflow-visible">
        <DialogHeader>
          <DialogTitle>
            {status === 0 ? "Thêm vị trí" : "Chỉnh sửa vị trí"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Upload hình ảnh */}
          <div>
            <Label>Hình ảnh *</Label>
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {formData.hinhAnhPreview && (
              <img
                src={formData.hinhAnhPreview}
                alt="preview"
                className="mt-2 w-32 h-20 object-cover rounded"
              />
            )}
          </div>

          {/* Tên vị trí */}
          <div>
            <Label htmlFor="tenViTri">Tên vị trí *</Label>
            <Input
              id="tenViTri"
              placeholder="VD: Quận 1"
              value={formData.tenViTri}
              onChange={(e) => handleChange("tenViTri", e.target.value)}
            />
          </div>

          {/* Quốc gia */}
          <div className="relative w-full" ref={countryRef}>
            <Label>Quốc gia *</Label>
            <div
              className="border rounded p-2 cursor-pointer bg-white"
              onClick={() => setShowCountries(!showCountries)}
            >
              {formData.quocGia || "-- Chọn quốc gia --"}
            </div>

            {showCountries && (
              <ul className="absolute left-0 right-0 mt-1 border rounded bg-white shadow-lg max-h-60 overflow-auto z-50">
                {countries.map((c) => (
                  <li
                    key={c}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("quocGia", c);
                      setShowCountries(false);
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tỉnh/Thành phố */}
          <div className="relative w-full" ref={stateRef}>
            <Label>Tỉnh/Thành phố *</Label>
            <div
              className="border rounded p-2 cursor-pointer bg-white"
              onClick={() => setShowStates(!showStates)}
            >
              {formData.tinhThanh || "-- Chọn tỉnh/thành phố --"}
            </div>

            {showStates && formData.quocGia && (
              <ul className="absolute left-0 right-0 mt-1 border rounded bg-white shadow-lg max-h-60 overflow-auto z-50">
                {states.map((s) => (
                  <li
                    key={s}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("tinhThanh", s);
                      setShowStates(false);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-red-400 text-white hover:bg-red-500"
            >
              {status === 0 ? "Thêm vị trí" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
