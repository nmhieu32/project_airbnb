import type { BaseApiResponse } from "@/interfaces/base.interface";
import { api } from "./api";
import type { PostComment, RoomComment } from "@/interfaces/comment.interface";

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

export const postCommentApi = async (comment: PostComment) => {
  try {
    const response = await api.post<BaseApiResponse<PostComment>>(
      "binh-luan",
      comment
    );
    return response.data.content;
  } catch (error) {
    console.log("🌿 ~ postCommentAi ~ error:", error);
  }
};