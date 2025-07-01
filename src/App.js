import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
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
          <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar 
              user={user} 
              logout={logout}
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="app-content" style={{ display: 'flex', flex: 1 }}>
              <Sidebar 
                isOpen={sidebarOpen}
                userRole={user.role}
                onClose={() => setSidebarOpen(false)}
              />
              <main className="main-content" style={{ 
                flex: 1, 
                padding: '24px', 
                background: '#f8fafc',
                marginLeft: sidebarOpen ? '280px' : '0',
                transition: 'margin-left 0.3s ease'
              }}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard user={user} />} />
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
