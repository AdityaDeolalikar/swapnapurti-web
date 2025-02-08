"use client";
import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaBoxOpen, FaHandsHelping, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface DonationRequest {
  id: string;
  name: string;
  amount: number;
  panCardNumber: string;
  type: 'money' | 'goods' | 'services';
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const DonationRequests = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'money' | 'goods' | 'services'>('all');
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Mock data - replace with actual API call
  const donationRequests: DonationRequest[] = [
    {
      id: '1',
      name: 'John Doe',
      amount: 5000,
      panCardNumber: 'ABCDE1234F',
      type: 'money',
      status: 'pending',
      date: '2024-03-20'
    },
    {
      id: '2',
      name: 'Jane Smith',
      amount: 0,
      panCardNumber: 'FGHIJ5678K',
      type: 'goods',
      description: 'Camping equipment - 5 tents',
      status: 'approved',
      date: '2024-03-19'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      amount: 0,
      panCardNumber: 'KLMNO9012P',
      type: 'services',
      description: 'Adventure training instructor - weekends',
      status: 'pending',
      date: '2024-03-18'
    }
  ];

  const filteredRequests = donationRequests.filter(request => {
    const matchesFilter = selectedFilter === 'all' ? true : request.type === selectedFilter;
    const matchesSearch = searchQuery.trim() === '' ? true : 
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.panCardNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'money':
        return <FaRupeeSign className="text-blue-600" />;
      case 'goods':
        return <FaBoxOpen className="text-purple-600" />;
      case 'services':
        return <FaHandsHelping className="text-green-600" />;
      default:
        return null;
    }
  };

  // Close modal when pressing escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedRequest(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowThankYou(true);
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Donation Requests</h1>
        
        {/* Search and Filter Container */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, PAN, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Filter Buttons */}
        <div className={`${showMobileFilters ? 'flex' : 'hidden'} sm:flex flex-wrap gap-3`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Requests
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFilter('money')}
            className={`px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
              selectedFilter === 'money'
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Money
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFilter('goods')}
            className={`px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
              selectedFilter === 'goods'
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Goods
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFilter('services')}
            className={`px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
              selectedFilter === 'services'
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Services
          </motion.button>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredRequests.length} {filteredRequests.length === 1 ? 'request' : 'requests'}
      </p>

      {/* Donation Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedRequest(request)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {getTypeIcon(request.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{request.name}</h3>
                    <p className="text-sm text-gray-500">{new Date(request.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3">
                {request.type === 'money' && (
                  <p className="text-lg font-semibold text-blue-600">₹{request.amount.toLocaleString()}</p>
                )}
                {(request.type === 'goods' || request.type === 'services') && (
                  <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                )}
                <p className="text-sm text-gray-500 font-medium">PAN: {request.panCardNumber}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <FaBoxOpen className="w-12 h-12 mx-auto text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isSubmitting) {
                setSelectedRequest(null);
                setMessage('');
                setSelectedFile(null);
                setShowThankYou(false);
              }
            }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl"
            >
              {!showThankYou ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-50 rounded-xl">
                        {getTypeIcon(selectedRequest.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{selectedRequest.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(selectedRequest.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!isSubmitting) {
                          setSelectedRequest(null);
                          setMessage('');
                          setSelectedFile(null);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      disabled={isSubmitting}
                    >
                      <FaTimes className="text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Donation Type</p>
                        <p className="font-medium text-gray-800 capitalize">{selectedRequest.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                          {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {selectedRequest.type === 'money' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Amount</p>
                        <p className="text-2xl font-semibold text-blue-600">
                          ₹{selectedRequest.amount.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {(selectedRequest.type === 'goods' || selectedRequest.type === 'services') && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Description</p>
                        <p className="font-medium text-gray-800">{selectedRequest.description}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-500 mb-1">PAN Card Number</p>
                      <p className="font-medium text-gray-800 tracking-wide">{selectedRequest.panCardNumber}</p>
                    </div>

                    {/* Message Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message to the donor..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        rows={4}
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Document Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Document
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-blue-500 transition-colors">
                          <div className="flex flex-col items-center">
                            <FaBoxOpen className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">
                              {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC up to 10MB
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            disabled={isSubmitting}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg transition-all font-medium shadow-sm shadow-blue-200 
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Document'
                      )}
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">Your document has been sent successfully.</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedRequest(null);
                      setMessage('');
                      setSelectedFile(null);
                      setShowThankYou(false);
                    }}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Close
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationRequests;
