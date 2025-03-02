"use client";
import React, { useState, useRef } from "react";
import { FiX, FiFile, FiUpload, FiSend } from "react-icons/fi";

interface CertificationRequest {
  id: number;
  name: string;
  eventName: string;
  eventDate: string;
  role: string;
  hoursContributed: number;
  status: "pending" | "approved" | "rejected";
  email: string;
  phone: string;
  certificateType: "thanking" | "joining" | "recommendation";
  requestDate: string;
  certificateStatus?: 'pending' | 'uploaded';
  hasAppliedForCertificate?: boolean;
  location: string;
}

interface RequestDetailsModalProps {
  request: CertificationRequest;
  onClose: () => void;
  onStatusChange: (id: number, status: "pending" | "approved" | "rejected") => void;
}

const RequestDetailsModal = ({ request, onClose, onStatusChange }: RequestDetailsModalProps) => {
  const [showCertificateUpload, setShowCertificateUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [certificateStatus, setCertificateStatus] = useState(request.certificateStatus || 'pending');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadAndSend = async () => {
    if (!selectedFile) {
      alert('Please select a certificate file first');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCertificateStatus('uploaded');
      alert('Certificate sent successfully!');
      setShowCertificateUpload(false);
    } catch (err) {
      console.error('Error uploading certificate:', err);
      alert('Error sending certificate');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Certificate Request Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {request.name}</p>
                <p><span className="font-medium">Email:</span> {request.email}</p>
                <p><span className="font-medium">Phone:</span> {request.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Event Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Event:</span> {request.eventName}</p>
                <p><span className="font-medium">Role:</span> {request.role}</p>
                <p><span className="font-medium">Hours Contributed:</span> {request.hoursContributed}</p>
                <p><span className="font-medium">Certificate Type:</span> {request.certificateType}</p>
                <p><span className="font-medium">Event Date:</span> {new Date(request.eventDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          {!showCertificateUpload ? (
            <div className="flex flex-col gap-2 sm:gap-3 mt-6">
              {certificateStatus === 'uploaded' ? (
                <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2">
                  <FiFile className="text-gray-500" />
                  Certificate already uploaded
                </div>
              ) : (
                <>
                  {/* Joining Letter Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {request.hasAppliedForCertificate ? 'Applied for Joining Letter' : 'Not Applied for Joining Letter'}
                      </h3>
                      <span className="text-sm text-gray-600">Start Date: {new Date(request.eventDate).toLocaleDateString()}</span>
                    </div>
                    {request.hasAppliedForCertificate ? (
                      <>
                        <button
                          onClick={() => onStatusChange(request.id, "approved")}
                          className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mb-2"
                        >
                          <FiSend /> Approve Joining Letter
                        </button>
                        <button
                          onClick={() => onStatusChange(request.id, "rejected")}
                          className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiX /> Reject Joining Letter
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-center mb-2">
                          No Application for Joining Letter
                        </div>
                        <div className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-center">
                          No Application to Reject
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thanking Letter Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Not Applied for Thanking Letter
                      </h3>
                      <span className="text-sm text-gray-600">End Date: 8/31/2024</span>
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-center mb-2">
                      No Application for Thanking Letter
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-center">
                      No Application to Reject
                    </div>
                  </div>

                  {/* Letter of Recommendation Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Not Applied for Letter of Recommendation
                      </h3>
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-center mb-2">
                      No Application for Recommendation Letter
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-center">
                      No Application to Reject
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-800">Upload Certificate</h4>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiUpload className="text-gray-400" />
                    <span className="text-gray-600">
                      {selectedFile ? selectedFile.name : 'Select Certificate'}
                    </span>
                  </button>
                </div>
                <button
                  onClick={handleUploadAndSend}
                  disabled={!selectedFile || isUploading}
                  className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    (!selectedFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiSend />
                  {isUploading ? 'Sending...' : 'Send Certificate'}
                </button>
                <button
                  onClick={() => setShowCertificateUpload(false)}
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mockRequests: CertificationRequest[] = [
  {
    id: 1,
    name: "John Doe",
    eventName: "Summer Camp 2024",
    eventDate: "2024-06-15",
    role: "Volunteer",
    hoursContributed: 20,
    status: "pending",
    email: "john@example.com",
    phone: "123-456-7890",
    certificateType: "joining",
    requestDate: "2024-03-15",
    hasAppliedForCertificate: true,
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    eventName: "Nature Trail Cleanup",
    eventDate: "2024-04-20",
    role: "Team Leader",
    hoursContributed: 15,
    status: "approved",
    email: "sarah.j@example.com",
    phone: "234-567-8901",
    certificateType: "recommendation",
    requestDate: "2024-03-10",
    hasAppliedForCertificate: true,
    location: "Delhi"
  },
  {
    id: 3,
    name: "Michael Chen",
    eventName: "Wildlife Photography Workshop",
    eventDate: "2024-05-01",
    role: "Participant",
    hoursContributed: 8,
    status: "pending",
    email: "m.chen@example.com",
    phone: "345-678-9012",
    certificateType: "thanking",
    requestDate: "2024-03-18",
    hasAppliedForCertificate: false,
    location: "Bangalore"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    eventName: "Mountain Climbing Expedition",
    eventDate: "2024-07-10",
    role: "Safety Coordinator",
    hoursContributed: 25,
    status: "rejected",
    email: "emily.r@example.com",
    phone: "456-789-0123",
    certificateType: "joining",
    requestDate: "2024-03-05",
    hasAppliedForCertificate: true,
    location: "Mumbai"
  },
  {
    id: 5,
    name: "David Kim",
    eventName: "Camping Skills Workshop",
    eventDate: "2024-06-01",
    role: "Instructor",
    hoursContributed: 12,
    status: "approved",
    email: "d.kim@example.com",
    phone: "567-890-1234",
    certificateType: "recommendation",
    requestDate: "2024-03-12",
    hasAppliedForCertificate: true,
    location: "Delhi"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    eventName: "River Rafting Adventure",
    eventDate: "2024-08-15",
    role: "Participant",
    hoursContributed: 6,
    status: "pending",
    email: "lisa.t@example.com",
    phone: "678-901-2345",
    certificateType: "thanking",
    requestDate: "2024-03-20",
    hasAppliedForCertificate: false,
    location: "Bangalore"
  },
  {
    id: 7,
    name: "James Wilson",
    eventName: "Forest Conservation Project",
    eventDate: "2024-05-20",
    role: "Volunteer Coordinator",
    hoursContributed: 30,
    status: "approved",
    email: "j.wilson@example.com",
    phone: "789-012-3456",
    certificateType: "joining",
    requestDate: "2024-03-08",
    hasAppliedForCertificate: true,
    location: "Mumbai"
  },
  {
    id: 8,
    name: "Anna Martinez",
    eventName: "Survival Skills Training",
    eventDate: "2024-07-01",
    role: "Assistant Instructor",
    hoursContributed: 18,
    status: "pending",
    email: "a.martinez@example.com",
    phone: "890-123-4567",
    certificateType: "recommendation",
    requestDate: "2024-03-16",
    hasAppliedForCertificate: false,
    location: "Delhi"
  },
  {
    id: 9,
    name: "Robert Taylor",
    eventName: "Rock Climbing Workshop",
    eventDate: "2024-06-25",
    role: "Safety Officer",
    hoursContributed: 22,
    status: "pending",
    email: "r.taylor@example.com",
    phone: "901-234-5678",
    certificateType: "joining",
    requestDate: "2024-03-22",
    hasAppliedForCertificate: true,
    location: "Bangalore"
  },
  {
    id: 10,
    name: "Sophie Lee",
    eventName: "Nature Photography Camp",
    eventDate: "2024-07-15",
    role: "Photography Guide",
    hoursContributed: 16,
    status: "approved",
    email: "s.lee@example.com",
    phone: "012-345-6789",
    certificateType: "recommendation",
    requestDate: "2024-03-14",
    hasAppliedForCertificate: true,
    location: "Mumbai"
  },
  {
    id: 11,
    name: "Daniel Brown",
    eventName: "Adventure Trekking",
    eventDate: "2024-08-01",
    role: "Trek Leader",
    hoursContributed: 28,
    status: "pending",
    email: "d.brown@example.com",
    phone: "123-456-7891",
    certificateType: "joining",
    requestDate: "2024-03-25",
    hasAppliedForCertificate: true,
    location: "Delhi"
  },
  {
    id: 12,
    name: "Emma White",
    eventName: "Wildlife Conservation",
    eventDate: "2024-06-10",
    role: "Conservation Expert",
    hoursContributed: 24,
    status: "approved",
    email: "e.white@example.com",
    phone: "234-567-8902",
    certificateType: "thanking",
    requestDate: "2024-03-19",
    hasAppliedForCertificate: true,
    location: "Bangalore"
  },
  {
    id: 13,
    name: "Alex Turner",
    eventName: "Mountain Biking Camp",
    eventDate: "2024-07-20",
    role: "Biking Instructor",
    hoursContributed: 20,
    status: "pending",
    email: "a.turner@example.com",
    phone: "345-678-9013",
    certificateType: "recommendation",
    requestDate: "2024-03-21",
    hasAppliedForCertificate: false,
    location: "Mumbai"
  },
  {
    id: 14,
    name: "Maria Garcia",
    eventName: "Environmental Workshop",
    eventDate: "2024-06-05",
    role: "Environmental Educator",
    hoursContributed: 15,
    status: "rejected",
    email: "m.garcia@example.com",
    phone: "456-789-0124",
    certificateType: "joining",
    requestDate: "2024-03-17",
    hasAppliedForCertificate: true,
    location: "Delhi"
  },
  {
    id: 15,
    name: "Thomas Anderson",
    eventName: "Camping Adventure",
    eventDate: "2024-08-10",
    role: "Camp Leader",
    hoursContributed: 32,
    status: "pending",
    email: "t.anderson@example.com",
    phone: "567-890-1235",
    certificateType: "thanking",
    requestDate: "2024-03-24",
    hasAppliedForCertificate: true,
    location: "Bangalore"
  }
];

const CertificationRequestsPage = () => {
  const [requests, setRequests] = useState<CertificationRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<CertificationRequest | null>(null);
  const [filter, setFilter] = useState({
    eventId: "all",
    certificateType: "all",
    applicationStatus: "all",
    requestStatus: "all",
    location: "all"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

  const handleStatusChange = (id: number, newStatus: "pending" | "approved" | "rejected") => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    ));
    setSelectedRequest(null);
  };

  // Get unique event IDs in descending order
  const uniqueEventIds = [...new Set(requests.map(request => request.id))].sort((a, b) => b - a);

  // Sort requests by event ID in descending order
  const sortedRequests = [...requests].sort((a, b) => b.id - a.id);

  // Get unique locations
  const uniqueLocations = [...new Set(requests.map(request => request.location))].sort();

  const filteredRequests = sortedRequests.filter(request => {
    if (filter.eventId !== "all" && request.id !== parseInt(filter.eventId)) return false;
    if (filter.certificateType !== "all" && request.certificateType !== filter.certificateType) return false;
    if (filter.applicationStatus === "applied" && !request.hasAppliedForCertificate) return false;
    if (filter.applicationStatus === "not_applied" && request.hasAppliedForCertificate) return false;
    if (filter.requestStatus !== "all" && request.status !== filter.requestStatus) return false;
    if (filter.location !== "all" && request.location !== filter.location) return false;
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Function to format ID to 6 digits
  const formatEventId = (id: number) => {
    return id.toString().padStart(6, '0');
  };

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Certification Requests</h1>

      {/* Filters Section */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={filter.applicationStatus}
            onChange={(e) => setFilter({ ...filter, applicationStatus: e.target.value })}
          >
            <option value="all">All Application Status</option>
            <option value="applied">Applied</option>
            <option value="not_applied">Not Applied</option>
          </select>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={filter.certificateType}
            onChange={(e) => setFilter({ ...filter, certificateType: e.target.value })}
          >
            <option value="all">All Letter Types</option>
            <option value="joining">Joining Letter</option>
            <option value="thanking">Thanking Letter</option>
            <option value="recommendation">Letter of Recommendation</option>
          </select>

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={filter.requestStatus}
            onChange={(e) => setFilter({ ...filter, requestStatus: e.target.value })}
          >
            <option value="all">All Request Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={filter.location}
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          >
            <option value="all">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={filter.eventId}
            onChange={(e) => setFilter({ ...filter, eventId: e.target.value })}
          >
            <option value="all">All Events</option>
            {uniqueEventIds.map((id) => (
              <option key={id} value={id}>
                Event #{formatEventId(id)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {indexOfFirstRequest + 1} to {Math.min(indexOfLastRequest, filteredRequests.length)} of {filteredRequests.length} entries
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRequests.map((request) => (
              <tr 
                key={request.id} 
                onClick={() => setSelectedRequest(request)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">#{formatEventId(request.id)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.eventName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.role}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{request.certificateType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(request.eventDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRequests.length > requestsPerPage && (
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="hidden sm:flex items-center gap-2">
              {getPageNumbers().map((number, index) => (
                <button
                  key={index}
                  onClick={() => typeof number === 'number' && handlePageChange(number)}
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 ${
                    number === currentPage
                      ? 'bg-blue-600 text-white'
                      : number === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                  disabled={number === '...'}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Next
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default CertificationRequestsPage;
