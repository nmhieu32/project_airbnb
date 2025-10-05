import type { BaseApiResponse } from "@/interfaces/base.interface";
import { api } from "./api";
import type { CurrentUser, User } from "@/interfaces/auth.interface";

type LoginRequest = {
  email: string;
  password: string;
};

export const loginApi = async (data: LoginRequest) => {
  try {
    const response = await api.post<BaseApiResponse<CurrentUser>>(
      "auth/signin",
      data
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

type RegisterRequest = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export const registerApi = async (data: RegisterRequest) => {
  try {
    const response = await api.post<BaseApiResponse<User>>("auth/signup", data);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};
