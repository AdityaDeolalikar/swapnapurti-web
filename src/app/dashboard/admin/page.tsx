"use client";
import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title 
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

ChartJS.register(
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Tooltip, 
  Legend, 
  Title
);

const AdminDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({
    district: '',
    bloodGroup: '',
    organization: '',
    gender: ''
  });
  
  // Mock data for filters - replace with actual data from your backend
  const [filterOptions] = useState({
    districts: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    organizations: ['Org 1', 'Org 2', 'Org 3', 'Org 4'],
    genders: ['Male', 'Female', 'Other']
  });

  // Mock user data - replace with actual API call
  const [userData] = useState([
    { id: 1, name: 'John Doe', district: 'Mumbai', bloodGroup: 'A+', organization: 'Org 1', gender: 'Male' },
    { id: 2, name: 'Jane Smith', district: 'Pune', bloodGroup: 'B+', organization: 'Org 2', gender: 'Female' },
    { id: 3, name: 'Jane Smith', district: 'Nagpur', bloodGroup: 'O+', organization: 'Org 2', gender: 'Female' },
    { id: 4, name: 'Jane Smith', district: 'Nashik', bloodGroup: 'A-', organization: 'Org 2', gender: 'Female' },
    { id: 5, name: 'Jane Smith', district: 'Ahilyanagar', bloodGroup: 'A-', organization: 'Org 2', gender: 'Female' },
    // Add more mock data as needed
  ]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const exportToExcel = () => {
    // Filter data based on selected filters
    const filteredData = userData.filter(user => {
      return (!filters.district || user.district === filters.district) &&
             (!filters.bloodGroup || user.bloodGroup === filters.bloodGroup) &&
             (!filters.organization || user.organization === filters.organization) &&
             (!filters.gender || user.gender === filters.gender);
    });

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    // Save file
    XLSX.writeFile(wb, "user_data.xlsx");
  };

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock data - replace with actual data from your backend
  const [stats] = useState({
    totalUsers: 150,
    activeEvents: 12,
    totalBookings: 89,
    totalOrganizations: 25,
  });

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' as const : 'right' as const,
        labels: {
          boxWidth: isMobile ? 12 : 20,
          padding: isMobile ? 8 : 20,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        padding: 10,
      }
    }
  };

  // State distribution data
  const stateData = {
    labels: ['Maharashtra', 'Gujarat', 'Karnataka', 'Delhi', 'Tamil Nadu'],
    datasets: [{
      data: [45, 25, 20, 15, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }]
  };

  // Blood group data
  const bloodGroupData = {
    labels: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
    datasets: [{
      data: [30, 25, 20, 10, 5, 4, 4, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(201, 203, 207, 0.8)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderWidth: 1,
    }]
  };

  // Monthly enrollments data
  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Enrollments',
      data: [65, 59, 80, 81, 56, 90],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.4,
      pointRadius: isMobile ? 3 : 5,
      pointHoverRadius: isMobile ? 5 : 8,
    }]
  };

  // Line chart specific options
  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    }
  };

  return (
    <div className="p-4 md:p-3 md:ml-1">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Admin Dashboard
      </motion.h1>

      {/* Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow p-4 md:p-6 mb-6"
      >
        <h2 className="text-lg md:text-xl font-semibold mb-4">Export Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select
            className="w-full p-2 border rounded-md"
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
          >
            <option value="">Select District</option>
            {filterOptions.districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded-md"
            value={filters.bloodGroup}
            onChange={(e) => handleFilterChange('bloodGroup', e.target.value)}
          >
            <option value="">Select Blood Group</option>
            {filterOptions.bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded-md"
            value={filters.organization}
            onChange={(e) => handleFilterChange('organization', e.target.value)}
          >
            <option value="">Select Organization</option>
            {filterOptions.organizations.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded-md"
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            {filterOptions.genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Export to Excel
        </button>

        {/* Preview Table */}
        <div className="mt-6">
          <div className="max-h-[240px] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userData
                  .filter(user => {
                    return (!filters.district || user.district === filters.district) &&
                           (!filters.bloodGroup || user.bloodGroup === filters.bloodGroup) &&
                           (!filters.organization || user.organization === filters.organization) &&
                           (!filters.gender || user.gender === filters.gender);
                  })
                  .map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.district}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.bloodGroup}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.organization}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.gender}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {userData.filter(user => {
            return (!filters.district || user.district === filters.district) &&
                   (!filters.bloodGroup || user.bloodGroup === filters.bloodGroup) &&
                   (!filters.organization || user.organization === filters.organization) &&
                   (!filters.gender || user.gender === filters.gender);
          }).length === 0 && (
            <div className="text-center py-4 text-gray-500">No data matches the selected filters</div>
          )}
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-sm md:text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-xl md:text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-sm md:text-lg font-semibold mb-2">Active Events</h3>
          <p className="text-xl md:text-3xl font-bold text-green-600">{stats.activeEvents}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-sm md:text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-xl md:text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-sm md:text-lg font-semibold mb-2">Organizations</h3>
          <p className="text-xl md:text-3xl font-bold text-orange-600">{stats.totalOrganizations}</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* State Distribution Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-4 md:p-6 rounded-lg shadow"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">State Distribution</h2>
          <div className="h-[250px] md:h-[300px] flex items-center justify-center">
            <Pie data={stateData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Blood Group Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-4 md:p-6 rounded-lg shadow"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">Blood Group Classification</h2>
          <div className="h-[250px] md:h-[300px] flex items-center justify-center">
            <Pie data={bloodGroupData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Monthly Enrollments Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-4 md:p-6 rounded-lg shadow col-span-1 md:col-span-2"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">Monthly Enrollments</h2>
          <div className="h-[250px] md:h-[300px]">
            <Line 
              data={enrollmentData} 
              options={lineChartOptions}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
