import {
  addReview,
  allReviews,
  myEventReviews,
} from "@/services/ReviewService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetReviews = (collegeId: string) => {
  return useQuery({
    queryKey: ["GET_REVIEWS", collegeId],
    queryFn: async () => await myEventReviews(collegeId),
  });
};

export const useAddReview = () => {
  return useMutation({
    mutationFn: async (data: {
      collegeId: any;
      rating: number;
      comment: string;
    }) => {
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
