import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { cvData, jobTitle, jobDescription, jobCompany } = await request.json()

    if (!cvData || !jobTitle) {
      return NextResponse.json({ error: 'cvData and jobTitle are required' }, { status: 400 })
    }

    // Generate tailored CV
    const cvResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert ATS resume optimizer. Return only valid JSON.',
        },
        {
          role: 'user',
          content: `Tailor this CV for the specific job. Rewrite summary, reorder experience bullets, optimize keywords for ATS. Keep all information truthful - only reorder and rephrase.

ORIGINAL CV:
${JSON.stringify(cvData, null, 2).slice(0, 8000)}

JOB TITLE: ${jobTitle}
COMPANY: ${jobCompany || ''}
JOB DESCRIPTION:
${(jobDescription || '').slice(0, 4000)}

Return the tailored CV as JSON with same schema.`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const tailoredCV = JSON.parse(cvResponse.choices[0].message.content || '{}')

    // Generate cover letter
    const clResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Write a professional, tailored cover letter. Return only the cover letter text.',
        },
        {
          role: 'user',
          content: `Write a cover letter for this job application.

CANDIDATE:
Name: ${cvData.name}
Title: ${cvData.tagline}
Summary: ${cvData.summary}
Skills: ${Object.values(cvData.skills || {}).flat().slice(0, 10).join(', ')}

JOB:
Title: ${jobTitle}
Company: ${jobCompany || ''}
Description: ${(jobDescription || '').slice(0, 3000)}

Write 3-4 paragraphs. Be specific about WHY this company/role. No generic phrases.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const coverLetter = clResponse.choices[0].message.content || ''

    return NextResponse.json({ tailoredCV, coverLetter })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
