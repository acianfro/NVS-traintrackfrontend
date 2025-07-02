// components/layout/Sidebar.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, userRole, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Main',
      items: [
        {
          path: '/dashboard',
          icon: '📊',
          label: 'Dashboard',
          roles: ['admin', 'site_manager', 'corp_manager', 'contractor']
        },
        {
          path: '/workers/profiles',
          icon: '👥',
          label: 'Worker Profiles',
          roles: ['admin', 'site_manager', 'corp_manager', 'contractor']
        }
      ]
    },
    {
      section: 'Training Management',
      items: [
        {
          path: '/workers/onboard',
          icon: '👤',
          label: 'Add Worker',
          roles: ['admin', 'site_manager', 'contractor']
        },
        {
          path: '/log',
          icon: '📝',
          label: 'Log Training',
          roles: ['admin', 'site_manager', 'contractor']
        }
      ]
    },
    {
      section: 'Reports & Analytics',
      items: [
        {
          path: '/reports',
          icon: '📈',
          label: 'Reports',
          roles: ['admin', 'site_manager', 'corp_manager']
        }
      ]
    },
    {
      section: 'Administration',
      items: [
        {
          path: '/admin',
          icon: '⚙️',
          label: 'Administration',
          roles: ['admin', 'site_manager']
        }
      ]
    },
    {
      section: 'External',
      items: [
        {
          path: '/public',
          icon: '🔓',
          label: 'Public Portal',
          roles: ['admin', 'site_manager', 'corp_manager', 'contractor'],
          external: true
        }
      ]
    }
  ];

  const isActivePath = (path) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const hasAccess = (requiredRoles) => {
    return requiredRoles.includes(userRole);
  };

  const handleNavClick = (path, external = false) => {
    if (external) {
      window.open(path, '_blank');
    } else {
      window.location.href = path;
    }
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon">🏗️</div>
              <span className="logo-text">Train-Track</span>
            </div>
            <button 
              className="sidebar-close"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <nav className="sidebar-nav">
            {navigationItems.map((section, sectionIndex) => {
              const visibleItems = section.items.filter(item => hasAccess(item.roles));
              
              if (visibleItems.length === 0) return null;

              return (
                <div key={sectionIndex} className="nav-section">
                  <div className="nav-section-title">{section.section}</div>
                  <ul className="nav-items">
                    {visibleItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="nav-item">
                        <button
                          className={`nav-link ${isActivePath(item.path) ? 'active' : ''} ${item.external ? 'external' : ''}`}
                          onClick={() => handleNavClick(item.path, item.external)}
                        >
                          <span className="nav-icon">{item.icon}</span>
                          <span className="nav-label">{item.label}</span>
                          {item.external && <span className="external-icon">↗</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="user-info-card">
              <div className="user-avatar">
                {userRole === 'admin' && '👑'}
                {userRole === 'site_manager' && '🛡️'}
                {userRole === 'corp_manager' && '💼'}
                {userRole === 'contractor' && '🔧'}
              </div>
              <div className="user-details">
                <div className="user-role-name">
                  {userRole === 'admin' && 'Administrator'}
                  {userRole === 'site_manager' && 'Site Manager'}
                  {userRole === 'corp_manager' && 'Corp Manager'}
                  {userRole === 'contractor' && 'Contractor'}
                </div>
                <div className="user-permissions">
                  {userRole === 'admin' && 'Full Access'}
                  {userRole === 'site_manager' && 'Site Management'}
                  {userRole === 'corp_manager' && 'Corporate View'}
                  {userRole === 'contractor' && 'Limited Access'}
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => handleNavClick('/training/log')}
                title="Quick Training Log"
              >
                📱 Mobile Log
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => alert('Help center coming soon!')}
                title="Help & Support"
              >
                ❓ Help
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 199;
            display: none;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: -280px;
            width: 280px;
            height: 100vh;
            background: white;
            border-right: 1px solid #e2e8f0;
            box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
            z-index: 200;
            transition: left 0.3s ease;
            overflow: hidden;
          }

          .sidebar.open {
            left: 0;
          }

          .sidebar-content {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            background: #f8fafc;
          }

          .sidebar-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 700;
            font-size: 18px;
            color: #1a202c;
          }

          .logo-icon {
            font-size: 24px;
          }

          .sidebar-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #718096;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
          }

          .sidebar-close:hover {
            background: #e2e8f0;
            color: #2d3748;
          }

          .sidebar-nav {
            flex: 1;
            padding: 20px 0;
            overflow-y: auto;
          }

          .nav-section {
            margin-bottom: 32px;
          }

          .nav-section:last-child {
            margin-bottom: 0;
          }

          .nav-section-title {
            font-size: 12px;
            font-weight: 600;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
            padding: 0 20px;
          }

          .nav-items {
            list-style: none;
          }

          .nav-item {
            margin-bottom: 4px;
          }

          .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 12px 20px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            color: #4a5568;
            transition: all 0.2s ease;
            text-align: left;
            border-radius: 0;
          }

          .nav-link:hover {
            background: #f7fafc;
            color: #2d3748;
          }

          .nav-link.active {
            background: #ebf8ff;
            color: #3182ce;
            border-right: 3px solid #3182ce;
            font-weight: 600;
          }

          .nav-link.external {
            position: relative;
          }

          .nav-icon {
            font-size: 16px;
            width: 20px;
            display: flex;
            justify-content: center;
          }

          .nav-label {
            flex: 1;
          }

          .external-icon {
            font-size: 12px;
            opacity: 0.6;
          }

          .sidebar-footer {
            border-top: 1px solid #e2e8f0;
            padding: 20px;
            background: #f8fafc;
          }

          .user-info-card {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            padding: 12px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
          }

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #667eea;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
          }

          .user-details {
            flex: 1;
          }

          .user-role-name {
            font-weight: 600;
            font-size: 14px;
            color: #2d3748;
            margin-bottom: 2px;
          }

          .user-permissions {
            font-size: 12px;
            color: #718096;
          }

          .quick-actions {
            display: flex;
            gap: 8px;
          }

          .quick-action-btn {
            flex: 1;
            padding: 8px 12px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            cursor: pointer;
            font-size: 11px;
            color: #4a5568;
            transition: all 0.2s ease;
          }

          .quick-action-btn:hover {
            background: #f7fafc;
            border-color: #cbd5e0;
          }

          @media (max-width: 768px) {
            .sidebar-overlay {
              display: block;
            }

            .sidebar {
              left: -100%;
            }

            .sidebar.open {
              left: 0;
            }
          }

          @media (min-width: 769px) {
            .sidebar {
              position: static;
              left: 0;
              height: calc(100vh - 64px);
              box-shadow: none;
            }

            .sidebar-header {
              display: none;
            }

            .sidebar-overlay {
              display: none;
            }
          }

          @media (min-width: 1200px) {
            .sidebar {
              width: 300px;
            }
          }
        `}</style>
      </aside>
    </>
  );
};

export default Sidebar;
