"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo & description */}
          <div>
            <span className="font-bold text-xl text-rose-700">Event</span>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Event Management System
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="hover:text-rose-700">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-rose-700">
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-sm">
          © {new Date().getFullYear()} MyCollegeApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
