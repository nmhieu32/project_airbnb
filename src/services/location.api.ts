import type { DataLocation, Location } from "@/interfaces/location.interface";
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

export const getListLocationPaginationApi = async (
  pageIndex: number,
  pageSize: number
): Promise<Location[] | undefined> => {
  try {
    const response = await api.get<BaseApiResponse<DataLocation>>(
      `vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    return response.data.content.data;
  } catch (error) {
    console.log("🍃 ~ getListLocationPaginationApi ~ error:", error);
  }
};
