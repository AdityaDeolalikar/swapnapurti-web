'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";

const page = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div>
       <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
        <Link
          href="/register/step1"
          className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
        >
          <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">
            Enroll Now
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>
      </div>
        <nav className="w-full z-50  shadow-md fixed bg-[#87CEEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-300"
              >
                <span className="flex items-center text-white">
                  <span className="mr-2">🏕️</span>
                  Swapnapurti Academy
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 ">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/events", label: "Upcoming Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/#contact", label: "Contact Us" },
                
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 text-white py-2 text-sm font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-all duration-300 ${
                      isActive(item.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register/step1"
                  className="px-5 py-2 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#03626b]">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/#contact", label: "Contact Us" },
                
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-white bg-[#024950]"
                      : "text-gray-100 hover:text-white hover:bg-[#024950]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="space-y-2 pt-4 pb-3 border-t border-[#024950]">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register/step1"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 rounded-md text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default page
