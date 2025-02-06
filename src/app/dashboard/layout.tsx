"use client";
import React, { useState } from 'react';
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar onSidebarStateChange={setSidebarOpen} />

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        {/* Navbar */}
        <div className={`fixed top-0 right-0 left-0 z-20 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:pl-72' : 'pl-0'}`}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="pt-16 min-h-screen bg-gray-100">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
