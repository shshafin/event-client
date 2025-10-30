"use client";

import { useCancelBooking, useGetMyBookings } from "@/hooks/register.hook";
import { useAddReview } from "@/hooks/review.hook";
import { useState } from "react";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const { data, isLoading, refetch } = useGetMyBookings();
  const { mutateAsync: cancelBooking } = useCancelBooking();
  const { mutateAsync: addReview } = useAddReview();

  const [reviews, setReviews] = useState<{
    [key: string]: { rating: number; comment: string };
  }>({});

  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      toast.success("Booking canceled successfully!");
      refetch();
    } catch {
      toast.error("Failed to cancel booking!");
    }
  };

  const handleReviewChange = (
    bookingId: string,
    field: "rating" | "comment",
    value: any
  ) => {
    setReviews((prev) => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], [field]: value },
    }));
  };

  const handleSubmitReview = async (booking: any) => {
    const review = reviews[booking._id];
    if (!review?.rating || !review?.comment) {
      toast.error("Please provide both rating and comment");
      return;
    }

    try {
      await addReview({
        eventId: booking.eventId._id,
        rating: review.rating,
        comment: review.comment,
      });

      toast.success("Review submitted successfully!");
      setReviews((prev) => ({
        ...prev,
        [booking._id]: { rating: 0, comment: "" },
      }));
    } catch {
      toast.error("Failed to submit review!");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading your bookings...
        </p>
      </div>
    );

  const bookings = (data?.data || []).filter(
    (booking: any) => booking.status !== "cancelled"
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 mt-24">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-rose-600 to-blue-500 bg-clip-text text-transparent">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No bookings found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="rounded-2xl p-6 bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {booking.eventId.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    <span className="text-gray-700">
                      {new Date(booking.eventId.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Tickets:{" "}
                    <span className="text-gray-700">
                      {booking.numberOfTickets}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => handleCancel(booking._id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 transition">
                  Cancel
                </button>
              </div>

              {/* Review Section */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2 text-gray-700">
                  Add a Review
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="⭐ Rating (1-5)"
                    value={reviews[booking._id]?.rating || ""}
                    onChange={(e) =>
                      handleReviewChange(
                        booking._id,
                        "rating",
                        Number(e.target.value)
                      )
                    }
                    className="border border-gray-300 rounded-lg p-2 w-24 focus:ring-2 focus:ring-rose-400 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={reviews[booking._id]?.comment || ""}
                    onChange={(e) =>
                      handleReviewChange(booking._id, "comment", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 flex-1 focus:ring-2 focus:ring-rose-400 outline-none"
                  />
                  <button
                    onClick={() => handleSubmitReview(booking)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-rose-500 text-white rounded-lg hover:opacity-90 transition">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
