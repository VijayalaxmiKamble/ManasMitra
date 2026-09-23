'use client';

import { Brain, Sparkles, TrendingUp, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function HomePage() {
  const { progress, dailyChallenge } = useStore();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome to Manas Mitra</h1>
        <p className="text-lg opacity-90 mb-4">
          Your AI-powered cognitive assistance platform for memory, focus, and learning
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-gray-100 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Start Assessment
          </Link>
          <Link
            href="/daily-challenge"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            Daily Challenge
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Activities</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.activitiesCompleted}</p>
          <p className="text-xs text-muted-foreground mt-1">Completed</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.accuracy}%</p>
          <p className="text-xs text-muted-foreground mt-1">Average</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-5 w-5 text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Streak</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.currentStreak}</p>
          <p className="text-xs text-muted-foreground mt-1">Days</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Score</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.overallScore}</p>
          <p className="text-xs text-muted-foreground mt-1">Overall</p>
        </div>
      </div>

      {/* Daily Challenge */}
      {dailyChallenge && !dailyChallenge.completed && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Today&apos;s Challenge</h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {dailyChallenge.difficulty}
            </span>
          </div>
          <p className="text-muted-foreground mb-4">{dailyChallenge.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>⏱️ {dailyChallenge.estimatedTime} min</span>
              <span>🎁 {dailyChallenge.reward} points</span>
            </div>
            <Link
              href="/daily-challenge"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Challenge
            </Link>
          </div>
        </div>
      )}

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/learning"
            className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Brain className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Learning Hub</h3>
            <p className="text-sm text-muted-foreground">Explore educational activities</p>
          </Link>

          <Link
            href="/games"
            className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <TrendingUp className="h-8 w-8 text-success mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Games</h3>
            <p className="text-sm text-muted-foreground">Play cognitive games</p>
          </Link>

          <Link
            href="/daily-plan"
            className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Calendar className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Daily Plan</h3>
            <p className="text-sm text-muted-foreground">View your schedule</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
