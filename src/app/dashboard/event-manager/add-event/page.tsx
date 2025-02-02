"use client";
import React from 'react';

const AddEventPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Event</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  placeholder="Enter event name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                <select className="mt-1 block w-full border rounded-md shadow-sm p-2">
                  <option value="">Select event type</option>
                  <option value="camping">Camping</option>
                  <option value="hiking">Hiking</option>
                  <option value="adventure">Adventure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                placeholder="Enter event description"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Date and Time</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Location</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Venue</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                placeholder="Enter venue name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                placeholder="Enter full address"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price per Person</label>
                <input
                  type="number"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Maximum Participants</label>
                <input
                  type="number"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  placeholder="Enter max participants"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventPage; 