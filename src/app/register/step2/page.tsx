'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaCalendarAlt, FaTint, FaMapMarkerAlt, FaBuilding, FaBriefcase, FaPhone, FaLock } from 'react-icons/fa'

const RegisterStep2 = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    bloodGroup: '',
    permanentAddress: '',
    temporaryAddress: '',
    district: '',
    occupation: '',
    organization: '',
    photo: null as File | null,
    emergencyMobile: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    photo: '',
    password: '',
    confirmPassword: '',
    emergencyMobile: ''
  })
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [orgSearchQuery, setOrgSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showOccupationDropdown, setShowOccupationDropdown] = useState(false);
  const [occupationSearchQuery, setOccupationSearchQuery] = useState('');
  const occupationDropdownRef = useRef<HTMLDivElement>(null);

  // Add state for step 1 phone number (you should get this from your actual registration flow)
  const [step1Phone, setStep1Phone] = useState(() => {
    // Get the phone from localStorage or your state management system
    return typeof window !== 'undefined' ? window.localStorage.getItem('step1Phone') || '' : '';
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const organizations = [
    "Tata Consultancy Services",
    "Persistent Systems",
    "Bajaj Auto",
    "Infosys",
    "Wipro",
    "Tech Mahindra",
    "Cognizant",
    "HCL Technologies",
    "IBM India",
    "Accenture India",
    "Capgemini India",
    "Oracle India",
    "Microsoft India",
    "Google India",
    "Amazon India",
    "Other"
  ];

  const filteredOrganizations = organizations.filter(org =>
    org.toLowerCase().includes(orgSearchQuery.toLowerCase())
  );

  const handleOrgSelect = (org: string) => {
    setFormData(prev => ({ ...prev, organization: org }));
    setOrgSearchQuery(org);
    setShowOrgDropdown(false);
  };

  const handleOrgSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrgSearchQuery(value);
    setFormData(prev => ({ ...prev, organization: value }));
    setShowOrgDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOrgDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const occupations = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Business Analyst",
    "Project Manager",
    "System Administrator",
    "UI/UX Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Quality Assurance Engineer",
    "Cloud Architect",
    "Network Engineer",
    "Database Administrator",
    "IT Consultant",
    "Technical Lead",
    "Scrum Master",
    "Student",
    "Other"
  ];

  const filteredOccupations = occupations.filter(occ =>
    occ.toLowerCase().includes(occupationSearchQuery.toLowerCase())
  );

  const handleOccupationSelect = (occ: string) => {
    setFormData(prev => ({ ...prev, occupation: occ }));
    setOccupationSearchQuery(occ);
    setShowOccupationDropdown(false);
  };

  const handleOccupationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOccupationSearchQuery(value);
    setFormData(prev => ({ ...prev, occupation: value }));
    setShowOccupationDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (occupationDropdownRef.current && !occupationDropdownRef.current.contains(event.target as Node)) {
        setShowOccupationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Validate emergency number
  const validateEmergencyNumber = (number: string) => {
    const newErrors = { ...errors };
    
    // Check if it's exactly 10 digits
    if (!/^\d{10}$/.test(number)) {
      newErrors.emergencyMobile = 'Phone number must be exactly 10 digits';
    }
    // Check if it's different from step 1 phone
    else if (number === step1Phone) {
      newErrors.emergencyMobile = 'Emergency contact should be different from your primary number';
    }
    else {
      newErrors.emergencyMobile = '';
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'emergencyMobile') {
      // Only allow digits
      const numbersOnly = value.replace(/\D/g, '');
      // Limit to 10 digits
      const truncated = numbersOnly.slice(0, 10);
      
      setFormData(prev => ({
        ...prev,
        [name]: truncated
      }));
      
      validateEmergencyNumber(truncated);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      if (name === 'password' || name === 'confirmPassword') {
        validatePasswords(
          name === 'password' ? value : formData.password,
          name === 'confirmPassword' ? value : formData.confirmPassword
        );
      }
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    const newErrors = { ...errors }
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    } else {
      newErrors.password = ''
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    } else {
      newErrors.confirmPassword = ''
    }

    setErrors(newErrors)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 250 * 1024) {
        setErrors(prev => ({
          ...prev,
          photo: 'File size must be less than 250KB'
        }))
        return
      }

      setFormData(prev => ({
        ...prev,
        photo: file
      }))
      setErrors(prev => ({
        ...prev,
        photo: ''
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.emergencyMobile === localStorage.getItem('step1Phone')) {
      alert('Emergency contact must be different from your primary number');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Session expired. Please start registration again.');
        router.push('/register/step1');
        return;
      }

      // Create FormData for file upload
      const submitData = {
        ...formData,
        photo: previewUrl // Base64 string of the image
      };
      delete submitData.confirmPassword; // Remove confirmPassword as it's not needed

      const response = await fetch(`http://localhost:5000/api/auth/register/step2/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        // Clear localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('step1Phone');
        
        // Redirect to success page or login
        router.push('/login');
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03626b] to-[#024950] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back to Step 1 Link */}
        <Link 
          href="/register/step1" 
          className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-300 mb-8 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Step 1
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600">Step 2 of 2: Additional Information</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTint className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-6">
              <div>
                <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Address
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    required
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your permanent address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="temporaryAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Temporary Address
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="temporaryAddress"
                    name="temporaryAddress"
                    required
                    value={formData.temporaryAddress}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your temporary address"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* District */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter your district"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

            
             
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Occupation */}
              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <div className="relative" ref={occupationDropdownRef}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBriefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="occupation"
                    id="occupation"
                    required
                    value={occupationSearchQuery}
                    onChange={handleOccupationSearch}
                    onFocus={() => setShowOccupationDropdown(true)}
                    placeholder="Search for your occupation"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {showOccupationDropdown && filteredOccupations.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                      {filteredOccupations.map((occ) => (
                        <div
                          key={occ}
                          onClick={() => handleOccupationSelect(occ)}
                          className="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-50 transition-colors duration-200"
                        >
                          {occ}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Organization */}
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="organization"
                    id="organization"
                    required
                    value={orgSearchQuery}
                    onChange={handleOrgSearch}
                    onFocus={() => setShowOrgDropdown(true)}
                    placeholder="Search for your organization"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {showOrgDropdown && filteredOrganizations.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                      {filteredOrganizations.map((org) => (
                        <div
                          key={org}
                          onClick={() => handleOrgSelect(org)}
                          className="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-50 transition-colors duration-200"
                        >
                          {org}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {previewUrl ? (
                    <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-[#03626b]/20">
                      <Image src={previewUrl} alt="Preview" width={96} height={96} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-[#03626b]/20">
                      <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    Upload Photo
                  </button>
                  <p className="mt-1 text-xs text-gray-500">Max file size: 250KB</p>
                  {errors.photo && <p className="mt-1 text-xs text-red-500">{errors.photo}</p>}
                </div>
              </div>
            </div>

            {/* Emergency Mobile */}
            <div>
              <label htmlFor="emergencyMobile" className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="emergencyMobile"
                  id="emergencyMobile"
                  required
                  value={formData.emergencyMobile}
                  onChange={handleChange}
                  placeholder="Enter 10 digit emergency contact number"
                  maxLength={10}
                  pattern="\d{10}"
                  onKeyPress={(e) => {
                    // Allow only numbers
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    errors.emergencyMobile ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.emergencyMobile ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  } focus:border-transparent transition-all duration-300`}
                />
              </div>
              {errors.emergencyMobile && (
                <p className="mt-1 text-xs text-red-500">{errors.emergencyMobile}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#03626b] hover:bg-[#024950] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterStep2
