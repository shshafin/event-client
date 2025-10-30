"use client";

import { useUser } from "@/context/user.provider";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Please log in to view your profile.
      </p>
    );
  }

  return (
   <section className="h-160"></section>
  );
}
