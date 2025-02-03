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
    <div className="p-4 md:p-6 md:ml-5">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Admin Dashboard
      </motion.h1>

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
