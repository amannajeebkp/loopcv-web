import { NextResponse } from 'next/server'
import { generateJSON, generateText } from '@/lib/gemini'

export async function POST(request: Request) {
  try {
    const { cvData, jobTitle, jobDescription, jobCompany } = await request.json()

    if (!cvData || !jobTitle) {
      return NextResponse.json({ error: 'cvData and jobTitle are required' }, { status: 400 })
    }

    // Generate tailored CV
    const tailoredCV = await generateJSON(
      `Tailor this CV for the specific job posting. Return ONLY valid JSON with the same schema.

INSTRUCTIONS:
1. Rewrite summary to highlight relevant experience for THIS role
2. Reorder and rewrite experience bullets to emphasize matching skills
3. Adjust skills section to prioritize keywords from the job description
4. Keep ALL information truthful - only reorder and rephrase, don't invent
5. Ensure every bullet starts with a strong action verb
6. Target: pass ATS screening AND impress human recruiters

ORIGINAL CV:
${JSON.stringify(cvData, null, 2).slice(0, 8000)}

JOB TITLE: ${jobTitle}
COMPANY: ${jobCompany || ''}
JOB DESCRIPTION:
${(jobDescription || '').slice(0, 4000)}`
    )

    // Generate cover letter
    const coverLetter = await generateText(
      `Write a professional, tailored cover letter for this job application.

GUIDELINES:
- 3-4 paragraphs maximum
- Opening: Express genuine interest and mention the specific role
- Middle: Connect your experience to their requirements (2-3 specific examples)
- Closing: Express enthusiasm and call to action
- Tone: Professional but personable, not generic
- Length: 250-400 words
- Do NOT use generic phrases like "I am writing to express my interest"
- Be specific about WHY this company/role appeals to you

CANDIDATE:
Name: ${cvData.name}
Title: ${cvData.tagline}
Summary: ${cvData.summary}
Key Skills: ${Object.values(cvData.skills || {}).flat().slice(0, 10).join(', ')}

JOB:
Title: ${jobTitle}
Company: ${jobCompany || ''}
Description: ${(jobDescription || '').slice(0, 3000)}

Return ONLY the cover letter text, nothing else.`
    )

    return NextResponse.json({ tailoredCV, coverLetter })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
