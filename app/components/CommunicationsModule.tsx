'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Send, Phone, Search, Plus, X } from 'lucide-react'

interface Message {
  id: string
  type: 'email' | 'sms' | 'call'
  recipient: string
  subject: string
  content: string
  date: string
  status: string
}

export default function CommunicationsModule() {
  const [messages] = useState<Message[]>([
    { id: '1', type: 'email', recipient: 'John Smith', subject: 'Policy Renewal Reminder', content: 'Your auto insurance policy is due for renewal...', date: '2024-11-10 09:30', status: 'Sent' },
    { id: '2', type: 'sms', recipient: 'ABC Corporation', subject: 'Quote Ready', content: 'Your insurance quote is ready for review', date: '2024-11-09 14:15', status: 'Delivered' },
    { id: '3', type: 'email', recipient: 'Jane Doe', subject: 'Claim Update', content: 'Your claim has been approved and payment processed', date: '2024-11-08 11:20', status: 'Read' },
    { id: '4', type: 'call', recipient: 'Tech Solutions Inc', subject: 'Follow-up call', content: 'Discussed new cyber insurance policy options', date: '2024-11-07 16:45', status: 'Completed' },
  ])

  const [showComposer, setShowComposer] = useState(false)
  const [messageType, setMessageType] = useState<'email' | 'sms'>('email')
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    content: ''
  })

  const filteredMessages = messages.filter(msg =>
    msg.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Communications</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Manage all client communications with AI-powered templates and automation
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search communications..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={() => { setMessageType('email'); setShowComposer(true); }}>
              <Mail size={18} style={{ marginRight: '6px' }} />
              New Email
            </button>
            <button className="btn-primary" onClick={() => { setMessageType('sms'); setShowComposer(true); }}>
              <MessageSquare size={18} style={{ marginRight: '6px' }} />
              Send SMS
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{messages.filter(m => m.type === 'email').length}</div>
          <div className="stat-label">Emails Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{messages.filter(m => m.type === 'sms').length}</div>
          <div className="stat-label">SMS Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{messages.filter(m => m.type === 'call').length}</div>
          <div className="stat-label">Calls Logged</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{messages.filter(m => m.status === 'Read').length}</div>
          <div className="stat-label">Messages Read</div>
        </div>
      </div>

      <div className="grid grid-2">
        {/* Message List */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recent Communications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredMessages.map(msg => {
              const Icon = msg.type === 'email' ? Mail : msg.type === 'sms' ? MessageSquare : Phone
              const iconColor = msg.type === 'email' ? 'var(--primary)' : msg.type === 'sms' ? 'var(--secondary)' : 'var(--success)'

              return (
                <div key={msg.id} style={{
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
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
                      <Icon size={20} color={iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{msg.recipient}</span>
                        <span className={`badge ${
                          msg.status === 'Read' ? 'badge-success' :
                          msg.status === 'Delivered' ? 'badge-info' :
                          'badge-warning'
                        }`} style={{ fontSize: '11px' }}>
                          {msg.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', marginBottom: '4px' }}>{msg.subject}</div>
                      <div style={{
                        fontSize: '13px',
                        color: 'var(--text-light)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {msg.content}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '8px' }}>
                        {msg.date}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Templates */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>AI Templates</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Policy Renewal Reminder', description: 'Automated reminder for upcoming renewals', category: 'Renewal' },
              { title: 'Quote Follow-up', description: 'Follow up on pending insurance quotes', category: 'Sales' },
              { title: 'Claim Status Update', description: 'Update clients on claim progress', category: 'Claims' },
              { title: 'Welcome New Client', description: 'Welcome message for new clients', category: 'Onboarding' },
              { title: 'Payment Reminder', description: 'Gentle reminder for pending payments', category: 'Billing' },
              { title: 'Policy Expiry Alert', description: 'Alert for expiring policies', category: 'Renewal' },
            ].map((template, index) => (
              <div key={index} style={{
                padding: '14px',
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                      {template.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      {template.description}
                    </div>
                    <span className="badge badge-info" style={{ fontSize: '11px' }}>
                      {template.category}
                    </span>
                  </div>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposer && (
        <div className="modal-overlay" onClick={() => setShowComposer(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {messageType === 'email' ? 'Compose Email' : 'Send SMS'}
              </h2>
              <button className="icon-button" onClick={() => setShowComposer(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="label">Recipient *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  placeholder="Select client or enter email/phone"
                />
              </div>

              {messageType === 'email' && (
                <div className="form-group">
                  <label className="label">Subject *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter subject"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="label">Message *</label>
                <textarea
                  className="textarea"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={messageType === 'email' ? 'Type your message...' : 'Type your SMS message (160 chars max)'}
                  style={{ minHeight: messageType === 'email' ? '200px' : '100px' }}
                />
                {messageType === 'sms' && (
                  <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
                    {formData.content.length}/160 characters
                  </div>
                )}
              </div>

              <div className="alert alert-info">
                🤖 AI Suggestion: I can personalize this message with client-specific details and optimize the tone for better engagement.
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="btn-secondary" style={{ fontSize: '13px', padding: '6px 12px' }}>
                  Use Template
                </button>
                <button className="btn-secondary" style={{ fontSize: '13px', padding: '6px 12px' }}>
                  Add Attachment
                </button>
                <button className="btn-secondary" style={{ fontSize: '13px', padding: '6px 12px' }}>
                  Schedule Send
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowComposer(false)}>Cancel</button>
              <button className="btn-secondary">Save Draft</button>
              <button className="btn-primary">
                <Send size={16} style={{ marginRight: '6px' }} />
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
