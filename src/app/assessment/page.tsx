'use client';

import { useState } from 'react';
import { ClipboardCheck, Clock, CheckCircle, ArrowRight, ArrowLeft, TrendingUp, AlertCircle } from 'lucide-react';
import { mockAssessmentQuestions } from '@/data/mockData';
import { AssessmentResult } from '@/types';

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const question = mockAssessmentQuestions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < mockAssessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(mockAssessmentQuestions[currentQuestion + 1].timeLimit || 30);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    const categoryScores: Record<string, number> = {};

    mockAssessmentQuestions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (userAnswer === q.correctAnswer) {
        correctAnswers++;
      }

      if (!categoryScores[q.category]) {
        categoryScores[q.category] = 0;
      }
      if (userAnswer === q.correctAnswer) {
        categoryScores[q.category]++;
      }
    });

    const overallScore = (correctAnswers / mockAssessmentQuestions.length) * 100;

    Object.keys(categoryScores).forEach((category) => {
      const categoryQuestions = mockAssessmentQuestions.filter((q) => q.category === category).length;
      categoryScores[category] = (categoryScores[category] / categoryQuestions) * 100;
    });

    const strengths = Object.keys(categoryScores).filter((cat) => categoryScores[cat] >= 70);
    const areasForImprovement = Object.keys(categoryScores).filter((cat) => categoryScores[cat] < 70);

    setResult({
      overallScore,
      categoryScores: categoryScores as any,
      strengths: strengths as any,
      areasForImprovement: areasForImprovement as any,
      recommendedActivities: strengths.length > 0
        ? ['Continue practicing', 'Try advanced exercises']
        : ['Start with basic exercises', 'Focus on fundamentals'],
    });
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
    setTimeLeft(30);
  };

  if (showResults && result) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Assessment Results</h1>
          <p className="text-muted-foreground">Your cognitive performance insights</p>
        </div>

        {/* Overall Score */}
        <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Overall Score</h2>
              <p className="text-muted-foreground">Based on your performance across all categories</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold text-primary">{result.overallScore.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Category Performance</h3>
          <div className="space-y-4">
            {Object.entries(result.categoryScores).map(([category, score]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{category}</span>
                  <span className="text-sm font-semibold text-foreground">{score.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      score >= 70 ? 'bg-success' : score >= 50 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Areas for Improvement */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Strengths</h3>
            </div>
            {result.strengths.length > 0 ? (
              <ul className="space-y-2">
                {result.strengths.map((strength) => (
                  <li key={strength} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    {strength}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No strengths identified yet. Keep practicing!</p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-warning" />
              <h3 className="font-semibold text-foreground">Areas for Improvement</h3>
            </div>
            {result.areasForImprovement.length > 0 ? (
              <ul className="space-y-2">
                {result.areasForImprovement.map((area) => (
                  <li key={area} className="flex items-center gap-2 text-sm text-foreground">
                    <ArrowRight className="h-4 w-4 text-warning" />
                    {area}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Great job! No areas need immediate improvement.</p>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Recommended Activities</h3>
          <ul className="space-y-2">
            {result.recommendedActivities.map((activity) => (
              <li key={activity} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                {activity}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={resetAssessment}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Retake Assessment
        </button>

        <div className="rounded-xl border border-warning/20 bg-warning/5 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> These results are for general informational purposes only and do not constitute medical or diagnostic advice. Please consult a healthcare professional for proper evaluation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Cognitive Assessment</h1>
        <p className="text-muted-foreground">Evaluate your cognitive abilities across different areas</p>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {mockAssessmentQuestions.length}
          </span>
          <div className="flex items-center gap-2 text-primary">
            <Clock className="h-4 w-4" />
            <span className="font-semibold">{timeLeft}s</span>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / mockAssessmentQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-2">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {question.category}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${
                answers[currentQuestion] === index
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary text-white'
                      : 'border-border'
                  }`}
                >
                  {answers[currentQuestion] === index && <CheckCircle className="h-4 w-4" />}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === mockAssessmentQuestions.length - 1 ? 'Submit' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
