'use client'

import { useState, useEffect } from 'react'
import { 
  Briefcase, Send, MessageSquare, TrendingUp, 
  ArrowUpRight, Clock, Target, Users
} from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    jobsFound: 0,
    applied: 0,
    responses: 0,
    interviews: 0,
    responseRate: 0,
    interviewRate: 0,
  })

  const [recentJobs, setRecentJobs] = useState([
    { id: 1, title: 'Senior Software Engineer', company: 'Google', score: 92, status: 'applied' },
    { id: 2, title: 'Full Stack Developer', company: 'Meta', score: 87, status: 'matched' },
    { id: 3, title: 'Backend Engineer', company: 'Stripe', score: 84, status: 'applied' },
    { id: 4, title: 'ML Engineer', company: 'OpenAI', score: 78, status: 'response' },
  ])

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
        <p className="text-white/80">Your AI agent is working hard. Here is your job search overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Jobs Found', value: stats.jobsFound, icon: Briefcase, color: 'blue', change: '+12%' },
          { label: 'Applications Sent', value: stats.applied, icon: Send, color: 'green', change: '+8%' },
          { label: 'Responses', value: stats.responses, icon: MessageSquare, color: 'purple', change: '+23%' },
          { label: 'Interviews', value: stats.interviews, icon: TrendingUp, color: 'orange', change: '+15%' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Loop */}
        <div className="lg:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Active Job Loop</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Running
            </span>
          </div>
          
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.company}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-brand-600">{job.score}%</div>
                    <div className="text-xs text-gray-400">Match</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                    job.status === 'response' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Start New Loop', icon: Target, href: '/loops', color: 'bg-brand-500' },
              { label: 'Upload CV', icon: Briefcase, href: '/settings', color: 'bg-purple-500' },
              { label: 'View Analytics', icon: TrendingUp, href: '/analytics', color: 'bg-green-500' },
            ].map((action, i) => (
              <a
                key={i}
                href={action.href}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition" />
              </a>
            ))}
          </div>

          {/* Performance Summary */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">This Week</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-semibold text-gray-900">{stats.responseRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Interview Rate</span>
                <span className="font-semibold text-gray-900">{stats.interviewRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
