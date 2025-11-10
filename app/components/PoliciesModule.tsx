'use client'

import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, Download, Shield, FileText, Calendar, X } from 'lucide-react'

interface Policy {
  id: string
  policyNumber: string
  clientName: string
  type: string
  insurer: string
  premium: number
  startDate: string
  endDate: string
  status: string
  coverage: number
}

export default function PoliciesModule() {
  const [policies, setPolicies] = useState<Policy[]>([
    { id: '1', policyNumber: 'POL-2024-001', clientName: 'John Smith', type: 'Auto Insurance', insurer: 'State Farm', premium: 1200, startDate: '2024-01-01', endDate: '2025-01-01', status: 'Active', coverage: 50000 },
    { id: '2', policyNumber: 'POL-2024-002', clientName: 'ABC Corporation', type: 'Commercial Property', insurer: 'Allianz', premium: 25000, startDate: '2024-02-15', endDate: '2025-02-15', status: 'Active', coverage: 5000000 },
    { id: '3', policyNumber: 'POL-2024-003', clientName: 'Jane Doe', type: 'Home Insurance', insurer: 'Liberty Mutual', premium: 900, startDate: '2024-03-10', endDate: '2025-03-10', status: 'Active', coverage: 350000 },
    { id: '4', policyNumber: 'POL-2023-156', clientName: 'Tech Solutions Inc', type: 'Cyber Insurance', insurer: 'AIG', premium: 15000, startDate: '2023-06-01', endDate: '2024-06-01', status: 'Expiring Soon', coverage: 2000000 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    policyNumber: '',
    clientName: '',
    type: '',
    insurer: '',
    premium: '',
    startDate: '',
    endDate: '',
    coverage: '',
    deductible: '',
    notes: ''
  })

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || policy.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleAdd = () => {
    setEditingPolicy(null)
    setFormData({
      policyNumber: '',
      clientName: '',
      type: '',
      insurer: '',
      premium: '',
      startDate: '',
      endDate: '',
      coverage: '',
      deductible: '',
      notes: ''
    })
    setShowModal(true)
  }

  const handleEdit = (policy: Policy) => {
    setEditingPolicy(policy)
    setFormData({
      policyNumber: policy.policyNumber,
      clientName: policy.clientName,
      type: policy.type,
      insurer: policy.insurer,
      premium: policy.premium.toString(),
      startDate: policy.startDate,
      endDate: policy.endDate,
      coverage: policy.coverage.toString(),
      deductible: '',
      notes: ''
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingPolicy) {
      setPolicies(policies.map(p =>
        p.id === editingPolicy.id
          ? { ...p, ...formData, premium: parseFloat(formData.premium), coverage: parseFloat(formData.coverage) }
          : p
      ))
    } else {
      const newPolicy: Policy = {
        id: Date.now().toString(),
        policyNumber: formData.policyNumber,
        clientName: formData.clientName,
        type: formData.type,
        insurer: formData.insurer,
        premium: parseFloat(formData.premium),
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: 'Active',
        coverage: parseFloat(formData.coverage)
      }
      setPolicies([...policies, newPolicy])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Policies Management</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Track and manage all insurance policies with automated reminders
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search policies..."
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
              <option value="Active">Active</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Expired">Expired</option>
            </select>

            <button className="btn-secondary">
              <Download size={18} style={{ marginRight: '6px' }} />
              Export
            </button>

            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={18} style={{ marginRight: '6px' }} />
              Add Policy
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{policies.length}</div>
          <div className="stat-label">Total Policies</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{policies.filter(p => p.status === 'Active').length}</div>
          <div className="stat-label">Active Policies</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{policies.filter(p => p.status === 'Expiring Soon').length}</div>
          <div className="stat-label">Expiring Soon</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${policies.reduce((sum, p) => sum + p.premium, 0).toLocaleString()}</div>
          <div className="stat-label">Total Premiums</div>
        </div>
      </div>

      {/* Policies Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Policy Number</th>
              <th>Client</th>
              <th>Type</th>
              <th>Insurer</th>
              <th>Premium</th>
              <th>Coverage</th>
              <th>Period</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.map(policy => (
              <tr key={policy.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={16} color="var(--primary)" />
                    <span style={{ fontWeight: '600' }}>{policy.policyNumber}</span>
                  </div>
                </td>
                <td>{policy.clientName}</td>
                <td>
                  <span className="badge badge-info">{policy.type}</span>
                </td>
                <td>{policy.insurer}</td>
                <td style={{ fontWeight: '600' }}>${policy.premium.toLocaleString()}</td>
                <td>${policy.coverage.toLocaleString()}</td>
                <td>
                  <div style={{ fontSize: '13px' }}>
                    <div>{policy.startDate}</div>
                    <div style={{ color: 'var(--text-light)' }}>{policy.endDate}</div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${
                    policy.status === 'Active' ? 'badge-success' :
                    policy.status === 'Expiring Soon' ? 'badge-warning' :
                    'badge-error'
                  }`}>
                    {policy.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="icon-button" onClick={() => handleEdit(policy)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-button" onClick={() => handleDelete(policy.id)}>
                      <Trash2 size={16} color="var(--error)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingPolicy ? 'Edit Policy' : 'Add New Policy'}</h2>
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
                    placeholder="Select or enter client"
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Policy Type *</label>
                  <select
                    className="select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select type</option>
                    <option value="Auto Insurance">Auto Insurance</option>
                    <option value="Home Insurance">Home Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Cyber Insurance">Cyber Insurance</option>
                    <option value="Liability Insurance">Liability Insurance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Insurer *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.insurer}
                    onChange={(e) => setFormData({ ...formData, insurer: e.target.value })}
                    placeholder="Insurance company name"
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Annual Premium *</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.premium}
                    onChange={(e) => setFormData({ ...formData, premium: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Coverage Amount *</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.coverage}
                    onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Start Date *</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="label">End Date *</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Deductible</label>
                <input
                  type="number"
                  className="input"
                  value={formData.deductible}
                  onChange={(e) => setFormData({ ...formData, deductible: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label className="label">Additional Notes</label>
                <textarea
                  className="textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special terms or conditions"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>
                {editingPolicy ? 'Update Policy' : 'Add Policy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
