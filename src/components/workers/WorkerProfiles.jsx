// components/workers/WorkerProfiles.jsx
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
      sites: ['Downtown Office Complex', 'Highway Bridge Project'],
      trainingRecords: [
        {
          id: 1,
          name: 'OSHA 30-Hour Construction',
          status: 'valid',
          expirationDate: '2026-03-15'
        },
        {
          id: 2,
          name: 'Crane Operation Certification',
          status: 'expiring',
          expirationDate: '2025-08-22'
        }
      ]
    },
    {
      id: 2,
      workerId: 'PWR-045',
      name: 'Mike Rodriguez',
      jobTitle: 'Electrician',
      company: 'PowerCorp',
      sites: ['Highway Bridge Project'],
      trainingRecords: [
        {
          id: 1,
          name: 'Electrical Safety Training',
          status: 'valid',
          expirationDate: '2026-03-10'
        }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      valid: { backgroundColor: '#c6f6d5', color: '#22543d' },
      expiring: { backgroundColor: '#fed7d7', color: '#c53030' }
    };

    return (
      <span style={{
        ...styles[status],
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {status === 'valid' ? '✓ Valid' : '⚠ Expiring Soon'}
      </span>
    );
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.workerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Worker Training Profiles</h1>
        <p>Search and manage worker training records</p>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search by Worker ID, Name, or Company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            minWidth: '200px'
          }}
        >
          <option value="">All Training Categories</option>
          <option value="Safety Certifications">Safety Certifications</option>
          <option value="Equipment Operation">Equipment Operation</option>
          <option value="Site Onboarding">Site Onboarding</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredWorkers.map(worker => (
          <div key={worker.id} style={{
            backgroundColor: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>
                  {worker.name} ({worker.workerId})
                </h3>
                <p style={{ margin: '0 0 0.25rem 0', color: '#718096' }}>
                  {worker.jobTitle} - {worker.company}
                </p>
                <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                  Sites: {worker.sites.join(', ')}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#22543d', fontWeight: '600' }}>
                  ✓ Cleared for Current Task
                </div>
                <div style={{ fontSize: '12px', color: '#718096' }}>
                  Last Updated: Today 2:15 PM
                </div>
              </div>
            </div>

            <div style={{ 
              borderTop: '1px solid #e2e8f0', 
              paddingTop: '1rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>Required Training Status</h4>
              {worker.trainingRecords.map(record => (
                <div key={record.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  marginBottom: '0.5rem',
                  backgroundColor: 'white'
                }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{record.name}</div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>
                      Expires: {new Date(record.expirationDate).toLocaleDateString()}
                    </div>
                  </div>
                  {getStatusBadge(record.status)}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                Add Training Record
              </button>
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f7fafc',
                color: '#4a5568',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No workers found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default WorkerProfiles;
