'use client'

import { useState } from 'react'
import { Search, Plus, AlertCircle, Clock, CheckCircle, X, FileText, DollarSign } from 'lucide-react'

interface Claim {
  id: string
  claimNumber: string
  policyNumber: string
  clientName: string
  type: string
  claimAmount: number
  approvedAmount: number
  dateReported: string
  status: string
  priority: string
}

export default function ClaimsModule() {
  const [claims, setClaims] = useState<Claim[]>([
    { id: '1', claimNumber: 'CLM-2024-001', policyNumber: 'POL-2024-001', clientName: 'John Smith', type: 'Auto Accident', claimAmount: 5000, approvedAmount: 4500, dateReported: '2024-11-01', status: 'Approved', priority: 'High' },
    { id: '2', claimNumber: 'CLM-2024-002', policyNumber: 'POL-2024-002', clientName: 'ABC Corporation', type: 'Property Damage', claimAmount: 150000, approvedAmount: 0, dateReported: '2024-11-05', status: 'Under Review', priority: 'High' },
    { id: '3', claimNumber: 'CLM-2024-003', policyNumber: 'POL-2024-003', clientName: 'Jane Doe', type: 'Water Damage', claimAmount: 12000, approvedAmount: 11000, dateReported: '2024-10-28', status: 'Approved', priority: 'Medium' },
    { id: '4', claimNumber: 'CLM-2024-004', policyNumber: 'POL-2023-156', clientName: 'Tech Solutions Inc', type: 'Cyber Breach', claimAmount: 75000, approvedAmount: 0, dateReported: '2024-11-08', status: 'Investigating', priority: 'Critical' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    policyNumber: '',
    clientName: '',
    type: '',
    claimAmount: '',
    dateReported: '',
    description: '',
    documents: [] as string[]
  })

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || claim.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleAdd = () => {
    const nextNumber = `CLM-2024-${String(claims.length + 1).padStart(3, '0')}`
    setFormData({
      policyNumber: '',
      clientName: '',
      type: '',
      claimAmount: '',
      dateReported: new Date().toISOString().split('T')[0],
      description: '',
      documents: []
    })
    setShowModal(true)
  }

  const handleSave = () => {
    const newClaim: Claim = {
      id: Date.now().toString(),
      claimNumber: `CLM-2024-${String(claims.length + 1).padStart(3, '0')}`,
      policyNumber: formData.policyNumber,
      clientName: formData.clientName,
      type: formData.type,
      claimAmount: parseFloat(formData.claimAmount),
      approvedAmount: 0,
      dateReported: formData.dateReported,
      status: 'Submitted',
      priority: 'Medium'
    }
    setClaims([...claims, newClaim])
    setShowModal(false)
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    setClaims(claims.map(c =>
      c.id === id ? { ...c, status: newStatus } : c
    ))
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Claims Management</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Track and process insurance claims with AI-powered document analysis
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search claims..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select
              className="select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Investigating">Investigating</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Paid">Paid</option>
            </select>

            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={18} style={{ marginRight: '6px' }} />
              Register Claim
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{claims.length}</div>
          <div className="stat-label">Total Claims</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {claims.filter(c => c.status === 'Under Review' || c.status === 'Investigating').length}
          </div>
          <div className="stat-label">Pending Review</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{claims.filter(c => c.status === 'Approved').length}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            ${claims.filter(c => c.status === 'Approved').reduce((sum, c) => sum + c.approvedAmount, 0).toLocaleString()}
          </div>
          <div className="stat-label">Total Approved</div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Claim Number</th>
              <th>Policy</th>
              <th>Client</th>
              <th>Type</th>
              <th>Claim Amount</th>
              <th>Approved Amount</th>
              <th>Date Reported</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map(claim => (
              <tr key={claim.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} color="var(--primary)" />
                    <span style={{ fontWeight: '600' }}>{claim.claimNumber}</span>
                  </div>
                </td>
                <td>{claim.policyNumber}</td>
                <td>{claim.clientName}</td>
                <td>
                  <span className="badge badge-info">{claim.type}</span>
                </td>
                <td style={{ fontWeight: '600' }}>${claim.claimAmount.toLocaleString()}</td>
                <td style={{ fontWeight: '600', color: claim.approvedAmount > 0 ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {claim.approvedAmount > 0 ? `$${claim.approvedAmount.toLocaleString()}` : '-'}
                </td>
                <td>{claim.dateReported}</td>
                <td>
                  <span className={`badge ${
                    claim.priority === 'Critical' ? 'badge-error' :
                    claim.priority === 'High' ? 'badge-warning' :
                    'badge-info'
                  }`}>
                    {claim.priority}
                  </span>
                </td>
                <td>
                  <select
                    className="select"
                    value={claim.status}
                    onChange={(e) => handleStatusChange(claim.id, e.target.value)}
                    style={{
                      width: 'auto',
                      padding: '4px 8px',
                      fontSize: '13px',
                      background: claim.status === 'Approved' || claim.status === 'Paid' ? '#E8F5E9' :
                                 claim.status === 'Rejected' ? '#FFEBEE' :
                                 '#FFF8E1',
                      color: claim.status === 'Approved' || claim.status === 'Paid' ? 'var(--success)' :
                            claim.status === 'Rejected' ? 'var(--error)' :
                            'var(--warning)'
                    }}
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Paid">Paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Register New Claim</h2>
              <button className="icon-button" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Policy Number *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                    placeholder="POL-2024-XXX"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Client Name *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Auto-filled from policy"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Claim Type *</label>
                  <select
                    className="select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select type</option>
                    <option value="Auto Accident">Auto Accident</option>
                    <option value="Property Damage">Property Damage</option>
                    <option value="Water Damage">Water Damage</option>
                    <option value="Fire Damage">Fire Damage</option>
                    <option value="Theft">Theft</option>
                    <option value="Liability">Liability</option>
                    <option value="Cyber Breach">Cyber Breach</option>
                    <option value="Medical">Medical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Claim Amount *</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.claimAmount}
                    onChange={(e) => setFormData({ ...formData, claimAmount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Date Reported *</label>
                <input
                  type="date"
                  className="input"
                  value={formData.dateReported}
                  onChange={(e) => setFormData({ ...formData, dateReported: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="label">Description *</label>
                <textarea
                  className="textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the incident and circumstances of the claim"
                />
              </div>

              <div className="form-group">
                <label className="label">Supporting Documents</label>
                <div className="drag-drop-zone">
                  <FileText size={32} color="var(--primary)" style={{ marginBottom: '12px' }} />
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>Drop files here or click to upload</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-light)' }}>
                    PDF, JPG, PNG up to 10MB • AI will extract key information
                  </div>
                </div>
              </div>

              <div className="alert alert-info">
                🤖 AI Assistant: I can help extract information from photos, police reports, and medical documents automatically.
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
