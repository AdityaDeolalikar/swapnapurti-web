"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-blue-500`}
            >
              <span className="flex items-center">
                <span className="mr-2">🏕️</span>
                Swapnapurti Academy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { href: "/", label: "Home" },
              { href: "/#about", label: "About Us" },
              { href: "/#contact", label: "Contact Us" },
              { href: "/events", label: "Events" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contribution", label: "My Contribution" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? isScrolled
                      ? "text-blue-600"
                      : "text-white"
                    : isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-blue-500 scale-x-100"
                      : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200/20">
              <Link
                href="/login"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register/step1"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20"
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white hover:text-gray-300"
              } focus:outline-none`}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
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
        {isMenuOpen && (
          <div className="md:hidden">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
                isScrolled ? "bg-white" : "bg-black/70 backdrop-blur-md"
              }`}
            >
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/#contact", label: "Contact Us" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contribution", label: "My Contribution" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-blue-500 bg-blue-50/10"
                      : isScrolled
                      ? "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="space-y-2 pt-2 pb-3 border-t border-gray-200/10">
                <Link
                  href="/login"
                  className={`block text-center px-4 py-2 rounded-full text-sm font-medium ${
                    isScrolled
                      ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register/step1"
                  className={`block text-center px-4 py-2 rounded-full text-sm font-medium ${
                    isScrolled
                      ? "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
