"use client";
import React, { useState } from "react";
import UserCard from "@/app/components/dashboard/UserCard";

const UsersPage = () => {
  // Mock data - replace with actual data fetching
  const [users, setUsers] = useState([
    {
      id: "1",
      eventId: "000001",
      name: "John Doe",
      email: "john@example.com",
      mobileNumber: "+1 234 567 8900",
      role: "Admin",
      state: "Maharashtra",
      nationality: "Indian",
      district: "Mumbai",
      location: "Andheri East",
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
      eventId: "000002",
      name: "Jane Smith",
      email: "jane@example.com",
      mobileNumber: "+1 234 567 8901",
      role: "Event Manager",
      state: "Karnataka",
      nationality: "Indian",
      district: "Bangalore",
      location: "Koramangala",
      bloodGroup: "A+",
      gender: "Female",
      dateOfBirth: "1992-05-15",
      status: "active",
      visitedCamps: 3,
      points: 800,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "3",
      eventId: "000003",
      name: "Mike Johnson",
      email: "mike@example.com",
      mobileNumber: "+1 234 567 8902",
      role: "Accountant",
      state: "Delhi",
      nationality: "Indian",
      district: "New Delhi",
      location: "Connaught Place",
      bloodGroup: "B+",
      gender: "Male",
      dateOfBirth: "1988-08-20",
      status: "inactive",
      visitedCamps: 0,
      points: 150,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "4",
      eventId: "000004",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      mobileNumber: "+1 234 567 8903",
      role: "Promoting Manager",
      state: "Tamil Nadu",
      nationality: "Indian",
      district: "Chennai",
      location: "T Nagar",
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
      eventId: "000005",
      name: "Raj Patel",
      email: "raj@example.com",
      mobileNumber: "+1 234 567 8904",
      role: "Event Coordinator",
      state: "Gujarat",
      nationality: "Indian",
      district: "Ahmedabad",
      location: "Satellite",
      bloodGroup: "O-",
      gender: "Male",
      dateOfBirth: "1993-07-25",
      status: "active",
      visitedCamps: 12,
      points: 3200,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "6",
      eventId: "000006",
      name: "Priya Sharma",
      email: "priya@example.com",
      mobileNumber: "+1 234 567 8905",
      role: "Volunteer",
      state: "Rajasthan",
      nationality: "Indian",
      district: "Jaipur",
      location: "Malviya Nagar",
      bloodGroup: "B-",
      gender: "Female",
      dateOfBirth: "1997-12-03",
      status: "active",
      visitedCamps: 6,
      points: 1800,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "7",
      eventId: "000007",
      name: "Alex Chen",
      email: "alex@example.com",
      mobileNumber: "+1 234 567 8906",
      role: "Marketing Manager",
      state: "Kerala",
      nationality: "Indian",
      district: "Kochi",
      location: "Fort Kochi",
      bloodGroup: "AB-",
      gender: "Male",
      dateOfBirth: "1991-09-18",
      status: "inactive",
      visitedCamps: 2,
      points: 450,
      organization: "Swapnapurti Foundation"
    },
    {
      id: "8",
      eventId: "000008",
      name: "Meera Reddy",
      email: "meera@example.com",
      mobileNumber: "+1 234 567 8907",
      role: "Camp Manager",
      state: "Andhra Pradesh",
      nationality: "Indian",
      district: "Visakhapatnam",
      location: "Beach Road",
      bloodGroup: "A-",
      gender: "Female",
      dateOfBirth: "1994-04-30",
      status: "active",
      visitedCamps: 15,
      points: 4200,
      organization: "Swapnapurti Foundation"
    }
  ]);

  // Define Event type
  type Event = {
    id: string;
    name: string;
    location: string;
    totalSeats: number;
    availableSeats: number;
    startDate: string;
    endDate: string;
    eligibility: string;
    organization: string;
    fees: number;
    isPostponed?: boolean;
  };

  // Add mock events data
  const [events] = useState<Event[]>([
    {
      id: "000001",
      name: "Summer Camp 2024",
      location: "Mumbai Central Park",
      totalSeats: 100,
      availableSeats: 45,
      startDate: "2024-05-01",
      endDate: "2024-05-15",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 2500,
      isPostponed: false
    },
    {
      id: "000002",
      name: "Adventure Camp",
      location: "Bangalore Outskirts",
      totalSeats: 75,
      availableSeats: 20,
      startDate: "2024-06-01",
      endDate: "2024-06-10",
      eligibility: "Male",
      organization: "Swapnapurti Foundation",
      fees: 3000,
      isPostponed: true
    },
    {
      id: "000003",
      name: "Nature Explorer Camp",
      location: "Delhi Wildlife Sanctuary",
      totalSeats: 50,
      availableSeats: 15,
      startDate: "2024-01-18",
      endDate: "2024-01-30",
      eligibility: "Female",
      organization: "Swapnapurti Foundation",
      fees: 2000,
      isPostponed: false
    },
    {
      id: "000004",
      name: "Mountain Trekking Camp",
      location: "Himachal Pradesh Mountains",
      totalSeats: 40,
      availableSeats: 10,
      startDate: "2024-02-15",
      endDate: "2024-02-25",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 4000,
      isPostponed: false
    },
    {
      id: "000005",
      name: "Beach Adventure Camp",
      location: "Goa Coastal Area",
      totalSeats: 60,
      availableSeats: 30,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 3500,
      isPostponed: true
    },
    {
      id: "000006",
      name: "Wildlife Photography Camp",
      location: "Ranthambore National Park",
      totalSeats: 25,
      availableSeats: 8,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 5000,
      isPostponed: false
    },
    {
      id: "000007",
      name: "Desert Survival Camp",
      location: "Jaisalmer Desert",
      totalSeats: 30,
      availableSeats: 12,
      startDate: "2024-02-20",
      endDate: "2024-02-27",
      eligibility: "Male",
      organization: "Swapnapurti Foundation",
      fees: 4500,
      isPostponed: false
    },
    {
      id: "000008",
      name: "Yoga and Meditation Retreat",
      location: "Rishikesh Ashram",
      totalSeats: 45,
      availableSeats: 25,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 3000,
      isPostponed: false
    },
    {
      id: "000009",
      name: "River Rafting Adventure",
      location: "Rishikesh Rapids",
      totalSeats: 35,
      availableSeats: 15,
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 3800,
      isPostponed: false
    },
    {
      id: "000010",
      name: "Cultural Heritage Camp",
      location: "Rajasthan Heritage Sites",
      totalSeats: 55,
      availableSeats: 28,
      startDate: "2024-02-05",
      endDate: "2024-02-15",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 4200,
      isPostponed: false
    },
    {
      id: "000011",
      name: "Rock Climbing Workshop",
      location: "Hampi Boulders",
      totalSeats: 20,
      availableSeats: 8,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 4800,
      isPostponed: false
    },
    {
      id: "000012",
      name: "Forest Conservation Camp",
      location: "Sundarbans Reserve",
      totalSeats: 40,
      availableSeats: 18,
      startDate: "2024-01-18",
      endDate: "2024-01-30",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 3200,
      isPostponed: true
    },
    {
      id: "000013",
      name: "Winter Snow Camp",
      location: "Gulmarg Slopes",
      totalSeats: 30,
      availableSeats: 12,
      startDate: "2024-02-20",
      endDate: "2024-02-27",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 5500,
      isPostponed: false
    },
    {
      id: "000014",
      name: "Eco-Friendly Living Camp",
      location: "Auroville Community",
      totalSeats: 35,
      availableSeats: 20,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 2800,
      isPostponed: false
    },
    {
      id: "000015",
      name: "Traditional Art Camp",
      location: "Kerala Cultural Center",
      totalSeats: 25,
      availableSeats: 10,
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      eligibility: "Female",
      organization: "Swapnapurti Foundation",
      fees: 3300,
      isPostponed: false
    },
    {
      id: "000016",
      name: "Astronomy Night Camp",
      location: "Ladakh Dark Sky Reserve",
      totalSeats: 30,
      availableSeats: 15,
      startDate: "2024-02-01",
      endDate: "2024-02-07",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 4600,
      isPostponed: false
    },
    {
      id: "000017",
      name: "Marine Life Explorer Camp",
      location: "Andaman Islands",
      totalSeats: 25,
      availableSeats: 10,
      startDate: "2024-03-10",
      endDate: "2024-03-17",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 6000,
      isPostponed: false
    },
    {
      id: "000018",
      name: "Mountain Biking Adventure",
      location: "Manali Trails",
      totalSeats: 20,
      availableSeats: 8,
      startDate: "2024-01-18",
      endDate: "2024-01-27",
      eligibility: "Male",
      organization: "Swapnapurti Foundation",
      fees: 4700,
      isPostponed: true
    },
    {
      id: "000019",
      name: "Rural Living Experience",
      location: "Gujarat Village",
      totalSeats: 40,
      availableSeats: 22,
      startDate: "2024-01-18",
      endDate: "2024-01-30",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 2200,
      isPostponed: false
    },
    {
      id: "000020",
      name: "Organic Farming Workshop",
      location: "Maharashtra Farmland",
      totalSeats: 35,
      availableSeats: 18,
      startDate: "2024-02-25",
      endDate: "2024-03-02",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 2800,
      isPostponed: false
    },
    {
      id: "000021",
      name: "Wellness and Yoga Camp",
      location: "Mysore Retreat Center",
      totalSeats: 30,
      availableSeats: 15,
      startDate: "2024-01-18",
      endDate: "2024-01-30",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 3500,
      isPostponed: false
    },
    {
      id: "000022",
      name: "Photography Masterclass",
      location: "Valley of Flowers",
      totalSeats: 25,
      availableSeats: 12,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 4800,
      isPostponed: false
    },
    {
      id: "000023",
      name: "Adventure Sports Camp",
      location: "Bir Billing",
      totalSeats: 35,
      availableSeats: 20,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 5500,
      isPostponed: false
    },
    {
      id: "000024",
      name: "Wildlife Conservation Workshop",
      location: "Jim Corbett National Park",
      totalSeats: 40,
      availableSeats: 25,
      startDate: "2024-01-18",
      endDate: "2024-01-30",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 4200,
      isPostponed: false
    },
    {
      id: "000025",
      name: "Himalayan Expedition",
      location: "Sikkim Mountains",
      totalSeats: 20,
      availableSeats: 10,
      startDate: "2024-01-18",
      endDate: "2024-01-28",
      eligibility: "All",
      organization: "Swapnapurti Foundation",
      fees: 6000,
      isPostponed: false
    }
  ]);

  // Add selected event state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Update event selection handler
  const handleEventSelect = (eventId: string) => {
    setEventIdFilter(eventId);
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(eventId === "all" ? null : event || null);
  };

  // Add filter states
  const [districtFilter, setDistrictFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [organizationFilter, setOrganizationFilter] = useState("all");
  const [eventIdFilter, setEventIdFilter] = useState("all");
  const [campVisitsFilter, setCampVisitsFilter] = useState({ min: "", max: "" });
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Add new date range filter state
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  // Add new filter states for event timing
  const [eventTimingFilter, setEventTimingFilter] = useState("all"); // 'all', 'backdated', 'ongoing', 'upcoming', 'postponed'

  // Get unique values for filters
  const districts = [...new Set(users.map((user) => user.district))];
  const states = [...new Set(users.map((user) => user.state))];
  const genders = [...new Set(users.map((user) => user.gender))];
  const locations = [...new Set(users.map((user) => user.location))];
  const organizations = [...new Set(users.map((user) => user.organization))];

  // Filter users based on selected filters
  const filteredUsers = users.filter((user) => {
    const matchesDistrict =
      districtFilter === "all" || user.district === districtFilter;
    const matchesState =
      stateFilter === "all" || user.state === stateFilter;
    const matchesGender =
      genderFilter === "all" || user.gender === genderFilter;
    const matchesLocation =
      locationFilter === "all" || user.location === locationFilter;
    const matchesOrganization =
      organizationFilter === "all" || user.organization === organizationFilter;
    
    // Enhanced Event timing filter logic
    const matchesEventTiming = (() => {
      if (eventTimingFilter === "all") return true;
      
      const event = events.find(e => e.id === user.eventId);
      if (!event) return false;
      
      const currentDate = new Date();
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      switch (eventTimingFilter) {
        case "postponed":
          return event.isPostponed;
        case "backdated":
          return endDate < currentDate;
        case "ongoing":
          return startDate <= currentDate && currentDate <= endDate;
        case "upcoming":
          return startDate > currentDate && !event.isPostponed;
        default:
          return true;
      }
    })();

    // Add date range filter logic
    const matchesDateRange = (() => {
      if (!dateFilter.start && !dateFilter.end) return true;

      const event = events.find(e => e.id === user.eventId);
      if (!event) return false;

      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);
      
      const filterStartDate = dateFilter.start ? new Date(dateFilter.start) : null;
      const filterEndDate = dateFilter.end ? new Date(dateFilter.end) : null;

      if (filterStartDate && filterEndDate) {
        return eventStartDate >= filterStartDate && eventEndDate <= filterEndDate;
      } else if (filterStartDate) {
        return eventStartDate >= filterStartDate;
      } else if (filterEndDate) {
        return eventEndDate <= filterEndDate;
      }
      
      return true;
    })();

    const matchesEventId =
      eventIdFilter === "all" || user.eventId === eventIdFilter;

    // Handle visited camps filter with min-max range
    const matchesVisitedCamps = (() => {
      const { min, max } = campVisitsFilter;
      if (!min && !max) return true;

      const visits = user.visitedCamps;
      const minVisits = min === "" ? -Infinity : parseInt(min);
      const maxVisits = max === "" ? Infinity : parseInt(max);

      return visits >= minVisits && visits <= maxVisits;
    })();

    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.eventId.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesDistrict &&
      matchesState &&
      matchesGender &&
      matchesLocation &&
      matchesOrganization &&
      matchesEventId &&
      matchesVisitedCamps &&
      matchesSearch &&
      matchesEventTiming &&
      matchesDateRange
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

  // Add new state for selected category
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'postponed' | 'upcoming' | 'ongoing' | 'past'>('all');

  // Helper function to get filtered events based on category
  const getFilteredEvents = (category: typeof selectedCategory) => {
    if (category === 'all') return events;
    
    return events.filter(event => {
      const currentDate = new Date();
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      switch (category) {
        case 'postponed':
          return event.isPostponed;
        case 'upcoming':
          return startDate > currentDate && !event.isPostponed;
        case 'ongoing':
          return startDate <= currentDate && currentDate <= endDate && !event.isPostponed;
        case 'past':
          return endDate < currentDate;
        default:
          return true;
      }
    });
  };

  // Calculate revenue and bookings based on filtered events
  const getRevenue = (category: typeof selectedCategory) => {
    return getFilteredEvents(category).reduce((total, event) => {
      const bookedSeats = event.totalSeats - event.availableSeats;
      return total + (bookedSeats * event.fees);
    }, 0);
  };

  const getBookings = (category: typeof selectedCategory) => {
    return getFilteredEvents(category).reduce((total, event) => 
      total + (event.totalSeats - event.availableSeats), 0);
  };

  // Add new state for modal
  const [showModal, setShowModal] = useState(false);
  const [modalEvents, setModalEvents] = useState<Event[]>([]);
  const [modalTitle, setModalTitle] = useState('');

  // Add Modal component
  const EventDetailsModal = ({ isOpen, onClose, events, title }: { isOpen: boolean; onClose: () => void; events: Event[]; title: string }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-600">ID: {event.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.isPostponed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {event.isPostponed ? 'Postponed' : 'Active'}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{event.name}</h4>
                  <p className="text-gray-600 mt-1">{event.location}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Available Seats: {event.availableSeats}/{event.totalSeats}</p>
                    <p>Fees: ₹{event.fees.toLocaleString()}</p>
                    <p>Date: {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Update the handleCategoryClick function
  const handleCategoryClick = (category: 'postponed' | 'upcoming' | 'ongoing' | 'past') => {
    let filteredEvents: Event[] = [];
    let title = '';

    const currentDate = new Date();
    
    switch (category) {
      case 'postponed':
        filteredEvents = events.filter(event => event.isPostponed);
        title = 'Postponed Events';
        break;
      case 'upcoming':
        filteredEvents = events.filter(event => {
          const startDate = new Date(event.startDate);
          return startDate > currentDate && !event.isPostponed;
        });
        title = 'Upcoming Events';
        break;
      case 'ongoing':
        filteredEvents = events.filter(event => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          return startDate <= currentDate && currentDate <= endDate && !event.isPostponed;
        });
        title = 'Ongoing Events';
        break;
      case 'past':
        filteredEvents = events.filter(event => {
          const endDate = new Date(event.endDate);
          return endDate < currentDate;
        });
        title = 'Past Events';
        break;
    }

    setModalEvents(filteredEvents);
    setModalTitle(title);
    setShowModal(true);
    setSelectedCategory(category === selectedCategory ? 'all' : category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      {/* Add Modal component */}
      <EventDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        events={modalEvents}
        title={modalTitle}
      />
      
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-400">
          <h1 className="text-3xl font-bold text-white">
            All Bookings
          </h1>
          <p className="text-blue-100 mt-2">Manage and track all event bookings and payments</p>
        </div>

        {/* Statistics Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Event Status Box */}
          <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-6 shadow-lg border border-purple-400 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-purple-100 text-sm font-medium">Event Status</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedCategory === 'all' ? `${events.length} Events` : `${getFilteredEvents(selectedCategory).length} Events`}
                </h3>
              </div>
              <div className="p-3 bg-purple-400/30 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div 
                onClick={() => handleCategoryClick('postponed')}
                className={`bg-purple-400/20 rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                  selectedCategory === 'postponed' ? 'ring-2 ring-white bg-purple-400/40' : 'hover:bg-purple-400/30'
                }`}
              >
                <p className="text-purple-100 text-xs">Postponed</p>
                <p className="text-white font-bold">
                  {events.filter(event => event.isPostponed).length}
                </p>
              </div>
              <div 
                onClick={() => handleCategoryClick('upcoming')}
                className={`bg-purple-400/20 rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                  selectedCategory === 'upcoming' ? 'ring-2 ring-white bg-purple-400/40' : 'hover:bg-purple-400/30'
                }`}
              >
                <p className="text-purple-100 text-xs">Upcoming</p>
                <p className="text-white font-bold">
                  {events.filter(event => {
                    const startDate = new Date(event.startDate);
                    return startDate > new Date() && !event.isPostponed;
                  }).length}
                </p>
              </div>
              <div 
                onClick={() => handleCategoryClick('ongoing')}
                className={`bg-purple-400/20 rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                  selectedCategory === 'ongoing' ? 'ring-2 ring-white bg-purple-400/40' : 'hover:bg-purple-400/30'
                }`}
              >
                <p className="text-purple-100 text-xs">Ongoing</p>
                <p className="text-white font-bold">
                  {events.filter(event => {
                    const currentDate = new Date();
                    const startDate = new Date(event.startDate);
                    const endDate = new Date(event.endDate);
                    return startDate <= currentDate && currentDate <= endDate && !event.isPostponed;
                  }).length}
                </p>
              </div>
              <div 
                onClick={() => handleCategoryClick('past')}
                className={`bg-purple-400/20 rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                  selectedCategory === 'past' ? 'ring-2 ring-white bg-purple-400/40' : 'hover:bg-purple-400/30'
                }`}
              >
                <p className="text-purple-100 text-xs">Past</p>
                <p className="text-white font-bold">
                  {events.filter(event => {
                    const endDate = new Date(event.endDate);
                    return endDate < new Date();
                  }).length}
                </p>
              </div>
            </div>
          </div>

          {/* Total Revenue Box */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 shadow-lg border border-emerald-400 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">
                  {selectedCategory === 'all' ? 'Total Revenue' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Revenue`}
                </p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  ₹{getRevenue(selectedCategory).toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-emerald-400/30 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-emerald-100 text-sm">
              {selectedCategory === 'all' ? 'From all event bookings' : `From ${selectedCategory} events`}
            </div>
          </div>

          {/* Total Bookings Box */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 shadow-lg border border-blue-400 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  {selectedCategory === 'all' ? 'Total Bookings' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Bookings`}
                </p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {getBookings(selectedCategory)}
                </h3>
              </div>
              <div className="p-3 bg-blue-400/30 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-blue-100 text-sm">
              {selectedCategory === 'all' ? 'Across all events' : `For ${selectedCategory} events`}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-6">
          {/* Event Selection and Search Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Selection */}
            <div className="relative">
              <select
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                value={eventIdFilter}
                onChange={(e) => handleEventSelect(e.target.value)}
              >
                <option value="all">All Event IDs</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.id} - {event.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative">
              
            </div>
          </div>

          {/* Event Details Card */}
          {selectedEvent && (
            <div className="bg-gradient-to-br from-white via-white to-indigo-50/50 p-6 rounded-xl border border-indigo-100 shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-indigo-900">{selectedEvent.name}</h3>
                <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  ID: {selectedEvent.id}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-600">Location</label>
                  <p className="font-semibold text-gray-800">{selectedEvent.location}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-600">Date Range</label>
                  <p className="font-semibold text-gray-800">
                    {new Date(selectedEvent.startDate).toLocaleDateString()} - {new Date(selectedEvent.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-600">Eligibility</label>
                  <p className="font-semibold text-gray-800">{selectedEvent.eligibility}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-600">Organization</label>
                  <p className="font-semibold text-gray-800">{selectedEvent.organization}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-600">Fees</label>
                  <p className="font-semibold text-gray-800">₹{selectedEvent.fees.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-600">Seats</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-indigo-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(selectedEvent.availableSeats / selectedEvent.totalSeats) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-indigo-700">
                      {selectedEvent.availableSeats}/{selectedEvent.totalSeats}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Timing Filter */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-indigo-100 shadow-lg">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-indigo-700">Participant Category</label>
                <div className="space-y-4">
                  <select
                    className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    value={eventTimingFilter}
                    onChange={(e) => setEventTimingFilter(e.target.value)}
                  >
                    <option value="all">All Entries</option>
                    <option value="postponed">Postponed/Manual Entries Event Entries</option>
                    <option value="upcoming">Upcoming Event Entries</option>
                    <option value="ongoing">Ongoing Event Entries</option>
                    <option value="backdated">Past Event Entries</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Camp Visits Range Filter */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-indigo-100 shadow-lg">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-indigo-700">Camp Visits Range</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                      value={campVisitsFilter.min}
                      onChange={(e) => setCampVisitsFilter((prev) => ({ ...prev, min: e.target.value }))}
                      min="0"
                    />
                  </div>
                  <span className="text-indigo-400">-</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                      value={campVisitsFilter.max}
                      onChange={(e) => setCampVisitsFilter((prev) => ({ ...prev, max: e.target.value }))}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-indigo-100 shadow-lg">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-indigo-700">Date Range</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-indigo-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                      value={dateFilter.start}
                      onChange={(e) => setDateFilter((prev) => ({ ...prev, start: e.target.value }))}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-indigo-600 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                      value={dateFilter.end}
                      onChange={(e) => setDateFilter((prev) => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location and Other Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { value: locationFilter, setter: setLocationFilter, options: locations, label: "Location" },
              { value: districtFilter, setter: setDistrictFilter, options: districts, label: "District" },
              { value: stateFilter, setter: setStateFilter, options: states, label: "State" },
              { value: genderFilter, setter: setGenderFilter, options: genders, label: "Gender" },
              { value: organizationFilter, setter: setOrganizationFilter, options: organizations, label: "Organization" }
            ].map((filter, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 shadow-lg">
                <label className="block text-sm font-medium text-indigo-700 mb-2">{filter.label}</label>
                <select
                  className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                  value={filter.value}
                  onChange={(e) => filter.setter(e.target.value)}
                >
                  <option value="all">All {filter.label}s</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <input
                type="text"
                placeholder="Search users..."
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-xl shadow-sm transition-all duration-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value: string = e.target.value.toString();
                  const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
                  setSearchQuery(sanitizedValue);
                }}
                pattern="[a-zA-Z\s]*"
                title="Only letters and spaces are allowed"
              />
        </div>

        {/* Users Grid */}
        <div className="space-y-8">
          {/* Group and display users by category */}
          {(() => {
            // Helper function to get event category for a user
            const getUserCategory = (user: typeof users[0]) => {
              const event = events.find(e => e.id === user.eventId);
              if (!event) return null;
              
              const currentDate = new Date();
              const startDate = new Date(event.startDate);
              const endDate = new Date(event.endDate);

              if (event.isPostponed) return "postponed";
              if (endDate < currentDate) return "backdated";
              if (startDate <= currentDate && currentDate <= endDate) return "ongoing";
              if (startDate > currentDate) return "upcoming";
              return null;
            };

            // Group users by category
            const groupedUsers = filteredUsers.reduce((acc, user) => {
              const category = getUserCategory(user);
              if (category) {
                if (!acc[category]) acc[category] = [];
                acc[category].push(user);
              }
              return acc;
            }, {} as Record<string, typeof users>);

            // Category display configuration
            const categoryConfig = {
              postponed: {
                title: "Postponed Event Entries",
                description: "Users registered for postponed events",
                bgColor: "from-orange-50 to-red-50",
                borderColor: "border-orange-200",
                textColor: "text-orange-800"
              },
              upcoming: {
                title: "Upcoming Event Entries",
                description: "Users registered for future events",
                bgColor: "from-blue-50 to-indigo-50",
                borderColor: "border-blue-200",
                textColor: "text-blue-800"
              },
              ongoing: {
                title: "Ongoing Event Entries",
                description: "Users currently participating in events",
                bgColor: "from-green-50 to-emerald-50",
                borderColor: "border-green-200",
                textColor: "text-green-800"
              },
              backdated: {
                title: "Past Event Entries",
                description: "Users who participated in completed events",
                bgColor: "from-gray-50 to-slate-50",
                borderColor: "border-gray-200",
                textColor: "text-gray-800"
              }
            };

            // Only show categories that match the current filter
            const categoriesToShow = eventTimingFilter === "all" 
              ? Object.keys(categoryConfig)
              : [eventTimingFilter];

            return categoriesToShow.map(category => {
              const users = groupedUsers[category] || [];
              if (users.length === 0) return null;

              const config = categoryConfig[category as keyof typeof categoryConfig];

              return (
                <div key={category} className="space-y-4">
                  {/* Category Header */}
                  <div className={`p-6 rounded-xl border ${config.borderColor} bg-gradient-to-r ${config.bgColor}`}>
                    <h2 className={`text-xl font-bold ${config.textColor}`}>
                      {config.title}
                    </h2>
                    <p className={`mt-1 text-sm ${config.textColor} opacity-80`}>
                      {config.description} ({users.length} {users.length === 1 ? 'entry' : 'entries'})
                    </p>
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
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
