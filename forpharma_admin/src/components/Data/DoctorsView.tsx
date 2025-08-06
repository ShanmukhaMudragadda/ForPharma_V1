import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Mail, Phone, MapPin, Stethoscope } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  hospital: string;
  territory: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const DoctorsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock doctors data
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. John Smith',
      specialization: 'Cardiology',
      email: 'john.smith@hospital.com',
      phone: '+1-234-567-8901',
      hospital: 'City General Hospital',
      territory: 'North District',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrics',
      email: 'sarah.johnson@medical.com',
      phone: '+1-234-567-8902',
      hospital: 'Children\'s Medical Center',
      territory: 'South District',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Dr. Michael Brown',
      specialization: 'Orthopedics',
      email: 'michael.brown@orthocenter.com',
      phone: '+1-234-567-8903',
      hospital: 'Orthopedic Specialty Center',
      territory: 'East District',
      status: 'inactive',
      createdAt: '2024-01-18'
    },
    {
      id: '4',
      name: 'Dr. Emily Davis',
      specialization: 'Neurology',
      email: 'emily.davis@neurocenter.com',
      phone: '+1-234-567-8904',
      hospital: 'Neurological Institute',
      territory: 'West District',
      status: 'active',
      createdAt: '2024-01-22'
    }
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.territory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">Doctors</h1>
            <p className="text-sm text-text-secondary">Manage doctor records and information</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-md transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Doctor</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-border rounded-md hover:bg-background-secondary transition-colors duration-200 text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Territory
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-background-secondary transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">{doctor.name}</div>
                        <div className="text-sm text-text-secondary flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {doctor.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-sm font-medium bg-secondary-100 text-secondary-800 rounded-md">
                      {doctor.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {doctor.hospital}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {doctor.territory}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-md ${
                      doctor.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 hover:bg-primary-50 text-primary-600 rounded-md transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-primary-50 text-primary-600 rounded-md transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-error/10 text-error rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Doctor Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm shadow-sf-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Create New Doctor
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter doctor name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter specialization"
                />
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
                  Hospital
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent">
                  <option>Select hospital</option>
                  <option>City General Hospital</option>
                  <option>Children's Medical Center</option>
                  <option>Orthopedic Specialty Center</option>
                </select>
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
                  Create Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsView;