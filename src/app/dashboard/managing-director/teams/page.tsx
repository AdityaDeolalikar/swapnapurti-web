"use client";
import React from 'react';

const TeamsPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Teams</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Add New Team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">Event Management Team</h3>
              <p className="text-gray-600">5 Members</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="text-red-600 hover:text-red-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Team Lead</h4>
              <p className="text-gray-800">John Doe</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Members</h4>
              <div className="flex -space-x-2 overflow-hidden mt-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://via.placeholder.com/150" alt="Team member" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://via.placeholder.com/150" alt="Team member" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://via.placeholder.com/150" alt="Team member" />
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white">
                  <span className="text-xs font-medium">+2</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Recent Events</h4>
              <ul className="mt-2 space-y-2">
                <li className="text-gray-800">Summer Camp 2024</li>
                <li className="text-gray-800">Adventure Trek 2024</li>
              </ul>
            </div>

            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Promotion Team Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">Promotion Team</h3>
              <p className="text-gray-600">3 Members</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="text-red-600 hover:text-red-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Team Lead</h4>
              <p className="text-gray-800">Jane Smith</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Members</h4>
              <div className="flex -space-x-2 overflow-hidden mt-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://via.placeholder.com/150" alt="Team member" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://via.placeholder.com/150" alt="Team member" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://via.placeholder.com/150" alt="Team member" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Current Campaigns</h4>
              <ul className="mt-2 space-y-2">
                <li className="text-gray-800">Summer Campaign</li>
                <li className="text-gray-800">Social Media Marketing</li>
              </ul>
            </div>

            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage; 