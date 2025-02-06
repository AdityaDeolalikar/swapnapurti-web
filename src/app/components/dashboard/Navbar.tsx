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
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>

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
          </div>
        </div>
      </div>
    </nav>
  );
}
