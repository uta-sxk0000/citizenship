'use client';

import { useEffect, useMemo, useState } from 'react';
import { CategoryFilter } from '@/src/components/CategoryFilter';
import { EmptyState } from '@/src/components/EmptyState';
import { QuestionCard } from '@/src/components/QuestionCard';
import { questions } from '@/src/data/questions';
import { useProgress } from '@/src/hooks/useProgress';
import { getQuestionFilters, searchQuestions } from '@/src/utils/questions';

export function StudyPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [index, setIndex] = useState(0);
  const progressApi = useProgress();
  const { progress, rememberQuestion } = progressApi;
  const filters = useMemo(() => getQuestionFilters(questions), []);
  const filteredQuestions = useMemo(
    () => searchQuestions(questions, search, filter),
    [search, filter],
  );
  const safeIndex = Math.min(index, Math.max(filteredQuestions.length - 1, 0));
  const currentQuestion = filteredQuestions[safeIndex];

  useEffect(() => {
    if (currentQuestion) {
      rememberQuestion(currentQuestion.id);
    }
  }, [currentQuestion, rememberQuestion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return;
      }

      if (event.key === 'ArrowRight') {
        setIndex((value) => Math.min(value + 1, filteredQuestions.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        setIndex((value) => Math.max(value - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredQuestions.length]);

  return (
    <div className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Study</p>
        <h1 className="text-3xl font900 text-[var(--navy-strong)]">Study Questions</h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--muted)]">
          Search, filter, listen, reveal answers, and mark each question as known or needing more practice.
        </p>
      </div>

      <section className="card mb-5 grid gap-4 p-4" aria-label="Search and filters">
        <label className="grid gap-2 text-sm font900 text-[var(--muted-strong)]">
          Search questions
          <input
            className="focus-ring min-h-12 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 text-base text-[var(--foreground)]"
            type="search"
            placeholder="Search questions..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setIndex(0);
            }}
          />
        </label>
        <CategoryFilter
          filters={filters}
          activeFilter={filter}
          onChange={(nextFilter) => {
            setFilter(nextFilter);
            setIndex(0);
          }}
        />
      </section>

      {filteredQuestions.length === 0 ? (
        <EmptyState
          title="No questions found"
          description="Try a different search term or choose another category."
        />
      ) : currentQuestion ? (
        <QuestionCard
          key={`${currentQuestion.id}-${progress.preferences.showNepali}`}
          question={currentQuestion}
          position={safeIndex + 1}
          total={filteredQuestions.length}
          isFavorite={progress.favoriteIds.includes(currentQuestion.id)}
          showNepaliByDefault={progress.preferences.showNepali}
          onKnow={progressApi.markKnown}
          onNeedPractice={progressApi.markNeedsPractice}
          onToggleFavorite={progressApi.toggleFavorite}
          onPrevious={() => setIndex((value) => Math.max(value - 1, 0))}
          onNext={() => setIndex((value) => Math.min(value + 1, filteredQuestions.length - 1))}
          canPrevious={safeIndex > 0}
          canNext={safeIndex < filteredQuestions.length - 1}
        />
      ) : (
        <EmptyState
          title="No questions loaded"
          description="Add questions to src/data/questions.ts to begin studying."
        />
      )}
    </div>
  );
}
