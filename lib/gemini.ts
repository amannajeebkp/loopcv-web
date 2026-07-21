import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateJSON(prompt: string, systemPrompt: string = '') {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { temperature: 0.3 },
    systemInstruction: systemPrompt || 'You are a helpful AI assistant. Return only valid JSON.',
  })

  const result = await model.generateContent(prompt)
  const response = result.response.text()

  // Clean markdown fences if present
  let cleaned = response.trim()
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  return JSON.parse(cleaned)
}

export async function generateText(prompt: string, systemPrompt: string = '') {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
    systemInstruction: systemPrompt || 'You are a helpful AI assistant.',
  })

  const result = await model.generateContent(prompt)
  return result.response.text()
}
