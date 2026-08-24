'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, GraduationCap, ListChecks, RotateCcw } from 'lucide-react';
import { ButtonLink } from '@/src/components/ButtonLink';
import { ProgressBar } from '@/src/components/ProgressBar';
import { USFlagMark } from '@/src/components/USFlagMark';
import { questionSetMeta, questions } from '@/src/data/questions';
import { useProgress } from '@/src/hooks/useProgress';

export function HomePage() {
  const { stats } = useProgress();
  const percent =
    stats.totalQuestions === 0 ? 0 : Math.round((stats.studied / stats.totalQuestions) * 100);

  return (
    <div className="page-shell home-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="section-label">
            <USFlagMark label="U.S. naturalization preparation" />
            U.S. Naturalization Preparation
          </p>
          <h1>Prepare for Your Citizenship Interview</h1>
          <p>
            Practice all {questionSetMeta.totalQuestions} naturalization civics questions with official answers,
            audio pronunciation, review tracking, and interview practice.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/study">Study All 128 Questions</ButtonLink>
            <ButtonLink href="/practice" variant="secondary">
              Start Practice Interview
            </ButtonLink>
          </div>
        </div>
        <div className="hero-dashboard" aria-label="Study overview">
          <div className="hero-stat-grid">
            <HeroStat value={questions.length} label="Questions" />
            <HeroStat value={stats.studied} label="Studied" />
            <HeroStat value={stats.needReview} label="Need Review" />
            <HeroStat value={`${percent}%`} label="Progress" />
          </div>
          <ProgressBar
            label="Overall progress"
            value={stats.studied}
            max={stats.totalQuestions}
            detail={`${stats.studied} / ${stats.totalQuestions}`}
          />
        </div>
      </section>

      <section className="feature-grid" aria-label="Study options">
        <FeatureCard
          icon={<BookOpen aria-hidden="true" size={22} />}
          title="Study All"
          description="Scroll through all 128 questions in official PDF order."
          href="/study"
          action="Open Study All"
        />
        <FeatureCard
          icon={<GraduationCap aria-hidden="true" size={22} />}
          title="Focus Mode"
          description="Study one question at a time with previous and next controls."
          href="/study?view=focus"
          action="Start Focus"
        />
        <FeatureCard
          icon={<ListChecks aria-hidden="true" size={22} />}
          title="Mock Interview"
          description="Answer without seeing the accepted answer first."
          href="/practice"
          action="Begin Interview"
        />
        <FeatureCard
          icon={<RotateCcw aria-hidden="true" size={22} />}
          title="Review"
          description="Revisit saved, incorrect, and need-practice questions."
          href="/review"
          action="Review Questions"
        />
      </section>
    </div>
  );
}

function HeroStat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="hero-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="feature-link focus-ring" href={href}>
        {action}
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </article>
  );
}
