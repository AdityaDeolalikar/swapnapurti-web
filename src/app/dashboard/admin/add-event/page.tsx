"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendar, FaUsers, FaClipboardList, FaInfoCircle, FaClock } from "react-icons/fa";

interface Site {
  id: number;
  name: string;
  district: string;
  address: string;
  mapLink: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  eligibility: 'male' | 'female';
  fee: number;
  spots: string;
  status: 'pending' | 'approved' | 'rejected';
  creator: {
    name: string;
    email: string;
    phone: string;
    organization: string;
    district: string;
  };
  schedule: string;
  requirements: string;
  createdAt: string;
}

// Sample sites data (you should fetch this from your API/database)
const sites: Site[] = [
  {
    id: 1,
    name: "Lonavala Camp Site",
    district: "Pune",
    address: "Near Della Adventure Park, Lonavala, Maharashtra 410401",
    mapLink: "https://maps.google.com/?q=Lonavala"
  },
  {
    id: 2,
    name: "Panchgani Adventure Zone",
    district: "Satara",
    address: "Table Land Road, Panchgani, Maharashtra 412805",
    mapLink: "https://maps.google.com/?q=Panchgani"
  },
  {
    id: 3,
    name: "Malshej Adventure Camp",
    district: "Thane",
    address: "Malshej Ghat, Maharashtra 421403",
    mapLink: "https://maps.google.com/?q=Malshej+Ghat"
  },
  {
    id: 4,
    name: "Bhandardara Lakeside Camp",
    district: "Ahmednagar",
    address: "Near Wilson Dam, Bhandardara, Maharashtra 422604",
    mapLink: "https://maps.google.com/?q=Bhandardara"
  }
];

// Mock unpublished events data
const unpublishedEvents: Event[] = [
  {
    id: 1,
    title: "Weekend Mountain Trek",
    description: "An exciting trek through scenic mountain trails perfect for beginners and intermediate hikers.",
    location: "Sahyadri Mountains",
    date: "2024-04-15",
    eligibility: "male",
    fee: 2500,
    spots: "20 spots available",
    status: "pending",
    creator: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      organization: "Adventure Sports Club",
      district: "Pune"
    },
    schedule: "Day 1: Arrival and briefing\nDay 2: Trek to base camp\nDay 3: Summit climb\nDay 4: Return journey",
    requirements: "Basic fitness level, Comfortable walking shoes, Water bottle",
    createdAt: "2024-03-10"
  }
];

// Add these mock data arrays after the predefinedActivities array
const districts = [
  "Pune",
  "Mumbai",
  "Thane",
  "Nashik",
  "Nagpur",
  "Ahmednagar",
  "Solapur",
  "Kolhapur",
  "Satara",
  "Sangli"
];

const organizations = [
  "Tata Consultancy Services",
  "Persistent Systems",
  "Bajaj Auto",
  "Tech Mahindra",
  "Infosys",
  "Wipro",
  "Cognizant",
  "Accenture",
  "IBM",
  "Microsoft"
];

const AddEventPage = () => {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const eventId = searchParams.get('eventId');

  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [manualActivity, setManualActivity] = useState('');
  const [isCustomActivity, setIsCustomActivity] = useState(false);
  const [daySchedules, setDaySchedules] = useState<{
    [key: string]: Array<{
      time: string;
      activity: string;
    }>;
  }>({});
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState('');
  const [spots, setSpots] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');

  const predefinedActivities = [
    "Reporting",
    "Breakfast",
    "Enrolment & Undertakings",
    "Camp instructions, Rules & Regulations",
    "Group Formation (10 people -6Tents)",
    "Proceed for the Check in to the camp",
    "Get together for the introduction",
    "Work allocation",
    "Dinner",
    "Bonfire Night",
    "Early Morning get up",
    "Assembly at ground- PT",
    "Jogging- Warm up & Stretching",
    "Refreshment",
    "Flag Hosting, Prayer & National Anthem",
    "River Rafting",
    "Lunch",
    "Short Rest",
    "Tea Breakfast",
    "Group Games- out door (Volleyball, Cricket, Kabaddi)",
    "Adventurous Activities (Tug of War, Rope Walking, Flying Fox, Rock Climbing)",
    "Astro Night",
    "Sleeping time",
    "Jungle Trekking & Safari",
    "Group Games- Indoor (Carom, Chess)",
    "Feedbacks- Reviews Sharing",
    "Certificate Distribution",
    "Vote of Thanks",
    "Seminar on Competitive Exams for Army/Navy/Air Force"
  ];

  const handleGenderChange = (gender: string) => {
    if (selectedGender.includes(gender)) {
      setSelectedGender(selectedGender.filter(g => g !== gender));
    } else {
      setSelectedGender([...selectedGender, gender]);
    }
  };

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      // Initialize schedules for new days
      const newSchedules: typeof daySchedules = {};
      for (let i = 1; i <= diffDays; i++) {
        if (!daySchedules[`day${i}`]) {
          newSchedules[`day${i}`] = [];
        } else {
          newSchedules[`day${i}`] = daySchedules[`day${i}`];
        }
      }
      setDaySchedules(newSchedules);
      setSelectedDay(`day${1}`); // Select first day by default
    }
  };

  const handleAddActivity = () => {
    if (!selectedDay || !customTime || (!selectedActivity && !manualActivity)) return;

    const activityToAdd = isCustomActivity ? manualActivity : selectedActivity;

    setDaySchedules(prev => ({
      ...prev,
      [selectedDay]: [
        ...(prev[selectedDay] || []),
        { time: customTime, activity: activityToAdd }
      ].sort((a, b) => a.time.localeCompare(b.time))
    }));

    // Reset selections
    setCustomTime('');
    setSelectedActivity('');
    setManualActivity('');
  };

  const handleRemoveActivity = (day: string, index: number) => {
    setDaySchedules(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    
    // Only validate and potentially reset if we have a complete date value
    if (selectedDate.length === 10) {  // YYYY-MM-DD format is 10 characters
      // If selected date is before today, reset to today
      if (selectedDate < today) {
        setStartDate(today);
      }
      // If end date exists and is before new start date, clear end date
      if (endDate && endDate < selectedDate) {
        setEndDate('');
      }
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);
    
    // Only validate if we have a complete date value
    if (selectedDate.length === 10 && startDate && selectedDate < startDate) {
      setEndDate(startDate);
    }
  };

  useEffect(() => {
    calculateDays();
  }, [startDate, endDate]);

  useEffect(() => {
    // Fetch and populate event data when in edit mode
    const fetchEventData = async () => {
      if (isEditMode && eventId) {
        try {
          // In a real app, you would fetch from your API
          // For now, we'll use the mock data
          const eventToEdit = unpublishedEvents.find(e => e.id === Number(eventId));
          
          if (eventToEdit) {
            setEventName(eventToEdit.title);
            setDescription(eventToEdit.description);
            setFee(eventToEdit.fee.toString());
            setSpots(eventToEdit.spots);
            setSelectedGender(eventToEdit.eligibility ? [eventToEdit.eligibility] : []);
            
            // Parse and set dates
            const [startDateValue] = eventToEdit.date.split(' to ');
            setStartDate(startDateValue);
            
            // Set site if it matches
            const matchingSite = sites.find(site => site.name === eventToEdit.location);
            if (matchingSite) {
              setSelectedSite(matchingSite);
            }
            setSelectedDistrict(eventToEdit.creator.district || '');
            setSelectedOrganization(eventToEdit.creator.organization || '');
          }
        } catch (error) {
          console.error('Error fetching event data:', error);
        }
      }
    };

    fetchEventData();
  }, [isEditMode, eventId]);

  // Add new state variables for form handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Function to generate unique event ID
  const generateEventId = () => {
    // Get current highest ID and increment
    const currentHighestId = Math.max(
      ...unpublishedEvents.map(e => {
        const match = e.id.toString().match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      }),
      0
    );
    
    const newId = currentHighestId + 1;
    return `SW-${newId.toString().padStart(5, '0')}`;
  };

  // Function to determine event status based on dates
  const determineEventStatus = (startDate: string, endDate: string): 'upcoming' | 'ongoing' | 'past' => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'upcoming';
    if (now > end) return 'past';
    return 'ongoing';
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate required fields
      if (!eventName || !description || !startDate || !endDate || !selectedSite || selectedGender.length === 0 || !fee || !spots) {
        throw new Error('Please fill in all required fields');
      }

      // Create event object
      const newEvent = {
        id: generateEventId(),
        title: eventName,
        description,
        location: selectedSite.name,
        date: `${startDate} to ${endDate}`,
        district: selectedDistrict,
        status: determineEventStatus(startDate, endDate),
        eligibility: selectedGender.length === 1 ? selectedGender[0] : 'all',
        fee: parseInt(fee),
        spots,
        schedule: Object.entries(daySchedules).reduce((acc, [day, activities]) => {
          return acc + `${day.charAt(0).toUpperCase() + day.slice(1)}:\n` +
            activities.map(a => `${a.time} - ${a.activity}`).join('\n') + '\n\n';
        }, '').trim(),
        creator: {
          name: "Admin", // Replace with actual admin info
          phone: "", // Replace with actual admin info
          organization: selectedOrganization,
          district: selectedDistrict,
          occupation: "Admin" // Replace with actual admin info
        }
      };

      // Here you would typically make an API call to save the event
      // For now, we'll just simulate success
      console.log('New Event:', newEvent);
      
      setSuccess('Event created successfully!');
      
      // Reset form if not in edit mode
      if (!isEditMode) {
        setEventName('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setSelectedGender([]);
        setFee('');
        setSpots('');
        setSelectedSite(null);
        setSelectedDistrict('');
        setSelectedOrganization('');
        setDaySchedules({});
        setCustomTime('');
        setSelectedActivity('');
        setManualActivity('');
        setIsCustomActivity(false);
        setSelectedDay('');
        
        // Reset any error states
        setError(null);
        
        // Reset the form element
        const form = document.getElementById('event-form') as HTMLFormElement;
        if (form) form.reset();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-1 max-w-7xl mx-auto md:ml-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{isEditMode ? 'Edit Event' : 'Add Event'}</h1>
          <p className="mt-2 text-gray-600">{isEditMode ? 'Modify existing event details' : 'Create a new camping event for participants'}</p>
        </div>
      </div>

      <form id="event-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaClipboardList className="text-blue-600" />
              <h2>Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter a descriptive name for your event"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Describe your event..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter event fee"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Spots
                  </label>
                  <input
                    type="number"
                    value={spots}
                    onChange={(e) => setSpots(e.target.value)}
                    min="1"
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter number of spots"
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaCalendar className="text-gray-400" />
                      <span>Start Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  {startDate && startDate < today && (
                    <p className="text-red-500 text-sm mt-1">Start date cannot be before today</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaClock className="text-gray-400" />
                      <span>End Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    min={startDate || today}
                    value={endDate}
                    onChange={handleEndDateChange}
                    disabled={!startDate}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {endDate && endDate < startDate && (
                    <p className="text-red-500 text-sm mt-1">End date cannot be before start date</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>Location</span>
                    </div>
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    onChange={(e) => {
                      const site = sites.find(s => s.id === parseInt(e.target.value));
                      setSelectedSite(site || null);
                    }}
                    value={selectedSite?.id || ""}
                  >
                    <option value="">Select a camping site</option>
                    {sites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name} - {site.district}
                      </option>
                    ))}
                  </select>

                  {selectedSite && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Address:</span> {selectedSite.address}
                      </p>
                      <a
                        href={selectedSite.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-600 underline inline-flex items-center space-x-1"
                      >
                        <FaMapMarkerAlt />
                        <span>View on Map</span>
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center space-x-1">
                      <FaClock className="text-gray-400" />
                      <span>Contact Number</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter 10 digit contact number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Itineraries Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaCalendar className="text-blue-600" />
              <h2>Event Itineraries</h2>
            </div>

            <div className="space-y-6">
              {Object.entries(daySchedules).map(([day, activities]) => (
                <div key={day} className="bg-gray-50 p-4 rounded-xl space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {day.charAt(0).toUpperCase() + day.slice(1)} Schedule
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Activity Addition Form */}
                    <div className="bg-white rounded-lg p-4">
                    {activities.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No activities scheduled for this day</p>
                    ) : (
                      activities.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-600 w-20">{item.time}</span>
                            <span className="text-gray-800">{item.activity}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveActivity(day, index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Time Input */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time (24-hour format)</label>
                        <input
                          type="time"
                          value={selectedDay === day ? customTime : ''}
                          onChange={(e) => {
                            setSelectedDay(day);
                            setCustomTime(e.target.value);
                          }}
                      className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                  </div>

                  {/* Activity Selection */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`predefined-${day}`}
                              checked={!isCustomActivity}
                              onChange={() => setIsCustomActivity(false)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`predefined-${day}`} className="text-sm text-gray-700">
                              Select from predefined
                            </label>
                          </div>
                          {!isCustomActivity && (
                    <select
                          value={selectedDay === day ? selectedActivity : ''}
                          onChange={(e) => {
                            setSelectedDay(day);
                            setSelectedActivity(e.target.value);
                          }}
                      className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choose an activity</option>
                      {predefinedActivities.map((activity) => (
                        <option key={activity} value={activity}>{activity}</option>
                      ))}
                    </select>
                          )}

                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`custom-${day}`}
                              checked={isCustomActivity}
                              onChange={() => setIsCustomActivity(true)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`custom-${day}`} className="text-sm text-gray-700">
                              Add custom activity
                            </label>
                          </div>
                          {isCustomActivity && (
                            <input
                              type="text"
                              value={selectedDay === day ? manualActivity : ''}
                              onChange={(e) => {
                                setSelectedDay(day);
                                setManualActivity(e.target.value);
                              }}
                              placeholder="Enter custom activity"
                              className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                        </div>
                  </div>
                </div>

                <button
                  type="button"
                      onClick={() => {
                        setSelectedDay(day);
                        handleAddActivity();
                      }}
                      disabled={
                        selectedDay !== day || 
                        !customTime || 
                        (!selectedActivity && !manualActivity) ||
                        (isCustomActivity && !manualActivity) ||
                        (!isCustomActivity && !selectedActivity)
                      }
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Add Activity to {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>

                    {/* Activities List */}
                
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaInfoCircle className="text-blue-600" />
              <h2>Important Instructions</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructions for Participants
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="List all important instructions and guidelines"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Eligibility & Pricing */}
        <div className="space-y-6">
          {/* Eligibility Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <FaUsers className="text-blue-600" />
              <h2>Eligibility</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gender Eligibility
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleGenderChange('male')}
                    className={`flex-1 py-2.5 px-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedGender.includes('male')
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange('female')}
                    className={`flex-1 py-2.5 px-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedGender.includes('female')
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-300 hover:border-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <select 
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select a district</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <select 
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select an organization</option>
                  {organizations.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Add success/error messages */}
        {(error || success) && (
          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-7 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-200 flex items-center justify-center space-x-2 font-medium ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating Event...</span>
            </>
          ) : (
            <span>{isEditMode ? 'Update Event' : 'Create Event'}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;