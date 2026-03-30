import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SYSTEM_PROMPT = `
You are dot. Systemic Impact Brief Builder.

Write in a tone that feels clear, strategic, human, and grounded.
Avoid empty jargon. Do not jump too fast into solutions.

Your job is to turn an initial challenge into a first systemic reading.

Return ONLY valid JSON with this exact shape:
{
  "assistantMessage": "string",
  "brief": {
    "title": "string",
    "challenge": "string",
    "context": "string",
    "desiredOutcome": "string",
    "firstRead": "string",
    "firstAction": "string"
  }
}

Guidelines:
- assistantMessage should sound like a short, useful note from dot.
- title should be short and strong.
- challenge should restate the issue clearly.
- context should situate the challenge naturally.
- desiredOutcome should reflect what the user wants to get.
- firstRead should offer a first systemic interpretation.
- firstAction should suggest a first pilot, initiative, or move in generic terms, not only governance.
- Keep everything concise, specific, and readable.
`;

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Falta configurar OPENAI_API_KEY en el servidor.' },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const body = await req.json();
    const { challenge = '', context = '', goal = '', email = '' } = body ?? {};

    if (!challenge.trim() || !goal.trim()) {
      return NextResponse.json(
        { error: 'Faltan datos mínimos para generar el brief.' },
        { status: 400 }
      );
    }

    const userInput = `
Reto:
${challenge}

Contexto:
${context}

Qué le gustaría obtener:
${goal}

Email:
${email || 'No facilitado'}
`;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1',
      input: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userInput },
      ],
      text: {
        verbosity: 'low',
      },
    });

    const raw = response.output_text?.trim();

    if (!raw) {
      return NextResponse.json(
        { error: 'La respuesta del modelo llegó vacía.' },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        {
          error: 'El modelo no devolvió JSON válido.',
          raw,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('systemic-impact-brief error:', error);
    return NextResponse.json(
      { error: 'No hemos podido generar el brief ahora mismo.' },
      { status: 500 }
    );
  }
}
