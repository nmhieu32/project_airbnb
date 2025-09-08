import type { Location } from "@/interfaces/location.interface";
import { api } from "./api";
import type { BaseApiResponse } from "@/interfaces/base.interface";

export const getListLocationApi = async (): Promise<Location[] | undefined> => {
  try {
    const response = await api.get<BaseApiResponse<Location[]>>("vi-tri");
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getListLocation ~ error:", error);
  }
};
