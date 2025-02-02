"use client";
import React from 'react';

const PromotingManagerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Promoting Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Reach</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-purple-600">0%</p>
        </div>
      </div>

      {/* Marketing Campaigns */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Active Marketing Campaigns</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Campaign Name</th>
                  <th className="text-left py-2">Start Date</th>
                  <th className="text-left py-2">End Date</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2" colSpan={4}>No active campaigns</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <p className="text-gray-600">No performance data available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotingManagerDashboard;
