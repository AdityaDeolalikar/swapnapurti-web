"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import admin from "../../../../public/icons/admin.png";
import { FaSearch, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const role = (() => {
    // Initialize role based on the initial path
    const pathParts = pathname.split("/");
    if (pathParts[2] === "admin") {
      return "Admin";
    } else if (pathParts[2] === "event-manager") {
      return "Event Manager";
    }
    return "User";
  })();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md shadow-lg flex items-center px-6 sticky top-0 z-30 transition-all duration-300">
      <div className="w-full flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">
            <span className="text-blue-600 ml-14">{role}</span> Dashboard
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-6">
          {/* Search */}
         

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={admin}
                  alt="Admin"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <FaChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    // Add logout logic here
                    window.location.href = "/";
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
