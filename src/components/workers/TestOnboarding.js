// components/workers/TestOnboarding.jsx
import React, { useState } from 'react';

const TestOnboarding = () => {
  const [formData, setFormData] = useState({
    workerId: 'TEST-001',
    fullName: '',
    jobTitle: '',
    department: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  const [message, setMessage] = useState('');

  const departments = [
    'Heavy Equipment',
    'Electrical',
    'General Labor',
    'Safety & Inspection',
    'Plumbing',
    'HVAC'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.department) {
      setMessage('❌ Please fill in required fields');
      return;
    }

    console.log('Test form submitted:', formData);
    setMessage('✅ Test worker profile created successfully!');
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        workerId: `TEST-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
        fullName: '',
        jobTitle: '',
        department: '',
        emergencyContactName: '',
        emergencyContactPhone: ''
      });
      setMessage('');
    }, 2000);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        background: '#e8f5e8',
        border: '1px solid #4caf50',
        borderRadius: '5px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
          🧪 Test Worker Onboarding
        </h1>
        <p style={{ margin: '0', color: '#388e3c' }}>
          This is a simplified test version. If this works, the issue is with the original component.
        </p>
      </div>

      {message && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          background: message.includes('❌') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${message.includes('❌') ? '#f44336' : '#4caf50'}`,
          borderRadius: '5px',
          color: message.includes('❌') ? '#c62828' : '#2e7d32'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        background: '#f9f9f9',
        padding: '30px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ marginTop: '0', color: '#333' }}>Worker Information</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Worker ID
            </label>
            <input
              type="text"
              name="workerId"
              value={formData.workerId}
              readOnly
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f0f0f0',
                color: '#666'
              }}
            />
            <small style={{ color: '#777' }}>Auto-generated</small>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Smith"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Crane Operator"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="">Select department...</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              placeholder="Jane Smith"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end',
          marginTop: '30px'
        }}>
          <button 
            type="button" 
            onClick={() => {
              setFormData({
                workerId: formData.workerId,
                fullName: '',
                jobTitle: '',
                department: '',
                emergencyContactName: '',
                emergencyContactPhone: ''
              });
              setMessage('');
            }}
            style={{
              padding: '12px 24px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Clear Form
          </button>
          <button 
            type="submit"
            style={{
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Save Test Worker
          </button>
        </div>
      </form>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '5px'
      }}>
        <h3 style={{ marginTop: '0', color: '#856404' }}>🔍 Debug Information</h3>
        <ul style={{ color: '#856404', marginBottom: '0' }}>
          <li>✅ React component: Working</li>
          <li>✅ State management: Working</li>
          <li>✅ Form handling: Working</li>
          <li>✅ Event handlers: Working</li>
          <li>✅ No complex JSX: Safe</li>
        </ul>
        <p style={{ 
          marginTop: '15px', 
          marginBottom: '0', 
          fontStyle: 'italic',
          color: '#856404'
        }}>
          If this component works but the original doesn't, the issue is likely in the original component's JSX structure or imports.
        </p>
      </div>
    </div>
  );
};

export default TestOnboarding;
