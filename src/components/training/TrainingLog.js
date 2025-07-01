// components/training/TrainingLog.jsx
import React, { useState } from 'react';

const TrainingLog = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    training: '',
    date: new Date().toISOString().split('T')[0],
    trainer: '',
    thirdPartyFacilitator: '',
    location: '',
    notes: ''
  });

  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [workers] = useState([
    {
      id: 1,
      name: 'John Smith',
      workerId: 'ACM-001',
      jobTitle: 'Crane Operator',
      company: 'Acme Construction',
      department: 'Heavy Equipment'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      workerId: 'PWR-045',
      jobTitle: 'Electrician',
      company: 'PowerCorp',
      department: 'Electrical'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      workerId: 'BR-092',
      jobTitle: 'Safety Inspector',
      company: 'BuildRight',
      department: 'Safety'
    },
    {
      id: 4,
      name: 'Dave Thompson',
      workerId: 'ACM-023',
      jobTitle: 'Foreman',
      company: 'Acme Construction',
      department: 'Heavy Equipment'
    },
    {
      id: 5,
      name: 'Jennifer Adams',
      workerId: 'SG-001',
      jobTitle: 'Safety Consultant',
      company: 'SafeGuard Industries',
      department: 'Safety'
    }
  ]);

  const [trainingOptions] = useState({
    'safety': [
      'OSHA 30-Hour Construction',
      'Fall Protection Refresher',
      'Hazard Communication',
      'Emergency Response Procedures'
    ],
    'equipment': [
      'Crane Operation Certification',
      'Forklift Operation',
      'Equipment Safety Check',
      'Heavy Machinery Training'
    ],
    'onboarding': [
      'Site Safety Orientation',
      'Project-Specific Training',
      'Company Policies Overview'
    ],
    'first-aid': [
      'First Aid/CPR Certification',
      'Emergency Medical Response',
      'AED Training'
    ],
    'compliance': [
      'Environmental Safety',
      'Regulatory Compliance',
      'Quality Standards Training'
    ]
  });

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

  const selectByDepartment = (department) => {
    const departmentWorkers = workers.filter(w => w.department === department);
    departmentWorkers.forEach(worker => {
      if (!selectedWorkers.find(w => w.id === worker.id)) {
        toggleWorkerSelection(worker);
      }
    });
  };

  const selectByContractor = (company) => {
    const contractorWorkers = workers.filter(w => w.company === company);
    contractorWorkers.forEach(worker => {
      if (!selectedWorkers.find(w => w.id === worker.id)) {
        toggleWorkerSelection(worker);
      }
    });
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.category || !formData.training || !formData.date) {
          alert('Please fill in all required fields');
          return false;
        }
        return true;
      case 2:
        if (selectedWorkers.length === 0) {
          alert('Please select at least one worker');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const submitTraining = () => {
    console.log('Submitting training:', {
      ...formData,
      workers: selectedWorkers,
      documents: uploadedFiles
    });
    setShowSuccess(true);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      category: '',
      training: '',
      date: new Date().toISOString().split('T')[0],
      trainer: '',
      thirdPartyFacilitator: '',
      location: '',
      notes: ''
    });
    setSelectedWorkers([]);
    setUploadedFiles([]);
    setShowSuccess(false);
  };

  // Render success screen
  if (showSuccess) {
    return (
      <div className="training-log">
        <div className="success-screen">
          <div className="success-animation">
            <div className="success-icon">✅</div>
            <h1 className="success-title">Training Successfully Logged!</h1>
            <p className="success-subtitle">
              {formData.training} training has been recorded for {selectedWorkers.length} workers.
              All worker profiles have been updated with the new certification.
            </p>

            <div className="summary-card">
              <h3>Quick Summary</h3>
              <div className="summary-row">
                <span>Training ID</span>
                <span>#TRN-2025-{new Date().getMonth() + 1}{new Date().getDate()}-001</span>
              </div>
              <div className="summary-row">
                <span>Workers Updated</span>
                <span>{selectedWorkers.length} profiles</span>
              </div>
              <div className="summary-row">
                <span>Next Expiration</span>
                <span>June 30, 2026</span>
              </div>
            </div>

            <div className="success-actions">
              <button className="btn btn-secondary" onClick={() => alert('Viewing updated profiles...')}>
                View Updated Profiles
              </button>
              <button className="btn btn-secondary" onClick={() => alert('Generating certificates...')}>
                Generate Certificates
              </button>
              <button className="btn btn-primary" onClick={resetForm}>
                Log Another Training
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render main training log interface
  return (
    <div className="training-log">
      <div className="page-header">
        <h1>Log Training</h1>
        <p className="page-subtitle">Record training completion for individual workers or groups</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
        <div className="step-indicators">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className={`step ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
              {step < currentStep ? '✓' : step}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Training Details */}
      {currentStep === 1 && (
        <div className="step-content">
          <h2>Training Information</h2>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="category">Training Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select category...</option>
                <option value="safety">Safety Certifications</option>
                <option value="equipment">Equipment Operation</option>
                <option value="onboarding">Site Onboarding</option>
                <option value="first-aid">First Aid/CPR Training</option>
                <option value="compliance">Compliance Training</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="training">Training Name *</label>
              <select
                id="training"
                name="training"
                value={formData.training}
                onChange={handleInputChange}
                disabled={!formData.category}
                className="form-select"
              >
                <option value="">
                  {formData.category ? 'Select training...' : 'Select category first'}
                </option>
                {formData.category && trainingOptions[formData.category]?.map(training => (
                  <option key={training} value={training}>{training}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Training Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="trainer">Trainer/Instructor</label>
              <input
                type="text"
                id="trainer"
                name="trainer"
                value={formData.trainer}
                onChange={handleInputChange}
                placeholder="Sarah Johnson"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="thirdPartyFacilitator">Third Party Facilitator</label>
              <input
                type="text"
                id="thirdPartyFacilitator"
                name="thirdPartyFacilitator"
                value={formData.thirdPartyFacilitator}
                onChange={handleInputChange}
                placeholder="OSHA Training Institute"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select location...</option>
                <option value="Site Trailer A">Site Trailer A</option>
                <option value="Conference Room B">Conference Room B</option>
                <option value="Main Office Building">Main Office Building</option>
                <option value="Field Training Area">Field Training Area</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Duration & Expiration</label>
            <div className="auto-populated">
              {formData.training ? (
                <p>Duration and expiration will be auto-populated from Training Library</p>
              ) : (
                <p>Select training to see duration and expiration details</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Worker Selection */}
      {currentStep === 2 && (
        <div className="step-content">
          <h2>Select Workers ({selectedWorkers.length} selected)</h2>

          <div className="quick-actions">
            <button
              className="quick-action-btn"
              onClick={() => selectByDepartment('Heavy Equipment')}
            >
              👥 Heavy Equipment (2)
            </button>
            <button
              className="quick-action-btn"
              onClick={() => selectByContractor('Acme Construction')}
            >
              🏢 Acme Construction (2)
            </button>
            <button
              className="quick-action-btn"
              onClick={() => selectByDepartment('Safety')}
            >
              🦺 Safety Department (2)
            </button>
          </div>

          <div className="worker-selection">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search workers by name or ID..."
                className="search-input"
              />
            </div>

            <div className="workers-list">
              {workers.map(worker => (
                <div
                  key={worker.id}
                  className={`worker-item ${selectedWorkers.find(w => w.id === worker.id) ? 'selected' : ''}`}
                  onClick={() => toggleWorkerSelection(worker)}
                >
                  <input
                    type="checkbox"
                    checked={!!selectedWorkers.find(w => w.id === worker.id)}
                    onChange={() => {}}
                    className="worker-checkbox"
                  />
                  <div className="worker-info">
                    <div className="worker-name">{worker.name}</div>
                    <div className="worker-details">
                      {worker.workerId} • {worker.jobTitle} • {worker.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Documents */}
      {currentStep === 3 && (
        <div className="step-content">
          <h2>Upload Documents (Optional)</h2>

          <div className="upload-section">
            <div className="upload-area">
              <div className="upload-placeholder">
                📄
                <p>Drag & drop or click to upload</p>
                <small>Sign-in sheets, certificates, training materials</small>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any additional notes about this training session..."
                className="form-textarea"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="step-content">
          <h2>Review Training Details</h2>

          <div className="review-sections">
            <div className="review-section">
              <h3>Training Summary</h3>
              <div className="review-grid">
                <div className="review-item">
                  <span className="label">Training:</span>
                  <span className="value">{formData.training}</span>
                </div>
                <div className="review-item">
                  <span className="label">Category:</span>
                  <span className="value">{formData.category}</span>
                </div>
                <div className="review-item">
                  <span className="label">Date:</span>
                  <span className="value">{new Date(formData.date).toLocaleDateString()}</span>
                </div>
                <div className="review-item">
                  <span className="label">Trainer:</span>
                  <span className="value">{formData.trainer || 'Not specified'}</span>
                </div>
                <div className="review-item">
                  <span className="label">Location:</span>
                  <span className="value">{formData.location || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="review-section">
              <h3>Selected Workers ({selectedWorkers.length})</h3>
              <div className="selected-workers-list">
                {selectedWorkers.map(worker => (
                  <div key={worker.id} className="selected-worker">
                    <span className="worker-name">{worker.name}</span>
                    <span className="worker-details">{worker.workerId} • {worker.company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="step-navigation">
        {currentStep > 1 && (
          <button onClick={prevStep} className="btn btn-secondary">
            ← Back
          </button>
        )}

        <div className="nav-spacer"></div>

        {currentStep < 4 ? (
          <button onClick={nextStep} className="btn btn-primary">
            Next →
          </button>
        ) : (
          <button onClick={submitTraining} className="btn btn-primary">
            Log Training
          </button>
        )}
      </div>
    </div>
  );
};

export default TrainingLog;
