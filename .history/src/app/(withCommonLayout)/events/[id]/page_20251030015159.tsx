/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useGetEventById } from "@/hooks/event.hook";
import { Button } from "@/components/ui/button";
import { envConfig } from "@/config/envConfig";
import Link from "next/link";

export default function EventDetailsPage() {
  const params = useParams();
  const { id } = params;
  const { data, isLoading, error } = useGetEventById(id as any);

  if (isLoading) {
    return <p className="text-center mt-20">Loading event...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error.message}</p>;
  }

  const event = data?.data;

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white shadow-md rounded-md">
      {event.image && (
        <img
          src={`${envConfig.base_Url}${event.image}`}
          alt={event.name}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}
      <h2 className="text-3xl font-bold mb-2 text-rose-700">{event.name}</h2>
      <p className="text-gray-600 mb-4">
        {/* {new Date(event.date).toLocaleDateString()} &nbsp;|&nbsp;{" "} */}
        {event.location}
      </p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Organizer</h3>
        <p className="text-gray-700">
          {event.organizer || "Organizer info not available"}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Description</h3>
        <p className="text-gray-700">{event.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
        <div>
          <h3 className="font-semibold">Available Seats</h3>
          <p>{event.numberOfSeats}</p>
        </div>
        <div>
          <h3 className="font-semibold">Registration Deadline</h3>
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="font-semibold">Registration Fee</h3>
          <p>${event.fee || 100}</p>
        </div>
      </div>

      <Link href={"/event-register/"}>
        <Button className="bg-rose-700 hover:bg-rose-800 text-white w-full sm:w-auto">
          Register Now
        </Button>
      </Link>
    </div>
  );
}
