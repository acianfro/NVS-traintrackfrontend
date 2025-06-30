// components/layout/Navbar.jsx
import React, { useState } from 'react';

const Navbar = ({ user, logout, toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button 
            onClick={toggleSidebar}
            className="mobile-menu-btn"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          
          <div className="navbar-brand">
            <div className="brand-icon">🏗️</div>
            <span className="brand-text">Train-Track</span>
          </div>
        </div>

        <div className="navbar-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search workers, training, reports..."
              className="global-search"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-actions">
            <button className="notification-btn" title="Notifications">
              🔔
              <span className="notification-badge">3</span>
            </button>
            
            <button className="help-btn" title="Help & Support">
              ❓
            </button>
            
            <div className="profile-menu">
              <button 
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="profile-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                  <div className="profile-name">{user.name}</div>
                  <div className="profile-role">{user.title}</div>
                </div>
                <div className="profile-arrow">▼</div>
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-avatar large">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-details">
                      <div className="profile-name">{user.name}</div>
                      <div className="profile-email">{user.email}</div>
                      <div className="profile-company">{user.company}</div>
                    </div>
                  </div>
                  
                  <div className="profile-menu-items">
                    <button className="menu-item" onClick={() => alert('Profile settings coming soon!')}>
                      👤 Profile Settings
                    </button>
                    <button className="menu-item" onClick={() => alert('Preferences coming soon!')}>
                      ⚙️ Preferences
                    </button>
                    <button className="menu-item" onClick={() => alert('Help center coming soon!')}>
                      📚 Help Center
                    </button>
                    <hr className="menu-divider" />
                    <button className="menu-item logout" onClick={handleLogout}>
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
          max-width: 100%;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .mobile-menu-btn:hover {
          background: #f7fafc;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 20px;
          color: #1a202c;
        }

        .brand-icon {
          font-size: 24px;
        }

        .navbar-center {
          flex: 1;
          max-width: 500px;
          margin: 0 40px;
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .global-search {
          width: 100%;
          padding: 8px 40px 8px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          background: #f7fafc;
          transition: all 0.3s ease;
        }

        .global-search:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-btn {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          font-size: 14px;
          color: #718096;
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .notification-btn,
        .help-btn {
          position: relative;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .notification-btn:hover,
        .help-btn:hover {
          background: #f7fafc;
        }

        .notification-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: #e53e3e;
          color: white;
          font-size: 10px;
          font-weight: 600;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-menu {
          position: relative;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .profile-btn:hover {
          background: #f7fafc;
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #667eea;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .profile-avatar.large {
          width: 48px;
          height: 48px;
          font-size: 18px;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .profile-name {
          font-weight: 600;
          font-size: 14px;
          color: #2d3748;
        }

        .profile-role {
          font-size: 12px;
          color: #718096;
        }

        .profile-arrow {
          font-size: 10px;
          color: #718096;
          transition: transform 0.2s ease;
        }

        .profile-btn:hover .profile-arrow {
          transform: rotate(180deg);
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 280px;
          z-index: 1000;
          margin-top: 8px;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .profile-details {
          flex: 1;
        }

        .profile-details .profile-name {
          font-size: 16px;
          margin-bottom: 4px;
        }

        .profile-email {
          font-size: 14px;
          color: #718096;
          margin-bottom: 2px;
        }

        .profile-company {
          font-size: 12px;
          color: #a0aec0;
        }

        .profile-menu-items {
          padding: 8px 0;
        }

        .menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #2d3748;
          transition: background-color 0.2s ease;
          text-align: left;
        }

        .menu-item:hover {
          background: #f7fafc;
        }

        .menu-item.logout {
          color: #e53e3e;
        }

        .menu-item.logout:hover {
          background: #fed7d7;
        }

        .menu-divider {
          margin: 8px 0;
          border: none;
          border-top: 1px solid #e2e8f0;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .navbar-center {
            display: none;
          }

          .navbar-content {
            padding: 0 16px;
          }

          .profile-info {
            display: none;
          }

          .profile-arrow {
            display: none;
          }

          .navbar-actions {
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .brand-text {
            display: none;
          }

          .help-btn {
            display: none;
          }

          .profile-dropdown {
            min-width: 260px;
            right: -20px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;