"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { cookies } from "next/headers";

// Helper to get token from cookies
export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token)
    throw new Error("Authentication token not found. Please login again.");
  return token;
};

// Create Admission
export const createAdmission = async (formData: FormData) => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.post("/admissions/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Admission created successfully:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Create admission error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to create admission. Please try again."
    );
  }
};

// Get My Admissions
export const getMyAdmissions = async () => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.get("/admissions/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("My admissions retrieved:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Get my admissions error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch your admissions."
    );
  }
};

// Get Admission by ID
export const getAdmissionById = async (id: string) => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.get(`/admissions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error(
      "Get admission by ID error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch admission details."
    );
  }
};

// edit Admission
export const editAdmission = async (id: any, admissionData: any) => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.patch(
      `/admissions/update/${id}`,
      admissionData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Admission updated successfully:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Edit admission error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to update admission. Please try again."
    );
  }
};
