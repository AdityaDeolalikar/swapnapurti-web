'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterStep1 = () => {
  const router = useRouter()
  const [showTerms, setShowTerms] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Show terms and conditions modal instead of direct navigation
    setShowTerms(true)
  }

  const handleAcceptTerms = () => {
    setShowTerms(false)
    router.push('/register/step2')
  }

  const handleDeclineTerms = () => {
    setShowTerms(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Terms and Conditions</h3>
            <div className="max-h-60 overflow-y-auto mb-6 text-sm text-gray-600">
              <p className="mb-4">
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
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptTerms}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Step 1 of 2: Personal Information
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Gender Dropdown */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Mobile Number Input */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Next Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterStep1
