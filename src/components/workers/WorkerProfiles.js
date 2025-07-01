// components/workers/WorkerProfiles.js
import React, { useState } from 'react';

const WorkerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showWorkerDetail, setShowWorkerDetail] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const [workers] = useState([
    {
      id: 1,
      workerId: 'ACM-001',
      name: 'John Smith',
      jobTitle: 'Crane Operator',
      company: 'Acme Construction',
      department: 'Heavy Equipment',
      sites: ['Downtown Office Complex', 'Highway Bridge Project'],
      emergencyContact: { name: 'Jane Smith', phone: '(555) 123-4567' },
      status: 'active',
      trainingRecords: [
        {
          id: 1,
          name: 'OSHA 30-Hour Construction',
          category: 'Safety Certifications',
          completionDate: '2024-01-15',
          expirationDate: '2026-03-15',
          status: 'valid',
          trainer: 'Sarah Johnson',
          certificateNumber: 'OSHA-001-2024'
        },
        {
          id: 2,
          name: 'Crane Operation Certification',
          category: 'Equipment Operation',
          completionDate: '2023-08-22',
          expirationDate: '2025-08-22',
          status: 'expiring',
          trainer: 'Mike Wilson',
          certificateNumber: 'CRANE-045-2023'
        },
        {
          id: 3,
          name: 'Site Safety Orientation',
          category: 'Site Onboarding',
          completionDate: '2025-06-20',
          expirationDate: null,
          status: 'current',
          trainer: 'Sarah Johnson'
        }
      ]
    },
    {
      id: 2,
      workerId: 'PWR-045',
      name: 'Mike Rodriguez',
      jobTitle: 'Electrician',
      company: 'PowerCorp',
      department: 'Electrical',
      sites: ['Highway Bridge Project', 'Manufacturing Plant'],
      emergencyContact: { name: 'Maria Rodriguez', phone: '(555) 987-6543' },
      status: 'active',
      trainingRecords: [
        {
          id: 1,
          name: 'Electrical Safety Training',
          category: 'Safety Certifications',
          completionDate: '2024-03-10',
          expirationDate: '2026-03-10',
          status: 'valid',
          trainer: 'Lisa Chen'
        },
        {
          id: 2,
          name: 'OSHA 10-Hour Construction',
          category: 'Safety Certifications',
          completionDate: '2024-01-05',
          expirationDate: '2025-09-15',
          status: 'valid',
          trainer: 'Sarah Johnson'
        }
      ]
    },
    {
      id: 3,
      workerId: 'BR-092',
      name: 'Lisa Chen',
      jobTitle: 'Safety Inspector',
      company: 'BuildRight',
      department: 'Safety & Inspection',
      sites: ['Downtown Office Complex'],
      emergencyContact: { name: 'David Chen', phone: '(555) 456-7890' },
      status: 'active',
      trainingRecords: [
        {
          id: 1,
          name: 'First Aid/CPR Certification',
          category: 'First Aid/CPR Training',
          completionDate: '2024-02-20',
          expirationDate: '2026-02-20',
          status: 'valid',
          trainer: 'Emergency Training Institute'
        }
      ]
    }
  ]);

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.workerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
                           worker.trainingRecords.some(record => 
                             record.category === selectedCategory
                           );
    
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const badges = {
      'valid': { text: '✓ Valid', className: 'status-valid' },
      'expiring': { text: '⚠ Expiring Soon', className: 'status-expiring' },
      'current': { text: '✓ Current', className: 'status-current' },
      'expired': { text: '✗ Expired', className: 'status-expired' }
    };
    
    return badges[status] || { text: status, className: 'status-unknown' };
  };

  const showWorkerDetails = (worker) => {
    setSelectedWorker(worker);
    setShowWorkerDetail(true);
  };

  const handleBackToProfiles = () => {
    setShowWorkerDetail(false);
    setSelectedWorker(null);
  };

  // Render detail view
  if (showWorkerDetail && selectedWorker) {
    return (
      <div className="worker-profiles">
        <div className="detail-view">
          <button 
            className="back-button" 
            onClick={handleBackToProfiles}
          >
            ← Back to Worker Profiles
          </button>
          
          <div className="profile-header">
            <div className="profile-info">
              <h2>{selectedWorker.name} ({selectedWorker.workerId})</h2>
              <div className="profile-meta">
                <span>{selectedWorker.jobTitle} - {selectedWorker.company}</span>
                <span>Sites: {selectedWorker.sites.join(', ')}</span>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn btn-primary">Edit Profile</button>
              <button className="btn btn-secondary">Print Profile</button>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-label">Worker ID</div>
              <div className="info-value">{selectedWorker.workerId}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Job Title</div>
              <div className="info-value">{selectedWorker.jobTitle}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Department</div>
              <div className="info-value">{selectedWorker.department}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Company</div>
              <div className="info-value">{selectedWorker.company}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Emergency Contact</div>
              <div className="info-value">
                {selectedWorker.emergencyContact.name}<br/>
                {selectedWorker.emergencyContact.phone}
              </div>
            </div>
            <div className="info-card">
              <div className="info-label">Status</div>
              <div className="info-value">
                <span className="status-badge status-valid">Active</span>
              </div>
            </div>
          </div>

          <div className="training-history-section">
            <div className="section-header">
              <h3>Complete Training History</h3>
              <div className="section-actions">
                <select className="filter-select">
                  <option>All Categories</option>
                  <option>Safety Certifications</option>
                  <option>Equipment Operation</option>
                  <option>Site Onboarding</option>
                </select>
                <button className="btn btn-secondary btn-sm">Export History</button>
              </div>
            </div>

            <div className="training-table">
              <div className="table-header">
                <div>Training Name</div>
                <div>Completion Date</div>
                <div>Expiration Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              
              {selectedWorker.trainingRecords.map(record => {
                const badge = getStatusBadge(record.status);
                return (
                  <div key={record.id} className="table-row">
                    <div>
                      <div className="training-name">{record.name}</div>
                      <div className="training-category">{record.category}</div>
                    </div>
                    <div>{new Date(record.completionDate).toLocaleDateString()}</div>
                    <div>
                      {record.expirationDate 
                        ? new Date(record.expirationDate).toLocaleDateString()
                        : 'No Expiration'
                      }
                    </div>
                    <div>
                      <span className={`status-badge ${badge.className}`}>
                        {badge.text}
                      </span>
                    </div>
                    <div>
                      <button className="btn btn-secondary btn-sm">
                        View Certificate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render main profiles view
  return (
    <div className="worker-profiles">
      <div className="page-header">
        <h1>Worker Training Profiles</h1>
        <p className="page-subtitle">Search and manage worker training records</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Worker ID, Name, or Company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Training Categories</option>
          <option value="Safety Certifications">Safety Certifications</option>
          <option value="Equipment Operation">Equipment Operation</option>
          <option value="Site Onboarding">Site Onboarding</option>
          <option value="First Aid/CPR Training">First Aid/CPR Training</option>
          <option value="Compliance Training">Compliance Training</option>
        </select>
      </div>

      <div className="workers-grid">
        {filteredWorkers.map(worker => (
          <div key={worker.id} className="worker-profile-card">
            <div className="worker-card-header">
              <div className="worker-info">
                <h3>{worker.name} ({worker.workerId})</h3>
                <p>{worker.jobTitle} - {worker.company}</p>
                <p className="worker-sites">Sites: {worker.sites.join(', ')}</p>
              </div>
              <div className="worker-status">
                <div className="clearance-status">✓ Cleared for Current Task</div>
                <div className="last-updated">Last Updated: Today 2:15 PM</div>
              </div>
            </div>

            <div className="worker-training-summary">
              <h4>Required Training Status</h4>
              {worker.trainingRecords.slice(0, 3).map(record => {
                const badge = getStatusBadge(record.status);
                return (
                  <div key={record.id} className="training-summary-item">
                    <div className="training-info">
                      <div className="training-name">{record.name}</div>
                      <div className="training-details">
                        Completed: {new Date(record.completionDate).toLocaleDateString()}
                        {record.expirationDate && (
                          <span> | Expires: {new Date(record.expirationDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <span className={`status-badge ${badge.className}`}>
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="worker-card-actions">
              <button 
                className="btn btn-primary"
                onClick={() => alert('Add Training Record functionality')}
              >
                Add Training Record
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => showWorkerDetails(worker)}
              >
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="no-results">
          <h3>No workers found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      </div>
    )}
    </div>
  );
};

export default WorkerProfiles;
