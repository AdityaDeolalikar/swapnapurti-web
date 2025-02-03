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
    },
  ]);

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
        {users.map((user) => (
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
