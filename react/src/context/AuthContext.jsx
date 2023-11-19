import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Function to validate the token with the backend
  const validateToken = async (token) => {
    try {
      const response = await axios.get('http://your-backend-url/api/validate-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // If the backend verifies the token, set isAuthenticated to true
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      // If the token is invalid or there's an error, handle it here
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  // Function to log in the user
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://your-backend-url/api/users/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Handle login error (e.g., show a message to the user)
      console.error('Login failed:', error);
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
