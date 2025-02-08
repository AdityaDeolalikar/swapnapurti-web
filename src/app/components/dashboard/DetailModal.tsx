import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[];
  type: 'state' | 'bloodGroup' | 'donation' | 'enrollment';
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
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(80vh-8rem)]">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                {renderTableHeaders()}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.values(item).map((value, i) => (
                      <td key={i} className="px-4 py-2">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DetailModal; 