"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMedal,
  FaCertificate,
} from "react-icons/fa";

interface AttendedEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  district: string;
  date: string;
  eligibility: "male" | "female";
  fee: number;
  certificate: string;
  achievement: string;
}

const attendedEvents: AttendedEvent[] = [
  {
    id: 1,
    title: "Winter Adventure Camp 2023",
    description: "A thrilling winter camping experience with survival skills training and team activities.",
    location: "Lonavala, Maharashtra",
    district: "Pune",
    date: "15-20 December, 2023",
    eligibility: "male",
    fee: 5000,
    certificate: "Adventure Training Level 1",
    achievement: "Best Team Player Award",
  },
  {
    id: 2,
    title: "Summer Nature Camp 2023",
    description: "An enriching summer camp focused on nature exploration and environmental awareness.",
    location: "Panchgani, Maharashtra",
    district: "Satara",
    date: "10-15 May, 2023",
    eligibility: "female",
    fee: 4500,
    certificate: "Nature Conservation Basic",
    achievement: "Outstanding Participant",
  },
];

const ContributionPage = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="w-full z-50 bg-white shadow-md fixed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-300"
              >
                <span className="flex items-center">
                  <span className="mr-2">🏕️</span>
                  Swapnapurti Academy
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/#contact", label: "Contact Us" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contribution", label: "My Contribution" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-all duration-300 ${
                      isActive(item.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register/step1"
                  className="px-5 py-2 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/#contact", label: "Contact Us" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contribution", label: "My Contribution" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="space-y-2 pt-2 pb-3 border-t border-gray-200">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                >
                  Login
                </Link>
                <Link
                  href="/register/step1"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 px-4 sm:px-6 lg:px-8 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              My Attended Events
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A showcase of your camping journey and achievements with Swapnapurti Academy
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attendedEvents.map((event) => (
              <div
                key={event.id}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  event.eligibility === "male"
                    ? "bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500"
                    : "bg-gradient-to-br from-pink-50 to-white border-l-4 border-pink-500"
                }`}
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm">
                    {event.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Location */}
                    <div className="flex items-start space-x-2">
                      <FaMapMarkerAlt
                        className={`mt-1 ${
                          event.eligibility === "male"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-start space-x-2">
                      <FaCalendarAlt
                        className={`mt-1 ${
                          event.eligibility === "male"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {event.date}
                        </p>
                      </div>
                    </div>

                    {/* Certificate */}
                    <div className="flex items-start space-x-2">
                      <FaCertificate
                        className={`mt-1 ${
                          event.eligibility === "male"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-gray-500">Certificate</p>
                        <p className="text-sm font-medium text-gray-900">
                          {event.certificate}
                        </p>
                      </div>
                    </div>

                    {/* Achievement */}
                    <div className="flex items-start space-x-2">
                      <FaMedal
                        className={`mt-1 ${
                          event.eligibility === "male"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-gray-500">Achievement</p>
                        <p className="text-sm font-medium text-gray-900">
                          {event.achievement}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View Certificate Button */}
                  <div className="flex items-center justify-end">
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 ${
                        event.eligibility === "male"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-pink-500 hover:bg-pink-600"
                      }`}
                    >
                      View details
                    </button>
                  </div>
                </div>

                {/* Completed Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  event.eligibility === "male"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-pink-100 text-pink-600"
                }`}>
                  Completed
                </div>

                {/* Decorative corner shape */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rotate-45 ${
                    event.eligibility === "male"
                      ? "bg-blue-500/10"
                      : "bg-pink-500/10"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContributionPage;
