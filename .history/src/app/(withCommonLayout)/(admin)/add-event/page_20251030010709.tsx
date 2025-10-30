"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddEvent } from "@/hooks/event.hook";
import FXForm from "@/components/form/FXForm";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

// Event validation schema
const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  numberOfSeats: z.number().min(1, "Number of seats must be at least 1"),
  image: z.any(),
});

type EventFormValues = z.infer<typeof eventSchema>;

// Input fields using useFormContext
const EventFormInputs = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventFormValues>();

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Event Name"
          {...register("name")}
          className="border p-2 rounded-md w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="date"
          {...register("date")}
          className="border p-2 rounded-md w-full"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Location"
          {...register("location")}
          className="border p-2 rounded-md w-full"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Category"
          {...register("category")}
          className="border p-2 rounded-md w-full"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="flex flex-col md:col-span-2">
        <textarea
          placeholder="Description"
          {...register("description")}
          className="border p-2 rounded-md w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="number"
          placeholder="Number of Seats"
          {...register("numberOfSeats", { valueAsNumber: true })}
          className="border p-2 rounded-md w-full"
        />
        {errors.numberOfSeats && (
          <p className="text-red-500 text-sm">{errors.numberOfSeats.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="border p-2 rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default function AddEventPage() {
  const { mutateAsync, isPending } = useAddEvent();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: EventFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("date", data.date);
      formData.append("location", data.location);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("numberOfSeats", data.numberOfSeats.toString());

      if (data.image?.length > 0) {
        formData.append("image", data.image[0]);
      }

      await mutateAsync(formData);
      toast("Event created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create event");
    }
  };

  return (
    <section className="h-130">
      <div className="max-w-3xl mx-auto mt-20 p-4 sm:p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-rose-700 text-center sm:text-left">
          Add Event
        </h2>

        <FXForm
          onSubmit={handleSubmit}
          resolver={zodResolver(eventSchema)}>
          <EventFormInputs />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full sm:w-auto bg-rose-700 text-white py-2 px-4 rounded-md hover:bg-rose-800 transition-colors duration-200">
            {isPending ? "Submitting..." : "Add Event"}
          </button>
        </FXForm>
      </div>
    </section>
  );
}
