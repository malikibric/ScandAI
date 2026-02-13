import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Hardcoded credentials for mock auth
const VALID_CREDENTIALS = {
  email: 'user@scand.ai',
  password: 'password123',
};

const MOCK_USER = {
  name: 'User',
  role: 'Member',
  company: 'ScandAI',
  email: 'user@scand.ai',
  initials: 'U',
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((email, password) => {
    setAuthError('');
    setIsLoading(true);

    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          email.toLowerCase() === VALID_CREDENTIALS.email &&
          password === VALID_CREDENTIALS.password
        ) {
          setUser(MOCK_USER);
          setIsLoggedIn(true);
          setAuthError('');
          setIsLoading(false);
          resolve(true);
        } else {
          setAuthError('Invalid email or password. Please try again.');
          setIsLoading(false);
          resolve(false);
        }
      }, 1200);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setAuthError('');
  }, []);

  const clearError = useCallback(() => {
    setAuthError('');
  }, []);

  const value = {
    isLoggedIn,
    user,
    authError,
    isLoading,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
