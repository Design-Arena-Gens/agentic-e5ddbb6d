'use client'

import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, Download, Upload, Filter, X, Mail, Phone, MapPin } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  type: string
  policies: number
  totalPremium: number
  status: string
  since: string
}

export default function ClientsModule() {
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+1 234 567 8900', type: 'Individual', policies: 3, totalPremium: 12500, status: 'Active', since: '2022-01-15' },
    { id: '2', name: 'ABC Corporation', email: 'contact@abc.com', phone: '+1 234 567 8901', type: 'Business', policies: 8, totalPremium: 85000, status: 'Active', since: '2021-06-20' },
    { id: '3', name: 'Jane Doe', email: 'jane@example.com', phone: '+1 234 567 8902', type: 'Individual', policies: 2, totalPremium: 8900, status: 'Active', since: '2023-03-10' },
    { id: '4', name: 'Tech Solutions Inc', email: 'info@techsol.com', phone: '+1 234 567 8903', type: 'Business', policies: 5, totalPremium: 45000, status: 'Active', since: '2022-09-05' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [filterType, setFilterType] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Individual',
    address: '',
    dateOfBirth: '',
    notes: ''
  })

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || client.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleAdd = () => {
    setEditingClient(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: 'Individual',
      address: '',
      dateOfBirth: '',
      notes: ''
    })
    setShowModal(true)
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      type: client.type,
      address: '',
      dateOfBirth: '',
      notes: ''
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingClient) {
      setClients(clients.map(c =>
        c.id === editingClient.id
          ? { ...c, ...formData }
          : c
      ))
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        policies: 0,
        totalPremium: 0,
        status: 'Active',
        since: new Date().toISOString().split('T')[0]
      }
      setClients([...clients, newClient])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== id))
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Type', 'Policies', 'Total Premium', 'Status', 'Since']
    const rows = clients.map(c => [c.name, c.email, c.phone, c.type, c.policies, c.totalPremium, c.status, c.since])
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'clients.csv'
    a.click()
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Clients Management</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Manage your client database with AI-powered insights and easy controls
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search clients by name or email..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select
              className="select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Types</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>

            <button className="btn-secondary" onClick={exportToCSV}>
              <Download size={18} style={{ marginRight: '6px' }} />
              Export CSV
            </button>

            <button className="btn-secondary">
              <Upload size={18} style={{ marginRight: '6px' }} />
              Import
            </button>

            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={18} style={{ marginRight: '6px' }} />
              Add Client
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{clients.length}</div>
          <div className="stat-label">Total Clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{clients.filter(c => c.type === 'Individual').length}</div>
          <div className="stat-label">Individual Clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{clients.filter(c => c.type === 'Business').length}</div>
          <div className="stat-label">Business Clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${clients.reduce((sum, c) => sum + c.totalPremium, 0).toLocaleString()}</div>
          <div className="stat-label">Total Premiums</div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Policies</th>
              <th>Total Premium</th>
              <th>Status</th>
              <th>Client Since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td>
                  <div style={{ fontWeight: '600' }}>{client.name}</div>
                </td>
                <td>
                  <div style={{ fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Mail size={14} color="var(--text-light)" />
                      {client.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={14} color="var(--text-light)" />
                      {client.phone}
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${client.type === 'Business' ? 'badge-info' : 'badge-success'}`}>
                    {client.type}
                  </span>
                </td>
                <td>{client.policies}</td>
                <td style={{ fontWeight: '600' }}>${client.totalPremium.toLocaleString()}</td>
                <td>
                  <span className="badge badge-success">{client.status}</span>
                </td>
                <td>{client.since}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="icon-button" onClick={() => handleEdit(client)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-button" onClick={() => handleDelete(client.id)}>
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
              <h2 className="modal-title">{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
              <button className="icon-button" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    className="input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Phone *</label>
                  <input
                    type="tel"
                    className="input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Client Type *</label>
                  <select
                    className="select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Individual">Individual</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Date of Birth</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Address</label>
                <input
                  type="text"
                  className="input"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                />
              </div>

              <div className="form-group">
                <label className="label">Notes</label>
                <textarea
                  className="textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes about the client"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>
                {editingClient ? 'Update Client' : 'Add Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
