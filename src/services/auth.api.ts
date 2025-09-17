import type { BaseApiResponse } from "@/interfaces/base.interface";
import { api } from "./api";
import type { CurrentUser } from "@/interfaces/auth.interface";

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
