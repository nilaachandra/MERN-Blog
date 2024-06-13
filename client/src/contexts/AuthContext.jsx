import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token && !user) {
      setLoading(true);
      axios.get('http://localhost:8080/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem('user');
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const signUp = async (firstName, lastName, username, password, confirmPassword) => {
    try {
      const response = await axios.post('http://localhost:8080/sign-up', {
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
      }, { headers: { 'Content-Type': 'application/json' } });

      const { token, ...userInfo } = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      setErrorMessage('');
      return { success: true };
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      return { success: false };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        {
          username,
          password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      const { token, user } = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setErrorMessage('');
      return { success: true };
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      return { success: false };
    }
  };
  

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
