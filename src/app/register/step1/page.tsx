'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaUser, FaEnvelope, FaVenusMars, FaPhone } from 'react-icons/fa'
import Link from 'next/link'

const RegisterStep1 = () => {
  const router = useRouter()
  const [showTerms, setShowTerms] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    mobile: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register/step1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store the user ID in localStorage for step 2
        localStorage.setItem('userId', data.data.userId);
        localStorage.setItem('step1Phone', formData.mobile);
        setShowTerms(true);
      } else {
        // Handle registration error
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again later.');
    }
  };

  const handleAcceptTerms = () => {
    setShowTerms(false)
    router.push('/register/step2')
  }

  const handleDeclineTerms = () => {
    setShowTerms(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#03626b] to-[#024950] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-300 mb-8 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Link>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Step 1 of 2: Personal Information
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Gender Dropdown */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaVenusMars className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Mobile Number Input */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {isVerified && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsVerifying(true);
                    // Here you would typically implement the actual verification logic
                    setTimeout(() => {
                      setIsVerifying(false);
                      setIsVerified(true);
                    }, 2000);
                  }}
                  disabled={!formData.mobile || isVerifying || isVerified}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isVerified
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : isVerifying
                      ? 'bg-gray-100 text-gray-500 cursor-wait'
                      : !formData.mobile
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {isVerified ? 'Verified' : isVerifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#03626b] hover:bg-[#024950] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Next Step
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full mx-auto p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Terms and Conditions</h3>
            <div className="max-h-60 overflow-y-auto mb-6 text-gray-600 space-y-4">
              <p>
                Welcome to Swapnapurti Camping! By proceeding with registration, you agree to the following terms:
              </p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>You must be at least 18 years old to use our services.</li>
                <li>All information provided during registration must be accurate and truthful.</li>
                <li>You are responsible for maintaining the confidentiality of your account.</li>
                <li>We reserve the right to modify or terminate services at any time.</li>
                <li>You agree to follow all camping site rules and regulations.</li>
                <li>Cancellation policies and refunds are subject to our current terms.</li>
              </ol>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeclineTerms}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptTerms}
                className="px-4 py-2 text-sm font-medium text-white bg-[#03626b] rounded-lg hover:bg-[#024950] transition-colors duration-300"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterStep1
