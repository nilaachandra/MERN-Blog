import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setUser({ username });
      setErrorMessage(''); // Clear error message on success
      return { success: true };
    } catch (error) {
      let errorMsg = '';
      if (error.response) {
        errorMsg = error.response.data.message;
      } else if (error.request) {
        errorMsg = 'No response from server. Please try again later.';
      } else {
        errorMsg = 'An error occurred. Please try again.';
      }
      setErrorMessage(errorMsg);
      return { success: false, message: errorMsg };
    }
  };
  

  const signUp = async (username, password, confirmPassword) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/sign-up',
        { username, password, confirmPassword },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setUser({ username });
      setErrorMessage(''); // Clear error message on success
      return { success: true };
    } catch (error) {
      let errorMsg = '';
      if (error.response) {
        errorMsg = error.response.data.message;
      } else if (error.request) {
        errorMsg = 'No response from server. Please try again later.';
      } else {
        errorMsg = 'An error occurred. Please try again.';
      }
      setErrorMessage(errorMsg);
      return { success: false, message: errorMsg };
    }
  };
  

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Optionally, verify the token with the server to check if it's still valid
      setUser({ username: 'user' }); // Set user based on token payload or additional verification
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
