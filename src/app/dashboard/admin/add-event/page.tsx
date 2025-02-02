"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaCalendar, FaUsers, FaMoneyBillWave, FaClipboardList, FaInfoCircle, FaClock } from "react-icons/fa";

const AddEventPage = () => {
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const handleGenderChange = (gender: string) => {
    if (selectedGender.includes(gender)) {
      setSelectedGender(selectedGender.filter(g => g !== gender));
    } else {
      setSelectedGender([...selectedGender, gender]);
    }
  };

  return (
    <div className="p-1 max-w-7xl mx-auto md:ml-10">
      <div className="flex items-center justify-between mb-8 ">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Event</h1>
          <p className="mt-2 text-gray-600">Create a new camping event for participants</p>
        </div>
        <button
          type="submit"
          form="event-form"
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-200 flex items-center space-x-2 font-medium"
        >
          <span>Create Event</span>
        </button>
      </div>

      <form id="event-form" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaClipboardList className="text-blue-600" />
              <h2>Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter a descriptive name for your event"
                />
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaCalendar className="text-gray-400" />
                      <span>Start Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    min={today}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaClock className="text-gray-400" />
                      <span>End Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    min={today}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Provide a detailed description of the event"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>Location</span>
                    </div>
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaPhone className="text-gray-400" />
                      <span>Contact Number</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter contact number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Itineraries Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaCalendar className="text-blue-600" />
              <h2>Event Schedule</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day-wise Schedule
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Detail the activities planned for each day"
              />
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaInfoCircle className="text-blue-600" />
              <h2>Important Instructions</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructions for Participants
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="List all important instructions and guidelines"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Eligibility & Pricing */}
        <div className="space-y-6">
          {/* Eligibility Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaUsers className="text-blue-600" />
              <h2>Eligibility</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gender Eligibility
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleGenderChange('male')}
                    className={`flex-1 py-2.5 px-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedGender.includes('male')
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange('female')}
                    className={`flex-1 py-2.5 px-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedGender.includes('female')
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-300 hover:border-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select District
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                  <option value="">Choose a district</option>
                  <option value="Pune">Pune</option>
                  <option value="Varanasi">Varanasi</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Organization
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                  <option value="">Choose an organization</option>
                  <option value="Tata Consultancy Services">Tata Consultancy Services</option>
                  <option value="Persistent Systems">Persistent Systems</option>
                  <option value="Bajaj Auto">Bajaj Auto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaMoneyBillWave className="text-blue-600" />
              <h2>Pricing</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fee per Person (₹)
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="0.00"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  INR
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEventPage;
