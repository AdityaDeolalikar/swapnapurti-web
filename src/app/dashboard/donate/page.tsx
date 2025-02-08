"use client";
import React, { useState } from 'react';
import { FaHandHoldingHeart, FaRupeeSign, FaBoxOpen, FaHandsHelping, FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import sachinSir from '../../../../public/images/sachinSir.jpeg';
import swapnapurti from '../../../../public/images/swapnapurti .png';
import Image from 'next/image';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [goodsDescription, setGoodsDescription] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const predefinedAmounts = ['500', '1000', '2000', '5000'];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-blue-100 text-lg">Your support helps us create meaningful impact in outdoor education and adventure.</p>
        </div>
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Image
                src={swapnapurti}
                alt="Swapnapurti"
                width={100}
                height={100}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">About Swapnapurti</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>
              Swapnapurti is dedicated to transforming lives through outdoor education and adventure experiences. 
              Our mission is to make adventure sports and outdoor activities accessible to everyone while promoting 
              environmental consciousness and personal growth.
            </p>
            <p>
              Your donations help us:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide scholarships for underprivileged students</li>
              <li>Maintain and upgrade safety equipment</li>
              <li>Develop new educational programs</li>
              <li>Train and certify instructors</li>
              <li>Organize community outreach events</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-8 space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-600">
                <FaPhone className="text-blue-600" />
                <span>+91 8888330578</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaEnvelope className="text-blue-600" />
                <span>president@swapnapurti.org</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>Parksyde Homes, hanuman Nagar, Panchvati, Nashik, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Founder Section */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Meet Our Founder</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image 
                    src={sachinSir}
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image
                  src={swapnapurti}
                  alt="Swapnapurti"
                  width={100}
                  height={100}
                  className='w-7 h-7'
                  />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Sachin Kakde</h4>
                <p className="text-gray-600">Founder & President - Swapnapurti Foundation, India</p>
                <p className="text-sm text-gray-500 mt-1">
                  &ldquo;Our mission is to make adventure accessible to everyone while preserving nature.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Options */}
        <div className="space-y-6">
          {/* Money Donation Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaRupeeSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Donate Money</h3>
                <p className="text-gray-600">Support our cause with a monetary contribution</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      amount === amt
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onKeyDown={(e) => {
                      // Prevent non-numeric characters except for backspace, delete, and arrow keys
                      if (!/[0-9]/.test(e.key) && 
                          !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Remove any non-numeric characters
                      const numericValue = value.replace(/[^0-9]/g, '');
                      setCustomAmount(numericValue);
                      setAmount('');
                    }}
                    className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter PAN Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={10}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none uppercase"
                    placeholder="Enter PAN card number"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    title="Please enter a valid PAN card number"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  To avail tax exemption benefits under 80G
                </p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Proceed to Pay
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Goods & Services Donation Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaBoxOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Donate Goods & Services</h3>
                <p className="text-gray-600">Contribute equipment, materials, or volunteer your services</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the goods you&apos;d like to donate
                </label>
                <textarea
                  value={goodsDescription}
                  onChange={(e) => setGoodsDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none min-h-[100px]"
                  placeholder="E.g., Camping equipment, safety gear, educational materials..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the services you&apos;d like to offer
                </label>
                <textarea
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none min-h-[100px]"
                  placeholder="E.g., Professional expertise, volunteer work, training services..."
                />
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Submit Donation Offer
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>


<div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Contributions</h2>
        
        {/* Monetary Contributions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaRupeeSign className="text-blue-600" />
            Monetary Donations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example Donation Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-2xl font-bold text-blue-600">₹5,000</span>
                  <p className="text-sm text-gray-600">Donated on March 15, 2024</p>
                </div>
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Completed
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Contribution towards student scholarship program
              </p>
            </div>

            {/* Example Donation Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-2xl font-bold text-blue-600">₹2,000</span>
                  <p className="text-sm text-gray-600">Donated on February 28, 2024</p>
                </div>
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Completed
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Support for safety equipment upgrade
              </p>
            </div>
          </div>
        </div>

        {/* Goods & Services Contributions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaBoxOpen className="text-blue-600" />
            Goods & Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example Goods Contribution */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <span className="font-semibold text-purple-600">Camping Equipment</span>
                  <p className="text-sm text-gray-600">Contributed on March 10, 2024</p>
                </div>
                <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                  Received
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Donated 5 tents and 10 sleeping bags in excellent condition
              </p>
            </div>

            {/* Example Service Contribution */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <span className="font-semibold text-green-600">Adventure Training</span>
                  <p className="text-sm text-gray-600">Ongoing Contribution</p>
                </div>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Active
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Volunteering as a weekend adventure training instructor
              </p>
            </div>
          </div>
        </div>

        
      </div>
      {/* Impact Section */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandHoldingHeart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">5000+</h3>
            <p className="text-gray-600">Students Supported</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandsHelping className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">100+</h3>
            <p className="text-gray-600">Community Programs</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">20+</h3>
            <p className="text-gray-600">Adventure Locations</p>
          </div>
        </div>
      </div>

      {/* My Contributions Section */}
     
    </div>
  );
}
