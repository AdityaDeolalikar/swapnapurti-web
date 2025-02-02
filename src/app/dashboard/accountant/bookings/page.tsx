"use client";
import React from 'react';

const BookingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bookings & Payments</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Pending Payments</h3>
          <p className="text-3xl font-bold text-orange-600">0</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search bookings..."
          className="p-2 border rounded-lg flex-grow"
        />
        <select className="p-2 border rounded-lg">
          <option value="">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">#12345</td>
              <td className="px-6 py-4 whitespace-nowrap">Summer Camp 2024</td>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">2024-06-15</td>
              <td className="px-6 py-4 whitespace-nowrap">₹5,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Confirmed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                <button className="text-red-600 hover:text-red-900">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Previous
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            1
          </button>
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default BookingsPage; 