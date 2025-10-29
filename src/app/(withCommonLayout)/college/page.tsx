/* eslint-disable @next/next/no-img-element */
"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";
import { useGetColleges } from "@/hooks/college.hook";
import { envConfig } from "@/config/envConfig";
import CollegesLoading from "./loading";

// ShadCN Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Icons
import { Calendar, Star, Trophy, Book } from "lucide-react";

export default function Colleges() {
  const { data, isLoading, error } = useGetColleges();

  if (isLoading) return <CollegesLoading />;

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load colleges
      </div>
    );

  const colleges = data?.data || [];

  return (
    <Container>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-10 text-3xl sm:text-4xl font-bold text-center text-purple-700">
            Top Colleges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {colleges.map((college: any) => (
              <Card
                key={college._id}
                className="overflow-hidden py-0  shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                {/* College Image */}
                <div className="relative h-40 sm:h-44 md:h-48 w-full">
                  <img
                    src={`${envConfig.base_Url}${college.image}`}
                    alt={college.collegeName}
                    className="object-cover w-full h-full rounded-t-md"
                  />
                </div>

                <CardContent className="flex flex-col gap-2 sm:gap-3 p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {college.collegeName}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1">
                      <Calendar size={14} /> {college.admissionDate}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1">
                      <Trophy size={14} />{" "}
                      {college.sports[0].split(",").join(", ")}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1">
                      <Book size={14} /> {college.numberOfResearch} Research
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1">
                      <Star size={14} /> {college.rating.toFixed(1)}
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mt-2">
                    <span className="font-medium">Events:</span>{" "}
                    {college.events[0].split(",").join(", ")}
                  </p>
                </CardContent>

                <CardFooter className="p-4">
                  <Link
                    href={`/college/${college._id}`}
                    className="w-full">
                    <Button className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90">
                      Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
