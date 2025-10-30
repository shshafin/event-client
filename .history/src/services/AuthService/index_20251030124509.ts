"use server";
import { axiosInstance } from "@/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// Helper to get token from cookies
export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token)
    throw new Error("Authentication token not found. Please login again.");
  return token;
};

// ! Register User
export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/register", userData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// ! Login User
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data?.success) {
      (await cookies()).set("access_token", data?.data?.accessToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// ! Update User
export const updateUser = async (userData: FieldValues, id: string) => {
  try {
    const token = await getToken();
    const { data } = await axiosInstance.put("/users/update`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// ! Logout User
export const logoutUser = async () => {
  (await cookies()).delete("access_token");
};

// ! get user
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) return null;

  try {
    const { data } = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (err) {
    console.error("Failed to fetch current user:", err);
    return null;
  }
};
