"use client";
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import EventDetailsCard from "@/app/components/dashboard/EventDetailsCard";
import EventsCard from "@/app/components/dashboard/EventsCard";

interface Student {
  id: number;
  name: string;
  attendance?: {
    date: string;
    timeSlot: 'morning' | 'afternoon' | 'evening';
    rating: number;
  }[];
}

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  district: string;
  status: string;
  eligibility: 'male' | 'female' | 'all';
  fee: number;
  spots: string;
  image: string;
  schedule?: string;
  requirements?: string;
  undertaking?: string;
  students?: Student[];
  isCancelled?: boolean;
  cancellationReason?: string;
  creator?: {
    name: string;
    phone: string;
    organization: string;
    district: string;
    occupation: string;
    profileImage?: string;
  };
}

// Mock user data for the add user functionality
interface User {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  bloodGroup: string;
  gender: string;
  district: string;
  state: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    mobileNumber: "+1 234 567 8900",
    bloodGroup: "O+",
    gender: "Male",
    district: "Mumbai",
    state: "Maharashtra"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    mobileNumber: "+1 234 567 8901",
    bloodGroup: "A+",
    gender: "Female",
    district: "Bangalore",
    state: "Karnataka"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    mobileNumber: "+1 234 567 8902",
    bloodGroup: "B+",
    gender: "Male",
    district: "New Delhi",
    state: "Delhi"
  }
];

// Mock data - replace with actual API call later
const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Adventure Camp 2024",
    description: "Experience thrilling outdoor activities and team-building exercises in the heart of nature.",
    location: "Lonavala, Maharashtra",
    date: "15-20 April, 2024",
    district: "Pune",
    status: "upcoming",
    eligibility: "male",
    fee: 5000,
    spots: `${18}/${50}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D",
    schedule: `Day 1:
06:00 AM - Morning Tea & Snacks
07:00 AM - Arrival and Registration
09:00 AM - Welcome Ceremony
01:00 PM - Lunch Break
02:00 PM - Camp Setup Training
05:00 PM - Evening Tea
06:00 PM - Team Building Activities
08:00 PM - Dinner

Day 2:
05:30 AM - Wake Up Call
06:00 AM - Morning Yoga and Exercise
08:00 AM - Breakfast
09:00 AM - Rock Climbing Workshop
01:00 PM - Lunch Break
02:30 PM - Nature Trail Exploration
05:00 PM - Evening Tea & Snacks
07:00 PM - Campfire and Cultural Night
09:00 PM - Dinner`,
    requirements: "Basic fitness level, Comfortable clothing, Water bottle, Backpack",
    creator: {
      name: "Adventure Team",
      phone: "+91 98765 43210",
      organization: "Adventure Sports Club",
      district: "Pune",
      occupation: "Sports Coach"
    }
  },
  {
    id: 2,
    title: "Nature Explorer Camp",
    description: "Discover the beauty of wildlife and learn survival skills in a safe, guided environment.",
    location: "Panchgani, Maharashtra",
    date: "1-5 May, 2024",
    district: "Pune",
    status: "upcoming",
    eligibility: "female",
    fee: 4500,
    spots: `${25}/${40}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    title: "Mountain Trek Camp",
    description: "Challenge yourself with mountain climbing and hiking adventures.",
    location: "Malshej Ghat, Maharashtra",
    date: "10-15 May, 2024",
    district: "Pune",
    status: "upcoming",
    eligibility: "male",
    fee: 6000,
    spots: `${28}/${30}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 10,
    title: "Wildlife Photography Camp",
    description: "Learn wildlife photography techniques in natural habitats.",
    location: "Bandipur, Karnataka",
    date: "20-25 April, 2024",
    district: "Chamarajanagar",
    status: "upcoming",
    eligibility: "all",
    fee: 7500,
    spots: `${15}/${30}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 11,
    title: "Rock Climbing Workshop",
    description: "Master the art of rock climbing with expert instructors.",
    location: "Hampi, Karnataka",
    date: "5-10 May, 2024",
    district: "Ballari",
    status: "upcoming",
    eligibility: "all",
    fee: 5500,
    spots: `${20}/${40}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 12,
    title: "Riverside Camping Experience",
    description: "Camp along the beautiful riverside and learn water activities.",
    location: "Gokarna, Karnataka",
    date: "15-20 May, 2024",
    district: "Uttara Kannada",
    status: "upcoming",
    eligibility: "all",
    fee: 4500,
    spots: `${25}/${35}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

// Mock data for ongoing events
const ongoingEvents: Event[] = [
  {
    id: 4,
    title: "Summer Wilderness Camp",
    description: "An immersive wilderness experience with expert guides and exciting activities.",
    location: "Bhandardara, Maharashtra",
    date: "10-14 March, 2024",
    district: "Pune",
    status: "ongoing",
    eligibility: "male",
    fee: 7500,
    spots: `${45}/${45}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHx8MA%3D%3D",
    schedule: `Day 1:
06:00 AM - Morning Tea & Snacks
07:00 AM - Arrival and Registration
09:00 AM - Welcome Ceremony
01:00 PM - Lunch Break
02:00 PM - Camp Setup Training
05:00 PM - Evening Tea
06:00 PM - Team Building Activities
08:00 PM - Dinner

Day 2:
05:30 AM - Wake Up Call
06:00 AM - Morning Yoga and Exercise
08:00 AM - Breakfast
09:00 AM - Rock Climbing Workshop
01:00 PM - Lunch Break
02:30 PM - Nature Trail Exploration
05:00 PM - Evening Tea & Snacks
07:00 PM - Campfire and Cultural Night
09:00 PM - Dinner`,
    requirements: "Good physical fitness, Previous camping experience, Medical certificate",
    creator: {
      name: "Wilderness Explorers",
      phone: "+91 98765 12345",
      organization: "Wilderness Explorers Association",
      district: "Nashik",
      occupation: "Wilderness Guide"
    }
  },
  {
    id: 5,
    title: "Girls Leadership Camp",
    description: "Empowering young women through outdoor activities and leadership workshops.",
    location: "Mahabaleshwar, Maharashtra",
    date: "5-20 March, 2024",
    district: "Pune",
    status: "upcoming",
    eligibility: "female",
    fee: 6500,
    spots: `${32}/${35}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 8,
    title: "Forest Survival Camp",
    description: "Learn essential survival skills in dense forest environments.",
    location: "Dandeli, Karnataka",
    district: "Dandeli",
    date: "8-12 March, 2024",
    status: "ongoing",
    eligibility: "all",
    fee: 5500,
    spots: `${30}/${30}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D",
    students: []
  },
  {
    id: 9,
    title: "Mountain Biking Camp",
    description: "Experience thrilling mountain biking adventures.",
    location: "Munnar, Kerala",
    district: "Idukki",
    date: "7-11 March, 2024",
    status: "ongoing",
    eligibility: "all",
    fee: 6000,
    spots: `${25}/${25}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D",
    students: []
  }
];

// Mock data for past events
const pastEvents: Event[] = [
  {
    id: 6,
    title: "Winter Camping Adventure",
    description: "A thrilling winter camping experience with snow activities and survival training.",
    location: "Manali, Himachal Pradesh",
    date: "15-25 December, 2023",
    district: "Manali",
    status: "completed",
    eligibility: "male",
    fee: 8500,
    spots: `${40}/${40}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D",
    schedule: "Day 1-3: Winter Survival Basics\nDay 4-7: Snow Activities\nDay 8-10: Advanced Survival",
    requirements: "Excellent physical fitness, Winter gear, Previous camping experience",
    creator: {
      name: "Mountain Adventures",
      phone: "+91 98765 98765",
      organization: "Mountain Adventure Club",
      district: "Manali",
      occupation: "Mountain Guide"
    }
  },
  {
    id: 7,
    title: "Desert Safari Camp",
    description: "Experience the magic of desert camping with camel safaris and cultural nights.",
    location: "Jaisalmer, Rajasthan",
    date: "1-10 February, 2024",
    district: "Jaisalmer",
    status: "completed",
    eligibility: "female",
    fee: 7500,
    spots: `${35}/${35}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 13,
    title: "Beach Camping Adventure",
    description: "Experience camping on pristine beaches with water sports.",
    location: "Gokarna, Karnataka",
    date: "1-5 January, 2024",
    district: "Uttara Kannada",
    status: "completed",
    eligibility: "all",
    fee: 5000,
    spots: `${40}/${40}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 14,
    title: "Himalayan Trek",
    description: "Trek through the majestic Himalayas with experienced guides.",
    location: "Manali, Himachal Pradesh",
    date: "10-20 January, 2024",
    district: "Kullu",
    status: "completed",
    eligibility: "all",
    fee: 8500,
    spots: `${30}/${30}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 15,
    title: "Jungle Safari Camp",
    description: "Explore wildlife in their natural habitat with expert naturalists.",
    location: "Ranthambore, Rajasthan",
    date: "5-10 February, 2024",
    district: "Sawai Madhopur",
    status: "completed",
    eligibility: "all",
    fee: 7000,
    spots: `${35}/${35}`,
    image: "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const UpcomingEventsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'male' | 'female'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState({
    upcoming: upcomingEvents.map(event => ({ ...event, isCancelled: false })),
    ongoing: ongoingEvents.map(event => ({
      ...event,
      students: [
        { 
          id: 1, 
          name: "John Doe",
          attendance: []
        },
        { 
          id: 2, 
          name: "Jane Smith",
          attendance: []
        },
        { 
          id: 3, 
          name: "Mike Johnson",
          attendance: []
        },
        { 
          id: 4, 
          name: "Sarah Williams",
          attendance: []
        },
        { 
          id: 5, 
          name: "Alex Brown",
          attendance: []
        },
        { 
          id: 6, 
          name: "John Doe",
          attendance: []
        },
        { 
          id: 7, 
          name: "Jane Smith",
          attendance: []
        },
        { 
          id: 8, 
          name: "Mike Johnson",
          attendance: []
        },
        { 
          id: 9, 
          name: "Sarah Williams",
          attendance: []
        },
        { 
          id: 10, 
          name: "Alex Brown",
          attendance: []
        }
      ] as Student[]
    })),
    past: pastEvents
  });

  const [currentPage, setCurrentPage] = useState({
    ongoing: 1,
    upcoming: 1,
    past: 1
  });
  
  const ITEMS_PER_PAGE = 3;

  // Pagination helper function
  const paginateEvents = (events: Event[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return events.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Get total pages for each category
  const getTotalPages = (events: Event[]) => Math.ceil(events.length / ITEMS_PER_PAGE);

  // Pagination component
  const Pagination = ({ 
    totalPages, 
    currentPage, 
    onPageChange,
    category 
  }: { 
    totalPages: number; 
    currentPage: number; 
    onPageChange: (page: number) => void;
    category: 'ongoing' | 'upcoming' | 'past';
  }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center space-x-2 mt-4 mb-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition-colors duration-200`}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={`${category}-${page}`}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition-colors duration-200`}
        >
          Next
        </button>
      </div>
    );
  };

  const handleAttendanceChange = (attendanceKey: string, rating: number) => {
    const [eventDate, timeSlot, studentId] = attendanceKey.split('-');
    
    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      
      // Find the event in ongoing events
      const eventIndex = updatedEvents.ongoing.findIndex(e => e.id === selectedEvent?.id);
      if (eventIndex === -1) return prevEvents;

      const event = { ...updatedEvents.ongoing[eventIndex] };
      if (!event.students) return prevEvents;

      // Find the student
      const studentIndex = event.students.findIndex(s => s.id === parseInt(studentId));
      if (studentIndex === -1) return prevEvents;

      const student = { ...event.students[studentIndex] };
      
      // Initialize attendance array if it doesn't exist
      if (!student.attendance) {
        student.attendance = [];
      }

      // Find if attendance for this date and time slot already exists
      const attendanceIndex = student.attendance.findIndex(
        (a) => a.date === eventDate && a.timeSlot === timeSlot as 'morning' | 'afternoon' | 'evening'
      );
      
      if (attendanceIndex === -1) {
        // Add new attendance record
        student.attendance.push({
          date: eventDate,
          timeSlot: timeSlot as 'morning' | 'afternoon' | 'evening',
          rating
        });
      } else {
        // Update existing attendance record
        student.attendance[attendanceIndex].rating = rating;
      }

      // Update the student in the event
      event.students[studentIndex] = student;
      
      // Update the event in the ongoing events array
      updatedEvents.ongoing[eventIndex] = event;
      
      // If the selected event is the one being updated, update it as well
      if (selectedEvent?.id === event.id) {
        setSelectedEvent(event);
      }

      return updatedEvents;
    });
  };

  const filteredUpcomingEvents = selectedFilter === 'all' 
    ? events.upcoming 
    : events.upcoming.filter(event => event.eligibility === selectedFilter);

  const filteredOngoingEvents = selectedFilter === 'all'
    ? events.ongoing
    : events.ongoing.filter(event => event.eligibility === selectedFilter);

  const filteredPastEvents = selectedFilter === 'all'
    ? events.past
    : events.past.filter(event => event.eligibility === selectedFilter);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const handleAddUserClick = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const event = events.upcoming.find(event => event.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setShowAddUserModal(true);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const handleAddUsers = () => {
    if (!selectedEvent) return;

    const [booked, total] = selectedEvent.spots.split('/').map(Number);
    const availableSpots = total - booked;

    if (selectedUsers.length > availableSpots) {
      alert(`Cannot add ${selectedUsers.length} users. Only ${availableSpots} spots available.`);
      return;
    }

    setEvents(prev => ({
      ...prev,
      upcoming: prev.upcoming.map(event => {
        if (event.id === selectedEvent.id) {
          const [currentBooked, total] = event.spots.split('/').map(Number);
          const newBooked = currentBooked + selectedUsers.length;
          return {
            ...event,
            spots: `${newBooked}/${total}`,
            students: [
              ...(event.students || []),
              ...selectedUsers.map(userId => {
                const user = mockUsers.find(u => u.id === userId);
                return {
                  id: parseInt(userId),
                  name: user?.name || '',
                  attendance: []
                };
              })
            ]
          };
        }
        return event;
      })
    }));

    setSelectedUsers([]);
    setShowAddUserModal(false);
    setSearchQuery('');
  };

  const handleCancelEvent = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(prev => ({
      ...prev,
      upcoming: prev.upcoming.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            isCancelled: true,
            cancellationReason: "Event cancelled by admin"
          };
        }
        return event;
      })
    }));
  };

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update the filtered events to include pagination
  const paginatedOngoingEvents = paginateEvents(
    filteredOngoingEvents,
    currentPage.ongoing
  );

  const paginatedUpcomingEvents = paginateEvents(
    filteredUpcomingEvents,
    currentPage.upcoming
  );

  const paginatedPastEvents = paginateEvents(
    filteredPastEvents,
    currentPage.past
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage and monitor upcoming and ongoing camping events</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setSelectedFilter('male')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedFilter === 'male'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Male Events
        </button>
        <button
          onClick={() => setSelectedFilter('female')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedFilter === 'female'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Female Events
        </button>
      </div>

      {/* Ongoing Events */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Ongoing Events</h2>
            <p className="mt-1 text-gray-600">Currently active camping events</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Live Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedOngoingEvents.map((event) => (
            <EventsCard
              key={event.id}
              {...event}
              cardType="ongoing"
              onClick={() => handleEventClick(event)}
              progress={{
                completed: parseInt(event.spots.split('/')[0]),
                total: parseInt(event.spots.split('/')[1]),
                status: 'In Progress'
              }}
            />
          ))}
        </div>
        
        <Pagination
          totalPages={getTotalPages(filteredOngoingEvents)}
          currentPage={currentPage.ongoing}
          onPageChange={(page) => setCurrentPage(prev => ({ ...prev, ongoing: page }))}
          category="ongoing"
        />
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUpcomingEvents.map((event) => (
            <div key={event.id} className="relative group">
              <EventsCard
                {...event}
                cardType="upcoming"
                onClick={() => handleEventClick(event)}
                onAddUser={(e) => handleAddUserClick(event.id, e)}
                onCancelEvent={(e) => handleCancelEvent(event.id, e)}
              />
              {event.isCancelled && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold rotate-[-30deg] bg-red-500 px-6 py-2">
                    CANCELLED
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <Pagination
          totalPages={getTotalPages(filteredUpcomingEvents)}
          currentPage={currentPage.upcoming}
          onPageChange={(page) => setCurrentPage(prev => ({ ...prev, upcoming: page }))}
          category="upcoming"
        />
      </div>

      {/* Past Events */}
      <div className="mt-12">
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Past Events</h2>
            <p className="mt-1 text-gray-600">Successfully completed camping events</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-sm text-gray-600 font-medium">Completed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPastEvents.map((event) => (
            <EventsCard
              key={event.id}
              {...event}
              cardType="past"
              onClick={() => handleEventClick(event)}
              impact="High Impact"
              participants={parseInt(event.spots.split('/')[0])}
              achievement="Successfully Completed"
            />
          ))}
        </div>

        <Pagination
          totalPages={getTotalPages(filteredPastEvents)}
          currentPage={currentPage.past}
          onPageChange={(page) => setCurrentPage(prev => ({ ...prev, past: page }))}
          category="past"
        />
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <EventDetailsCard 
          event={selectedEvent} 
          onClose={closeEventDetails}
          onAttendanceChange={(attendanceKey, rating) => handleAttendanceChange(attendanceKey, rating)}
          onAddUser={(eventId) => handleAddUserClick(eventId, { stopPropagation: () => {} } as React.MouseEvent)}
        />
      )}

      {/* Add User Modal */}
      {showAddUserModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Users to {selectedEvent.title}</h3>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setSelectedUsers([]);
                  setSearchQuery('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full p-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Users List */}
            <div className="space-y-2 mb-4">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedUsers.includes(user.id)
                      ? 'bg-blue-50 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleUserSelect(user.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{user.district}</p>
                      <p className="text-sm text-gray-600">{user.gender}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setSelectedUsers([]);
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUsers}
                disabled={selectedUsers.length === 0}
                className={`px-4 py-2 rounded-lg ${
                  selectedUsers.length > 0
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors duration-200`}
              >
                Add Selected Users ({selectedUsers.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsPage;
