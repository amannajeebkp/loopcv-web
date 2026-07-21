import { NextResponse } from 'next/server'
import { generateJSON } from '@/lib/gemini'

export async function POST(request: Request) {
  try {
    const { cvData, jobTitle, jobDescription } = await request.json()

    if (!cvData || !jobTitle) {
      return NextResponse.json({ error: 'cvData and jobTitle are required' }, { status: 400 })
    }

    const matchResult = await generateJSON(
      `You are an expert job-matching AI. Score how well this candidate matches this job.

Return ONLY valid JSON:
{
  "match_score": 0-100,
  "strengths": ["reason1", "reason2", "reason3"],
  "gaps": ["gap1", "gap2"],
  "verdict": "strong_match|good_match|partial_match|weak_match"
}

CANDIDATE PROFILE:
${JSON.stringify(cvData, null, 2).slice(0, 6000)}

JOB POSTING:
Title: ${jobTitle}
Description:
${(jobDescription || '').slice(0, 4000)}`
    )

    return NextResponse.json(matchResult)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
