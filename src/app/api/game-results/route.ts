import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/require-user';

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

export async function GET() {
  try {
    const user = await requireUser();

    return NextResponse.json({ user: {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      caregiverName: user.caregiverName,
      createdAt: user.createdAt,
    } });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ error: 'Unable to fetch user' }, { status: 500 });
  }
}
