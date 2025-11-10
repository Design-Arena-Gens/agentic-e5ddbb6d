'use client'

import { useState } from 'react'
import { Calendar, Plus, CheckCircle, Clock, AlertCircle, X, Filter } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Todo' | 'In Progress' | 'Completed'
  dueDate: string
  assignedTo: string
  relatedTo: string
  category: string
}

export default function TasksModule() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Follow up with Premium Insurance', description: 'Discuss renewal terms for Q1 2025', priority: 'High', status: 'In Progress', dueDate: '2024-11-12', assignedTo: 'Me', relatedTo: 'ABC Corporation', category: 'Follow-up' },
    { id: '2', title: 'Send quote to Green Energy Ltd', description: 'Prepare commercial property insurance quote', priority: 'Medium', status: 'Todo', dueDate: '2024-11-15', assignedTo: 'Me', relatedTo: 'Green Energy Ltd', category: 'Sales' },
    { id: '3', title: 'Review claim documents for Jane Doe', description: 'Analyze water damage claim supporting docs', priority: 'High', status: 'Todo', dueDate: '2024-11-16', assignedTo: 'Me', relatedTo: 'Jane Doe', category: 'Claims' },
    { id: '4', title: 'Renew policy for Tech Solutions Inc', description: 'Cyber insurance policy renewal process', priority: 'Critical', status: 'Todo', dueDate: '2024-11-11', assignedTo: 'Me', relatedTo: 'Tech Solutions Inc', category: 'Renewal' },
    { id: '5', title: 'Client onboarding call', description: 'Welcome call for new client John Smith', priority: 'Medium', status: 'Completed', dueDate: '2024-11-08', assignedTo: 'Me', relatedTo: 'John Smith', category: 'Onboarding' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium' as Task['priority'],
    dueDate: '',
    relatedTo: '',
    category: ''
  })

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      relatedTo: '',
      category: ''
    })
    setShowModal(true)
  }

  const handleSave = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'Todo',
      dueDate: formData.dueDate,
      assignedTo: 'Me',
      relatedTo: formData.relatedTo,
      category: formData.category
    }
    setTasks([...tasks, newTask])
    setShowModal(false)
  }

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  const todoTasks = tasks.filter(t => t.status === 'Todo')
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress')
  const completedTasks = tasks.filter(t => t.status === 'Completed')

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Tasks & Calendar</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Manage your workflow with AI-powered task prioritization and reminders
        </p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select
              className="select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Status</option>
              <option value="Todo">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              className="select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={18} style={{ marginRight: '6px' }} />
            Add Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{todoTasks.length}</div>
          <div className="stat-label">To Do</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{inProgressTasks.length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completedTasks.length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length}
          </div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {/* To Do Column */}
        <div>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '12px 16px',
            borderRadius: '8px 8px 0 0',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>To Do</span>
            <span className="badge badge-warning">{todoTasks.length}</span>
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '0 0 8px 8px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '12px 16px',
            borderRadius: '8px 8px 0 0',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>In Progress</span>
            <span className="badge badge-info">{inProgressTasks.length}</span>
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '0 0 8px 8px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '12px 16px',
            borderRadius: '8px 8px 0 0',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Completed</span>
            <span className="badge badge-success">{completedTasks.length}</span>
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '0 0 8px 8px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Task</h2>
              <button className="icon-button" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="label">Task Title *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>

              <div className="form-group">
                <label className="label">Description</label>
                <textarea
                  className="textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add task details"
                />
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Priority *</label>
                  <select
                    className="select"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Due Date *</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="label">Related To</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.relatedTo}
                    onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
                    placeholder="Client or policy"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Category</label>
                  <select
                    className="select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    <option value="Sales">Sales</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Renewal">Renewal</option>
                    <option value="Claims">Claims</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task, onStatusChange }: { task: Task; onStatusChange: (id: string, status: Task['status']) => void }) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed'

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      padding: '14px',
      borderRadius: '8px',
      borderLeft: `4px solid ${
        task.priority === 'Critical' ? 'var(--error)' :
        task.priority === 'High' ? 'var(--warning)' :
        task.priority === 'Medium' ? 'var(--primary)' :
        'var(--text-light)'
      }`,
      cursor: 'pointer'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{task.title}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          {task.description}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <span className={`badge ${
          task.priority === 'Critical' ? 'badge-error' :
          task.priority === 'High' ? 'badge-warning' :
          'badge-info'
        }`} style={{ fontSize: '11px' }}>
          {task.priority}
        </span>
        <span className="badge badge-info" style={{ fontSize: '11px' }}>{task.category}</span>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Calendar size={12} />
        <span style={{ color: isOverdue ? 'var(--error)' : 'var(--text-light)' }}>
          {task.dueDate} {isOverdue && '(Overdue)'}
        </span>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        Related: {task.relatedTo}
      </div>

      <select
        className="select"
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
        style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <option value="Todo">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  )
}
