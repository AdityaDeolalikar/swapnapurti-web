"use client";
import React from 'react';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaDownload } from 'react-icons/fa';

export default function MyBookings() {
  // This would typically come from an API
  const bookings = [
    {
      id: 1,
      eventName: "Summer Adventure Camp",
      bookingDate: "May 15, 2024",
      eventDate: "June 20, 2024",
      location: "Green Valley Campsite",
      amount: "$199",
      status: "Confirmed",
      paymentStatus: "Paid",
      time: "10:00 AM",
    },
    {
      id: 2,
      eventName: "Mountain Trek Experience",
      bookingDate: "May 18, 2024",
      eventDate: "July 10, 2024",
      location: "Blue Mountain Trail",
      amount: "$149",
      status: "Pending",
      paymentStatus: "Pending",
      time: "08:00 AM",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
        <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
          <option value="all">All Bookings</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{booking.eventName}</h3>
                  <p className="text-sm text-gray-500">Booked on {booking.bookingDate}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendar className="text-blue-500" />
                      <span>{booking.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-blue-500" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMoneyBillWave className="text-blue-500" />
                      <span>{booking.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                    ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'}`}>
                    {booking.status}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ml-2
                    ${booking.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-700' : 
                    'bg-orange-100 text-orange-700'}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {booking.status === 'Confirmed' && (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <FaDownload />
                      Download Ticket
                    </button>
                  )}
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-lg">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 