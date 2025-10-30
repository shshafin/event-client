"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MenuIcon,
  XIcon,
  LogOutIcon,
  UserIcon,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/user.provider";
import { logoutUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl font-bold text-rose-700">Event</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-rose-700">
              Home
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-rose-700">
              Events
            </Link>

            {user && (
              <Link
                href="/my-bookings"
                className="text-gray-700 hover:text-rose-700">
                My Bookings
              </Link>
            )}

            {/* ✅ Only admin can see Add Event */}
            {user?.role === "admin" && (
              <Link
                href="/add-event"
                className="flex items-center gap-1 text-gray-700 hover:text-rose-700">
                <PlusCircle className="w-4 h-4" /> Add Event
              </Link>
            )}

            {/* User Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-auto px-3 h-8 rounded-full bg-rose-700 text-white flex items-center justify-center font-semibold">
                    {user.username || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={handleLogout}>
                    <LogOutIcon className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  variant="default">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-rose-700 focus:outline-none">
              {isOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1 shadow-md">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-rose-700 hover:bg-gray-100">
            Home
          </Link>
          <Link
            href="/events"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-rose-700 hover:bg-gray-100">
            Events
          </Link>

          {user && (
            <Link
              href="/my-bookings"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-rose-700 hover:bg-gray-100">
              My Bookings
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              href="/add-event"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-rose-700 hover:bg-gray-100">
              Add Event
            </Link>
          )}

          {/* Mobile User Menu */}
          {user ? (
            <div className="px-3 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-auto px-3 h-8 rounded-full bg-rose-700 text-white flex items-center justify-center font-semibold">
                    {user.username || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={handleLogout}>
                    <LogOutIcon className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/login"
              className="block cursor-pointer px-3 py-2">
              <Button
                size="sm"
                variant="default"
                className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
