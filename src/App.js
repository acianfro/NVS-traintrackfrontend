// App.js - Complete Train-Track Application
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import all your components
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import WorkerOnboarding from './components/workers/WorkerOnboarding';
import WorkerProfiles from './components/workers/WorkerProfiles';
import PublicPortal from './components/public/PublicPortal';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Create authentication context
const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check for saved user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('trainTrackUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('trainTrackUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('trainTrackUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trainTrackUser');
    setSidebarOpen(false); // Close sidebar on logout
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Loading screen while checking authentication
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Train-Track...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="app">
          {user ? (
            // User is logged in - show main application
            <div className="app-layout">
              <Navbar 
                user={user} 
                logout={logout}
                toggleSidebar={toggleSidebar}
              />
              
              <div className="app-content">
                <Sidebar 
                  isOpen={sidebarOpen}
                  userRole={user.role}
                  onClose={closeSidebar}
                />
                
                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/workers/onboard" element={<WorkerOnboarding />} />
                    <Route path="/workers/profiles" element={<WorkerProfiles />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    {/* Catch any unmatched routes and redirect to dashboard */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            // User is not logged in - show login and public routes
            <Routes>
              <Route path="/public" element={<PublicPortal />} />
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              {/* Redirect any protected routes to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
