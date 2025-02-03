"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiFilter, FiEye } from 'react-icons/fi';
import { HiOutlineCurrencyRupee, HiOutlineTicket, HiOutlineClock } from 'react-icons/hi';

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

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
    {
      id: '#12346',
      event: 'Adventure Trek',
      customer: 'Jane Smith',
      date: '2024-07-20',
      amount: '₹7,500',
      status: 'pending',
    },
    {
      id: '#12347',
      event: 'Night Camping',
      customer: 'Mike Johnson',
      date: '2024-08-05',
      amount: '₹3,000',
      status: 'cancelled',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
        };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
        };
      default:
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen md:ml-10">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800"
      >
        Bookings & Payments
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Total Bookings', value: '156', icon: <HiOutlineTicket className="w-6 h-6" />, color: 'blue' },
          { title: 'Total Revenue', value: '₹45,000', icon: <HiOutlineCurrencyRupee className="w-6 h-6" />, color: 'green' },
          { title: 'Pending Payments', value: '12', icon: <HiOutlineClock className="w-6 h-6" />, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 bg-white rounded-xl shadow-sm p-4 border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings..."
              className="pl-10 p-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:w-auto w-full">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm appearance-none w-full sm:w-40"
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm w-full sm:w-40"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bookings Table (Desktop) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking, index) => {
              const statusStyle = getStatusColor(booking.status);
              return (
                <motion.tr 
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{booking.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                      <FiEye className="w-4 h-4" /> View
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Bookings Cards (Mobile) */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking, index) => {
          const statusStyle = getStatusColor(booking.status);
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500">Booking ID</p>
                  <p className="text-sm font-bold text-gray-900">{booking.id}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Event</p>
                  <p className="text-sm font-medium text-gray-900">{booking.event}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="text-sm font-medium text-gray-900">{booking.customer}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-bold text-gray-900">{booking.amount}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
                <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-900 flex items-center gap-1 transition-colors duration-200">
                  <FiEye className="w-4 h-4" /> View Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsPage; 