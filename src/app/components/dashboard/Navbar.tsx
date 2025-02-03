"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import admin from '../../../../public/icons/admin.png'

import {
  FaSearch,
  FaBell,
  FaRegBell,
  FaChevronDown,
  FaSun,
  FaMoon,
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState("Dashboard");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts[2]) {
      setCurrentRole(
        pathParts[2]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  }, [pathname]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add actual theme implementation here
  };

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md shadow-lg flex items-center px-6 sticky top-0 z-30 transition-all duration-300">
      <div className="w-full flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">
            <span className="text-blue-600 ml-6">{currentRole}</span> Dashboard
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className={`flex items-center transition-all duration-300 ${
              isSearchOpen ? "w-64" : "w-48"
            }`}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
              <FaSearch className="absolute right-3 text-gray-400" />
            </div>
          </div>

          

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="View notifications"
          >
            {hasNotifications ? (
              <>
                <FaBell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </>
            ) : (
              <FaRegBell className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Image
                src={admin}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700">
                John Doe
              </span>
              <FaChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Your Profile
                </a>
                
                <div className="my-2 border-t border-gray-100" />
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
