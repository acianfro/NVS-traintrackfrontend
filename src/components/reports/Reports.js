// components/reports/Reports.js
import React, { useState } from 'react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('individual');

  const [reportData] = useState({
    totalWorkers: 247,
    complianceRate: 94,
    expiringTraining: 23,
    missingTraining: 8,
    trainingGaps: [
      { contractor: 'Acme Construction', gaps: 5, status: 'critical' },
      { contractor: 'PowerCorp', gaps: 2, status: 'warning' },
      { contractor: 'BuildRight', gaps: 0, status: 'good' },
      { contractor: 'SafeGuard Industries', gaps: 1, status: 'warning' }
    ],
    upcomingExpirations: [
      {
        workerName: 'John Smith',
        workerId: 'ACM-001',
        training: 'Crane Operation Certification',
        expirationDate: '2025-08-22',
        daysUntilExpiry: 58
      },
      {
        workerName: 'Mike Rodriguez',
        workerId: 'PWR-045',
        training: 'OSHA 10-Hour',
        expirationDate: '2025-09-15',
        daysUntilExpiry: 82
      }
    ],
    trainingCompletion: [
      { category: 'Safety Certifications', percentage: 89, color: '#3182ce' },
      { category: 'Equipment Operation', percentage: 95, color: '#38a169' },
      { category: 'Site-Specific Training', percentage: 78, color: '#d69e2e' },
      { category: 'First Aid/CPR', percentage: 92, color: '#805ad5' }
    ]
  });

  const reportTypes = [
    {
      id: 'individual',
      icon: '📋',
      title: 'Individual Worker Report',
      description: 'Complete training profile for a single worker'
    },
    {
      id: 'department',
      icon: '👥',
      title: 'Department Summary',
      description: 'Training compliance by department'
    },
    {
      id: 'contractor',
      icon: '🏢',
      title: 'Contractor Report',
      description: 'All workers for a specific contractor'
    },
    {
      id: 'expiration',
      icon: '⚠️',
      title: 'Expiration Alert Report',
      description: 'Upcoming training expirations'
    },
    {
      id: 'compliance',
      icon: '✅',
      title: 'Compliance Overview',
      description: 'Organization-wide compliance status'
    },
    {
      id: 'audit',
      icon: '🔍',
      title: 'Audit Trail Report',
      description: 'Detailed training history and changes'
    }
  ];

  if (showReportGenerator) {
    return (
      <div className="reports">
        <div className="page-header">
          <button 
            className="back-button"
            onClick={() => setShowReportGenerator(false)}
          >
            ← Back to Reports Dashboard
          </button>
          <h1>Generate Training Report</h1>
          <p className="page-subtitle">Create custom reports for audits and compliance</p>
        </div>

        <div className="report-generator">
          <div className="report-type-selection">
            <h2>Select Report Type</h2>
            <div className="report-options">
              {reportTypes.map(type => (
                <div 
                  key={type.id}
                  className={`report-card ${selectedReportType === type.id ? 'selected' : ''}`}
                  onClick={() => setSelectedReportType(type.id)}
                >
                  <div className="report-icon">{type.icon}</div>
                  <h4>{type.title}</h4>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="report-configuration">
            <div className="config-section">
              <h3>Report Configuration</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Report Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value="Training Compliance Report"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date Range</label>
                  <div className="date-range">
                    <input type="date" className="form-input" value="2024-01-01" />
                    <span>to</span>
                    <input type="date" className="form-input" value="2025-06-30" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Training Categories</label>
                  <div className="checkbox-group">
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      Safety Certifications
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      Equipment Operation
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      Site Onboarding
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      First Aid/CPR Training
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Include</label>
                  <div className="checkbox-group">
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      Current Certifications
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      Training History
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      Expired Certifications
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      Expiration Alerts
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Report Format</label>
                  <select className="form-select">
                    <option>PDF Document</option>
                    <option>Excel Spreadsheet</option>
                    <option>CSV Export</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Method</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input type="radio" name="delivery" defaultChecked />
                      Download Now
                    </label>
                    <label className="radio-item">
                      <input type="radio" name="delivery" />
                      Email Report
                    </label>
                    <label className="radio-item">
                      <input type="radio" name="delivery" />
                      Schedule Recurring
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-preview">
              <h3>Report Preview</h3>
              <div className="preview-content">
                <p>Individual training report including current certifications and training history</p>
                <div className="preview-actions">
                  <button className="btn btn-secondary">Preview Report</button>
                  <button className="btn btn-primary">Generate Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reports">
      <div className="page-header">
        <h1>Reports and Analytics</h1>
        <p className="page-subtitle">Training compliance reports and insights</p>
      </div>

      <div className="reports-nav">
        <div className="nav-tabs">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`tab-button ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setShowReportGenerator(true)}
          >
            📄 Generate Reports
          </button>
          <button 
            className={`tab-button ${activeTab === 'scheduled' ? 'active' : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            📅 Scheduled Reports
          </button>
        </div>

        <div className="nav-actions">
          <button className="btn btn-secondary">Export Dashboard</button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowReportGenerator(true)}
          >
            Generate Custom Report
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="reports-dashboard">
          <div className="filter-bar">
            <select className="filter-select">
              <option>All Contractors</option>
              <option>Acme Construction</option>
              <option>PowerCorp</option>
              <option>BuildRight</option>
            </select>
            <select className="filter-select">
              <option>All Locations</option>
              <option>Downtown Office Complex</option>
              <option>Highway Bridge Project</option>
            </select>
            <select className="filter-select">
              <option>All Training Categories</option>
              <option>Safety Certifications</option>
              <option>Equipment Operation</option>
            </select>
            <input type="date" className="filter-select" value="2025-06-30" />
            <button className="btn btn-primary">Apply Filters</button>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">👥</div>
              <div className="metric-content">
                <div className="metric-value">{reportData.totalWorkers}</div>
                <div className="metric-label">Total Workers</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">✅</div>
              <div className="metric-content">
                <div className="metric-value status-good">{reportData.complianceRate}%</div>
                <div className="metric-label">Compliance Rate</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">⚠️</div>
              <div className="metric-content">
                <div className="metric-value warning">{reportData.expiringTraining}</div>
                <div className="metric-label">Expiring Soon</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">❌</div>
              <div className="metric-content">
                <div className="metric-value critical">{reportData.missingTraining}</div>
                <div className="metric-label">Missing Training</div>
              </div>
            </div>
          </div>

          <div className="reports-grid">
            <div className="report-section">
              <h3>Training Gaps by Contractor</h3>
              <div className="gaps-list">
                {reportData.trainingGaps.map((gap, index) => (
                  <div key={index} className="gap-item">
                    <span className="contractor-name">{gap.contractor}</span>
                    <span className={`gap-count ${gap.status}`}>
                      {gap.gaps} gaps
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="report-section">
              <h3>Upcoming Expirations</h3>
              <div className="expirations-list">
                {reportData.upcomingExpirations.map((expiration, index) => (
                  <div key={index} className="expiration-item">
                    <div className="expiration-info">
                      <div className="worker-name">{expiration.workerName} - {expiration.training}</div>
                      <div className="expiration-date">
                        Expires: {new Date(expiration.expirationDate).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="days-remaining warning">
                      {expiration.daysUntilExpiry} days
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="report-section full-width">
              <h3>Training Completion by Category</h3>
              <div className="training-completion">
                {reportData.trainingCompletion.map((category, index) => (
                  <div key={index} className="completion-item">
                    <div className="completion-header">
                      <span className="category-name">{category.category}</span>
                      <span className="category-percentage">{category.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${category.percentage}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className="scheduled-reports">
          <div className="section-header">
            <h3>Scheduled Reports</h3>
            <button className="btn btn-primary">Schedule New Report</button>
          </div>

          <div className="scheduled-list">
            <div className="scheduled-item">
              <div className="schedule-info">
                <h4>Weekly Compliance Report</h4>
                <p>Every Monday at 9:00 AM</p>
                <p>Recipients: sarah@traintrack.com, manager@company.com</p>
              </div>
              <div className="schedule-actions">
                <button className="btn btn-secondary btn-sm">Edit</button>
                <button className="btn btn-secondary btn-sm">Pause</button>
              </div>
            </div>

            <div className="scheduled-item">
              <div className="schedule-info">
                <h4>Monthly Expiration Alert</h4>
                <p>First day of each month at 8:00 AM</p>
                <p>Recipients: safety-team@company.com</p>
              </div>
              <div className="schedule-actions">
                <button className="btn btn-secondary btn-sm">Edit</button>
                <button className="btn btn-secondary btn-sm">Pause</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
