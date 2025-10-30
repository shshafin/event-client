"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { getToken } from "../AdmissionService";

// Get My Colleges
export const getMyColleges = async () => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.get("/my-colleges/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("My colleges retrieved:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Get my colleges error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch your colleges."
    );
  }
};

export const getColleges = async () => {
  try {
    const { data } = await axiosInstance.get("/colleges/all");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCollegeById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/colleges/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const searchCollegesByName = async (name: string) => {
  try {
    const { data } = await axiosInstance.get("/colleges/search", {
      params: { name },
    });
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error?.response?.data?.message || "Failed to search colleges"
    );
  }
};
