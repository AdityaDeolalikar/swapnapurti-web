"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaEdit, FaCalendarAlt, FaTint, FaBuilding, FaBriefcase, FaLock, FaTimes, FaPlus, FaPaperPlane, FaGraduationCap, FaTools, FaBusinessTime, FaCalendarCheck, FaMedal } from 'react-icons/fa';

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    emergencyPhone: "+1 (555) 987-6543",
    dateOfBirth: "1990-01-01",
    bloodGroup: "O+",
    permanentAddress: "123 Camping Street, Adventure City, AC 12345",
    temporaryAddress: "456 Temp Street, Adventure City, AC 12345",
    district: "Adventure District",
    occupation: "Software Engineer",
    organization: "Tech Company",
    avatar: "/images/cardImage.jpg",
    joinDate: "May 2024",
    interests: ["Camping", "Hiking", "Mountain Climbing"],
    opportunities: {
      internship: true,
      apprenticeship: false,
      jobs: true,
      events: true
    },
    upcomingEvents: 2,
    completedEvents: 5,
    ratings: {
      eventParticipation: 4.5,
      communication: 5,
      teamwork: 4,
      leadership: 4.5,
      overall: 4.5
    }
  });

  const [medals, setMedals] = useState({
    platinum: 2,
    gold: 5,
    silver: 8,
    bronze: 12
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [orgSearchQuery, setOrgSearchQuery] = useState('');
  const [showOccupationDropdown, setShowOccupationDropdown] = useState(false);
  const [occupationSearchQuery, setOccupationSearchQuery] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>(user.avatar);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const occupationDropdownRef = useRef<HTMLDivElement>(null);

  const organizations = [
    "Tata Consultancy Services",
    "Persistent Systems",
    "Bajaj Auto",
    "Infosys",
    "Wipro",
    "Tech Mahindra",
    "Cognizant",
    "HCL Technologies",
    "IBM India",
    "Accenture India",
    "Capgemini India",
    "Oracle India",
    "Microsoft India",
    "Google India",
    "Amazon India",
    "Other"
  ];

  const occupations = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Business Analyst",
    "Project Manager",
    "UI/UX Designer",
    "System Administrator",
    "DevOps Engineer",
    "Quality Assurance Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Database Administrator",
    "Network Engineer",
    "Cloud Architect",
    "Other"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOrgDropdown(false);
      }
      if (occupationDropdownRef.current && !occupationDropdownRef.current.contains(event.target as Node)) {
        setShowOccupationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOrganizations = organizations.filter(org =>
    org.toLowerCase().includes(orgSearchQuery.toLowerCase())
  );

  const filteredOccupations = occupations.filter(occ =>
    occ.toLowerCase().includes(occupationSearchQuery.toLowerCase())
  );

  const handleOrgSelect = (org: string) => {
    setUser(prev => ({ ...prev, organization: org }));
    setOrgSearchQuery(org);
    setShowOrgDropdown(false);
  };

  const handleOccupationSelect = (occ: string) => {
    setUser(prev => ({ ...prev, occupation: occ }));
    setOccupationSearchQuery(occ);
    setShowOccupationDropdown(false);
  };

  const handleOrgSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrgSearchQuery(value);
    setUser(prev => ({ ...prev, organization: value }));
    setShowOrgDropdown(true);
  };

  const handleOccupationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOccupationSearchQuery(value);
    setUser(prev => ({ ...prev, occupation: value }));
    setShowOccupationDropdown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setUser(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
      setShowInterestInput(false);
    }
  };

  const handleRemoveInterest = (indexToRemove: number) => {
    setUser(prev => ({
      ...prev,
      interests: prev.interests.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddInterest();
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically make an API call to send the message
      setMessage('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setUser(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">My Profile</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6">
        {/* Left Column - Profile and Additional Info */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {/* Profile Picture Section - Order 1 on mobile */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 order-1">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt={user.name}
                  className="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 rounded-full object-cover ring-4 ring-blue-50"
                />
                {isEditing && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-1 sm:p-1.5 lg:p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaCamera className="text-xs sm:text-sm lg:text-base" />
                    </button>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-200 flex items-center justify-center">
                      {isEditing && (
                        <div className="opacity-0 group-hover:opacity-100 text-white text-xs sm:text-sm font-medium">
                          Change Photo
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <h2 className="mt-2 sm:mt-3 lg:mt-4 text-base sm:text-lg lg:text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm lg:text-base text-gray-500">{user.occupation}</p>
              <p className="text-xs lg:text-sm text-gray-500 mt-1 sm:mt-2">Member since {user.joinDate}</p>
            </div>
          </div>

          {/* Medals - Order 5 on mobile */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 order-5 lg:order-2">
            <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">Your Medals</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Total: {medals.platinum + medals.gold + medals.silver + medals.bronze}</span>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-[#E5E4E2]" />
                  <span className="font-semibold text-gray-800">Platinum</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.platinum}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-yellow-500" />
                  <span className="font-semibold text-gray-800">Gold</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.gold}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-gray-400" />
                  <span className="font-semibold text-gray-800">Silver</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.silver}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMedal className="text-3xl text-amber-700" />
                  <span className="font-semibold text-gray-800">Bronze</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{medals.bronze}</span>
              </div>
            </div>
          </div>

          {/* Messages - Order 4 on mobile */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 order-4 lg:order-3">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">Drop Message/suggestion for Team</h2>
            </div>

            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message for your team..."
                className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-16 sm:pr-20 lg:pr-24 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs sm:text-sm lg:text-base"
                rows={4}
              />
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm lg:text-base ${
                    message.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400'
                  } transition-colors duration-200`}
                >
                  <FaPaperPlane className="text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Send Message</span>
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Your message will be sent to all team members. Keep it professional and constructive.
            </p>
          </div>

          {/* Account Settings - Order 6 on mobile */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 order-6 lg:order-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Account Settings</h2>
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              <button className="w-full text-left px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <FaLock className="text-gray-400" />
                Change Password
              </button>
              <button className="w-full text-left px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                Notification Settings
              </button>
              <button className="w-full text-left px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <FaUser className="text-gray-400" />
                Privacy Settings
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Main Profile Content */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {/* Basic & Personal Info - Order 2 on mobile */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 order-2 lg:order-1">
            {/* Basic Info Section */}
            <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Basic Information
              </h2>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-blue-600 text-white text-xs sm:text-sm lg:text-base rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  Save Changes
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Full Name</label>
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                  <FaUser className="text-gray-400 text-xs sm:text-sm" />
                  <span className="text-sm sm:text-base text-gray-800">{user.name}</span>
                </div>
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Email</label>
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-gray-400 text-xs sm:text-sm" />
                  <span className="text-sm sm:text-base text-gray-800">{user.email}</span>
                </div>
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Phone</label>
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                  <FaPhone className="text-gray-400 text-xs sm:text-sm" />
                  <span className="text-sm sm:text-base text-gray-800">{user.phone}</span>
                </div>
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Date of Birth</label>
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                  <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm" />
                  <span className="text-sm sm:text-base text-gray-800">{user.dateOfBirth}</span>
                </div>
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Blood Group</label>
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                  <FaTint className="text-gray-400 text-xs sm:text-sm" />
                  <span className="text-sm sm:text-base text-gray-800">{user.bloodGroup}</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs sm:text-sm text-gray-500 italic">Note: Basic information can only be updated by contacting support.</p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200"></div>

            {/* Personal Details Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Personal Details
              </h2>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="w-full sm:w-auto px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-blue-600 text-white text-xs sm:text-sm lg:text-base rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2"
              >
                {isEditing ? 'Save Changes' : (
                  <>
                    <FaEdit />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
              <div className="w-full md:w-full">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Permanent Address</label>
                {isEditing ? (
                  <textarea
                    name="permanentAddress"
                    value={user.permanentAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base text-gray-800">{user.permanentAddress}</span>
                  </div>
                )}
              </div>

              <div className="w-full md:w-full">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Temporary Address</label>
                {isEditing ? (
                  <textarea
                    name="temporaryAddress"
                    value={user.temporaryAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base text-gray-800">{user.temporaryAddress}</span>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">District</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="district"
                    value={user.district}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base text-gray-800">{user.district}</span>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={user.emergencyPhone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                    <FaPhone className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base text-gray-800">{user.emergencyPhone}</span>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Occupation</label>
                {isEditing ? (
                  <div className="relative" ref={occupationDropdownRef}>
                    <div className="relative">
                      <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="occupation"
                        value={occupationSearchQuery || user.occupation}
                        onChange={handleOccupationSearch}
                        onFocus={() => setShowOccupationDropdown(true)}
                        placeholder="Search or type occupation"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {showOccupationDropdown && filteredOccupations.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                        {filteredOccupations.map((occ) => (
                          <div
                            key={occ}
                            onClick={() => handleOccupationSelect(occ)}
                            className="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-50 transition-colors duration-200"
                          >
                            {occ}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                    <FaBriefcase className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base text-gray-800">{user.occupation}</span>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Organization</label>
                {isEditing ? (
                  <div className="relative" ref={dropdownRef}>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="organization"
                        value={orgSearchQuery || user.organization}
                        onChange={handleOrgSearch}
                        onFocus={() => setShowOrgDropdown(true)}
                        placeholder="Search or type organization"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {showOrgDropdown && filteredOrganizations.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                        {filteredOrganizations.map((org) => (
                          <div
                            key={org}
                            onClick={() => handleOrgSelect(org)}
                            className="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-50 transition-colors duration-200"
                          >
                            {org}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg">
                    <FaBuilding className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base text-gray-800">{user.organization}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interests & Opportunities - Order 3 on mobile */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 order-3 lg:order-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">Interests & Opportunities</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs w-fit">Personal Preferences</span>
              </div>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="w-full sm:w-auto px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-blue-600 text-white text-xs sm:text-sm lg:text-base rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2"
              >
                {isEditing ? 'Save Changes' : (
                  <>
                    <FaEdit />
                    Edit Interests
                  </>
                )}
              </button>
            </div>

            {/* Our Activities */}
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Our Activities</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                  <div 
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      user.opportunities.internship 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => isEditing && setUser(prev => ({
                      ...prev,
                      opportunities: {
                        ...prev.opportunities,
                        internship: !prev.opportunities.internship
                      }
                    }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${user.opportunities.internship ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <FaGraduationCap className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Internship</h3>
                        <p className="text-sm text-gray-500">Looking for internship opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                  <div 
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      user.opportunities.apprenticeship 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => isEditing && setUser(prev => ({
                      ...prev,
                      opportunities: {
                        ...prev.opportunities,
                        apprenticeship: !prev.opportunities.apprenticeship
                      }
                    }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${user.opportunities.apprenticeship ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <FaTools className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Apprenticeship</h3>
                        <p className="text-sm text-gray-500">Interested in apprenticeship programs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                  <div 
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      user.opportunities.jobs 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => isEditing && setUser(prev => ({
                      ...prev,
                      opportunities: {
                        ...prev.opportunities,
                        jobs: !prev.opportunities.jobs
                      }
                    }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${user.opportunities.jobs ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <FaBusinessTime className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Jobs</h3>
                        <p className="text-sm text-gray-500">Open to job opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]">
                  <div 
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      user.opportunities.events 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => isEditing && setUser(prev => ({
                      ...prev,
                      opportunities: {
                        ...prev.opportunities,
                        events: !prev.opportunities.events
                      }
                    }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${user.opportunities.events ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <FaCalendarCheck className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Events</h3>
                        <p className="text-sm text-gray-500">Interested in upcoming events</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hobbies & Interests */}
            <div className="mt-4 sm:mt-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">Hobbies & Interests</h3>
                {isEditing && !showInterestInput && (
                  <button 
                    onClick={() => setShowInterestInput(true)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm sm:text-base"
                  >
                    <FaPlus className="text-xs sm:text-sm" />
                    Add Interest
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {interest}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveInterest(index)}
                        className="text-blue-700 hover:text-blue-900 focus:outline-none"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && showInterestInput && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type and press Enter"
                      className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      onClick={handleAddInterest}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                    <button
                      onClick={() => {
                        setShowInterestInput(false);
                        setNewInterest('');
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 