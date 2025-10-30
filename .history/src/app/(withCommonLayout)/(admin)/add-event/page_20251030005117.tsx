"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddEvent } from "@/hooks/event.hook";
import FXForm from "@/components/form/FXForm";
import { useFormContext } from "react-hook-form";

// Event validation schema
const eventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  seats: z.number().min(1, "Number of seats must be at least 1"),
  image: z.any(),
});

type EventFormValues = z.infer<typeof eventSchema>;

const EventFormInputs = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventFormValues>();

  return (
    <div className="grid gap-4">
      <input
        type="text"
        placeholder="Event Name"
        {...register("eventName")}
        className="border p-2 rounded-md"
      />
      {errors.eventName && (
        <p className="text-red-500">{errors.eventName.message}</p>
      )}

      <input
        type="date"
        {...register("date")}
        className="border p-2 rounded-md"
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <input
        type="text"
        placeholder="Location"
        {...register("location")}
        className="border p-2 rounded-md"
      />
      {errors.location && (
        <p className="text-red-500">{errors.location.message}</p>
      )}

      <input
        type="text"
        placeholder="Category"
        {...register("category")}
        className="border p-2 rounded-md"
      />
      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}

      <textarea
        placeholder="Description"
        {...register("description")}
        className="border p-2 rounded-md"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <input
        type="number"
        placeholder="Number of Seats"
        {...register("seats", { valueAsNumber: true })}
        className="border p-2 rounded-md"
      />
      {errors.seats && <p className="text-red-500">{errors.seats.message}</p>}

      <input
        type="file"
        accept="image/*"
        {...register("image")}
        className="border p-2 rounded-md"
      />
      {errors.image && <p className="text-red-500">{errors?.image.message}</p>}
    </div>
  );
};

export default function AddEventPage() {
  const { mutateAsync, isPending } = useAddEvent();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: EventFormValues) => {
    try {
      const formData = new FormData();
      formData.append("eventName", data.eventName);
      formData.append("date", data.date);
      formData.append("location", data.location);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("seats", data.seats.toString());

      if (data.image?.length > 0) {
        formData.append("image", data.image[0]);
      }

      await mutateAsync(formData);
      alert("Event created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create event");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-rose-700">Add Event</h2>

      <FXForm
        onSubmit={handleSubmit}
        resolver={zodResolver(eventSchema)}>
        <EventFormInputs />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 bg-rose-700 text-white py-2 px-4 rounded-md hover:bg-rose-800">
          {isPending ? "Submitting..." : "Add Event"}
        </button>
      </FXForm>
    </div>
  );
}
