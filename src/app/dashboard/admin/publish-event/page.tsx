"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaRupeeSign, FaCheckCircle, FaTimes, FaEdit } from 'react-icons/fa';
import EventDetailsCard from '@/app/components/dashboard/EventDetailsCard';

interface Creator {
  name: string;
  phone: string;
  organization: string;
  district: string;
  occupation: string;
  email?: string;
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
  creator: Creator;
  undertaking?: string;
  paymentDetails?: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  createdAt?: string;
}

const PublishEventPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const [unpublishedEvents, setUnpublishedEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Weekend Camping Trip",
      description: "Join us for an exciting weekend camping trip in the mountains...",
      date: "2024-05-15",
      location: "Mountain Base Camp",
      district: "Adventure District",
      status: "pending",
      eligibility: "all",
      fee: 1500,
      spots: "50",
      image: "/images/cardImage.jpg",
      schedule: "Day 1\n9:00 AM - Arrival and Setup\n10:00 AM - Orientation\n\nDay 2\n8:00 AM - Breakfast\n9:00 AM - Hiking",
      requirements: "Basic camping gear, comfortable clothing, water bottle",
      creator: {
        name: "John Doe",
        phone: "+1234567890",
        organization: "Adventure Club",
        district: "Adventure District",
        occupation: "Event Organizer",
        email: "john@example.com"
      }
    }
  ]);

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
        <>
          <EventDetailsCard
            event={{
              id: selectedEvent.id,
              title: selectedEvent.title,
              description: selectedEvent.description,
              date: selectedEvent.date,
              location: selectedEvent.location,
              district: selectedEvent.district,
              status: selectedEvent.status,
              eligibility: selectedEvent.eligibility,
              fee: selectedEvent.fee,
              spots: selectedEvent.spots,
              image: selectedEvent.image,
              schedule: selectedEvent.schedule,
              requirements: selectedEvent.requirements,
              creator: {
                name: selectedEvent.creator.name,
                phone: selectedEvent.creator.phone,
                organization: selectedEvent.creator.organization,
                district: selectedEvent.creator.district,
                occupation: selectedEvent.creator.occupation,
                profileImage: selectedEvent.creator.profileImage || '/images/cardImage.jpg'
              },
              undertaking: selectedEvent.undertaking,
              paymentDetails: selectedEvent.paymentDetails
            }}
            onClose={closeEventDetails}
          />

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-4 justify-end">
            <button
              onClick={(e) => {
                handleEditEvent(selectedEvent, e);
                closeEventDetails();
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
            >
              <FaEdit />
              <span>Edit Event</span>
            </button>
            <button
              onClick={() => {
                /* Handle publish */
                closeEventDetails();
              }}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
            >
              <FaCheckCircle />
              <span>Publish Event</span>
            </button>
            <button
              onClick={() => {
                /* Handle reject */
                closeEventDetails();
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
            >
              <FaTimes />
              <span>Reject Event</span>
            </button>
          </div>
        </>
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
