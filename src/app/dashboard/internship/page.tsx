"use client";
import React, { useState, useEffect } from 'react';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUserTie, FaCheckCircle, FaFileUpload, FaGraduationCap } from 'react-icons/fa';

export default function InternshipApplication() {
  const [applicationType, setApplicationType] = useState('internship');
  const [duration, setDuration] = useState('1');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);

  // Update duration when application type changes
  useEffect(() => {
    if (applicationType === 'apprenticeship') {
      setDuration('11');
    } else {
      setDuration('1');
    }
  }, [applicationType]);

  // This would typically come from an API
  const availableSites = [
    { id: 1, name: "Pine Forest Camp", location: "Mountain Region" },
    { id: 2, name: "Riverside Adventure Site", location: "River Valley" },
    { id: 3, name: "Lakeside Camping Ground", location: "Lake District" },
    { id: 4, name: "Desert Safari Camp", location: "Desert Region" }
  ];

  const availableRoles = {
    internship: [
      { id: 1, title: "Camp Coordinator", description: "Assist in organizing and coordinating camp activities" },
      { id: 2, title: "Adventure Guide", description: "Lead and assist in outdoor adventure activities" },
      { id: 3, title: "Safety Officer", description: "Ensure safety protocols and equipment maintenance" },
      { id: 4, title: "Event Planner", description: "Help plan and execute camping events" }
    ],
    apprenticeship: [
      { id: 1, title: "Senior Camp Manager", description: "Learn to manage overall camp operations and staff" },
      { id: 2, title: "Adventure Program Developer", description: "Design and develop new adventure programs" },
      { id: 3, title: "Safety & Training Specialist", description: "Develop and implement safety protocols and training programs" },
      { id: 4, title: "Operations Coordinator", description: "Coordinate logistics, supplies, and facility management" }
    ]
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is PDF and size is less than 5MB
      if (file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        alert('Please upload a PDF file less than 5MB');
      }
    }
  };

  const calculateEndDate = (start: string, months: string) => {
    const startDate = new Date(start);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + parseInt(months));
    return endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (selectedDate < currentDate) {
      setStartDate(currentDate);
    } else {
      setStartDate(selectedDate);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Application Portal</h1>
        <p className="text-blue-100">Join our team and gain valuable experience in outdoor adventure management</p>
      </div>

      {/* Application Type Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaGraduationCap className="text-blue-600" />
          Select Application Type
        </h2>
        <div className="relative">
          <select 
            className="w-full p-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none pr-10"
            value={applicationType}
            onChange={(e) => setApplicationType(e.target.value)}
          >
            <option value="internship">Internship Application</option>
            <option value="apprenticeship">Apprenticeship Application</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <FaGraduationCap />
          </div>
        </div>
      </div>

      <form className="space-y-6">
        {/* Duration Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaClock className="text-blue-600" />
            {applicationType === 'internship' ? 'Select Duration' : 'Program Duration'}
          </h2>
          {applicationType === 'internship' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['1', '3', '6'].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setDuration(months)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    duration === months
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="text-lg font-semibold">{months} Month{months !== '1' && 's'}</div>
                  <div className="text-sm text-gray-500">
                    {months === '1' ? 'Short Term' : months === '3' ? 'Quarter Term' : 'Long Term'}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50">
              <div className="text-lg font-semibold text-blue-600">11 Months</div>
              <div className="text-sm text-gray-500">Standard Apprenticeship Duration</div>
            </div>
          )}
        </div>

        {/* Site Selection - Converted to Dropdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-600" />
            Select Location
          </h2>
          <div className="relative">
            <select 
              className="w-full p-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none pr-10"
              defaultValue=""
            >
              <option value="" disabled>Choose a location</option>
              {availableSites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name} - {site.location}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
              <FaMapMarkerAlt />
            </div>
          </div>
        </div>

        {/* Start Date */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaCalendar className="text-blue-600" />
            Program Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                min={today}
                value={startDate}
                onChange={handleStartDateChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <div className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700">
                {calculateEndDate(startDate, duration)}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              {applicationType === 'internship' 
                ? `This is a ${duration}-month internship program starting from ${new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                : `This is an 11-month apprenticeship program starting from ${new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
              }
            </p>
          </div>
        </div>

        {/* Role Selection - Converted to Dropdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaUserTie className="text-blue-600" />
            Select {applicationType === 'internship' ? 'Internship' : 'Apprenticeship'} Role
          </h2>
          <div className="relative">
            <select 
              className="w-full p-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none pr-10"
              defaultValue=""
            >
              <option value="" disabled>Choose a role</option>
              {availableRoles[applicationType as keyof typeof availableRoles].map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
              <FaUserTie />
            </div>
          </div>
          {/* Role descriptions shown below dropdown */}
          <div className="mt-4 space-y-2">
            {availableRoles[applicationType as keyof typeof availableRoles].map((role) => (
              <div key={role.id} className="text-sm text-gray-600">
                <span className="font-medium">{role.title}:</span> {role.description}
              </div>
            ))}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaFileUpload className="text-blue-600" />
            Upload Resume
          </h2>
          <div className="space-y-4">
            <div className="flex justify-center items-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-600 transition-colors">
                <FaFileUpload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-base text-gray-600">
                  {selectedFile ? selectedFile.name : 'Drop your resume here or click to upload'}
                </span>
                <span className="mt-1 text-sm text-gray-500">PDF up to 5MB</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {selectedFile && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-600">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaCheckCircle />
          Submit {applicationType === 'internship' ? 'Internship' : 'Apprenticeship'} Application
        </button>
      </form>
    </div>
  )
}
