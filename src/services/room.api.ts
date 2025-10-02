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

export const getRoomByUserApi = async (idUser: number) => {
  try {
    const response = await api.get<BaseApiResponse<BookRoom[]>>(
      `dat-phong/lay-theo-nguoi-dung/${idUser}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🌿 ~ getRoomByUserApi ~ error:", error);
  }
};
