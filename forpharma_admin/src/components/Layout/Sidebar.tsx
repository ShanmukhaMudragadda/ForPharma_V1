import React, { useState } from 'react';
import { Users, Shield, Key, Database, Settings, BarChart3, Building, LogOut, ChevronDown, ChevronRight, Home, Stethoscope, Pill, Guitar as Hospital, Map } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { organization } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'data']);

  const menuSections = [
    {
      id: 'main',
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Home', icon: Home },
      ]
    },
    {
      id: 'data',
      label: 'Data Management',
      items: [
        { id: 'doctors', label: 'Doctors', icon: Stethoscope },
        { id: 'chemists', label: 'Chemists', icon: Pill },
        { id: 'hospitals', label: 'Hospitals', icon: Hospital },
        { id: 'territories', label: 'Territories', icon: Map },
      ]
    },
    {
      id: 'admin',
      label: 'Administration',
      items: [
        { id: 'users', label: 'Users', icon: Users },
        { id: 'roles', label: 'Roles', icon: Shield },
        { id: 'permissions', label: 'Permissions', icon: Key },
      ]
    },
    {
      id: 'setup',
      label: 'Setup',
      items: [
        { id: 'organization', label: 'Organization', icon: Building },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="w-64 bg-background-secondary border-r border-border flex flex-col h-screen fixed left-0 top-0 z-20">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary">Admin Console</h1>
            {organization && (
              <p className="text-xs text-text-secondary truncate max-w-32">{organization.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-text-tertiary uppercase tracking-wide hover:bg-background-tertiary rounded-md transition-colors"
            >
              <span>{section.label}</span>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              )}
            </button>
            
            {expandedSections.includes(section.id) && (
              <div className="mt-2 space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md text-left
                        transition-colors duration-150
                        ${isActive 
                          ? 'bg-primary-500 text-white shadow-sm' 
                          : 'text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;