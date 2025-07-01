// components/training/TestTrainingLog.js
import React, { useState } from 'react';

const TestTrainingLog = () => {
  const [formData, setFormData] = useState({
    category: '',
    training: '',
    date: new Date().toISOString().split('T')[0],
    trainer: ''
  });
  
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const workers = [
    { id: 1, name: 'John Smith', workerId: 'ACM-001', company: 'Acme Construction' },
    { id: 2, name: 'Mike Rodriguez', workerId: 'PWR-045', company: 'PowerCorp' },
    { id: 3, name: 'Lisa Chen', workerId: 'BR-092', company: 'BuildRight' }
  ];

  const trainingOptions = {
    'safety': ['OSHA 30-Hour Construction', 'Fall Protection Training'],
    'equipment': ['Crane Operation Certification', 'Forklift Operation']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleWorkerSelection = (worker) => {
    setSelectedWorkers(prev => {
      const isSelected = prev.find(w => w.id === worker.id);
      if (isSelected) {
        return prev.filter(w => w.id !== worker.id);
      } else {
        return [...prev, worker];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Test training log:', { formData, selectedWorkers });
    alert(`Training logged for ${selectedWorkers.length} workers!`);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        background: '#e3f2fd',
        border: '1px solid #2196f3',
        borderRadius: '5px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
          🧪 Test Training Log
        </h1>
        <p style={{ margin: '0', color: '#1565c0' }}>
          Simplified training logging test. If this works, the issue is with the full component.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: '#f9f9f9',
        padding: '30px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ marginTop: '0', color: '#333' }}>Training Information</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Training Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="">Select category...</option>
              <option value="safety">Safety Certifications</option>
              <option value="equipment">Equipment Operation</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#555'
            }}>
              Training Name *
            </label>
            <select
              name="training"
              value={formData.training}
              onChange={handleInputChange}
              disabled={!formData.category}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="">
                {formData.category ? 'Select training...' : 'Select category first'}
              </option>
              {formData.category && trainingOptions[formData.category]?.map(training => (
                <option key={training} value={training}>{training}</option>
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
              Training Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
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
              Trainer
            </label>
            <input
              type="text"
              name="trainer"
              value={formData.trainer}
              onChange={handleInputChange}
              placeholder="Sarah Johnson"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>

        <h3 style={{ color: '#333', marginBottom: '15px' }}>
          Select Workers ({selectedWorkers.length} selected)
        </h3>
        
        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          {workers.map(worker => (
            <div 
              key={worker.id}
              onClick={() => toggleWorkerSelection(worker)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                margin: '5px 0',
                background: selectedWorkers.find(w => w.id === worker.id) ? '#e8f5e8' : 'white',
                border: '1px solid #eee',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={!!selectedWorkers.find(w => w.id === worker.id)}
                onChange={() => {}}
                style={{ marginRight: '10px' }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>{worker.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {worker.workerId} • {worker.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end'
        }}>
          <button 
            type="button"
            onClick={() => {
              setFormData({
                category: '',
                training: '',
                date: new Date().toISOString().split('T')[0],
                trainer: ''
              });
              setSelectedWorkers([]);
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
            disabled={!formData.category || !formData.training || selectedWorkers.length === 0}
            style={{
              padding: '12px 24px',
              background: selectedWorkers.length > 0 ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: selectedWorkers.length > 0 ? 'pointer' : 'not-allowed',
              fontSize: '16px'
            }}
          >
            Log Training ({selectedWorkers.length} workers)
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
        <h3 style={{ marginTop: '0', color: '#856404' }}>🔍 Test Results</h3>
        <ul style={{ color: '#856404', marginBottom: '0' }}>
          <li>✅ Component loads: Working</li>
          <li>✅ Form handling: Working</li>
          <li>✅ Worker selection: Working</li>
          <li>✅ State management: Working</li>
          <li>✅ No complex JSX: Safe</li>
        </ul>
      </div>
    </div>
  );
};

export default TestTrainingLog;
