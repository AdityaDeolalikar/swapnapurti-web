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
  BarElement,
  Title,
  ChartEvent,
  ActiveElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import DetailModal from '@/app/components/dashboard/DetailModal';
import { useRouter } from 'next/navigation';

ChartJS.register(
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  Tooltip, 
  Legend, 
  Title
);

// Define types for user details
interface StateUser {
  name: string;
  district: string;
  contact: string;
}

interface BloodGroupUser {
  name: string;
  bloodGroup: string;
  contact: string;
  date: string;
}

interface DonationUser {
  name: string;
  contribution: string;
  contact: string;
  date: string;
}

interface EnrollmentUser {
  name: string;
  enrollmentDate: string;
  contact: string;
  program: string;
}

interface RequestUser {
  name: string;
  contact: string;
  date: string;
  program?: string;
  position?: string;
  event?: string;
}

type UserData = StateUser | BloodGroupUser | DonationUser | EnrollmentUser | RequestUser;

interface UserDetails {
  state: Record<string, StateUser[]>;
  bloodGroup: Record<string, BloodGroupUser[]>;
  donation: Record<string, DonationUser[]>;
  enrollment: Record<string, EnrollmentUser[]>;
  requests: Record<string, RequestUser[]>;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  data: UserData[];
  type: 'state' | 'bloodGroup' | 'donation' | 'enrollment' | 'requests';
}

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

  const router = useRouter();

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
      },
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
      label: 'Blood Group Distribution',
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
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
        'rgba(255, 99, 132, 0.8)',
      ],
      borderWidth: 1,
    }]
  };

  // Donation Classification data
  const donationData = {
    labels: ['Money', 'Goods', 'Services'],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',  // Teal
        'rgba(255, 159, 64, 0.8)',  // Orange
        'rgba(153, 102, 255, 0.8)', // Purple
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }]
  };

  // Monthly enrollments data
  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Enrollments',
      data: [65, 59, 80, 81, 56, 90, 75, 85, 70, 88, 92, 95],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',   // January - Pink
        'rgba(54, 162, 235, 0.8)',   // February - Blue
        'rgba(255, 206, 86, 0.8)',   // March - Yellow
        'rgba(75, 192, 192, 0.8)',   // April - Teal
        'rgba(153, 102, 255, 0.8)',  // May - Purple
        'rgba(255, 159, 64, 0.8)',   // June - Orange
        'rgba(255, 99, 255, 0.8)',   // July - Magenta
        'rgba(64, 192, 87, 0.8)',    // August - Green
        'rgba(255, 127, 80, 0.8)',   // September - Coral
        'rgba(0, 191, 255, 0.8)',    // October - Deep Sky Blue
        'rgba(218, 112, 214, 0.8)',  // November - Orchid
        'rgba(106, 90, 205, 0.8)'    // December - Slate Blue
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 255, 1)',
        'rgba(64, 192, 87, 1)',
        'rgba(255, 127, 80, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(218, 112, 214, 1)',
        'rgba(106, 90, 205, 1)'
      ],
      borderWidth: 1,
    }]
  };

  // Update the requestsData object
  const requestsData = {
    labels: ['Internship', 'Apprenticeship', 'Job', 'Event Participant'],
    datasets: [{
      data: [35, 25, 20, 20],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',  // Blue
        'rgba(255, 206, 86, 0.8)',  // Yellow
        'rgba(75, 192, 192, 0.8)',  // Teal
        'rgba(255, 99, 132, 0.8)',  // Pink
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }]
  };

  // Bar chart specific options
  const barChartOptions = {
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

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    data: [],
    type: 'state'
  });

  // Mock user details data
  const mockUserDetails: UserDetails = {
    state: {
      'Maharashtra': [
        { name: 'John Doe', district: 'Mumbai', contact: '+91 9876543210' },
        { name: 'Jane Smith', district: 'Pune', contact: '+91 9876543211' },
      ],
      'Gujarat': [
        { name: 'Alice Johnson', district: 'Ahmedabad', contact: '+91 9876543212' },
        { name: 'Bob Wilson', district: 'Surat', contact: '+91 9876543213' },
      ],
      'Karnataka': [
        { name: 'Charlie Brown', district: 'Bangalore', contact: '+91 9876543214' },
        { name: 'Diana Prince', district: 'Mysore', contact: '+91 9876543215' },
      ],
      'Delhi': [
        { name: 'Edward Norton', district: 'New Delhi', contact: '+91 9876543216' },
        { name: 'Frank Castle', district: 'South Delhi', contact: '+91 9876543217' },
      ],
      'Tamil Nadu': [
        { name: 'George Lucas', district: 'Chennai', contact: '+91 9876543218' },
        { name: 'Helen Troy', district: 'Coimbatore', contact: '+91 9876543219' },
      ],
    },
    bloodGroup: {
      'A+': [
        { name: 'Mike Ross', bloodGroup: 'A+', contact: '+91 9876543220', date: '2024-03-15' },
        { name: 'Rachel Zane', bloodGroup: 'A+', contact: '+91 9876543221', date: '2024-03-14' },
      ],
      'B+': [
        { name: 'Harvey Specter', bloodGroup: 'B+', contact: '+91 9876543222', date: '2024-03-13' },
        { name: 'Donna Paulsen', bloodGroup: 'B+', contact: '+91 9876543223', date: '2024-03-12' },
      ],
      'O+': [
        { name: 'Louis Litt', bloodGroup: 'O+', contact: '+91 9876543224', date: '2024-03-11' },
        { name: 'Jessica Pearson', bloodGroup: 'O+', contact: '+91 9876543225', date: '2024-03-10' },
      ],
      'AB+': [
        { name: 'Robert Zane', bloodGroup: 'AB+', contact: '+91 9876543226', date: '2024-03-09' },
        { name: 'Katrina Bennett', bloodGroup: 'AB+', contact: '+91 9876543227', date: '2024-03-08' },
      ],
      'A-': [
        { name: 'Alex Williams', bloodGroup: 'A-', contact: '+91 9876543228', date: '2024-03-07' },
        { name: 'Samantha Wheeler', bloodGroup: 'A-', contact: '+91 9876543229', date: '2024-03-06' },
      ],
      'B-': [
        { name: 'Brian Kim', bloodGroup: 'B-', contact: '+91 9876543230', date: '2024-03-05' },
        { name: 'Jenny Park', bloodGroup: 'B-', contact: '+91 9876543231', date: '2024-03-04' },
      ],
      'O-': [
        { name: 'David Lee', bloodGroup: 'O-', contact: '+91 9876543232', date: '2024-03-03' },
        { name: 'Harold Gunderson', bloodGroup: 'O-', contact: '+91 9876543233', date: '2024-03-02' },
      ],
      'AB-': [
        { name: 'Sheila Sazs', bloodGroup: 'AB-', contact: '+91 9876543234', date: '2024-03-01' },
        { name: 'Cameron Dennis', bloodGroup: 'AB-', contact: '+91 9876543235', date: '2024-02-29' },
      ],
    },
    donation: {
      'Money': [
        { name: 'Peter Parker', contribution: '$1,000', contact: '+91 9876543236', date: '2024-03-15' },
        { name: 'Tony Stark', contribution: '$5,000', contact: '+91 9876543237', date: '2024-03-14' },
        { name: 'Bruce Wayne', contribution: '$10,000', contact: '+91 9876543238', date: '2024-03-13' },
      ],
      'Goods': [
        { name: 'Steve Rogers', contribution: 'Medical Supplies', contact: '+91 9876543239', date: '2024-03-12' },
        { name: 'Bruce Banner', contribution: 'Books', contact: '+91 9876543240', date: '2024-03-11' },
        { name: 'Thor Odinson', contribution: 'Food Supplies', contact: '+91 9876543241', date: '2024-03-10' },
      ],
      'Services': [
        { name: 'Stephen Strange', contribution: 'Medical Service', contact: '+91 9876543242', date: '2024-03-09' },
        { name: 'Natasha Romanoff', contribution: 'Training', contact: '+91 9876543243', date: '2024-03-08' },
        { name: 'Clint Barton', contribution: 'Security Service', contact: '+91 9876543244', date: '2024-03-07' },
      ],
    },
    enrollment: {
      'Jan': [
        { name: 'John Smith', enrollmentDate: '2024-01-05', contact: '+91 9876543250', program: 'Yoga Camp' },
        { name: 'Emma Wilson', enrollmentDate: '2024-01-12', contact: '+91 9876543251', program: 'Meditation' },
        { name: 'Michael Brown', enrollmentDate: '2024-01-15', contact: '+91 9876543252', program: 'Adventure Camp' },
      ],
      'Feb': [
        { name: 'Sarah Davis', enrollmentDate: '2024-02-03', contact: '+91 9876543253', program: 'Yoga Camp' },
        { name: 'James Miller', enrollmentDate: '2024-02-08', contact: '+91 9876543254', program: 'Meditation' },
      ],
      'Mar': [
        { name: 'Emily Taylor', enrollmentDate: '2024-03-02', contact: '+91 9876543255', program: 'Adventure Camp' },
        { name: 'Daniel Anderson', enrollmentDate: '2024-03-10', contact: '+91 9876543256', program: 'Yoga Camp' },
        { name: 'Olivia Martin', enrollmentDate: '2024-03-15', contact: '+91 9876543257', program: 'Meditation' },
      ],
      'Apr': [
        { name: 'William White', enrollmentDate: '2024-04-05', contact: '+91 9876543258', program: 'Adventure Camp' },
        { name: 'Sophia Clark', enrollmentDate: '2024-04-12', contact: '+91 9876543259', program: 'Yoga Camp' },
        { name: 'Alexander Lee', enrollmentDate: '2024-04-18', contact: '+91 9876543260', program: 'Meditation' },
      ],
      'May': [
        { name: 'Isabella King', enrollmentDate: '2024-05-07', contact: '+91 9876543261', program: 'Yoga Camp' },
        { name: 'Henry Wright', enrollmentDate: '2024-05-14', contact: '+91 9876543262', program: 'Adventure Camp' },
      ],
      'Jun': [
        { name: 'Victoria Scott', enrollmentDate: '2024-06-04', contact: '+91 9876543263', program: 'Meditation' },
        { name: 'Benjamin Green', enrollmentDate: '2024-06-11', contact: '+91 9876543264', program: 'Yoga Camp' },
        { name: 'Mia Turner', enrollmentDate: '2024-06-18', contact: '+91 9876543265', program: 'Adventure Camp' },
        { name: 'Jack Phillips', enrollmentDate: '2024-06-25', contact: '+91 9876543266', program: 'Meditation' },
      ],
    },
    requests: {
      'Internship': [
        { name: 'Alice Johnson', program: 'Software Development', contact: '+91 9876543270', date: '2024-03-15' },
        { name: 'Bob Wilson', program: 'Data Science', contact: '+91 9876543271', date: '2024-03-14' },
      ],
      'Apprenticeship': [
        { name: 'Charlie Davis', program: 'Web Development', contact: '+91 9876543272', date: '2024-03-13' },
        { name: 'Diana Miller', program: 'UI/UX Design', contact: '+91 9876543273', date: '2024-03-12' },
      ],
      'Job': [
        { name: 'Edward Brown', position: 'Frontend Developer', contact: '+91 9876543274', date: '2024-03-11' },
        { name: 'Frank Thomas', position: 'Backend Developer', contact: '+91 9876543275', date: '2024-03-10' },
      ],
      'Event Participant': [
        { name: 'George Clark', event: 'Tech Conference', contact: '+91 9876543276', date: '2024-03-09' },
        { name: 'Helen White', event: 'Workshop', contact: '+91 9876543277', date: '2024-03-08' },
      ],
    },
  };

  const handleChartClick = (
    type: 'state' | 'bloodGroup' | 'donation' | 'enrollment' | 'requests',
    _event: ChartEvent,
    elements: ActiveElement[]
  ) => {
    if (elements.length > 0) {
      const dataIndex = elements[0].index;
      let label;
      let data;

      switch (type) {
        case 'enrollment':
          label = enrollmentData.labels[dataIndex];
          data = mockUserDetails.enrollment[label];
          break;
        case 'requests':
          label = requestsData.labels[dataIndex];
          data = mockUserDetails.requests[label];
          break;
        default:
          label = type === 'state' 
            ? stateData.labels[dataIndex]
            : type === 'bloodGroup'
              ? bloodGroupData.labels[dataIndex]
              : donationData.labels[dataIndex];
          data = mockUserDetails[type][label];
      }
      
      if (label && data) {
        setModalState({
          isOpen: true,
          title: `${label} Details`,
          data: data,
          type
        });
      }
    }
  };

  const handleExportChart = (type: 'state' | 'bloodGroup' | 'donation' | 'enrollment' | 'requests') => {
    const dataToExport: Record<string, string | number>[] = [];
    let filename = '';

    switch (type) {
      case 'state':
        // Prepare state data for export
        Object.entries(mockUserDetails.state).forEach(([state, users]) => {
          users.forEach(user => {
            dataToExport.push({
              State: state,
              Name: user.name,
              District: user.district,
              Contact: user.contact
            });
          });
        });
        filename = 'state_distribution.xlsx';
        break;

      case 'bloodGroup':
        // Prepare blood group data for export
        Object.entries(mockUserDetails.bloodGroup).forEach(([group, users]) => {
          users.forEach(user => {
            dataToExport.push({
              'Blood Group': group,
              Name: user.name,
              Contact: user.contact,
              Date: user.date
            });
          });
        });
        filename = 'blood_group_classification.xlsx';
        break;

      case 'donation':
        // Prepare donation data for export
        Object.entries(mockUserDetails.donation).forEach(([category, users]) => {
          users.forEach(user => {
            dataToExport.push({
              'Donation Type': category,
              Name: user.name,
              Contribution: user.contribution,
              Contact: user.contact,
              Date: user.date
            });
          });
        });
        filename = 'donation_classification.xlsx';
        break;

      case 'enrollment':
        // Prepare enrollment data for export
        Object.entries(mockUserDetails.enrollment).forEach(([month, users]) => {
          users.forEach(user => {
            dataToExport.push({
              Month: month,
              Name: user.name,
              'Enrollment Date': user.enrollmentDate,
              Contact: user.contact,
              Program: user.program
            });
          });
        });
        filename = 'monthly_enrollments.xlsx';
        break;

      case 'requests':
        // Prepare requests data for export
        Object.entries(mockUserDetails.requests).forEach(([type, users]) => {
          users.forEach(user => {
            dataToExport.push({
              'Request Type': type,
              Name: user.name,
              Contact: user.contact,
              Date: user.date,
              Details: user.program || user.position || user.event || ''
            });
          });
        });
        filename = 'requests_distribution.xlsx';
        break;
    }

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Save file
    XLSX.writeFile(wb, filename);
  };

  // Chart options with click events
  const getChartOptions = (type: 'state' | 'bloodGroup' | 'donation' | 'enrollment' | 'requests') => ({
    ...(type === 'enrollment' ? barChartOptions : chartOptions),
    onClick: (event: ChartEvent, elements: ActiveElement[]) => 
      handleChartClick(type, event, elements),
    ...(type === 'donation' || type === 'requests' ? {
      cutout: '60%',  // This creates a donut chart
    } : {}),
  });

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
      

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push('/dashboard/admin/users')}
        >
          <h3 className="text-sm md:text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-xl md:text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push('/dashboard/admin/upcoming-event')}
        >
          <h3 className="text-sm md:text-lg font-semibold mb-2">Active Events</h3>
          <p className="text-xl md:text-3xl font-bold text-green-600">{stats.activeEvents}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push('/dashboard/admin/bookings-and-payments')}
        >
          <h3 className="text-sm md:text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-xl md:text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push('/dashboard/admin/organization-detail')}
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">State Distribution</h2>
            <button
              onClick={() => handleExportChart('state')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Export to Excel
            </button>
          </div>
          <div className="h-[250px] md:h-[300px] flex items-center justify-center">
            <Pie data={stateData} options={getChartOptions('state')} />
          </div>
        </motion.div>

        {/* Blood Group Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-4 md:p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Monthly Enrollments</h2>
            <button
              onClick={() => handleExportChart('enrollment')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Export to Excel
            </button>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <Bar 
              data={enrollmentData} 
              options={getChartOptions('enrollment')}
            />
          </div>
        </motion.div>
<motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-4 md:p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Blood Group Classification</h2>
            <button
              onClick={() => handleExportChart('bloodGroup')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Export to Excel
            </button>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <Bar data={bloodGroupData} options={getChartOptions('bloodGroup')} />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-4 md:p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Donation Classification</h2>
            <button
              onClick={() => handleExportChart('donation')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Export to Excel
            </button>
          </div>
          <div className="h-[250px] md:h-[300px] flex items-center justify-center">
            <Pie data={donationData} options={getChartOptions('donation')} />
          </div>
        </motion.div>
        

        {/* Requests Classification Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-white p-4 md:p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Requests Classification</h2>
            <button
              onClick={() => handleExportChart('requests')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Export to Excel
            </button>
          </div>
          <div className="h-[250px] md:h-[300px] flex items-center justify-center">
            <Pie data={requestsData} options={getChartOptions('requests')} />
          </div>
        </motion.div>

        {/* Monthly Enrollments Chart */}
        
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow p-4 md:p-6 mb-6 mt-9"
      >
      <div className='flex justify-between items-center mb-4'>
      <h2 className="text-lg md:text-xl font-semibold mb-4">Export Data</h2>
        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Export to Excel
        </button>
      </div>
        
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

      {/* Detail Modal */}
      <DetailModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        data={modalState.data}
        type={modalState.type}
      />
    </div>
  );
};

export default AdminDashboard;
