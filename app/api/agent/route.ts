import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const fallback = { intent: 'BONAFIDE_CERTIFICATE', department: 'Academic Administration', priority: 'NORMAL', purpose: 'Internship application', next_action: 'CREATE_REQUEST' }

export async function POST(req: Request) {
  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'Request text is required' }, { status: 400 })

  // Demo remains functional without a key; when GEMINI_API_KEY is present, the real agent classifies the request.
  if (!process.env.GEMINI_API_KEY) return NextResponse.json({ agent: fallback, mode: 'demo-fallback' })

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const prompt = `You are CampusOS, a university workflow agent. Analyze this student request and return ONLY valid JSON with keys intent, department, priority, purpose, next_action. Allowed workflows: BONAFIDE_CERTIFICATE, ID_CARD_REPLACEMENT, LEAVE_REQUEST. Allowed departments: Academic Administration, Student Services, Academic Department. Priority: LOW, NORMAL, HIGH. Request: ${text}`
    const result = await model.generateContent(prompt)
    const raw = result.response.text().replace(/```json|```/g, '').trim()
    const agent = JSON.parse(raw)
    return NextResponse.json({ agent, mode: 'gemini' })
  } catch {
    return NextResponse.json({ agent: fallback, mode: 'demo-fallback' })
  }
}
