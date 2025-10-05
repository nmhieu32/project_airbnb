import { api } from "./api";
import type { BaseApiResponse } from "@/interfaces/base.interface";
import type { User } from "@/interfaces/auth.interface";

// Lấy danh sách user
export const getListUserApi = async (): Promise<User[]> => {
  try {
    const response = await api.get<BaseApiResponse<User[]>>("users");
    return response.data.content;
  } catch (error) {
    console.log("❌ ~ getListUserApi error:", error);
    return [];
  }
};

// Thêm Admin
export const addAdminApi = async (data: Partial<User> & { password: string; birthday: string }): Promise<User | null> => {
  try {
    const payload = {
      ...data,
      id: 0, // backend yêu cầu id mặc định = 0
      role: "ADMIN", // luôn ADMIN
    };
    const response = await api.post<BaseApiResponse<User>>("users", payload);
    return response.data.content;
  } catch (error) {
    console.log("❌ ~ addAdminApi error:", error);
    return null;
  }
};
// 🔍 API tìm kiếm user theo từ khóa
export const searchUserApi = async (keyword: string): Promise<User[]> => {
  try {
    if (!keyword.trim()) return [];
    const response = await api.get<BaseApiResponse<User[]>>(
      `users/search/${keyword}`
    );
    return response.data.content;
  } catch (error) {
    console.log("❌ ~ searchUserApi error:", error);
    return [];
  }
};

// Update user
export const updateUserApi = async (id: number, data: Partial<User>): Promise<User | null> => {
  try {
    const response = await api.put<BaseApiResponse<User>>(`users/${id}`, {
      ...data,
      id,
    });
    return response.data.content;
  } catch (error) {
    console.log("❌ ~ updateUserApi error:", error);
    return null;
  }
};
// Xóa user
export const deleteUserApi = async (id: number): Promise<boolean> => {
  try {
    const response = await api.delete<BaseApiResponse<null>>(
      `users?id=${id}`
    );
    // Nếu backend trả status 200 coi như thành công
    return true;
  } catch (error) {
    console.log("❌ ~ deleteUserApi error:", error);
    return false;
  }
};
