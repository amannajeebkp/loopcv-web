import { NextResponse } from 'next/server'

// Job board search endpoints
const jobSources = [
  { name: 'remotive', url: 'https://remotive.com/api/remote-jobs' },
  { name: 'arbeitnow', url: 'https://www.arbeitnow.com/api/job-board-api' },
  { name: 'findwork', url: 'https://findwork.dev/api/jobs/' },
]

async function searchRemotive(query: string, limit: number) {
  try {
    const resp = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=${limit}`)
    if (!resp.ok) return []
    const data = await resp.json()
    return (data.jobs || []).slice(0, limit).map((j: any) => ({
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location,
      description: j.description?.slice(0, 500) || '',
      url: j.url,
      source: 'remotive',
      salary: '',
      posted: j.publication_date,
    }))
  } catch { return [] }
}

async function searchArbeitnow(query: string, limit: number) {
  try {
    const resp = await fetch('https://www.arbeitnow.com/api/job-board-api')
    if (!resp.ok) return []
    const data = await resp.json()
    const q = query.toLowerCase()
    return (data.data || [])
      .filter((j: any) => 
        j.title?.toLowerCase().includes(q) || 
        j.description?.toLowerCase().includes(q)
      )
      .slice(0, limit)
      .map((j: any) => ({
        title: j.title,
        company: j.company_name,
        location: j.location,
        description: j.description?.slice(0, 500) || '',
        url: j.url,
        source: 'arbeitnow',
        salary: '',
        posted: j.created_at,
      }))
  } catch { return [] }
}

async function searchFindwork(query: string, limit: number) {
  try {
    const resp = await fetch(`https://findwork.dev/api/jobs/?search=${encodeURIComponent(query)}`)
    if (!resp.ok) return []
    const data = await resp.json()
    return (data.results || []).slice(0, limit).map((j: any) => ({
      title: j.role,
      company: j.company_name,
      location: j.location,
      description: j.text?.slice(0, 500) || '',
      url: j.url,
      source: 'findwork',
      salary: '',
      posted: j.date_posted,
    }))
  } catch { return [] }
}

export async function POST(request: Request) {
  try {
    const { query, location, numResults = 20 } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // Search all sources in parallel
    const results = await Promise.allSettled([
      searchRemotive(query, numResults),
      searchArbeitnow(query, numResults),
      searchFindwork(query, numResults),
    ])

    // Combine and deduplicate
    const allJobs = results
      .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
      .flatMap((r) => r.value)

    // Deduplicate by title+company
    const seen = new Set()
    const uniqueJobs = allJobs.filter((job: any) => {
      const key = `${job.title?.toLowerCase()}|${job.company?.toLowerCase()}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    // Filter by location if provided
    const filteredJobs = location
      ? uniqueJobs.filter((j: any) => 
          j.location?.toLowerCase().includes(location.toLowerCase()) ||
          j.location?.toLowerCase().includes('remote')
        )
      : uniqueJobs

    return NextResponse.json({
      jobs: filteredJobs.slice(0, numResults),
      total: filteredJobs.length,
      sources: ['remotive', 'arbeitnow', 'findwork'],
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
