import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/require-user';

export async function GET() {
  try {
    const user = await requireUser();

    const progress = await prisma.userProgress.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Unable to fetch progress' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();

    const progress = await prisma.userProgress.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        overallScore: Number(body.overallScore ?? 0),
        gamesCompleted: Number(body.gamesCompleted ?? 0),
        activitiesCompleted: Number(body.activitiesCompleted ?? 0),
        accuracy: Number(body.accuracy ?? 0),
        timeSpent: Number(body.timeSpent ?? 0),
        currentStreak: Number(body.currentStreak ?? 0),
        improvementPercentage: Number(body.improvementPercentage ?? 0),
        weeklyPerformance: Array.isArray(body.weeklyPerformance) ? body.weeklyPerformance : undefined,
        monthlyPerformance: Array.isArray(body.monthlyPerformance) ? body.monthlyPerformance : undefined,
        gamePerformance: body.gamePerformance ?? undefined,
        activityPerformance: body.activityPerformance ?? undefined,
      },
      update: {
        overallScore: Number(body.overallScore ?? 0),
        gamesCompleted: Number(body.gamesCompleted ?? 0),
        activitiesCompleted: Number(body.activitiesCompleted ?? 0),
        accuracy: Number(body.accuracy ?? 0),
        timeSpent: Number(body.timeSpent ?? 0),
        currentStreak: Number(body.currentStreak ?? 0),
        improvementPercentage: Number(body.improvementPercentage ?? 0),
        weeklyPerformance: Array.isArray(body.weeklyPerformance) ? body.weeklyPerformance : undefined,
        monthlyPerformance: Array.isArray(body.monthlyPerformance) ? body.monthlyPerformance : undefined,
        gamePerformance: body.gamePerformance ?? undefined,
        activityPerformance: body.activityPerformance ?? undefined,
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Unable to update progress' }, { status: 500 });
  }
}
