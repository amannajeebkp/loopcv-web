'use client'

import { useState } from 'react'
import { 
  Plus, Play, Pause, Trash2, MapPin, Briefcase, 
  Calendar, MoreVertical, Zap
} from 'lucide-react'

export default function LoopsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loops, setLoops] = useState([
    {
      id: 1,
      name: 'Software Engineer - Remote',
      titles: ['Software Engineer', 'Full Stack Developer'],
      locations: ['Remote'],
      status: 'active',
      jobsFound: 234,
      applied: 89,
      responses: 12,
      createdAt: '2024-01-15',
      autoApply: true,
    },
    {
      id: 2,
      name: 'Product Manager - NYC',
      titles: ['Product Manager', 'Senior PM'],
      locations: ['New York'],
      status: 'paused',
      jobsFound: 67,
      applied: 23,
      responses: 3,
      createdAt: '2024-01-10',
      autoApply: true,
    },
  ])

  const [newLoop, setNewLoop] = useState({
    name: '',
    titles: '',
    locations: '',
    autoApply: true,
  })

  const handleCreate = () => {
    const loop = {
      id: loops.length + 1,
      name: newLoop.name,
      titles: newLoop.titles.split(',').map(t => t.trim()),
      locations: newLoop.locations.split(',').map(l => l.trim()),
      status: 'active',
      jobsFound: 0,
      applied: 0,
      responses: 0,
      createdAt: new Date().toISOString().split('T')[0],
      autoApply: newLoop.autoApply,
    }
    setLoops([...loops, loop])
    setShowCreateModal(false)
    setNewLoop({ name: '', titles: '', locations: '', autoApply: true })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Loops</h2>
          <p className="text-gray-500">Manage your automated job search loops</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create New Loop
        </button>
      </div>

      {/* Loops Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loops.map((loop) => (
          <div key={loop.id} className="stat-card card-hover">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                loop.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {loop.status === 'active' ? '● Active' : '○ Paused'}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{loop.name}</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {loop.titles.slice(0, 2).map((title, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  {title}
                </span>
              ))}
              {loop.locations.map((loc, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {loc}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{loop.jobsFound}</div>
                <div className="text-xs text-gray-500">Found</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-600">{loop.applied}</div>
                <div className="text-xs text-gray-500">Applied</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{loop.responses}</div>
                <div className="text-xs text-gray-500">Responses</div>
              </div>
            </div>

            <div className="flex gap-2">
              {loop.status === 'active' ? (
                <button className="flex-1 py-2 px-4 bg-yellow-100 text-yellow-700 rounded-xl font-medium hover:bg-yellow-200 transition flex items-center justify-center gap-2">
                  <Pause className="w-4 h-4" /> Pause
                </button>
              ) : (
                <button className="flex-1 py-2 px-4 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" /> Resume
                </button>
              )}
              <button className="py-2 px-4 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Job Loop</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loop Name</label>
                <input
                  type="text"
                  value={newLoop.name}
                  onChange={(e) => setNewLoop({ ...newLoop, name: e.target.value })}
                  placeholder="e.g., Software Engineer - Remote"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Titles (comma-separated)</label>
                <input
                  type="text"
                  value={newLoop.titles}
                  onChange={(e) => setNewLoop({ ...newLoop, titles: e.target.value })}
                  placeholder="Software Engineer, Full Stack Developer"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Locations (comma-separated)</label>
                <input
                  type="text"
                  value={newLoop.locations}
                  onChange={(e) => setNewLoop({ ...newLoop, locations: e.target.value })}
                  placeholder="Remote, New York, San Francisco"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="autoApply"
                  checked={newLoop.autoApply}
                  onChange={(e) => setNewLoop({ ...newLoop, autoApply: e.target.checked })}
                  className="w-5 h-5 text-brand-600 rounded"
                />
                <label htmlFor="autoApply" className="text-sm text-gray-700">
                  Enable Auto-Apply with AI
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 px-4 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 btn-primary"
              >
                Create Loop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
