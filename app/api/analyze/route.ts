import { NextResponse } from 'next/server'
import { generateJSON } from '@/lib/gemini'

export async function POST(request: Request) {
  try {
    const { cvText } = await request.json()

    if (!cvText) {
      return NextResponse.json({ error: 'CV text is required' }, { status: 400 })
    }

    const cvData = await generateJSON(
      `Extract and optimize this CV for ATS (Applicant Tracking System). Return ONLY valid JSON with this schema:

{
  "name": "Full Name",
  "tagline": "Professional Title (e.g., Senior Software Engineer)",
  "contact": {
    "email": "",
    "phone": "",
    "location": "City, Country",
    "linkedin": "",
    "github": "",
    "website": ""
  },
  "summary": "2-3 sentence professional summary with relevant keywords",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, Country",
      "dates": "Month YYYY – Month YYYY",
      "bullets": ["Impact-driven bullet point with action verb + task + quantifiable result"]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "School/University",
      "location": "City, Country",
      "dates": "YYYY – YYYY",
      "details": "GPA, honors, relevant coursework"
    }
  ],
  "skills": {
    "languages": ["Python", "JavaScript", "TypeScript"],
    "frameworks": ["React", "Next.js", "Node.js"],
    "tools": ["Docker", "Git", "AWS"],
    "cloud": ["AWS", "GCP", "Azure"],
    "other": ["Agile", "CI/CD", "TDD"]
  },
  "certifications": [{"name": "Cert Name", "issuer": "Issuer", "date": "YYYY"}],
  "projects": [{"name": "Project Name", "description": "Brief description", "link": ""}]
}

RULES:
- Rewrite experience bullet points to be impact-driven (action verb + task + quantifiable result)
- Ensure skills include industry-standard ATS keywords
- Make summary concise and keyword-rich
- Standardize dates to "Month YYYY – Month YYYY" format
- Keep ALL information truthful - do NOT invent experience
- Every bullet must start with a strong action verb
- Include 3-5 bullets per role maximum

CV TEXT:
---
${cvText.slice(0, 12000)}
---`
    )

    return NextResponse.json({ cvData })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
