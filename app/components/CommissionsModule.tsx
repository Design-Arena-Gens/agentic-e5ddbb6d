'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'

interface Commission {
  id: string
  policyNumber: string
  clientName: string
  insurer: string
  premium: number
  rate: number
  amount: number
  status: string
  dueDate: string
  paidDate: string
}

export default function CommissionsModule() {
  const [commissions] = useState<Commission[]>([
    { id: '1', policyNumber: 'POL-2024-001', clientName: 'John Smith', insurer: 'State Farm', premium: 1200, rate: 15, amount: 180, status: 'Paid', dueDate: '2024-11-01', paidDate: '2024-11-01' },
    { id: '2', policyNumber: 'POL-2024-002', clientName: 'ABC Corporation', insurer: 'Allianz', premium: 25000, rate: 12, amount: 3000, status: 'Paid', dueDate: '2024-11-05', paidDate: '2024-11-05' },
    { id: '3', policyNumber: 'POL-2024-003', clientName: 'Jane Doe', insurer: 'Liberty Mutual', premium: 900, rate: 15, amount: 135, status: 'Pending', dueDate: '2024-12-01', paidDate: '' },
    { id: '4', policyNumber: 'POL-2023-156', clientName: 'Tech Solutions Inc', insurer: 'AIG', premium: 15000, rate: 10, amount: 1500, status: 'Overdue', dueDate: '2024-10-15', paidDate: '' },
    { id: '5', policyNumber: 'POL-2024-005', clientName: 'Green Energy Ltd', insurer: 'Chubb', premium: 18000, rate: 12, amount: 2160, status: 'Pending', dueDate: '2024-12-10', paidDate: '' },
  ])

  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const totalEarned = commissions.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.amount, 0)
  const totalPending = commissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.amount, 0)
  const totalOverdue = commissions.filter(c => c.status === 'Overdue').reduce((sum, c) => sum + c.amount, 0)

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Commissions Tracking</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Monitor and manage your commission earnings with automated calculations
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Calendar size={20} color="var(--text-secondary)" />
            <select
              className="select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Time</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary">
              <Download size={18} style={{ marginRight: '6px' }} />
              Export Report
            </button>
            <button className="btn-primary">Generate Invoice</button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#E8F5E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={24} color="var(--success)" />
            </div>
          </div>
          <div className="stat-value">${totalEarned.toLocaleString()}</div>
          <div className="stat-label">Total Earned</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#FFF8E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={24} color="var(--warning)" />
            </div>
          </div>
          <div className="stat-value">${totalPending.toLocaleString()}</div>
          <div className="stat-label">Pending Payment</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#FFEBEE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={24} color="var(--error)" />
            </div>
          </div>
          <div className="stat-value">${totalOverdue.toLocaleString()}</div>
          <div className="stat-label">Overdue</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#E3F2FD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={24} color="var(--primary)" />
            </div>
          </div>
          <div className="stat-value">
            {commissions.length > 0 ? ((totalEarned / commissions.reduce((sum, c) => sum + c.premium, 0)) * 100).toFixed(1) : 0}%
          </div>
          <div className="stat-label">Avg Commission Rate</div>
        </div>
      </div>

      {/* Commission Breakdown by Insurer */}
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Commission by Insurer</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Array.from(new Set(commissions.map(c => c.insurer))).map(insurer => {
              const insurerCommissions = commissions.filter(c => c.insurer === insurer)
              const total = insurerCommissions.reduce((sum, c) => sum + c.amount, 0)
              const paid = insurerCommissions.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.amount, 0)

              return (
                <div key={insurer}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{insurer}</span>
                    <span style={{ fontWeight: '600', color: 'var(--primary)' }}>${total.toLocaleString()}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(paid / total) * 100}%` }} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
                    ${paid.toLocaleString()} paid of ${total.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Monthly Trend</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['November 2024', 'October 2024', 'September 2024', 'August 2024'].map((month, index) => {
              const amount = [3180, 2850, 3200, 2950][index]
              return (
                <div key={month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{month}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                      {index === 0 ? 'Current month' : `${index} month${index > 1 ? 's' : ''} ago`}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '18px' }}>
                      ${amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="card">
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Commission Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Policy Number</th>
              <th>Client</th>
              <th>Insurer</th>
              <th>Premium</th>
              <th>Rate</th>
              <th>Commission</th>
              <th>Due Date</th>
              <th>Paid Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map(commission => (
              <tr key={commission.id}>
                <td style={{ fontWeight: '600' }}>{commission.policyNumber}</td>
                <td>{commission.clientName}</td>
                <td>{commission.insurer}</td>
                <td>${commission.premium.toLocaleString()}</td>
                <td>{commission.rate}%</td>
                <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                  ${commission.amount.toLocaleString()}
                </td>
                <td>{commission.dueDate}</td>
                <td>{commission.paidDate || '-'}</td>
                <td>
                  <span className={`badge ${
                    commission.status === 'Paid' ? 'badge-success' :
                    commission.status === 'Overdue' ? 'badge-error' :
                    'badge-warning'
                  }`}>
                    {commission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
