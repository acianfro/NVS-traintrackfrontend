  const [users] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@mainorg.com',
      role: 'Site Manager',
      company: 'Main Organization',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      email: 'mike@acmeconstruction.com',
      role: 'Contractor',
      company: 'Acme Construction',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      email: 'lisa.chen@mainorg.com',
      role: 'Corp Manager',
      company: 'Main Organization',
      status: 'Pending'
    }
  ]);

  const sections = [
    { id: 'training-library', label: 'Training Library', icon: '📚' },
    { id: 'contractors', label: 'Contractors', icon: '🏢' },
    { id: 'departments', label: 'Departments', icon: '👥' },
    { id: 'categories', label: 'Training Categories', icon: '📋' },
    { id: 'delivery-methods', label: 'Delivery Methods', icon: '🚚' },
    { id: 'users', label: 'User Management', icon: '👤' },
    { id: 'bulk-upload', label: 'Bulk Upload', icon: '📊' }
  ];

  const hasAccess = (section) => {
    if (userRole === 'admin') return true;
    if (userRole === 'site_manager') {
      return ['training-library', 'contractors', 'users', 'bulk-upload'].includes(section);
    }
    return false;
  };

  const renderTrainingLibrary = () => (
    <div className="admin-section">
      <div className="section-header">
        <h3>Training Library</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal('add-training')}
        >
          + Add New Training
        </button>
      </div>

      <div className="filter-bar">
        <select className="filter-select">
          <option>All Categories</option>
          <option>Safety Certifications</option>
          <option>Equipment Operation</option>
          <option>Site Onboarding</option>
        </select>
        <input type="text" className="filter-select" placeholder="Search training name" />
        <button className="btn btn-secondary">Filter</button>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div>Training Name</div>
          <div>Category</div>
          <div>Delivery Method</div>
          <div>Duration</div>
          <div>Cert Length</div>
          <div>Actions</div>
        </div>
        
        {trainingLibrary.map(training => (
          <div key={training.id} className="table-row">
            <div>
              <div className="primary-text">{training.name}</div>
              <div className="secondary-text">{training.description}</div>
            </div>
            <div>{training.category}</div>
            <div>{training.deliveryMethod}</div>
            <div>{training.duration} hours</div>
            <div>{training.certificationLength} months</div>
            <div className="table-actions">
              <button className="btn btn-secondary btn-sm">Edit</button>
              <button className="btn btn-secondary btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContractors = () => (
    <div className="admin-section">
      <div className="section-header">
        <h3>Contractor Management</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal('add-contractor')}
        >
          + Add Contractor
        </button>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div>Company Name</div>
          <div>Primary Contact</div>
          <div>Trade/Specialty</div>
          <div>Worker Count</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {contractors.map(contractor => (
          <div key={contractor.id} className="table-row">
            <div>
              <div className="primary-text">{contractor.name}</div>
              <div className="secondary-text">License: {contractor.license}</div>
            </div>
            <div>
              <div className="primary-text">{contractor.contact}</div>
              <div className="secondary-text">{contractor.email}</div>
            </div>
            <div>{contractor.trade}</div>
            <div>{contractor.workers}</div>
            <div>
              <span className="status-badge status-valid">{contractor.status}</span>
            </div>
            <div className="table-actions">
              <button className="btn btn-secondary btn-sm">Edit</button>
              <button className="btn btn-secondary btn-sm">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-section">
      <div className="section-header">
        <h3>User Management</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal('add-user')}
        >
          + Add New User
        </button>
      </div>

      <div className="filter-bar">
        <select className="filter-select">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Site Manager</option>
          <option>Corp Manager</option>
          <option>Contractor</option>
        </select>
        <select className="filter-select">
          <option>All Companies</option>
          <option>Main Organization</option>
          <option>Acme Construction</option>
        </select>
        <input type="text" className="filter-select" placeholder="Search user" />
        <button className="btn btn-secondary">Filter</button>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Company</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {users.map(user => (
          <div key={user.id} className="table-row">
            <div>
              <div className="primary-text">{user.name}</div>
              <div className="secondary-text">{user.role}</div>
            </div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            <div>{user.company}</div>
            <div>
              <span className={`status-badge ${user.status === 'Active' ? 'status-valid' : 'status-expiring'}`}>
                {user.status}
              </span>
            </div>
            <div className="table-actions">
              <button className="btn btn-secondary btn-sm">Edit</button>
              <button className="btn btn-secondary btn-sm">
                {user.status === 'Active' ? 'Disable' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBulkUpload = () => (
    <div className="admin-section">
      <h3>Bulk Upload Workers</h3>
      
      <div className="bulk-upload-grid">
        <div className="upload-card">
          <h4>Upload Workers from CSV/Excel</h4>
          <div className="form-group">
            <label className="form-label">Select Company</label>
            <select className="form-select">
              <option>Acme Construction</option>
              <option>PowerCorp</option>
              <option>BuildRight</option>
              <option>Main Organization</option>
            </select>
          </div>
          
          <div className="file-upload-area">
            <div className="upload-placeholder">
              <div className="upload-icon">📊</div>
              <div className="upload-text">Drag & drop your file here</div>
              <div className="upload-subtext">Supports CSV, Excel (.xlsx, .xls)</div>
              <button className="btn btn-secondary">Choose File</button>
            </div>
          </div>
          
          <div className="upload-info">
            <strong>Required columns:</strong> Worker ID, Full Name, Job Title, Department<br/>
            <strong>Optional columns:</strong> Emergency Contact Name, Emergency Contact Phone, Site Assignments
          </div>
          
          <button className="btn btn-primary" style={{width: '100%'}}>Upload Workers</button>
        </div>

        <div className="upload-card">
          <h4>Upload Training Records</h4>
          <div className="form-group">
            <label className="form-label">Select Training Type</label>
            <select className="form-select">
              <option>OSHA 30-Hour Construction</option>
              <option>Crane Operation Certification</option>
              <option>First Aid/CPR</option>
              <option>Site Safety Orientation</option>
            </select>
          </div>
          
          <div className="file-upload-area">
            <div className="upload-placeholder">
              <div className="upload-icon">📋</div>
              <div className="upload-text">Upload training completion records</div>
              <div className="upload-subtext">CSV or Excel format</div>
              <button className="btn btn-secondary">Choose File</button>
            </div>
          </div>
          
          <div className="upload-info">
            <strong>Required columns:</strong> Worker ID, Completion Date<br/>
            <strong>Optional columns:</strong> Trainer, Location, Expiration Date, Certificate Number
          </div>
          
          <button className="btn btn-primary" style={{width: '100%'}}>Upload Training Records</button>
        </div>
      </div>

      <div className="bulk-actions">
        <button className="btn btn-secondary">Download Template</button>
        <button className="btn btn-secondary">View Upload History</button>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="admin-section">
      <div className="section-header">
        <h3>Training Categories</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal('add-category')}
        >
          + Add Category
        </button>
      </div>

      <div className="categories-grid">
        <div className="category-card">
          <h4>Safety Certifications</h4>
          <p>OSHA certifications, safety training programs, and regulatory compliance training</p>
          <div className="category-actions">
            <button className="btn btn-secondary btn-sm">Edit</button>
            <button className="btn btn-secondary btn-sm">Delete</button>
          </div>
        </div>

        <div className="category-card">
          <h4>Equipment Operation</h4>
          <p>Heavy machinery operation, equipment certification, and operational safety training</p>
          <div className="category-actions">
            <button className="btn btn-secondary btn-sm">Edit</button>
            <button className="btn btn-secondary btn-sm">Delete</button>
          </div>
        </div>

        <div className="category-card">
          <h4>Site Onboarding</h4>
          <p>Site-specific orientation, project requirements, and location-based safety protocols</p>
          <div className="category-actions">
            <button className="btn btn-secondary btn-sm">Edit</button>
            <button className="btn btn-secondary btn-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>
              {showModal === 'add-training' && 'Add New Training'}
              {showModal === 'add-contractor' && 'Add New Contractor'}
              {showModal === 'add-user' && 'Add New User'}
              {showModal === 'add-category' && 'Add Training Category'}
            </h3>
            <button 
              className="close-button"
              onClick={() => setShowModal(null)}
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            <p>Modal form would go here for {showModal}</p>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" placeholder="Enter name..." />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" rows="3" placeholder="Enter description..."></textarea>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowModal(null)}
            >
              Cancel
            </button>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    );
  };

  if (!hasAccess(activeSection)) {
    return (
      <div className="administration">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You don't have permission to access administration features.</p>
          <p>Role: {userRole}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="administration">
      <div className="page-header">
        <h1>Administration</h1>
        <p className="page-subtitle">System management and configuration</p>
      </div>

      <div className="admin-nav">
        {sections.filter(section => hasAccess(section.id)).map(section => (
          <button
            key={section.id}
            className={`tab-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeSection === 'training-library' && renderTrainingLibrary(// components/admin/Administration.js
import React, { useState } from 'react';

const Administration = ({ userRole }) => {
  const [activeSection, setActiveSection] = useState('training-library');
  const [showModal, setShowModal] = useState(null);

  // Mock data for administration
  const [trainingLibrary] = useState([
    {
      id: 1,
      name: 'OSHA 30-Hour Construction',
      category: 'Safety Certifications',
      deliveryMethod: 'In-Person',
      duration: 30,
      certificationLength: 36,
      description: 'Comprehensive safety training for construction workers'
    },
    {
      id: 2,
      name: 'Crane Operation Certification',
      category: 'Equipment Operation',
      deliveryMethod: 'Third Party',
      duration: 40,
      certificationLength: 24,
      description: 'Heavy equipment operation and safety protocols'
    }
  ]);

  const [contractors] = useState([
    {
      id: 1,
      name: 'Acme Construction',
      license: 'CON-2024-0156',
      contact: 'Mike Rodriguez',
      email: 'mike@acmeconstruction.com',
      trade: 'General Construction',
      workers: 67,
      status: 'Active'
    },
    {
      id: 2,
      name: 'PowerCorp',
      license: 'ELC-2024-0089',
      contact: 'Lisa Chen',
      email: 'lisa@powercorp.com',
      trade: 'Electrical',
      workers: 34,
      status: 'Active'
    }
  ]);

  const [users] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah