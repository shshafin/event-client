"use client";

export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg animate-pulse h-[400px] overflow-hidden">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-6 flex flex-col gap-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="mt-4 h-10 bg-gray-400 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}
