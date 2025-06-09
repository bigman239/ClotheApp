import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

// Mock user for demonstration
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
};

export const useAuthStore = () => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // This would normally check for a stored auth token
  useEffect(() => {
    // For this example, we'll just use the mock user
  }, []);

  const signIn = (email: string, password: string) => {
    // This would normally make an API call
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
  };
};