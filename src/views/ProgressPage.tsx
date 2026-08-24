'use client';

import type { ReactNode } from 'react';
import { Bookmark, CheckCircle2, RotateCcw, Trophy } from 'lucide-react';
import { ProgressBar } from '@/src/components/ProgressBar';
import { questionSetMeta } from '@/src/data/questions';
import { useProgress } from '@/src/hooks/useProgress';

export function ProgressPage() {
  const { stats, resetProgress } = useProgress();
  const percent =
    stats.totalQuestions === 0 ? 0 : Math.round((stats.studied / stats.totalQuestions) * 100);

  const confirmReset = () => {
    if (window.confirm('Reset all saved citizenship practice progress on this browser?')) {
      resetProgress();
    }
  };

  return (
    <div className="page-shell">
      <section className="progress-hero">
        <div>
          <p className="section-label">Your Progress</p>
          <h1>{stats.studied} / {questionSetMeta.totalQuestions} studied</h1>
          <p>{percent}% complete across the official 2025 civics question set.</p>
        </div>
        <ProgressBar
          label="Overall Progress"
          value={stats.studied}
          max={questionSetMeta.totalQuestions}
          detail={`${percent}%`}
        />
      </section>

      <section className="metric-grid" aria-label="Progress metrics">
        <MetricCard icon={<Trophy aria-hidden="true" size={20} />} label="Studied" value={stats.studied} />
        <MetricCard icon={<CheckCircle2 aria-hidden="true" size={20} />} label="Mastered" value={stats.correct} />
        <MetricCard icon={<RotateCcw aria-hidden="true" size={20} />} label="Need Practice" value={stats.needReview} />
        <MetricCard icon={<Bookmark aria-hidden="true" size={20} />} label="Saved" value={stats.favorites} />
      </section>

      <section className="category-progress-panel">
        <div className="panel-heading">
          <h2>Progress by Official Category</h2>
          <button
            className="secondary-action danger focus-ring"
            type="button"
            onClick={confirmReset}
          >
            Reset Progress
          </button>
        </div>
        <div className="category-progress-list">
          {stats.categoryProgress.map((category) => (
            <ProgressBar
              key={category.category}
              label={category.category}
              value={category.studied}
              max={category.total}
              detail={`${category.percent}%`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <article className="metric-card">
      <div>{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
