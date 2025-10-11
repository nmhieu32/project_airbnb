// utils/validateRoom.ts
export function validateRoom(formData: any) {
  const errors: Record<string, string> = {};

  if (!formData.tenPhong.trim()) {
    errors.tenPhong = "Tên phòng không được để trống";
  } else if (formData.tenPhong.length < 3) {
    errors.tenPhong = "Tên phòng phải có ít nhất 3 ký tự";
  }

  if (!formData.moTa.trim()) {
    errors.moTa = "Mô tả không được để trống";
  }

  if (!formData.maViTri) {
    errors.maViTri = "Vui lòng chọn vị trí";
  }

  const numberFields = [
    { key: "soKhach", label: "Số khách" },
    { key: "soPhongNgu", label: "Số phòng ngủ" },
    { key: "soGiuong", label: "Số giường" },
    { key: "soPhongTam", label: "Số phòng tắm" },
    { key: "giaTien", label: "Giá tiền" },
  ];

  numberFields.forEach(({ key, label }) => {
    const value = Number(formData[key]);
    if (isNaN(value) || value <= 0) {
      errors[key] = `${label} phải lớn hơn 0`;
    }
  });

  return errors;
}
