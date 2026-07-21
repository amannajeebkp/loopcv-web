'use client'

import { 
  TrendingUp, TrendingDown, BarChart3, 
  PieChart, Activity, Target
} from 'lucide-react'

export default function AnalyticsPage() {
  const stats = {
    totalJobs: 1247,
    totalApplied: 456,
    totalResponses: 67,
    totalInterviews: 23,
    responseRate: 14.7,
    interviewRate: 5.0,
  }

  const weeklyData = [
    { day: 'Mon', applications: 45, responses: 8 },
    { day: 'Tue', applications: 52, responses: 12 },
    { day: 'Wed', applications: 38, responses: 6 },
    { day: 'Thu', applications: 61, responses: 15 },
    { day: 'Fri', applications: 48, responses: 9 },
    { day: 'Sat', applications: 25, responses: 4 },
    { day: 'Sun', applications: 18, responses: 3 },
  ]

  const topCVs = [
    { name: 'CV - Software Engineer', applications: 234, responses: 45, rate: 19.2 },
    { name: 'CV - Full Stack', applications: 156, responses: 18, rate: 11.5 },
    { name: 'CV - Backend', applications: 66, responses: 4, rate: 6.1 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-500">Track your job search performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Response Rate', value: `${stats.responseRate}%`, change: '+2.3%', up: true, icon: Target },
          { label: 'Interview Rate', value: `${stats.interviewRate}%`, change: '+0.8%', up: true, icon: Activity },
          { label: 'Applications/Day', value: '45', change: '+12%', up: true, icon: BarChart3 },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-brand-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Activity</h3>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <span className="w-10 text-sm text-gray-500">{day.day}</span>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
                      style={{ width: `${(day.applications / 70) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="w-16 text-right text-sm font-medium text-gray-700">{day.applications}</span>
                <span className="w-16 text-right text-sm text-green-600">+{day.responses}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Funnel</h3>
          <div className="space-y-4">
            {[
              { label: 'Jobs Found', value: stats.totalJobs, width: '100%', color: 'bg-gray-200' },
              { label: 'Matched', value: Math.round(stats.totalJobs * 0.6), width: '60%', color: 'bg-blue-400' },
              { label: 'Applied', value: stats.totalApplied, width: '37%', color: 'bg-brand-500' },
              { label: 'Responses', value: stats.totalResponses, width: '15%', color: 'bg-green-500' },
              { label: 'Interviews', value: stats.totalInterviews, width: '5%', color: 'bg-purple-500' },
            ].map((stage, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{stage.label}</span>
                  <span className="font-semibold text-gray-900">{stage.value}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${stage.color} rounded-full`} style={{ width: stage.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing CVs */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing CVs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">CV Name</th>
                <th className="pb-3 font-medium">Applications</th>
                <th className="pb-3 font-medium">Responses</th>
                <th className="pb-3 font-medium">Response Rate</th>
              </tr>
            </thead>
            <tbody>
              {topCVs.map((cv, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-4 font-medium text-gray-900">{cv.name}</td>
                  <td className="py-4 text-gray-600">{cv.applications}</td>
                  <td className="py-4 text-gray-600">{cv.responses}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cv.rate > 15 ? 'bg-green-100 text-green-700' :
                      cv.rate > 10 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {cv.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
