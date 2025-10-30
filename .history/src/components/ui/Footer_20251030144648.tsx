"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo & description */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-2xl text-purple-400 tracking-wide">
              Event
            </span>
            <p className="text-sm text-gray-400">
              Event Management System — plan, manage, and explore events
              effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-300">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-purple-400 transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Event. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
