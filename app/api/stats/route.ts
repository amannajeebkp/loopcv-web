import { NextResponse } from 'next/server'

// Simple stats endpoint
export async function GET() {
  return NextResponse.json({
    jobsFound: 1247,
    applied: 456,
    responses: 67,
    interviews: 23,
    responseRate: 14.7,
    interviewRate: 5.0,
    emailsSent: 89,
    emailsOpened: 34,
  })
}
