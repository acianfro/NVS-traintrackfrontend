// components/public/PublicPortal.jsx
import React, { useState } from 'react';

const PublicPortal = () => {
  const [workerId, setWorkerId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock worker data for demonstration
  const mockWorkerData = {
    'ACM-001': {
      workerId: 'ACM-001',
      name: 'John Smith',
      jobTitle: 'Crane Operator',
      company: 'Acme Construction',
      currentSite: 'Downtown Office Complex',
      status: 'active',
      lastUpdated: new Date().toISOString(),
      certifications: [
        {
          id: 1,
          name: 'OSHA 30-Hour Construction',
          completionDate: '2024-01-15',
          expirationDate: '2026-03-15',
          status: 'valid',
          category: 'Safety Certifications'
        },
        {
          id: 2,
          name: 'Crane Operation Certification',
          completionDate: '2023-08-22',
          expirationDate: '2025-08-22',
          status: 'expiring',
          category: 'Equipment Operation'
        },
        {
          id: 3,
          name: 'Site Safety Orientation',
          completionDate: '2025-06-20',
          expirationDate: null,
          status: 'current',
          category: 'Site Onboarding'
        }
      ]
    },
    'PWR-045': {
      workerId: 'PWR-045',
      name: 'Mike Rodriguez',
      jobTitle: 'Electrician',
      company: 'PowerCorp',
      currentSite: 'Highway Bridge Project',
      status: 'active',
      lastUpdated: new Date().toISOString(),
      certifications: [
        {
          id: 1,
          name: 'Electrical Safety Training',
          completionDate: '2024-03-10',
          expirationDate: '2026-03-10',
          status: 'valid',
          category: 'Safety Certifications'
        },
        {
          id: 2,
          name: 'OSHA 10-Hour Construction',
          completionDate: '2024-01-05',
          expirationDate: '2025-09-15',
          status: 'valid',
          category: 'Safety Certifications'
        }
      ]
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    
    if (!workerId.trim()) {
      setError('Please enter a Worker ID');
      return;
    }

    setLoading(true);
    setError('');
    setVerificationResult(null);

    // Simulate API call
    setTimeout(() => {
      const worker = mockWorkerData[workerId.toUpperCase()];
      
      if (worker) {
        setVerificationResult(worker);
      } else {
        setError('Worker ID not found. Please check the ID and try again.');
      }
      
      setLoading(false);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'valid': { text: '✓ Valid', className: 'status-valid' },
      'expiring': { text: '⚠ Expiring Soon', className: 'status-expiring' },
      'current': { text: '✓ Current', className: 'status-current' },
      'expired': { text: '✗ Expired', className: 'status-expired' }
    };
    
    return badges[status] || { text: status, className: 'status-unknown' };
  };

  const getDaysUntilExpiry = (expirationDate) => {
    if (!expirationDate) return null;
    
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const copyShareUrl = () => {
    const url = `${window.location.origin}/public`;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    });
  };

  const generateQRCode = () => {
    alert('QR Code would be generated here for mobile access');
  };

  return (
    <div className="public-portal">
      <div className="public-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">🏗️</div>
              <h1>Train-Track</h1>
            </div>
            <p className="portal-subtitle">Public Training Verification Portal</p>
          </div>
          
          <nav className="public-nav">
            <a href="/login" className="nav-link">
              Staff Login
            </a>
          </nav>
        </div>
      </div>

      <div className="public-content">
        <div className="verification-container">
          <div className="intro-section">
            <div className="intro-icon">🔍</div>
            <h2>Verify Worker Training Status</h2>
            <p>Enter a Worker ID below to verify current training certifications and compliance status</p>
          </div>

          <div className="quick-access-card">
            <h3>Quick Access Options</h3>
            <div className="access-options">
              <div className="access-option">
                <span className="option-label">Share URL:</span>
                <div className="url-share">
                  <input 
                    type="text" 
                    readOnly 
                    value={`${window.location.origin}/public`}
                    className="share-url"
                  />
                  <button onClick={copyShareUrl} className="copy-btn">
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="access-option">
                <span className="option-label">QR Code for Mobile Access:</span>
                <div className="qr-section">
                  <div className="qr-placeholder">
                    <div className="qr-code">QR CODE</div>
                  </div>
                  <button onClick={generateQRCode} className="generate-qr-btn">
                    Generate QR
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleVerification} className="verification-form">
            <div className="form-group">
              <label htmlFor="workerId">Worker ID</label>
              <input
                type="text"
                id="workerId"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                placeholder="Enter Worker ID (e.g., ACM-001)"
                className="worker-id-input"
                disabled={loading}
              />
              <small className="form-help">
                Try: ACM-001 or PWR-045 for demo
              </small>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="verify-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Verifying...
                </>
              ) : (
                'Verify Training Status'
              )}
            </button>
          </form>

          {verificationResult && (
            <div className="verification-result">
              <div className="result-header">
                <div className="verification-status">
                  <div className="status-icon">✓</div>
                  <div className="status-text">
                    <h3>{verificationResult.name} ({verificationResult.workerId})</h3>
                    <p>{verificationResult.jobTitle} - {verificationResult.company}</p>
                    <p className="current-site">Current Site: {verificationResult.currentSite}</p>
                  </div>
                </div>
                <div className="privacy-notice">
                  ⚠️ Personal details hidden in public view
                </div>
              </div>

              <div className="certifications-section">
                <h4>Current Certifications</h4>
                <div className="certifications-list">
                  {verificationResult.certifications.map(cert => {
                    const badge = getStatusBadge(cert.status);
                    const daysUntilExpiry = cert.expirationDate ? getDaysUntilExpiry(cert.expirationDate) : null;
                    
                    return (
                      <div key={cert.id} className="certification-item">
                        <div className="cert-info">
                          <div className="cert-name">{cert.name}</div>
                          <div className="cert-details">
                            {cert.expirationDate ? (
                              <>
                                Valid through {new Date(cert.expirationDate).toLocaleDateString()}
                                {daysUntilExpiry !== null && daysUntilExpiry <= 90 && (
                                  <span className="expiry-warning">
                                    ({daysUntilExpiry} days remaining)
                                  </span>
                                )}
                              </>
                            ) : (
                              `Completed ${new Date(cert.completionDate).toLocaleDateString()}`
                            )}
                          </div>
                          <div className="cert-category">{cert.category}</div>
                        </div>
                        <div className={`cert-status ${badge.className}`}>
                          {badge.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="result-footer">
                <div className="last-updated">
                  Last updated: {new Date(verificationResult.lastUpdated).toLocaleString()}
                </div>
                <div className="contact-info">
                  For detailed records, contact your safety manager
                </div>
              </div>
            </div>
          )}

          <div className="info-section">
            <h3>About This Portal</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">🔒</div>
                <div className="info-content">
                  <h4>Privacy Protected</h4>
                  <p>Only training status and certifications are shown. Personal information is kept private.</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">⚡</div>
                <div className="info-content">
                  <h4>Real-Time Data</h4>
                  <p>Information is updated in real-time as training records are logged and certifications are earned.</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📱</div>
                <div className="info-content">
                  <h4>Mobile Friendly</h4>
                  <p>Access verification from any device, anywhere. No login required.</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">✅</div>
                <div className="info-content">
                  <h4>Compliance Ready</h4>
                  <p>Instantly verify worker qualifications for site access and regulatory compliance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <p className="footer-text">
              This portal provides public access to worker training verification.
              For system access, please <a href="/login">log in here</a>.
            </p>
            <p className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy policy would be shown here'); }}>
                Privacy Policy
              </a>
              {' | '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of service would be shown here'); }}>
                Terms of Service
              </a>
              {' | '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Contact information would be shown here'); }}>
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPortal;
