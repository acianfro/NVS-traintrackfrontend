// App.jsx - Main Application Component (Direct Imports Version)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Direct imports instead of lazy loading for debugging
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import WorkerOnboarding from './components/workers/WorkerOnboarding';
import WorkerProfiles from './components/workers/WorkerProfiles';
import TrainingLog from './components/training/TrainingLog';
import PublicPortal from './components/public/PublicPortal';
import Reports from './components/reports/Reports';
import Administration from './components/admin/Administration';

// Mock authentication context
const AuthContext = React.createContext();

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="loading-screen">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock authentication check
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('trainTrackUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('trainTrackUser');
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
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
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
                    <ErrorBoundary>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard user={user} />} />
                        <Route path="/onboard" element={<WorkerOnboarding />} />
                        <Route path="/profiles" element={<WorkerProfiles />} />
                        <Route path="/log" element={<TrainingLog />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/admin" element={<Administration userRole={user.role} />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </ErrorBoundary>
                  </main>
                </div>
              </div>
            ) : (
              <ErrorBoundary>
                <Routes>
                  <Route path="/public" element={<PublicPortal />} />
                  <Route path="/login" element={<Login onLogin={login} />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
              </ErrorBoundary>
            )}
          </div>
        </Router>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
