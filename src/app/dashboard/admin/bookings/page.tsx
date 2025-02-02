"use client";
import React from 'react';

const BookingsPage = () => {
  // Mock data - replace with actual data fetching
  const bookings = [
    {
      id: '#12345',
      event: 'Summer Camp 2024',
      customer: 'John Doe',
      date: '2024-06-15',
      amount: '₹5,000',
      status: 'confirmed',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Bookings & Payments</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">₹0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Pending Payments</h3>
          <p className="text-2xl sm:text-3xl font-bold text-orange-600">0</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search bookings..."
          className="p-2 border rounded-lg flex-grow text-sm"
        />
        <div className="flex flex-col sm:flex-row gap-4 sm:w-auto w-full">
          <select className="p-2 border rounded-lg text-sm w-full sm:w-40">
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            className="p-2 border rounded-lg text-sm w-full sm:w-40"
          />
        </div>
      </div>

      {/* Bookings Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{booking.event}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{booking.customer}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{booking.date}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{booking.amount}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bookings Cards (Mobile) */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Booking ID</p>
                <p className="text-sm font-bold">{booking.id}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Event</p>
                <p className="text-sm">{booking.event}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Customer</p>
                <p className="text-sm">{booking.customer}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Date</p>
                  <p className="text-sm">{booking.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Amount</p>
                  <p className="text-sm font-bold">{booking.amount}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
              <button className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-900">
                View
              </button>
              <button className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-900">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

  
     
    </div>
  );
};

export default BookingsPage; 