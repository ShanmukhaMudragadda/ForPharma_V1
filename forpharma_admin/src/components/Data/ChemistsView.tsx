import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Mail, Phone, MapPin, Pill } from 'lucide-react';

interface Chemist {
  id: string;
  name: string;
  shopName: string;
  email: string;
  phone: string;
  address: string;
  territory: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const ChemistsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock chemists data
  const chemists: Chemist[] = [
    {
      id: '1',
      name: 'Michael Brown',
      shopName: 'Brown\'s Pharmacy',
      email: 'michael@brownpharmacy.com',
      phone: '+1-234-567-8903',
      address: '123 Main St, City Center',
      territory: 'Central District',
      status: 'active',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Lisa Wilson',
      shopName: 'Wilson Medical Store',
      email: 'lisa@wilsonmedical.com',
      phone: '+1-234-567-8904',
      address: '456 Oak Ave, Downtown',
      territory: 'East District',
      status: 'active',
      createdAt: '2024-01-25'
    },
    {
      id: '3',
      name: 'David Garcia',
      shopName: 'Garcia Pharmacy',
      email: 'david@garciapharmacy.com',
      phone: '+1-234-567-8905',
      address: '789 Pine St, Westside',
      territory: 'West District',
      status: 'inactive',
      createdAt: '2024-01-12'
    }
  ];

  const filteredChemists = chemists.filter(chemist =>
    chemist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chemist.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chemist.territory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">Chemists</h1>
            <p className="text-sm text-text-secondary">Manage chemist and pharmacy records</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-md transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Chemist</span>
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
              placeholder="Search chemists..."
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

      {/* Chemists Table */}
      <div className="bg-white rounded-sm shadow-sf border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Chemist
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Shop Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Address
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
              {filteredChemists.map((chemist) => (
                <tr key={chemist.id} className="hover:bg-background-secondary transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Pill className="w-4 h-4 text-secondary-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs font-medium text-text-primary">{chemist.name}</div>
                        <div className="text-xs text-text-secondary flex items-center">
                          <Phone className="w-2.5 h-2.5 mr-1" />
                          {chemist.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-text-primary">
                    {chemist.shopName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-text-secondary">
                    {chemist.address}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-text-secondary">
                    <div className="flex items-center">
                      <MapPin className="w-2.5 h-2.5 mr-1" />
                      {chemist.territory}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-sm ${
                      chemist.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {chemist.status}
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

      {/* Create Chemist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm shadow-sf-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Create New Chemist
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Chemist Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter chemist name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter shop name"
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
                  Territory
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent">
                  <option>Select territory</option>
                  <option>Central District</option>
                  <option>East District</option>
                  <option>West District</option>
                  <option>North District</option>
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
                  Create Chemist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemistsView;