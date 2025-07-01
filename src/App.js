// App.js - Main Application Component with All Test Components
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components that work
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Test components instead of problematic ones
const TestWorkerProfiles = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Worker Profiles</h1>
      <p>✅ This is a test version of the worker profiles page.</p>
      <p>If you see this, the routing is working!</p>
    </div>
  );
};

const TestOnboarding = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Worker Onboarding</h1>
      <p>✅ This is a test version of the worker onboarding page.</p>
      <p>If you see this, the routing is working!</p>
    </div>
  );
};

const TestTrainingLog = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Training Log</h1>
      <p>✅ This is a test version of the training log page.</p>
      <p>If you see this, the routing is working!</p>
    </div>
  );
};

// Lazy load other components with error handling
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
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          background: '#fee', 
          border: '1px solid #fcc',
          margin: '20px',
          borderRadius: '5px'
        }}>
          <h2>🚨 Something went wrong.</h2>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <details style={{ marginTop: '10px', textAlign: 'left' }}>
            <summary>Error Details</summary>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '10px', 
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '15px', 
              padding: '10px 20px', 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
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
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '200px' 
  }}>
    <div style={{ 
      border: '4px solid #f3f3f3', 
      borderTop: '4px solid #3498db', 
      borderRadius: '50%', 
      width: '40px', 
      height: '40px', 
      animation: 'spin 1s linear infinite' 
    }}></div>
    <p style={{ marginTop: '10px' }}>Loading...</p>
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
        const parsedUser = JSON.parse(savedUser);
        console.log('Loaded user:', parsedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('trainTrackUser');
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log('User logging in:', userData);
    setUser(userData);
    localStorage.setItem('trainTrackUser', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('User logging out');
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
                <ErrorBoundary>
                  <Navbar 
                    user={user} 
                    logout={logout}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                  />
                </ErrorBoundary>
                <div className="app-content">
                  <ErrorBoundary>
                    <Sidebar 
                      isOpen={sidebarOpen}
                      userRole={user.role}
                      onClose={() => setSidebarOpen(false)}
                    />
                  </ErrorBoundary>
                  <main className="main-content">
                    <ErrorBoundary>
                      <Routes>
                        <Route 
                          path="/dashboard" 
                          element={
                            <ErrorBoundary>
                              <Dashboard user={user} />
                            </ErrorBoundary>
                          } 
                        />
                        
                        {/* TEST ROUTES - Using simple test components */}
                        <Route 
                          path="/workers/onboard" 
                          element={
                            <ErrorBoundary>
                              <TestOnboarding />
                            </ErrorBoundary>
                          } 
                        />
                        <Route 
                          path="/workers/profiles" 
                          element={
                            <ErrorBoundary>
                              <TestWorkerProfiles />
                            </ErrorBoundary>
                          } 
                        />
                        <Route 
                          path="/training/log" 
                          element={
                            <ErrorBoundary>
                              <TestTrainingLog />
                            </ErrorBoundary>
                          } 
                        />
                        
                        {/* Other routes with lazy loading */}
                        <Route 
                          path="/reports" 
                          element={
                            <ErrorBoundary>
                              <Suspense fallback={<LoadingSpinner />}>
                                <Reports />
                              </Suspense>
                            </ErrorBoundary>
                          } 
                        />
                        <Route 
                          path="/admin" 
                          element={
                            <ErrorBoundary>
                              <Suspense fallback={<LoadingSpinner />}>
                                <Administration userRole={user.role} />
                              </Suspense>
                            </ErrorBoundary>
                          } 
                        />
                        
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        
                        {/* Catch-all route for debugging */}
                        <Route 
                          path="*" 
                          element={
                            <div style={{ 
                              padding: '20px', 
                              textAlign: 'center',
                              background: '#fff3cd',
                              border: '1px solid #ffeaa7',
                              margin: '20px',
                              borderRadius: '5px'
                            }}>
                              <h2>🔍 Page Not Found</h2>
                              <p>The page you're looking for doesn't exist.</p>
                              <p><strong>Current URL:</strong> {window.location.pathname}</p>
                              <a href="/dashboard" style={{ color: '#0066cc' }}>← Go to Dashboard</a>
                            </div>
                          } 
                        />
                      </Routes>
                    </ErrorBoundary>
                  </main>
                </div>
              </div>
            ) : (
              <ErrorBoundary>
                <Routes>
                  <Route 
                    path="/public" 
                    element={
                      <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner />}>
                          <PublicPortal />
                        </Suspense>
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/login" 
                    element={
                      <ErrorBoundary>
                        <Login onLogin={login} />
                      </ErrorBoundary>
                    } 
                  />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
              </ErrorBoundary>
            )}
          </div>
        </Router>
      </AuthContext.Provider>
      
      {/* Add CSS animation for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </ErrorBoundary>
  );
}

export default App;
