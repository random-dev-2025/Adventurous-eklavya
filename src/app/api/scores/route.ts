import { NextRequest, NextResponse } from 'next/server';
import { getTopScores, addScore } from '@/lib/store';
import { rateLimit } from '@/lib/rateLimit';

export async function GET() {
  return NextResponse.json(getTopScores());
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(`score-${ip}`, 5, 60000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { score } = await req.json();
    if (typeof score !== 'number' || score < 0 || score > 500 || !Number.isInteger(score)) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
    }
    const top = addScore(score);
    return NextResponse.json(top);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
