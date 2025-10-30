"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSearchEvents } from "@/hooks/event.hook";

export default function Landing() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useSearchEvents(searchTerm);

  return (
    <section className="relative h-[60vh] sm:h-[70vh] w-full">
      {/* Background Image */}
      <Image
        src="/college-hero.jpg"
        alt="College Hero"
        fill
        className="object-cover object-center"
        unoptimized
      />

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Search content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
          Find Your Perfect College
        </h1>
        <p className="mb-6 sm:mb-8 text-base sm:text-lg text-white/90">
          Search colleges, explore events, research works, and reviews
        </p>

        <form
          className="w-full max-w-xl"
          onSubmit={(e) => e.preventDefault()} // prevent page reload
        >
          <div className="relative">
            <Input
              id="search"
              type="text"
              placeholder="Search for an event..."
              className="bg-white text-sm pl-12 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 pointer-events-none" />
          </div>
        </form>

        {/* Search results */}
        {searchTerm && (
          <div className="mt-4 w-full max-w-xl bg-white rounded-md shadow-lg p-4 text-left">
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Failed to load results</p>}
            {data?.data?.length === 0 && !isLoading && <p>No events found</p>}
            {data?.data?.map((event: any) => (
              <Link
                key={event._id}
                href={`/events/${event._id}`}
                className="block py-2 px-3 rounded hover:bg-gray-100 transition">
                {event.name}{" "}
                <span className="text-gray-500 text-sm">
                  ({event.category})
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
