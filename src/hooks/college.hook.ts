import {
  getCollegeById,
  getColleges,
  getMyColleges,
  searchCollegesByName,
} from "@/services/CollegeService";
import { useQuery } from "@tanstack/react-query";

export const useGetColleges = () => {
  return useQuery({
    queryKey: ["GET_COLLEGES"],
    queryFn: async () => await getColleges(),
  });
};

export const useGetMyColleges = () => {
  return useQuery({
    queryKey: ["GET_MY_COLLEGES"],
    queryFn: async () => await getMyColleges(),
  });
};

export const useGetCollegeById = (id: string) => {
  return useQuery({
    queryKey: ["GET_COLLEGES", id],
    queryFn: async () => await getCollegeById(id),
  });
};

export const useSearchColleges = (name: string) => {
  return useQuery({
    queryKey: ["SEARCH_COLLEGES", name],
    queryFn: async () => await searchCollegesByName(name),
    enabled: !!name,
  });
};
