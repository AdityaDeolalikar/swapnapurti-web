'use client';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface Option {
  value: string;
  label: string;
}

interface Organization {
  id: number;
  district: string;
  organization: string;
  primaryDiscussion: boolean;
  mouSigned: boolean;
  orientationDone: boolean;
  dataCollected: boolean;
  hasEntry: boolean;
  takenBy: string;
  documents?: { name: string; url: string }[];
}

// Mock data - replace with API data later
const mockDistricts: Option[] = [
  { value: 'pune', label: 'Pune' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'nagpur', label: 'Nagpur' },
  { value: 'nashik', label: 'Nashik' },
  { value: 'aurangabad', label: 'Aurangabad' },
  { value: 'solapur', label: 'Solapur' },
  { value: 'kolhapur', label: 'Kolhapur' },
  { value: 'thane', label: 'Thane' },
  { value: 'raigad', label: 'Raigad' },
  { value: 'ahmednagar', label: 'Ahmednagar' }
];

const mockOrganizations: Option[] = [
  { value: 'swapnapurti_foundation', label: 'Swapnapurti Foundation' },
  { value: 'seva_foundation', label: 'Seva Foundation' },
  { value: 'youth_empowerment', label: 'Youth Empowerment Society' },
  { value: 'rural_development', label: 'Rural Development Trust' },
  { value: 'education_first', label: 'Education First Foundation' },
  { value: 'green_earth', label: 'Green Earth Initiative' },
  { value: 'skill_development', label: 'Skill Development Center' },
  { value: 'women_welfare', label: 'Women Welfare Association' },
  { value: 'digital_literacy', label: 'Digital Literacy Mission' },
  { value: 'health_awareness', label: 'Health Awareness Foundation' },
  { value: 'art_culture', label: 'Art & Culture Society' },
  { value: 'sports_academy', label: 'Sports Academy Trust' }
];

const initialData = [
  { 
    id: 1, 
    district: 'Pune', 
    organization: 'Swapnapurti Foundation',
    primaryDiscussion: true,
    mouSigned: true,
    orientationDone: true,
    dataCollected: true,
    hasEntry: true,
    takenBy: 'John Doe',
    documents: [
      { name: 'MOU Document.pdf', url: '/documents/mou1.pdf' },
      { name: 'Registration Certificate.pdf', url: '/documents/reg1.pdf' }
    ]
  },
  { 
    id: 2, 
    district: 'Mumbai', 
    organization: 'Seva Foundation',
    primaryDiscussion: true,
    mouSigned: true,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Jane Smith'
  },
  { 
    id: 3, 
    district: 'Nagpur', 
    organization: 'Youth Empowerment Society',
    primaryDiscussion: true,
    mouSigned: false,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Bob Johnson'
  },
  { 
    id: 4, 
    district: 'Pune', 
    organization: 'Digital Literacy Mission',
    primaryDiscussion: true,
    mouSigned: true,
    orientationDone: true,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Alice Brown'
  },
  { 
    id: 5, 
    district: 'Mumbai', 
    organization: 'Green Earth Initiative',
    primaryDiscussion: false,
    mouSigned: false,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Charlie Davis'
  },
  { 
    id: 6, 
    district: 'Nashik', 
    organization: 'Rural Development Trust',
    primaryDiscussion: true,
    mouSigned: true,
    orientationDone: true,
    dataCollected: true,
    hasEntry: false,
    takenBy: 'Eve Wilson'
  },
  { 
    id: 7, 
    district: 'Aurangabad', 
    organization: 'Education First Foundation',
    primaryDiscussion: true,
    mouSigned: false,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Grace Miller'
  },
  { 
    id: 8, 
    district: 'Thane', 
    organization: 'Women Welfare Association',
    primaryDiscussion: true,
    mouSigned: true,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Hank Thompson'
  },
  { 
    id: 9, 
    district: 'Kolhapur', 
    organization: 'Skill Development Center',
    primaryDiscussion: true,
    mouSigned: true,
    orientationDone: true,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Ivy Harris'
  },
  { 
    id: 10, 
    district: 'Solapur', 
    organization: 'Health Awareness Foundation',
    primaryDiscussion: false,
    mouSigned: false,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Jack Clark'
  },
  { 
    id: 11, 
    district: 'Raigad', 
    organization: 'Art & Culture Society',
    primaryDiscussion: true,
    mouSigned: false,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Karen Lewis'
  },
  { 
    id: 12, 
    district: 'Ahmednagar', 
    organization: 'Sports Academy Trust',
    primaryDiscussion: true,
    mouSigned: true,
    orientationDone: false,
    dataCollected: false,
    hasEntry: false,
    takenBy: 'Liam Martinez'
  }
];

const AddOrganization = () => {
  const [formData, setFormData] = useState<{
    district: Option | null;
    organization: Option | null;
  }>({
    district: null,
    organization: null
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [districts, setDistricts] = useState<Option[]>(mockDistricts);
  const [organizationOptions, setOrganizationOptions] = useState<Option[]>(mockOrganizations);
  const [organizations, setOrganizations] = useState<Organization[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>(initialData);

  const [filters, setFilters] = useState({
    primaryDiscussion: null,
    mouSigned: null,
    orientationDone: null,
    dataCollected: null,
    hasEntry: null
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Add this function to handle page changes
  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Filter organizations based on search term and selected district
  useEffect(() => {
    let filtered = organizations;

    // Filter by district if selected
    if (selectedDistrict) {
      filtered = filtered.filter(org => 
        org.district.toLowerCase() === selectedDistrict.label.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters
    if (filters.primaryDiscussion !== null) {
      filtered = filtered.filter(org => org.primaryDiscussion === filters.primaryDiscussion);
    }
    if (filters.mouSigned !== null) {
      filtered = filtered.filter(org => org.mouSigned === filters.mouSigned);
    }
    if (filters.orientationDone !== null) {
      filtered = filtered.filter(org => org.orientationDone === filters.orientationDone);
    }
    if (filters.dataCollected !== null) {
      filtered = filtered.filter(org => org.dataCollected === filters.dataCollected);
    }
    if (filters.hasEntry !== null) {
      filtered = filtered.filter(org => org.hasEntry === filters.hasEntry);
    }

    setFilteredOrganizations(filtered);
  }, [searchTerm, selectedDistrict, organizations, filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.district || !formData.organization) {
      alert('Please select both district and organization');
      return;
    }

    // Check if organization already exists
    const exists = organizations.some(
      org => org.district === formData.district?.label && 
             org.organization === formData.organization?.label
    );

    if (exists) {
      alert('This organization already exists in the selected district');
      return;
    }

    // Add new organization
    const newOrganization = {
      id: organizations.length + 1,
      district: formData.district.label,
      organization: formData.organization.label,
      primaryDiscussion: false,
      mouSigned: false,
      orientationDone: false,
      dataCollected: false,
      hasEntry: false,
      takenBy: 'New User'
    };

    setOrganizations(prev => [...prev, newOrganization]);
    
    // Reset form
    setFormData({
      district: null,
      organization: null
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      setOrganizations(prev => prev.filter(org => org.id !== id));
    }
  };

  const handleEdit = (organization: Organization) => {
    // Find the corresponding options
    const districtOption = mockDistricts.find(d => d.label === organization.district);
    const organizationOption = mockOrganizations.find(o => o.label === organization.organization);

    // Set form data
    setFormData({
      district: districtOption || null,
      organization: organizationOption || null
    });

    // Remove the organization from the list
    setOrganizations(prev => prev.filter(org => org.id !== organization.id));
  };

  const handleFilterChange = (filterName: string, value: boolean | null) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleStatusChange = (id: number, field: keyof Organization) => {
    setOrganizations(prev => prev.map(org => {
      if (org.id === id) {
        return {
          ...org,
          [field]: !org[field]
        };
      }
      return org;
    }));
  };

  const handleView = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Organization</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <CreatableSelect<Option>
                id="district"
                name="district"
                value={formData.district}
                onChange={(option) => setFormData({ ...formData, district: option })}
                options={districts}
                className="w-full"
                placeholder="Search or type to add new district..."
                isClearable
                onCreateOption={(inputValue) => {
                  const newOption = { value: inputValue.toLowerCase(), label: inputValue };
                  setDistricts((prev) => [...prev, newOption]);
                  setFormData({ ...formData, district: newOption });
                }}
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                Organization
              </label>
              <CreatableSelect<Option>
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={(option) => setFormData({ ...formData, organization: option })}
                options={organizationOptions}
                className="w-full"
                placeholder="Search or type to add new organization..."
                isClearable
                onCreateOption={(inputValue) => {
                  const newOption = { value: inputValue.toLowerCase(), label: inputValue };
                  setOrganizationOptions((prev) => [...prev, newOption]);
                  setFormData({ ...formData, organization: newOption });
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Organization
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin Workplace</span>
          </h2>
         <div>
            {/* File Upload Section */}
           
         </div>

          {/* Separator between uploads and filters */}
          

          {/* Filter Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
              <label htmlFor="districtFilter" className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by District
              </label>
              <Select<Option>
                id="districtFilter"
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                options={districts}
                className="w-full"
                placeholder="Select district..."
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: '0.75rem',
                    borderColor: '#E5E7EB',
                    '&:hover': {
                      borderColor: '#3B82F6'
                    }
                  })
                }}
              />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
              <label htmlFor="searchFilter" className="block text-sm font-semibold text-gray-700 mb-2">
                Search Organizations
              </label>
              <div className="relative">
                <input
                  id="searchFilter"
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {[
              { key: 'primaryDiscussion', label: 'Primary Discussion', icon: '📝' },
              { key: 'mouSigned', label: 'MoU Signed', icon: '✍️' },
              { key: 'orientationDone', label: 'Orientation Done', icon: '🎯' },
              { key: 'dataCollected', label: 'Data Collected', icon: '📊' },
              { key: 'hasEntry', label: 'Has Entry', icon: '✅' }
            ].map(({ key, label, icon }) => (
              <div key={key} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span>{icon}</span>
                  {label} Status
                </label>
                <Select
                  value={
                    filters[key as keyof typeof filters] === null
                      ? null
                      : {
                          value: String(filters[key as keyof typeof filters]),
                          label: filters[key as keyof typeof filters] ? 'Yes' : 'No'
                        }
                  }
                  onChange={(option) => 
                    handleFilterChange(
                      key,
                      option ? option.value === 'true' : null
                    )
                  }
                  options={[
                    { value: 'true', label: 'Yes' },
                    { value: 'false', label: 'No' }
                  ]}
                  isClearable
                  placeholder={`Filter by ${label}`}
                  className="w-full"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.75rem',
                      borderColor: '#E5E7EB',
                      '&:hover': {
                        borderColor: '#3B82F6'
                      }
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#EFF6FF' : 'white'
                    })
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    'ID',
                    'District',
                    'Organization',
                    'Actions',
                    'Primary Discussion',
                    'MoU Signed',
                    'Orientation Done',
                    'Data Collected',
                    'Has Entry',
                    'Taken By'
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-white"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.district}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.organization}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleView(item)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.primaryDiscussion}
                        onChange={() => handleStatusChange(item.id, 'primaryDiscussion')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-colors duration-200 hover:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.mouSigned}
                        onChange={() => handleStatusChange(item.id, 'mouSigned')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-colors duration-200 hover:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.orientationDone}
                        onChange={() => handleStatusChange(item.id, 'orientationDone')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-colors duration-200 hover:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.dataCollected}
                        onChange={() => handleStatusChange(item.id, 'dataCollected')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-colors duration-200 hover:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.hasEntry}
                        onChange={() => handleStatusChange(item.id, 'hasEntry')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-colors duration-200 hover:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{item.takenBy}</p>
                    </td>
                  </tr>
                ))}
                {filteredOrganizations.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium">No organizations found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {filteredOrganizations.length > 0 && (
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrganizations.length)} of {filteredOrganizations.length} entries
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange('prev')}
                      disabled={currentPage === 1}
                      className={`inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                          : 'text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100'
                      } transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`inline-flex items-center justify-center w-8 h-8 border ${
                            currentPage === number
                              ? 'border-blue-500 bg-blue-50 text-blue-600'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          } rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange('next')}
                      disabled={currentPage === totalPages}
                      className={`inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium ${
                        currentPage === totalPages
                          ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                          : 'text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100'
                      } transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      Next
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Documents Modal */}
      {isViewModalOpen && selectedOrganization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Data from Promoting Manager Workplace 
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Status Categories */}
          

            {/* Documents Section */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Documents</h4>
              <div className="space-y-4">
                {/* Primary Discussion Document */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Primary Discussion Document</span>
                  </div>
                  {selectedOrganization.documents?.find(doc => doc.name.includes('Primary')) ? (
                    <a
                      href={selectedOrganization.documents.find(doc => doc.name.includes('Primary'))?.url}
                      download
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">Not uploaded</span>
                  )}
                </div>

                {/* MOU Document */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">MOU Document</span>
                  </div>
                  {selectedOrganization.documents?.find(doc => doc.name.includes('MOU')) ? (
                    <a
                      href={selectedOrganization.documents.find(doc => doc.name.includes('MOU'))?.url}
                      download
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">Not uploaded</span>
                  )}
                </div>

                {/* Orientation Document */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Orientation Document</span>
                  </div>
                  {selectedOrganization.documents?.find(doc => doc.name.includes('Orientation')) ? (
                    <a
                      href={selectedOrganization.documents.find(doc => doc.name.includes('Orientation'))?.url}
                      download
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">Not uploaded</span>
                  )}
                </div>

                {/* Data Collection Document */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Data Collection Document</span>
                  </div>
                  {selectedOrganization.documents?.find(doc => doc.name.includes('Data')) ? (
                    <a
                      href={selectedOrganization.documents.find(doc => doc.name.includes('Data'))?.url}
                      download
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">Not uploaded</span>
                  )}
                </div>

                {/* Entry Document */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Entry Document</span>
                  </div>
                  {selectedOrganization.documents?.find(doc => doc.name.includes('Entry')) ? (
                    <a
                      href={selectedOrganization.documents.find(doc => doc.name.includes('Entry'))?.url}
                      download
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">Not uploaded</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrganization;
