'use client'
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Image from "next/image";
import homepage5 from "../../public/images/homepage5.jpg";
import homepage2 from "../../public/images/homepage2.jpg";
import nature1 from "../../public/images/nature1.jpg";
import nature2 from "../../public/images/nature2.jpg";
import nature3 from "../../public/images/nature3.jpg";
import nature4 from "../../public/images/nature4.jpg";
import Link from "next/link";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

// Slider data
const sliderData = [
  {
    image: homepage5,
    title: "Welcome to Swapnapurti Camping Site",
    subtitle: "Experience the adventure of a lifetime",
    buttonText: "Register Now",
    buttonLink: "/register/step1"
  },
  {
    image: homepage2,
    title: "Discover Nature's Beauty",
    subtitle: "Create unforgettable memories in the wilderness",
    buttonText: "Explore More",
    buttonLink: "/register/step1"
  },
  {
    image: nature1,
    title: "Adventure Awaits You",
    subtitle: "Explore the untamed wilderness with expert guides",
    buttonText: "Start Adventure",
    buttonLink: "/register/step1"
  },
  {
    image: nature2,
    title: "Connect with Nature",
    subtitle: "Find peace and tranquility in the great outdoors",
    buttonText: "Book Now",
    buttonLink: "/register/step1"
  },
  {
    image: nature3,
    title: "Camping Under the Stars",
    subtitle: "Experience nights filled with wonder and adventure",
    buttonText: "Join Us",
    buttonLink: "/register/step1"
  },
  {
    image: nature4,
    title: "Family Adventures",
    subtitle: "Create lasting memories with your loved ones",
    buttonText: "Plan Trip",
    buttonLink: "/register/step1"
  }
];

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const emergencyNumber = "8888330578"; // Demo emergency number

  // Refs for scroll animations
  const aboutRef = useRef(null);
  const timelineRef = useRef(null);
  const featuresRef = useRef(null);
  const achievementsRef = useRef(null);
  const contactRef = useRef(null);

  // Check if sections are in view
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const achievementsInView = useInView(achievementsRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSOSClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(emergencyNumber).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-500 text-white px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base mx-2 sm:mx-4">
          <svg
            className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Emergency number copied!</span>
        </div>
      )}

      {/* Fixed Enroll Button */}
      <div className="fixed bottom-4 sm:bottom-8 right-2 sm:right-8 z-50 animate-bounce-slow">
        <Link
          href="/register/step1"
          className="group relative inline-flex items-center justify-center px-2 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white font-semibold text-xs sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
        >
          <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-1 sm:gap-2">
            Enroll Now
            <svg
              className="w-3 h-3 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200"
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

      {/* Fixed SOS Button */}
      <div className="fixed bottom-4 sm:bottom-8 left-2 sm:left-8 z-50">
        <button
          onClick={handleSOSClick}
          className="group relative inline-flex items-center justify-center px-2 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white font-bold text-xs sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-red-600 animate-pulse"
          aria-label="Copy emergency number"
        >
          <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-1 sm:gap-2">
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>SOS</span>
          </span>
        </button>
      </div>

      {/* Hero Image Slider Section */}
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0 w-full h-full">
          {sliderData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
            </div>
          ))}

          {/* Slider Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-1 sm:px-8">
            <button
              onClick={prevSlide}
              className="p-1 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
              aria-label="Previous slide"
            >
              <svg
                className="w-3 h-3 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="p-1 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
              aria-label="Next slide"
            >
              <svg
                className="w-3 h-3 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-6 sm:w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <main className="relative pt-16 sm:pt-32 md:pt-48 lg:pt-72 px-2 sm:px-6 lg:px-8 w-full">
          <div className="max-w-7xl mx-auto text-center mt-20 sm:mt-40 md:mt-auto">
            {sliderData.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 absolute inset-x-0 ${
                  index === currentSlide
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-8"
                }`}
              >
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white mb-2 sm:mb-4 px-2 sm:px-4">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-6 tracking-wide font-light max-w-3xl mx-auto px-2 sm:px-4">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg tracking-wide transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105"
                >
                  {slide.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Running Text Section */}
      <div className="bg-blue-600 py-2 sm:py-4 overflow-hidden relative w-full">
        <div className="animate-marquee whitespace-nowrap flex items-center justify-center gap-2 sm:gap-8 text-white">
          <div className="flex items-center gap-2 sm:gap-8 mx-1 sm:mx-4">
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">🏕️ Adventure Awaits</span>
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">⛺ Premium Camping</span>
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">🌲 Nature at its Best</span>
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">🔥 Memories</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-8 mx-1 sm:mx-4">
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">🏕️ Adventure Awaits</span>
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">⛺ Premium Camping</span>
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">🌲 Nature at its Best</span>
            <span className="text-sm sm:text-xl md:text-2xl font-semibold">🔥 Memories</span>
          </div>
        </div>
      </div>

      {/* About us section */}
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={containerVariants}
        id="about"
        className="py-12 sm:py-16 md:py-20 px-2 sm:px-6 lg:px-8 bg-white w-full overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-4">
              About <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg px-2 sm:px-4">
              Have questions about our camping programs? We&apos;re here to help you start your adventure!
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-12">
            {/* Image Card */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-1/2 px-2 sm:px-0"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={homepage2}
                  alt="About Swapnapurti Camping"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-1/2 space-y-3 sm:space-y-6 px-2 sm:px-0"
            >
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                Your Adventure Awaits at Swapnapurti
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-lg">
                Welcome to Swapnapurti Academy Camping, where adventure meets education. 
                We believe in creating unforgettable experiences that combine the thrill 
                of outdoor exploration with valuable life lessons.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-lg">
                Our expert guides and state-of-the-art facilities ensure that every 
                camping trip is not just an adventure, but a journey of personal growth 
                and discovery. From team-building activities to survival skills training, 
                we offer a comprehensive outdoor education experience.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        ref={timelineRef}
        initial="hidden"
        animate={timelineInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden w-full"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-gray-100 opacity-[0.05] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
              Your <span className="text-blue-600">Adventure</span> Timeline
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Experience an unforgettable journey through our carefully planned itinerary
            </p>
          </motion.div>

          {/* Timeline Container */}
          <motion.div variants={itemVariants} className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-purple-500 to-pink-500 rounded-full shadow-lg" />

            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-12 px-2 sm:px-0">
              {/* Pre-Trip Preparation */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="relative flex flex-col sm:flex-row items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-xl">🎒</span>
                </div>
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:pr-16">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100/20">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">Pre-Trip Preparation</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">📝</span>
                        <span>Booking & registration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">🎪</span>
                        <span>Packing camping essentials</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">🚗</span>
                        <span>Traveling to the campsite</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Arrival & Setup */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="relative flex flex-col sm:flex-row items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-xl">🌿</span>
                </div>
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:pl-16 sm:ml-auto">
                  <div className="bg-gradient-to-br from-green-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100/20">
                    <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2">Arrival & Setup</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">📍</span>
                        <span>Check-in & orientation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">⛺</span>
                        <span>Setting up tents and fire pits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">🌲</span>
                        <span>Exploring the campsite surroundings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Adventure & Exploration */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="relative flex flex-col sm:flex-row items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-xl">🏞️</span>
                </div>
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:pr-16">
                  <div className="bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100/20">
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-2">Adventure & Exploration</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">🥾</span>
                        <span>Nature walk or trail exploration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">🏃</span>
                        <span>Group hiking or trekking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">📸</span>
                        <span>Wildlife spotting or photography</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">🧗‍♂️</span>
                        <span>Rock climbing or caving</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">🚣‍♂️</span>
                        <span>Water activities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Meals & Relaxation */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="relative flex flex-col sm:flex-row items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-xl">🍽️</span>
                </div>
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:pl-16 sm:ml-auto">
                  <div className="bg-gradient-to-br from-amber-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100/20">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">Meals & Relaxation</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-amber-500">🔥</span>
                        <span>Campfire cooking or BBQ</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-500">🧺</span>
                        <span>Picnic-style meals in nature</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-500">☕</span>
                        <span>Tea/coffee break with scenic views</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-500">🌅</span>
                        <span>Resting in hammocks or open spaces</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Team & Survival Activities */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="relative flex flex-col sm:flex-row items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-xl">🎯</span>
                </div>
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:pr-16">
                  <div className="bg-gradient-to-br from-red-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100/20">
                    <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2">Team & Survival Activities</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">🎮</span>
                        <span>Outdoor games</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">🏹</span>
                        <span>Survival skills workshop</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">🚑</span>
                        <span>First-aid and emergency preparedness</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">🧭</span>
                        <span>Fire-making and navigation training</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Evening & Night Activities */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="relative flex flex-col sm:flex-row items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-xl">🌙</span>
                </div>
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:pl-16 sm:ml-auto">
                  <div className="bg-gradient-to-br from-indigo-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100/20">
                    <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2">Evening & Night Activities</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-500">🔥</span>
                        <span>Bonfire with storytelling & music</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-500">✨</span>
                        <span>Stargazing and astronomy sessions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-500">🧘‍♂️</span>
                        <span>Meditation under the stars</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-500">🔦</span>
                        <span>Night trekking exploration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-500">🎲</span>
                        <span>Board games & group discussions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Departure & Closing */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="relative flex flex-col sm:flex-row items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-xl">🌅</span>
                </div>
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:pr-16">
                  <div className="bg-gradient-to-br from-pink-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100/20">
                    <h3 className="text-lg sm:text-xl font-bold text-pink-900 mb-2">Departure & Closing</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-pink-500">🧘‍♀️</span>
                        <span>Morning stretching or yoga</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-500">🍳</span>
                        <span>Final breakfast or light meal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-500">♻️</span>
                        <span>Campsite cleanup</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-500">📸</span>
                        <span>Group photos and farewell</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 w-full overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
              Experience the <span className="text-blue-600">Magic</span> of Nature
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Discover all the amazing experiences waiting for you at Swapnapurti Camping
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {/* Nature & Scenery Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
              <Image
                src={nature1}
                alt="Nature and Scenery"
                width={600}
                height={400}
                className="object-cover h-[400px] transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Nature & Scenery</h3>
                <p className="text-white/90 text-sm sm:text-base mb-4">
                  Explore breathtaking forests, serene rivers, pristine lakes, and majestic mountains
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Forests</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Rivers</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Lakes</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Mountains</span>
                </div>
              </div>
            </motion.div>

            {/* Camping Setup Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
              <Image
                src={nature2}
                alt="Camping Setup"
                width={600}
                height={400}
                className="object-cover h-[400px] transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Camping Setup</h3>
                <p className="text-white/90 text-sm sm:text-base mb-4">
                  Experience comfort in nature with our premium camping equipment and facilities
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Tents</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Campfires</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Gear</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Amenities</span>
                </div>
              </div>
            </motion.div>

            {/* Activities Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
              <Image
                src={nature3}
                alt="Activities"
                width={600}
                height={400}
                className="object-cover h-[400px] transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Activities</h3>
                <p className="text-white/90 text-sm sm:text-base mb-4">
                  Engage in exciting outdoor activities and adventures
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Hiking</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Fishing</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Kayaking</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Stargazing</span>
                </div>
              </div>
            </motion.div>

            {/* Events Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
              <Image
                src={nature4}
                alt="Events and Gatherings"
                width={600}
                height={400}
                className="object-cover h-[400px] transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Events & Gatherings</h3>
                <p className="text-white/90 text-sm sm:text-base mb-4">
                  Create memories with group activities and celebrations
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Group Activities</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Night Parties</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Celebrations</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">Bonfire</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="mt-12 sm:mt-16 text-center">
            <Link
              href="/register/step1"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 group"
            >
              Start Your Adventure
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
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Achievements section */}
      <motion.section
        ref={achievementsRef}
        initial="hidden"
        animate={achievementsInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 sm:py-20 md:py-24 bg-gray-900 w-full overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Our <span className="text-blue-500">Achievements</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Numbers that speak for themselves
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {/* Visitors Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 mb-2 sm:mb-3">
                  <CountUp end={5000} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Visitors</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">And counting every day</p>
              </div>
            </motion.div>

            {/* Registered Users Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-500 mb-2 sm:mb-3">
                  <CountUp end={1200} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Registered Users</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Active community members</p>
              </div>
            </motion.div>

            {/* Events Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-500 mb-2 sm:mb-3">
                  <CountUp end={150} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Events</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Successfully organized</p>
              </div>
            </motion.div>

            {/* Event Attendees Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-500 mb-2 sm:mb-3">
                  <CountUp end={3500} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Event Attendees</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Happy campers</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact section */}
      <motion.section
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={containerVariants}
        id="contact"
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              Contact <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Have questions about our camping programs? We&apos;re here to help you start your adventure!
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 px-2 sm:px-0">
            {/* Contact Information */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500 rounded-3xl -rotate-3 opacity-5"></div>
              <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 sm:space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-blue-500">📍</span> Our Location
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-blue-900 mb-2">Main Office</h4>
                        <p className="text-gray-600 text-sm sm:text-base">123 Camping Street, Adventure City, AC 12345</p>
                      </div>
                    </div>
                    <div className="space-y-4 transform hover:scale-105 transition-transform duration-300 ">
                      <div className="bg-green-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-green-900 mb-2">Contact Info</h4>
                        <p className="text-gray-600 text-sm sm:text-base">Phone: (123) 456-7890</p>
                        <p className="text-gray-600 text-sm sm:text-base ">Email: info@swapnapurti.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-gray-100">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-500 text-white p-2.5 sm:p-3 rounded-full hover:bg-blue-600 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-pink-500 text-white p-2.5 sm:p-3 rounded-full hover:bg-pink-600 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-400 text-white p-2.5 sm:p-3 rounded-full hover:bg-blue-500 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500 rounded-3xl -rotate-3 opacity-5"></div>
              <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Send us a Message</h3>
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="How can we help?"
                      className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Your message here..."
                      className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
