"use client";

import CardSkeleton from "@/components/ui/cardSkeleton";
import Container from "@/components/ui/Container";

export default function EventsLoading() {
  return (
    <Container>
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-center">A</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
