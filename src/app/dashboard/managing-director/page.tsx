"use client";
import React from 'react';

const ManagingDirectorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Managing Director Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">$0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Active Events</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <p className="text-gray-600">No metrics available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagingDirectorDashboard;
