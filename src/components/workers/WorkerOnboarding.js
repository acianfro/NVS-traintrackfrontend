// components/workers/WorkerOnboarding.jsx
import React, { useState } from 'react';

const WorkerOnboarding = () => {
  const [formData, setFormData] = useState({
    workerId: 'ACM-0048', // Auto-generated
    fullName: '',
    jobTitle: '',
    department: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    siteAssignments: []
  });

  const [trainingRecords, setTrainingRecords] = useState([]);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [newTraining, setNewTraining] = useState({
    category: '',
    training: '',
    completionDate: new Date().toISOString().split('T')[0],
    trainer: '',
    thirdPartyFacilitator: '',
    location: '',
    certificateNumber: '',
    documents: []
  });

  const [availableSites] = useState([
    'Downtown Office Complex',
    'Highway Bridge Project',
    'Manufacturing Plant',
    'Retail Complex',
    'Airport Terminal'
  ]);

  const [departments] = useState([
    'Heavy Equipment',
    'Electrical',
    'General Labor',
    'Safety & Inspection',
    'Plumbing',
    'HVAC'
  ]);

  const [trainingCategories] = useState({
    'safety': [
      'OSHA 30-Hour Construction',
      'Fall Protection Training',
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

  const handleSiteAssignment = (site) => {
    setFormData(prev => ({
      ...prev,
      siteAssignments: prev.siteAssignments.includes(site)
        ? prev.siteAssignments.filter(s => s !== site)
        : [...prev.siteAssignments, site]
    }));
  };

  const handleTrainingInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTrainingRecord = () => {
    if (newTraining.category && newTraining.training && newTraining.completionDate) {
      const trainingData = trainingCategories[newTraining.category]?.find(t => t === newTraining.training);
      
      const record = {
        id: Date.now(),
        ...newTraining,
        trainingName: newTraining.training,
        expirationDate: calculateExpirationDate(newTraining.training, newTraining.completionDate),
        status: 'valid'
      };

      setTrainingRecords([...trainingRecords, record]);
      setNewTraining({
        category: '',
        training: '',
        completionDate: new Date().toISOString().split('T')[0],
        trainer: '',
        thirdPartyFacilitator: '',
        location: '',
        certificateNumber: '',
        documents: []
      });
      setShowAddTraining(false);
    }
  };

  const calculateExpirationDate = (trainingType, completionDate) => {
    const completion = new Date(completionDate);
    
    // Training-specific expiration logic
    const expirationMonths = {
      'OSHA 30-Hour Construction': 36,
      'Crane Operation Certification': 24,
      'First Aid/CPR Certification': 24,
      'Fall Protection Training': 12,
      'Site Safety Orientation': null, // No expiration
      'Monthly Safety Meeting': 1
    };

    const months = expirationMonths[trainingType] || 12;
    if (months === null) return null;

    completion.setMonth(completion.getMonth() + months);
    return completion.toISOString().split('T')[0];
  };

  const removeTrainingRecord = (id) => {
    setTrainingRecords(trainingRecords.filter(record => record.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.department) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate saving worker
    console.log('Saving worker:', { ...formData, trainingRecords });
    alert('Worker profile created successfully!');
    
    // Reset form
    setFormData({
      workerId: `ACM-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      fullName: '',
      jobTitle: '',
      department: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      siteAssignments: []
    });
    setTrainingRecords([]);
  };

  return (
    <div className="worker-onboarding">
      <div className="page-header">
        <h1>Add New Worker Profile</h1>
        <p className="page-subtitle">Create a new worker profile with training records</p>
      </div>

      <form onSubmit={handleSubmit} className="onboarding-form">
        <div className="form-section">
          <h2>Worker Information</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="workerId">Worker ID</label>
              <input
                type="text"
                id="workerId"
                name="workerId"
                value={formData.workerId}
                readOnly
                className="form-input readonly"
              />
              <small className="form-help">Auto-generated</small>
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Smith"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Crane Operator"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select department...</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContactName">Emergency Contact Name</label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                placeholder="Jane Smith"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
              <input
                type="tel"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Site Assignment(s)</label>
            <div className="site-assignments">
              <div className="selected-sites">
                {formData.siteAssignments.map(site => (
                  <span key={site} className="site-tag">
                    {site}
                    <button
                      type="button"
                      onClick={() => handleSiteAssignment(site)}
                      className="remove-site"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleSiteAssignment(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="form-select"
              >
                <option value="">+ Add site assignment</option>
                {availableSites
                  .filter(site => !formData.siteAssignments.includes(site))
                  .map(site => (
                    <option key={site} value={site}>{site}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Training Records Section - MOVED INSIDE THE FORM */}
        <div className="form-section">
          <div className="section-header">
            <h2>Training Records and Current Certifications</h2>
            <button
              type="button"
              onClick={() => setShowAddTraining(true)}
              className="btn btn-primary"
            >
              + Add Training
            </button>
          </div>

          <div className="training-records">
            {trainingRecords.length === 0 ? (
              <div className="no-training">
                <p>No training records added yet.</p>
                <p>Click "Add Training" to record completed certifications.</p>
              </div>
            ) : (
              trainingRecords.map(record => (
                <div key={record.id} className="training-record-card">
                  <div className="training-info">
                    <h4>{record.trainingName}</h4>
                    <div className="training-details">
                      <span>Completed: {new Date(record.completionDate).toLocaleDateString()}</span>
                      {record.expirationDate && (
                        <span>Expires: {new Date(record.expirationDate).toLocaleDateString()}</span>
                      )}
                      {record.trainer && <span>Trainer: {record.trainer}</span>}
                      {record.location && <span>Location: {record.location}</span>}
                    </div>
                  </div>
                  <div className="training-status">
                    <span className={`status-badge ${record.status}`}>
                      {record.status === 'valid' ? '✓ Valid' : record.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTrainingRecord(record.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Training Modal */}
        {showAddTraining && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Add Training Record</h3>
                <button
                  type="button"
                  onClick={() => setShowAddTraining(false)}
                  className="close-button"
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="trainingCategory">Training Category</label>
                    <select
                      id="trainingCategory"
                      name="category"
                      value={newTraining.category}
                      onChange={handleTrainingInputChange}
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
                    <label htmlFor="training">Training *</label>
                    <select
                      id="training"
                      name="training"
                      value={newTraining.training}
                      onChange={handleTrainingInputChange}
                      disabled={!newTraining.category}
                      className="form-select"
                    >
                      <option value="">
                        {newTraining.category ? 'Select training...' : 'Select category first'}
                      </option>
                      {newTraining.category && trainingCategories[newTraining.category]?.map(training => (
                        <option key={training} value={training}>{training}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="completionDate">Completion Date *</label>
                    <input
                      type="date"
                      id="completionDate"
                      name="completionDate"
                      value={newTraining.completionDate}
                      onChange={handleTrainingInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="trainer">Trainer</label>
                    <input
                      type="text"
                      id="trainer"
                      name="trainer"
                      value={newTraining.trainer}
                      onChange={handleTrainingInputChange}
                      placeholder="Sarah Johnson"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="thirdPartyFacilitator">Third Party Certifier/Facilitator</label>
                    <input
                      type="text"
                      id="thirdPartyFacilitator"
                      name="thirdPartyFacilitator"
                      value={newTraining.thirdPartyFacilitator}
                      onChange={handleTrainingInputChange}
                      placeholder="OSHA Training Institute"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <select
                      id="location"
                      name="location"
                      value={newTraining.location}
                      onChange={handleTrainingInputChange}
                      className="form-select"
                    >
                      <option value="">Select location...</option>
                      <option value="Site Trailer A">Site Trailer A</option>
                      <option value="Conference Room B">Conference Room B</option>
                      <option value="Main Office Building">Main Office Building</option>
                      <option value="Field Training Area">Field Training Area</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="certificateNumber">Certificate Number</label>
                    <input
                      type="text"
                      id="certificateNumber"
                      name="certificateNumber"
                      value={newTraining.certificateNumber}
                      onChange={handleTrainingInputChange}
                      placeholder="CERT-2025-001234"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Duration & Expiration</label>
                    <div className="auto-populated">
                      {newTraining.training ? (
                        <div className="expiration-info">
                          <p>Duration: Auto-populated from Training Library</p>
                          <p>Expiration: Auto-calculated from completion date</p>
                          {newTraining.completionDate && newTraining.training && (
                            <p>
                              <strong>
                                Expires: {calculateExpirationDate(newTraining.training, newTraining.completionDate) 
                                  ? new Date(calculateExpirationDate(newTraining.training, newTraining.completionDate)).toLocaleDateString()
                                  : 'No expiration'}
                              </strong>
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>Select training to see duration and expiration details</p>
                      )}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Upload Certificate/Documentation</label>
                    <div className="file-upload-area">
                      <div className="upload-placeholder">
                        📄
                        <p>Drag & drop or click to upload</p>
                        <small>PDF, JPG, PNG accepted</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowAddTraining(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addTrainingRecord}
                  className="btn btn-primary"
                  disabled={!newTraining.category || !newTraining.training || !newTraining.completionDate}
                >
                  Save Training Record
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Worker Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkerOnboarding;
