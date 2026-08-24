'use client';

import { ProgressBar } from '@/src/components/ProgressBar';
import { useProgress } from '@/src/hooks/useProgress';

export function ProgressPage() {
  const { stats, resetProgress } = useProgress();

  const confirmReset = () => {
    if (window.confirm('Reset all saved citizenship practice progress on this browser?')) {
      resetProgress();
    }
  };

  return (
    <div className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Progress</p>
        <h1 className="text-3xl font900 text-[var(--navy-strong)]">Progress Dashboard</h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--muted)]">
          Track studied questions, correct answers, favorites, practice sessions, and review needs.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card grid gap-5 p-5">
          <h2 className="text-xl font900 text-[var(--navy-strong)]">Overall Progress</h2>
          <ProgressBar
            label={`${stats.studied} / ${stats.totalQuestions} Questions Studied`}
            value={stats.studied}
            max={stats.totalQuestions}
          />
          <div className="grid grid-cols-2 gap-3">
            <ProgressStat label="Correct" value={stats.correct} />
            <ProgressStat label="Need Review" value={stats.needReview} />
            <ProgressStat label="Favorites" value={stats.favorites} />
            <ProgressStat label="Practice Sessions" value={stats.practiceSessions} />
          </div>
          <button
            className="focus-ring w-fit rounded-md border border-[var(--border)] px-4 py-3 text-sm font900 text-[var(--red)] hover:bg-[var(--surface-muted)]"
            type="button"
            onClick={confirmReset}
          >
            Reset Progress
          </button>
        </div>

        <div className="card grid gap-5 p-5">
          <h2 className="text-xl font900 text-[var(--navy-strong)]">Progress by Category</h2>
          <div className="grid gap-4">
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
        </div>
      </section>
    </div>
  );
}

function ProgressStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      <p className="text-sm font800 text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font900 text-[var(--navy-strong)]">{value}</p>
    </div>
  );
}
