import {
  registerEvent,
  getMyBookings,
  cancelBooking,
} from "@/services/Registration";
import { useQuery, useMutation } from "@tanstack/react-query";

//  Register for an event
export const useRegisterEvent = () => {
  return useMutation({
    mutationFn: async (payload: any) => await registerEvent(payload),
  });
};

//  Get all bookings of logged-in user
export const useGetMyBookings = () => {
  return useQuery({
    queryKey: ["GET_MY_BOOKINGS"],
    queryFn: async () => await getMyBookings(),
  });
};

// Cancel a booking by ID
export const useCancelBooking = () => {
  return useMutation({
    mutationFn: async (bookingId: string) => await cancelBooking(bookingId),
  });
};
