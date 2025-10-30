"use client";

import { useUser } from "@/context/user.provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <section className="h-120">
      <div className="max-w-md mx-auto mt-28 p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-3xl font-bold text-center text-rose-700 mb-6">
          My Profile
        </h2>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-gray-500 text-sm">Username</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.username || "N/A"}
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => router.push("/profile/edit")}
            className="bg-rose-700 hover:bg-rose-800 text-white px-6">
            Edit Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
