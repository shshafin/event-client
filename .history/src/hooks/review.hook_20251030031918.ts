import {
  addReview,
  allReviews,
  myEventReviews,
} from "@/services/ReviewService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetReviews = (eventId: string) => {
  return useQuery({
    queryKey: ["GET_REVIEWS", eventId],
    queryFn: async () => await myEventReviews(eventId),
  });
};

export const useAddReview = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await addReview(data);
    },
  });
};

export const useGetAllReviews = () => {
  return useQuery({
    queryKey: ["GET_ALL_REVIEWS"],
    queryFn: async () => await allReviews(),
  });
};
