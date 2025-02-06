import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaArrowRight,
  FaTimes,
  FaPhone,
} from "react-icons/fa";

interface Creator {
  name: string;
  phone: string;
  organization: string;
  district: string;
  occupation: string;
  profileImage?: string;
}

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
  students?: Student[];
  paymentDetails?: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
}

interface EventDetailsCardProps {
  event: Event;
  onClose: () => void;
  onAttendanceChange?: (attendanceKey: string, rating: number) => void;
}

export default function EventDetailsCard({ event, onClose, onAttendanceChange }: EventDetailsCardProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<'morning' | 'afternoon' | 'evening' | ''>("" as const);
  const [studentRatings, setStudentRatings] = useState<{[key: string]: number}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDaysFromSchedule = () => {
    if (!event.schedule) return [];
    return event.schedule.split("\n\n").map(day => {
      const [dayTitle] = day.split("\n");
      return dayTitle;
    });
  };

  // Check if attendance has been taken for a specific day and time slot
  const isAttendanceTaken = (day: string, timeSlot: string) => {
    if (!event.students || event.students.length === 0) return false;
    
    // If any student has attendance for this day and time slot, consider it taken
    return event.students.some(student => 
      student.attendance?.some(
        a => a.date === day && a.timeSlot === timeSlot
      )
    );
  };

  // Get disabled time slots for selected day
  const getDisabledTimeSlots = (day: string) => {
    const slots: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];
    return slots.filter(slot => isAttendanceTaken(day, slot));
  };

  // Add new function to check if a time slot is available based on sequence
  const isTimeSlotAvailable = (day: string, slot: 'morning' | 'afternoon' | 'evening') => {
    if (!day) return false;
    
    // If attendance is already taken for this slot, it's not available
    if (isAttendanceTaken(day, slot)) return false;
    
    // Get all attendance records for this day
    const dayAttendance = event.students?.flatMap(student => 
      student.attendance?.filter(a => a.date === day) || []
    ) || [];
    
    // Check sequence based on time slot
    switch(slot) {
      case 'morning':
        // Morning is always available if not taken
        return true;
      case 'afternoon':
        // Afternoon is only available if morning is taken
        return dayAttendance.some(a => a.timeSlot === 'morning');
      case 'evening':
        // Evening is only available if both morning and afternoon are taken
        return dayAttendance.some(a => a.timeSlot === 'morning') && 
               dayAttendance.some(a => a.timeSlot === 'afternoon');
      default:
        return false;
    }
  };

  // Add function to get next available time slot
  const getNextAvailableTimeSlot = (day: string): 'morning' | 'afternoon' | 'evening' | '' => {
    if (!day) return '';
    
    const slots: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];
    return slots.find(slot => isTimeSlotAvailable(day, slot)) || '';
  };

  // Add function to check if a day is completed
  const isDayCompleted = (day: string) => {
    const timeSlots: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];
    return timeSlots.every(slot => isAttendanceTaken(day, slot));
  };

  // Add function to check if a day is available
  const isDayAvailable = (day: string) => {
    if (!day) return false;
    
    const days = getDaysFromSchedule();
    const currentDayIndex = days.indexOf(day);
    
    // First day is always available if not completed
    if (currentDayIndex === 0) return !isDayCompleted(day);
    
    // For other days, check if previous day is completed
    const previousDay = days[currentDayIndex - 1];
    return isDayCompleted(previousDay) && !isDayCompleted(day);
  };

  const handleDayChange = (day: string) => {
    if (!isDayAvailable(day) && day !== '') {
      const previousDay = getDaysFromSchedule()[getDaysFromSchedule().indexOf(day) - 1];
      alert(`Please complete Day ${getDaysFromSchedule().indexOf(previousDay) + 1} first`);
      return;
    }
    setSelectedDay(day);
    setSelectedTimeSlot(getNextAvailableTimeSlot(day));
    setStudentRatings({});
  };

  const handleRatingChange = (studentId: number, star: 1 | 2 | 3 | 4 | 5 | 6) => {
    setStudentRatings(prev => {
      const currentRating = prev[studentId];
      
      // Map star positions to actual values
      const starValues = {
        1: -5,  // absent
        2: 1,   // present
        3: 2,   // present
        4: 3,   // present
        5: 4,   // present
        6: 5    // present
      } as const;
      
      // If clicking the same star again, clear the rating
      if (currentRating === starValues[star]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [studentId]: omitted, ...rest } = prev;
        return rest;
      }
      
      // Set the new rating
      return { ...prev, [studentId]: starValues[star] };
    });
  };

  const handleSubmitAttendance = () => {
    if (!selectedDay || !selectedTimeSlot) return;
    
    // Double check if attendance hasn't been taken
    if (isAttendanceTaken(selectedDay, selectedTimeSlot)) {
      alert('Attendance has already been taken for this time slot');
      return;
    }
    
    // Check if all students have ratings
    const allStudents = event.students || [];
    const hasAllRatings = allStudents.every(student => studentRatings[student.id]);
    
    if (!hasAllRatings) {
      alert('Please mark attendance for all students before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit ratings for all students
    Object.entries(studentRatings).forEach(([studentId, rating]) => {
      onAttendanceChange?.(
        `${selectedDay}-${selectedTimeSlot}-${studentId}`,
        rating
      );
    });

    // Reset form
    setStudentRatings({});
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[101] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 z-[150] bg-white rounded-full p-2.5 shadow-xl hover:bg-gray-100 transition-colors border border-gray-100"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Header */}
            <div className="sticky top-0 z-[102] bg-white px-6 py-4 border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Event Image */}
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-white/90">{event.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 w-full">
                {/* Event Information - Full Width */}
                <div className="bg-white rounded-xl shadow p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Event Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaUsers className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Eligibility</p>
                        <p className="font-medium capitalize">
                          {event.eligibility === "all"
                            ? "All Welcome"
                            : `${event.eligibility} only`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaRupeeSign className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Fee</p>
                        <p className="font-medium">₹{event.fee}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two Column Layout for Schedule and Contact Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Schedule and Requirements */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Schedule */}
                    {event.schedule && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Itineraries
                        </h4>
                        <div className="space-y-6">
                          {event.schedule.split("\n\n").map((day, dayIndex) => {
                            const [dayTitle, ...timeSlots] = day.split("\n");
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
                                    const [time, activity] = slot.split(" - ");
                                    return (
                                      <div
                                        key={slotIndex}
                                        className="flex items-start gap-4"
                                      >
                                        <div className="w-24 flex-shrink-0">
                                          <span className="text-sm font-medium text-blue-600">
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

                    {/* Attendance Section - Only for ongoing events */}
                    {event.status === "ongoing" && event.schedule && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Attendance
                        </h4>
                        
                        {/* Day and Time Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Select Day
                            </label>
                            <select
                              value={selectedDay}
                              onChange={(e) => handleDayChange(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Choose a day</option>
                              {getDaysFromSchedule().map((day, index) => {
                                const isAvailable = isDayAvailable(day);
                                const isComplete = isDayCompleted(day);
                                const statusText = isComplete 
                                  ? ' (Completed)' 
                                  : !isAvailable && index > 0
                                    ? ` (Complete Day ${index} first)`
                                    : '';
                                
                                return (
                                  <option 
                                    key={index} 
                                    value={day}
                                    disabled={!isAvailable && !isComplete}
                                  >
                                    Day {index + 1}{statusText}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Select Time
                            </label>
                            <select
                              value={selectedTimeSlot}
                              onChange={(e) => setSelectedTimeSlot(e.target.value as 'morning' | 'afternoon' | 'evening' | '')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              disabled={!selectedDay}
                            >
                              <option value="">Choose time slot</option>
                              {['morning', 'afternoon', 'evening'].map((slot) => {
                                const isAvailable = isTimeSlotAvailable(selectedDay, slot as 'morning' | 'afternoon' | 'evening');
                                const statusText = isAttendanceTaken(selectedDay, slot) 
                                  ? ' (Taken)' 
                                  : !isAvailable 
                                    ? slot === 'afternoon' 
                                      ? ' (Complete morning first)'
                                      : ' (Complete afternoon first)'
                                    : '';
                                
                                return (
                                  <option 
                                    key={slot} 
                                    value={slot}
                                    disabled={!isAvailable}
                                  >
                                    {slot.charAt(0).toUpperCase() + slot.slice(1)}{statusText}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        {/* Show completion status */}
                        {selectedDay && (
                          <>
                            <div className="mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Day Progress:</span>
                                {['morning', 'afternoon', 'evening'].map((slot) => (
                                  <span
                                    key={slot}
                                    className={`px-2 py-1 rounded ${
                                      isAttendanceTaken(selectedDay, slot)
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {slot.charAt(0).toUpperCase() + slot.slice(1)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mb-4 bg-gray-50 rounded-lg p-4">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Attendance Rating Guide:</h5>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-600">1st Star: Absent (Value: -5)</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-600">2nd Star: Present (Value: 1)</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-600">3rd Star: Present (Value: 2)</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-600">4th Star: Present (Value: 3)</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-600">5th Star: Present (Value: 4)</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-600">6th Star: Present (Value: 5)</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Show message if all slots are taken for selected day */}
                        {selectedDay && getDisabledTimeSlots(selectedDay).length === 3 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-yellow-800">
                              Attendance has already been taken for all time slots on {selectedDay}
                            </p>
                          </div>
                        )}

                        {/* Students List with Star Ratings */}
                        {selectedDay && selectedTimeSlot && !isAttendanceTaken(selectedDay, selectedTimeSlot) && (
                          <div className="space-y-4">
                            <div className="bg-white rounded-lg shadow">
                              <div className="max-h-[400px] overflow-y-auto">
                                <table className="w-full">
                                  <thead className="sticky top-0 bg-white z-10">
                                    <tr className="border-b">
                                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Student</th>
                                      <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Attendance</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(event.students || []).map((student) => {
                                      const currentRating = studentRatings[student.id] || 0;
                                      const isAbsent = currentRating === -5;
                                      
                                      return (
                                        <tr key={student.id} className="border-b last:border-0">
                                          <td className="py-4 px-4 text-sm text-gray-800">
                                            {student.name}
                                          </td>
                                          <td className="py-4 px-4">
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-center gap-1">
                                                {[1, 2, 3, 4, 5, 6].map((star) => (
                                                  <>
                                                    <button
                                                      key={star}
                                                      onClick={() => handleRatingChange(student.id, star as 1 | 2 | 3 | 4 | 5 | 6)}
                                                      className="focus:outline-none"
                                                      title={star === 1 ? "Absent" : `Present (${star - 1})`}
                                                    >
                                                      <svg
                                                        className={`w-6 h-6 ${
                                                          star === 1 
                                                            ? isAbsent 
                                                              ? 'text-red-500' 
                                                              : 'text-gray-300'
                                                            : currentRating >= star - 1
                                                              ? 'text-yellow-400'
                                                              : 'text-gray-300'
                                                        } transition-colors duration-150`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                      >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                      </svg>
                                                    </button>
                                                    {star < 6 && <span className="text-gray-300">|</span>}
                                                  </>
                                                ))}
                                              </div>
                                              <div className="text-center">
                                                <span className={`text-xs font-medium ${
                                                  isAbsent ? 'text-red-500' : currentRating > 0 ? 'text-green-500' : 'text-gray-500'
                                                }`}>
                                                  {isAbsent 
                                                    ? 'Absent' 
                                                    : currentRating > 0 
                                                      ? 'Present' 
                                                      : 'Not marked'}
                                                </span>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end mt-4">
                              <button
                                onClick={handleSubmitAttendance}
                                disabled={isSubmitting || Object.keys(studentRatings).length < (event.students?.length || 5)}
                                className={`px-4 py-2 rounded-lg text-white font-medium ${
                                  isSubmitting || Object.keys(studentRatings).length < (event.students?.length || 5)
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                              >
                                {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Requirements */}
                    {event.requirements && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Requirements
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600">
                            {event.requirements}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Undertaking Section */}
                    {event.undertaking && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Undertaking
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              {event.undertaking}
                            </p>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id="agree"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              />
                              <label
                                htmlFor="agree"
                                className="text-sm text-gray-700"
                              >
                                I agree to the terms and conditions
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Contact Details and Registration */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    {event.creator && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Contact Details
                        </h4>
                        <div className="space-y-4">
                          {/* Profile Photo */}
                          <div className="flex justify-center mb-4">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
                              <img
                                src={event.creator.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Event manager
                              </p>
                              <p className="font-medium">{event.creator.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaPhone className="text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Contact Number
                              </p>
                              <p className="font-medium">{event.creator.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Qualification/Experience
                              </p>
                              <p className="font-medium">
                                {event.creator.occupation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {event.creator && (
                      <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Address
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Detailed Address
                              </p>
                              <p className="font-medium">
                                {event.creator.organization}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaUsers className="text-blue-500" />
                            <div>
                              <p className="text-sm">Map Link</p>
                              <p className="font-medium text-blue-500">
                                {event.creator.district}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Available Seats
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-2xl font-bold text-gray-900">
                                {event.spots.split(" ")[0]}
                              </p>
                              <p className="text-sm text-gray-500">Seats left</p>
                            </div>
                            <div className="text-sm font-medium">
                              {Math.round((parseInt(event.spots) / 50) * 100)}%
                              Available
                            </div>
                          </div>

                          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute left-0 top-0 h-full transition-all duration-300 ${
                                event.eligibility === "male"
                                  ? "bg-blue-500"
                                  : event.eligibility === "female"
                                  ? "bg-pink-500"
                                  : "bg-purple-500"
                              }`}
                              style={{
                                width: `${Math.round(
                                  (parseInt(event.spots) / 50) * 100
                                )}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  event.eligibility === "male"
                                    ? "bg-blue-500"
                                    : event.eligibility === "female"
                                    ? "bg-pink-500"
                                    : "bg-purple-500"
                                }`}
                              ></div>
                              <span>Available: {event.spots.split(" ")[0]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                              <span>Total: 50 seats</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    

                    {/* Registration Fee Section */}
                    <div className="mb-4">
                      <label htmlFor="referCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Have a refer code?
                      </label>
                      <input
                        type="text"
                        id="referCode"
                        placeholder="Enter refer code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Registration Fee
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">Amount</span>
                          <span className="text-xl font-bold text-gray-900">
                            ₹{event.fee}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{event.spots}</p>
                        
                        {/* Refer Code Input */}
                        

                        <button
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
                            event.eligibility === "male"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : event.eligibility === "female"
                              ? "bg-pink-500 hover:bg-pink-600"
                              : "bg-purple-500 hover:bg-purple-600"
                          }`}
                        >
                          Enroll Now
                          <FaArrowRight />
                        </button>
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
  );
} 