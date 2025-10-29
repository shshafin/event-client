/* eslint-disable @next/next/no-img-element */
"use client";

import Container from "@/components/ui/Container";
import { useGetMyColleges } from "@/hooks/college.hook";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Book } from "lucide-react";
import { envConfig } from "@/config/envConfig";

export default function MyColleges() {
  const { data, isLoading, error } = useGetMyColleges();

  if (isLoading)
    return (
      <Container>
        <p className="text-center py-20 text-gray-500">Loading...</p>
      </Container>
    );

  if (error)
    return (
      <Container>
        <p className="text-center py-20 text-red-500">
          Failed to load your colleges
        </p>
      </Container>
    );

  const colleges = data?.data || [];

  if (colleges.length === 0)
    return (
      <Container>
        <p className="text-center py-20 text-gray-500">
          You have no colleges yet.
        </p>
      </Container>
    );

  return (
    <Container>
      <section className="py-16">
        <h2 className="mb-12 text-3xl sm:text-4xl font-bold text-center text-purple-700">
          My Colleges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((admission: any) => {
            const college = admission.collegeId as any;
            console.log(college);
            return (
              <Card
                key={admission._id}
                className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                {/* College Image */}
                <div className="relative h-44 w-full">
                  <img
                    src={`${envConfig.base_Url}${college.image}`}
                    alt={college.collegeName}
                    className="object-cover w-full h-full"
                  />
                </div>

                <CardContent className="flex flex-col gap-2 p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {college.collegeName}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                    <Calendar size={16} /> Admission Date:{" "}
                    {college.admissionDate}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                    <Book size={16} /> Events:{" "}
                    {college.events[0].split(",").join(", ")}
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mt-2">
                    Research Projects: {college.numberOfResearch}
                  </p>

                  <p className="text-gray-600 text-sm sm:text-base mt-2">
                    Sports: {college.sports[0].split(",").join(", ")}
                  </p>
                </CardContent>

                <CardFooter className="p-4">
                  <Link
                    href={`/college/${college._id}`}
                    className="w-full">
                    <Button className="w-full bg-purple-600 text-white hover:opacity-90 cursor-pointer">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
