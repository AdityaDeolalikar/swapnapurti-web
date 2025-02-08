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
}

// Mock data - replace with API data later
const mockDistricts: Option[] = [
  { value: 'pune', label: 'Pune' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'nagpur', label: 'Nagpur' },
];

const mockOrganizations: Option[] = [
  { value: 'org1', label: 'Organization 1' },
  { value: 'org2', label: 'Organization 2' },
  { value: 'org3', label: 'Organization 3' },
];

const initialData = [
  { id: 1, district: 'Pune', organization: 'Organization 1' },
  { id: 2, district: 'Mumbai', organization: 'Organization 2' },
  { id: 3, district: 'Nagpur', organization: 'Organization 3' },
];

const AddOrganization = () => {
  const [formData, setFormData] = useState<{
    district: Option | null;
    organization: Option | null;
  }>({
    district: null,
    organization: null
  });

  const [districts, setDistricts] = useState<Option[]>(mockDistricts);
  const [organizationOptions, setOrganizationOptions] = useState<Option[]>(mockOrganizations);
  const [organizations, setOrganizations] = useState<Organization[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>(initialData);

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

    setFilteredOrganizations(filtered);
  }, [searchTerm, selectedDistrict, organizations]);

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
      organization: formData.organization.label
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Existing Organizations</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-64">
                <label htmlFor="districtFilter" className="block text-sm font-medium text-gray-700 mb-2">
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
                />
              </div>
              <div className="w-full sm:w-64">
                <label htmlFor="searchFilter" className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  id="searchFilter"
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrganizations.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.organization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredOrganizations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrganization;
