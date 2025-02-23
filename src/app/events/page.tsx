"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";
import EventDetailsCard from "../components/dashboard/EventDetailsCard";

interface Creator {
  name: string;
  phone: string;
  organization: string;
  district: string;
  occupation: string;
  profileImage?: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  district: string;
  date: string;
  eligibility: "male" | "female" | "all";
  fee: number;
  spots: string;
  image: string;
  schedule?: string;
  requirements?: string;
  undertaking?: string;
  creator?: Creator;
  status: string;
  itinerary: { day: string; activities: string[] }[];
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
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&fit=crop",
    schedule: "Day 1\n08:00 AM - Arrival and Registration\n09:30 AM - Welcome Ceremony\n11:00 AM - Camp Setup Training\n02:00 PM - Evening Team Building Activities\n\nDay 2\n06:00 AM - Morning Yoga and Exercise\n09:00 AM - Rock Climbing Workshop\n02:00 PM - Nature Trail Exploration\n07:00 PM - Campfire and Cultural Night\n\nDay 3\n07:00 AM - Trekking Expedition\n10:00 AM - Survival Skills Workshop\n02:00 PM - Adventure Sports Activities\n08:00 PM - Star Gazing Session",
    requirements: "1. Age between 18-35 years\n2. Basic fitness level\n3. Valid ID proof\n4. Medical fitness certificate\n5. Personal essentials as per provided list",
    undertaking: "I hereby declare that I am participating in this adventure camp voluntarily and am aware of the inherent risks involved. I will follow all safety guidelines and instructions provided by the camp authorities.",
    creator: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      profileImage: "/images/team/rajesh.jpg",
      organization: "Adventure Sports Academy",
      district: "Pune",
      occupation: "Adventure Sports Instructor"
    },
    status: "upcoming",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          "Arrival and Registration",
          "Welcome Ceremony",
          "Camp Setup Training",
          "Evening Team Building Activities"
        ]
      },
      {
        day: "Day 2",
        activities: [
          "Morning Yoga and Exercise",
          "Rock Climbing Workshop",
          "Nature Trail Exploration",
          "Campfire and Cultural Night"
        ]
      },
      {
        day: "Day 3",
        activities: [
          "Trekking Expedition",
          "Survival Skills Workshop",
          "Adventure Sports Activities",
          "Star Gazing Session"
        ]
      }
    ]
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
    image: "/images/events/nature-explorer-camp.jpg",
    schedule: "Day 1\n08:00 AM - Check-in and Orientation\n09:00 AM - Nature Photography Workshop\n10:00 AM - Bird Watching Session\n02:00 PM - Evening Nature Walk\n\nDay 2\n06:00 AM - Sunrise Yoga\n09:00 AM - Plant Identification Workshop\n10:00 AM - Wildlife Conservation Talk\n07:00 PM - Night Sky Photography\n\nDay 3\n07:00 AM - Nature Trail Hike\n10:00 AM - Wilderness First Aid Training\n02:00 PM - Environmental Conservation Activities\n07:00 PM - Bonfire and Stories",
    requirements: "1. Age between 18-35 years\n2. Basic fitness level\n3. Valid ID proof\n4. Medical fitness certificate\n5. Personal essentials as per provided list",
    undertaking: "I hereby declare that I am participating in this nature explorer camp voluntarily and am aware of the inherent risks involved. I will follow all safety guidelines and instructions provided by the camp authorities.",
    creator: {
      name: "Priya Sharma",
      phone: "+91 9876543210",
      profileImage: "/images/team/priya.jpg",
      organization: "Wildlife Conservation Society",
      district: "Satara",
      occupation: "Wildlife Conservation Instructor"
    },
    status: "upcoming",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          "Check-in and Orientation",
          "Nature Photography Workshop",
          "Bird Watching Session",
          "Evening Nature Walk"
        ]
      },
      {
        day: "Day 2",
        activities: [
          "Sunrise Yoga",
          "Plant Identification Workshop",
          "Wildlife Conservation Talk",
          "Night Sky Photography"
        ]
      },
      {
        day: "Day 3",
        activities: [
          "Nature Trail Hike",
          "Wilderness First Aid Training",
          "Environmental Conservation Activities",
          "Bonfire and Stories"
        ]
      }
    ]
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
    image: "/images/events/mountain-trek-camp.jpg",
    schedule: "Day 1\n07:00 AM - Base Camp Setup\n09:00 AM - Equipment Familiarization\n10:00 AM - Basic Climbing Techniques\n11:00 AM - Safety Briefing\n\nDay 2\n06:00 AM - Early Morning Trek\n09:00 AM - Rock Climbing Practice\n10:00 AM - Navigation Skills Workshop\n02:00 PM - Evening Stretching Session\n\nDay 3\n07:00 AM - Summit Attempt\n10:00 AM - Mountain Photography\n02:00 PM - Rappelling Workshop\n07:00 PM - Achievement Celebration",
    requirements: "1. Age between 18-35 years\n2. Basic fitness level\n3. Valid ID proof\n4. Medical fitness certificate\n5. Personal essentials as per provided list",
    undertaking: "I hereby declare that I am participating in this mountain trek camp voluntarily and am aware of the inherent risks involved. I will follow all safety guidelines and instructions provided by the camp authorities.",
    creator: {
      name: "Amit Patel",
      phone: "+91 9876543210",
      profileImage: "/images/team/amit.jpg",
      organization: "Mountain Climbing Club",
      district: "Thane",
      occupation: "Mountain Climbing Instructor"
    },
    status: "upcoming",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          "Base Camp Setup",
          "Equipment Familiarization",
          "Basic Climbing Techniques",
          "Safety Briefing"
        ]
      },
      {
        day: "Day 2",
        activities: [
          "Early Morning Trek",
          "Rock Climbing Practice",
          "Navigation Skills Workshop",
          "Evening Stretching Session"
        ]
      },
      {
        day: "Day 3",
        activities: [
          "Summit Attempt",
          "Mountain Photography",
          "Rappelling Workshop",
          "Achievement Celebration"
        ]
      }
    ]
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
    image: "/images/events/wilderness-survival-camp.jpg",
    schedule: "Day 1\n08:00 AM - Camp Setup Training\n09:00 AM - Fire Starting Workshop\n10:00 AM - Basic Shelter Building\n11:00 AM - Night Navigation Exercise\n\nDay 2\n08:00 AM - Water Collection & Purification\n09:00 AM - Edible Plants Workshop\n10:00 AM - Rope Craft & Knots\n11:00 AM - Survival First Aid\n\nDay 3\n08:00 AM - Advanced Shelter Building\n09:00 AM - Tool Making Workshop\n10:00 AM - Signal & Communication Methods\n11:00 AM - Survival Scenario Practice",
    requirements: "1. Age between 18-35 years\n2. Basic fitness level\n3. Valid ID proof\n4. Medical fitness certificate\n5. Personal essentials as per provided list",
    undertaking: "I hereby declare that I am participating in this wilderness survival camp voluntarily and am aware of the inherent risks involved. I will follow all safety guidelines and instructions provided by the camp authorities.",
    creator: {
      name: "Sneha Singh",
      phone: "+91 9876543210",
      profileImage: "/images/team/sneha.jpg",
      organization: "Survival Skills Academy",
      district: "Ahmednagar",
      occupation: "Survival Skills Instructor"
    },
    status: "upcoming",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          "Camp Setup Training",
          "Fire Starting Workshop",
          "Basic Shelter Building",
          "Night Navigation Exercise"
        ]
      },
      {
        day: "Day 2",
        activities: [
          "Water Collection & Purification",
          "Edible Plants Workshop",
          "Rope Craft & Knots",
          "Survival First Aid"
        ]
      },
      {
        day: "Day 3",
        activities: [
          "Advanced Shelter Building",
          "Tool Making Workshop",
          "Signal & Communication Methods",
          "Survival Scenario Practice"
        ]
      }
    ]
  },
];

const EventsPage = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEnroll = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
        <Link
          href="/register/step1"
          className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
        >
          <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">
            Enroll Now
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>
      </div>
      <nav className="w-full z-50  shadow-md fixed bg-[#87CEEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-300"
              >
                <span className="flex items-center text-white">
                  <span className="mr-2">🏕️</span>
                  Swapnapurti Academy
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 ">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/events", label: "Upcoming Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/#contact", label: "Contact Us" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 text-white py-2 text-sm font-medium transition-all duration-300 group ${
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#03626b]">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/events", label: "Upcoming Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/#contact", label: "Contact Us" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-white bg-[#024950]"
                      : "text-gray-100 hover:text-white hover:bg-[#024950]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="space-y-2 pt-4 pb-3 border-t border-[#024950]">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register/step1"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 rounded-md text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Events Content */}
      <main className="md:pt-28 pt-28 px-4 sm:px-6 lg:px-8 pb-16  bg-[#87CEEB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold  mb-4">Upcoming Events</h1>
            <p className="text-lg  max-w-2xl mx-auto">
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

                  {/* Event ID */}
                  <p className="text-sm text-gray-500 mb-2">
                    Event ID: {event.id.toString().padStart(6, '0')}
                  </p>

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
      {showEventDetails && selectedEvent && (
        <EventDetailsCard event={selectedEvent} onClose={closeEventDetails} />
      )}
    </div>
  );
};

export default EventsPage;
