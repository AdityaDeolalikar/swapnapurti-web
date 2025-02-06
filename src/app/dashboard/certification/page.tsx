"use client";
import React from 'react';
import { FaCertificate, FaFileAlt, FaGraduationCap, FaBriefcase, FaAward, FaCheckCircle, FaClock, FaDownload, FaLock } from 'react-icons/fa';

export default function CertificationPage() {
  const certificates = [
    {
      id: 2,
      type: 'Event Joining Letter',
      icon: <FaFileAlt className="w-6 h-6" />,
      description: 'Issued upon enrollment in an event',
      eligibility: 'Enrolled in at least 1 event',
      status: 'available',
      color: 'blue',
      events: ['Adventure Camp 2024'],
      date: 'March 15, 2024'
    },
    {
      id: 1,
      type: 'Event Experience Certificate',
      icon: <FaCertificate className="w-6 h-6" />,
      description: 'Awarded upon successful completion of a camp',
      eligibility: 'Completed at least 1 camp',
      status: 'completed',
      color: 'green',
      events: ['Mountain Trekking Camp'],
      date: 'February 28, 2024'
    },
    {
      id: 3,
      type: 'Internship Offer Letter',
      icon: <FaGraduationCap className="w-6 h-6" />,
      description: 'Official internship offer',
      eligibility: 'Qualified for internship program',
      status: 'pending',
      color: 'yellow',
      position: 'Adventure Guide Intern',
      date: 'Pending Review'
    },
    {
      id: 4,
      type: 'Internship Experience Certificate',
      icon: <FaAward className="w-6 h-6" />,
      description: 'Certifies internship completion',
      eligibility: 'Completed at least 1 internship',
      status: 'locked',
      color: 'gray',
      position: 'Not Available',
      date: 'Not Available'
    },
    {
      id: 5,
      type: 'Apprenticeship Offer Letter',
      icon: <FaGraduationCap className="w-6 h-6" />,
      description: 'Official apprenticeship offer',
      eligibility: 'Qualified for apprenticeship program',
      status: 'locked',
      color: 'gray',
      position: 'Not Available',
      date: 'Not Available'
    },
    {
      id: 6,
      type: 'Apprenticeship Experience Certificate',
      icon: <FaAward className="w-6 h-6" />,
      description: 'Certifies apprenticeship completion',
      eligibility: 'Completed at least 1 apprenticeship',
      status: 'locked',
      color: 'gray',
      position: 'Not Available',
      date: 'Not Available'
    },
    {
      id: 7,
      type: 'Job Offer Letter',
      icon: <FaBriefcase className="w-6 h-6" />,
      description: 'Official job offer',
      eligibility: 'Qualified for job position',
      status: 'locked',
      color: 'gray',
      position: 'Not Available',
      date: 'Not Available'
    },
    {
      id: 8,
      type: 'Job Experience Certificate',
      icon: <FaAward className="w-6 h-6" />,
      description: 'Certifies job experience',
      eligibility: 'Completed at least 1 year of job',
      status: 'locked',
      color: 'gray',
      position: 'Not Available',
      date: 'Not Available'
    },
    {
      id: 9,
      type: 'Letter of Recommendation',
      icon: <FaFileAlt className="w-6 h-6" />,
      description: 'Professional recommendation',
      eligibility: 'Based on performance and contribution',
      status: 'locked',
      color: 'gray',
      position: 'Not Available',
      date: 'Not Available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <FaDownload className="w-4 h-4" />;
      case 'completed':
        return <FaCheckCircle className="w-4 h-4" />;
      case 'pending':
        return <FaClock className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Letters</h1>
          <p className="text-blue-100 text-lg">
            Track and download your certificates, offer letters, and recommendations
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                <FaCertificate className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Available</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">2</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Completed</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-600">1</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg">
                <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Pending</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-yellow-600">1</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg">
                <FaLock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Locked</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-600">5</p>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {certificates.map((cert) => (
          <div 
            key={cert.id}
            className={`bg-white rounded-2xl shadow-sm p-4 sm:p-6 border-l-4 hover:shadow-md transition-shadow ${
              cert.status === 'available'
                ? 'border-blue-500'
                : cert.status === 'completed'
                ? 'border-green-500'
                : cert.status === 'pending'
                ? 'border-yellow-500'
                : 'border-gray-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:justify-between mb-4">
              <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className={`p-2 sm:p-3 ${
                  cert.status === 'available'
                    ? 'bg-blue-100'
                    : cert.status === 'completed'
                    ? 'bg-green-100'
                    : cert.status === 'pending'
                    ? 'bg-yellow-100'
                    : 'bg-gray-100'
                } rounded-xl shrink-0`}>
                  {cert.icon}
                </div>
                <div className="min-w-0 flex-1 sm:flex-initial">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg break-words">{cert.type}</h3>
                  <p className="text-sm text-gray-500 break-words line-clamp-2">{cert.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(cert.status)} flex items-center gap-2 shrink-0 mt-2 sm:mt-0`}>
                {getStatusIcon(cert.status)}
                <span className="capitalize whitespace-nowrap">{cert.status}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-gray-500 font-medium whitespace-nowrap">Eligibility:</span>
                <p className="text-gray-700 break-words">{cert.eligibility}</p>
              </div>
              {cert.events && (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="text-gray-500 font-medium whitespace-nowrap">Related Events:</span>
                  <div className="flex flex-wrap gap-1">
                    {cert.events.map((event, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 break-words"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cert.position && (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="text-gray-500 font-medium whitespace-nowrap">Position:</span>
                  <p className="text-gray-700 break-words">{cert.position}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-gray-500 font-medium whitespace-nowrap">Date:</span>
                <p className="text-gray-700 break-words">{cert.date}</p>
              </div>
            </div>

            {cert.status === 'available' && (
              <button className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base">
                <FaDownload className="w-4 h-4 shrink-0" />
                <span className="break-words">Download Certificate</span>
              </button>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
}
