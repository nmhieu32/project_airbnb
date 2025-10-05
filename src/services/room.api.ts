import type { BookRoom, Room } from "@/interfaces/room.interface";
import { api } from "./api";
import type { BaseApiResponse } from "@/interfaces/base.interface";

export const getListRoomByLocationApi = async (
  maViTri: any
): Promise<Room[] | undefined> => {
  try {
    const response = await api.get<BaseApiResponse<Room[]>>(
      `phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getListRoomByLocationApi ~ error:", error);
  }
};

export const getRoomDetailsApi = async (
  idRoom: any
): Promise<Room | undefined> => {
  try {
    const response = await api.get<BaseApiResponse<Room>>(
      `phong-thue/${idRoom}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getRoomDetailsApi ~ error:", error);
  }
};

export const bookRoomApi = async (data: BookRoom) => {
  try {
    const response = await api.post<BaseApiResponse<BookRoom>>(
      "dat-phong",
      data
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const getAllRoomsApi = async (): Promise<Room[]> => {
  try {
    const response = await api.get<BaseApiResponse<Room[]>>("phong-thue");
    return response.data.content;
  } catch (error) {
    console.error("❌ getAllRoomsApi error:", error);
    return [];
  }
};
export const addRoomApi = async (roomData: any): Promise<Room | null> => {
  try {
    const response = await api.post<BaseApiResponse<Room>>("phong-thue", roomData);
    return response.data.content;
  } catch (error: any) {
    console.error("❌ Lỗi khi thêm phòng:", error);
    throw error;
  }
};
// 🟢 API cập nhật phòng
export const updateRoomApi = async (id: number, data: any) => {
  const res = await api.put<BaseApiResponse<any>>(`phong-thue/${id}`, data);
  return res.data.content;
};

// 🟢 API upload hình phòng
export const uploadRoomImageApi = async (maPhong: number | string, file: File) => {
  const formData = new FormData();
  formData.append("formFile", file);

  const res = await api.post<BaseApiResponse<any>>(
    `phong-thue/upload-hinh-phong?maPhong=${maPhong}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data.content;
};
// 🟢 Delete Room
export const deleteRoomApi = async (id: number) => {
  try {
    const response = await api.delete<BaseApiResponse<any>>(`phong-thue/${id}`);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ deleteRoomApi ~ error:", error);
    throw error;
  }
};
