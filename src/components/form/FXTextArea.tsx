"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FXTextArea({ name, label, required = false }: any) {
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

      <Textarea
        id={name}
        {...register(name, { required })}
        className={`min-h-[120px] ${
          errorMessage ? "border-red-500 focus-visible:ring-red-500" : ""
        }`}
      />

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
