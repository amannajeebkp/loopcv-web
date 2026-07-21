import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { cvText } = await request.json()

    if (!cvText) {
      return NextResponse.json({ error: 'CV text is required' }, { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert ATS resume optimizer. Return only valid JSON.',
        },
        {
          role: 'user',
          content: `Extract and optimize this CV for ATS. Return JSON with: name, tagline, contact (email, phone, location, linkedin, github, website), summary, experience (title, company, location, dates, bullets), education (degree, institution, dates), skills (languages, frameworks, tools, cloud, other), certifications, projects.

CV TEXT:
---
${cvText.slice(0, 12000)}
---`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content
    const cvData = JSON.parse(content || '{}')

    return NextResponse.json({ cvData })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
