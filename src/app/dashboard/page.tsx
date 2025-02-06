import React from 'react';
import { FaUser, FaCalendar, FaTicketAlt, FaShoppingBag } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, User!</h1>
        <p className="text-gray-600 mt-2">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Upcoming Events Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Upcoming Events</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">5</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaCalendar className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Booked Events Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Booked Events</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">3</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaTicketAlt className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Shop Orders Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Shop Orders</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">2</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaShoppingBag className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Profile Completion</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">85%</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaUser className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Activity Items */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaCalendar className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Booked Camping Event</p>
                <p className="text-gray-500 text-sm">Adventure Camp - June 15</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <FaShoppingBag className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Purchased Camping Gear</p>
                <p className="text-gray-500 text-sm">Camping Tent XL</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
