'use client'

import { useState } from 'react'
import { FileText, Upload, Download, Search, Folder, File, Image, X, Eye } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedDate: string
  category: string
  relatedTo: string
}

export default function DocumentsModule() {
  const [documents] = useState<Document[]>([
    { id: '1', name: 'Policy_JohnSmith_Auto.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Me', uploadedDate: '2024-11-10', category: 'Policy Documents', relatedTo: 'John Smith' },
    { id: '2', name: 'Claim_Form_WaterDamage.pdf', type: 'PDF', size: '1.8 MB', uploadedBy: 'Jane Doe', uploadedDate: '2024-11-08', category: 'Claims', relatedTo: 'Jane Doe' },
    { id: '3', name: 'Quote_GreenEnergy_Commercial.pdf', type: 'PDF', size: '856 KB', uploadedBy: 'Me', uploadedDate: '2024-11-05', category: 'Quotes', relatedTo: 'Green Energy Ltd' },
    { id: '4', name: 'Contract_ABC_Corporation.docx', type: 'DOCX', size: '1.2 MB', uploadedBy: 'Me', uploadedDate: '2024-10-28', category: 'Contracts', relatedTo: 'ABC Corporation' },
    { id: '5', name: 'Accident_Photos.zip', type: 'ZIP', size: '15.3 MB', uploadedBy: 'John Smith', uploadedDate: '2024-11-01', category: 'Claims', relatedTo: 'John Smith' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showUpload, setShowUpload] = useState(false)

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.relatedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || doc.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const categories = [
    { name: 'Policy Documents', count: documents.filter(d => d.category === 'Policy Documents').length, icon: FileText },
    { name: 'Claims', count: documents.filter(d => d.category === 'Claims').length, icon: FileText },
    { name: 'Quotes', count: documents.filter(d => d.category === 'Quotes').length, icon: FileText },
    { name: 'Contracts', count: documents.filter(d => d.category === 'Contracts').length, icon: FileText },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Document Management</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Store and manage all documents with AI-powered OCR and search
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search documents..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <select
              className="select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Categories</option>
              <option value="Policy Documents">Policy Documents</option>
              <option value="Claims">Claims</option>
              <option value="Quotes">Quotes</option>
              <option value="Contracts">Contracts</option>
            </select>

            <button className="btn-primary" onClick={() => setShowUpload(true)}>
              <Upload size={18} style={{ marginRight: '6px' }} />
              Upload Document
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{documents.length}</div>
          <div className="stat-label">Total Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {(documents.reduce((sum, d) => {
              const size = parseFloat(d.size.split(' ')[0])
              const unit = d.size.split(' ')[1]
              return sum + (unit === 'MB' ? size : size / 1000)
            }, 0)).toFixed(1)} MB
          </div>
          <div className="stat-label">Total Storage Used</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{documents.filter(d => d.uploadedDate === new Date().toISOString().split('T')[0]).length}</div>
          <div className="stat-label">Uploaded Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">4</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      <div className="grid grid-2">
        {/* Categories */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Categories</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  onClick={() => setFilterCategory(category.name)}
                  style={{
                    padding: '14px',
                    background: filterCategory === category.name ? 'var(--bg-secondary)' : 'transparent',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} color="var(--primary)" />
                    </div>
                    <span style={{ fontWeight: '500' }}>{category.name}</span>
                  </div>
                  <span className="badge badge-info">{category.count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recent Documents</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredDocuments.slice(0, 6).map(doc => {
              const getIcon = () => {
                if (doc.type === 'PDF') return FileText
                if (doc.type === 'DOCX') return File
                if (doc.type === 'ZIP') return Folder
                return FileText
              }
              const Icon = getIcon()

              return (
                <div key={doc.id} style={{
                  padding: '14px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} color="var(--primary)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        {doc.size} • {doc.uploadedDate}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button className="icon-button">
                      <Eye size={16} />
                    </button>
                    <button className="icon-button">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>All Documents</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Related To</th>
              <th>Type</th>
              <th>Size</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map(doc => (
              <tr key={doc.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} color="var(--primary)" />
                    <span style={{ fontWeight: '500' }}>{doc.name}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-info">{doc.category}</span>
                </td>
                <td>{doc.relatedTo}</td>
                <td>{doc.type}</td>
                <td>{doc.size}</td>
                <td>{doc.uploadedBy}</td>
                <td>{doc.uploadedDate}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="icon-button">
                      <Eye size={16} />
                    </button>
                    <button className="icon-button">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Upload Document</h2>
              <button className="icon-button" onClick={() => setShowUpload(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="drag-drop-zone">
                <Upload size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '8px' }}>
                  Drop files here or click to browse
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '16px' }}>
                  Supports PDF, DOC, DOCX, JPG, PNG, ZIP up to 50MB
                </div>
                <button className="btn-primary">Browse Files</button>
              </div>

              <div style={{ marginTop: '24px' }}>
                <div className="form-group">
                  <label className="label">Category *</label>
                  <select className="select">
                    <option value="">Select category</option>
                    <option value="Policy Documents">Policy Documents</option>
                    <option value="Claims">Claims</option>
                    <option value="Quotes">Quotes</option>
                    <option value="Contracts">Contracts</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Related To</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Client or policy name"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Description</label>
                  <textarea
                    className="textarea"
                    placeholder="Add notes about this document"
                    style={{ minHeight: '80px' }}
                  />
                </div>
              </div>

              <div className="alert alert-info">
                🤖 AI will automatically extract text, identify document type, and suggest categories for uploaded files.
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowUpload(false)}>Cancel</button>
              <button className="btn-primary">Upload Document</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
