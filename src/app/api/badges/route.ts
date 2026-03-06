import { NextRequest, NextResponse } from 'next/server';
import { getBadgeCounts, incrementBadge, isValidBadge } from '@/lib/store';
import { rateLimit } from '@/lib/rateLimit';

export async function GET() {
  return NextResponse.json(getBadgeCounts());
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(`badge-${ip}`, 6, 30000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { badge } = await req.json();
    if (!badge || !isValidBadge(badge)) {
      return NextResponse.json({ error: 'Invalid badge' }, { status: 400 });
    }
    const counts = incrementBadge(badge);
    return NextResponse.json(counts);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
