import {
  createAdmission,
  editAdmission,
  getAdmissionById,
  getMyAdmissions,
} from "@/services/AdmissionService";
import { useMutation, useQuery } from "@tanstack/react-query";

// Get all admissions
export const useGetMyAdmissions = () => {
  return useQuery({
    queryKey: ["GET_MY_ADMISSIONS"],
    queryFn: async () => await getMyAdmissions(),
  });
};

//  Get admission by ID
export const useGetAdmissionById = (id: string) => {
  return useQuery({
    queryKey: ["GET_ADMISSION_BY_ID", id],
    queryFn: async () => await getAdmissionById(id),
    enabled: !!id,
  });
};

// Create a new admission
export const useCreateAdmission = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => await createAdmission(formData),
  });
};

// Edit an admission
export const useEditAdmission = () => {
  return useMutation({
    mutationFn: async (data: any) => await editAdmission(data.id, data.data),
  });
};
