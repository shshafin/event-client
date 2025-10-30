"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { getToken } from "../AdmissionService";

export const addReview = async (reviewData: any) => {
  try {
    const token = await getToken(); // get the token

    const { data } = await axiosInstance.post(`reviews/create`, reviewData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Review submitted successfully:", data);
    return data;
  } catch (error: any) {
    console.error("Add review error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
        "Failed to submit review. Please try again."
    );
  }
};

export const myCollegeReviews = async (collegeId: any) => {
  try {
    const { data } = await axiosInstance.get(
      `my-colleges/reviews/${collegeId}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const allReviews = async () => {
  try {
    const { data } = await axiosInstance.get(`my-colleges/reviews`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
