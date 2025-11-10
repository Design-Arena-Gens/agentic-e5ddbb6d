'use client'

import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, FileText, Send, Clock, CheckCircle, X } from 'lucide-react'

interface Quote {
  id: string
  quoteNumber: string
  clientName: string
  type: string
  premium: number
  createdDate: string
  expiryDate: string
  status: string
}

export default function QuotesModule() {
  const [quotes, setQuotes] = useState<Quote[]>([
    { id: '1', quoteNumber: 'QT-2024-001', clientName: 'John Smith', type: 'Auto Insurance', premium: 1200, createdDate: '2024-11-01', expiryDate: '2024-12-01', status: 'Pending' },
    { id: '2', quoteNumber: 'QT-2024-002', clientName: 'Green Energy Ltd', type: 'Commercial Property', premium: 18000, createdDate: '2024-11-05', expiryDate: '2024-12-05', status: 'Sent' },
    { id: '3', quoteNumber: 'QT-2024-003', clientName: 'ABC Corporation', type: 'Cyber Insurance', premium: 5500, createdDate: '2024-10-20', expiryDate: '2024-11-20', status: 'Accepted' },
    { id: '4', quoteNumber: 'QT-2024-004', clientName: 'Jane Doe', type: 'Home Insurance', premium: 950, createdDate: '2024-11-08', expiryDate: '2024-12-08', status: 'Draft' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    quoteNumber: '',
    clientName: '',
    type: '',
    premium: '',
    coverage: '',
    deductible: '',
    expiryDate: '',
    notes: ''
  })

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || quote.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleAdd = () => {
    const nextNumber = `QT-2024-${String(quotes.length + 1).padStart(3, '0')}`
    setEditingQuote(null)
    setFormData({
      quoteNumber: nextNumber,
      clientName: '',
      type: '',
      premium: '',
      coverage: '',
      deductible: '',
      expiryDate: '',
      notes: ''
    })
    setShowModal(true)
  }

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote)
    setFormData({
      quoteNumber: quote.quoteNumber,
      clientName: quote.clientName,
      type: quote.type,
      premium: quote.premium.toString(),
      coverage: '',
      deductible: '',
      expiryDate: quote.expiryDate,
      notes: ''
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingQuote) {
      setQuotes(quotes.map(q =>
        q.id === editingQuote.id
          ? { ...q, ...formData, premium: parseFloat(formData.premium) }
          : q
      ))
    } else {
      const newQuote: Quote = {
        id: Date.now().toString(),
        quoteNumber: formData.quoteNumber,
        clientName: formData.clientName,
        type: formData.type,
        premium: parseFloat(formData.premium),
        createdDate: new Date().toISOString().split('T')[0],
        expiryDate: formData.expiryDate,
        status: 'Draft'
      }
      setQuotes([...quotes, newQuote])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      setQuotes(quotes.filter(q => q.id !== id))
    }
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    setQuotes(quotes.map(q =>
      q.id === id ? { ...q, status: newStatus } : q
    ))
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Quotes Management</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Create and manage insurance quotes with automated calculations
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search quotes..."
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
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={18} style={{ marginRight: '6px' }} />
              Create Quote
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{quotes.length}</div>
          <div className="stat-label">Total Quotes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{quotes.filter(q => q.status === 'Pending' || q.status === 'Sent').length}</div>
          <div className="stat-label">Pending Response</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{quotes.filter(q => q.status === 'Accepted').length}</div>
          <div className="stat-label">Accepted</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            ${quotes.filter(q => q.status === 'Accepted').reduce((sum, q) => sum + q.premium, 0).toLocaleString()}
          </div>
          <div className="stat-label">Accepted Value</div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Quote Number</th>
              <th>Client</th>
              <th>Type</th>
              <th>Premium</th>
              <th>Created</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotes.map(quote => (
              <tr key={quote.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} color="var(--primary)" />
                    <span style={{ fontWeight: '600' }}>{quote.quoteNumber}</span>
                  </div>
                </td>
                <td>{quote.clientName}</td>
                <td>
                  <span className="badge badge-info">{quote.type}</span>
                </td>
                <td style={{ fontWeight: '600' }}>${quote.premium.toLocaleString()}</td>
                <td>{quote.createdDate}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="var(--text-light)" />
                    {quote.expiryDate}
                  </div>
                </td>
                <td>
                  <select
                    className="select"
                    value={quote.status}
                    onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                    style={{
                      width: 'auto',
                      padding: '4px 8px',
                      fontSize: '13px',
                      background: quote.status === 'Accepted' ? '#E8F5E9' :
                                 quote.status === 'Sent' ? '#E3F2FD' :
                                 quote.status === 'Rejected' ? '#FFEBEE' :
                                 'var(--bg-secondary)',
                      color: quote.status === 'Accepted' ? 'var(--success)' :
                            quote.status === 'Sent' ? 'var(--primary)' :
                            quote.status === 'Rejected' ? 'var(--error)' :
                            'var(--text-secondary)'
                    }}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Sent">Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="icon-button" onClick={() => handleEdit(quote)}>
                      <Edit2 size={16} />
                    </button>
                    {quote.status === 'Draft' && (
                      <button className="icon-button" title="Send Quote">
                        <Send size={16} color="var(--primary)" />
                      </button>
                    )}
                    <button className="icon-button" onClick={() => handleDelete(quote.id)}>
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
              <h2 className="modal-title">{editingQuote ? 'Edit Quote' : 'Create New Quote'}</h2>
              <button className="icon-button" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Quote Number *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.quoteNumber}
                    onChange={(e) => setFormData({ ...formData, quoteNumber: e.target.value })}
                    placeholder="QT-2024-XXX"
                    disabled
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

              <div className="form-group">
                <label className="label">Insurance Type *</label>
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

              <div className="grid grid-3">
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
              </div>

              <div className="form-group">
                <label className="label">Expiry Date *</label>
                <input
                  type="date"
                  className="input"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="label">Additional Notes</label>
                <textarea
                  className="textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Special terms, conditions, or notes"
                />
              </div>

              <div className="alert alert-info">
                💡 AI Suggestion: Based on similar policies, the recommended premium range is $900-$1,300 for this coverage type.
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-secondary">Save as Draft</button>
              <button className="btn-primary" onClick={handleSave}>
                Save & Send Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
