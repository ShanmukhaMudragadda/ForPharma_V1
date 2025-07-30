import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Map, Stethoscope, Pill, Guitar as Hospital } from 'lucide-react';

interface Territory {
  id: string;
  name: string;
  region: string;
  manager: string;
  doctorCount: number;
  chemistCount: number;
  hospitalCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const TerritoriesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock territories data
  const territories: Territory[] = [
    {
      id: '1',
      name: 'North District',
      region: 'Northern Region',
      manager: 'Robert Davis',
      doctorCount: 45,
      chemistCount: 23,
      hospitalCount: 8,
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'South District',
      region: 'Southern Region',
      manager: 'Emily Clark',
      doctorCount: 38,
      chemistCount: 19,
      hospitalCount: 6,
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'East District',
      region: 'Eastern Region',
      manager: 'Michael Johnson',
      doctorCount: 32,
      chemistCount: 15,
      hospitalCount: 5,
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'West District',
      region: 'Western Region',
      manager: 'Sarah Wilson',
      doctorCount: 28,
      chemistCount: 12,
      hospitalCount: 4,
      status: 'inactive',
      createdAt: '2024-01-01'
    }
  ];

  const filteredTerritories = territories.filter(territory =>
    territory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    territory.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    territory.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">Territories</h1>
            <p className="text-sm text-text-secondary">Manage geographic territories and regions</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-md transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Territory</span>
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
              placeholder="Search territories..."
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

      {/* Territories Table */}
      <div className="bg-white rounded-sm shadow-sf border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Territory
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Statistics
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
              {filteredTerritories.map((territory) => (
                <tr key={territory.id} className="hover:bg-background-secondary transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Map className="w-4 h-4 text-secondary-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs font-medium text-text-primary">{territory.name}</div>
                        <div className="text-xs text-text-secondary">{territory.region}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-text-primary">
                    {territory.manager}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs text-text-secondary space-y-1">
                      <div className="flex items-center">
                        <Stethoscope className="w-2.5 h-2.5 mr-1" />
                        <span>{territory.doctorCount} Doctors</span>
                      </div>
                      <div className="flex items-center">
                        <Pill className="w-2.5 h-2.5 mr-1" />
                        <span>{territory.chemistCount} Chemists</span>
                      </div>
                      <div className="flex items-center">
                        <Hospital className="w-2.5 h-2.5 mr-1" />
                        <span>{territory.hospitalCount} Hospitals</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-sm ${
                      territory.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {territory.status}
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

      {/* Create Territory Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm shadow-sf-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Create New Territory
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Territory Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter territory name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Region
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter region name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Manager
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter manager name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Enter territory description"
                />
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
                  Create Territory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerritoriesView;