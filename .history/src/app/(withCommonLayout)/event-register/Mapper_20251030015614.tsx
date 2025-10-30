"use client";

import { useSearchParams } from "next/navigation";


export default function EventRegisterWrapper() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return (
      <p className="text-center mt-20 text-red-500">
        No event selected for registration.
      </p>
    );
  }

  return <EventRegistrationPage eventId={eventId} />;
}
