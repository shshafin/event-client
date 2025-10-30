"use client";

import { useGetAllReviews } from "@/hooks/review.hook";
import { Star } from "lucide-react";

export default function RecentReviewsSection() {
  const { data, isLoading } = useGetAllReviews();
  console.log("review");
  const reviews = data?.data?.slice(-5).reverse() || []; // latest 5 reviews

  if (isLoading) {
    return <p className="text-center mt-10">Loading recent reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No reviews available yet.
      </p>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-rose-700 mb-8">
        Recent Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: any, index: number) => (
          <div
            key={index}
            className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-rose-700">
                  {review.username}
                </h4>
                <p className="text-gray-500 text-sm">{review.email}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < review.rating ? "#fbbf24" : "none"}
                    stroke={i < review.rating ? "#fbbf24" : "#d1d5db"}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
