"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import admin from "../../../../public/icons/admin.png";
import {
  FaHome,
  FaUsers,
  FaCalendarPlus,
  FaMoneyBillWave,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaRegCalendarCheck,
  FaRegCalendarAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

type RoleLinks = {
  [key: string]: NavLink[];
};

interface SidebarProps {
  onSidebarStateChange?: (isOpen: boolean) => void;
}

export default function Sidebar({ onSidebarStateChange }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both sidebar and toggle button
      const clickedOutsideSidebar = sidebarRef.current && !sidebarRef.current.contains(event.target as Node);
      const clickedOutsideButton = toggleButtonRef.current && !toggleButtonRef.current.contains(event.target as Node);
      
      if (isOpen && clickedOutsideSidebar && clickedOutsideButton) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Only re-run if isOpen changes

  // Handle screen resize
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Notify parent of sidebar state changes
  useEffect(() => {
    onSidebarStateChange?.(isOpen);
  }, [isOpen, onSidebarStateChange]);

  const roleSpecificLinks: RoleLinks = {
    user: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FaHome className="w-5 h-5" />,
      },
      {
        name: "My Profile",
        path: "/dashboard/profile",
        icon: <FaUser className="w-5 h-5" />,
      },
      {
        name: "All Events",
        path: "/dashboard/all-events",
        icon: <FaRegCalendarAlt className="w-5 h-5" />,
      },

      {
        name: "Shop",
        path: "/dashboard/shop",
        icon: <FaShoppingBag className="w-5 h-5" />,
      },
      {
        name: "Apply for Internship",
        path: "/dashboard/internship",
        icon: <FaUser className="w-5 h-5" />,
      },
      {
        name: "Apply for Job",
        path: "/dashboard/job",
        icon: <FaUser className="w-5 h-5" />,
      },

      {
        name: "Donate For Swapnapurti",
        path: "/dashboard/donate",
        icon: <FaUser className="w-5 h-5" />,
      },
      {
        name: "Apply for Certification",
        path: "/dashboard/certification",
        icon: <FaUser className="w-5 h-5" />,
      },
    ],
    admin: [
      {
        name: "Dashboard",
        path: "/dashboard/admin",
        icon: <FaHome className="w-5 h-5" />,
      },
      {
        name: "All Users",
        path: "/dashboard/admin/users",
        icon: <FaUsers className="w-5 h-5" />,
      },
      {
        name: "Add Event",
        path: "/dashboard/admin/add-event",
        icon: <FaCalendarPlus className="w-5 h-5" />,
      },
      {
        name: "publish Event",
        path: "/dashboard/admin/publish-event",
        icon: <FaRegCalendarCheck className="w-5 h-5" />,
      },
      {
        name: "Upcoming Events",
        path: "/dashboard/admin/upcoming-event",
        icon: <FaRegCalendarAlt className="w-5 h-5" />,
      },
      {
        name: "Organization Details",
        path: "/dashboard/admin/organization-detail",
        icon: <FaBuilding className="w-5 h-5" />,
      },
      {
        name: "Add Camp Site",
        path: "/dashboard/admin/add-new-site",
        icon: <FaMapMarkerAlt className="w-5 h-5" />,
      },
      {
        name: "Bookings & Payments",
        path: "/dashboard/admin/bookings",
        icon: <FaMoneyBillWave className="w-5 h-5" />,
      },
      {
        name: "Manage Teams",
        path: "/dashboard/admin/teams",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
      {
        name: "Online Shopping",
        path: "/dashboard/admin/online-shop",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
      {
        name: "Internship Requests",
        path: "/dashboard/admin/Internship-requests",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
      {
        name: "Job Requests",
        path: "/dashboard/admin/job-requests",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
      {
        name: "Donation Requests",
        path: "/dashboard/admin/donation-requests",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
      {
        name: "Event Certification Requests",
        path: "/dashboard/admin/event-certification-requests",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
    ],
    "managing-director": [
      {
        name: "Dashboard",
        path: "/dashboard/managing-director",
        icon: <FaHome className="w-5 h-5" />,
      },
      {
        name: "All Users",
        path: "/dashboard/managing-director/users",
        icon: <FaUsers className="w-5 h-5" />,
      },
      {
        name: "Add Event",
        path: "/dashboard/managing-director/add-event",
        icon: <FaCalendarPlus className="w-5 h-5" />,
      },
      {
        name: "Bookings & Payments",
        path: "/dashboard/managing-director/bookings",
        icon: <FaMoneyBillWave className="w-5 h-5" />,
      },
      {
        name: "Manage Teams",
        path: "/dashboard/managing-director/teams",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
    ],
    accountant: [
      {
        name: "Dashboard",
        path: "/dashboard/accountant",
        icon: <FaHome className="w-5 h-5" />,
      },
      {
        name: "All Users",
        path: "/dashboard/accountant/users",
        icon: <FaUsers className="w-5 h-5" />,
      },
      {
        name: "Add Event",
        path: "/dashboard/accountant/add-event",
        icon: <FaCalendarPlus className="w-5 h-5" />,
      },
      {
        name: "Bookings & Payments",
        path: "/dashboard/accountant/bookings",
        icon: <FaMoneyBillWave className="w-5 h-5" />,
      },
      {
        name: "Manage Teams",
        path: "/dashboard/accountant/teams",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
    ],
    "event-manager": [
      {
        name: "Dashboard",
        path: "/dashboard/event-manager",
        icon: <FaHome className="w-5 h-5" />,
      },
      {
        name: "All Users",
        path: "/dashboard/event-manager/users",
        icon: <FaUsers className="w-5 h-5" />,
      },
      {
        name: "Add Event",
        path: "/dashboard/event-manager/add-event",
        icon: <FaCalendarPlus className="w-5 h-5" />,
      },
      {
        name: "Bookings & Payments",
        path: "/dashboard/event-manager/bookings",
        icon: <FaMoneyBillWave className="w-5 h-5" />,
      },
    ],
    "promoting-manager": [
      {
        name: "Dashboard",
        path: "/dashboard/promoting-manager",
        icon: <FaHome className="w-5 h-5" />,
      },
      {
        name: "All Users",
        path: "/dashboard/promoting-manager/users",
        icon: <FaUsers className="w-5 h-5" />,
      },
      {
        name: "Add Event",
        path: "/dashboard/promoting-manager/add-event",
        icon: <FaCalendarPlus className="w-5 h-5" />,
      },
      {
        name: "Bookings & Payments",
        path: "/dashboard/promoting-manager/bookings",
        icon: <FaMoneyBillWave className="w-5 h-5" />,
      },
      {
        name: "Manage Teams",
        path: "/dashboard/promoting-manager/teams",
        icon: <FaUserFriends className="w-5 h-5" />,
      },
    ],
  };

  const getCurrentRole = () => {
    const pathParts = pathname.split("/");
    return pathParts[2] || "user";
  };

  const currentRole = getCurrentRole();
  const currentRoleLinks =
    roleSpecificLinks[currentRole] || roleSpecificLinks.user;

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        ref={toggleButtonRef}
        className={`fixed ${
          !isMobile && "left-6"
        } top-5 z-[60] p-3 ml-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg ${
          !isMobile && isOpen && "left-[260px]"
        }`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling
          setIsOpen(!isOpen);
        }}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5" />
        ) : (
          <FaBars className="w-5 h-5" />
        )}
      </button>

      {/* Overlay - Show on mobile and desktop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 z-[51]" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="sidebar"
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transform fixed left-0 top-0 z-[52] w-72 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-transform duration-300 ease-in-out flex flex-col shadow-2xl`}
      >
        {/* Sidebar Header with Toggle Button */}
        <div className="h-20 flex items-center justify-between px-6 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-2xl">🏕️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Dashboard</h2>
              <p className="text-xs text-blue-200">
                {currentRole.replace("-", " ").toUpperCase()}
              </p>
            </div>
          </div>
          {/* Desktop Toggle Button */}
        </div>

        {/* Navigation */}
        <nav 
          className="flex-1 overflow-y-auto py-6 px-4 
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar]:hidden
          hover:[&::-webkit-scrollbar]:block
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-gray-500/20
          [&::-webkit-scrollbar-thumb]:backdrop-blur-lg
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:border-2
          [&::-webkit-scrollbar-thumb]:border-transparent
          hover:[&::-webkit-scrollbar-thumb]:bg-blue-500/50
          [&::-webkit-scrollbar-thumb]:transition-all
          [&::-webkit-scrollbar-thumb]:duration-300"
        >
          <ul className="space-y-2">
            {currentRoleLinks.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-blue-500/10 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                        : "text-gray-300 hover:text-white"
                    }`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <span
                      className={`${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="ml-3 font-medium">{item.name}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Settings & Logout Section */}
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="w-full flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-xl transition-all duration-200 group hover:bg-red-500/10"
                >
                  <FaSignOutAlt className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                  <span className="ml-3 font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={admin}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Role</p>
              <p className="text-xs text-gray-400">Role@example.com</p>
            </div>
            <button
              className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              onClick={() => console.log("Profile settings clicked")}
            >
              <FaCog className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
