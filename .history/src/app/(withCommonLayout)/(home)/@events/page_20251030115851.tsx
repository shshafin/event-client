/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useGetEvents } from "@/hooks/event.hook";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { envConfig } from "@/config/envConfig";

export default function EventsPage() {
  const { data, isLoading, error } = useGetEvents();

  if (isLoading) {
    return <p className="text-center mt-20">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error.message}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 ">
      <h2 className="text-3xl text-center font-bold mb-6 text-rose-700">
        All Events
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.slice(0, 3).map((event: any) => (
          <Card
            key={event._id}
            className="flex flex-col">
            {event.image && (
              <img
                src={`${envConfig.base_Url}${event.image}`}
                alt={event.name}
                className="h-48 w-full object-cover rounded-t-md"
              />
            )}
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {event.name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()} &nbsp;|&nbsp;{" "}
                {event.location}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-2">
                Seats Available:{" "}
                <span className="font-semibold">{event.numberOfSeats}</span>
              </p>
              <p className="text-gray-600 text-sm line-clamp-3">
                {event.description}
              </p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/events/${event._id}`}>
                <Button className="w-full sm:w-auto bg-rose-700 hover:bg-rose-800 text-white">
                  Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
