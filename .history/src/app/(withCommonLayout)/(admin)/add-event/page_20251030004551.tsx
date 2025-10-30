"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddEvent } from "@/hooks/event.hook";

// ✅ Event validation schema
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

export default function AddEventPage() {
  const { mutateAsync, isLoading } = useAddEvent();
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

      <FXForm<EventFormValues>
        onSubmit={handleSubmit}
        resolver={zodResolver(eventSchema)}>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Event Name"
            {...(window as any).register("eventName")}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            {...(window as any).register("date")}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            {...(window as any).register("location")}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Category"
            {...(window as any).register("category")}
            className="border p-2 rounded-md"
          />
          <textarea
            placeholder="Description"
            {...(window as any).register("description")}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Number of Seats"
            {...(window as any).register("seats", { valueAsNumber: true })}
            className="border p-2 rounded-md"
          />
          <input
            type="file"
            accept="image/*"
            {...(window as any).register("image")}
            className="border p-2 rounded-md"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-rose-700 text-white py-2 px-4 rounded-md hover:bg-rose-800">
            {isLoading ? "Submitting..." : "Add Event"}
          </button>
        </div>
      </FXForm>
    </div>
  );
}
