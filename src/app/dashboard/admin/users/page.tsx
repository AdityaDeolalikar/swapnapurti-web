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
      points: 1200,
      organization: "Swapnapurti Foundation"
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
      points: 800,
      organization: "Swapnapurti NGO"
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
      points: 150,
      organization: "Swapnapurti Trust"
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
      points: 2500,
      organization: "Swapnapurti Foundation"
    },
  ]);

  // Add filter states
  const [districtFilter, setDistrictFilter] = useState("all");
  const [organizationFilter, setOrganizationFilter] = useState("all");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [campVisitsFilter, setCampVisitsFilter] = useState({ min: "", max: "" });
  const [pointsFilter, setPointsFilter] = useState({ min: "", max: "" });
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get unique values for filters
  const districts = [...new Set(users.map((user) => user.district))];
  const bloodGroups = [...new Set(users.map((user) => user.bloodGroup))];
  const genders = [...new Set(users.map((user) => user.gender))];
  // Mock organizations - replace with actual data
  const organizations = ["Organization 1", "Organization 2", "Organization 3"];

  // Filter users based on selected filters
  const filteredUsers = users.filter((user) => {
    const matchesDistrict =
      districtFilter === "all" || user.district === districtFilter;
    const matchesBloodGroup =
      bloodGroupFilter === "all" || user.bloodGroup === bloodGroupFilter;
    const matchesOrganization = organizationFilter === "all"; // Update this when organization data is available
    const matchesGender =
      genderFilter === "all" || user.gender === genderFilter;

    // Handle visited camps filter with min-max range
    const matchesVisitedCamps = (() => {
      const { min, max } = campVisitsFilter;
      if (!min && !max) return true;

      const visits = user.visitedCamps;
      const minVisits = min === "" ? -Infinity : parseInt(min);
      const maxVisits = max === "" ? Infinity : parseInt(max);

      return visits >= minVisits && visits <= maxVisits;
    })();

    // Handle points filter
    const matchesPoints = (() => {
      const { min, max } = pointsFilter;
      if (!min && !max) return true;

      const points = user.points;
      const minPoints = min === "" ? -Infinity : parseInt(min);
      const maxPoints = max === "" ? Infinity : parseInt(max);

      return points >= minPoints && points <= maxPoints;
    })();

    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesDistrict &&
      matchesBloodGroup &&
      matchesOrganization &&
      matchesGender &&
      matchesVisitedCamps &&
      matchesPoints &&
      matchesSearch
    );
  });

  const handleUpdateUser = (
    id: string,
    updatedData: Partial<(typeof users)[0]>
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      )
    );
    // Here you would typically make an API call to update the user in the backend
    console.log("Updating user:", id, updatedData);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    // Here you would typically make an API call to delete the user from the backend
    console.log("Deleting user:", id);
  };

  return (
    <div className="p-6 md:ml-5">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4 w-full">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 border rounded-lg w-full"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value: string = e.target.value.toString();
              // Remove any non-string characters and convert to string
              const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
              setSearchQuery(sanitizedValue);
            }}
            pattern="[a-zA-Z\s]*"
            title="Only letters and spaces are allowed"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* District Filter */}
          <select
            className="p-2 border rounded-lg w-full"
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
            className="p-2 border rounded-lg w-full"
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

          {/* Blood Group Filter */}
          <select
            className="p-2 border rounded-lg w-full"
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
            className="p-2 border rounded-lg w-full"
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

        {/* Additional Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Visited Camps Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
            <label className="text-sm font-medium whitespace-nowrap min-w-fit">Camp Visits:</label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                placeholder="Min"
                className="p-2 border rounded-lg w-full sm:w-28"
                value={campVisitsFilter.min}
                onChange={(e) =>
                  setCampVisitsFilter((prev) => ({ ...prev, min: e.target.value }))
                }
                min="0"
              />
              <span className="text-gray-500 text-sm px-1">to</span>
              <input
                type="number"
                placeholder="Max"
                className="p-2 border rounded-lg w-full sm:w-28"
                value={campVisitsFilter.max}
                onChange={(e) =>
                  setCampVisitsFilter((prev) => ({ ...prev, max: e.target.value }))
                }
                min="0"
              />
            </div>
          </div>

          {/* Points Range Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3  w-full">
            <label className="text-sm font-medium whitespace-nowrap min-w-fit">Points Range:</label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                placeholder="Min"
                className="p-2 border rounded-lg w-full sm:w-28"
                value={pointsFilter.min}
                onChange={(e) =>
                  setPointsFilter((prev) => ({ ...prev, min: e.target.value }))
                }
                min="0"
              />
              <span className="text-gray-500 text-sm px-1">to</span>
              <input
                type="number"
                placeholder="Max"
                className="p-2 border rounded-lg w-full sm:w-28"
                value={pointsFilter.max}
                onChange={(e) =>
                  setPointsFilter((prev) => ({ ...prev, max: e.target.value }))
                }
                min="0"
              />
            </div>
          </div>
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
