"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "@/context/user.provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/AxiosInstance";

export default function GoogleLoginButton() {
  const { setUser } = useUser();
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {

      const token = credentialResponse.credential;


      const { data } = await axiosInstance.post("/auth/google-login", {
        token,
      });

   
      setUser(data.data.user);
      document.cookie = `access_token=${data.data.accessToken}; path=/`;

      toast.success("Google login successful!");
      router.push("/"); 
    } catch (error: any) {
      console.error(error);
      toast.error("Google login failed!");
    }
  };

  const handleError = () => {
    toast.error("Google login failed!");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}
