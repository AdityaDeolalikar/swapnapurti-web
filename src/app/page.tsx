'use client'
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Image from "next/image";
import homepage5 from "../../public/images/homepage5.jpg";
import homepage2 from "../../public/images/homepage2.jpg";
import Link from "next/link";
import CountUp from "react-countup";
import { useState } from "react";

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const emergencyNumber = "8888330578"; // Demo emergency number

  const handleSOSClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(emergencyNumber).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
    });
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base mx-4">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
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
      <div className="fixed bottom-8 right-4 sm:right-8 z-50 animate-bounce-slow">
        <Link
          href="/register/step1"
          className="group relative inline-flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
        >
          <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">
            Enroll Now
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200"
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
      <div className="fixed bottom-8 left-4 sm:left-8 z-50">
        <button
          onClick={handleSOSClick}
          className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-red-600 animate-pulse"
          aria-label="Copy emergency number"
        >
          <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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

      <div className="relative min-h-screen">
        {/* Hero Image Section */}
        <div className="absolute inset-0">
          <Image
            src={homepage5}
            alt="Camping Site Hero Image"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <main className="relative pt-32 sm:pt-48 md:pt-56 lg:pt-72 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mt-40 md:mt-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6">
              Welcome to Swapnapurti Camping Site
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 tracking-wide font-light max-w-3xl mx-auto">
              Experience the adventure of a lifetime
            </p>
            <Link
              href="/register/step1"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg tracking-wide transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Register Now
            </Link>
          </div>
        </main>
      </div>

      {/* About us section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              About <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg px-4">
              Have questions about our camping programs? We&apos;re here to help you start your adventure!
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* Image Card */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={homepage2}
                  alt="About Swapnapurti Camping"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Your Adventure Awaits at Swapnapurti
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Welcome to Swapnapurti Academy Camping, where adventure meets education. 
                We believe in creating unforgettable experiences that combine the thrill 
                of outdoor exploration with valuable life lessons.
              </p>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Our expert guides and state-of-the-art facilities ensure that every 
                camping trip is not just an adventure, but a journey of personal growth 
                and discovery. From team-building activities to survival skills training, 
                we offer a comprehensive outdoor education experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Our <span className="text-blue-500">Achievements</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Numbers that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Visitors Card */}
            <div className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">
                  <CountUp end={5000} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Visitors</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">And counting every day</p>
              </div>
            </div>

            {/* Registered Users Card */}
            <div className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 group">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-500 mb-2 sm:mb-3 group-hover:text-green-400 transition-colors">
                  <CountUp end={1200} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Registered Users</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Active community members</p>
              </div>
            </div>

            {/* Events Card */}
            <div className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-500 mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors">
                  <CountUp end={150} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Events</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Successfully organized</p>
              </div>
            </div>

            {/* Event Attendees Card */}
            <div className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 group">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-500 mb-2 sm:mb-3 group-hover:text-yellow-400 transition-colors">
                  <CountUp end={3500} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">Event Attendees</h3>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Happy campers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              Contact <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Have questions about our camping programs? We&apos;re here to help you start your adventure!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {/* Contact Information */}
            <div className="relative">
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
            </div>

            {/* Contact Form */}
            <div className="relative">
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
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
