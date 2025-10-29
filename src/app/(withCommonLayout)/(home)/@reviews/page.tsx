"use client";

import { useGetAllReviews } from "@/hooks/review.hook";
import { Star } from "lucide-react";

export default function ReviewSection() {
  const { data, isLoading, error } = useGetAllReviews();

  if (isLoading)
    return (
      <section className="py-16 text-center text-gray-500">
        Loading reviews...
      </section>
    );

  if (error)
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load reviews.
      </section>
    );

  const reviews = data?.data || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-12">
          What Students Say
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.round(review.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    “{review.comment}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
