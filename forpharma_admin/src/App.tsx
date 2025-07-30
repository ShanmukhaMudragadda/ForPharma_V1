import React, { useState } from 'react';
import { useAuthProvider, AuthContext } from './hooks/useAuth';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import UserManagement from './components/Users/UserManagement';
import RoleManagement from './components/Roles/RoleManagement';
import PermissionManagement from './components/Permissions/PermissionManagement';
import DoctorsView from './components/Data/DoctorsView';
import ChemistsView from './components/Data/ChemistsView';
import HospitalsView from './components/Data/HospitalsView';
import TerritoriesView from './components/Data/TerritoriesView';

function App() {
  const auth = useAuthProvider();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (auth.authMode === 'login') {
    return (
      <AuthContext.Provider value={auth}>
        <Login />
      </AuthContext.Provider>
    );
  }

  if (auth.authMode === 'signup') {
    return (
      <AuthContext.Provider value={auth}>
        <Signup />
      </AuthContext.Provider>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'permissions':
        return <PermissionManagement />;
      case 'doctors':
        return <DoctorsView />;
      case 'chemists':
        return <ChemistsView />;
      case 'hospitals':
        return <HospitalsView />;
      case 'territories':
        return <TerritoriesView />;
      case 'organization':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-text-primary mb-2">Organization Settings</h2>
            <p className="text-text-secondary">Coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-text-primary mb-2">System Settings</h2>
            <p className="text-text-secondary">Coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-h-screen bg-background-tertiary">
        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        
          <div className="flex-1 min-w-0 flex flex-col ml-64">
            <Header />
          
            <main className="flex-1 p-6 overflow-auto bg-background-tertiary">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;