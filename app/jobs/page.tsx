'use client'

import { useState } from 'react'
import { 
  ExternalLink, MapPin, Building2, Clock, 
  Star, Filter, Search, ChevronDown
} from 'lucide-react'

export default function JobsPage() {
  const [filter, setFilter] = useState('all')
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      score: 92,
      status: 'applied',
      source: 'LinkedIn',
      posted: '2 days ago',
      salary: '$180k - $250k',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Meta',
      location: 'Remote',
      score: 87,
      status: 'matched',
      source: 'Indeed',
      posted: '1 day ago',
      salary: '$160k - $220k',
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'Stripe',
      location: 'San Francisco, CA',
      score: 84,
      status: 'applied',
      source: 'Glassdoor',
      posted: '3 days ago',
      salary: '$170k - $230k',
    },
    {
      id: 4,
      title: 'ML Engineer',
      company: 'OpenAI',
      location: 'San Francisco, CA',
      score: 78,
      status: 'response',
      source: 'Greenhouse',
      posted: '5 days ago',
      salary: '$200k - $300k',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Netflix',
      location: 'Remote',
      score: 75,
      status: 'interview',
      source: 'Lever',
      posted: '1 week ago',
      salary: '$190k - $260k',
    },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Jobs</h2>
        <p className="text-gray-500">View all matched and applied jobs</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'matched', 'applied', 'response', 'interview'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === f
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="stat-card card-hover">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                    job.status === 'response' ? 'bg-green-100 text-green-700' :
                    job.status === 'interview' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" /> {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {job.posted}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">{job.salary}</span>
                  <span className="text-sm text-gray-400">via {job.source}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600">{job.score}%</div>
                  <div className="text-xs text-gray-400">Match</div>
                </div>
                <a
                  href="#"
                  className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
