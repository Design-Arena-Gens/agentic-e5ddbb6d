'use client'

import { useState } from 'react'
import { Shield, Users, FileText, DollarSign, BarChart3, Bell, MessageSquare, Calendar, Settings, Database, TrendingUp } from 'lucide-react'
import Dashboard from './components/Dashboard'
import ClientsModule from './components/ClientsModule'
import PoliciesModule from './components/PoliciesModule'
import QuotesModule from './components/QuotesModule'
import ClaimsModule from './components/ClaimsModule'
import CommissionsModule from './components/CommissionsModule'
import ReportsModule from './components/ReportsModule'
import CommunicationsModule from './components/CommunicationsModule'
import TasksModule from './components/TasksModule'
import DocumentsModule from './components/DocumentsModule'
import SettingsModule from './components/SettingsModule'
import Logo from './components/Logo'

export default function Home() {
  const [activeModule, setActiveModule] = useState('dashboard')

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'clients', name: 'Clients', icon: Users },
    { id: 'policies', name: 'Policies', icon: Shield },
    { id: 'quotes', name: 'Quotes', icon: FileText },
    { id: 'claims', name: 'Claims', icon: Bell },
    { id: 'commissions', name: 'Commissions', icon: DollarSign },
    { id: 'reports', name: 'Reports', icon: TrendingUp },
    { id: 'communications', name: 'Communications', icon: MessageSquare },
    { id: 'tasks', name: 'Tasks', icon: Calendar },
    { id: 'documents', name: 'Documents', icon: Database },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />
      case 'clients': return <ClientsModule />
      case 'policies': return <PoliciesModule />
      case 'quotes': return <QuotesModule />
      case 'claims': return <ClaimsModule />
      case 'commissions': return <CommissionsModule />
      case 'reports': return <ReportsModule />
      case 'communications': return <CommunicationsModule />
      case 'tasks': return <TasksModule />
      case 'documents': return <DocumentsModule />
      case 'settings': return <SettingsModule />
      default: return <Dashboard />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        background: 'var(--bg-primary)',
        borderRight: '1px solid var(--border)',
        padding: '24px 0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '0 24px', marginBottom: '32px' }}>
          <Logo size="large" />
        </div>

        <nav>
          {modules.map(module => {
            const Icon = module.icon
            const isActive = activeModule === module.id
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: isActive ? 'var(--bg-secondary)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={20} />
                {module.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '260px', flex: 1, padding: '32px' }}>
        {renderModule()}
      </div>
    </div>
  )
}
