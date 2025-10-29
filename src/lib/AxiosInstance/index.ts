"use server";

import { envConfig } from "@/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: envConfig.base_Api,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const cookieStore = await cookies(); //
      const cookie = cookieStore.get("accessToken");
      const accessToken = cookie?.value;

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    } catch (err) {
      console.error("Axios request interceptor error:", err);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Axios response error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);
