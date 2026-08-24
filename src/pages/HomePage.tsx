'use client';

import Link from 'next/link';
import { ButtonLink } from '@/src/components/ButtonLink';
import { ProgressBar } from '@/src/components/ProgressBar';
import { questions } from '@/src/data/questions';
import { useProgress } from '@/src/hooks/useProgress';
import { getQuestionById } from '@/src/utils/questions';

export function HomePage() {
  const { progress, stats } = useProgress();
  const lastQuestion = getQuestionById(progress.lastStudiedQuestionId);
  const lastQuestionIndex = lastQuestion
    ? questions.findIndex((question) => question.id === lastQuestion.id) + 1
    : null;

  return (
    <div className="page-shell">
      <section className="grid gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <p className="eyebrow">Independent study tool</p>
            <h1 className="max-w-3xl text-4xl font900 leading-tight text-[var(--navy-strong)] sm:text-5xl">
              Prepare for Your U.S. Naturalization Interview
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)]">
              Practice interview questions, civics, pronunciation, and important vocabulary at your own pace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/practice">Start Practicing</ButtonLink>
            <ButtonLink href="/study" variant="secondary">
              Study Questions
            </ButtonLink>
          </div>
          {lastQuestion ? (
            <div className="card grid gap-3 p-4">
              <p className="text-sm font900 text-[var(--red)]">Continue Studying</p>
              <p className="text-lg font900 text-[var(--foreground)]">
                Continue from Question {lastQuestionIndex}
              </p>
              <p className="line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                {lastQuestion.question}
              </p>
              <Link
                className="focus-ring w-fit rounded-md px-3 py-2 text-sm font900 text-[var(--blue)] hover:bg-[var(--surface-muted)]"
                href="/study"
              >
                Continue
              </Link>
            </div>
          ) : null}
        </div>

        <div className="card grid gap-5 p-5">
          <div className="grid gap-1">
            <h2 className="text-xl font900 text-[var(--navy-strong)]">Today&apos;s Progress</h2>
            <p className="text-sm leading-6 text-[var(--muted)]">
              Your progress is saved in this browser.
            </p>
          </div>
          <ProgressBar
            label="Overall Progress"
            value={stats.studied}
            max={stats.totalQuestions}
            detail={`${stats.studied} / ${stats.totalQuestions} studied`}
          />
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Questions Studied" value={stats.studied} />
            <StatCard label="Correct Answers" value={stats.correct} />
            <StatCard label="Need Review" value={stats.needReview} />
            <StatCard label="Current Streak" value={`${stats.streakDays} days`} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 py-8">
        <div className="page-heading">
          <p className="eyebrow">Study options</p>
          <h2 className="text-3xl font900 text-[var(--navy-strong)]">Choose a practice mode</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ActionCard
            title="Study All Questions"
            description="Review questions and answers one by one."
            href="/study"
            action="Start Studying"
          />
          <ActionCard
            title="Mock Interview"
            description="Practice without seeing the answers first."
            href="/practice"
            action="Start Interview"
          />
          <ActionCard
            title="Review Mistakes"
            description="Practice questions you previously marked incorrect."
            href="/review?tab=incorrect"
            action="Review"
          />
          <ActionCard
            title="Random Practice"
            description="Practice questions from random categories."
            href="/practice"
            action="Start Random Practice"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      <p className="text-sm font800 text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font900 text-[var(--navy-strong)]">{value}</p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <article className="card grid content-between gap-5 p-5">
      <div className="grid gap-2">
        <h3 className="text-xl font900 text-[var(--navy-strong)]">{title}</h3>
        <p className="text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
      <ButtonLink href={href} variant="secondary">
        {action}
      </ButtonLink>
    </article>
  );
}
