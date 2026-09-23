'use client';

import { useStore } from '@/store/useStore';
import { Gamepad2, Clock, Target, Zap } from 'lucide-react';
import Link from 'next/link';

export default function GamesPage() {
  const { games } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Games</h1>
        <p className="text-muted-foreground">Play cognitive games to improve memory, focus, and problem-solving skills</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{game.title}</h3>
                  <span className="text-xs text-muted-foreground">{game.category}</span>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  game.difficulty === 'Easy'
                    ? 'bg-success/10 text-success'
                    : game.difficulty === 'Medium'
                    ? 'bg-warning/10 text-warning'
                    : 'bg-error/10 text-error'
                }`}
              >
                {game.difficulty}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{game.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>Accuracy: {game.accuracy}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{game.timeSpent} min</span>
              </div>
            </div>

            {game.completed ? (
              <div className="flex items-center gap-2 text-success">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-semibold">Completed - Score: {game.score}</span>
              </div>
            ) : (
              <Link
                href={`/games/${game.id}`}
                className="block w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Play Now
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
