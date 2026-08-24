'use client';

import { useMemo, useState } from 'react';
import { SpeechButton } from '@/src/components/SpeechButton';
import type { CitizenshipQuestion } from '@/src/types/question';

interface QuestionCardProps {
  question: CitizenshipQuestion;
  position: number;
  total: number;
  isFavorite: boolean;
  showNepaliByDefault: boolean;
  onKnow: (id: string) => void;
  onNeedPractice: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  canPrevious?: boolean;
  canNext?: boolean;
  primaryActionLabel?: string;
}

export function QuestionCard({
  question,
  position,
  total,
  isFavorite,
  showNepaliByDefault,
  onKnow,
  onNeedPractice,
  onToggleFavorite,
  onPrevious,
  onNext,
  canPrevious = true,
  canNext = true,
  primaryActionLabel = 'I Know This',
}: QuestionCardProps) {
  const [answerVisible, setAnswerVisible] = useState(false);
  const [nepaliVisible, setNepaliVisible] = useState(showNepaliByDefault);
  const hasNepali = Boolean(question.nepaliQuestion || question.nepaliAnswers?.length);
  const answerText = useMemo(() => question.answers.join('. '), [question.answers]);

  return (
    <article className="card grid gap-6 p-5 sm:p-7" aria-labelledby={`question-${question.id}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font900 text-[var(--red)]">Question {question.number ?? position}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {position} / {total} · {question.category}
            {question.subcategory ? ` · ${question.subcategory}` : ''}
          </p>
        </div>
        {question.sample ? (
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs font900 text-[var(--muted-strong)]">
            Sample data
          </span>
        ) : null}
      </div>

      <div className="grid gap-4">
        <h2
          id={`question-${question.id}`}
          className="text-2xl font900 leading-snug text-[var(--foreground)] sm:text-3xl"
        >
          {question.question}
        </h2>
        {question.currentAnswer ? (
          <p className="rounded-md border border-[color-mix(in_srgb,var(--red)_35%,var(--border))] bg-[color-mix(in_srgb,var(--red)_9%,var(--surface))] px-3 py-2 text-sm font800 text-[var(--red)]">
            Current answer - verify before your interview.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <SpeechButton label="Listen" text={question.question} />
          <SpeechButton label="Listen Slowly" rate={0.7} text={question.question} />
        </div>
      </div>

      <div className="grid gap-4 border-t border-[var(--border)] pt-5">
        {!answerVisible ? (
          <button
            className="focus-ring min-h-12 rounded-md bg-[var(--navy)] px-4 py-3 text-sm font900 text-white hover:bg-[var(--navy-strong)]"
            type="button"
            onClick={() => setAnswerVisible(true)}
          >
            Show Answer
          </button>
        ) : (
          <section className="grid gap-4" aria-label="Answer">
            <div>
              <h3 className="text-lg font900 text-[var(--navy-strong)]">Answer</h3>
              <ul className="mt-2 grid gap-2 text-lg font800 leading-7">
                {question.answers.map((answer) => (
                  <li key={answer}>{answer}</li>
                ))}
              </ul>
            </div>
            {question.explanation ? (
              <p className="text-sm leading-6 text-[var(--muted)]">{question.explanation}</p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <SpeechButton label="Listen to Answer" text={answerText} />
              <SpeechButton label="Listen Slowly" rate={0.7} text={answerText} />
            </div>
          </section>
        )}
      </div>

      {hasNepali ? (
        <div className="grid gap-3 border-t border-[var(--border)] pt-5">
          <button
            className="focus-ring w-fit rounded-md border border-[var(--border)] px-3 py-2 text-sm font800 text-[var(--muted-strong)] hover:bg-[var(--surface-muted)]"
            type="button"
            aria-expanded={nepaliVisible}
            onClick={() => setNepaliVisible((value) => !value)}
          >
            {nepaliVisible ? 'Hide Nepali Translation' : 'Translate to Nepali'}
          </button>
          {nepaliVisible ? (
            <section className="rounded-md bg-[var(--surface-muted)] p-4" aria-label="Nepali translation">
              {question.nepaliQuestion ? (
                <>
                  <h3 className="font900 text-[var(--navy-strong)]">नेपाली</h3>
                  <p className="mt-2 text-lg font800 leading-8">{question.nepaliQuestion}</p>
                </>
              ) : null}
              {question.nepaliAnswers?.length ? (
                <div className="mt-4">
                  <h4 className="font900 text-[var(--navy-strong)]">उत्तर</h4>
                  <ul className="mt-2 grid gap-2 text-lg font800 leading-8">
                    {question.nepaliAnswers.map((answer) => (
                      <li key={answer}>{answer}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-4 border-t border-[var(--border)] pt-5">
        <div className="grid gap-2 sm:grid-cols-3">
          <button
            className="focus-ring min-h-12 rounded-md bg-[var(--green)] px-4 py-3 text-sm font900 text-white hover:brightness-95"
            type="button"
            onClick={() => onKnow(question.id)}
          >
            {primaryActionLabel}
          </button>
          <button
            className="focus-ring min-h-12 rounded-md border border-[var(--border)] px-4 py-3 text-sm font900 text-[var(--red)] hover:bg-[var(--surface-muted)]"
            type="button"
            onClick={() => onNeedPractice(question.id)}
          >
            Need Practice
          </button>
          <button
            className="focus-ring min-h-12 rounded-md border border-[var(--border)] px-4 py-3 text-sm font900 text-[var(--navy-strong)] hover:bg-[var(--surface-muted)]"
            type="button"
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(question.id)}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            className="focus-ring min-h-11 rounded-md border border-[var(--border)] px-4 py-2 text-sm font800 disabled:opacity-45"
            type="button"
            disabled={!canPrevious}
            onClick={onPrevious}
          >
            Previous
          </button>
          <span className="text-sm font900 text-[var(--muted-strong)]">
            {position} / {total}
          </span>
          <button
            className="focus-ring min-h-11 rounded-md border border-[var(--border)] px-4 py-2 text-sm font800 disabled:opacity-45"
            type="button"
            disabled={!canNext}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </article>
  );
}
