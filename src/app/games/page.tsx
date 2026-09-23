'use client';

import { useStore } from '@/store/useStore';
import { Gamepad2, Clock, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Difficulty } from '@/types';
import { difficultyConfig, GameDifficulty } from '@/utils/gameConfig';

export default function GamesPage() {
  const { games } = useStore();
  const [difficulty, setDifficulty] = useState<GameDifficulty>('easy');
  const selectedConfig = difficultyConfig[difficulty];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Games</h1>
        <p className="text-muted-foreground">Play cognitive games to improve memory, focus, and problem-solving skills</p>
      </div>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-bold text-foreground">Choose Difficulty</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {(['easy', 'medium', 'hard'] as GameDifficulty[]).map((level) => {
            const config = difficultyConfig[level];
            return <button key={level} onClick={() => setDifficulty(level)} className={`rounded-xl border-2 p-4 text-left transition-colors ${difficulty === level ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}><span className="block font-bold text-foreground">{config.label}</span><span className="text-xs text-muted-foreground">{config.memoryPairs * 2} memory cards · {config.hints} hints · {config.memoryTime}s</span></button>;
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Selected level: <span className="font-semibold text-foreground">{selectedConfig.label}</span>. Every game adapts to this level.</p>
      </section>

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

            <p className="mb-4 text-xs text-muted-foreground">{game.id === '1' ? `${selectedConfig.memoryPairs * 2} cards · ${selectedConfig.memoryTime} seconds · ${selectedConfig.hints} hints` : game.id === '2' ? `${selectedConfig.sequenceQuestions} questions` : game.id === '3' ? `${selectedConfig.wordCount} words` : game.id === '4' ? `${selectedConfig.reactionRounds} rounds` : `${selectedConfig.colorRounds} rounds`}</p>
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
                href={`/games/${game.id}?difficulty=${difficulty}`}
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
