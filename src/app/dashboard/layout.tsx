"use client";
import React from 'react';
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar - Fixed on desktop, overlay on mobile */}
        <div className="hidden md:block fixed inset-y-0 left-0 z-30">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-64 flex flex-col"> {/* ml-64 matches sidebar width */}
          {/* Fixed Navbar */}
          <div className="fixed top-0 right-0 md:left-64 left-0 z-20">
            <Navbar />
          </div>

          {/* Scrollable Content Area - Padding top matches navbar height */}
          <main className="flex-1 pt-16 overflow-auto bg-gray-100">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
