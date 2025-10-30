"use client";

import Image from "next/image";

const galleryImages = Array.from({ length: 6 }, (_, i) => ({
  src: "/galleries.jpg",
  alt: `Graduates Group ${i + 1}`,
}));

export default function Galleries() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-rose-700 mb-12">
          Graduate Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
