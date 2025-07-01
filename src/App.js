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
          <div style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
            <div style={{ background: '#667eea', color: 'white', padding: '20px', borderRadius: '8px' }}>
              <h1>🏗️ Train-Track Dashboard</h1>
              <p>Welcome, {user.name}! ({user.title})</p>
              <button onClick={logout} style={{ padding: '10px 20px', marginTop: '10px' }}>
                Logout
              </button>
            </div>
            
            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h2>Dashboard Content</h2>
              <p>✅ Login working</p>
              <p>✅ User data: {user.name}</p>
              <p>🔄 Ready to add navigation components</p>
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
