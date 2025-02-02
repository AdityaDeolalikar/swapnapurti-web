"use client";
import React from "react";
import UserCard from "@/app/components/dashboard/UserCard";

const UsersPage = () => {
  // Mock data - replace with actual data fetching
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      mobileNumber: "+1 234 567 8900",
      role: "Admin",
      status: "active",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      mobileNumber: "+1 234 567 8901",
      role: "Event Manager",
      status: "active",
    },
    {
      name: "Mike Johnson",
      email: "mike@example.com",
      mobileNumber: "+1 234 567 8902",
      role: "Accountant",
      status: "inactive",
    },
    {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      mobileNumber: "+1 234 567 8903",
      role: "Promoting Manager",
      status: "active",
    },
  ];

  return (
    <div className="p-6 md:ml-5">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 border rounded-lg flex-grow"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            email={user.email}
            mobileNumber={user.mobileNumber}
            role={user.role}
            status={user.status as "active" | "inactive"}
          />
        ))}
      </div>

      {/* Pagination */}
    </div>
  );
};

export default UsersPage;
