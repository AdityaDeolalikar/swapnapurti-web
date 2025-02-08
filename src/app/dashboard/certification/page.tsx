"use client";
import React, { useState } from 'react';
import { FaCertificate, FaFileAlt, FaGraduationCap, FaBriefcase, FaAward, FaCheckCircle, FaClock, FaDownload } from 'react-icons/fa';

interface Event {
  id: string;
  name: string;
  date: string;
}

interface Certificate {
  id: number;
  type: string;
  icon: React.ReactElement;
  description: string;
  eligibility: string;
  status: string;
  color: string;
  date: string;
  order: number;
  events?: Event[];
  position?: string;
  dependsOn?: number[];
  isDisabled?: boolean;
}

export default function CertificationPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [appliedCertificates, setAppliedCertificates] = useState<number[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [pendingCertificates, setPendingCertificates] = useState<Certificate[]>([]);
  
  const handleApply = (cert: Certificate) => {
    // Add to applied certificates
    setAppliedCertificates(prev => [...prev, cert.id]);
    
    // Create a new pending certificate with proper typing
    const pendingCert: Certificate = {
      ...cert,
      status: 'pending',
      color: 'yellow',
      description: `Your application for ${cert.type} is under review`,
      dependsOn: cert.dependsOn || undefined
    };
    
    // Add to pending certificates
    setPendingCertificates(prev => [...prev, pendingCert]);
  };

  const certificates: Certificate[] = [
    {
      id: 2,
      type: 'Event Joining Letter',
      icon: <FaFileAlt className="w-6 h-6" />,
      description: 'Request joining letter for event participation',
      eligibility: 'Successfully registered and approved for event',
      status: 'not_applied',
      color: 'blue',
      events: [{ id: '000002', name: 'Adventure Camp 2024', date: '2024-03-15' }],
      date: 'March 15, 2024',
      order: 1
    },
    {
      id: 1,
      type: 'Event Experience Certificate',
      icon: <FaCertificate className="w-6 h-6" />,
      description: 'Request certificate for event participation',
      eligibility: 'Must complete the camp successfully',
      status: 'not_applied',
      color: 'gray',
      events: [{ id: '000001', name: 'Mountain Trekking Camp', date: '2024-02-28' }],
      date: 'February 28, 2024',
      order: 2,
      dependsOn: [2] // Depends on Joining Letter
    },
    {
      id: 10,
      type: 'Letter of Recommendation',
      icon: <FaFileAlt className="w-6 h-6" />,
      description: 'Request event participation recommendation letter',
      eligibility: 'Based on event participation and performance',
      status: 'not_applied',
      color: 'gray',
      events: [{ id: '000003', name: 'Adventure Camp 2024', date: '2024-03-15' }],
      date: 'March 20, 2024',
      order: 3,
      dependsOn: [1] // Depends on Experience Certificate
    },
    {
      id: 3,
      type: 'Internship Offer Letter',
      icon: <FaGraduationCap className="w-6 h-6" />,
      description: 'Request internship offer letter',
      eligibility: 'Application under review for approval',
      status: 'not_applied',
      color: 'blue',
      position: 'Adventure Guide Intern',
      date: 'March 15, 2024',
      order: 1
    },
    {
      id: 4,
      type: 'Internship Experience Certificate',
      icon: <FaAward className="w-6 h-6" />,
      description: 'Request internship experience certificate',
      eligibility: 'Requires internship completion approval',
      status: 'not_applied',
      color: 'gray',
      position: 'Adventure Guide Intern',
      date: 'March 20, 2024',
      order: 2,
      dependsOn: [3] // Depends on Offer Letter
    },
    {
      id: 11,
      type: 'Letter of Recommendation',
      icon: <FaFileAlt className="w-6 h-6" />,
      description: 'Request internship performance recommendation',
      eligibility: 'Based on internship performance evaluation',
      status: 'not_applied',
      color: 'gray',
      position: 'Adventure Guide Intern',
      date: 'March 25, 2024',
      order: 3,
      dependsOn: [4] // Depends on Experience Certificate
    },
    {
      id: 12,
      type: 'Apprenticeship Offer Letter',
      icon: <FaGraduationCap className="w-6 h-6" />,
      description: 'Request apprenticeship offer letter',
      eligibility: 'Successfully selected for apprenticeship program',
      status: 'not_applied',
      color: 'blue',
      position: 'Mountain Guide Apprentice',
      date: 'April 1, 2024',
      order: 1
    },
    {
      id: 14,
      type: 'Apprenticeship Experience Certificate',
      icon: <FaAward className="w-6 h-6" />,
      description: 'Request certificate for apprenticeship',
      eligibility: 'Successfully completed apprenticeship program',
      status: 'not_applied',
      color: 'gray',
      position: 'Mountain Guide Apprentice',
      date: 'April 10, 2024',
      order: 2,
      dependsOn: [12] // Depends on Offer Letter
    },
    {
      id: 13,
      type: 'Letter of Recommendation',
      icon: <FaFileAlt className="w-6 h-6" />,
      description: 'Request apprenticeship performance recommendation',
      eligibility: 'Based on apprenticeship performance evaluation',
      status: 'not_applied',
      color: 'gray',
      position: 'Mountain Guide Apprentice',
      date: 'April 5, 2024',
      order: 3,
      dependsOn: [14] // Depends on Experience Certificate
    },
    {
      id: 7,
      type: 'Job Offer Letter',
      icon: <FaBriefcase className="w-6 h-6" />,
      description: 'Request job offer letter',
      eligibility: 'Must be approved for job position',
      status: 'not_applied',
      color: 'blue',
      position: 'Mountain Guide',
      date: 'April 15, 2024',
      order: 1
    },
    {
      id: 8,
      type: 'Job Experience Certificate',
      icon: <FaAward className="w-6 h-6" />,
      description: 'Request job experience certificate',
      eligibility: 'Needs job completion approval',
      status: 'not_applied',
      color: 'gray',
      position: 'Mountain Guide',
      date: 'April 20, 2024',
      order: 2,
      dependsOn: [7] // Depends on Offer Letter
    },
    {
      id: 9,
      type: 'Letter of Recommendation',
      icon: <FaFileAlt className="w-6 h-6" />,
      description: 'Request job performance recommendation',
      eligibility: 'Based on approved performance evaluation',
      status: 'not_applied',
      color: 'gray',
      position: 'Mountain Guide',
      date: 'April 25, 2024',
      order: 3,
      dependsOn: [8] // Depends on Experience Certificate
    }
  ];

  // Get unique event IDs from certificates and sort them chronologically
  const eventIds = Array.from(new Set(certificates
    .filter(cert => cert.events && cert.events.length > 0)
    .flatMap(cert => cert.events || [])
    .map(event => event.id)
  )).sort((a, b) => {
    const eventA = certificates.find(cert => cert.events?.some(e => e.id === a))?.events?.[0];
    const eventB = certificates.find(cert => cert.events?.some(e => e.id === b))?.events?.[0];
    return new Date(eventA?.date || '').getTime() - new Date(eventB?.date || '').getTime();
  });

  // Function to get all certificates for an event ID
  const getEventCertificates = (eventId: string) => {
    const eventCerts = certificates.filter(cert => 
      cert.events && cert.events.some(event => event.id === eventId)
    );

    // Get the event details
    const eventDetails = eventCerts[0]?.events?.find(e => e.id === eventId);

    // Define the required certificate types with dependencies
    const requiredTypes = [
      {
        type: 'Event Joining Letter',
        icon: <FaFileAlt className="w-6 h-6" />,
        description: 'Request joining letter for event participation',
        eligibility: 'Successfully registered and approved for event',
        position: undefined,
        order: 1
      },
      {
        type: 'Event Experience Certificate',
        icon: <FaCertificate className="w-6 h-6" />,
        description: 'Request certificate for event participation',
        eligibility: 'Must complete the camp successfully',
        position: undefined,
        order: 2,
        dependsOnType: 'Event Joining Letter'
      },
      {
        type: 'Letter of Recommendation',
        icon: <FaFileAlt className="w-6 h-6" />,
        description: 'Request event participation recommendation letter',
        eligibility: 'Based on event participation and performance',
        position: undefined,
        order: 3,
        dependsOnType: 'Event Experience Certificate'
      }
    ];

    // Create or find certificates for each required type
    return requiredTypes.map((reqType, index) => {
      const existingCert = eventCerts.find(cert => cert.type === reqType.type);
      
      // If certificate exists and is applied for, return it with pending status
      if (existingCert && appliedCertificates.includes(existingCert.id)) {
        const pendingCert: Certificate = {
          ...existingCert,
          status: 'pending',
          color: 'yellow',
          description: `Your application for ${existingCert.type} is under review`,
          order: reqType.order,
          dependsOn: existingCert.dependsOn
        };
        return pendingCert;
      }
      
      // If certificate exists but not applied for
      if (existingCert) {
        const dependentCertId = reqType.dependsOnType ? 
          eventCerts.find(c => c.type === reqType.dependsOnType)?.id : undefined;
        
        const updatedCert: Certificate = {
          ...existingCert,
          order: reqType.order,
          dependsOn: dependentCertId ? [dependentCertId] : undefined
        };
        return updatedCert;
      }

      // Find the ID of the dependent certificate if it exists
      const dependentCertId = reqType.dependsOnType ? 
        eventCerts.find(c => c.type === reqType.dependsOnType)?.id : undefined;

      // Check if dependent certificate is pending
      const dependentCert = dependentCertId ? eventCerts.find(c => c.id === dependentCertId) : null;
      const isDependentPending = dependentCert && appliedCertificates.includes(dependentCert.id);

      // Create a new certificate
      const newCert: Certificate = {
        id: Math.random(), // This is temporary, should be handled properly in production
        type: reqType.type,
        icon: reqType.icon,
        description: reqType.description,
        eligibility: reqType.eligibility,
        status: 'not_applied',
        color: index === 0 || isDependentPending ? 'blue' : 'gray',
        events: [eventDetails!],
        date: eventDetails?.date || new Date().toISOString().split('T')[0],
        position: reqType.position,
        order: reqType.order,
        dependsOn: dependentCertId ? [dependentCertId] : undefined,
        isDisabled: index !== 0 && !isDependentPending // Enable if it's first or if dependent is pending
      };

      return newCert;
    });
  };

  const processedCertificates: Certificate[] = certificates.map(cert => {
    // Check if certificate is in appliedCertificates array
    if (appliedCertificates.includes(cert.id)) {
      const pendingCert = pendingCertificates.find(pc => pc.id === cert.id);
      if (pendingCert) {
        return pendingCert;
      }
      return {
        ...cert,
        status: 'pending',
        color: 'yellow',
        description: `Your application for ${cert.type} is under review`
      };
    }

    // Check if certificate has dependencies
    if (cert.dependsOn) {
      const areDependenciesMet = cert.dependsOn.every(dependencyId => {
        const dependentCert = certificates.find(c => c.id === dependencyId);
        // Enable certificate if dependency is either approved or pending
        const isDepApprovedOrPending = dependentCert && 
          (dependentCert.status === 'approved' || appliedCertificates.includes(dependentCert.id));
        return isDepApprovedOrPending;
      });

      if (!areDependenciesMet) {
        return {
          ...cert,
          status: 'not_applied',
          color: 'gray',
          isDisabled: true,
          description: `Previous certificate approval required before applying`
        };
      } else {
        // If dependencies are met, enable the certificate
        return {
          ...cert,
          isDisabled: false,
          color: 'blue'
        };
      }
    }

    return cert;
  });

  const filteredCertificates = processedCertificates.filter(cert => {
    if (activeFilter === 'all') return true;
    return cert.status === activeFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-blue-100 text-blue-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'not_applied':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <FaDownload className="w-4 h-4" />;
      case 'rejected':
        return <FaCheckCircle className="w-4 h-4" />;
      case 'pending':
        return <FaClock className="w-4 h-4" />;
      case 'not_applied':
        return <FaFileAlt className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  const filterBoxes = [
    {
      id: 'not_applied',
      label: 'Not Applied',
      count: processedCertificates.filter(c => c.status === 'not_applied').length,
      color: 'gray',
      icon: <FaFileAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
    },
    {
      id: 'pending',
      label: 'Pending',
      count: processedCertificates.filter(c => c.status === 'pending').length,
      color: 'yellow',
      icon: <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
    },
    {
      id: 'approved',
      label: 'Approved',
      count: processedCertificates.filter(c => c.status === 'approved').length,
      color: 'blue',
      icon: <FaCertificate className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
    },
    {
      id: 'rejected',
      label: 'Rejected',
      count: processedCertificates.filter(c => c.status === 'rejected').length,
      color: 'red',
      icon: <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Letters</h1>
          <p className="text-blue-100 text-lg">
            Track your approved certificates, letters, and manage pending approvals
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Your Progress</h2>
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-sm font-medium ${
              activeFilter === 'all' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {filterBoxes.map((box) => (
            <button
              key={box.id}
              onClick={() => setActiveFilter(box.id)}
              className={`bg-${box.color}-50 rounded-xl p-3 sm:p-4 text-left transition-all ${
                activeFilter === box.id ? `ring-2 ring-${box.color}-500` : ''
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className={`p-1.5 sm:p-2 bg-${box.color}-100 rounded-lg`}>
                  {box.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-600">{box.label}</span>
              </div>
              <p className={`text-xl sm:text-2xl font-bold text-${box.color}-600`}>{box.count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activeFilter === 'all' ? 'All Certificates' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Certificates`}
        </h2>
        <div className="space-y-8">
          {/* Events Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-2">
              <h3 className="text-lg font-medium text-gray-700">Event Certificates</h3>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Events</option>
                {eventIds.map((eventId) => {
                  const eventName = certificates.find(cert => cert.events?.some(e => e.id === eventId))?.events?.[0].name;
                  return (
                    <option key={eventId} value={eventId}>{`${eventId} - ${eventName}`}</option>
                  );
                })}
              </select>
            </div>
            <div className="space-y-8">
              {(selectedEventId === 'all' ? eventIds : [selectedEventId]).map(eventId => {
                const eventCertificates = getEventCertificates(eventId);
                const eventName = eventCertificates[0]?.events?.[0].name;
                
                return (
                  <div key={eventId} className="space-y-4">
                    <h4 className="text-md font-medium text-gray-600 pl-2 border-l-4 border-blue-500">
                      {`${eventId} - ${eventName}`}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {eventCertificates
                        .filter(cert => {
                          if (activeFilter === 'all') return true;
                          return cert.status === activeFilter;
                        })
                        .map((cert) => (
                          <div 
                            key={cert.id}
                            className={`bg-white rounded-2xl shadow-sm p-4 sm:p-6 border-l-4 hover:shadow-md transition-shadow ${
                              cert.status === 'approved'
                                ? 'border-blue-500'
                                : cert.status === 'rejected'
                                ? 'border-red-500'
                                : cert.status === 'pending'
                                ? 'border-yellow-500'
                                : 'border-gray-300'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row items-start gap-3 sm:justify-between mb-4">
                              <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
                                <div className={`p-2 sm:p-3 ${
                                  cert.status === 'approved'
                                    ? 'bg-blue-100'
                                    : cert.status === 'rejected'
                                    ? 'bg-red-100'
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
                                        {`${event.id} - ${event.name}`}
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

                            {cert.status === 'approved' && (
                              <button className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base">
                                <FaDownload className="w-4 h-4 shrink-0" />
                                <span className="break-words">Download Certificate</span>
                              </button>
                            )}
                            {cert.status === 'not_applied' && (
                              <button 
                                onClick={() => handleApply(cert)}
                                disabled={cert.isDisabled}
                                className={`mt-4 w-full ${cert.isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base`}
                              >
                                <FaFileAlt className="w-4 h-4 shrink-0" />
                                <span className="break-words">{cert.isDisabled ? 'Previous Certificate Required' : 'Apply for Certificate'}</span>
                              </button>
                            )}
                            {cert.status === 'pending' && (
                              <div className="mt-4 w-full bg-yellow-100 text-yellow-800 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                                <FaClock className="w-4 h-4 shrink-0" />
                                <span className="break-words">Application Under Review</span>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Internship Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Internship Certificates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredCertificates
                .filter(cert => cert.type.toLowerCase().includes('internship') || 
                  (cert.type.toLowerCase().includes('recommendation') && cert.position && 
                   cert.position.toLowerCase().includes('intern')))
                .map((cert) => (
                  <div 
                    key={cert.id}
                    className={`bg-white rounded-2xl shadow-sm p-4 sm:p-6 border-l-4 hover:shadow-md transition-shadow ${
                      cert.status === 'approved'
                        ? 'border-blue-500'
                        : cert.status === 'rejected'
                        ? 'border-red-500'
                        : cert.status === 'pending'
                        ? 'border-yellow-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:justify-between mb-4">
                      <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
                        <div className={`p-2 sm:p-3 ${
                          cert.status === 'approved'
                            ? 'bg-blue-100'
                            : cert.status === 'rejected'
                            ? 'bg-red-100'
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
                                {`${event.id} - ${event.name}`}
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

                    {cert.status === 'approved' && (
                      <button className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base">
                        <FaDownload className="w-4 h-4 shrink-0" />
                        <span className="break-words">Download Certificate</span>
                      </button>
                    )}
                    {cert.status === 'not_applied' && (
                      <button 
                        onClick={() => handleApply(cert)}
                        disabled={cert.isDisabled}
                        className={`mt-4 w-full ${cert.isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base`}
                      >
                        <FaFileAlt className="w-4 h-4 shrink-0" />
                        <span className="break-words">{cert.isDisabled ? 'Previous Certificate Required' : 'Apply for Certificate'}</span>
                      </button>
                    )}
                    {cert.status === 'pending' && (
                      <div className="mt-4 w-full bg-yellow-100 text-yellow-800 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                        <FaClock className="w-4 h-4 shrink-0" />
                        <span className="break-words">Application Under Review</span>
                      </div>
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* Apprenticeship Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Apprenticeship Certificates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredCertificates
                .filter(cert => cert.type.toLowerCase().includes('apprenticeship') || 
                  (cert.type.toLowerCase().includes('recommendation') && cert.position && 
                   cert.position.toLowerCase().includes('apprentice')))
                .map((cert) => (
                  <div 
                    key={cert.id}
                    className={`bg-white rounded-2xl shadow-sm p-4 sm:p-6 border-l-4 hover:shadow-md transition-shadow ${
                      cert.status === 'approved'
                        ? 'border-blue-500'
                        : cert.status === 'rejected'
                        ? 'border-red-500'
                        : cert.status === 'pending'
                        ? 'border-yellow-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:justify-between mb-4">
                      <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
                        <div className={`p-2 sm:p-3 ${
                          cert.status === 'approved'
                            ? 'bg-blue-100'
                            : cert.status === 'rejected'
                            ? 'bg-red-100'
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
                                {`${event.id} - ${event.name}`}
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

                    {cert.status === 'approved' && (
                      <button className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base">
                        <FaDownload className="w-4 h-4 shrink-0" />
                        <span className="break-words">Download Certificate</span>
                      </button>
                    )}
                    {cert.status === 'not_applied' && (
                      <button 
                        onClick={() => handleApply(cert)}
                        disabled={cert.isDisabled}
                        className={`mt-4 w-full ${cert.isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base`}
                      >
                        <FaFileAlt className="w-4 h-4 shrink-0" />
                        <span className="break-words">{cert.isDisabled ? 'Previous Certificate Required' : 'Apply for Certificate'}</span>
                      </button>
                    )}
                    {cert.status === 'pending' && (
                      <div className="mt-4 w-full bg-yellow-100 text-yellow-800 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                        <FaClock className="w-4 h-4 shrink-0" />
                        <span className="break-words">Application Under Review</span>
                      </div>
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* Jobs Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Job Certificates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredCertificates
                .filter(cert => cert.type.toLowerCase().includes('job') || 
                  (cert.type.toLowerCase().includes('recommendation') && cert.position && 
                   !cert.position.toLowerCase().includes('intern') && 
                   !cert.position.toLowerCase().includes('apprentice')))
                .map((cert) => (
                  <div 
                    key={cert.id}
                    className={`bg-white rounded-2xl shadow-sm p-4 sm:p-6 border-l-4 hover:shadow-md transition-shadow ${
                      cert.status === 'approved'
                        ? 'border-blue-500'
                        : cert.status === 'rejected'
                        ? 'border-red-500'
                        : cert.status === 'pending'
                        ? 'border-yellow-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:justify-between mb-4">
                      <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
                        <div className={`p-2 sm:p-3 ${
                          cert.status === 'approved'
                            ? 'bg-blue-100'
                            : cert.status === 'rejected'
                            ? 'bg-red-100'
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
                                {`${event.id} - ${event.name}`}
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

                    {cert.status === 'approved' && (
                      <button className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base">
                        <FaDownload className="w-4 h-4 shrink-0" />
                        <span className="break-words">Download Certificate</span>
                      </button>
                    )}
                    {cert.status === 'not_applied' && (
                      <button 
                        onClick={() => handleApply(cert)}
                        disabled={cert.isDisabled}
                        className={`mt-4 w-full ${cert.isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base`}
                      >
                        <FaFileAlt className="w-4 h-4 shrink-0" />
                        <span className="break-words">{cert.isDisabled ? 'Previous Certificate Required' : 'Apply for Certificate'}</span>
                      </button>
                    )}
                    {cert.status === 'pending' && (
                      <div className="mt-4 w-full bg-yellow-100 text-yellow-800 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                        <FaClock className="w-4 h-4 shrink-0" />
                        <span className="break-words">Application Under Review</span>
                      </div>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
