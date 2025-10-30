"use client";

import { useCancelBooking, useGetMyBookings } from "@/hooks/register.hook";
import { useState } from "react";
import { toast } from "sonner";


export default function MyBookingsPage() {
  const { data, isLoading, refetch } = useGetMyBookings();
  const { mutateAsync: cancelBooking } = useCancelBooking();

  const [reviews, setReviews] = useState<{ [key: string]: { rating: number; comment: string } }>({});

  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      toast.success("Booking canceled successfully!");
      refetch();
    } catch {
      toast.error("Failed to cancel booking!");
    }
  };

  const handleReviewChange = (bookingId: string, field: "rating" | "comment", value: any) => {
    setReviews((prev) => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], [field]: value },
    }));
  };

  const handleSubmitReview = (bookingId: string) => {
    const review = reviews[bookingId];
    if (!review?.rating || !review?.comment) {
      toast.error("Please provide both rating and comment");
      return;
    }
    toast.success("Review submitted!");
    console.log("Review:", bookingId, review);
  };

  if (isLoading) return <p className="text-center py-10">Loading your bookings...</p>;

  const bookings = data?.data || [];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-xl font-semibold">{booking.event.name}</h2>
                  <p className="text-gray-500 text-sm">
                    Date: {new Date(booking.event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Tickets: {booking.ticketsCount}
                  </p>
                </div>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Booking
                </button>
              </div>

              {/* Review Section */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2">Add a Review</h3>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Rating (1-5)"
                    value={reviews[booking._id]?.rating || ""}
                    onChange={(e) =>
                      handleReviewChange(booking._id, "rating", Number(e.target.value))
                    }
                    className="border rounded-lg p-2 w-24"
                  />
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={reviews[booking._id]?.comment || ""}
                    onChange={(e) =>
                      handleReviewChange(booking._id, "comment", e.target.value)
                    }
                    className="border rounded-lg p-2 flex-1"
                  />
                  <button
                    onClick={() => handleSubmitReview(booking._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
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
