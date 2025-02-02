"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  path: string;
}

type RoleLinks = {
  [key: string]: NavLink[];
};

export default function Sidebar() {
  const pathname = usePathname();

  const roleSpecificLinks: RoleLinks = {
    admin: [
      { name: "Dashboard", path: "/dashboard/admin" },
      { name: "All Users", path: "/dashboard/admin/users" },
      { name: "Add Event", path: "/dashboard/admin/add-event" },
      { name: "Bookings & Payments", path: "/dashboard/admin/bookings" },
      { name: "Manage Teams", path: "/dashboard/admin/teams" },
    ],
    "managing-director": [
      { name: "Dashboard", path: "/dashboard/managing-director" },
      { name: "All Users", path: "/dashboard/managing-director/users" },
      { name: "Add Event", path: "/dashboard/managing-director/add-event" },
      { name: "Bookings & Payments", path: "/dashboard/managing-director/bookings" },
      { name: "Manage Teams", path: "/dashboard/managing-director/teams" },
    ],
    accountant: [
      { name: "Dashboard", path: "/dashboard/accountant" },
      { name: "All Users", path: "/dashboard/accountant/users" },
      { name: "Add Event", path: "/dashboard/accountant/add-event" },
      { name: "Bookings & Payments", path: "/dashboard/accountant/bookings" },
      { name: "Manage Teams", path: "/dashboard/accountant/teams" },
    ],
    "event-manager": [
      { name: "Dashboard", path: "/dashboard/event-manager" },
      { name: "All Users", path: "/dashboard/event-manager/users" },
      { name: "Add Event", path: "/dashboard/event-manager/add-event" },
      { name: "Bookings & Payments", path: "/dashboard/event-manager/bookings" },
    ],
    "promoting-manager": [
      { name: "Dashboard", path: "/dashboard/promoting-manager" },
      { name: "All Users", path: "/dashboard/promoting-manager/users" },
      { name: "Add Event", path: "/dashboard/promoting-manager/add-event" },
      { name: "Bookings & Payments", path: "/dashboard/promoting-manager/bookings" },
      { name: "Manage Teams", path: "/dashboard/promoting-manager/teams" },
    ],
  };

  const getCurrentRole = () => {
    const pathParts = pathname.split("/");
    return pathParts[2] || "admin";
  };

  const currentRole = getCurrentRole();
  const currentRoleLinks = roleSpecificLinks[currentRole] || roleSpecificLinks.admin;

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        {currentRoleLinks.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`block px-4 py-2 rounded transition-colors duration-200 hover:bg-gray-700 ${
                pathname === item.path ? "bg-gray-600" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
