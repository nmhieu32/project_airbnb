import type { BookRoom } from "@/interfaces/room.interface";
import { api } from "./api";
import type { BaseApiResponse } from "@/interfaces/base.interface";

export const getBookingsApi = async (): Promise<BookRoom[]> => {
  try {
    const response = await api.get<BaseApiResponse<BookRoom[]>>("dat-phong");
    return response.data.content;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách đặt phòng:", error);
    throw error;
  }
};
// 🟡 Cập nhật đặt phòng (PUT)
export const updateBookingApi = async (
  id: number,
  data: BookRoom
): Promise<BookRoom> => {
  const response = await api.put<BaseApiResponse<BookRoom>>(
    `dat-phong/${id}`,
    data
  );
  return response.data.content;
};
