"use client";

import { useSearchParams } from "next/navigation";
import EventRegistrationPage from "./page";

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
