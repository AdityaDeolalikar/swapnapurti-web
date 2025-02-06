"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaRupeeSign, FaTimes, FaPhone } from 'react-icons/fa';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  eligibility: 'male' | 'female';
  fee: number;
  totalSpots: number;
  bookedSpots: number;
  imageUrl: string;
  schedule?: string;
  requirements?: string;
  creator?: {
    name: string;
    email: string;
    phone: string;
    organization: string;
    district: string;
  };
}

// Mock data - replace with actual API call later
const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Adventure Camp 2024",
    description: "Experience thrilling outdoor activities and team-building exercises in the heart of nature.",
    location: "Lonavala, Maharashtra",
    date: "15-20 April, 2024",
    eligibility: "male",
    fee: 5000,
    totalSpots: 50,
    bookedSpots: 32,
    imageUrl: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D",
    schedule: "Day 1: Arrival and Registration, Welcome Ceremony, Camp Setup, Evening Bonfire\nDay 2: Morning Yoga, Adventure Activities, Team Building Games, Night Camping\nDay 3: Nature Trail, Rock Climbing, Rappelling, Cultural Evening\nDay 4: Water Sports, Survival Skills Workshop, Adventure Challenges\nDay 5: Certificate Distribution, Farewell Ceremony, Departure",
    requirements: "Basic fitness level, Comfortable clothing, Water bottle, Backpack",
    creator: {
      name: "Adventure Team",
      email: "team@adventure.com",
      phone: "+91 98765 43210",
      organization: "Adventure Sports Club",
      district: "Pune"
    }
  },
  {
    id: 2,
    title: "Nature Explorer Camp",
    description: "Discover the beauty of wildlife and learn survival skills in a safe, guided environment.",
    location: "Panchgani, Maharashtra",
    date: "1-5 May, 2024",
    eligibility: "female",
    fee: 4500,
    totalSpots: 40,
    bookedSpots: 15,
    imageUrl: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    title: "Mountain Trek Camp",
    description: "Challenge yourself with mountain climbing and hiking adventures.",
    location: "Malshej Ghat, Maharashtra",
    date: "10-15 May, 2024",
    eligibility: "male",
    fee: 6000,
    totalSpots: 30,
    bookedSpots: 28,
    imageUrl: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

// Mock data for ongoing events
const ongoingEvents: Event[] = [
  {
    id: 4,
    title: "Summer Wilderness Camp",
    description: "An immersive wilderness experience with expert guides and exciting activities.",
    location: "Bhandardara, Maharashtra",
    date: "10-25 March, 2024",
    eligibility: "male",
    fee: 7500,
    totalSpots: 45,
    bookedSpots: 45,
    imageUrl: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D",
    schedule: "Day 1-5: Basic Survival Skills\nDay 6-10: Advanced Navigation\nDay 11-15: Wildlife Study\nDay 16: Final Challenge",
    requirements: "Good physical fitness, Previous camping experience, Medical certificate",
    creator: {
      name: "Wilderness Explorers",
      email: "info@wildexplorers.com",
      phone: "+91 98765 12345",
      organization: "Wilderness Explorers Association",
      district: "Nashik"
    }
  },
  {
    id: 5,
    title: "Girls Leadership Camp",
    description: "Empowering young women through outdoor activities and leadership workshops.",
    location: "Mahabaleshwar, Maharashtra",
    date: "5-20 March, 2024",
    eligibility: "female",
    fee: 6500,
    totalSpots: 35,
    bookedSpots: 32,
    imageUrl: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const UpcomingEventsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'male' | 'female'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const filteredUpcomingEvents = selectedFilter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.eligibility === selectedFilter);

  const filteredOngoingEvents = selectedFilter === 'all'
    ? ongoingEvents
    : ongoingEvents.filter(event => event.eligibility === selectedFilter);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage and monitor upcoming and ongoing camping events</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setSelectedFilter('male')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedFilter === 'male'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Male Events
        </button>
        <button
          onClick={() => setSelectedFilter('female')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedFilter === 'female'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Female Events
        </button>
      </div>

      {/* Ongoing Events Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Ongoing Events</h2>
            <p className="mt-1 text-gray-600">Currently active camping events</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Live Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOngoingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 cursor-pointer ${
                event.eligibility === 'male' ? 'border-blue-500' : 'border-pink-500'
              }`}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    Live
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{event.description}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-4">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaUsers className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Eligibility</p>
                      <p className="text-sm font-medium capitalize">{event.eligibility} only</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaRupeeSign className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Fee</p>
                      <p className="text-sm font-medium">₹{event.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Seats Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-700">
                      Participants
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {event.bookedSpots} / {event.totalSpots}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        event.eligibility === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}
                      style={{
                        width: `${(event.bookedSpots / event.totalSpots) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpcomingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 cursor-pointer ${
                event.eligibility === 'male' ? 'border-blue-500' : 'border-pink-500'
              }`}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{event.description}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-4">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaUsers className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Eligibility</p>
                      <p className="text-sm font-medium capitalize">{event.eligibility} only</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaRupeeSign className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Fee</p>
                      <p className="text-sm font-medium">₹{event.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Seats Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-700">
                      Available Seats
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {event.totalSpots - event.bookedSpots} / {event.totalSpots}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        event.eligibility === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}
                      style={{
                        width: `${(event.bookedSpots / event.totalSpots) * 100}%`
                      }}
                    />
                  </div>
                  {event.totalSpots - event.bookedSpots <= 5 && (
                    <p className="text-xs text-red-500 mt-1">
                      Only {event.totalSpots - event.bookedSpots} seats left!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Popup */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
              <button
                onClick={closeEventDetails}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Popup Content */}
            <div className="p-6">
              {/* Event Image */}
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                  <p className="text-white/90">{selectedEvent.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Event Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white rounded-xl shadow p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Event Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{selectedEvent.location}</p>
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
                          <p className="font-medium capitalize">{selectedEvent.eligibility} only</p>
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

                  {/* Schedule/Itineraries */}
                  {selectedEvent.schedule && (
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Itineraries</h4>
                      <div className="space-y-4">
                        {selectedEvent.schedule.split('\n').map((day, index) => {
                          const [title, ...activities] = day.split(':');
                          return (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">{title}</h5>
                              <p className="text-sm text-gray-600">{activities.join(':')}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Requirements */}
                  {selectedEvent.requirements && (
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Requirements</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">{selectedEvent.requirements}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Organizer & Seats */}
                <div className="space-y-6">
                  {/* Seats Information */}
                  <div className="bg-white rounded-xl shadow p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Available Seats</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-gray-700">
                          {selectedEvent.totalSpots - selectedEvent.bookedSpots} / {selectedEvent.totalSpots}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            selectedEvent.eligibility === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                          }`}
                          style={{
                            width: `${(selectedEvent.bookedSpots / selectedEvent.totalSpots) * 100}%`
                          }}
                        />
                      </div>
                      {selectedEvent.totalSpots - selectedEvent.bookedSpots <= 5 && (
                        <p className="text-sm text-red-500 mt-2">
                          Only {selectedEvent.totalSpots - selectedEvent.bookedSpots} seats left!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Organizer Information */}
                  {selectedEvent.creator && (
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <FaUsers className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Organizer</p>
                            <p className="font-medium">{selectedEvent.creator.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaPhone className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Contact Number</p>
                            <p className="font-medium">{selectedEvent.creator.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">District</p>
                            <p className="font-medium">{selectedEvent.creator.district}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaUsers className="text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Organization</p>
                            <p className="font-medium">{selectedEvent.creator.organization}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsPage;
