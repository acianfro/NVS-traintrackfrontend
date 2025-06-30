// App.js - Complete Train-Track Application
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components (these should match your uploaded files)
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import WorkerOnboarding from './components/workers/WorkerOnboarding';
import WorkerProfiles from './components/workers/WorkerProfiles';
import TrainingLog from './components/training/TrainingLog';
import PublicPortal from './components/public/PublicPortal';
import Reports from './components/reports/Reports';
import Administration from './components/admin/Administration';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Mock authentication context
const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock authentication check
  useEffect(() => {
    const savedUser = localStorage.getItem('trainTrackUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
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
  };

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
            <div className="app-layout">
              <Navbar 
                user={user} 
                logout={logout}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
              <div className="app-content">
                <Sidebar 
                  isOpen={sidebarOpen}
                  userRole={user.role}
                  onClose={() => setSidebarOpen(false)}
                />
                <main className="main-content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/workers/onboard" element={<WorkerOnboarding />} />
                    <Route path="/workers/profiles" element={<WorkerProfiles />} />
                    <Route path="/training/log" element={<TrainingLog />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/admin" element={<Administration userRole={user.role} />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/public" element={<PublicPortal />} />
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
