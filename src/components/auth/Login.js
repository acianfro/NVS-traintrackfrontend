// components/auth/Login.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock users for demo
  const mockUsers = [
    {
      id: 1,
      email: 'sarah@traintrack.com',
      password: 'demo123',
      name: 'Sarah Johnson',
      role: 'site_manager',
      title: 'Safety Manager',
      company: 'Main Organization'
    },
    {
      id: 2,
      email: 'mike@acme.com',
      password: 'demo123',
      name: 'Mike Rodriguez',
      role: 'contractor',
      title: 'HSE Representative',
      company: 'Acme Construction'
    },
    {
      id: 3,
      email: 'admin@traintrack.com',
      password: 'demo123',
      name: 'Lisa Chen',
      role: 'admin',
      title: 'System Administrator',
      company: 'Main Organization'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password. Try: sarah@traintrack.com / demo123');
      }
      setLoading(false);
    }, 1000);
  };

  const quickLogin = (userEmail) => {
    const user = mockUsers.find(u => u.email === userEmail);
    if (user) onLogin(user);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>
      
      <div className="login-content">
        <div className="login-form-container">
          <div className="login-header">
            <div className="logo">
              <div className="logo-icon">🏗️</div>
              <h1>Train-Track</h1>
            </div>
            <p className="login-subtitle">EHS Training Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="demo-accounts">
            <p className="demo-title">Demo Accounts:</p>
            <div className="demo-buttons">
              <button 
                onClick={() => quickLogin('sarah@traintrack.com')}
                className="demo-button"
              >
                Safety Manager
              </button>
              <button 
                onClick={() => quickLogin('mike@acme.com')}
                className="demo-button"
              >
                Contractor
              </button>
              <button 
                onClick={() => quickLogin('admin@traintrack.com')}
                className="demo-button"
              >
                Administrator
              </button>
            </div>
          </div>

          <div className="public-access">
            <a href="/public" className="public-link">
              🔓 Public Training Verification Portal
            </a>
          </div>
        </div>

        <div className="login-info">
          <h2>Streamline Your Safety Training</h2>
          <ul>
            <li>✓ Digital worker profiles and training records</li>
            <li>✓ Mobile-friendly training logging</li>
            <li>✓ Real-time compliance tracking</li>
            <li>✓ Automated expiration alerts</li>
            <li>✓ Public verification portal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
