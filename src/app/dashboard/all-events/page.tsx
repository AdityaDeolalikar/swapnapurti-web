// "use client";
// import React, { useState } from "react";
// import { useSearchParams } from 'next/navigation';
// import {
//   FaTimes,
//   FaPhone,
//   FaStar,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaUsers,
//   FaMedal,
//   FaArrowRight,
// } from "react-icons/fa";
// import EventDetailsCard from "@/app/components/dashboard/EventDetailsCard";
// import EventsCard from "@/app/components/dashboard/EventsCard";

// interface Creator {
//   name: string;
//   phone: string;
//   organization: string;
//   district: string;
//   occupation: string;
//   qualification?: string;
//   profileImage?: string;
// }

// interface Event {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   district: string;
//   status: string;
//   eligibility: "male" | "female" | "all";
//   fee: number;
//   spots: string;
//   image: string;
//   schedule?: string;
//   requirements?: string;
//   creator?: Creator;
//   undertaking?: string;
//   paymentDetails?: {
//     accountName: string;
//     accountNumber: string;
//     ifscCode: string;
//     bankName: string;
//     branch: string;
//   };
//   coupons?: {
//     code: string;
//     discount: number;
//     description: string;
//   }[];
//   referralCode?: {
//     code: string;
//     reward: string;
//     description: string;
//   };
//   progress?: {
//     completed: number;
//     total: number;
//     status: string;
//   };
// }

// interface PastEvent {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   district: string;
//   eligibility: "male" | "female" | "all";
//   impact: string;
//   participants: number;
//   role: string;
//   achievement: string;
//   image: string;
//   schedule?: string;
//   requirements?: string;
//   creator?: Creator;
//   feedback?: {
//     food: number;
//     stay: number;
//     cleanliness: number;
//     services: number;
//     eventManager: number;
//     sessionDelivered: number;
//     travelling: number;
//     comment?: string;
//   };
//   points?: {
//     days: number;
//     points: number;
//     total_points: number;
//     attendance?: string;
//     participation?: number;
//     bonus?: number;
//   };
// }

// export default function MyEvents() {
//   const searchParams = useSearchParams();
//   const initialFilter = (searchParams.get('filter') as 'all' | 'upcoming' | 'ongoing' | 'past') || 'all';
  
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [showEventDetails, setShowEventDetails] = useState(false);
//   const [selectedPastEvent, setSelectedPastEvent] = useState<PastEvent | null>(null);
//   const [showPastEventDetails, setShowPastEventDetails] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'past'>(initialFilter);
//   const [feedback, setFeedback] = useState<{
//     food: number;
//     stay: number;
//     cleanliness: number;
//     services: number;
//     eventManager: number;
//     sessionDelivered: number;
//     travelling: number;
//     comment: string;
//   }>({
//     food: 0,
//     stay: 0,
//     cleanliness: 0,
//     services: 0,
//     eventManager: 0,
//     sessionDelivered: 0,
//     travelling: 0,
//     comment: ''
//   });

//   // Mock data for upcoming events with additional details
//   const upcomingEvents: Event[] = [
//     {
//       id: 1,
//       title: "Adventure Camp 2024",
//       description:
//         "Experience thrilling outdoor activities and team-building exercises in the heart of nature.",
//       date: "15-20 April, 2024",
//       location: "Lonavala, Maharashtra",
//       district: "Pune",
//       status: "Upcoming",
//       eligibility: "male" as const,
//       fee: 5000,
//       spots: "50 spots available",
//       image:
//         "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&fit=crop",
//       schedule: `Day 1:
// 06:00 AM - Morning Tea & Snacks
// 07:00 AM - Arrival and Registration
// 09:00 AM - Welcome Ceremony
// 01:00 PM - Lunch Break
// 02:00 PM - Camp Setup Training
// 05:00 PM - Evening Tea
// 06:00 PM - Team Building Activities
// 08:00 PM - Dinner

// Day 2:
// 05:30 AM - Wake Up Call
// 06:00 AM - Morning Yoga and Exercise
// 08:00 AM - Breakfast
// 09:00 AM - Rock Climbing Workshop
// 01:00 PM - Lunch Break
// 02:30 PM - Nature Trail Exploration
// 05:00 PM - Evening Tea & Snacks
// 07:00 PM - Campfire and Cultural Night
// 09:00 PM - Dinner

// Day 3:
// 05:30 AM - Wake Up Call
// 06:00 AM - Morning Exercise
// 08:00 AM - Breakfast
// 09:00 AM - Trekking Expedition
// 01:00 PM - Packed Lunch
// 02:30 PM - Survival Skills Workshop
// 05:00 PM - Return to Camp
// 07:00 PM - Star Gazing Session
// 08:30 PM - Dinner`,
//       requirements:
//         "Basic fitness level, Comfortable clothing, Water bottle, Backpack",
//       creator: {
//         name: "Adventure Team",
//         phone: "+91 98765 43210",
//         organization: "Adventure Sports Club",
//         district: "Pune",
//         occupation: "Professional Adventure Guide",
//         profileImage:
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&fit=crop&auto=format",
//       },
//       undertaking:
//         "I hereby declare that all the information provided is true to my knowledge. I understand and agree to follow all the rules and regulations of the camp. I take full responsibility for my actions during the camp.",
//       paymentDetails: {
//         accountName: "Adventure Sports Club",
//         accountNumber: "1234567890",
//         ifscCode: "ABCD0123456",
//         bankName: "State Bank of India",
//         branch: "Pune Main Branch",
//       },
//       coupons: [
//         {
//           code: "EARLY2024",
//           discount: 500,
//           description: "Early bird discount",
//         },
//         {
//           code: "GROUP10",
//           discount: 1000,
//           description: "Group booking discount (min. 10 people)",
//         },
//       ],
//       referralCode: {
//         code: "FRIEND2024",
//         reward: "Get ₹500 off on registration",
//         description: "Enter a friend's referral code to get discount",
//       },
//     },
//     {
//       id: 2,
//       title: "Mountain Hiking Expedition",
//       description:
//         "Join us for an exciting hiking adventure through scenic mountain trails.",
//       date: "1-3 July, 2024",
//       location: "Blue Mountain Trail, Pune",
//       district: "Pune",
//       status: "Registered",
//       eligibility: "female" as const,
//       fee: 2499,
//       spots: "22 spots available",
//       image:
//         "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1470&fit=crop",
//     },
//     {
//       id: 3,
//       title: "Nature Photography Workshop",
//       description:
//         "Learn the art of nature photography with expert photographers in a scenic environment.",
//       date: "10-12 May, 2024",
//       location: "Matheran, Maharashtra",
//       district: "Raigad",
//       status: "Upcoming",
//       eligibility: "all" as const,
//       fee: 3500,
//       spots: "30 spots available",
//       image:
//         "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1474&fit=crop",
//     },
//   ];

//   // Mock data for ongoing events
//   const ongoingEvents: Event[] = [
//     {
//       id: 101,
//       title: "Wildlife Conservation Camp",
//       description: "Join our ongoing efforts to protect and preserve local wildlife through education and hands-on conservation activities.",
//       date: "March 1 - April 30, 2024",
//       location: "Sahyadri Wildlife Sanctuary",
//       district: "Pune",
//       status: "In Progress",
//       eligibility: "all" as const,
//       fee: 3000,
//       spots: "15/30 spots filled",
//       image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1470&fit=crop",
//       schedule: `Week 1-2:
// 08:00 AM - Morning Wildlife Survey
// 10:00 AM - Data Collection
// 01:00 PM - Lunch Break
// 02:00 PM - Conservation Activities
// 05:00 PM - Evening Review

// Week 3-4:
// 07:00 AM - Habitat Monitoring
// 09:00 AM - Species Documentation
// 12:00 PM - Lunch Break
// 01:00 PM - Conservation Planning
// 04:00 PM - Progress Review`,
//       requirements: "Basic wildlife knowledge, Physical fitness, Camera, Field notebook",
//       creator: {
//         name: "Wildlife Conservation Team",
//         phone: "+91 98765 43210",
//         organization: "Sahyadri Wildlife Trust",
//         district: "Pune",
//         occupation: "Wildlife Conservationist",
//         profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2940&fit=crop&auto=format"
//       },
//       progress: {
//         completed: 2,
//         total: 8,
//         status: "Week 2 of 8"
//       }
//     },
//     {
//       id: 102,
//       title: "Sustainable Farming Workshop",
//       description: "Learn and practice sustainable farming techniques in our month-long hands-on workshop.",
//       date: "March 15 - April 15, 2024",
//       location: "Green Earth Farm",
//       district: "Pune",
//       status: "Active",
//       eligibility: "all" as const,
//       fee: 2500,
//       spots: "20/25 spots filled",
//       image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1470&fit=crop",
//       progress: {
//         completed: 1,
//         total: 4,
//         status: "Week 1 of 4"
//       }
//     }
//   ];

//   // Mock data for past contributions
//   const pastContributions: PastEvent[] = [
//     {
//       id: 1,
//       title: "Forest Cleanup Drive",
//       description: "Led a team in a successful environmental cleanup campaign.",
//       date: "15-18 March, 2024",
//       location: "Green Valley Forest",
//       district: "Pune",
//       eligibility: "all" as const,
//       impact: "150 kg waste collected",
//       participants: 75,
//       role: "Participant",
//       achievement: "Gold Badge",
//       image:
//         "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1470&fit=crop",
//       schedule: `Day 1:
// 08:00 AM - Team Briefing
// 09:00 AM - Equipment Distribution
// 10:00 AM - Cleanup Activity Begins
// 01:00 PM - Lunch Break
// 02:00 PM - Resume Cleanup
// 05:00 PM - Waste Collection and Segregation
// 06:00 PM - Team Debrief`,
//       requirements: "Gloves, Water bottle, Comfortable clothing, Hat",
//       creator: {
//         name: "Green Earth Initiative",
//         phone: "+91 98765 43210",
//         organization: "Environmental Conservation Group",
//         district: "Pune",
//         occupation: "Environmental Specialist",
//         profileImage:
//           "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format",
//       },
//     },
//     {
//       id: 2,
//       title: "Tree Plantation Drive",
//       description:
//         "Participated in a massive tree plantation initiative for a greener future.",
//       date: "February 28, 2024",
//       location: "City Park",
//       district: "Mumbai",
//       eligibility: "all" as const,
//       impact: "500 trees planted",
//       participants: 120,
//       role: "Participant",
//       achievement: "Silver Badge",
//       image:
//         "https://images.unsplash.com/photo-1513377888081-794d8e958972?q=80&w=1470&fit=crop",
//       schedule: `Day 1:
// 07:00 AM - Registration
// 08:00 AM - Orientation
// 09:00 AM - Tree Planting Begins
// 01:00 PM - Lunch Break
// 02:00 PM - Continue Planting
// 05:00 PM - Completion Ceremony`,
//       requirements: "Garden gloves, Water bottle, Hat, Comfortable clothing",
//       creator: {
//         name: "Green Mumbai",
//         phone: "+91 98765 43210",
//         organization: "City Environmental Department",
//         qualification: "Environmental Department Head",
//         district: "Mumbai",
//         occupation: "Environmental Officer",
//         profileImage:
//           "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format",
//       },
//     },
//   ];

//   const handleEventClick = (event: Event) => {
//     setSelectedEvent(event);
//     setShowEventDetails(true);
//   };

//   const closeEventDetails = () => {
//     setShowEventDetails(false);
//     setSelectedEvent(null);
//   };

//   const handlePastEventClick = (event: PastEvent) => {
//     setSelectedPastEvent(event);
//     setShowPastEventDetails(true);
//   };

//   const closePastEventDetails = () => {
//     setShowPastEventDetails(false);
//     setSelectedPastEvent(null);
//   };

//   // Add renderStarRating function
//   const renderStarRating = (rating: number, onRatingChange?: (rating: number) => void) => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             onClick={() => onRatingChange?.(star)}
//             className={`focus:outline-none transition-colors duration-150 ${onRatingChange ? 'cursor-pointer' : 'cursor-default'}`}
//           >
//             <FaStar
//               className={`w-5 h-5 ${
//                 star <= rating ? 'text-yellow-400' : 'text-gray-300'
//               }`}
//             />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const handleFeedbackChange = (aspect: keyof typeof feedback, value: number) => {
//     setFeedback(prev => ({
//       ...prev,
//       [aspect]: value
//     }));
//   };

//   const handleSubmitFeedback = () => {
//     // Here you would typically make an API call to save the feedback
//     console.log('Submitting feedback:', feedback);
    
//     // Update the past event with the feedback
//     if (selectedPastEvent) {
//       const updatedEvent = {
//         ...selectedPastEvent,
//         feedback: {
//           ...feedback
//         }
//       };
//       setSelectedPastEvent(updatedEvent);
//     }
//   };

//   return (
//     <div className="space-y-8 p-6">
//       {/* Filter Section */}
//       <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             {selectedFilter === 'all' ? 'All Events' :
//              selectedFilter === 'upcoming' ? 'Upcoming Events' : 
//              selectedFilter === 'ongoing' ? 'Ongoing Events' : 
//              'Past Contributions'}
//           </h1>
//           <p className="text-gray-600 mt-2">
//             {selectedFilter === 'all' ? 'View detail information of all events' :
//              selectedFilter === 'upcoming' ? 'Discover and join exciting camping adventures' :
//              selectedFilter === 'ongoing' ? 'Your active participation in environmental initiatives' :
//              'Your impact on the environment and community'}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <select 
//             className="px-4 py-2 border rounded-lg text-gray-600 bg-white shadow-sm hover:border-blue-500 transition-colors"
//             value={selectedFilter}
//             onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'upcoming' | 'ongoing' | 'past')}
//           >
//             <option value="all">All Events</option>
//             <option value="upcoming">Upcoming Events</option>
//             <option value="ongoing">Ongoing Events</option>
//             <option value="past">Past Contributions</option>
//           </select>
//         </div>
//       </div>

//       {/* Events Grid */}
//       <div className="space-y-12">
//         {(selectedFilter === 'all' || selectedFilter === 'upcoming') && upcomingEvents.length > 0 && (
//           <div>
//             {selectedFilter === 'all' && (
//               <div className="mb-6">
//                 <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
//                 <p className="text-gray-600">Events you can register for and participate in</p>
//               </div>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {upcomingEvents.map((event) => (
//                 <EventsCard
//                   key={event.id}
//                   {...event}
//                   cardType="upcoming"
//                   onClick={() => handleEventClick(event)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
        
//         {(selectedFilter === 'all' || selectedFilter === 'ongoing') && ongoingEvents.length > 0 && (
//           <div>
//             {selectedFilter === 'all' && (
//               <div className="mb-6 mt-12">
//                 <h2 className="text-2xl font-semibold text-gray-800">Ongoing Events</h2>
//                 <p className="text-gray-600">Events currently in progress</p>
//               </div>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {ongoingEvents.map((event) => (
//                 <EventsCard
//                   key={event.id}
//                   {...event}
//                   cardType="ongoing"
//                   onClick={() => handleEventClick(event)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
        
//         {(selectedFilter === 'all' || selectedFilter === 'past') && pastContributions.length > 0 && (
//           <div>
//             {selectedFilter === 'all' && (
//               <div className="mb-6 mt-12">
//                 <h2 className="text-2xl font-semibold text-gray-800">Past Contributions</h2>
//                 <p className="text-gray-600">Events you have participated in</p>
//               </div>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {pastContributions.map((event) => (
//                 <EventsCard
//                   key={event.id}
//                   {...event}
//                   cardType="past"
//                   onClick={() => handlePastEventClick(event)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* No Events Message */}
//         {selectedFilter === 'all' && 
//           upcomingEvents.length === 0 && 
//           ongoingEvents.length === 0 && 
//           pastContributions.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No events found.</p>
//           </div>
//         )}
//       </div>

//       {/* Event Details Modal */}
//       {showEventDetails && selectedEvent && (
//         <EventDetailsCard event={selectedEvent} onClose={closeEventDetails} />
//       )}

//       {/* Past Event Details Modal */}
//       {showPastEventDetails && selectedPastEvent && (
//         <div className="fixed inset-0 z-[100] overflow-hidden">
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closePastEventDetails}
//           />

//           {/* Modal Container */}
//           <div className="fixed inset-0 z-[101] overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4">
//               <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all">
//                 {/* Close Button */}
//                 <button
//                   onClick={closePastEventDetails}
//                   className="absolute -top-2 -right-2 z-[150] bg-white rounded-full p-2.5 shadow-xl hover:bg-gray-100 transition-colors border border-gray-100"
//                 >
//                   <FaTimes className="w-5 h-5 text-gray-600" />
//                 </button>

//                 {/* Modal Header */}
//                 <div className="sticky top-0 z-[102] bg-white px-6 py-4 border-b border-gray-200 rounded-t-2xl">
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Event Details
//                   </h2>
//                 </div>

//                 {/* Modal Content */}
//                 <div className="p-6">
//                   <div className="relative h-64 rounded-xl overflow-hidden mb-6">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
//                     <img
//                       src={selectedPastEvent.image}
//                       alt={selectedPastEvent.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute bottom-4 left-4 right-4 z-20">
//                       <h3 className="text-2xl font-bold text-white mb-2">
//                         {selectedPastEvent.title}
//                       </h3>
//                       <p className="text-white/90">
//                         {selectedPastEvent.description}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Points Information */}
//                   <div className="mb-4">
//                     <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="text-base font-semibold text-white">Points Collected</h4>
                        
//                       </div>
//                       <div className="grid grid-cols-3 gap-3">
//                         {/* Attendance Points */}
//                         <div className="bg-white/10 rounded-lg p-3">
//                           <div className="flex flex-col items-center">
//                             <span className="text-lg font-bold text-white">
//                               {selectedPastEvent.points?.attendance || 'Gold Badge'}
//                             </span>
//                             <span className="text-xs text-white/80">Acheivement</span>
//                           </div>
//                         </div>

//                         {/* Participation Points */}
//                         <div className="bg-white/10 rounded-lg p-3">
//                           <div className="flex flex-col items-center">
//                             <span className="text-lg font-bold text-white">
//                               {selectedPastEvent.points?.participation || 0}
//                             </span>
//                             <span className="text-xs text-white/80">Your Points</span>
//                           </div>
//                         </div>

//                         {/* Bonus Points */}
//                         <div className="bg-white/10 rounded-lg p-3">
//                           <div className="flex flex-col items-center">
//                             <span className="text-lg font-bold text-white">
//                               {selectedPastEvent.points?.bonus || 0}
//                             </span>
//                             <span className="text-xs text-white/80">Total Points</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Full width Event Information */}
//                   <div className="space-y-6">
//                     {/* Event Information - Full Width */}
//                     <div className="bg-white rounded-xl shadow p-6 space-y-4">
//                       <h4 className="text-lg font-semibold text-gray-900">
//                         Event Information
//                       </h4>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div className="flex items-center space-x-3">
//                           <FaMapMarkerAlt className="text-red-500" />
//                           <div>
//                             <p className="text-sm text-gray-500">Location</p>
//                             <p className="font-medium">
//                               {selectedPastEvent.location}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-3">
//                           <FaCalendarAlt className="text-red-500" />
//                           <div>
//                             <p className="text-sm text-gray-500">Date</p>
//                             <p className="font-medium">
//                               {selectedPastEvent.date}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-3">
//                           <FaMedal className="text-red-500" />
//                           <div>
//                             <p className="text-sm text-gray-500">Achievement</p>
//                             <p className="font-medium">
//                               {selectedPastEvent.achievement}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-3">
//                           <FaUsers className="text-red-500" />
//                           <div>
//                             <p className="text-sm text-gray-500">Role</p>
//                             <p className="font-medium">
//                               {selectedPastEvent.role}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Contact Details - Full Width */}
//                     {selectedPastEvent.creator && (
//                       <div className="bg-white rounded-xl shadow p-6 space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900">
//                           Contact Details
//                         </h4>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <div className="flex items-center space-x-3">
//                             <FaUsers className="text-red-500" />
//                             <div>
//                               <p className="text-sm text-gray-500">
//                                 Event Manager
//                               </p>
//                               <p className="font-medium">
//                                 {selectedPastEvent.creator.name}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-3">
//                             <FaPhone className="text-red-500" />
//                             <div>
//                               <p className="text-sm text-gray-500">Contact</p>
//                               <p className="font-medium">
//                                 {selectedPastEvent.creator.phone}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-3">
//                             <FaUsers className="text-red-500" />
//                             <div>
//                               <p className="text-sm text-gray-500">
//                                 Qualification/Experience
//                               </p>
//                               <p className="font-medium">
//                                 {selectedPastEvent.creator.qualification}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Two Column Layout for Schedule and Impact Details */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                       {/* Left Column - Schedule and Requirements */}
//                       <div className="space-y-6">
//                         {selectedPastEvent.schedule && (
//                           <div className="bg-white rounded-xl shadow p-6 space-y-4">
//                             <h4 className="text-lg font-semibold text-gray-900">
//                               Schedule
//                             </h4>
//                             <div className="space-y-6">
//                               {selectedPastEvent.schedule
//                                 .split("\n\n")
//                                 .map((day, dayIndex) => {
//                                   const [dayTitle, ...timeSlots] =
//                                     day.split("\n");
//                                   return (
//                                     <div
//                                       key={dayIndex}
//                                       className="bg-gray-50 rounded-lg p-4"
//                                     >
//                                       <h5 className="font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                                         {dayTitle}
//                                       </h5>
//                                       <div className="space-y-3">
//                                         {timeSlots.map((slot, slotIndex) => {
//                                           const [time, activity] =
//                                             slot.split(" - ");
//                                           return (
//                                             <div
//                                               key={slotIndex}
//                                               className="flex items-start gap-4"
//                                             >
//                                               <div className="w-24 flex-shrink-0">
//                                                 <span className="text-sm font-medium text-red-600">
//                                                   {time}
//                                                 </span>
//                                               </div>
//                                               <div className="flex-1">
//                                                 <span className="text-sm text-gray-600">
//                                                   {activity}
//                                                 </span>
//                                               </div>
//                                             </div>
//                                           );
//                                         })}
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                             </div>
//                           </div>
//                         )}

//                         {selectedPastEvent.requirements && (
//                           <div className="bg-white rounded-xl shadow p-6 space-y-4">
//                             <h4 className="text-lg font-semibold text-gray-900">
//                               Requirements
//                             </h4>
//                             <div className="bg-gray-50 rounded-lg p-4">
//                               <p className="text-sm text-gray-600">
//                                 {selectedPastEvent.requirements}
//                               </p>
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       {/* Right Column - Impact Details and Feedback */}
//                       <div className="space-y-6">
//                         <div className="bg-white rounded-xl shadow p-6 space-y-4">
//                           <h4 className="text-lg font-semibold text-gray-900">
//                             Impact Details
//                           </h4>
//                           <div className="bg-gray-50 rounded-lg p-4">
//                             <div className="space-y-3">
//                               <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">
//                                   Total Impact
//                                 </span>
//                                 <span className="text-lg font-bold text-red-600">
//                                   {selectedPastEvent.impact}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">
//                                   Participants
//                                 </span>
//                                 <span className="text-lg font-bold text-red-600">
//                                   {selectedPastEvent.participants}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">
//                                   Achievement
//                                 </span>
//                                 <span className="text-lg font-bold text-red-600">
//                                   {selectedPastEvent.achievement}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Feedback Section */}
//                         <div className="bg-white rounded-xl shadow p-6 space-y-4">
//                           <h4 className="text-lg font-semibold text-gray-900">Event Feedback</h4>
//                           <div className="space-y-4">
//                             {/* Food Rating */}
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm font-medium text-gray-600">Food Quality</span>
//                               {renderStarRating(
//                                 selectedPastEvent.feedback?.food || feedback.food,
//                                 selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('food', rating)
//                               )}
//                             </div>

//                             {/* Stay Rating */}
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm font-medium text-gray-600">Accommodation</span>
//                               {renderStarRating(
//                                 selectedPastEvent.feedback?.stay || feedback.stay,
//                                 selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('stay', rating)
//                               )}
//                             </div>

//                             {/* Cleanliness Rating */}
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm font-medium text-gray-600">Cleanliness</span>
//                               {renderStarRating(
//                                 selectedPastEvent.feedback?.cleanliness || feedback.cleanliness,
//                                 selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('cleanliness', rating)
//                               )}
//                             </div>

//                             {/* Services Rating */}
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm font-medium text-gray-600">Services</span>
//                               {renderStarRating(
//                                 selectedPastEvent.feedback?.services || feedback.services,
//                                 selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('services', rating)
//                               )}
//                             </div>

//                             {/* Event Manager Rating */}
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm font-medium text-gray-600">Event Manager</span>
//                               {renderStarRating(
//                                 selectedPastEvent.feedback?.eventManager || feedback.eventManager,
//                                 selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('eventManager', rating)
//                               )}
//                             </div>

//                             {/* Session Delivered Rating */}
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm font-medium text-gray-600">Session Quality</span>
//                               {renderStarRating(
//                                 selectedPastEvent.feedback?.sessionDelivered || feedback.sessionDelivered,
//                                 selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('sessionDelivered', rating)
//                               )}
//                             </div>

//                             {/* Travelling Rating */}
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm font-medium text-gray-600">Travel Arrangements</span>
//                               {renderStarRating(
//                                 selectedPastEvent.feedback?.travelling || feedback.travelling,
//                                 selectedPastEvent.feedback ? undefined : (rating) => handleFeedbackChange('travelling', rating)
//                               )}
//                             </div>

//                             {/* Comment Section */}
//                             {!selectedPastEvent.feedback && (
//                               <div className="mt-4">
//                                 <label htmlFor="comment" className="block text-sm font-medium text-gray-600 mb-2">
//                                   Additional Comments
//                                 </label>
//                                 <textarea
//                                   id="comment"
//                                   rows={3}
//                                   className="w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                   placeholder="Share your thoughts about the event..."
//                                   value={feedback.comment}
//                                   onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
//                                 />
//                               </div>
//                             )}

//                             {/* Submit Button */}
//                             {!selectedPastEvent.feedback && (
//                               <div className="flex justify-end mt-6">
//                                 <button
//                                   onClick={handleSubmitFeedback}
//                                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
//                                 >
//                                   <span>Submit Feedback</span>
//                                   <FaArrowRight />
//                                 </button>
//                               </div>
//                             )}

//                             {/* Feedback Submitted Message */}
//                             {selectedPastEvent.feedback && (
//                               <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                                 <p className="text-sm text-green-800">
//                                   Thank you for your feedback! Your ratings help us improve our events.
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>
      <h1>All Events</h1>
    </div>
  )
}

export default page

