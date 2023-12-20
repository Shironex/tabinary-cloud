import axios, { type AxiosRequestConfig } from "axios";
import { getBaseUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export const axiosClient = axios.create({
  maxBodyLength: Infinity,
  baseURL: `${getBaseUrl()}/api`,
});

export const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  maxBodyLength: Infinity,
};

export type APIResponse<T> =
  | { message: string; status: "error"; code: number }
  | { status: "success"; data: T }
  | { status: "redirect"; data: string };

export interface APIResponseError {
  status: string;
  message: string;
  code: number;
}

export const errorResponse = (message: string, code: number = 500) => {
  return NextResponse.json(
    {
      status: "error",
      message,
      code,
    },
    { status: code }
  );
};

export const successResponse = (data: unknown, config?: object) => {
  return NextResponse.json(
    {
      status: "success",
      data: data,
    },
    config ? config : { status: 200 }
  );
};

export const RedirectResponse = (url: string) => {
  return NextResponse.json(
    {
      status: "redirect",
      data: url,
    },
    { status: 200 }
  );
};

export const isApiResponseError = <T>(
  object: APIResponse<T> | APIResponseError
): object is APIResponseError => {
  return object.status === "error";
};

export const api = {
  get: async <T>(
    url: string,
    config: AxiosRequestConfig = axiosConfig
  ): Promise<APIResponse<T>> => {
    const response = await axiosClient.get<T>(url, config);

    return response.data as APIResponse<T>;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = axiosConfig
  ): Promise<APIResponse<T>> => {
    const response = await axiosClient.post<T>(url, data, config);

    return response.data as APIResponse<T>;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = axiosConfig
  ): Promise<APIResponse<T>> => {
    const response = await axiosClient.put<T>(url, data, config);

    return response.data as APIResponse<T>;
  },

  delete: async <T>(
    url: string,
    config: AxiosRequestConfig = axiosConfig
  ): Promise<APIResponse<T>> => {
    const response = await axiosClient.delete<T>(url, config);

    return response.data as APIResponse<T>;
  },
};
