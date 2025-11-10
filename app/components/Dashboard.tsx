'use client'

import { Users, Shield, FileText, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { label: 'Total Clients', value: '1,234', change: '+12%', icon: Users, color: '#0066CC' },
    { label: 'Active Policies', value: '3,456', change: '+8%', icon: Shield, color: '#00B8D4' },
    { label: 'Pending Quotes', value: '89', change: '-5%', icon: FileText, color: '#FFB300' },
    { label: 'Monthly Commission', value: '$45,678', change: '+15%', icon: DollarSign, color: '#00C853' },
  ]

  const recentActivity = [
    { type: 'success', message: 'New policy issued for John Smith', time: '5 min ago' },
    { type: 'warning', message: 'Quote expiring in 2 days for ABC Corp', time: '1 hour ago' },
    { type: 'info', message: 'Claim approved for Jane Doe', time: '3 hours ago' },
    { type: 'success', message: 'Commission payment received', time: '5 hours ago' },
  ]

  const upcomingTasks = [
    { task: 'Follow up with Premium Insurance', due: 'Today', priority: 'high' },
    { task: 'Renew policy for Tech Solutions Inc', due: 'Tomorrow', priority: 'high' },
    { task: 'Send quote to Green Energy Ltd', due: 'Dec 15', priority: 'medium' },
    { task: 'Review claim documents', due: 'Dec 16', priority: 'low' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Welcome back! Here's what's happening with your insurance business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-4" style={{ marginBottom: '32px' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} color={stat.color} />
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: stat.change.startsWith('+') ? 'var(--success)' : 'var(--error)'
                }}>
                  {stat.change}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-2">
        {/* Recent Activity */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.map((activity, index) => {
              let Icon = AlertCircle
              let iconColor = 'var(--primary)'

              if (activity.type === 'success') {
                Icon = CheckCircle
                iconColor = 'var(--success)'
              } else if (activity.type === 'warning') {
                Icon = AlertCircle
                iconColor = 'var(--warning)'
              }

              return (
                <div key={index} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={20} color={iconColor} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>{activity.message}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{activity.time}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Upcoming Tasks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingTasks.map((task, index) => {
              const priorityColors = {
                high: 'var(--error)',
                medium: 'var(--warning)',
                low: 'var(--primary)'
              }

              return (
                <div key={index} style={{
                  padding: '12px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: priorityColors[task.priority as keyof typeof priorityColors]
                    }} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{task.task}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '2px' }}>
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {task.due}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn-primary">Add New Client</button>
          <button className="btn-primary">Create Quote</button>
          <button className="btn-primary">Issue Policy</button>
          <button className="btn-secondary">Register Claim</button>
          <button className="btn-secondary">Upload Document</button>
        </div>
      </div>
    </div>
  )
}
