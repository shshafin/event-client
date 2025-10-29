import { useMutation } from "@tanstack/react-query";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/AuthService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";

// ! Register User Hook
export const useUserRegistration = () => {
  const router = useRouter();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REGISTER_USER"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Registration Successful!");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error?.message || "Registration Failed!");
    },
  });
};
// ! Login User Hook

export const useUserLogin = () => {
  const { setUser } = useUser();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: async () => {
      toast.success("Login Successful!");

      const currentUser = await getCurrentUser();
      setUser(currentUser);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Login Failed!");
    },
  });
};
