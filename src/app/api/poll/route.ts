import { NextRequest, NextResponse } from 'next/server';
import { getPollCounts, incrementPoll, isValidPollOption } from '@/lib/store';
import { rateLimit } from '@/lib/rateLimit';

export async function GET() {
  return NextResponse.json(getPollCounts());
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(`poll-${ip}`, 2, 60000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { option } = await req.json();
    if (!option || !isValidPollOption(option)) {
      return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
    }
    const counts = incrementPoll(option);
    return NextResponse.json(counts);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
