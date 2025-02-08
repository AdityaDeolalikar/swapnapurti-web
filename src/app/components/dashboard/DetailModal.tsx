import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, string | number>[];
  type: 'state' | 'bloodGroup' | 'donation' | 'enrollment' | 'requests';
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, title, data, type }) => {
  if (!isOpen) return null;

  const renderTableHeaders = () => {
    switch (type) {
      case 'state':
        return (
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">District</th>
            <th className="px-4 py-2">Contact</th>
          </tr>
        );
      case 'bloodGroup':
        return (
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Blood Group</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        );
      case 'donation':
        return (
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contribution</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        );
      case 'enrollment':
        return (
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Program</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Enrollment Date</th>
          </tr>
        );
      case 'requests':
        return (
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
          className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[calc(80vh-12rem)] overflow-y-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {renderTableHeaders()}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      {Object.values(item).map((value, i) => (
                        <td key={i} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DetailModal; 