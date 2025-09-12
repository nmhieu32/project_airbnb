import type { BaseApiResponse } from "@/interfaces/base.interface";
import { api } from "./api";
import type { RoomComment } from "@/interfaces/comment.interface";

export const getCommentByIdRoomApi = async (idRoom: number) => {
  try {
    const response = await api.get<BaseApiResponse<RoomComment[]>>(
      `binh-luan/lay-binh-luan-theo-phong/${idRoom}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getCommentByIdRoomApi ~ error:", error);
    throw error;
  }
};
