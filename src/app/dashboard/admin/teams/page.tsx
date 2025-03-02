"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import admin from '../../../../../public/icons/admin.png';
import { FaSearch, FaFilter, FaPlus, FaEnvelope, FaPhone, FaCalendar, FaBuilding, FaTimes, FaCamera } from 'react-icons/fa';

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
  bloodGroup: string;
  organization?: string;
  district: string;
}

interface PendingMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
}

const TeamsPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<TeamMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'select' | 'manual'>('select');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [newMemberData, setNewMemberData] = useState<Partial<TeamMember>>({
    status: 'active',
    joinedDate: new Date().toISOString().split('T')[0],
  });
  const [pendingMemberSearchQuery, setPendingMemberSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedOrganization, setSelectedOrganization] = useState<string>('all');
  const [isDistrictFilterOpen, setIsDistrictFilterOpen] = useState(false);
  const [isOrganizationFilterOpen, setIsOrganizationFilterOpen] = useState(false);

  // Convert teamMembers to state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Managing Director',
      email: 'sarah.johnson@swapnapurti.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      joinedDate: '2023-01-15',
      avatar: 'https://via.placeholder.com/150',
      department: 'Executive Management',
      bloodGroup: 'O+',
      organization: 'Swapnapurti Academy',
      district: 'Pune'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Finance Manager',
      email: 'michael.chen@swapnapurti.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      joinedDate: '2023-03-20',
      avatar: 'https://via.placeholder.com/150',
      department: 'Finance',
      bloodGroup: 'A+',
      district: 'Mumbai'
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
      department: 'Events',
      bloodGroup: 'B+',
      organization: 'Event Solutions Inc',
      district: 'Nashik'
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
      department: 'Marketing',
      bloodGroup: 'AB+',
      district: 'Thane'
    },
    {
      id: '5',
      name: 'Rahul Sharma',
      role: 'Sales Manager',
      email: 'rahul.sharma@swapnapurti.com',
      phone: '+91 98765 43213',
      status: 'active',
      joinedDate: '2023-05-15',
      avatar: 'https://via.placeholder.com/150',
      department: 'Sales',
      bloodGroup: 'B-',
      organization: 'Swapnapurti Academy',
      district: 'Pune'
    },
    {
      id: '6',
      name: 'Priya Desai',
      role: 'Event Manager',
      email: 'priya.desai@swapnapurti.com',
      phone: '+91 98765 43214',
      status: 'active',
      joinedDate: '2023-06-01',
      avatar: 'https://via.placeholder.com/150',
      department: 'Events',
      bloodGroup: 'O-',
      district: 'Mumbai'
    },
    {
      id: '7',
      name: 'David Wilson',
      role: 'Finance Manager',
      email: 'david.wilson@swapnapurti.com',
      phone: '+1 (555) 567-8901',
      status: 'inactive',
      joinedDate: '2023-03-25',
      avatar: 'https://via.placeholder.com/150',
      department: 'Finance',
      bloodGroup: 'A-',
      district: 'Nashik'
    },
    {
      id: '8',
      name: 'Anita Patel',
      role: 'Promoting Manager',
      email: 'anita.patel@swapnapurti.com',
      phone: '+91 98765 43215',
      status: 'active',
      joinedDate: '2023-07-10',
      avatar: 'https://via.placeholder.com/150',
      department: 'Marketing',
      bloodGroup: 'AB-',
      organization: 'Marketing Solutions',
      district: 'Thane'
    },
    {
      id: '9',
      name: 'James Anderson',
      role: 'Sales Manager',
      email: 'james.anderson@swapnapurti.com',
      phone: '+1 (555) 678-9012',
      status: 'active',
      joinedDate: '2023-08-01',
      avatar: 'https://via.placeholder.com/150',
      department: 'Sales',
      bloodGroup: 'O+',
      district: 'Pune'
    },
    {
      id: '10',
      name: 'Neha Gupta',
      role: 'Event Manager',
      email: 'neha.gupta@swapnapurti.com',
      phone: '+91 98765 43216',
      status: 'active',
      joinedDate: '2023-09-15',
      avatar: 'https://via.placeholder.com/150',
      department: 'Events',
      bloodGroup: 'B+',
      organization: 'Event Solutions Inc',
      district: 'Mumbai'
    },
    {
      id: '11',
      name: 'Robert Martinez',
      role: 'Finance Manager',
      email: 'robert.martinez@swapnapurti.com',
      phone: '+1 (555) 789-0123',
      status: 'active',
      joinedDate: '2023-10-01',
      avatar: 'https://via.placeholder.com/150',
      department: 'Finance',
      bloodGroup: 'A+',
      district: 'Nashik'
    },
    {
      id: '12',
      name: 'Sneha Kumar',
      role: 'Promoting Manager',
      email: 'sneha.kumar@swapnapurti.com',
      phone: '+91 98765 43217',
      status: 'active',
      joinedDate: '2023-11-20',
      avatar: 'https://via.placeholder.com/150',
      department: 'Marketing',
      bloodGroup: 'AB+',
      organization: 'Marketing Solutions',
      district: 'Thane'
    },
    {
      id: '13',
      name: 'William Taylor',
      role: 'Sales Manager',
      email: 'william.taylor@swapnapurti.com',
      phone: '+1 (555) 890-1234',
      status: 'inactive',
      joinedDate: '2023-12-05',
      avatar: 'https://via.placeholder.com/150',
      department: 'Sales',
      bloodGroup: 'O-',
      district: 'Pune'
    },
    {
      id: '14',
      name: 'Meera Shah',
      role: 'Event Manager',
      email: 'meera.shah@swapnapurti.com',
      phone: '+91 98765 43218',
      status: 'active',
      joinedDate: '2024-01-10',
      avatar: 'https://via.placeholder.com/150',
      department: 'Events',
      bloodGroup: 'B-',
      organization: 'Event Solutions Inc',
      district: 'Mumbai'
    },
    {
      id: '15',
      name: 'Thomas Brown',
      role: 'Managing Director',
      email: 'thomas.brown@swapnapurti.com',
      phone: '+1 (555) 901-2345',
      status: 'active',
      joinedDate: '2024-02-01',
      avatar: 'https://via.placeholder.com/150',
      department: 'Executive Management',
      bloodGroup: 'A-',
      organization: 'Swapnapurti Academy',
      district: 'Nashik'
    }
  ]);

  // Sample pending members data (in real app, this would come from an API)
  const pendingMembers: PendingMember[] = [
    {
      id: 'p1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+91 98765 43210',
      district: 'Pune'
    },
    {
      id: 'p2',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98765 43211',
      district: 'Mumbai'
    },
    {
      id: 'p3',
      name: 'Raj Kumar',
      email: 'raj.kumar@example.com',
      phone: '+91 98765 43212',
      district: 'Nashik'
    }
  ];

  const roles = ['all', 'Managing Director', 'Finance Manager', 'Event Manager', 'Promoting Manager', 'Sales Manager'];

  // Get unique districts and organizations from team members
  const districts = ['all', ...new Set(teamMembers.map(member => member.district))];
  const organizations = ['all', ...new Set(teamMembers.filter(member => member.organization).map(member => member.organization as string))];

  const filteredMembers = teamMembers
    .filter(member => selectedRole === 'all' || member.role === selectedRole)
    .filter(member => selectedDistrict === 'all' || member.district === selectedDistrict)
    .filter(member => selectedOrganization === 'all' || member.organization === selectedOrganization)
    .filter(member => 
      searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Filter pending members based on search query
  const filteredPendingMembers = pendingMembers.filter(member => 
    pendingMemberSearchQuery === '' ||
    member.name.toLowerCase().includes(pendingMemberSearchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(pendingMemberSearchQuery.toLowerCase()) ||
    member.district.toLowerCase().includes(pendingMemberSearchQuery.toLowerCase())
  );

  const handleViewDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleEditProfile = (member: TeamMember) => {
    setEditFormData(member);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;

    // Update the team members array with the edited data
    setTeamMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === editFormData.id ? editFormData : member
      )
    );

    // If the edited member is currently selected in the details view, update that too
    if (selectedMember && selectedMember.id === editFormData.id) {
      setSelectedMember(editFormData);
    }

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out';
    successMessage.textContent = 'Profile updated successfully!';
    document.body.appendChild(successMessage);

    // Remove the success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);

    closeEditModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleAddMember = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddMode('select');
    setNewMemberData({
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
    });
  };

  const handlePendingMemberSelect = (member: PendingMember) => {
    setNewMemberData({
      ...newMemberData,
      name: member.name,
      email: member.email,
      phone: member.phone,
      district: member.district,
    });
  };

  const handleNewMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a new ID (in production, this would be handled by the backend)
    const newId = `${Date.now()}`;
    
    const newMember: TeamMember = {
      id: newId,
      name: newMemberData.name || '',
      role: newMemberData.role || '',
      email: newMemberData.email || '',
      phone: newMemberData.phone || '',
      status: newMemberData.status as 'active' | 'inactive',
      joinedDate: newMemberData.joinedDate || new Date().toISOString().split('T')[0],
      avatar: 'https://via.placeholder.com/150',
      department: newMemberData.department || '',
      bloodGroup: newMemberData.bloodGroup || '',
      district: newMemberData.district || '',
      ...(newMemberData.organization && { organization: newMemberData.organization })
    };

    setTeamMembers(prev => [...prev, newMember]);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out';
    successMessage.textContent = 'New member added successfully!';
    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 3000);

    closeAddModal();
  };

  const handleNewMemberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMemberData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
              <p className="text-sm text-gray-500">Manage and organize your team members</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddMember}
              className="inline-flex items-center px-4 py-2 bg-[#03626b] text-white rounded-lg hover:bg-[#024950] transition-colors duration-200"
            >
              <FaPlus className="mr-2" />
              Add New Member
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="relative flex-1 mb-4">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
          />
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Role Filter */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsDistrictFilterOpen(false);
                setIsOrganizationFilterOpen(false);
              }}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FaFilter className="mr-2 text-gray-500" />
              <span className="text-gray-700">Role: </span>
              <span className="ml-1 font-medium text-[#03626b]">
                {selectedRole === 'all' ? 'All' : selectedRole}
              </span>
            </motion.button>

            {/* Role Dropdown */}
            {isFilterOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedRole === role
                        ? 'bg-[#03626b] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {role === 'all' ? 'All Roles' : role}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* District Filter */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsDistrictFilterOpen(!isDistrictFilterOpen);
                setIsFilterOpen(false);
                setIsOrganizationFilterOpen(false);
              }}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FaBuilding className="mr-2 text-gray-500" />
              <span className="text-gray-700">District: </span>
              <span className="ml-1 font-medium text-[#03626b]">
                {selectedDistrict === 'all' ? 'All' : selectedDistrict}
              </span>
            </motion.button>

            {/* District Dropdown */}
            {isDistrictFilterOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => {
                      setSelectedDistrict(district);
                      setIsDistrictFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedDistrict === district
                        ? 'bg-[#03626b] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {district === 'all' ? 'All Districts' : district}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Organization Filter */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsOrganizationFilterOpen(!isOrganizationFilterOpen);
                setIsFilterOpen(false);
                setIsDistrictFilterOpen(false);
              }}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FaBuilding className="mr-2 text-gray-500" />
              <span className="text-gray-700">Organization: </span>
              <span className="ml-1 font-medium text-[#03626b]">
                {selectedOrganization === 'all' ? 'All' : selectedOrganization}
              </span>
            </motion.button>

            {/* Organization Dropdown */}
            {isOrganizationFilterOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {organizations.map((org) => (
                  <button
                    key={org}
                    onClick={() => {
                      setSelectedOrganization(org);
                      setIsOrganizationFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedOrganization === org
                        ? 'bg-[#03626b] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {org === 'all' ? 'All Organizations' : org}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters Button - Only show if any filter is active */}
          {(selectedRole !== 'all' || selectedDistrict !== 'all' || selectedOrganization !== 'all') && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedRole('all');
                setSelectedDistrict('all');
                setSelectedOrganization('all');
              }}
              className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
              <FaTimes className="mr-2" />
              Clear Filters
            </motion.button>
          )}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={admin}
                      alt={member.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        member.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-[#03626b] font-medium">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.department}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEditProfile(member)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-[#03626b] bg-[#03626b]/5 rounded-lg hover:bg-[#03626b]/10 transition-colors duration-200"
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewDetails(member)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {filteredMembers.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-2 py-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg transition-colors duration-200 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                // Show ellipsis for many pages
                if (totalPages > 7) {
                  if (
                    number === 1 ||
                    number === totalPages ||
                    (number >= currentPage - 1 && number <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                          currentPage === number
                            ? 'bg-[#03626b] text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {number}
                      </button>
                    );
                  } else if (
                    number === currentPage - 2 ||
                    number === currentPage + 2
                  ) {
                    return (
                      <span key={number} className="text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                // Show all pages if total pages <= 7
                return (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                      currentPage === number
                        ? 'bg-[#03626b] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {number}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg transition-colors duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Team Member Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <Image
                  src={admin}
                  alt={selectedMember.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
                  <p className="text-[#03626b] font-medium">{selectedMember.role}</p>
                  <p className="text-gray-500">{selectedMember.department}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-50">
                      <span className="text-red-600 font-semibold">{selectedMember.bloodGroup}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Blood Group</p>
                      <p className="text-gray-900">{selectedMember.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaBuilding className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">District</p>
                      <p className="text-gray-900">{selectedMember.district}</p>
                    </div>
                  </div>
                  {selectedMember.organization && (
                    <div className="flex items-center space-x-3 col-span-2">
                      <FaBuilding className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p className="text-gray-900">{selectedMember.organization}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedMember.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{selectedMember.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Joined Date</p>
                      <p className="text-gray-900">{new Date(selectedMember.joinedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* Status Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Status</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedMember.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedMember.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Team Member</h2>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Image
                    src={admin}
                    alt={editFormData.name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-[#03626b] text-white p-2 rounded-full hover:bg-[#024950] transition-colors"
                  >
                    <FaCamera size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500">Click to change profile picture</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                  >
                    {roles.filter(role => role !== 'all').map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={editFormData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={editFormData.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input
                      type="text"
                      name="district"
                      value={editFormData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={editFormData.organization || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    placeholder="Enter organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#03626b] text-white rounded-lg hover:bg-[#024950] transition-colors duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Team Member</h2>
              <button
                onClick={closeAddModal}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Mode Selection */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setAddMode('select')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    addMode === 'select'
                      ? 'bg-[#03626b] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Select Existing
                </button>
                <button
                  onClick={() => setAddMode('manual')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    addMode === 'manual'
                      ? 'bg-[#03626b] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Manual Entry
                </button>
              </div>

              {addMode === 'select' && (
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-700">Select from Pending Members</h3>
                  
                  {/* Search Bar for Pending Members */}
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or district..."
                      value={pendingMemberSearchQuery}
                      onChange={(e) => setPendingMemberSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    {filteredPendingMembers.length > 0 ? (
                      filteredPendingMembers.map((member) => (
                        <button
                          key={member.id}
                          onClick={() => handlePendingMemberSelect(member)}
                          className="w-full p-4 rounded-lg border border-gray-200 hover:border-[#03626b] transition-colors text-left group"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-[#03626b]">
                                {member.name}
                              </h4>
                              <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                            <span className="text-sm text-gray-500">{member.district}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No matching members found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleNewMemberSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newMemberData.name || ''}
                      onChange={handleNewMemberInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="role"
                      value={newMemberData.role || ''}
                      onChange={handleNewMemberInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    >
                      <option value="">Select Role</option>
                      {roles.filter(role => role !== 'all').map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                      <select
                        name="bloodGroup"
                        value={newMemberData.bloodGroup || ''}
                        onChange={handleNewMemberInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                      >
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <input
                        type="text"
                        name="district"
                        value={newMemberData.district || ''}
                        onChange={handleNewMemberInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                      />
                    </div>
                  </div>

                 

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization (Optional)
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={newMemberData.organization || ''}
                      onChange={handleNewMemberInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                      placeholder="Enter organization name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newMemberData.email || ''}
                      onChange={handleNewMemberInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newMemberData.phone || ''}
                      onChange={handleNewMemberInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03626b] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#03626b] text-white rounded-lg hover:bg-[#024950] transition-colors duration-200"
                  >
                    Add Member
                  </button>
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage; 