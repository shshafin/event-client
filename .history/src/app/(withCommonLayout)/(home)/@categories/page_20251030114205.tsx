"use client";

import { useState, useMemo } from "react";
import { useGetEvents, useGetEventsByCategory } from "@/hooks/event.hook";
import { Button } from "@/components/ui/button";

export default function CategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: allEvents, isLoading } = useGetEvents();
  const { data: categoryEvents, isFetching } = useGetEventsByCategory(
    selectedCategory || ""
  );

  // Extract unique categories
  const categories = useMemo(() => {
    const catSet = new Set<string>();
    allEvents?.data?.forEach((event: any) => {
      if (event.category) catSet.add(event.category);
    });
    return Array.from(catSet);
  }, [allEvents]);

  const eventsToDisplay = selectedCategory ? categoryEvents?.data || [] : [];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-rose-700 mb-8">
        Explore by Categories
      </h2>

      {isLoading ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium border transition-all duration-200
                ${
                  selectedCategory === category
                    ? "bg-rose-700 text-white border-rose-700"
                    : "bg-white text-rose-700 border-rose-400 hover:bg-rose-50"
                }`}>
              {category}
            </Button>
          ))}
        </div>
      )}

      {selectedCategory && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            {selectedCategory} Events
          </h3>

          {isFetching ? (
            <p className="text-center">Loading events...</p>
          ) : eventsToDisplay.length === 0 ? (
            <p className="text-center text-gray-500">
              No events found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsToDisplay.map((event: any) => (
                <div
                  key={event._id}
                  className="p-5 border rounded-xl shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all">
                  <h4 className="text-lg font-semibold text-rose-700 mb-2">
                    {event.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mt-1">{event.location}</p>

                  <div className="mt-4">
                    <Link href={`/event/${event._id}`}>
                      <Button className="bg-rose-700 hover:bg-rose-800 text-white w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
