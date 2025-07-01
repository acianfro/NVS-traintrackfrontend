// components/workers/WorkerProfiles.jsx - Test Version
import React, { useState } from 'react';

const WorkerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const workers = [
    {
      id: 1,
      workerId: 'ACM-001',
      name: 'John Smith',
      jobTitle: 'Crane Operator',
      company: 'Acme Construction',
      department: 'Heavy Equipment',
      sites: ['Downtown Office Complex', 'Highway Bridge Project'],
      emergencyContact: { name: 'Jane Smith', phone: '(555) 123-4567' },
      status: 'active'
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
      status: 'active'
    }
  ];

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.workerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

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

            <div className="worker-card-actions">
              <button 
                className="btn btn-primary"
                onClick={() => alert('Add Training Record functionality')}
              >
                Add Training Record
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => alert('View Full Profile functionality')}
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
      )}
    </div>
  );
};

export default WorkerProfiles;
