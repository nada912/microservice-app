import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RestrictedPage from './components/RestrictedPage';

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route 
          path="/restricted" 
          element={isAuthenticated() ? <RestrictedPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
