"use client";
import React, { useState } from "react";
import UserCard from "@/app/components/dashboard/UserCard";
import { FaBan } from "react-icons/fa";

// Define the User type
type User = {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  role: string;
  state: string;
  nationality: string;
  district: string;
  bloodGroup: string;
  gender: string;
  dateOfBirth: string;
  status: string;
  visitedCamps: number;
  points: number;
  organization: string;
};

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  // Mock data - replace with actual data fetching
  const [users, setUsers] = useState<User[]>([
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
    {
      id: "5",
      name: "Alex Thompson",
      email: "alex@example.com",
      mobileNumber: "+1 234 567 8904",
      role: "Volunteer",
      state: "Gujarat",
      nationality: "Indian",
      district: "Ahmedabad",
      bloodGroup: "A-",
      gender: "Male",
      dateOfBirth: "1993-07-22",
      status: "active",
      visitedCamps: 12,
      points: 3000,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily@example.com",
      mobileNumber: "+1 234 567 8905",
      role: "Event Coordinator",
      state: "Maharashtra",
      nationality: "Indian",
      district: "Pune",
      bloodGroup: "B-",
      gender: "Female",
      dateOfBirth: "1991-12-15",
      status: "active",
      visitedCamps: 15,
      points: 4200,
      organization: "Swapnapurti NGO"
    },
    {
      id: "7",
      name: "Robert Chen",
      email: "robert@example.com",
      mobileNumber: "+1 234 567 8906",
      role: "Volunteer",
      state: "Karnataka",
      nationality: "Indian",
      district: "Mysore",
      bloodGroup: "O-",
      gender: "Male",
      dateOfBirth: "1994-03-28",
      status: "active",
      visitedCamps: 7,
      points: 1800,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "8",
      name: "Priya Patel",
      email: "priya@example.com",
      mobileNumber: "+1 234 567 8907",
      role: "Event Manager",
      state: "Gujarat",
      nationality: "Indian",
      district: "Surat",
      bloodGroup: "AB+",
      gender: "Female",
      dateOfBirth: "1989-09-14",
      status: "active",
      visitedCamps: 20,
      points: 5000,
      organization: "Swapnapurti NGO"
    },
    {
      id: "9",
      name: "David Wilson",
      email: "david@example.com",
      mobileNumber: "+1 234 567 8908",
      role: "Accountant",
      state: "Maharashtra",
      nationality: "Indian",
      district: "Nagpur",
      bloodGroup: "A+",
      gender: "Male",
      dateOfBirth: "1987-11-30",
      status: "active",
      visitedCamps: 4,
      points: 900,
      organization: "Swapnapurti Trust"
    },
    {
      id: "10",
      name: "Sophia Lee",
      email: "sophia@example.com",
      mobileNumber: "+1 234 567 8909",
      role: "Promoting Manager",
      state: "Tamil Nadu",
      nationality: "Indian",
      district: "Coimbatore",
      bloodGroup: "B+",
      gender: "Female",
      dateOfBirth: "1996-02-17",
      status: "active",
      visitedCamps: 10,
      points: 2800,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "11",
      name: "Raj Malhotra",
      email: "raj@example.com",
      mobileNumber: "+1 234 567 8910",
      role: "Event Manager",
      state: "Punjab",
      nationality: "Indian",
      district: "Amritsar",
      bloodGroup: "O+",
      gender: "Male",
      dateOfBirth: "1990-08-25",
      status: "active",
      visitedCamps: 18,
      points: 4500,
      organization: "Swapnapurti NGO"
    },
    {
      id: "12",
      name: "Anita Kumar",
      email: "anita@example.com",
      mobileNumber: "+1 234 567 8911",
      role: "Volunteer",
      state: "Kerala",
      nationality: "Indian",
      district: "Kochi",
      bloodGroup: "A+",
      gender: "Female",
      dateOfBirth: "1993-11-05",
      status: "active",
      visitedCamps: 9,
      points: 2200,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "13",
      name: "Thomas Anderson",
      email: "thomas@example.com",
      mobileNumber: "+1 234 567 8912",
      role: "IT Manager",
      state: "Maharashtra",
      nationality: "Indian",
      district: "Pune",
      bloodGroup: "B-",
      gender: "Male",
      dateOfBirth: "1988-04-15",
      status: "active",
      visitedCamps: 6,
      points: 1500,
      organization: "Swapnapurti Trust"
    },
    {
      id: "14",
      name: "Meera Shah",
      email: "meera@example.com",
      mobileNumber: "+1 234 567 8913",
      role: "Event Coordinator",
      state: "Rajasthan",
      nationality: "Indian",
      district: "Jaipur",
      bloodGroup: "AB+",
      gender: "Female",
      dateOfBirth: "1992-07-30",
      status: "active",
      visitedCamps: 14,
      points: 3500,
      organization: "Swapnapurti NGO"
    },
    {
      id: "15",
      name: "Arjun Reddy",
      email: "arjun@example.com",
      mobileNumber: "+1 234 567 8914",
      role: "Volunteer",
      state: "Telangana",
      nationality: "Indian",
      district: "Hyderabad",
      bloodGroup: "O-",
      gender: "Male",
      dateOfBirth: "1995-09-12",
      status: "active",
      visitedCamps: 8,
      points: 2000,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "16",
      name: "Lisa Wang",
      email: "lisa@example.com",
      mobileNumber: "+1 234 567 8915",
      role: "Marketing Manager",
      state: "Karnataka",
      nationality: "Indian",
      district: "Bangalore",
      bloodGroup: "A-",
      gender: "Female",
      dateOfBirth: "1991-03-20",
      status: "active",
      visitedCamps: 11,
      points: 2700,
      organization: "Swapnapurti Trust"
    },
    {
      id: "17",
      name: "Vikram Singh",
      email: "vikram@example.com",
      mobileNumber: "+1 234 567 8916",
      role: "Field Coordinator",
      state: "Madhya Pradesh",
      nationality: "Indian",
      district: "Bhopal",
      bloodGroup: "B+",
      gender: "Male",
      dateOfBirth: "1989-12-08",
      status: "active",
      visitedCamps: 16,
      points: 4000,
      organization: "Swapnapurti NGO"
    },
    {
      id: "18",
      name: "Aisha Patel",
      email: "aisha@example.com",
      mobileNumber: "+1 234 567 8917",
      role: "Community Manager",
      state: "Gujarat",
      nationality: "Indian",
      district: "Vadodara",
      bloodGroup: "AB-",
      gender: "Female",
      dateOfBirth: "1994-06-25",
      status: "active",
      visitedCamps: 13,
      points: 3200,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "19",
      name: "Samuel Joseph",
      email: "samuel@example.com",
      mobileNumber: "+1 234 567 8918",
      role: "Program Director",
      state: "Kerala",
      nationality: "Indian",
      district: "Trivandrum",
      bloodGroup: "O+",
      gender: "Male",
      dateOfBirth: "1987-02-14",
      status: "active",
      visitedCamps: 22,
      points: 5500,
      organization: "Swapnapurti Trust"
    },
    {
      id: "20",
      name: "Neha Sharma",
      email: "neha@example.com",
      mobileNumber: "+1 234 567 8919",
      role: "Volunteer Coordinator",
      state: "Uttar Pradesh",
      nationality: "Indian",
      district: "Lucknow",
      bloodGroup: "A+",
      gender: "Female",
      dateOfBirth: "1993-10-18",
      status: "active",
      visitedCamps: 15,
      points: 3800,
      organization: "Swapnapurti NGO"
    },
    {
      id: "21",
      name: "Rahul Verma",
      email: "rahul@example.com",
      mobileNumber: "+1 234 567 8920",
      role: "Operations Manager",
      state: "Bihar",
      nationality: "Indian",
      district: "Patna",
      bloodGroup: "B+",
      gender: "Male",
      dateOfBirth: "1990-05-30",
      status: "active",
      visitedCamps: 17,
      points: 4300,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "22",
      name: "Maya Krishnan",
      email: "maya@example.com",
      mobileNumber: "+1 234 567 8921",
      role: "Social Media Manager",
      state: "Tamil Nadu",
      nationality: "Indian",
      district: "Madurai",
      bloodGroup: "AB+",
      gender: "Female",
      dateOfBirth: "1996-08-22",
      status: "active",
      visitedCamps: 7,
      points: 1800,
      organization: "Swapnapurti Trust"
    },
    {
      id: "23",
      name: "Karthik Rajan",
      email: "karthik@example.com",
      mobileNumber: "+1 234 567 8922",
      role: "Project Coordinator",
      state: "Karnataka",
      nationality: "Indian",
      district: "Mysore",
      bloodGroup: "O-",
      gender: "Male",
      dateOfBirth: "1992-01-15",
      status: "active",
      visitedCamps: 12,
      points: 3000,
      organization: "Swapnapurti NGO"
    },
    {
      id: "24",
      name: "Zara Khan",
      email: "zara@example.com",
      mobileNumber: "+1 234 567 8923",
      role: "Event Planner",
      state: "Maharashtra",
      nationality: "Indian",
      district: "Nashik",
      bloodGroup: "A-",
      gender: "Female",
      dateOfBirth: "1994-04-08",
      status: "active",
      visitedCamps: 9,
      points: 2300,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "25",
      name: "Dev Kapoor",
      email: "dev@example.com",
      mobileNumber: "+1 234 567 8924",
      role: "Resource Manager",
      state: "Haryana",
      nationality: "Indian",
      district: "Gurugram",
      bloodGroup: "B+",
      gender: "Male",
      dateOfBirth: "1991-11-28",
      status: "active",
      visitedCamps: 19,
      points: 4700,
      organization: "Swapnapurti Trust"
    }
  ]);

  // Add blacklist state with proper typing
  const [blacklistedUsers, setBlacklistedUsers] = useState<User[]>([]);
  const [showBlacklist, setShowBlacklist] = useState(false);

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
    if (showBlacklist) {
      setBlacklistedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        )
      );
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        )
      );
    }
    // Here you would typically make an API call to update the user in the backend
    console.log("Updating user:", id, updatedData);
  };

  const handleDeleteUser = (id: string) => {
    const userToBlacklist = users.find(user => user.id === id);
    if (userToBlacklist) {
      setBlacklistedUsers(prev => [...prev, { ...userToBlacklist, status: 'blacklisted' }]);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }
    // Here you would typically make an API call to update the user's status in the backend
    console.log("Blacklisting user:", id);
  };

  const handleRestoreUser = (id: string) => {
    const userToRestore = blacklistedUsers.find(user => user.id === id);
    if (userToRestore) {
      setUsers(prev => [...prev, { ...userToRestore, status: 'active' }]);
      setBlacklistedUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }
    console.log("Restoring user:", id);
  };

  const displayedUsers = showBlacklist ? blacklistedUsers : filteredUsers;

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = displayedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(displayedUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 md:ml-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowBlacklist(false)}
            className={`px-4 py-2 rounded-lg transition-all ${
              !showBlacklist
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active Users
          </button>
          <button
            onClick={() => setShowBlacklist(true)}
            className={`px-4 py-2 rounded-lg transition-all ${
              showBlacklist
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Blacklist
            {blacklistedUsers.length > 0 && (
              <span className="ml-2 bg-red-700 text-white text-xs px-2 py-1 rounded-full">
                {blacklistedUsers.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Only show filters for active users */}
      {!showBlacklist && (
        <>
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
        </>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentUsers.map((user) => (
          <UserCard
            key={user.id}
            {...user}
            onUpdate={handleUpdateUser}
            onDelete={showBlacklist ? handleRestoreUser : handleDeleteUser}
            isBlacklisted={showBlacklist}
          />
        ))}
      </div>

      {/* Show message when no users */}
      {displayedUsers.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          {showBlacklist ? "No blacklisted users" : "No users found"}
        </div>
      )}

      {/* Pagination */}
      {displayedUsers.length > 0 && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastUser, displayedUsers.length)}
            </span>{" "}
            of <span className="font-medium">{displayedUsers.length}</span> entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === number
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
