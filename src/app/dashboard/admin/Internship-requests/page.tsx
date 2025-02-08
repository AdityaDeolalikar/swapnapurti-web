'use client';

import React, { useState, useRef } from 'react';
import { FaSearch, FaFileAlt, FaTimes, FaUser, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUpload, FaPaperPlane } from 'react-icons/fa';

// Define interfaces
interface RequestUser {
  id: number;
  name: string;
  type: 'internship' | 'apprenticeship';
  role: string;
  duration: string;
  location: string;
  startDate: string;
  endDate: string;
  resumeUrl: string;
  status?: 'pending' | 'accepted' | 'rejected';
  joiningLetterStatus?: 'pending' | 'uploaded';
  thankingLetterStatus?: 'pending' | 'uploaded';
  recommendationLetterStatus?: 'pending' | 'uploaded';
  hasAppliedJoining?: boolean;
  hasAppliedThanking?: boolean;
  hasAppliedRecommendation?: boolean;
}

// Mock data - replace with actual API data
const mockRequests: RequestUser[] = [
  {
    id: 1,
    name: 'John Doe',
    type: 'internship',
    role: 'Frontend Developer',
    duration: '3 months',
    location: 'Mumbai',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    resumeUrl: '#',
    hasAppliedJoining: true,
    hasAppliedThanking: false,
    hasAppliedRecommendation: false
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'apprenticeship',
    role: 'UI/UX Designer',
    duration: '11 months',
    location: 'Pune',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    resumeUrl: '#',
  },
  {
    id: 3,
    name: "Alice Johnson",
    type: 'internship',
    role: "Backend Developer",
    duration: "3 months",
    location: "Bangalore",
    startDate: "2024-08-01",
    endDate: "2024-11-30",
    resumeUrl: "#"
  },
  {
    id: 4,
    name: "Robert Brown",
    type: 'apprenticeship',
    role: "Data Analyst",
    duration: "11 months",
    location: "Hyderabad",
    startDate: "2024-09-01",
    endDate: "2025-02-28",
    resumeUrl: "#"
  },
  {
    id: 5,
    name: "Emily White",
    type: 'internship',
    role: "Machine Learning Engineer",
    duration: "3 months",
    location: "Delhi",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    resumeUrl: "#"
  },
  {
    id: 6,
    name: "Michael Davis",
    type: 'apprenticeship',
    role: "Cybersecurity Analyst",
    duration: "11 months",
    location: "Chennai",
    startDate: "2024-07-15",
    endDate: "2024-12-15",
    resumeUrl: "#"
  },
  {
    id: 7,
    name: "Sophia Martinez",
    type: 'internship',
    role: "Software Engineer",
    duration: "3 months",
    location: "Kolkata",
    startDate: "2024-11-01",
    endDate: "2025-01-31",
    resumeUrl: "#"
  },
  {
    id: 8,
    name: "William Taylor",
    type: 'apprenticeship',
    role: "Cloud Engineer",
    duration: "11 months",
    location: "Ahmedabad",
    startDate: "2024-06-15",
    endDate: "2024-12-15",
    resumeUrl: "#"
  },
  {
    id: 9,
    name: "Olivia Hernandez",
    type: 'internship',
    role: "Product Manager",
    duration: "3 months",
    location: "Jaipur",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    resumeUrl: "#"
  },
  {
    id: 10,
    name: "James Wilson",
    type: 'apprenticeship',
    role: "DevOps Engineer",
    duration: "11 months",
    location: "Lucknow",
    startDate: "2024-08-01",
    endDate: "2025-01-31",
    resumeUrl: "#"
  }
  // Add more mock data as needed
];

// UserDetailsModal Component
const UserDetailsModal = ({ user, onClose }: { user: RequestUser; onClose: () => void }) => {
  const [showJoiningUpload, setShowJoiningUpload] = useState(false);
  const [showThankingUpload, setShowThankingUpload] = useState(false);
  const [showRecommendationUpload, setShowRecommendationUpload] = useState(false);
  const [selectedJoiningFile, setSelectedJoiningFile] = useState<File | null>(null);
  const [selectedThankingFile, setSelectedThankingFile] = useState<File | null>(null);
  const [selectedRecommendationFile, setSelectedRecommendationFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [joiningLetterStatus, setJoiningLetterStatus] = useState(user.joiningLetterStatus || 'pending');
  const [thankingLetterStatus, setThankingLetterStatus] = useState(user.thankingLetterStatus || 'pending');
  const [recommendationLetterStatus, setRecommendationLetterStatus] = useState(user.recommendationLetterStatus || 'pending');
  const joiningFileInputRef = useRef<HTMLInputElement>(null);
  const thankingFileInputRef = useRef<HTMLInputElement>(null);
  const recommendationFileInputRef = useRef<HTMLInputElement>(null);

  const handleJoiningAccept = () => {
    setShowJoiningUpload(true);
    setShowThankingUpload(false);
    setShowRecommendationUpload(false);
  };

  const handleThankingAccept = () => {
    setShowThankingUpload(true);
    setShowJoiningUpload(false);
    setShowRecommendationUpload(false);
  };

  const handleRecommendationAccept = () => {
    setShowRecommendationUpload(true);
    setShowJoiningUpload(false);
    setShowThankingUpload(false);
  };

  const handleReject = () => {
    // Remove the request from mockRequests array
    const index = mockRequests.findIndex(request => request.id === user.id);
    if (index !== -1) {
      mockRequests.splice(index, 1);
    }
    alert('Request rejected and removed from the list');
    onClose();
  };

  const handleJoiningFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedJoiningFile(file);
    }
  };

  const handleThankingFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThankingFile(file);
    }
  };

  const handleRecommendationFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedRecommendationFile(file);
    }
  };

  const handleUploadAndSend = async (type: 'joining' | 'thanking' | 'recommendation') => {
    const selectedFile = type === 'joining' 
      ? selectedJoiningFile 
      : type === 'thanking' 
        ? selectedThankingFile 
        : selectedRecommendationFile;

    if (!selectedFile) {
      alert(`Please select a ${type} letter first`);
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the status in mockRequests array
      const index = mockRequests.findIndex(request => request.id === user.id);
      if (index !== -1) {
        if (type === 'joining') {
          mockRequests[index].joiningLetterStatus = 'uploaded';
          setJoiningLetterStatus('uploaded');
        } else if (type === 'thanking') {
          mockRequests[index].thankingLetterStatus = 'uploaded';
          setThankingLetterStatus('uploaded');
        } else {
          mockRequests[index].recommendationLetterStatus = 'uploaded';
          setRecommendationLetterStatus('uploaded');
        }
      }

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} letter sent successfully!`);
      setShowJoiningUpload(false);
      setShowThankingUpload(false);
      setShowRecommendationUpload(false);
    } catch (err: unknown) {
      console.error(`Error uploading ${type} letter:`, err);
      alert(`Error sending ${type} letter`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Basic Info Section */}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <FaUser className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{user.name}</h3>
                <div className="mt-1 flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.type === 'internship' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                  </span>
                  <span className="text-sm sm:text-base text-gray-600">{user.role}</span>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-600">
              <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span>{user.location}</span>
            </div>

            {/* Duration Info */}
            <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-600">
              <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span>{user.duration}</span>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-600">
                <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <div>
                  <p>Start Date: {new Date(user.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(user.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Resume Section */}
            <div className="mt-4 sm:mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Resume</h4>
              <a
                href={user.resumeUrl}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm sm:text-base"
              >
                <FaFileAlt />
                <span>View Resume</span>
              </a>
            </div>

            {/* Action Buttons Section */}
            {!showJoiningUpload && !showThankingUpload && !showRecommendationUpload ? (
              <div className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
                {/* Start Date and Joining Letter Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {user.hasAppliedJoining ? 'Applied for Joining Letter' : 'Not Applied for Joining Letter'}
                  </h3>
                  <div className="text-sm text-gray-600 mb-1">
                    Start Date: {new Date(user.startDate).toLocaleDateString()}
                  </div>
                  {joiningLetterStatus === 'uploaded' ? (
                    <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                      <FaFileAlt className="text-gray-500" />
                      Joining letter already uploaded
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={handleJoiningAccept}
                        disabled={new Date() < new Date(user.startDate) || !user.hasAppliedJoining}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors duration-200 ${
                          !user.hasAppliedJoining 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                            : new Date() < new Date(user.startDate)
                            ? 'bg-green-50 text-green-500 cursor-not-allowed hover:bg-green-50'
                            : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {!user.hasAppliedJoining ? 'No Application for Joining Letter' : 'Approve Joining Letter'}
                        </span>
                      </button>
                      <button
                        onClick={handleReject}
                        disabled={new Date() < new Date(user.startDate) || !user.hasAppliedJoining}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors duration-200 ${
                          !user.hasAppliedJoining 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                            : new Date() < new Date(user.startDate)
                            ? 'bg-red-50 text-red-500 cursor-not-allowed hover:bg-red-50'
                            : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {!user.hasAppliedJoining ? 'No Application to Reject' : 'Reject Joining Letter'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* End Date and Thanking Letter Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {user.hasAppliedThanking ? 'Applied for Thanking Letter' : 'Not Applied for Thanking Letter'}
                  </h3>
                  <div className="text-sm text-gray-600 mb-1">
                    End Date: {new Date(user.endDate).toLocaleDateString()}
                  </div>
                  {thankingLetterStatus === 'uploaded' ? (
                    <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                      <FaFileAlt className="text-gray-500" />
                      Thanking letter already uploaded
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={handleThankingAccept}
                        disabled={new Date() < new Date(user.endDate) || !user.hasAppliedThanking}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors duration-200 ${
                          !user.hasAppliedThanking 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                            : new Date() < new Date(user.endDate)
                            ? 'bg-green-50 text-green-500 cursor-not-allowed hover:bg-green-50'
                            : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {!user.hasAppliedThanking ? 'No Application for Thanking Letter' : 'Approve Thanking Letter'}
                        </span>
                      </button>
                      <button
                        onClick={handleReject}
                        disabled={new Date() < new Date(user.endDate) || !user.hasAppliedThanking}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors duration-200 ${
                          !user.hasAppliedThanking 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                            : new Date() < new Date(user.endDate)
                            ? 'bg-red-50 text-red-500 cursor-not-allowed hover:bg-red-50'
                            : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {!user.hasAppliedThanking ? 'No Application to Reject' : 'Reject Thanking Letter'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Letter of Recommendation Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {user.hasAppliedRecommendation ? 'Applied for Letter of Recommendation' : 'Not Applied for Letter of Recommendation'}
                  </h3>
                  {recommendationLetterStatus === 'uploaded' ? (
                    <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                      <FaFileAlt className="text-gray-500" />
                      Letter of recommendation already uploaded
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={handleRecommendationAccept}
                        disabled={!user.hasAppliedRecommendation}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors duration-200 ${
                          !user.hasAppliedRecommendation 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                            : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {!user.hasAppliedRecommendation ? 'No Application for Recommendation Letter' : 'Approve Letter of Recommendation'}
                        </span>
                      </button>
                      <button
                        onClick={handleReject}
                        disabled={!user.hasAppliedRecommendation}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors duration-200 ${
                          !user.hasAppliedRecommendation 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                            : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {!user.hasAppliedRecommendation ? 'No Application to Reject' : 'Reject Letter of Recommendation'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : showJoiningUpload ? (
              <div className="mt-4 sm:mt-6 space-y-4">
                <h4 className="font-semibold text-gray-800">Upload Joining Letter</h4>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      ref={joiningFileInputRef}
                      onChange={handleJoiningFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <button
                      onClick={() => joiningFileInputRef.current?.click()}
                      className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FaUpload className="text-gray-400" />
                      <span className="text-gray-600">
                        {selectedJoiningFile ? selectedJoiningFile.name : 'Select Joining Letter'}
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleUploadAndSend('joining')}
                    disabled={!selectedJoiningFile || isUploading}
                    className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                      (!selectedJoiningFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FaPaperPlane />
                    {isUploading ? 'Sending...' : 'Send Joining Letter'}
                  </button>
                </div>
              </div>
            ) : showThankingUpload ? (
              <div className="mt-4 sm:mt-6 space-y-4">
                <h4 className="font-semibold text-gray-800">Upload Thanking Letter</h4>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      ref={thankingFileInputRef}
                      onChange={handleThankingFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <button
                      onClick={() => thankingFileInputRef.current?.click()}
                      className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FaUpload className="text-gray-400" />
                      <span className="text-gray-600">
                        {selectedThankingFile ? selectedThankingFile.name : 'Select Thanking Letter'}
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleUploadAndSend('thanking')}
                    disabled={!selectedThankingFile || isUploading}
                    className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                      (!selectedThankingFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FaPaperPlane />
                    {isUploading ? 'Sending...' : 'Send Thanking Letter'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 sm:mt-6 space-y-4">
                <h4 className="font-semibold text-gray-800">Upload Letter of Recommendation</h4>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      ref={recommendationFileInputRef}
                      onChange={handleRecommendationFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <button
                      onClick={() => recommendationFileInputRef.current?.click()}
                      className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FaUpload className="text-gray-400" />
                      <span className="text-gray-600">
                        {selectedRecommendationFile ? selectedRecommendationFile.name : 'Select Letter of Recommendation'}
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleUploadAndSend('recommendation')}
                    disabled={!selectedRecommendationFile || isUploading}
                    className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                      (!selectedRecommendationFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FaPaperPlane />
                    {isUploading ? 'Sending...' : 'Send Letter of Recommendation'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t p-4 sm:p-6 bg-gray-50 rounded-b-xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InternshipRequestsPage = () => {
  // State for filters
  const [requestType, setRequestType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [applicationStatusFilter, setApplicationStatusFilter] = useState('all'); // 'all', 'applied', 'not_applied'
  const [certificateTypeFilter, setCertificateTypeFilter] = useState('all'); // 'all', 'joining', 'thanking', 'recommendation'

  // Add state for selected user and modal
  const [selectedUser, setSelectedUser] = useState<RequestUser | null>(null);

  // Handle request type change
  const handleRequestTypeChange = (type: string) => {
    setRequestType(type);
    if (type === 'apprenticeship') {
      setDurationFilter('11 months');
      // Keep other filters as is for apprenticeship
    } else if (type === 'all') {
      // Reset all filters when 'all' is selected
      setDurationFilter('');
      setLocationFilter('');
      setRoleFilter('');
      setDateRange({ start: '', end: '' });
      setSearchQuery('');
    } else if (type === 'internship') {
      setDurationFilter(''); // Reset duration filter for internship
      // Keep other filters as is for internship
    }
  };

  // Get available duration options based on request type
  const getDurationOptions = () => {
    if (requestType === 'apprenticeship') {
      return [{ value: '11 months', label: '11 months' }];
    } else if (requestType === 'internship') {
      return [
        { value: '1 month', label: '1 month' },
        { value: '3 months', label: '3 months' },
        { value: '6 months', label: '6 months' },
      ];
    }
    return [
      { value: '1 month', label: '1 month' },
      { value: '3 months', label: '3 months' },
      { value: '6 months', label: '6 months' },
      { value: '11 months', label: '11 months' },
    ];
  };

  // Filter the requests based on selected filters
  const filteredRequests = mockRequests.filter((request) => {
    const matchesType = requestType === 'all' || request.type === requestType;
    const matchesSearch = 
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || request.location === locationFilter;
    const matchesDuration = !durationFilter || request.duration === durationFilter;
    const matchesRole = !roleFilter || request.role === roleFilter;
    const matchesDateRange = 
      (!dateRange.start || request.startDate >= dateRange.start) &&
      (!dateRange.end || request.endDate <= dateRange.end);

    // New filters for application status and certificate type
    const matchesApplicationStatus = applicationStatusFilter === 'all' || 
      (applicationStatusFilter === 'applied' && (request.hasAppliedJoining || request.hasAppliedThanking || request.hasAppliedRecommendation)) ||
      (applicationStatusFilter === 'not_applied' && !(request.hasAppliedJoining || request.hasAppliedThanking || request.hasAppliedRecommendation));

    const matchesCertificateType = certificateTypeFilter === 'all' ||
      (certificateTypeFilter === 'joining' && request.hasAppliedJoining) ||
      (certificateTypeFilter === 'thanking' && request.hasAppliedThanking) ||
      (certificateTypeFilter === 'recommendation' && request.hasAppliedRecommendation);

    return matchesType && matchesSearch && matchesLocation && 
           matchesDuration && matchesRole && matchesDateRange && 
           matchesApplicationStatus && matchesCertificateType;
  });

  // Handle row click
  const handleRowClick = (user: RequestUser) => {
    setSelectedUser(user);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Internship/Apprenticeship Requests</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage internship and apprenticeship requests</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Request Type Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => handleRequestTypeChange('all')}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${
                requestType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Requests
            </button>
            <button
              onClick={() => handleRequestTypeChange('internship')}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${
                requestType === 'internship'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => handleRequestTypeChange('apprenticeship')}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${
                requestType === 'apprenticeship'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Apprenticeships
            </button>
          </div>

          {/* Application Status and Certificate Type Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <select
              value={applicationStatusFilter}
              onChange={(e) => setApplicationStatusFilter(e.target.value)}
              className="w-full p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Application Status</option>
              <option value="applied">Applied</option>
              <option value="not_applied">Not Applied</option>
            </select>

            <select
              value={certificateTypeFilter}
              onChange={(e) => setCertificateTypeFilter(e.target.value)}
              className={`w-full p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                applicationStatusFilter === 'not_applied' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={applicationStatusFilter === 'not_applied'}
            >
              <option value="all">All Certificate Types</option>
              <option value="joining">Joining Letter</option>
              <option value="thanking">Thanking Letter</option>
              <option value="recommendation">Letter of Recommendation</option>
            </select>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className={`w-full p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                requestType === 'apprenticeship' ? 'bg-gray-50' : ''
              }`}
              disabled={requestType === 'apprenticeship'}
            >
              <option value="">All Durations</option>
              {getDurationOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Bangalore">Bangalore</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Backend Developer">Backend Developer</option>
            </select>

            <div className="flex gap-2 sm:gap-4">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table - Desktop Version */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr 
                  key={request.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(request)}
                >
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.name}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.type === 'internship' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.role}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.duration}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.location}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.startDate}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.endDate}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href={request.resumeUrl}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaFileAlt />
                      View
                    </a>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
                    No requests found matching the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Requests Cards - Mobile Version */}
      <div className="sm:hidden space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleRowClick(request)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{request.name}</h3>
                <p className="text-sm text-gray-500">{request.role}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                request.type === 'internship' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400" />
                {request.location}
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-400" />
                {request.duration}
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <div>{request.startDate} to</div>
                  <div>{request.endDate}</div>
                </div>
              </div>
              <a
                href={request.resumeUrl}
                className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1 mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFileAlt />
                View Resume
              </a>
            </div>
          </div>
        ))}
        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 text-center text-sm text-gray-500">
            No requests found matching the selected filters
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default InternshipRequestsPage;
