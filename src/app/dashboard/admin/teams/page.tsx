"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  avatar: string;
  department: string;
}

const TeamsPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Managing Director',
      email: 'sarah.johnson@swapnapurti.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      joinedDate: '2023-01-15',
      avatar: 'https://via.placeholder.com/150',
      department: 'Executive Management'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Accountant',
      email: 'michael.chen@swapnapurti.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      joinedDate: '2023-03-20',
      avatar: 'https://via.placeholder.com/150',
      department: 'Finance'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Event Manager',
      email: 'emily.rodriguez@swapnapurti.com',
      phone: '+1 (555) 345-6789',
      status: 'active',
      joinedDate: '2023-02-10',
      avatar: 'https://via.placeholder.com/150',
      department: 'Events'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      role: 'Promoting Manager',
      email: 'alex.thompson@swapnapurti.com',
      phone: '+1 (555) 456-7890',
      status: 'active',
      joinedDate: '2023-04-05',
      avatar: 'https://via.placeholder.com/150',
      department: 'Marketing'
    }
  ];

  const roles = ['all', 'Managing Director', 'Accountant', 'Event Manager', 'Promoting Manager'];

  const filteredMembers = teamMembers
    .filter(member => selectedRole === 'all' || member.role === selectedRole)
    .filter(member => 
      searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen md:ml-5">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-white rounded-2xl p-6 shadow-sm"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Team Management
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage your team members and their roles effectively
        </p>
      </motion.div>

      {/* Search and Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Role Filter and Add Member Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedRole === role
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                } border-2 border-transparent hover:border-blue-200`}
              >
                {role === 'all' ? 'All Roles' : role}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Member
          </motion.button>
        </div>
      </motion.div>

      {/* Team Members Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-100"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white group-hover:from-blue-50 group-hover:to-white transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-all duration-300 shadow-md"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-lg border-2 border-white ${
                    member.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                  } shadow-lg`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.department}</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover:shadow-md"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
                >
                  View Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-2.5 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-200 hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeamsPage; 