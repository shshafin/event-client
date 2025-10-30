"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { getToken } from "../AuthService";


// Register for an event
export const registerEvent = async (payload: any) => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.post(
      "/event-registration/register",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to register for event"
    );
  }
};

// Get all bookings of logged-in user
export const getMyBookings = async () => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.get(
      "/event-registration/my-bookings",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch your bookings"
    );
  }
};

// Cancel a booking by ID
export const cancelBooking = async (bookingId: string) => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.patch(
      `/event-registration/cancel/${bookingId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to cancel booking"
    );
  }
};
