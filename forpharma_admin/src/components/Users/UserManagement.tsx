import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { User } from '../../types/auth';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@company.com',
      firstName: 'Admin',
      lastName: 'User',
      roles: [{ id: '1', name: 'Super Admin', description: 'Full access', permissions: [], createdAt: '2024-01-01' }],
      createdAt: '2024-01-01',
      isActive: true
    },
    {
      id: '2',
      email: 'john.doe@company.com',
      firstName: 'John',
      lastName: 'Doe',
      roles: [{ id: '2', name: 'Manager', description: 'Limited access', permissions: [], createdAt: '2024-01-02' }],
      createdAt: '2024-01-02',
      isActive: true
    },
    {
      id: '3',
      email: 'jane.smith@company.com',
      firstName: 'Jane',
      lastName: 'Smith',
      roles: [{ id: '3', name: 'Employee', description: 'Basic access', permissions: [], createdAt: '2024-01-03' }],
      createdAt: '2024-01-03',
      isActive: false
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">User Management</h1>
            <p className="text-sm text-text-secondary">Create and manage user accounts</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-md transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div>
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-text-secondary flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-sm font-semibold bg-primary-100 text-primary-800 rounded-md">
                      {user.roles[0]?.name || 'No Role'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-md ${
                      user.isActive 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="p-2 hover:bg-primary-50 text-primary-600 rounded-md transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-error/10 text-error rounded-md transition-colors duration-200">
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
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Create New User
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Select a role</option>
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-sm"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;