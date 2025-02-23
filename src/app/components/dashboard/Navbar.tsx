"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import admin from "../../../../public/icons/admin.png";
import { FaSearch, FaChevronDown, FaPhone } from "react-icons/fa";

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
  const [showToast, setShowToast] = useState(false);
  const emergencyNumber = "8888330578"; // Demo emergency number

  const handleSOSClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(emergencyNumber).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
    });
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base mx-4">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Emergency number copied!</span>
        </div>
      )}

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
            {/* SOS Button */}
            <button
              onClick={handleSOSClick}
              className="group relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-red-600 animate-pulse"
              aria-label="Copy emergency number"
            >
              <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span>SOS</span>
              </span>
            </button>

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
    </>
  );
}
