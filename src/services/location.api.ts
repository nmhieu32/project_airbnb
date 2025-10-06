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

// 🟢 Add new location
export const addLocationApi = async (data: Omit<Location, "id">) => {
  try {
    const response = await api.post<BaseApiResponse<Location>>("vi-tri", data);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ addLocationApi ~ error:", error);
    throw error;
  }
};

// 🟢 Update existing location
export const updateLocationApi = async (id: number, data: Location) => {
  try {
    const response = await api.put<BaseApiResponse<Location>>(
      `vi-tri/${id}`,
      data
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateLocationApi ~ error:", error);
    throw error;
  }
};

// 🟢 Delete location
export const deleteLocationApi = async (id: number) => {
  try {
    const response = await api.delete<BaseApiResponse<Location>>(
      `vi-tri/${id}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ deleteLocationApi ~ error:", error);
    throw error;
  }
};

// 🟢 Upload location image
export const uploadLocationImageApi = async (
  maViTri: number | string,
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append("formFile", file); // ⚠️ API yêu cầu key là "formFile"

    const response = await api.post<BaseApiResponse<Location>>(
      `vi-tri/upload-hinh-vitri?maViTri=${maViTri}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ uploadLocationImageApi ~ error:", error);
    throw error;
  }
};
