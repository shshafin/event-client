"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FXForm from "@/components/form/FXForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterEvent } from "@/hooks/event.hook";
import { useUser } from "@/context/user.provider";
import { Button } from "@/components/ui/button";

// Validation schema
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  tickets: z.number().min(1, "At least 1 ticket required"),
  paymentMethod: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface Props {
  eventId: string;
}

export default function EventRegistrationPage({ eventId }: Props) {
  const { user } = useUser();
  const { mutateAsync, isPending } = useRegisterEvent();
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      tickets: 1,
      paymentMethod: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await mutateAsync({ ...data, eventId });
      alert("Registration successful!");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-rose-700">
        Register for Event
      </h2>

      <FXForm onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="border p-2 rounded-md"
            readOnly
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border p-2 rounded-md"
            readOnly
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="text"
            placeholder="Phone number"
            {...register("phone")}
            className="border p-2 rounded-md"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}

          <input
            type="number"
            placeholder="Number of tickets"
            {...register("tickets", { valueAsNumber: true })}
            className="border p-2 rounded-md"
          />
          {errors.tickets && (
            <p className="text-red-500">{errors.tickets.message}</p>
          )}

          <input
            type="text"
            placeholder="Payment method (optional)"
            {...register("paymentMethod")}
            className="border p-2 rounded-md"
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 bg-rose-700 text-white hover:bg-rose-800">
            {isPending ? "Registering..." : "Register Now"}
          </Button>
        </div>
      </FXForm>
    </div>
  );
}
