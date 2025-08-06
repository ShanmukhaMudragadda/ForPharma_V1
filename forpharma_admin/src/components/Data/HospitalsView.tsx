import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Mail, Phone, MapPin, Guitar as Hospital } from 'lucide-react';

interface HospitalData {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  territory: string;
  bedCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const HospitalsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock hospitals data
  const hospitals: HospitalData[] = [
    {
      id: '1',
      name: 'City General Hospital',
      type: 'General',
      address: '789 Hospital Rd, Medical District',
      phone: '+1-234-567-8905',
      email: 'info@citygeneral.com',
      territory: 'North District',
      bedCount: 250,
      status: 'active',
      createdAt: '2024-01-05'
    },
    {
      id: '2',
      name: 'Specialty Care Center',
      type: 'Specialty',
      address: '321 Care Blvd, Health Plaza',
      phone: '+1-234-567-8906',
      email: 'contact@specialtycare.com',
      territory: 'West District',
      bedCount: 150,
      status: 'active',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Children\'s Medical Center',
      type: 'Pediatric',
      address: '456 Kids Ave, Family District',
      phone: '+1-234-567-8907',
      email: 'info@childrenmedical.com',
      territory: 'South District',
      bedCount: 120,
      status: 'inactive',
      createdAt: '2024-01-08'
    }
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.territory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">Hospitals</h1>
            <p className="text-sm text-text-secondary">Manage hospital and healthcare facility records</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-md transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Hospital</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-sm shadow-sf border border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center space-x-1.5 px-3 py-2 border border-border rounded-sm hover:bg-background-secondary transition-colors duration-200 text-xs">
            <Filter className="w-3 h-3" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Hospitals Table */}
      <div className="bg-white rounded-sm shadow-sf border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Beds
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Territory
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredHospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-background-secondary transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Hospital className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs font-medium text-text-primary">{hospital.name}</div>
                        <div className="text-xs text-text-secondary">{hospital.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded-sm">
                      {hospital.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-text-primary font-medium">
                    {hospital.bedCount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-text-secondary">
                    <div className="flex items-center">
                      <MapPin className="w-2.5 h-2.5 mr-1" />
                      {hospital.territory}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-sm ${
                      hospital.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {hospital.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-xs font-medium">
                    <div className="flex items-center justify-end space-x-1">
                      <button className="p-1 hover:bg-primary-50 text-primary-600 rounded-sm transition-colors">
                        <Eye className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-primary-50 text-primary-600 rounded-sm transition-colors">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-error/10 text-error rounded-sm transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Hospital Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm shadow-sf-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Create New Hospital
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Hospital Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter hospital name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent">
                  <option>Select type</option>
                  <option>General</option>
                  <option>Specialty</option>
                  <option>Pediatric</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Address
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Bed Count
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter bed count"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Territory
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent">
                  <option>Select territory</option>
                  <option>North District</option>
                  <option>South District</option>
                  <option>East District</option>
                  <option>West District</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-sm text-xs"
                >
                  Create Hospital
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalsView;