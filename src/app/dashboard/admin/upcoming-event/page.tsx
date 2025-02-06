"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaRupeeSign } from 'react-icons/fa';
import EventDetailsCard from "@/app/components/dashboard/EventDetailsCard";

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
  creator?: {
    name: string;
    phone: string;
    organization: string;
    district: string;
    occupation: string;
    profileImage?: string;
  };
}

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
  }
];

const UpcomingEventsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'male' | 'female'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [events, setEvents] = useState({
    upcoming: upcomingEvents,
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

  const getAvailableSpots = (spots: string): { booked: number; total: number; available: number; percentageAvailable: number } => {
    const [booked, total] = spots.split('/').map(num => parseInt(num, 10));
    return {
      booked: booked || 0,
      total: total || 0,
      available: (total || 0) - (booked || 0),
      percentageAvailable: ((total || 0) - (booked || 0)) / (total || 1) * 100
    };
  };

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
          {filteredOngoingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 cursor-pointer ${
                event.eligibility === 'male' ? 'border-blue-500' : 'border-pink-500'
              }`}
            >
              
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    Live
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{event.description}</p>
                </div>
              </div>

              <div className="p-4 space-y-4">
               
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaUsers className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Eligibility</p>
                      <p className="text-sm font-medium capitalize">{event.eligibility} only</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaRupeeSign className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Fee</p>
                      <p className="text-sm font-medium">₹{event.fee}</p>
                    </div>
                  </div>
                </div>

          
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-700">
                      Participants
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {event.spots}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        event.eligibility === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}
                      style={{
                        width: `${(parseInt(event.spots.split('/')[0]) / parseInt(event.spots.split('/')[1])) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpcomingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 cursor-pointer ${
                event.eligibility === 'male' ? 'border-blue-500' : 'border-pink-500'
              }`}
            >
              
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{event.description}</p>
                </div>
              </div>

             
              <div className="p-4 space-y-4">
            
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaUsers className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Eligibility</p>
                      <p className="text-sm font-medium capitalize">{event.eligibility} only</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaRupeeSign className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Fee</p>
                      <p className="text-sm font-medium">₹{event.fee}</p>
                    </div>
                  </div>
                </div>

               
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-700">
                      Available Seats
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {getAvailableSpots(event.spots).available} / {getAvailableSpots(event.spots).total}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        event.eligibility === "male"
                          ? "bg-blue-500"
                          : event.eligibility === "female"
                          ? "bg-pink-500"
                          : "bg-purple-500"
                      }`}
                      style={{
                        width: `${getAvailableSpots(event.spots).percentageAvailable}%`,
                      }}
                    />
                  </div>
                  {getAvailableSpots(event.spots).available <= 5 && (
                    <p className="text-xs text-red-500 mt-1">
                      Only {getAvailableSpots(event.spots).available} seats left!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events Section */}
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
          {filteredPastEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 cursor-pointer ${
                event.eligibility === 'male' ? 'border-blue-500' : 'border-pink-500'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-gray-500 text-white text-sm font-medium rounded-full">
                    Completed
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{event.description}</p>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaUsers className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Eligibility</p>
                      <p className="text-sm font-medium capitalize">{event.eligibility} only</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaRupeeSign className={`${
                      event.eligibility === 'male' ? 'text-blue-500' : 'text-pink-500'
                    }`} />
                    <div>
                      <p className="text-xs text-gray-500">Fee</p>
                      <p className="text-sm font-medium">₹{event.fee}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-700">
                      Final Participation
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {event.spots}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        event.eligibility === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}
                      style={{
                        width: `${(parseInt(event.spots.split('/')[0]) / parseInt(event.spots.split('/')[1])) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <EventDetailsCard 
          event={selectedEvent} 
          onClose={closeEventDetails}
          onAttendanceChange={(attendanceKey, rating) => handleAttendanceChange(attendanceKey, rating)}
        />
      )}
    </div>
  );
};

export default UpcomingEventsPage;
