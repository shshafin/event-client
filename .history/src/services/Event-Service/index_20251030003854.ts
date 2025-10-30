"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { getToken } from "../AuthService";

// Get all events
export const getEvents = async () => {
  try {
    const { data } = await axiosInstance.get("/events/all");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch events");
  }
};

// Get single event by ID
export const getEventById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/events/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch event");
  }
};

// Add new event (admin only)
export const addEvent = async (payload: FormData) => {
  try {
    const token = await getToken();

    const { data } = await axiosInstance.post("/events/create", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to create event");
  }
};

// Search events by name
export const searchEventsByName = async (name: string) => {
  try {
    const { data } = await axiosInstance.get("/events/search", {
      params: { name },
    });
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to search events");
  }
};
