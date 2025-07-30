import { useState, useEffect, createContext, useContext } from 'react';
import { User, Organization, GoogleUser, SignupData } from '../types/auth';

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMode: 'login' | 'signup' | 'setup' | 'authenticated';
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleUser: GoogleUser) => Promise<void>;
  signup: (signupData: SignupData) => Promise<void>;
  logout: () => void;
  setAuthMode: (mode: 'login' | 'signup' | 'setup' | 'authenticated') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'setup' | 'authenticated'>('login');

  useEffect(() => {
    // Check authentication state
    const userData = localStorage.getItem('user_data');
    const orgData = localStorage.getItem('org_data');

    if (!userData || !orgData) {
      setAuthMode('login');
      setIsLoading(false);
      return;
    }

    try {
      setUser(JSON.parse(userData));
      setOrganization(JSON.parse(orgData));
      setAuthMode('authenticated');
    } catch (error) {
      console.error('Error parsing stored data:', error);
      setAuthMode('login');
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call to check credentials
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock organization check
    const mockOrg: Organization = {
      id: '1',
      name: 'Acme Corporation',
      domain: 'acme.com',
      address: '123 Business St',
      phone: '+1-555-0123',
      email: 'info@acme.com',
      settings: {
        allowUserRegistration: true,
        requireEmailVerification: false,
        sessionTimeout: 8
      }
    };

    const mockUser: User = {
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe',
      roles: [{
        id: '1',
        name: 'Employee',
        description: 'Basic access',
        permissions: [],
        createdAt: new Date().toISOString()
      }],
      createdAt: new Date().toISOString(),
      isActive: true
    };

    setUser(mockUser);
    setOrganization(mockOrg);
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    localStorage.setItem('org_data', JSON.stringify(mockOrg));
    setAuthMode('authenticated');
    setIsLoading(false);
  };

  const loginWithGoogle = async (googleUser: GoogleUser) => {
    setIsLoading(true);
    // Simulate API call to check if user's email domain exists in any organization
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user's email domain matches any existing organization
    const emailDomain = googleUser.email.split('@')[1];
    const knownDomains = ['acme.com', 'company.com', 'business.org'];
    
    if (knownDomains.includes(emailDomain)) {
      // Organization exists - login user
      const mockOrg: Organization = {
        id: '1',
        name: 'Acme Corporation',
        domain: emailDomain,
        address: '123 Business St',
        phone: '+1-555-0123',
        email: `info@${emailDomain}`,
        settings: {
          allowUserRegistration: true,
          requireEmailVerification: false,
          sessionTimeout: 8
        }
      };

      const mockUser: User = {
        id: googleUser.id,
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        roles: [{
          id: '1',
          name: 'Employee',
          description: 'Basic access',
          permissions: [],
          createdAt: new Date().toISOString()
        }],
        createdAt: new Date().toISOString(),
        isActive: true
      };

      setUser(mockUser);
      setOrganization(mockOrg);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      localStorage.setItem('org_data', JSON.stringify(mockOrg));
      setAuthMode('authenticated');
    } else {
      // New organization - redirect to signup with pre-filled user data
      // Store Google user data temporarily for signup process
      localStorage.setItem('google_user_temp', JSON.stringify(googleUser));
      setAuthMode('signup');
    }
    
    setIsLoading(false);
  };

  const signup = async (signupData: SignupData) => {
    setIsLoading(true);
    // Simulate API call to create user and organization
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockOrg: Organization = {
      id: '1',
      ...signupData.organization,
      settings: {
        allowUserRegistration: false,
        requireEmailVerification: true,
        sessionTimeout: 8
      }
    };

    const mockUser: User = {
      id: '1',
      email: signupData.user.email,
      firstName: signupData.user.firstName,
      lastName: signupData.user.lastName,
      roles: [{
        id: '1',
        name: 'Super Admin',
        description: 'Full system access',
        permissions: [],
        createdAt: new Date().toISOString()
      }],
      createdAt: new Date().toISOString(),
      isActive: true
    };

    setOrganization(mockOrg);
    setUser(mockUser);
    
    localStorage.setItem('org_data', JSON.stringify(mockOrg));
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    setAuthMode('authenticated');
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    localStorage.removeItem('user_data');
    localStorage.removeItem('org_data');
    setAuthMode('login');
  };

  return {
    user,
    organization,
    isAuthenticated: !!user,
    isLoading,
    authMode,
    login,
    loginWithGoogle,
    signup,
    logout,
    setAuthMode
  };
};

export { AuthContext };