"use client";

import FXForm from "@/components/form/FXForm";
import FXInput from "@/components/form/FXInput";
import { Button } from "@/components/ui/button";
import { useUserRegistration } from "@/hooks/auth.hook";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

const RegisterPage = () => {
  const { mutate: handleUserRegistration } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = { ...data };
    handleUserRegistration(userData);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4">
      <h3 className="my-2 text-2xl font-bold">Register with College App</h3>
      <p className="mb-4">Book college services and facilities</p>

      <div className="w-full max-w-md">
        <FXForm
          onSubmit={onSubmit}
          defaultValues={{
            username: "John Doe",
            email: "doe@test.com",
            password: "doe1234",
          }}>
          <div className="py-3">
            <FXInput
              name="username"
              label="Name"
              type="text"
              required
              isClearable
            />
          </div>
          <div className="py-3">
            <FXInput
              name="email"
              label="Email"
              type="email"
              required
              isClearable
            />
          </div>

          <div className="py-3">
            <FXInput
              name="password"
              label="Password"
              type="password"
              required
            />
          </div>

          <Button
            className="my-3 w-full"
            size="lg"
            type="submit">
            Register
          </Button>
        </FXForm>

        <div className="text-center mt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
