import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/require-user';

export async function GET() {
  try {
    const user = await requireUser();

    const results = await prisma.gameResult.findMany({
      where: { userId: user.id },
      orderBy: { completedAt: 'desc' },
    });

    return NextResponse.json({ results });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Unable to fetch results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();

    const result = await prisma.gameResult.create({
      data: {
        userId: user.id,
        gameId: body.gameId,
        gameName: body.gameName,
        category: body.category,
        difficulty: body.difficulty,
        score: Number(body.score),
        accuracy: Number(body.accuracy),
        attempts: Number(body.attempts),
        completionTime: Number(body.completionTime),
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Unable to save game result' },
      { status: 500 }
    );
  }
}
