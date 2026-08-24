'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CategoryFilter } from '@/src/components/CategoryFilter';
import { EmptyState } from '@/src/components/EmptyState';
import { QuestionCard } from '@/src/components/QuestionCard';
import { questions } from '@/src/data/questions';
import { useProgress } from '@/src/hooks/useProgress';
import type { UserProgress } from '@/src/utils/storage';

type ReviewTab = 'need-practice' | 'incorrect' | 'favorites' | 'studied';

const tabs: { id: ReviewTab; label: string }[] = [
  { id: 'need-practice', label: 'Need Practice' },
  { id: 'incorrect', label: 'Incorrect' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'studied', label: 'All Studied' },
];

export function ReviewPage() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams?.get('tab');
  const [activeTab, setActiveTab] = useState<ReviewTab>(
    requestedTab === 'incorrect' ? 'incorrect' : 'need-practice',
  );
  const [index, setIndex] = useState(0);
  const progressApi = useProgress();
  const { progress } = progressApi;

  const reviewQuestions = useMemo(() => {
    const ids = getIdsForTab(activeTab, progress);
    return questions.filter((question) => ids.has(question.id));
  }, [activeTab, progress]);

  const safeIndex = Math.min(index, Math.max(reviewQuestions.length - 1, 0));
  const currentQuestion = reviewQuestions[safeIndex];

  return (
    <div className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Review</p>
        <h1 className="text-3xl font900 text-[var(--navy-strong)]">Review Questions</h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--muted)]">
          Revisit questions marked for practice, incorrect answers, saved favorites, and studied items.
        </p>
      </div>

      <section className="mb-5">
        <CategoryFilter
          filters={tabs.map((tab) => tab.label)}
          activeFilter={tabs.find((tab) => tab.id === activeTab)?.label ?? 'Need Practice'}
          onChange={(label) => {
            const next = tabs.find((tab) => tab.label === label);
            if (next) {
              setActiveTab(next.id);
              setIndex(0);
            }
          }}
        />
      </section>

      {reviewQuestions.length === 0 ? (
        <EmptyState
          title={emptyCopy[activeTab].title}
          description={emptyCopy[activeTab].description}
        />
      ) : currentQuestion ? (
        <QuestionCard
          key={`${currentQuestion.id}-${progress.preferences.showNepali}`}
          question={currentQuestion}
          position={safeIndex + 1}
          total={reviewQuestions.length}
          isFavorite={progress.favoriteIds.includes(currentQuestion.id)}
          showNepaliByDefault={progress.preferences.showNepali}
          onKnow={progressApi.markMastered}
          onNeedPractice={progressApi.markNeedsPractice}
          onToggleFavorite={progressApi.toggleFavorite}
          onPrevious={() => setIndex((value) => Math.max(value - 1, 0))}
          onNext={() => setIndex((value) => Math.min(value + 1, reviewQuestions.length - 1))}
          canPrevious={safeIndex > 0}
          canNext={safeIndex < reviewQuestions.length - 1}
          primaryActionLabel="Mark as Mastered"
        />
      ) : null}
    </div>
  );
}

function getIdsForTab(tab: ReviewTab, progress: UserProgress) {
  if (tab === 'need-practice') {
    return new Set(progress.needPracticeIds);
  }
  if (tab === 'incorrect') {
    return new Set(progress.incorrectIds);
  }
  if (tab === 'favorites') {
    return new Set(progress.favoriteIds);
  }
  return new Set(progress.studiedIds);
}

const emptyCopy: Record<ReviewTab, { title: string; description: string }> = {
  'need-practice': {
    title: "Great job! You don't have any questions marked for review yet.",
    description: 'Questions you mark as Need Practice will appear here.',
  },
  incorrect: {
    title: 'No incorrect answers yet',
    description: 'Mock interview questions marked incorrect will appear here.',
  },
  favorites: {
    title: "You haven't saved any favorite questions yet.",
    description: 'Use Favorite on any question you want to revisit quickly.',
  },
  studied: {
    title: 'No studied questions yet',
    description: 'Study or practice questions to start building your progress list.',
  },
};
