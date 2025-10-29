"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FXInput({
  type = "text",
  label,
  name,
  required = false,
}: any) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        {...register(name, { required })}
        className={
          errorMessage ? "border-red-500 focus-visible:ring-red-500" : ""
        }
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
