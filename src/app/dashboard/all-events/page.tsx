"use client";
import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import {
  FaTimes,
  FaPhone,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaMedal,
  FaArrowRight,
} from "react-icons/fa";
import EventDetailsCard from "@/app/components/dashboard/EventDetailsCard";
import EventsCard from "@/app/components/dashboard/EventsCard";

interface Creator {
  name: string;
  phone: string;
  organization: string;
  district: string;
  occupation: string;
  qualification?: string;
  profileImage?: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  district: string;
  status: string;
  eligibility: "male" | "female" | "all";
  fee: number;
  spots: string;
  image: string;
  schedule?: string;
  requirements?: string;
  creator?: Creator;
  undertaking?: string;
  paymentDetails?: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  coupons?: {
    code: string;
    discount: number;
    description: string;
  }[];
  referralCode?: {
    code: string;
    reward: string;
    description: string;
  };
  progress?: {
    completed: number;
    total: number;
    status: string;
  };
}

interface PastEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  district: string;
  eligibility: "male" | "female" | "all";
  impact: string;
  participants: number;
  role: string;
  achievement: string;
  image: string;
  schedule?: string;
  requirements?: string;
  creator?: Creator;
  feedback?: {
    food: number;
    stay: number;
    cleanliness: number;
    services: number;
    eventManager: number;
    sessionDelivered: number;
    travelling: number;
    comment?: string;
  };
  points?: {
    days: number;
    points: number;
    total_points: number;
    attendance?: string;
    participation?: number;
    bonus?: number;
  };
}
const MyEvents = () => {
  const searchParams = useSearchParams();
  const initialFilter = (searchParams?.get('filter') as 'all' | 'upcoming' | 'ongoing' | 'past') || 'all';
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedPastEvent, setSelectedPastEvent] = useState<PastEvent | null>(null);
  const [showPastEventDetails, setShowPastEventDetails] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'past'>(initialFilter);
  const [currentPage, setCurrentPage] = useState({
    upcoming: 1,
    ongoing: 1,
    past: 1
  });

  const ITEMS_PER_PAGE = 3;

  // Pagination helper functions
  const paginateEvents = <T extends Event | PastEvent>(events: T[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return events.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = <T extends Event | PastEvent>(events: T[]) => Math.ceil(events.length / ITEMS_PER_PAGE);

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
    category: 'upcoming' | 'ongoing' | 'past';
  }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 border border-blue-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={`${category}-${page}`}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 border border-blue-200'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 border border-blue-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  const [feedback, setFeedback] = useState<{
    food: number;
    stay: number;
    cleanliness: number;
    services: number;
    eventManager: number;
    sessionDelivered: number;
    travelling: number;
    comment: string;
  }>({
    food: 0,
    stay: 0,
    cleanliness: 0,
    services: 0,
    eventManager: 0,
    sessionDelivered: 0,
    travelling: 0,
    comment: ''
  });

  // Mock data for upcoming events with additional details
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Adventure Camp 2024",
      description:
        "Experience thrilling outdoor activities and team-building exercises in the heart of nature.",
      date: "15-20 April, 2024",
      location: "Lonavala, Maharashtra",
      district: "Pune",
      status: "Upcoming",
      eligibility: "male" as const,
      fee: 5000,
      spots: "50 spots available",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&fit=crop",
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
09:00 PM - Dinner

Day 3:
05:30 AM - Wake Up Call
06:00 AM - Morning Exercise
08:00 AM - Breakfast
09:00 AM - Trekking Expedition
01:00 PM - Packed Lunch
02:30 PM - Survival Skills Workshop
05:00 PM - Return to Camp
07:00 PM - Star Gazing Session
08:30 PM - Dinner`,
      requirements:
        "Basic fitness level, Comfortable clothing, Water bottle, Backpack",
      creator: {
        name: "Adventure Team",
        phone: "+91 98765 43210",
        organization: "Adventure Sports Club",
        district: "Pune",
        occupation: "Professional Adventure Guide",
        profileImage:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&fit=crop&auto=format",
      },
      undertaking:
        "I hereby declare that all the information provided is true to my knowledge. I understand and agree to follow all the rules and regulations of the camp. I take full responsibility for my actions during the camp.",
      paymentDetails: {
        accountName: "Adventure Sports Club",
        accountNumber: "1234567890",
        ifscCode: "ABCD0123456",
        bankName: "State Bank of India",
        branch: "Pune Main Branch",
      },
      coupons: [
        {
          code: "EARLY2024",
          discount: 500,
          description: "Early bird discount",
        },
        {
          code: "GROUP10",
          discount: 1000,
          description: "Group booking discount (min. 10 people)",
        },
      ],
      referralCode: {
        code: "FRIEND2024",
        reward: "Get ₹500 off on registration",
        description: "Enter a friend's referral code to get discount",
      },
    },
    {
      id: 2,
      title: "Mountain Hiking Expedition",
      description:
        "Join us for an exciting hiking adventure through scenic mountain trails.",
      date: "1-3 July, 2024",
      location: "Blue Mountain Trail, Pune",
      district: "Pune",
      status: "Registered",
      eligibility: "female" as const,
      fee: 2499,
      spots: "22 spots available",
      image:
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1470&fit=crop",
    },
    {
      id: 3,
      title: "Nature Photography Workshop",
      description:
        "Learn the art of nature photography with expert photographers in a scenic environment.",
      date: "10-12 May, 2024",
      location: "Matheran, Maharashtra",
      district: "Raigad",
      status: "Upcoming",
      eligibility: "all" as const,
      fee: 3500,
      spots: "30 spots available",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1474&fit=crop",
    },
    {
      id: 4,
      title: "Survival Skills Workshop",
      description: "Master essential survival skills in the wilderness with expert guides.",
      date: "5-7 June, 2024",
      location: "Sahyadri Mountains",
      district: "Pune",
      status: "Upcoming",
      eligibility: "all" as const,
      fee: 4000,
      spots: "25 spots available",
      image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=1470&fit=crop",
    },
    {
      id: 5,
      title: "Rock Climbing Adventure",
      description: "Challenge yourself with professional rock climbing training.",
      date: "20-22 May, 2024",
      location: "Duke's Nose, Lonavala",
      district: "Pune",
      status: "Upcoming",
      eligibility: "all" as const,
      fee: 3800,
      spots: "15 spots available",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1470&fit=crop",
    },
    {
      id: 6,
      title: "Riverside Camping Experience",
      description: "Enjoy a peaceful camping experience by the riverside.",
      date: "25-27 June, 2024",
      location: "Kolad",
      district: "Raigad",
      status: "Upcoming",
      eligibility: "all" as const,
      fee: 2800,
      spots: "40 spots available",
      image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=1470&fit=crop",
    },
    {
      id: 7,
      title: "Wildlife Photography Trek",
      description: "Capture the beauty of wildlife in their natural habitat.",
      date: "8-10 July, 2024",
      location: "Tadoba National Park",
      district: "Chandrapur",
      status: "Upcoming",
      eligibility: "all" as const,
      fee: 5500,
      spots: "20 spots available",
      image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1470&fit=crop",
    },
  ];

  // Mock data for ongoing events
  const ongoingEvents: Event[] = [
    {
      id: 101,
      title: "Wildlife Conservation Camp",
      description: "Join our ongoing efforts to protect and preserve local wildlife through education and hands-on conservation activities.",
      date: "March 1 - April 30, 2024",
      location: "Sahyadri Wildlife Sanctuary",
      district: "Pune",
      status: "In Progress",
      eligibility: "all" as const,
      fee: 3000,
      spots: "15/30 spots filled",
      image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1470&fit=crop",
    },
    {
      id: 102,
      title: "Sustainable Farming Workshop",
      description: "Learn and practice sustainable farming techniques in our month-long hands-on workshop.",
      date: "March 15 - April 15, 2024",
      location: "Green Earth Farm",
      district: "Pune",
      status: "Active",
      eligibility: "all" as const,
      fee: 2500,
      spots: "20/25 spots filled",
      image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1470&fit=crop",
    },
    {
      id: 103,
      title: "Mountain Leadership Program",
      description: "Develop leadership skills through challenging mountain activities.",
      date: "March 10 - April 10, 2024",
      location: "Himalayan Base Camp",
      district: "Uttarkashi",
      status: "Active",
      eligibility: "all" as const,
      fee: 6000,
      spots: "18/20 spots filled",
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1470&fit=crop",
    },
    {
      id: 104,
      title: "Forest Conservation Project",
      description: "Participate in ongoing forest conservation and restoration efforts.",
      date: "March 20 - April 20, 2024",
      location: "Western Ghats",
      district: "Satara",
      status: "Active",
      eligibility: "all" as const,
      fee: 2800,
      spots: "25/30 spots filled",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1470&fit=crop",
    },
    {
      id: 105,
      title: "Adventure Leadership Course",
      description: "Comprehensive leadership training through adventure activities.",
      date: "March 5 - April 5, 2024",
      location: "Adventure Academy",
      district: "Pune",
      status: "Active",
      eligibility: "all" as const,
      fee: 4500,
      spots: "22/25 spots filled",
      image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1470&fit=crop",
    },
  ];

  // Mock data for past contributions
  const pastContributions: PastEvent[] = [
    {
      id: 1,
      title: "Forest Cleanup Drive",
      description: "Led a team in a successful environmental cleanup campaign.",
      date: "15-18 March, 2024",
      location: "Green Valley Forest",
      district: "Pune",
      eligibility: "all" as const,
      impact: "150 kg waste collected",
      participants: 75,
      role: "Participant",
      achievement: "Gold Badge",
      image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1470&fit=crop",
    },
    {
      id: 2,
      title: "Tree Plantation Drive",
      description: "Participated in a massive tree plantation initiative for a greener future.",
      date: "February 28, 2024",
      location: "City Park",
      district: "Mumbai",
      eligibility: "all" as const,
      impact: "500 trees planted",
      participants: 120,
      role: "Participant",
      achievement: "Silver Badge",
      image: "https://images.unsplash.com/photo-1513377888081-794d8e958972?q=80&w=1470&fit=crop",
    },
    {
      id: 3,
      title: "Wildlife Conservation Project",
      description: "Contributed to wildlife habitat preservation and monitoring.",
      date: "January 15-20, 2024",
      location: "National Park",
      district: "Nagpur",
      eligibility: "all" as const,
      impact: "10 species monitored",
      participants: 45,
      role: "Team Leader",
      achievement: "Gold Badge",
      image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1470&fit=crop",
    },
    {
      id: 4,
      title: "River Cleanup Campaign",
      description: "Organized and led a successful river cleanup initiative.",
      date: "February 10-12, 2024",
      location: "Krishna River",
      district: "Satara",
      eligibility: "all" as const,
      impact: "200 kg waste removed",
      participants: 90,
      role: "Coordinator",
      achievement: "Platinum Badge",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1470&fit=crop",
    },
    {
      id: 5,
      title: "Mountain Trail Restoration",
      description: "Helped restore and maintain popular hiking trails.",
      date: "January 5-8, 2024",
      location: "Sahyadri Range",
      district: "Pune",
      eligibility: "all" as const,
      impact: "5 km trail restored",
      participants: 60,
      role: "Volunteer",
      achievement: "Silver Badge",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&fit=crop",
    },
    {
      id: 6,
      title: "Environmental Education Camp",
      description: "Conducted environmental awareness sessions for local communities.",
      date: "February 20-22, 2024",
      location: "Community Center",
      district: "Thane",
      eligibility: "all" as const,
      impact: "300 people educated",
      participants: 150,
      role: "Educator",
      achievement: "Gold Badge",
      image: "https://images.unsplash.com/photo-1503557122744-b650066ba62f?q=80&w=1470&fit=crop",
    },
    {
      id: 7,
      title: "Sustainable Living Workshop",
      description: "Taught sustainable living practices to local residents.",
      date: "March 1-3, 2024",
      location: "Eco Center",
      district: "Mumbai",
      eligibility: "all" as const,
      impact: "200 households reached",
      participants: 180,
      role: "Instructor",
      achievement: "Platinum Badge",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1470&fit=crop",
    },
    {
      id: 8,
      title: "Beach Cleanup Drive",
      description: "Organized a large-scale beach cleanup operation.",
      date: "March 8-10, 2024",
      location: "Juhu Beach",
      district: "Mumbai",
      eligibility: "all" as const,
      impact: "300 kg waste collected",
      participants: 200,
      role: "Coordinator",
      achievement: "Gold Badge",
      image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=1470&fit=crop",
    },
  ];

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const handlePastEventClick = (event: PastEvent) => {
    setSelectedPastEvent(event);
    setShowPastEventDetails(true);
  };

  const closePastEventDetails = () => {
    setShowPastEventDetails(false);
    setSelectedPastEvent(null);
  };

  // Add renderStarRating function
  const renderStarRating = (rating: number, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange?.(star)}
            className={`focus:outline-none transition-colors duration-150 ${onRatingChange ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <FaStar
              className={`w-5 h-5 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleFeedbackChange = (aspect: keyof typeof feedback, value: number) => {
    setFeedback(prev => ({
      ...prev,
      [aspect]: value
    }));
  };

  const handleSubmitFeedback = () => {
    // Here you would typically make an API call to save the feedback
    console.log('Submitting feedback:', feedback);
    
    // Update the past event with the feedback
    if (selectedPastEvent) {
      const updatedEvent = {
        ...selectedPastEvent,
        feedback: {
          ...feedback
        }
      };
      setSelectedPastEvent(updatedEvent);
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Filter Section */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {selectedFilter === 'all' ? 'All Events' :
             selectedFilter === 'upcoming' ? 'Upcoming Events' : 
             selectedFilter === 'ongoing' ? 'Ongoing Events' : 
             'Past Contributions'}
          </h1>
          <p className="text-gray-600 mt-2">
            {selectedFilter === 'all' ? 'View detail information of all events' :
             selectedFilter === 'upcoming' ? 'Discover and join exciting camping adventures' :
             selectedFilter === 'ongoing' ? 'Your active participation in environmental initiatives' :
             'Your impact on the environment and community'}
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-4 py-2 border rounded-lg text-gray-600 bg-white shadow-sm hover:border-blue-500 transition-colors"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'upcoming' | 'ongoing' | 'past')}
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming Events</option>
            <option value="ongoing">Ongoing Events</option>
            <option value="past">Past Contributions</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="space-y-12">
        {(selectedFilter === 'all' || selectedFilter === 'upcoming') && upcomingEvents.length > 0 && (
          <div>
            {selectedFilter === 'all' && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
                <p className="text-gray-600">Events you can register for and participate in</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginateEvents(upcomingEvents, currentPage.upcoming).map((event) => (
                <EventsCard
                  key={event.id}
                  {...event}
                  cardType="upcoming"
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
            <Pagination
              totalPages={getTotalPages(upcomingEvents)}
              currentPage={currentPage.upcoming}
              onPageChange={(page) => setCurrentPage(prev => ({ ...prev, upcoming: page }))}
              category="upcoming"
            />
          </div>
        )}
        
        {(selectedFilter === 'all' || selectedFilter === 'ongoing') && ongoingEvents.length > 0 && (
          <div>
            {selectedFilter === 'all' && (
              <div className="mb-6 mt-12">
                <h2 className="text-2xl font-semibold text-gray-800">Ongoing Events</h2>
                <p className="text-gray-600">Events currently in progress</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginateEvents(ongoingEvents, currentPage.ongoing).map((event) => (
                <EventsCard
                  key={event.id}
                  {...event}
                  cardType="ongoing"
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
            <Pagination
              totalPages={getTotalPages(ongoingEvents)}
              currentPage={currentPage.ongoing}
              onPageChange={(page) => setCurrentPage(prev => ({ ...prev, ongoing: page }))}
              category="ongoing"
            />
          </div>
        )}
        
        {(selectedFilter === 'all' || selectedFilter === 'past') && pastContributions.length > 0 && (
          <div>
            {selectedFilter === 'all' && (
              <div className="mb-6 mt-12">
                <h2 className="text-2xl font-semibold text-gray-800">Past Contributions</h2>
                <p className="text-gray-600">Events you have participated in</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginateEvents(pastContributions, currentPage.past).map((event) => (
                <EventsCard
                  key={event.id}
                  {...event}
                  cardType="past"
                  onClick={() => handlePastEventClick(event)}
                />
              ))}
            </div>
            <Pagination
              totalPages={getTotalPages(pastContributions)}
              currentPage={currentPage.past}
              onPageChange={(page) => setCurrentPage(prev => ({ ...prev, past: page }))}
              category="past"
            />
          </div>
        )}

        {/* No Events Message */}
        {selectedFilter === 'all' && 
          upcomingEvents.length === 0 && 
          ongoingEvents.length === 0 && 
          pastContributions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No events found.</p>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <EventDetailsCard event={selectedEvent} onClose={closeEventDetails} />
      )}

      {/* Past Event Details Modal */}
      {showPastEventDetails && selectedPastEvent && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePastEventDetails}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all">
                {/* Close Button */}
                <button
                  onClick={closePastEventDetails}
                  className="absolute -top-2 -right-2 z-[150] bg-white rounded-full p-2.5 shadow-xl hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>

                {/* Modal Header */}
                <div className="sticky top-0 z-[102] bg-white px-6 py-4 border-b border-gray-200 rounded-t-2xl">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Event Details
                  </h2>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={selectedPastEvent.image}
                      alt={selectedPastEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {selectedPastEvent.title}
                      </h3>
                      <p className="text-white/90">
                        {selectedPastEvent.description}
                      </p>
                    </div>
                  </div>

                  {/* Points Information */}
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-semibold text-white">Points Collected</h4>
                        
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {/* Attendance Points */}
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-bold text-white">
                              {selectedPastEvent.points?.attendance || 'Gold Badge'}
                            </span>
                            <span className="text-xs text-white/80">Acheivement</span>
                          </div>
                        </div>

                        {/* Participation Points */}
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-bold text-white">
                              {selectedPastEvent.points?.participation || 0}
                            </span>
                            <span className="text-xs text-white/80">Your Points</span>
                          </div>
                        </div>

                        {/* Bonus Points */}
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-bold text-white">
                              {selectedPastEvent.points?.bonus || 0}
                            </span>
                            <span className="text-xs text-white/80">Total Points</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full width Event Information */}
                  <div className="space-y-6">
                    {/* Event Information - Full Width */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Event Information
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-3">
                          <FaMapMarkerAlt className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">
                              {selectedPastEvent.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaCalendarAlt className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">
                              {selectedPastEvent.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaMedal className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Achievement</p>
                            <p className="font-medium">
                              {selectedPastEvent.achievement}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaUsers className="text-red-500" />
                          <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium">
                              {selectedPastEvent.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details - Full Width */}
                    {selectedPastEvent.creator && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Contact Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-red-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Event Manager
                              </p>
                              <p className="font-medium">
                                {selectedPastEvent.creator.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaPhone className="text-red-500" />
                            <div>
                              <p className="text-sm text-gray-500">Contact</p>
                              <p className="font-medium">
                                {selectedPastEvent.creator.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-red-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Qualification/Experience
                              </p>
                              <p className="font-medium">
                                {selectedPastEvent.creator.qualification}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Two Column Layout for Schedule and Impact Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column - Schedule and Requirements */}
                      <div className="space-y-6">
                        {selectedPastEvent.schedule && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Schedule
                            </h4>
                            <div className="space-y-6">
                              {selectedPastEvent.schedule
                                .split("\n\n")
                                .map((day, dayIndex) => {
                                  const [dayTitle, ...timeSlots] =
                                    day.split("\n");
                                  return (
                                    <div
                                      key={dayIndex}
                                      className="bg-gray-50 rounded-lg p-4"
                                    >
                                      <h5 className="font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                        {dayTitle}
                                      </h5>
                                      <div className="space-y-3">
                                        {timeSlots.map((slot, slotIndex) => {
                                          const [time, activity] =
                                            slot.split(" - ");
                                          return (
                                            <div
                                              key={slotIndex}
                                              className="flex items-start gap-4"
                                            >
                                              <div className="w-24 flex-shrink-0">
                                                <span className="text-sm font-medium text-red-600">
                                                  {time}
                                                </span>
                                              </div>
                                              <div className="flex-1">
                                                <span className="text-sm text-gray-600">
                                                  {activity}
                                                </span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}

                        {selectedPastEvent.requirements && (
                          <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Requirements
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm text-gray-600">
                                {selectedPastEvent.requirements}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Impact Details and Feedback */}
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            Impact Details
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                  Total Impact
                                </span>
                                <span className="text-lg font-bold text-red-600">
                                  {selectedPastEvent.impact}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                  Participants
                                </span>
                                <span className="text-lg font-bold text-red-600">
                                  {selectedPastEvent.participants}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                  Achievement
                                </span>
                                <span className="text-lg font-bold text-red-600">
                                  {selectedPastEvent.achievement}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900">Event Feedback</h4>
                          <div className="space-y-4">
                            {/* Food Rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Food Quality</span>
                              {renderStarRating(
                                selectedPastEvent.feedback?.food || feedback.food,
                                selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('food', rating)
                              )}
                            </div>

                            {/* Stay Rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Accommodation</span>
                              {renderStarRating(
                                selectedPastEvent.feedback?.stay || feedback.stay,
                                selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('stay', rating)
                              )}
                            </div>

                            {/* Cleanliness Rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Cleanliness</span>
                              {renderStarRating(
                                selectedPastEvent.feedback?.cleanliness || feedback.cleanliness,
                                selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('cleanliness', rating)
                              )}
                            </div>

                            {/* Services Rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Services</span>
                              {renderStarRating(
                                selectedPastEvent.feedback?.services || feedback.services,
                                selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('services', rating)
                              )}
                            </div>

                            {/* Event Manager Rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Event Manager</span>
                              {renderStarRating(
                                selectedPastEvent.feedback?.eventManager || feedback.eventManager,
                                selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('eventManager', rating)
                              )}
                            </div>

                            {/* Session Delivered Rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Session Quality</span>
                              {renderStarRating(
                                selectedPastEvent.feedback?.sessionDelivered || feedback.sessionDelivered,
                                selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('sessionDelivered', rating)
                              )}
                            </div>

                            {/* Travelling Rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">Travel Arrangements</span>
                              {renderStarRating(
                                selectedPastEvent.feedback?.travelling || feedback.travelling,
                                selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('travelling', rating)
                              )}
                            </div>

                            {/* Comment Section */}
                            {!selectedPastEvent.feedback && (
                              <div className="mt-4">
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-600 mb-2">
                                  Additional Comments
                                </label>
                                <textarea
                                  id="comment"
                                  rows={3}
                                  className="w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Share your thoughts about the event..."
                                  value={feedback.comment}
                                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                                />
                              </div>
                            )}

                            {/* Submit Button */}
                            {!selectedPastEvent.feedback && (
                              <div className="flex justify-end mt-6">
                                <button
                                  onClick={handleSubmitFeedback}
                                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                                >
                                  <span>Submit Feedback</span>
                                  <FaArrowRight />
                                </button>
                              </div>
                            )}

                            {/* Feedback Submitted Message */}
                            {selectedPastEvent.feedback && (
                              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-800">
                                  Thank you for your feedback! Your ratings help us improve our events.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const MyEventsWrapper = () => {
  return (
    <Suspense>
      <MyEvents />
    </Suspense>
  );
};

export default MyEventsWrapper;
