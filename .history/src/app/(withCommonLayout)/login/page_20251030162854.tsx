"use client";

import FXForm from "@/components/form/FXForm";
import FXInput from "@/components/form/FXInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { axiosClient } from "@/lib/AxiosInstance/axiosClient";

const LoginPage = () => {
  const router = useRouter();
  const { setUser, setIsLoading: userLoading } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    userLoading(true);
    handleUserLogin(data);
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      userLoading(true);
      const token = credentialResponse.credential;

      const { data } = await axiosClient.post("/auth/google-login", { token });

      if (data?.success) {
        setUser(data.data.user);

        // Save access token in cookie (client side)
        document.cookie = `access_token=${data.data.accessToken}; path=/;`;

        toast.success("Login successful!");
        router.push((redirect as string) || "/");
      }
    } catch (err: any) {
      toast.error(err.message || "Google login failed");
    } finally {
      userLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push((redirect as string) || "/");
    }
  }, [isSuccess, redirect, router]);

  return (
    <>
      {isPending && <Spinner />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4">
        <h3 className="my-2 text-2xl font-bold">Login with College App</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-full max-w-md">
          <FXForm onSubmit={onSubmit}>
            <div className="py-3">
              <FXInput
                name="email"
                label="Email"
                type="text"
                required={true}
              />
            </div>
            <div className="py-3">
              <FXInput
                name="password"
                label="Password"
                type="password"
                required={true}
              />
            </div>

            <Button
              className="my-3 w-full"
              size="lg"
              type="submit">
              Login
            </Button>
          </FXForm>

          <div className="text-center mt-2">
            Don&lsquo;t have an account?{" "}
            <Link
              href={"/register"}
              className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>

          <div className="text-center mt-6">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => toast.error("Google login failed")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
