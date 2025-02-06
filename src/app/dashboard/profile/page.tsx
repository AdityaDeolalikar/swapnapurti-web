"use client";
import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaEdit } from 'react-icons/fa';

export default function Profile() {
  // This would typically come from an API or auth context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Camping Street, Adventure City, AC 12345",
    avatar: "/images/cardImage.jpg",
    joinDate: "May 2024",
    interests: ["Camping", "Hiking", "Mountain Climbing"],
    upcomingEvents: 2,
    completedEvents: 5,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-800">{user.name}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-gray-800">{user.email}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <FaPhone className="text-gray-400" />
                  <span className="text-gray-800">{user.phone}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="text-gray-800">{user.address}</span>
                </div>
              </div>
            </div>
            <button className="mt-6 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700">
              <FaEdit />
              Edit Information
            </button>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-blue-500 hover:text-blue-500">
                + Add Interest
              </button>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Upcoming Events</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">{user.upcomingEvents}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Completed Events</h3>
                <p className="text-2xl font-bold text-green-600 mt-1">{user.completedEvents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Sidebar */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <FaCamera />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">Member since {user.joinDate}</p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Notification Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 