"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaMedal,
  FaRupeeSign,
  FaArrowRight,
  FaTimes,
  FaPhone,
} from "react-icons/fa";
import { motion } from "framer-motion";

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
  date: string;
  location: string;
  district: string;
  status: string;
  eligibility: "male" | "female" | "all";
  fee: number;
  spots: string;
  image: string;
  schedule?: string;
  requirements?: string;
  creator?: Creator;
  undertaking?: string;
  paymentDetails?: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  coupons?: {
    code: string;
    discount: number;
    description: string;
  }[];
  referralCode?: {
    code: string;
    reward: string;
    description: string;
  };
}

interface PastEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  district: string;
  eligibility: "male" | "female" | "all";
  impact: string;
  participants: number;
  role: string;
  achievement: string;
  image: string;
  schedule?: string;
  requirements?: string;
  creator?: Creator;
}

export default function MyEvents() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedPastEvent, setSelectedPastEvent] = useState<PastEvent | null>(
    null
  );
  const [showPastEventDetails, setShowPastEventDetails] = useState(false);

  // Mock data for upcoming events with additional details
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Adventure Camp 2024",
      description:
        "Experience thrilling outdoor activities and team-building exercises in the heart of nature.",
      date: "15-20 April, 2024",
      location: "Lonavala, Maharashtra",
      district: "Pune",
      status: "Upcoming",
      eligibility: "male" as const,
      fee: 5000,
      spots: "50 spots available",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&fit=crop",
      schedule: `Day 1:
06:00 AM - Morning Tea & Snacks
07:00 AM - Arrival and Registration
09:00 AM - Welcome Ceremony
01:00 PM - Lunch Break
02:00 PM - Camp Setup Training
05:00 PM - Evening Tea
06:00 PM - Team Building Activities
08:00 PM - Dinner

Day 2:
05:30 AM - Wake Up Call
06:00 AM - Morning Yoga and Exercise
08:00 AM - Breakfast
09:00 AM - Rock Climbing Workshop
01:00 PM - Lunch Break
02:30 PM - Nature Trail Exploration
05:00 PM - Evening Tea & Snacks
07:00 PM - Campfire and Cultural Night
09:00 PM - Dinner

Day 3:
05:30 AM - Wake Up Call
06:00 AM - Morning Exercise
08:00 AM - Breakfast
09:00 AM - Trekking Expedition
01:00 PM - Packed Lunch
02:30 PM - Survival Skills Workshop
05:00 PM - Return to Camp
07:00 PM - Star Gazing Session
08:30 PM - Dinner`,
      requirements:
        "Basic fitness level, Comfortable clothing, Water bottle, Backpack",
      creator: {
        name: "Adventure Team",
        phone: "+91 98765 43210",
        organization: "Adventure Sports Club",
        district: "Pune",
        occupation: "Professional Adventure Guide",
        profileImage:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&fit=crop&auto=format",
      },
      undertaking:
        "I hereby declare that all the information provided is true to my knowledge. I understand and agree to follow all the rules and regulations of the camp. I take full responsibility for my actions during the camp.",
      paymentDetails: {
        accountName: "Adventure Sports Club",
        accountNumber: "1234567890",
        ifscCode: "ABCD0123456",
        bankName: "State Bank of India",
        branch: "Pune Main Branch",
      },
      coupons: [
        {
          code: "EARLY2024",
          discount: 500,
          description: "Early bird discount",
        },
        {
          code: "GROUP10",
          discount: 1000,
          description: "Group booking discount (min. 10 people)",
        },
      ],
      referralCode: {
        code: "FRIEND2024",
        reward: "Get ₹500 off on registration",
        description: "Enter a friend's referral code to get discount",
      },
    },
    {
      id: 2,
      title: "Mountain Hiking Expedition",
      description:
        "Join us for an exciting hiking adventure through scenic mountain trails.",
      date: "1-3 July, 2024",
      location: "Blue Mountain Trail, Pune",
      district: "Pune",
      status: "Registered",
      eligibility: "female" as const,
      fee: 2499,
      spots: "22 spots available",
      image:
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1470&fit=crop",
    },
    {
      id: 3,
      title: "Nature Photography Workshop",
      description:
        "Learn the art of nature photography with expert photographers in a scenic environment.",
      date: "10-12 May, 2024",
      location: "Matheran, Maharashtra",
      district: "Raigad",
      status: "Upcoming",
      eligibility: "all" as const,
      fee: 3500,
      spots: "30 spots available",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1474&fit=crop",
    },
  ];

  // Mock data for past contributions
  const pastContributions: PastEvent[] = [
    {
      id: 1,
      title: "Forest Cleanup Drive",
      description: "Led a team in a successful environmental cleanup campaign.",
      date: "March 15, 2024",
      location: "Green Valley Forest",
      district: "Pune",
      eligibility: "all" as const,
      impact: "150 kg waste collected",
      participants: 75,
      role: "Team Leader",
      achievement: "Gold Badge",
      image:
        "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1470&fit=crop",
      schedule: `Day 1:
08:00 AM - Team Briefing
09:00 AM - Equipment Distribution
10:00 AM - Cleanup Activity Begins
01:00 PM - Lunch Break
02:00 PM - Resume Cleanup
05:00 PM - Waste Collection and Segregation
06:00 PM - Team Debrief`,
      requirements: "Gloves, Water bottle, Comfortable clothing, Hat",
      creator: {
        name: "Green Earth Initiative",
        phone: "+91 98765 43210",
        organization: "Environmental Conservation Group",
        district: "Pune",
        occupation: "Environmental Specialist",
        profileImage:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format",
      },
    },
    {
      id: 2,
      title: "Tree Plantation Drive",
      description:
        "Participated in a massive tree plantation initiative for a greener future.",
      date: "February 28, 2024",
      location: "City Park",
      district: "Mumbai",
      eligibility: "all" as const,
      impact: "500 trees planted",
      participants: 120,
      role: "Volunteer",
      achievement: "Silver Badge",
      image:
        "https://images.unsplash.com/photo-1513377888081-794d8e958972?q=80&w=1470&fit=crop",
      schedule: `Day 1:
07:00 AM - Registration
08:00 AM - Orientation
09:00 AM - Tree Planting Begins
01:00 PM - Lunch Break
02:00 PM - Continue Planting
05:00 PM - Completion Ceremony`,
      requirements: "Garden gloves, Water bottle, Hat, Comfortable clothing",
      creator: {
        name: "Green Mumbai",
        phone: "+91 98765 43210",
        organization: "City Environmental Department",
        district: "Mumbai",
        occupation: "Environmental Officer",
        profileImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format",
      },
    },
  ];

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const handlePastEventClick = (event: PastEvent) => {
    setSelectedPastEvent(event);
    setShowPastEventDetails(true);
  };

  const closePastEventDetails = () => {
    setShowPastEventDetails(false);
    setSelectedPastEvent(null);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Upcoming Events Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Upcoming Events
            </h1>
            <p className="text-gray-600 mt-2">
              Discover and join exciting camping adventures
            </p>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white shadow-sm hover:border-blue-500 transition-colors">
              <option value="all">All Events</option>
              <option value="registered">Registered</option>
              <option value="available">Available</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              key={event.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                event.eligibility === "male"
                  ? "bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500"
                  : event.eligibility === "female"
                  ? "bg-gradient-to-br from-pink-50 to-white border-l-4 border-pink-500"
                  : "bg-gradient-to-br from-purple-50 to-white border-l-4 border-purple-500"
              }`}
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Title */}
                <h3
                  className={`text-xl font-bold text-gray-900 mb-3 group-hover:${
                    event.eligibility === "male"
                      ? "text-blue-600"
                      : event.eligibility === "female"
                      ? "text-pink-600"
                      : "text-purple-600"
                  } transition-colors`}
                >
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
                          : event.eligibility === "female"
                          ? "text-pink-500"
                          : "text-purple-500"
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
                          : event.eligibility === "female"
                          ? "text-pink-500"
                          : "text-purple-500"
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
                          : event.eligibility === "female"
                          ? "text-pink-500"
                          : "text-purple-500"
                      }`}
                    />
                    <div>
                      <p className="text-xs text-gray-500">Eligibility</p>
                      <p className="text-sm font-medium capitalize">
                        {event.eligibility === "all"
                          ? "All Welcome"
                          : `${event.eligibility} only`}
                      </p>
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="flex items-start space-x-2">
                    <FaRupeeSign
                      className={`mt-1 ${
                        event.eligibility === "male"
                          ? "text-blue-500"
                          : event.eligibility === "female"
                          ? "text-pink-500"
                          : "text-purple-500"
                      }`}
                    />
                    <div>
                      <p className="text-xs text-gray-500">Fee</p>
                      <p className="text-sm font-medium">₹{event.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Spots and Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{event.spots}</p>
                  <button
                    onClick={() => handleEventClick(event)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
                      event.eligibility === "male"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : event.eligibility === "female"
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    Enroll
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Contributions Section */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Past Contributions
            </h2>
            <p className="text-gray-600 mt-2">
              Your impact on the environment and community
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastContributions.map((event) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              key={event.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-red-50 to-white border-l-4 border-red-500"
            >
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {event.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-2">
                    <FaMapMarkerAlt className="mt-1 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <FaCalendarAlt className="mt-1 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <FaMedal className="mt-1 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500">Impact</p>
                      <p className="text-sm font-medium text-gray-900">
                        {event.impact}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <FaUsers className="mt-1 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500">Participants</p>
                      <p className="text-sm font-medium text-gray-900">
                        {event.participants}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <FaMedal className="text-red-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {event.achievement}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePastEventClick(event)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    View Details
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeEventDetails}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all">
                {/* Close Button */}
                <button
                  onClick={closeEventDetails}
                  className="absolute -top-2 -right-2 z-[150] bg-white rounded-full p-2.5 shadow-xl hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>

                {/* Modal Header */}
                <div className="sticky top-0 z-[102] bg-white px-6 py-4 border-b border-gray-200 rounded-t-2xl">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Event Details
                  </h2>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Event Image */}
                  <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {selectedEvent.title}
                      </h3>
                      <p className="text-white/90">
                        {selectedEvent.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 w-full">
                    {/* Event Information - Full Width */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Event Information
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-3">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">
                              {selectedEvent.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaCalendarAlt className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{selectedEvent.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaUsers className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Eligibility</p>
                            <p className="font-medium capitalize">
                              {selectedEvent.eligibility === "all"
                                ? "All Welcome"
                                : `${selectedEvent.eligibility} only`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaRupeeSign className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Fee</p>
                            <p className="font-medium">₹{selectedEvent.fee}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Two Column Layout for Schedule and Contact Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column - Schedule and Requirements */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Schedule */}
                        {selectedEvent.schedule && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Itineraries
                            </h4>
                            <div className="space-y-6">
                              {selectedEvent.schedule
                                .split("\n\n")
                                .map((day, dayIndex) => {
                                  const [dayTitle, ...timeSlots] =
                                    day.split("\n");
                                  return (
                                    <div
                                      key={dayIndex}
                                      className="bg-gray-50 rounded-lg p-4"
                                    >
                                      <h5 className="font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                        {dayTitle}
                                      </h5>
                                      <div className="space-y-3">
                                        {timeSlots.map((slot, slotIndex) => {
                                          const [time, activity] =
                                            slot.split(" - ");
                                          return (
                                            <div
                                              key={slotIndex}
                                              className="flex items-start gap-4"
                                            >
                                              <div className="w-24 flex-shrink-0">
                                                <span className="text-sm font-medium text-blue-600">
                                                  {time}
                                                </span>
                                              </div>
                                              <div className="flex-1">
                                                <span className="text-sm text-gray-600">
                                                  {activity}
                                                </span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}

                        {/* Requirements */}
                        {selectedEvent.requirements && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Requirements
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm text-gray-600">
                                {selectedEvent.requirements}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Undertaking Section */}
                        {selectedEvent.undertaking && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Undertaking
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                  {selectedEvent.undertaking}
                                </p>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="agree"
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                  />
                                  <label
                                    htmlFor="agree"
                                    className="text-sm text-gray-700"
                                  >
                                    I agree to the terms and conditions
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Contact Details and Registration */}

                      <div className="space-y-6">
                        {/* Contact Information */}

                        {selectedEvent.creator && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Contact Details
                            </h4>
                            <div className="space-y-4">
                              {/* Profile Photo */}
                              <div className="flex justify-center mb-4">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
                                  <img
                                    src={selectedEvent.creator.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <FaUsers className="text-blue-500" />
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Event manager
                                  </p>
                                  <p className="font-medium">
                                    {selectedEvent.creator.name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <FaPhone className="text-blue-500" />
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Contact Number
                                  </p>
                                  <p className="font-medium">
                                    {selectedEvent.creator.phone}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <FaUsers className="text-blue-500" />
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Qualification/Experience
                                  </p>
                                  <p className="font-medium">
                                    Fetch from temporary address
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedEvent.creator && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Address
                            </h4>
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                <FaUsers className="text-blue-500" />
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Detailed Address
                                  </p>
                                  <p className="font-medium">
                                    {selectedEvent.creator.name}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <FaUsers className="text-blue-500" />
                                <div>
                                  <p className="text-sm ">Map Link</p>
                                  <p className="font-medium  text-blue-500">
                                    {selectedEvent.creator.organization}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}


                        <div></div>


                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            Available Seats
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <p className="text-2xl font-bold text-gray-900">
                                    {selectedEvent.spots.split(" ")[0]}
                                  </p>
                                  <p className="text-sm text-gray-500">Seats left</p>
                                </div>
                                <div className="text-sm font-medium">
                                  {Math.round((parseInt(selectedEvent.spots) / 50) * 100)}% Available
                                </div>
                              </div>
                              
                              <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`absolute left-0 top-0 h-full transition-all duration-300 ${
                                    selectedEvent.eligibility === "male"
                                      ? "bg-blue-500"
                                      : selectedEvent.eligibility === "female"
                                      ? "bg-pink-500"
                                      : "bg-purple-500"
                                  }`}
                                  style={{ 
                                    width: `${Math.round((parseInt(selectedEvent.spots) / 50) * 100)}%`,
                                  }}
                                />
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${
                                    selectedEvent.eligibility === "male"
                                      ? "bg-blue-500"
                                      : selectedEvent.eligibility === "female"
                                      ? "bg-pink-500"
                                      : "bg-purple-500"
                                  }`}></div>
                                  <span>Available: {selectedEvent.spots.split(" ")[0]}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                  <span>Total: 50 seats</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Registration Fee Section */}
                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            Registration Fee
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-gray-600">Amount</span>
                              <span className="text-xl font-bold text-gray-900">
                                ₹{selectedEvent.fee}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              {selectedEvent.spots}
                            </p>
                            <button
                              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
                                selectedEvent.eligibility === "male"
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : selectedEvent.eligibility === "female"
                                  ? "bg-pink-500 hover:bg-pink-600"
                                  : "bg-purple-500 hover:bg-purple-600"
                              }`}
                            >
                              Enroll Now
                              <FaArrowRight />
                            </button>
                          </div>
                        </div>

                        {/* Referral Code Section */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Past Event Details Modal */}
      {showPastEventDetails && selectedPastEvent && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePastEventDetails}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all">
                {/* Close Button */}
                <button
                  onClick={closePastEventDetails}
                  className="absolute -top-2 -right-2 z-[150] bg-white rounded-full p-2.5 shadow-xl hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>

                {/* Modal Header */}
                <div className="sticky top-0 z-[102] bg-white px-6 py-4 border-b border-gray-200 rounded-t-2xl">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Event Details
                  </h2>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={selectedPastEvent.image}
                      alt={selectedPastEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {selectedPastEvent.title}
                      </h3>
                      <p className="text-white/90">
                        {selectedPastEvent.description}
                      </p>
                    </div>
                  </div>

                  {/* Full width Event Information */}
                  <div className="space-y-6">
                    {/* Event Information - Full Width */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Event Information
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-3">
                          <FaMapMarkerAlt className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">
                              {selectedPastEvent.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaCalendarAlt className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">
                              {selectedPastEvent.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaMedal className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Achievement</p>
                            <p className="font-medium">
                              {selectedPastEvent.achievement}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaUsers className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium">
                              {selectedPastEvent.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details - Full Width */}
                    {selectedPastEvent.creator && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Contact Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-red-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Event Manager
                              </p>
                              <p className="font-medium">
                                {selectedPastEvent.creator.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaPhone className="text-red-500" />
                            <div>
                              <p className="text-sm text-gray-500">Contact</p>
                              <p className="font-medium">
                                {selectedPastEvent.creator.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-red-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Organization
                              </p>
                              <p className="font-medium">
                                {selectedPastEvent.creator.organization}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Two Column Layout for Schedule and Impact Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column - Schedule and Requirements */}
                      <div className="space-y-6">
                        {selectedPastEvent.schedule && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Schedule
                            </h4>
                            <div className="space-y-6">
                              {selectedPastEvent.schedule
                                .split("\n\n")
                                .map((day, dayIndex) => {
                                  const [dayTitle, ...timeSlots] =
                                    day.split("\n");
                                  return (
                                    <div
                                      key={dayIndex}
                                      className="bg-gray-50 rounded-lg p-4"
                                    >
                                      <h5 className="font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                        {dayTitle}
                                      </h5>
                                      <div className="space-y-3">
                                        {timeSlots.map((slot, slotIndex) => {
                                          const [time, activity] =
                                            slot.split(" - ");
                                          return (
                                            <div
                                              key={slotIndex}
                                              className="flex items-start gap-4"
                                            >
                                              <div className="w-24 flex-shrink-0">
                                                <span className="text-sm font-medium text-red-600">
                                                  {time}
                                                </span>
                                              </div>
                                              <div className="flex-1">
                                                <span className="text-sm text-gray-600">
                                                  {activity}
                                                </span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}

                        {selectedPastEvent.requirements && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Requirements
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm text-gray-600">
                                {selectedPastEvent.requirements}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Impact Details */}
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            Impact Details
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                  Total Impact
                                </span>
                                <span className="text-lg font-bold text-red-600">
                                  {selectedPastEvent.impact}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                  Participants
                                </span>
                                <span className="text-lg font-bold text-red-600">
                                  {selectedPastEvent.participants}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                  Achievement
                                </span>
                                <span className="text-lg font-bold text-red-600">
                                  {selectedPastEvent.achievement}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
