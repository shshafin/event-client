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
      // credentialResponse.credentials token দেয়
      const token = credentialResponse.credential;

      // Backend এ পাঠানো
      const { data } = await axiosInstance.post("/auth/google-login", {
        token,
      });

      // Response থেকে user & accessToken সেট
      setUser(data.data.user);
      document.cookie = `access_token=${data.data.accessToken}; path=/`;

      toast.success("Google login successful!");
      router.push("/"); // home page redirect
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
