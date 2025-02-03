"use client";
import React, { useState } from "react";
import Image from 'next/image'
import admin from '../../../../public/icons/admin.png'

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  role?: string;
  state: string;
  nationality: string;
  district: string;
  bloodGroup: string;
  gender: string;
  dateOfBirth: string;
  visitedCamps?: string[];
  avatarUrl?: string;
  onUpdate: (id: string, updatedData: Partial<UserCardProps>) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  mobileNumber,
  role = "User",
  state,
  nationality,
  district,
  bloodGroup,
  gender,
  dateOfBirth,
  visitedCamps = [],
  avatarUrl = "https://via.placeholder.com/40",
  onUpdate,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name,
    email,
    mobileNumber,
    role,
    state,
    nationality,
    district,
    bloodGroup,
    gender,
    dateOfBirth,
  });

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(id);
    }
  };

  const handleSave = () => {
    onUpdate(id, editedData);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={admin} alt="" className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <img src={avatarUrl} alt={name} className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      name
                    )}
                  </h3>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="text-gray-800">{id}</p>
                  </div>
                  {isEditing ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <input
                          type="text"
                          name="name"
                          value={editedData.name}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <input
                          type="email"
                          name="email"
                          value={editedData.email}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mobile</p>
                        <input
                          type="text"
                          name="mobileNumber"
                          value={editedData.mobileNumber}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <select
                          name="role"
                          value={editedData.role}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                          <option value="Event Manager">Event Manager</option>
                          <option value="Accountant">Accountant</option>
                          <option value="Promoting Manager">Promoting Manager</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">State</p>
                        <input
                          type="text"
                          name="state"
                          value={editedData.state}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">District</p>
                        <input
                          type="text"
                          name="district"
                          value={editedData.district}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nationality</p>
                        <input
                          type="text"
                          name="nationality"
                          value={editedData.nationality}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blood Group</p>
                        <select
                          name="bloodGroup"
                          value={editedData.bloodGroup}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <select
                          name="gender"
                          value={editedData.gender}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={editedData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 text-gray-800"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-gray-800">{name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-800">{email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mobile</p>
                        <p className="text-gray-800">{mobileNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="text-gray-800">{role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">State</p>
                        <p className="text-gray-800">{state}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">District</p>
                        <p className="text-gray-800">{district}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nationality</p>
                        <p className="text-gray-800">{nationality}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blood Group</p>
                        <p className="text-gray-800">{bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="text-gray-800">{gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-gray-800">{dateOfBirth}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Visited Camps Section */}
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Visited Camps</p>
                  {visitedCamps.length > 0 ? (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <ul className="list-disc list-inside">
                        {visitedCamps.map((camp, index) => (
                          <li key={index} className="text-gray-800">{camp}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-800">No camps visited yet</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
