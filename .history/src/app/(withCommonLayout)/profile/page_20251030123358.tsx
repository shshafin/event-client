/* eslint-disable @next/next/no-img-element */
"use client";

import Container from "@/components/ui/Container";
import { useGetMyAdmissions } from "@/hooks/admission.hook";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  User,
  Mail,
  Phone,
  Home,
  GraduationCap,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { envConfig } from "@/config/envConfig";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";

export default function MyColleges() {
  const router = useRouter();
  const { user } = useUser();

  const users = user?.data || [];

  if (admissions.length === 0)
    return (
      <Container>
        <p className="text-center py-20 text-gray-500 text-lg">
          You have no admissions yet.
        </p>
      </Container>
    );

  const latestAdmission = admissions.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const handleEdit = () => {
    router.push(`/profile/edit/${latestAdmission._id}`);
  };

  return (
    <Container>
      <div className="py-12 max-w-4xl mx-auto">
        <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          {/* Header */}
          <CardHeader className="relative flex flex-col items-center gap-4 bg-rose-50 p-6">
            <img
              src={`${envConfig.base_Url}${latestAdmission.image}`}
              alt={latestAdmission.candidateName}
              className="object-cover w-32 h-32 rounded-full border-4 border-rose-600 shadow-lg"
            />
            <CardTitle className="text-3xl font-bold text-rose-700 text-center">
              {latestAdmission.candidateName}
            </CardTitle>
            <p className="text-gray-600 text-sm text-center">
              Latest Admission Overview
            </p>

            {/* Edit Button */}
            <Button
              variant="default"
              size="sm"
              className="absolute top-4 right-4 flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white"
              onClick={handleEdit}>
              <Edit2 size={16} /> Edit
            </Button>
          </CardHeader>

          {/* Content */}
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User
                  size={20}
                  className="text-rose-600"
                />{" "}
                Name:
                <span className="ml-auto font-medium">
                  {latestAdmission.candidateName}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Mail
                  size={20}
                  className="text-rose-600"
                />{" "}
                Email:
                <span className="ml-auto font-medium">
                  {latestAdmission.candidateEmail}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Phone
                  size={20}
                  className="text-rose-600"
                />{" "}
                Phone:
                <span className="ml-auto font-medium">
                  {latestAdmission.candidatePhone}
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar
                  size={20}
                  className="text-rose-600"
                />{" "}
                Date of Birth:
                <span className="ml-auto font-medium">
                  {latestAdmission.dateOfBirth}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Home
                  size={20}
                  className="text-rose-600"
                />{" "}
                Address:
                <span className="ml-auto font-medium">
                  {latestAdmission.address}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <GraduationCap
                  size={20}
                  className="text-rose-600"
                />{" "}
                College:
                <span className="ml-auto font-medium">
                  {latestAdmission.collegeId.collegeName}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              Admission created at:{" "}
              {new Date(latestAdmission.createdAt).toLocaleString()}
            </p>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}
