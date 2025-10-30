"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-purple-700 tracking-wider">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link href="/">
          <Button
            className="mt-6"
            size="lg"
            variant="default">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
