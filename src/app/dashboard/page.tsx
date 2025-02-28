'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaSignOutAlt, FaUser, FaCalendarAlt, FaMedal, FaShoppingBag, FaUserCircle, FaCog } from 'react-icons/fa'

interface UserData {
  id: string;
  fullName: string;
  email: string;
  photo: string;
  mobile?: string;
  occupation?: string;
  organization?: string;
  district?: string;
}

const DashboardPage = () => {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data = await response.json()
        setUserData(data.data.user)
      } catch (error) {
        console.error('Error fetching user data:', error)
        localStorage.removeItem('token')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#03626b]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-white text-xl">Loading your dashboard...</div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Welcome back, {userData?.fullName}!</h1>
              <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening with your account today.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* My Events */}
          <Link href="/dashboard/all-events" className="block">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-gray-600 text-sm font-medium">My Events</p>
                <p className="text-4xl font-bold mt-2">5</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Link>

          {/* Milestones */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Milestones</p>
              <p className="text-4xl font-bold mt-2">10</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaMedal className="w-6 h-6 text-green-600" />
            </div>
          </div>

          {/* Shop Orders */}
          <Link href="/dashboard/shop" className="block">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-gray-600 text-sm font-medium">Shop Orders</p>
                <p className="text-4xl font-bold mt-2">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Link>

          {/* Profile Completion */}
          <Link href="/dashboard/profile" className="block">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-gray-600 text-sm font-medium">Profile Completion</p>
                <p className="text-4xl font-bold mt-2">85%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaUserCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaCalendarAlt className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">Booked Camping Event</h3>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <p className="text-gray-600 text-sm">Adventure Camp - June 15</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaShoppingBag className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">Purchased Camping Gear</h3>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <p className="text-gray-600 text-sm">Camping Tent XL</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-blue-100">
              {userData?.photo ? (
                <Image
                  src={userData.photo}
                  alt={userData.fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                  <FaUser className="w-16 h-16 text-blue-300" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-gray-900">{userData?.fullName}</h2>
                  <p className="text-gray-600">{userData?.occupation || 'Member'}</p>
                </div>
                <Link
                  href="/profile/edit"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-all duration-300"
                >
                  <FaCog className="mr-2" />
                  Edit Profile
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">{userData?.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="text-gray-900 font-medium">{userData?.mobile || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">District</p>
                  <p className="text-gray-900 font-medium">{userData?.district || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardPage


