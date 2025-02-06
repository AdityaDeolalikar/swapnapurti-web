"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaRupeeSign, FaCheckCircle, FaTimes, FaUserCircle, FaClock, FaPhone, FaEnvelope, FaEdit } from 'react-icons/fa';

interface Creator {
  name: string;
  email: string;
  phone: string;
  organization: string;
  district: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  eligibility: 'male' | 'female';
  fee: number;
  spots: string;
  status: 'pending' | 'approved' | 'rejected';
  creator: Creator;
  schedule: string;
  requirements: string;
  createdAt: string;
}

// Mock data - replace with actual data fetching
const unpublishedEvents: Event[] = [
  {
    id: 1,
    title: "Weekend Mountain Trek",
    description: "An exciting trek through scenic mountain trails perfect for beginners and intermediate hikers.",
    location: "Sahyadri Mountains",
    date: "2024-04-15",
    eligibility: "male",
    fee: 2500,
    spots: "20 spots available",
    status: "pending",
    creator: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      organization: "Adventure Sports Club",
      district: "Pune"
    },
    schedule: "Day 1: Arrival and briefing\nDay 2: Trek to base camp\nDay 3: Summit climb\nDay 4: Return journey",
    requirements: "Basic fitness level, Comfortable walking shoes, Water bottle",
    createdAt: "2024-03-10"
  },
  // Add more mock events as needed
];

const PublishEventPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event card click handler
    // Navigate to add event page with event data in query params
    router.push(`/dashboard/admin/add-event?edit=true&eventId=${event.id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Publish Events</h1>
        <p className="mt-2 text-gray-600">Review and publish upcoming events</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="sm:w-48">
          <select
            className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {unpublishedEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => handleEventClick(event)}
          >
            {/* Status Badge */}
            <div className="px-6 py-2 bg-yellow-50 border-b border-yellow-100">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending Review
              </span>
            </div>

            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
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
                  <FaMapMarkerAlt className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start space-x-2">
                  <FaCalendarAlt className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {event.date}
                    </p>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="flex items-start space-x-2">
                  <FaUsers className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Eligibility</p>
                    <p className="text-sm font-medium capitalize text-blue-600">
                      {event.eligibility} only
                    </p>
                  </div>
                </div>

                {/* Fee */}
                <div className="flex items-start space-x-2">
                  <FaRupeeSign className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Fee</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{event.fee}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleEditEvent(event, e)}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {/* Handle publish */}}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  <span>Publish</span>
                </button>
                <button
                  onClick={() => {/* Handle reject */}}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaTimes />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
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
            <div className="p-6 space-y-8">
              {/* Event Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h3>
                <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Event Details</h4>
                    <div className="grid grid-cols-1 gap-3">
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
                          <p className="text-sm text-gray-500">Event Date</p>
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

                  {/* Creator Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Creator Information</h4>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <FaUserCircle className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{selectedEvent.creator.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaUserCircle className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <p className="font-medium">Event Manager</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedEvent.creator.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaPhone className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{selectedEvent.creator.phone}</p>
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
                </div>

                {/* Schedule and Requirements */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Itinaries</h4>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                        {selectedEvent.schedule}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600">{selectedEvent.requirements}</p>
                    </div>
                  </div>
                </div>

                {/* Creation Date */}
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2" />
                  <span>Created on {selectedEvent.createdAt}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    handleEditEvent(selectedEvent, e);
                    closeEventDetails();
                  }}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  <span>Edit Event</span>
                </button>
                <button
                  onClick={() => {
                    /* Handle publish */
                    closeEventDetails();
                  }}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  <span>Publish Event</span>
                </button>
                <button
                  onClick={() => {
                    /* Handle reject */
                    closeEventDetails();
                  }}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaTimes />
                  <span>Reject Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {unpublishedEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FaFilter className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">There are no events pending review at this time.</p>
        </div>
      )}
    </div>
  );
};

export default PublishEventPage;
