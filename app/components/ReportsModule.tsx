'use client'

import { useState } from 'react'
import { BarChart3, Download, Filter, Calendar } from 'lucide-react'

export default function ReportsModule() {
  const [reportType, setReportType] = useState('sales')
  const [dateRange, setDateRange] = useState('thisMonth')

  const reportTypes = [
    { id: 'sales', name: 'Sales Performance', description: 'Track policy sales and revenue' },
    { id: 'commission', name: 'Commission Report', description: 'Commission earnings breakdown' },
    { id: 'client', name: 'Client Analysis', description: 'Client retention and growth' },
    { id: 'policy', name: 'Policy Report', description: 'Policy status and renewals' },
    { id: 'claims', name: 'Claims Analysis', description: 'Claims frequency and amounts' },
    { id: 'insurer', name: 'Insurer Performance', description: 'Compare insurer metrics' },
  ]

  const salesData = [
    { month: 'Jan', policies: 45, premium: 125000, commission: 15000 },
    { month: 'Feb', policies: 52, premium: 145000, commission: 17400 },
    { month: 'Mar', policies: 48, premium: 138000, commission: 16560 },
    { month: 'Apr', policies: 61, premium: 168000, commission: 20160 },
    { month: 'May', policies: 55, premium: 152000, commission: 18240 },
    { month: 'Jun', policies: 58, premium: 159000, commission: 19080 },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Reports & Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Generate insights with AI-powered analytics and custom reports
        </p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              className="select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{ width: 'auto', minWidth: '200px' }}
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>

            <select
              className="select"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="thisYear">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary">
              <Filter size={18} style={{ marginRight: '6px' }} />
              Advanced Filters
            </button>
            <button className="btn-primary">
              <Download size={18} style={{ marginRight: '6px' }} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-4" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-value">324</div>
          <div className="stat-label">Total Policies Sold</div>
          <div style={{ fontSize: '13px', color: 'var(--success)', marginTop: '8px', fontWeight: '500' }}>
            ↑ 18% vs last period
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$887K</div>
          <div className="stat-label">Total Premium Volume</div>
          <div style={{ fontSize: '13px', color: 'var(--success)', marginTop: '8px', fontWeight: '500' }}>
            ↑ 22% vs last period
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$106K</div>
          <div className="stat-label">Total Commission</div>
          <div style={{ fontSize: '13px', color: 'var(--success)', marginTop: '8px', fontWeight: '500' }}>
            ↑ 15% vs last period
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">92%</div>
          <div className="stat-label">Client Retention Rate</div>
          <div style={{ fontSize: '13px', color: 'var(--success)', marginTop: '8px', fontWeight: '500' }}>
            ↑ 3% vs last period
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Monthly Sales Trend</h2>
          <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '20px 0' }}>
            {salesData.map(data => (
              <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)' }}>
                  {data.policies}
                </div>
                <div style={{
                  width: '100%',
                  height: `${(data.policies / 70) * 250}px`,
                  background: 'linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%)',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.3s'
                }} />
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {data.month}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Premium by Policy Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 0' }}>
            {[
              { type: 'Auto Insurance', amount: 285000, color: '#0066CC', percentage: 32 },
              { type: 'Commercial Property', amount: 245000, color: '#00B8D4', percentage: 28 },
              { type: 'Home Insurance', amount: 178000, color: '#00C853', percentage: 20 },
              { type: 'Life Insurance', amount: 125000, color: '#FFB300', percentage: 14 },
              { type: 'Cyber Insurance', amount: 54000, color: '#FF6B35', percentage: 6 },
            ].map(item => (
              <div key={item.type}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>{item.type}</span>
                  <span style={{ fontWeight: '600' }}>${(item.amount / 1000).toFixed(0)}K</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    background: item.color,
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Top Clients by Premium</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Policies</th>
                <th>Total Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'ABC Corporation', policies: 8, premium: 85000 },
                { name: 'Tech Solutions Inc', policies: 5, premium: 45000 },
                { name: 'Green Energy Ltd', policies: 4, premium: 38000 },
                { name: 'Manufacturing Co', policies: 6, premium: 32000 },
                { name: 'Retail Group', policies: 3, premium: 28000 },
              ].map((client, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '600' }}>{client.name}</td>
                  <td>{client.policies}</td>
                  <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                    ${client.premium.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Top Insurers by Volume</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Insurer</th>
                <th>Policies</th>
                <th>Total Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Allianz', policies: 52, premium: 245000 },
                { name: 'State Farm', policies: 68, premium: 198000 },
                { name: 'AIG', policies: 45, premium: 187000 },
                { name: 'Liberty Mutual', policies: 58, premium: 156000 },
                { name: 'Chubb', policies: 38, premium: 145000 },
              ].map((insurer, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '600' }}>{insurer.name}</td>
                  <td>{insurer.policies}</td>
                  <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                    ${insurer.premium.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card">
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🤖 AI-Powered Insights
        </h2>
        <div className="grid grid-2">
          <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--success)' }}>
              📈 Growth Opportunity
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              Your auto insurance sales are up 25% this quarter. Consider targeting similar demographics for expansion.
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--warning)' }}>
              ⚠️ Renewal Alert
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              15 policies worth $125K are expiring in the next 30 days. Proactive outreach recommended.
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--primary)' }}>
              💡 Cross-Sell Potential
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              22 clients with only auto insurance could benefit from home insurance bundles.
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--success)' }}>
              🎯 Performance Highlight
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              You're in the top 10% of brokers for client satisfaction scores this quarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
