'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/src/components/EmptyState';
import { SpeechButton } from '@/src/components/SpeechButton';
import { questions } from '@/src/data/questions';
import { useProgress, type PracticeAnswer } from '@/src/hooks/useProgress';
import type { CitizenshipQuestion } from '@/src/types/question';

type QuestionCount = 5 | 10 | 20 | 'all';
type QuestionOrder = 'random' | 'in-order';
type PracticeFilter = 'all' | 'civics' | 'n400' | 'vocabulary';

export function PracticePage() {
  const [count, setCount] = useState<QuestionCount>(10);
  const [filter, setFilter] = useState<PracticeFilter>('all');
  const [order, setOrder] = useState<QuestionOrder>('random');
  const [sessionQuestions, setSessionQuestions] = useState<CitizenshipQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [answers, setAnswers] = useState<PracticeAnswer[]>([]);
  const [complete, setComplete] = useState(false);
  const { recordAnswer, recordPracticeSession } = useProgress();

  const pool = useMemo(() => filterQuestions(filter), [filter]);
  const currentQuestion = sessionQuestions[currentIndex];
  const score = answers.filter((answer) => answer.correct).length;
  const incorrectAnswers = answers.filter((answer) => !answer.correct);

  const begin = () => {
    const ordered = order === 'random' ? shuffle(pool) : [...pool];
    const selected = count === 'all' ? ordered : ordered.slice(0, count);
    setSessionQuestions(selected);
    setCurrentIndex(0);
    setAnswerVisible(false);
    setAnswers([]);
    setComplete(false);
  };

  const scoreQuestion = (correct: boolean) => {
    if (!currentQuestion) {
      return;
    }

    const nextAnswers = [
      ...answers.filter((answer) => answer.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, correct },
    ];
    recordAnswer(currentQuestion.id, correct);

    if (currentIndex >= sessionQuestions.length - 1) {
      setAnswers(nextAnswers);
      recordPracticeSession(nextAnswers);
      setComplete(true);
      return;
    }

    setAnswers(nextAnswers);
    setCurrentIndex((value) => value + 1);
    setAnswerVisible(false);
  };

  if (complete) {
    const percentage =
      sessionQuestions.length === 0 ? 0 : Math.round((score / sessionQuestions.length) * 100);

    return (
      <div className="page-shell">
        <section className="card mx-auto grid max-w-2xl gap-6 p-6 text-center">
          <div className="grid gap-2">
            <p className="eyebrow">Practice Complete</p>
            <h1 className="text-4xl font900 text-[var(--navy-strong)]">
              {score} / {sessionQuestions.length} Correct
            </h1>
            <p className="text-2xl font900 text-[var(--blue)]">{percentage}%</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-left">
            <ResultStat label="Correct" value={score} />
            <ResultStat label="Incorrect" value={sessionQuestions.length - score} />
            <ResultStat label="Questions to Review" value={incorrectAnswers.length} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              className="focus-ring rounded-md border border-[var(--border)] px-4 py-3 text-sm font900 hover:bg-[var(--surface-muted)]"
              href="/review?tab=incorrect"
            >
              Review Incorrect Questions
            </Link>
            <button
              className="focus-ring rounded-md bg-[var(--navy)] px-4 py-3 text-sm font900 text-white hover:bg-[var(--navy-strong)]"
              type="button"
              onClick={begin}
            >
              Practice Again
            </button>
            <Link
              className="focus-ring rounded-md border border-[var(--border)] px-4 py-3 text-sm font900 hover:bg-[var(--surface-muted)]"
              href="/"
            >
              Return Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (sessionQuestions.length === 0) {
    return (
      <div className="page-shell">
        <div className="page-heading">
          <p className="eyebrow">Mock interview</p>
          <h1 className="text-3xl font900 text-[var(--navy-strong)]">Practice Interview</h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)]">
            Choose a short session, listen to each question, answer out loud, then mark how you did.
          </p>
        </div>

        <section className="card grid gap-6 p-5">
          <SettingGroup label="Number of Questions">
            <SegmentedButton active={count === 5} onClick={() => setCount(5)}>
              5
            </SegmentedButton>
            <SegmentedButton active={count === 10} onClick={() => setCount(10)}>
              10
            </SegmentedButton>
            <SegmentedButton active={count === 20} onClick={() => setCount(20)}>
              20
            </SegmentedButton>
            <SegmentedButton active={count === 'all'} onClick={() => setCount('all')}>
              All
            </SegmentedButton>
          </SettingGroup>

          <SettingGroup label="Question Type">
            <SegmentedButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All Questions
            </SegmentedButton>
            <SegmentedButton active={filter === 'civics'} onClick={() => setFilter('civics')}>
              Civics
            </SegmentedButton>
            <SegmentedButton active={filter === 'n400'} onClick={() => setFilter('n400')}>
              N-400
            </SegmentedButton>
            <SegmentedButton
              active={filter === 'vocabulary'}
              onClick={() => setFilter('vocabulary')}
            >
              Vocabulary
            </SegmentedButton>
          </SettingGroup>

          <SettingGroup label="Question Order">
            <SegmentedButton active={order === 'random'} onClick={() => setOrder('random')}>
              Random
            </SegmentedButton>
            <SegmentedButton active={order === 'in-order'} onClick={() => setOrder('in-order')}>
              In Order
            </SegmentedButton>
          </SettingGroup>

          {pool.length === 0 ? (
            <EmptyState
              title="No questions loaded"
              description="Add matching questions to src/data/questions.ts before beginning this practice mode."
            />
          ) : (
            <button
              className="focus-ring min-h-12 rounded-md bg-[var(--navy)] px-5 py-3 text-sm font900 text-white hover:bg-[var(--navy-strong)]"
              type="button"
              onClick={begin}
            >
              Begin Interview
            </button>
          )}
        </section>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="page-shell">
        <EmptyState
          title="No questions loaded"
          description="Add questions to src/data/questions.ts to begin interview practice."
        />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="card mx-auto grid max-w-3xl gap-6 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Interview Question {currentIndex + 1}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {currentIndex + 1} / {sessionQuestions.length}
            </p>
          </div>
          <span className="rounded-md bg-[var(--surface-muted)] px-3 py-1 text-sm font900 text-[var(--muted-strong)]">
            {currentQuestion.category}
          </span>
        </div>

        <h1 className="text-3xl font900 leading-snug text-[var(--foreground)]">
          {currentQuestion.question}
        </h1>

        <div className="flex flex-wrap gap-2">
          <SpeechButton label="Repeat Question" text={currentQuestion.question} tone="solid" />
          <SpeechButton
            label="Repeat Slowly"
            rate={0.7}
            text={currentQuestion.question}
          />
        </div>

        {!answerVisible ? (
          <button
            className="focus-ring min-h-12 rounded-md border border-[var(--border)] px-4 py-3 text-sm font900 hover:bg-[var(--surface-muted)]"
            type="button"
            onClick={() => setAnswerVisible(true)}
          >
            Show Correct Answer
          </button>
        ) : (
          <section className="grid gap-4 border-t border-[var(--border)] pt-5">
            <div>
              <h2 className="text-lg font900 text-[var(--navy-strong)]">Correct Answer</h2>
              <ul className="mt-2 grid gap-2 text-lg font800 leading-7">
                {currentQuestion.answers.map((answer) => (
                  <li key={answer}>{answer}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3">
              <p className="text-sm font900 text-[var(--muted-strong)]">How did you do?</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  className="focus-ring min-h-12 rounded-md bg-[var(--green)] px-4 py-3 text-sm font900 text-white hover:brightness-95"
                  type="button"
                  onClick={() => scoreQuestion(true)}
                >
                  Correct
                </button>
                <button
                  className="focus-ring min-h-12 rounded-md border border-[var(--border)] px-4 py-3 text-sm font900 text-[var(--red)] hover:bg-[var(--surface-muted)]"
                  type="button"
                  onClick={() => scoreQuestion(false)}
                >
                  Incorrect
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

function filterQuestions(filter: PracticeFilter) {
  if (filter === 'all') {
    return questions;
  }

  if (filter === 'n400') {
    return questions.filter((question) => question.type === 'n400' || question.type === 'yes-no');
  }

  return questions.filter((question) => question.type === filter);
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function SettingGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font900 text-[var(--muted-strong)]">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function SegmentedButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className={`focus-ring min-h-11 rounded-md border px-4 py-2 text-sm font900 ${
        active
          ? 'border-[var(--navy)] bg-[var(--navy)] text-white'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted-strong)] hover:bg-[var(--surface-muted)]'
      }`}
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ResultStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      <p className="text-sm font800 text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font900 text-[var(--navy-strong)]">{value}</p>
    </div>
  );
}
