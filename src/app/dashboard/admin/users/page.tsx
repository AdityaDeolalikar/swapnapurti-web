"use client";
import React, { useState } from "react";
import UserCard from "@/app/components/dashboard/UserCard";

const UsersPage = () => {
  // Mock data - replace with actual data fetching
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      mobileNumber: "+1 234 567 8900",
      role: "Admin",
      state: "Maharashtra",
      nationality: "Indian",
      district: "Mumbai",
      bloodGroup: "O+",
      gender: "Male",
      dateOfBirth: "1990-01-01",
      status: "active",
      visitedCamps: 5,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      mobileNumber: "+1 234 567 8901",
      role: "Event Manager",
      state: "Karnataka",
      nationality: "Indian",
      district: "Bangalore",
      bloodGroup: "A+",
      gender: "Female",
      dateOfBirth: "1992-05-15",
      status: "active",
      visitedCamps: 3,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      mobileNumber: "+1 234 567 8902",
      role: "Accountant",
      state: "Delhi",
      nationality: "Indian",
      district: "New Delhi",
      bloodGroup: "B+",
      gender: "Male",
      dateOfBirth: "1988-08-20",
      status: "inactive",
      visitedCamps: 0,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      mobileNumber: "+1 234 567 8903",
      role: "Promoting Manager",
      state: "Tamil Nadu",
      nationality: "Indian",
      district: "Chennai",
      bloodGroup: "AB+",
      gender: "Female",
      dateOfBirth: "1995-03-10",
      status: "active",
      visitedCamps: 8,
    },
  ]);

  // Add filter states
  const [districtFilter, setDistrictFilter] = useState('all');
  const [organizationFilter, setOrganizationFilter] = useState('all');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [visitedCampsFilter, setVisitedCampsFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique values for filters
  const districts = [...new Set(users.map(user => user.district))];
  const bloodGroups = [...new Set(users.map(user => user.bloodGroup))];
  const genders = [...new Set(users.map(user => user.gender))];
  // Create visited camps ranges
  const visitedCampsRanges = [
    { label: 'No camps', value: '0' },
    { label: '1-3 camps', value: '1-3' },
    { label: '4-7 camps', value: '4-7' },
    { label: '8+ camps', value: '8+' }
  ];
  // Mock organizations - replace with actual data
  const organizations = ['Organization 1', 'Organization 2', 'Organization 3'];

  // Filter users based on selected filters
  const filteredUsers = users.filter(user => {
    const matchesDistrict = districtFilter === 'all' || user.district === districtFilter;
    const matchesBloodGroup = bloodGroupFilter === 'all' || user.bloodGroup === bloodGroupFilter;
    const matchesOrganization = organizationFilter === 'all'; // Update this when organization data is available
    const matchesGender = genderFilter === 'all' || user.gender === genderFilter;
    
    // Handle visited camps filter
    const matchesVisitedCamps = visitedCampsFilter === 'all' || (() => {
      const camps = user.visitedCamps;
      switch(visitedCampsFilter) {
        case '0': return camps === 0;
        case '1-3': return camps >= 1 && camps <= 3;
        case '4-7': return camps >= 4 && camps <= 7;
        case '8+': return camps >= 8;
        default: return true;
      }
    })();

    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDistrict && matchesBloodGroup && matchesOrganization && matchesGender && matchesVisitedCamps && matchesSearch;
  });

  const handleUpdateUser = (id: string, updatedData: Partial<typeof users[0]>) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, ...updatedData } : user
      )
    );
    // Here you would typically make an API call to update the user in the backend
    console.log('Updating user:', id, updatedData);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    // Here you would typically make an API call to delete the user from the backend
    console.log('Deleting user:', id);
  };

  return (
    <div className="p-6 md:ml-5">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 border rounded-lg flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* District Filter */}
          <select
            className="p-2 border rounded-lg flex-1"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="all">All Districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          {/* Organization Filter */}
          <select
            className="p-2 border rounded-lg flex-1"
            value={organizationFilter}
            onChange={(e) => setOrganizationFilter(e.target.value)}
          >
            <option value="all">All Organizations</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Blood Group Filter */}
          <select
            className="p-2 border rounded-lg flex-1"
            value={bloodGroupFilter}
            onChange={(e) => setBloodGroupFilter(e.target.value)}
          >
            <option value="all">All Blood Groups</option>
            {bloodGroups.map((bloodGroup) => (
              <option key={bloodGroup} value={bloodGroup}>
                {bloodGroup}
              </option>
            ))}
          </select>

          {/* Gender Filter */}
          <select
            className="p-2 border rounded-lg flex-1"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">All Genders</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Visited Camps Filter */}
          <select
            className="p-2 border rounded-lg flex-1"
            value={visitedCampsFilter}
            onChange={(e) => setVisitedCampsFilter(e.target.value)}
          >
            <option value="all">All Camp Visits</option>
            {visitedCampsRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            {...user}
            onUpdate={handleUpdateUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>

      {/* Pagination */}
    </div>
  );
};

export default UsersPage;
