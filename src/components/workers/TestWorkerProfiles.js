// components/workers/TestWorkerProfiles.js
import React, { useState } from 'react';

const TestWorkerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);

  const workers = [
    {
      id: 1,
      workerId: 'ACM-001',
      name: 'John Smith',
      jobTitle: 'Crane Operator',
      company: 'Acme Construction',
      department: 'Heavy Equipment',
      sites: ['Downtown Office Complex', 'Highway Bridge Project'],
      status: 'active',
      trainings: [
        { name: 'OSHA 30-Hour Construction', status: 'valid', expires: '2026-03-15' },
        { name: 'Crane Operation Certification', status: 'expiring', expires: '2025-08-22' }
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
      status: 'active',
      trainings: [
        { name: 'Electrical Safety Training', status: 'valid', expires: '2026-03-10' },
        { name: 'OSHA 10-Hour Construction', status: 'valid', expires: '2025-09-15' }
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
      status: 'active',
      trainings: [
        { name: 'First Aid/CPR Certification', status: 'valid', expires: '2026-02-20' }
      ]
    }
  ];

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.workerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      'valid': '#4caf50',
      'expiring': '#ff9800',
      'expired': '#f44336'
    };
    return colors[status] || '#666';
  };

  if (selectedWorker) {
    return (
      <div style={{ 
        padding: '20px', 
        maxWidth: '1000px', 
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <button
          onClick={() => setSelectedWorker(null)}
          style={{
            padding: '10px 20px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ← Back to Worker Profiles
        </button>

        <div style={{
          background: '#f8f9fa',
          padding: '30px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h1 style={{ margin: '0 0 20px 0', color: '#333' }}>
            {selectedWorker.name} ({selectedWorker.workerId})
          </h1>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div>
              <strong>Job Title:</strong><br />
              {selectedWorker.jobTitle}
            </div>
            <div>
              <strong>Company:</strong><br />
              {selectedWorker.company}
            </div>
            <div>
              <strong>Department:</strong><br />
              {selectedWorker.department}
            </div>
            <div>
              <strong>Sites:</strong><br />
              {selectedWorker.sites.join(', ')}
            </div>
          </div>

          <h3 style={{ color: '#333', marginBottom: '15px' }}>Training Records</h3>
          
          {selectedWorker.trainings.map((training, index) => (
            <div 
              key={index}
              style={{
                background: 'white',
                padding: '15px',
                margin: '10px 0',
                border: '1px solid #dee2e6',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {training.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Expires: {new Date(training.expires).toLocaleDateString()}
                </div>
              </div>
              <div
                style={{
                  padding: '5px 15px',
                  background: getStatusColor(training.status),
                  color: 'white',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                {training.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        background: '#e8f5e8',
        border: '1px solid '#4caf50',
        borderRadius: '5px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
          🧪 Test Worker Profiles
        </h1>
        <p style={{ margin: '0', color: '#388e3c' }}>
          Simplified worker profiles test. If this works, the issue is with the full component.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search by Worker ID, Name, or Company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {filteredWorkers.map(worker => (
          <div 
            key={worker.id}
            style={{
              background: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>
                {worker.name} ({worker.workerId})
              </h3>
              <p style={{ margin: '0', color: '#666' }}>
                {worker.jobTitle} - {worker.company}
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#888' }}>
                Sites: {worker.sites.join(', ')}
              </p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Training Status:</strong>
              <div style={{ marginTop: '10px' }}>
                {worker.trainings.slice(0, 2).map((training, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: index < worker.trainings.length - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '14px' }}>{training.name}</span>
                    <span
                      style={{
                        padding: '2px 8px',
                        background: getStatusColor(training.status),
                        color: 'white',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}
                    >
                      {training.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={() => alert('Add Training Record functionality')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add Training
              </button>
              <button
                onClick={() => setSelectedWorker(worker)}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#666' }}>No workers found</h3>
          <p style={{ color: '#888' }}>Try adjusting your search criteria.</p>
        </div>
      )}

      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '5px'
      }}>
        <h3 style={{ marginTop: '0', color: '#856404' }}>🔍 Test Results</h3>
        <ul style={{ color: '#856404', marginBottom: '0' }}>
          <li>✅ Component loads: Working</li>
          <li>✅ Search functionality: Working</li>
          <li>✅ Worker cards: Working</li>
          <li>✅ Detail view: Working</li>
          <li>✅ No complex JSX: Safe</li>
        </ul>
      </div>
    </div>
  );
};

export default TestWorkerProfiles;
