// App.jsx - Main Application Component
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components with error boundaries
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Lazy load components that might have issues
const WorkerOnboarding = React.lazy(() => 
  import('./components/workers/WorkerOnboarding').catch(() => {
    console.error('Failed to load WorkerOnboarding component');
    return { default: () => <div>Error loading Worker Onboarding. Please refresh the page.</div> };
  })
);

const WorkerProfiles = React.lazy(() => 
  import('./components/workers/WorkerProfiles').catch(() => {
    console.error('Failed to load WorkerProfiles component');
    return { default: () => <div>Error loading Worker Profiles. Please refresh the page.</div> };
  })
);

const TrainingLog = React.lazy(() => 
  import('./components/training/TrainingLog').catch(() => {
    console.error('Failed to load TrainingLog component');
    return { default: () => <div>Error loading Training Log. Please refresh the page.</div> };
  })
);

const PublicPortal = React.lazy(() => 
  import('./components/public/PublicPortal').catch(() => {
    console.error('Failed to load PublicPortal component');
    return { default: () => <div>Error loading Public Portal. Please refresh the page.</div> };
  })
);

const Reports = React.lazy(() => 
  import('./components/reports/Reports').catch(() => {
    console.error('Failed to load Reports component');
    return { default: () => <div>Error loading Reports. Please refresh the page.</div> };
  })
);

const Administration = React.lazy(() => 
  import('./components/admin/Administration').catch(() => {
    console.error('Failed to load Administration component');
    return { default: () => <div>Error loading Administration. Please refresh the page.</div> };
  })
);

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
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard user={user} />} />
                        <Route 
                          path="/workers/onboard" 
                          element={
                            <ErrorBoundary>
                              <WorkerOnboarding />
                            </ErrorBoundary>
                          } 
                        />
                        <Route 
                          path="/workers/profiles" 
                          element={
                            <ErrorBoundary>
                              <WorkerProfiles />
                            </ErrorBoundary>
                          } 
                        />
                        <Route 
                          path="/training/log" 
                          element={
                            <ErrorBoundary>
                              <TrainingLog />
                            </ErrorBoundary>
                          } 
                        />
                        <Route 
                          path="/reports" 
                          element={
                            <ErrorBoundary>
                              <Reports />
                            </ErrorBoundary>
                          } 
                        />
                        <Route 
                          path="/admin" 
                          element={
                            <ErrorBoundary>
                              <Administration userRole={user.role} />
                            </ErrorBoundary>
                          } 
                        />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Suspense>
                  </main>
                </div>
              </div>
            ) : (
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route 
                    path="/public" 
                    element={
                      <ErrorBoundary>
                        <PublicPortal />
                      </ErrorBoundary>
                    } 
                  />
                  <Route path="/login" element={<Login onLogin={login} />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
              </Suspense>
            )}
          </div>
        </Router>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
