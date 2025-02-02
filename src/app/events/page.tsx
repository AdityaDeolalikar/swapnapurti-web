"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  district: string;
  date: string;
  eligibility: "male" | "female";
  fee: number;
  spots: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Adventure Camp 2024",
    description:
      "Experience thrilling outdoor activities and team-building exercises in the heart of nature.",
    location: "Lonavala, Maharashtra",
    district: "Pune",
    date: "15-20 April, 2024",
    eligibility: "male",
    fee: 5000,
    spots: "50 spots available",
  },
  {
    id: 2,
    title: "Nature Explorer Camp",
    description:
      "Discover the beauty of wildlife and learn survival skills in a safe, guided environment.",
    location: "Panchgani, Maharashtra",
    district: "Satara",
    date: "1-5 May, 2024",
    eligibility: "female",
    fee: 4500,
    spots: "40 spots available",
  },
  {
    id: 3,
    title: "Mountain Trek Camp",
    description:
      "Challenge yourself with mountain climbing and hiking adventures.",
    location: "Malshej Ghat, Maharashtra",
    district: "Thane",
    date: "10-15 May, 2024",
    eligibility: "male",
    fee: 6000,
    spots: "30 spots available",
  },
  {
    id: 4,
    title: "Wilderness Survival Camp",
    description:
      "Learn essential survival skills and connect with nature in this immersive experience.",
    location: "Bhandardara, Maharashtra",
    district: "Ahmednagar",
    date: "20-25 May, 2024",
    eligibility: "female",
    fee: 5500,
    spots: "35 spots available",
  },
];

const EventsPage = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEnroll = (event: Event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
    setAcceptedTerms(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
  };

  const handlePayment = () => {
    // Handle payment logic here
    console.log("Processing payment for event:", selectedEvent?.title);
  };

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
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
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

      {/* Events Content */}
      <main className="md:pt-28 pt-28 px-4 sm:px-6 lg:px-8 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our exciting camping adventures and create unforgettable
              memories
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
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

                    {/* Eligibility */}
                    <div className="flex items-start space-x-2">
                      <FaUsers
                        className={`mt-1 ${
                          event.eligibility === "male"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-gray-500">Eligibility</p>
                        <p
                          className={`text-sm font-medium capitalize ${
                            event.eligibility === "male"
                              ? "text-blue-600"
                              : "text-pink-600"
                          }`}
                        >
                          {event.eligibility} only
                        </p>
                      </div>
                    </div>

                    {/* Fee */}
                    <div className="flex items-start space-x-2">
                      <FaRupeeSign
                        className={`mt-1 ${
                          event.eligibility === "male"
                            ? "text-blue-500"
                            : "text-pink-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-gray-500">Fee</p>
                        <p className="text-sm font-medium text-gray-900">
                          ₹{event.fee}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spots & Enroll Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{event.spots}</p>
                    <button
                      onClick={() => handleEnroll(event)}
                      className={`px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 ${
                        event.eligibility === "male"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-pink-500 hover:bg-pink-600"
                      }`}
                    >
                      Enroll
                    </button>
                  </div>
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

      {/* Enrollment Popup */}
      {isPopupOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                Event Enrollment
              </h2>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Popup Content */}
            <div className="p-6 space-y-6">
              {/* Event Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedEvent.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">District</p>
                    <p className="font-medium">{selectedEvent.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedEvent.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fee</p>
                    <p className="font-medium">₹{selectedEvent.fee}</p>
                  </div>
                </div>
              </div>

              {/* Declaration */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Declaration and Undertaking
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  I hereby declare that all the information provided is true and
                  correct. I understand and agree to abide by all the rules and
                  regulations of the camp. I acknowledge that camping activities
                  involve inherent risks, and I voluntarily assume those risks. I
                  will follow all safety instructions and guidelines provided by
                  the camp authorities.
                </p>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the declaration and undertaking
                  </span>
                </label>
              </div>
            </div>

            {/* Popup Footer */}
            <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={handlePayment}
                disabled={!acceptedTerms}
                className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  acceptedTerms
                    ? selectedEvent.eligibility === "male"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-pink-500 hover:bg-pink-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <FaCheckCircle />
                <span>Pay ₹{selectedEvent.fee} to Enroll</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
