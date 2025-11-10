'use client'

import { useState } from 'react'
import { User, Bell, Shield, Palette, Database, Mail, Calendar, DollarSign } from 'lucide-react'

export default function SettingsModule() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Database },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Customize your platform preferences and configurations
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px' }}>
        {/* Sidebar Tabs */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '12px 16px',
                    background: activeTab === tab.id ? 'var(--bg-secondary)' : 'transparent',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === tab.id ? '600' : '500',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'integrations' && <IntegrationSettings />}
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Profile Settings</h2>

      <div style={{ marginBottom: '32px' }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          fontWeight: '700',
          color: 'white',
          marginBottom: '16px'
        }}>
          AB
        </div>
        <button className="btn-secondary">Change Photo</button>
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="label">First Name</label>
          <input type="text" className="input" defaultValue="Alex" />
        </div>
        <div className="form-group">
          <label className="label">Last Name</label>
          <input type="text" className="input" defaultValue="Broker" />
        </div>
      </div>

      <div className="form-group">
        <label className="label">Email</label>
        <input type="email" className="input" defaultValue="alex@insurehub.com" />
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="label">Phone</label>
          <input type="tel" className="input" defaultValue="+1 234 567 8900" />
        </div>
        <div className="form-group">
          <label className="label">License Number</label>
          <input type="text" className="input" defaultValue="INS-12345678" />
        </div>
      </div>

      <div className="form-group">
        <label className="label">Business Name</label>
        <input type="text" className="input" defaultValue="Alex Insurance Services" />
      </div>

      <div className="form-group">
        <label className="label">Address</label>
        <textarea className="textarea" defaultValue="123 Insurance Street, Suite 100, New York, NY 10001" />
      </div>

      <button className="btn-primary">Save Changes</button>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Notification Preferences</h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={18} />
          Email Notifications
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <NotificationToggle label="Policy renewals approaching" defaultChecked={true} />
          <NotificationToggle label="New quote requests" defaultChecked={true} />
          <NotificationToggle label="Claim updates" defaultChecked={true} />
          <NotificationToggle label="Commission payments" defaultChecked={true} />
          <NotificationToggle label="Daily summary digest" defaultChecked={false} />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} />
          In-App Notifications
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <NotificationToggle label="Task reminders" defaultChecked={true} />
          <NotificationToggle label="Client messages" defaultChecked={true} />
          <NotificationToggle label="System updates" defaultChecked={false} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} />
          Reminder Settings
        </h3>
        <div className="form-group">
          <label className="label">Policy Renewal Reminder (days before)</label>
          <select className="select">
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30" selected>30 days</option>
            <option value="60">60 days</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Quote Expiry Reminder (days before)</label>
          <select className="select">
            <option value="3">3 days</option>
            <option value="7" selected>7 days</option>
            <option value="14">14 days</option>
          </select>
        </div>
      </div>

      <button className="btn-primary">Save Preferences</button>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Security Settings</h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Change Password</h3>
        <div className="form-group">
          <label className="label">Current Password</label>
          <input type="password" className="input" />
        </div>
        <div className="form-group">
          <label className="label">New Password</label>
          <input type="password" className="input" />
        </div>
        <div className="form-group">
          <label className="label">Confirm New Password</label>
          <input type="password" className="input" />
        </div>
        <button className="btn-primary">Update Password</button>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Two-Factor Authentication</h3>
        <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>2FA Status</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Disabled</div>
            </div>
            <button className="btn-primary">Enable 2FA</button>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Active Sessions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { device: 'Chrome on Windows', location: 'New York, NY', time: 'Current session', current: true },
            { device: 'Safari on iPhone', location: 'New York, NY', time: '2 hours ago', current: false },
          ].map((session, index) => (
            <div key={index} style={{
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{session.device}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {session.location} • {session.time}
                </div>
              </div>
              {!session.current && (
                <button className="btn-danger">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AppearanceSettings() {
  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Appearance Settings</h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Theme</h3>
        <div className="grid grid-3" style={{ gap: '16px' }}>
          {[
            { name: 'Light', active: true },
            { name: 'Dark', active: false },
            { name: 'Auto', active: false },
          ].map(theme => (
            <div
              key={theme.name}
              style={{
                padding: '20px',
                background: theme.active ? 'var(--primary)' : 'var(--bg-secondary)',
                color: theme.active ? 'white' : 'var(--text-primary)',
                borderRadius: '12px',
                textAlign: 'center',
                fontWeight: '600',
                cursor: 'pointer',
                border: theme.active ? '2px solid var(--primary)' : '2px solid transparent'
              }}
            >
              {theme.name}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Color Scheme</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { name: 'Blue', color: '#0066CC' },
            { name: 'Green', color: '#00C853' },
            { name: 'Purple', color: '#7C4DFF' },
            { name: 'Orange', color: '#FF6B35' },
          ].map(scheme => (
            <div
              key={scheme.name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: scheme.color,
                cursor: 'pointer',
                border: scheme.name === 'Blue' ? '3px solid var(--text-primary)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '12px'
              }}
            >
              {scheme.name === 'Blue' && '✓'}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Display Options</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <NotificationToggle label="Compact view" defaultChecked={false} />
          <NotificationToggle label="Show sidebar icons only" defaultChecked={false} />
          <NotificationToggle label="Enable animations" defaultChecked={true} />
        </div>
      </div>

      <button className="btn-primary" style={{ marginTop: '24px' }}>Save Appearance</button>
    </div>
  )
}

function IntegrationSettings() {
  const integrations = [
    { name: 'Google Calendar', description: 'Sync tasks and appointments', icon: Calendar, connected: true, color: '#4285F4' },
    { name: 'QuickBooks', description: 'Sync commissions and payments', icon: DollarSign, connected: false, color: '#2CA01C' },
    { name: 'Gmail', description: 'Send emails directly from platform', icon: Mail, connected: true, color: '#EA4335' },
    { name: 'Slack', description: 'Get notifications in Slack', icon: Bell, connected: false, color: '#4A154B' },
  ]

  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Integrations</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {integrations.map(integration => {
          const Icon = integration.icon
          return (
            <div key={integration.name} style={{
              padding: '20px',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: integration.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} color={integration.color} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                    {integration.name}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {integration.description}
                  </div>
                </div>
              </div>
              <div>
                {integration.connected ? (
                  <>
                    <span className="badge badge-success" style={{ marginRight: '12px' }}>Connected</span>
                    <button className="btn-secondary">Disconnect</button>
                  </>
                ) : (
                  <button className="btn-primary">Connect</button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '32px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>API Access</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Generate API keys to integrate InsureHub Pro with your custom applications
        </p>
        <button className="btn-secondary">Manage API Keys</button>
      </div>
    </div>
  )
}

function NotificationToggle({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0'
    }}>
      <span style={{ fontSize: '14px' }}>{label}</span>
      <label style={{
        position: 'relative',
        display: 'inline-block',
        width: '48px',
        height: '24px',
        cursor: 'pointer'
      }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: checked ? 'var(--primary)' : 'var(--border)',
          borderRadius: '24px',
          transition: 'all 0.3s'
        }}>
          <span style={{
            position: 'absolute',
            content: '""',
            height: '18px',
            width: '18px',
            left: checked ? '27px' : '3px',
            bottom: '3px',
            background: 'white',
            borderRadius: '50%',
            transition: 'all 0.3s'
          }} />
        </span>
      </label>
    </div>
  )
}
