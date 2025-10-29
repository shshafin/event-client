/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useGetCollegeById } from "@/hooks/college.hook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Star, Trophy, Book } from "lucide-react";
import { envConfig } from "@/config/envConfig";
import FXForm from "@/components/form/FXForm";
import { useAddReview } from "@/hooks/review.hook";
import FXTextArea from "@/components/form/FXTextArea";
import { toast } from "sonner";
import { useState } from "react";

function StarRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star, index) => {
        const fillValue = hover || rating;
        let starFill = 0;

        if (fillValue >= star) starFill = 100; // full star
        else if (fillValue + 0.5 >= star) starFill = 50; // half star

        return (
          <div
            key={star}
            className="relative w-6 h-6 cursor-pointer"
            onMouseEnter={() => setHover(star - 0.5)}
            onMouseMove={(e) => {
              const rect = (e.target as HTMLDivElement).getBoundingClientRect();
              const x = e.clientX - rect.left;
              if (x < rect.width / 2) setHover(star - 0.5);
              else setHover(star);
            }}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(hover || star)}>
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full">
              <defs>
                <linearGradient
                  id={`grad-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0">
                  <stop
                    offset={`${starFill}%`}
                    stopColor="orange"
                  />
                  <stop
                    offset={`${starFill}%`}
                    stopColor="lightgray"
                  />
                </linearGradient>
              </defs>
              <path
                fill={`url(#grad-${index})`}
                stroke="orange"
                strokeWidth="1"
                d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.254L12 19.771l-7.417 3.886L6 15.603 0 9.753l8.332-1.735z"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
export default function CollegePage() {
  const params = useParams();
  const { id } = params;
  const { data, isLoading, error, refetch } = useGetCollegeById(id as any);

  const addReviewHook = useAddReview();
  const [starRating, setStarRating] = useState(0);

  if (isLoading) return <p className="text-center py-20">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-20 text-red-500">Failed to load college</p>
    );

  const college = data.data;
  if (!college) return <p className="text-center py-20">College not found</p>;

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4">
      {/* College Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          {college.collegeName}
        </h1>
        <div className="relative h-64 w-full mb-6">
          <img
            src={`${envConfig.base_Url}${college.image}`}
            alt={college.collegeName}
            className="object-cover w-full h-full rounded-md shadow-md"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <Badge className="flex items-center gap-1 text-sm">
            <Calendar size={14} /> {college.admissionDate}
          </Badge>
          <Badge className="flex items-center gap-1 text-sm">
            <Trophy size={14} /> {college.sports[0].split(",").join(", ")}
          </Badge>
          <Badge className="flex items-center gap-1 text-sm">
            <Book size={14} /> {college.numberOfResearch} Research
          </Badge>
          <Badge className="flex items-center gap-1 text-sm">
            <Star size={14} /> {college.rating.toFixed(1)}
          </Badge>
        </div>

        <p className="text-gray-600 text-base mb-6">
          <span className="font-medium">Events:</span>{" "}
          {college.events[0].split(",").join(", ")}
        </p>
      </div>
      {/* Add Review Form */}
      <div className="border-t pt-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add a Review</h3>
        <FXForm
          onSubmit={async (formData: any) => {
            if (starRating === 0) {
              toast("Please select a rating!");
              return;
            }

            try {
              await addReviewHook.mutateAsync({
                collegeId: id,
                rating: starRating,
                comment: formData.comment,
              });
              refetch();
              setStarRating(0);
              toast("Review submitted successfully!");
            } catch (err: any) {
              alert(err.message || "Failed to submit review");
            }
          }}
          defaultValues={{ comment: "" }}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Rating:</label>
            <StarRating
              rating={starRating}
              setRating={setStarRating}
            />
          </div>
          <FXTextArea
            name="comment"
            label="Comment"
            placeholder="Write your review..."
          />
          <Button
            type="submit"
            className="bg-purple-600 text-white hover:bg-purple-700 mt-4">
            Submit Review
          </Button>
        </FXForm>
      </div>

      {/* Reviews */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Reviews ({college.reviews.length})
        </h2>
        <div className="flex flex-col gap-4 mb-6">
          {college.reviews.map((review: any) => (
            <div
              key={review._id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  Rating: {review.rating.toFixed(1)}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mb-12">
        <Link href="/college">
          <Button className="bg-purple-600 text-white hover:bg-purple-700 cursor-pointer px-6 py-2">
            Back to Colleges
          </Button>
        </Link>
      </div>
    </div>
  );
}
