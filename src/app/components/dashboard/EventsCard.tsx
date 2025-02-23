import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaMedal,
  FaRupeeSign,
  FaArrowRight,
} from "react-icons/fa";

interface Creator {
  name: string;
  phone: string;
  organization: string;
  district: string;
  occupation: string;
  qualification?: string;
  profileImage?: string;
}

interface Progress {
  completed: number;
  total: number;
  status: string;
}

export interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  district: string;
  status?: string;
  eligibility: "male" | "female" | "all";
  fee?: number;
  spots?: string;
  image: string;
  impact?: string;
  participants?: number;
  role?: string;
  achievement?: string;
  creator?: Creator;
  progress?: Progress;
  cardType: "upcoming" | "ongoing" | "past";
  onClick: () => void;
  onAddUser?: (e: React.MouseEvent) => void;
  onCancelEvent?: (e: React.MouseEvent) => void;
}

// Helper function to format event ID
const formatEventId = (id: number): string => {
  return id.toString().padStart(6, "0");
};

const EventsCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  location,
  eligibility,
  fee,
  spots,
  impact,
  participants,
  achievement,
  progress,
  cardType,
  onClick,
  onAddUser,
  onCancelEvent,
}) => {
  const getCardStyles = () => {
    switch (cardType) {
      case "upcoming":
        return {
          gradientFrom: eligibility === "male" ? "from-blue-50" : eligibility === "female" ? "from-pink-50" : "from-purple-50",
          borderColor: eligibility === "male" ? "border-blue-500" : eligibility === "female" ? "border-pink-500" : "border-purple-500",
          badgeBg: eligibility === "male" ? "bg-blue-100" : eligibility === "female" ? "bg-pink-100" : "bg-purple-100",
          badgeText: eligibility === "male" ? "text-blue-800" : eligibility === "female" ? "text-pink-800" : "text-purple-800",
          iconColor: eligibility === "male" ? "text-blue-500" : eligibility === "female" ? "text-pink-500" : "text-purple-500",
          buttonBg: eligibility === "male" ? "bg-blue-500 hover:bg-blue-600" : eligibility === "female" ? "bg-pink-500 hover:bg-pink-600" : "bg-purple-500 hover:bg-purple-600",
        };
      case "ongoing":
        return {
          gradientFrom: "from-green-50",
          borderColor: "border-green-500",
          badgeBg: "bg-green-100",
          badgeText: "text-green-800",
          iconColor: "text-green-500",
          buttonBg: "bg-green-500 hover:bg-green-600",
        };
      case "past":
        return {
          gradientFrom: "from-red-50",
          borderColor: "border-red-500",
          badgeBg: "bg-red-100",
          badgeText: "text-red-800",
          iconColor: "text-red-500",
          buttonBg: "bg-red-500 hover:bg-red-600",
        };
    }
  };

  const styles = getCardStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-gradient-to-br ${styles.gradientFrom} to-white border-l-4 ${styles.borderColor}`}
    >
      <div className="p-6">
        {/* Event ID Badge */}
        <div className="mb-3">
          <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
            Event ID: {formatEventId(id)}
          </span>
        </div>

        <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:${styles.iconColor} transition-colors`}>
          {title}
        </h3>

        <p className="text-gray-600 mb-4 text-sm">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt className={`mt-1 ${styles.iconColor}`} />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900">{location}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <FaCalendarAlt className={`mt-1 ${styles.iconColor}`} />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium text-gray-900">{date}</p>
            </div>
          </div>

          {cardType === "upcoming" && (
            <>
              <div className="flex items-start space-x-2">
                <FaUsers className={`mt-1 ${styles.iconColor}`} />
                <div>
                  <p className="text-xs text-gray-500">Eligibility</p>
                  <p className="text-sm font-medium capitalize">
                    {eligibility === "all" ? "All Welcome" : `${eligibility} only`}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaRupeeSign className={`mt-1 ${styles.iconColor}`} />
                <div>
                  <p className="text-xs text-gray-500">Fee</p>
                  <p className="text-sm font-medium">₹{fee}</p>
                </div>
              </div>
            </>
          )}

          {cardType === "ongoing" && (
            <>
              <div className="flex items-start space-x-2">
                <FaUsers className={`mt-1 ${styles.iconColor}`} />
                <div>
                  <p className="text-xs text-gray-500">Spots</p>
                  <p className="text-sm font-medium text-gray-900">{spots}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaMedal className={`mt-1 ${styles.iconColor}`} />
                <div>
                  <p className="text-xs text-gray-500">Progress</p>
                  <p className="text-sm font-medium text-gray-900">{progress?.status}</p>
                </div>
              </div>
            </>
          )}

          {cardType === "past" && (
            <>
              <div className="flex items-start space-x-2">
                <FaMedal className={`mt-1 ${styles.iconColor}`} />
                <div>
                  <p className="text-xs text-gray-500">Impact</p>
                  <p className="text-sm font-medium text-gray-900">{impact}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaUsers className={`mt-1 ${styles.iconColor}`} />
                <div>
                  <p className="text-xs text-gray-500">Participants</p>
                  <p className="text-sm font-medium text-gray-900">{participants}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Progress Bar for Ongoing Events */}
        {cardType === "ongoing" && progress && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${(progress.completed / progress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {cardType === "upcoming" && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
              <p className="text-sm text-gray-600">{spots}</p>
              <div className="flex flex-wrap gap-2">
                {onAddUser && (
                  <button
                    onClick={onAddUser}
                    className={`px-3 py-1.5 text-sm rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors whitespace-nowrap`}
                  >
                    Add User
                  </button>
                )}
                {onCancelEvent && (
                  <button
                    onClick={onCancelEvent}
                    className={`px-3 py-1.5 text-sm rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors whitespace-nowrap`}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
          {cardType === "ongoing" && <span className="text-sm text-gray-600">In Progress</span>}
          {cardType === "past" && (
            <div className="flex items-center gap-2">
              <FaMedal className={styles.iconColor} />
              <span className="text-sm font-medium text-gray-900">{achievement}</span>
            </div>
          )}
          
          <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${styles.buttonBg} transition-colors whitespace-nowrap ml-auto`}
          >
            {cardType === "upcoming" ? "View Details" : "View Details"}
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventsCard; 