'use client'
import React, { useState } from 'react';
import { FaUser, FaCalendar, FaShoppingBag, FaMedal, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function Dashboard() {
  const [showMedalsModal, setShowMedalsModal] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    // Add other user fields as needed
  });

  const medals = {
    platinum: 1,
    gold: 2,
    silver: 3,
    bronze: 4,
  };

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl p-8 shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Upcoming Events Card */}
        <Link href="/dashboard/my-events" className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">My Events</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">5</h3>
              </div>
              <div className="bg-blue-100 p-4 rounded-full shadow-inner">
                <FaCalendar className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>
        </Link>

        {/* Medals Card */}
        <div onClick={() => setShowMedalsModal(true)} className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Milestones</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{Object.values(medals).reduce((a, b) => a + b, 0)}</h3>
              </div>
              <div className="bg-green-100 p-4 rounded-full shadow-inner">
                <FaMedal className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Shop Orders Card */}
        <Link href="/dashboard/shop" className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Shop Orders</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">2</h3>
              </div>
              <div className="bg-purple-100 p-4 rounded-full shadow-inner">
                <FaShoppingBag className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
        </Link>

        {/* Profile Completion Card */}
        <Link href="/dashboard/profile" className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Profile Completion</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">85%</h3>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full shadow-inner">
                <FaUser className="text-yellow-600 text-2xl" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Medals Modal */}
      {showMedalsModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-10 transition-all duration-300">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
            <button
              onClick={() => setShowMedalsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Medals</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-[#E5E4E2]" />
                  <span className="font-semibold text-gray-800">Platinum</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.platinum}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-yellow-500" />
                  <span className="font-semibold text-gray-800">Gold</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.gold}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-gray-400" />
                  <span className="font-semibold text-gray-800">Silver</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.silver}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-amber-700" />
                  <span className="font-semibold text-gray-800">Bronze</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.bronze}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {/* Activity Items */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full shadow-inner">
                <FaCalendar className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">Booked Camping Event</p>
                <p className="text-gray-500 text-sm">Adventure Camp - June 15</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full shadow-inner">
                <FaShoppingBag className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">Purchased Camping Gear</p>
                <p className="text-gray-500 text-sm">Camping Tent XL</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
