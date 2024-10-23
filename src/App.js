import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderBar from './components/HeaderBar';
import TabPanel from './components/TabPanel';
import Sidebar from './components/sidebar';
import LoginPage from './components/LoginPage';
import FlwManagement from './components/SideBars/FlwManagement';
import TeamAssignment from './components/SideBars/TeamAssignment';
import PrivateRoute from './components/PrivateRoute'; 
import CampaignManagement from './components/SideBars/CampaignManagement';
import Dashboard from './components/SideBars/Dashboard';

function App() {
  const [role, setRole] = useState(null); // State to store role

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Set the role once it's fetched
    }
  }, []);

  // Don't render the routes until the role is fetched
  if (role === null) {
    return null; // Return nothing until role is available
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <HeaderBar />
                <Routes>
                  <Route path="stats" element={<Dashboard />} />
                  <Route path="flw" element={<FlwManagement />} />
                  <Route path="team" element={<TeamAssignment />} />
                  
                  {/* Conditionally render CampaignManagement route based on role */}
                  {role === 'ADMIN' && (
                    <Route path="campaign" element={<CampaignManagement />} />
                  )}

                  <Route path="/" element={<TabPanel />} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
