import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import WorkerOnboarding from './components/workers/WorkerOnboarding';
import WorkerProfiles from './components/workers/WorkerProfiles';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        {user ? (
          <div className="app-layout">
            <Navbar 
              user={user} 
              logout={logout}
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="app-content" style={{ display: 'flex' }}>
              <Sidebar 
                isOpen={sidebarOpen}
                userRole={user.role}
                onClose={() => setSidebarOpen(false)}
              />
              <main className="main-content" style={{ 
                flex: 1, 
                padding: '24px', 
                background: '#f8fafc',
                minHeight: 'calc(100vh - 64px)'
              }}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard user={user} />} />
                  <Route path="/workers/onboard" element={<WorkerOnboarding />} />
                  <Route path="/workers/profiles" element={<WorkerProfiles />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
