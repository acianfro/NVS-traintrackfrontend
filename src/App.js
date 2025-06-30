import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';

function App() {
  const [user, setUser] = useState(null);

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
          // Logged in - show dashboard (simple for now)
          <div style={{ 
            padding: '40px', 
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            color: 'white'
          }}>
            <h1>🏗️ Train-Track Dashboard</h1>
            <h2>Welcome, {user.name}!</h2>
            <p>Role: {user.title}</p>
            <button 
              onClick={logout}
              style={{
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          // Not logged in - show login
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
