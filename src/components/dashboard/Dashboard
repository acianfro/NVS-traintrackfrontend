// components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalWorkers: 247,
    complianceRate: 94,
    expiringTraining: 23,
    missingTraining: 8
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'training_logged',
      message: 'Fall Protection training logged for 5 workers',
      timestamp: '2 hours ago',
      user: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'worker_added',
      message: 'New worker profile created: Mike Chen (ACM-048)',
      timestamp: '4 hours ago',
      user: 'Mike Rodriguez'
    },
    {
      id: 3,
      type: 'expiration_alert',
      message: 'OSHA 30-Hour certification expiring for John Smith',
      timestamp: '1 day ago',
      user: 'System'
    }
  ]);

  const [upcomingExpirations, setUpcomingExpirations] = useState([
    {
      id: 1,
      workerName: 'John Smith',
      workerId: 'ACM-001',
      training: 'Crane Operation Certification',
      expirationDate: '2025-08-22',
      daysUntilExpiry: 58,
      status: 'warning'
    },
    {
      id: 2,
      workerName: 'Mike Rodriguez',
      workerId: 'PWR-045',
      training: 'OSHA 10-Hour',
      expirationDate: '2025-09-15',
      daysUntilExpiry: 82,
      status: 'warning'
    }
  ]);

  const [quickActions] = useState([
    {
      title: 'Add New Worker',
      description: 'Create a new worker profile',
      icon: '👤',
      link: '/workers/onboard',
      color: 'blue'
    },
    {
      title: 'Log Training',
      description: 'Record training completion',
      icon: '📝',
      link: '/training/log',
      color: 'green'
    },
    {
      title: 'View Reports',
      description: 'Generate compliance reports',
      icon: '📊',
      link: '/reports',
      color: 'purple'
    },
    {
      title: 'Worker Profiles',
      description: 'Search and manage workers',
      icon: '👥',
      link: '/workers/profiles',
      color: 'orange'
    }
  ]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getStatusColor = (rate) => {
    if (rate >= 95) return 'status-excellent';
    if (rate >= 85) return 'status-good';
    if (rate >= 70) return 'status-warning';
    return 'status-critical';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>{getGreeting()}, {user.name}!</h1>
          <p className="user-role">{user.title} - {user.company}</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">
            📱 Mobile Training Log
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <div className="metric-value">{stats.totalWorkers}</div>
            <div className="metric-label">Total Workers</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <div className={`metric-value ${getStatusColor(stats.complianceRate)}`}>
              {stats.complianceRate}%
            </div>
            <div className="metric-label">Compliance Rate</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <div className="metric-value warning">{stats.expiringTraining}</div>
            <div className="metric-label">Expiring Soon</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">❌</div>
          <div className="metric-content">
            <div className="metric-value critical">{stats.missingTraining}</div>
            <div className="metric-label">Missing Training</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <a key={index} href={action.link} className={`quick-action-card ${action.color}`}>
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'training_logged' && '📝'}
                  {activity.type === 'worker_added' && '👤'}
                  {activity.type === 'expiration_alert' && '⚠️'}
                </div>
                <div className="activity-content">
                  <p className="activity-message">{activity.message}</p>
                  <div className="activity-meta">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-time">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Expirations */}
        <div className="section">
          <h2>Upcoming Expirations</h2>
          <div className="expiration-list">
            {upcomingExpirations.map((item) => (
              <div key={item.id} className="expiration-item">
                <div className="worker-info">
                  <div className="worker-name">{item.workerName}</div>
                  <div className="worker-id">{item.workerId}</div>
                </div>
                <div className="training-info">
                  <div className="training-name">{item.training}</div>
                  <div className="expiration-date">
                    Expires: {new Date(item.expirationDate).toLocaleDateString()}
                  </div>
                </div>
                <div className={`days-remaining ${item.status}`}>
                  {item.daysUntilExpiry} days
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary">View All Expirations</button>
        </div>
      </div>

      {/* Training Summary */}
      <div className="section">
        <h2>Training Completion by Category</h2>
        <div className="training-summary">
          <div className="training-category">
            <div className="category-header">
              <span className="category-name">Safety Certifications</span>
              <span className="category-percentage">89%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '89%' }}></div>
            </div>
          </div>

          <div className="training-category">
            <div className="category-header">
              <span className="category-name">Equipment Operation</span>
              <span className="category-percentage">95%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '95%' }}></div>
            </div>
          </div>

          <div className="training-category">
            <div className="category-header">
              <span className="category-name">Site-Specific Training</span>
              <span className="category-percentage">78%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="training-category">
            <div className="category-header">
              <span className="category-name">First Aid/CPR</span>
              <span className="category-percentage">92%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
