'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Focus, LayoutList, Search, X } from 'lucide-react';
import { CategoryFilter } from '@/src/components/CategoryFilter';
import { EmptyState } from '@/src/components/EmptyState';
import { ProgressBar } from '@/src/components/ProgressBar';
import { QuestionCard } from '@/src/components/QuestionCard';
import { questionSetMeta, questions } from '@/src/data/questions';
import { useProgress } from '@/src/hooks/useProgress';
import type { CitizenshipQuestion } from '@/src/types/question';
import {
  getQuestionFilters,
  groupQuestionsBySection,
  searchQuestions,
} from '@/src/utils/questions';

type StudyView = 'all' | 'focus';

export function StudyPage() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<StudyView>(
    searchParams?.get('view') === 'focus' ? 'focus' : 'all',
  );
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [focusIndex, setFocusIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [questionOnly, setQuestionOnly] = useState(false);
  const [jumpOpen, setJumpOpen] = useState(false);
  const [jumpQuery, setJumpQuery] = useState('');
  const [pendingJumpNumber, setPendingJumpNumber] = useState<number | null>(null);
  const progressApi = useProgress();
  const { progress, stats, rememberQuestion } = progressApi;
  const filters = useMemo(() => getQuestionFilters(questions), []);
  const filteredQuestions = useMemo(
    () => searchQuestions(questions, search, filter),
    [search, filter],
  );
  const safeFocusIndex = Math.min(focusIndex, Math.max(filteredQuestions.length - 1, 0));
  const focusQuestion = filteredQuestions[safeFocusIndex];
  const groupedQuestions = useMemo(
    () => groupQuestionsBySection(filteredQuestions),
    [filteredQuestions],
  );
  const jumpResults = useMemo(
    () => getJumpResults(jumpQuery, questions),
    [jumpQuery],
  );

  const toggleExpanded = useCallback((questionId: string, visible: boolean) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (visible) {
        next.add(questionId);
      } else {
        next.delete(questionId);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (view === 'focus' && focusQuestion) {
      rememberQuestion(focusQuestion.id);
    }
  }, [focusQuestion, rememberQuestion, view]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return;
      }

      if (view !== 'focus') {
        return;
      }

      if (event.key === 'ArrowRight') {
        setFocusIndex((value) => Math.min(value + 1, filteredQuestions.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        setFocusIndex((value) => Math.max(value - 1, 0));
      }
      if (event.key === ' ') {
        event.preventDefault();
        if (focusQuestion) {
          toggleExpanded(focusQuestion.id, true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredQuestions.length, focusQuestion, toggleExpanded, view]);

  useEffect(() => {
    if (pendingJumpNumber === null || view !== 'all') {
      return;
    }

    const timer = window.setTimeout(() => {
      const target = document.getElementById(`question-${pendingJumpNumber}`);
      if (target) {
        const headerOffset = window.matchMedia('(max-width: 760px)').matches ? 112 : 132;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' });
        root.style.scrollBehavior = previousScrollBehavior;
      }
      setPendingJumpNumber(null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pendingJumpNumber, view, filteredQuestions.length]);

  const resetPosition = () => setFocusIndex(0);

  const expandAll = () => {
    setQuestionOnly(false);
    setExpandedIds(new Set(filteredQuestions.map((question) => question.id)));
  };

  const collapseAll = () => setExpandedIds(new Set());

  const jumpToQuestion = (question: CitizenshipQuestion) => {
    const filteredIndex = filteredQuestions.findIndex((item) => item.id === question.id);
    const nextView = filteredIndex === -1 ? 'all' : view;
    setJumpOpen(false);
    setJumpQuery('');

    if (nextView === 'focus' && filteredIndex !== -1) {
      setFocusIndex(filteredIndex);
      return;
    }

    setSearch('');
    setFilter('All');
    setView('all');
    setPendingJumpNumber(question.number ?? null);
  };

  return (
    <div className="page-shell study-shell">
      <section className="study-hero">
        <div>
          <p className="section-label">Study All</p>
          <h1>All 128 Questions</h1>
          <p>Review every question from the 2025 naturalization civics question set in official PDF order.</p>
        </div>
        <label className="study-search">
          <Search aria-hidden="true" size={18} />
          <input
            type="search"
            placeholder="Search questions..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPosition();
            }}
          />
        </label>
      </section>

      <section className="study-controls" aria-label="Study controls">
        <div className="view-selector" aria-label="Study view">
          <button
            className={`focus-ring ${view === 'all' ? 'is-active' : ''}`}
            type="button"
            aria-pressed={view === 'all'}
            onClick={() => setView('all')}
          >
            <LayoutList aria-hidden="true" size={17} />
            All Questions
          </button>
          <button
            className={`focus-ring ${view === 'focus' ? 'is-active' : ''}`}
            type="button"
            aria-pressed={view === 'focus'}
            onClick={() => setView('focus')}
          >
            <Focus aria-hidden="true" size={17} />
            Focus Mode
          </button>
        </div>

        <CategoryFilter
          filters={filters}
          activeFilter={filter}
          onChange={(nextFilter) => {
            setFilter(nextFilter);
            resetPosition();
          }}
        />

        <div className="study-tool-row">
          <p>
            Showing <strong>{filteredQuestions.length}</strong> of{' '}
            <strong>{questionSetMeta.totalQuestions}</strong> questions
          </p>
          <div>
            <button className="secondary-action focus-ring" type="button" onClick={expandAll}>
              Expand All Answers
            </button>
            <button className="secondary-action focus-ring" type="button" onClick={collapseAll}>
              Collapse All
            </button>
            <button
              className={`secondary-action focus-ring ${questionOnly ? 'is-active' : ''}`}
              type="button"
              aria-pressed={questionOnly}
              onClick={() => setQuestionOnly((value) => !value)}
            >
              Questions Only
            </button>
            <button
              className="secondary-action focus-ring"
              type="button"
              onClick={() => setJumpOpen(true)}
            >
              Jump to Question
            </button>
          </div>
        </div>
      </section>

      <div className="sticky-study-progress">
        <ProgressBar
          label="Study Progress"
          value={stats.studied}
          max={questionSetMeta.totalQuestions}
          detail={`${stats.studied} / ${questionSetMeta.totalQuestions}`}
        />
      </div>

      {filteredQuestions.length === 0 ? (
        <EmptyState
          title="No questions found"
          description="Try a different search term or choose another source category."
        />
      ) : view === 'focus' && focusQuestion ? (
        <QuestionCard
          key={`${focusQuestion.id}-${progress.preferences.showNepali}`}
          question={focusQuestion}
          position={focusQuestion.number ?? safeFocusIndex + 1}
          total={questionSetMeta.totalQuestions}
          isFavorite={progress.favoriteIds.includes(focusQuestion.id)}
          showNepaliByDefault={progress.preferences.showNepali}
          answerVisible={expandedIds.has(focusQuestion.id)}
          questionOnly={questionOnly}
          onAnswerVisibleChange={(visible) => toggleExpanded(focusQuestion.id, visible)}
          onKnow={progressApi.markKnown}
          onNeedPractice={progressApi.markNeedsPractice}
          onToggleFavorite={progressApi.toggleFavorite}
          onPrevious={() => setFocusIndex((value) => Math.max(value - 1, 0))}
          onNext={() => setFocusIndex((value) => Math.min(value + 1, filteredQuestions.length - 1))}
          canPrevious={safeFocusIndex > 0}
          canNext={safeFocusIndex < filteredQuestions.length - 1}
        />
      ) : (
        <div className="study-all-list">
          {groupedQuestions.map((group, groupIndex) => {
            const previous = groupedQuestions[groupIndex - 1];
            const showCategory = !previous || previous.category !== group.category;
            return (
              <section
                key={`${group.category}-${group.subcategory}`}
                className="question-section"
                aria-labelledby={`section-${groupIndex}`}
              >
                {showCategory ? <h2>{group.category}</h2> : null}
                <h3 id={`section-${groupIndex}`}>{group.subcategory}</h3>
                <div className="question-stack">
                  {group.questions.map((question) => (
                    <QuestionCard
                      key={`${question.id}-${progress.preferences.showNepali}`}
                      question={question}
                      position={question.number ?? 0}
                      total={questionSetMeta.totalQuestions}
                      isFavorite={progress.favoriteIds.includes(question.id)}
                      showNepaliByDefault={progress.preferences.showNepali}
                      answerVisible={expandedIds.has(question.id)}
                      questionOnly={questionOnly}
                      showNavigation={false}
                      onAnswerVisibleChange={(visible) => toggleExpanded(question.id, visible)}
                      onKnow={progressApi.markKnown}
                      onNeedPractice={progressApi.markNeedsPractice}
                      onToggleFavorite={progressApi.toggleFavorite}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {jumpOpen ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setJumpOpen(false)}>
          <section
            className="jump-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="jump-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="section-label">Jump</p>
                <h2 id="jump-title">Jump to Question</h2>
              </div>
              <button
                className="icon-action focus-ring"
                type="button"
                aria-label="Close jump dialog"
                onClick={() => setJumpOpen(false)}
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <label className="study-search">
              <Search aria-hidden="true" size={18} />
              <input
                autoFocus
                type="search"
                placeholder="Type 65 or Constitution..."
                value={jumpQuery}
                onChange={(event) => setJumpQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    const [firstResult] = getJumpResults(event.currentTarget.value, questions);
                    if (firstResult) {
                      jumpToQuestion(firstResult);
                    }
                  }
                }}
              />
            </label>
            <div className="jump-results">
              {jumpResults.map((question) => (
                <button
                  key={question.id}
                  className="focus-ring"
                  type="button"
                  onClick={() => jumpToQuestion(question)}
                >
                  <span>Question {question.number}</span>
                  {question.question}
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function getJumpResults(query: string, allQuestions: CitizenshipQuestion[]) {
  const term = query.trim().toLowerCase();
  if (!term) {
    return allQuestions.slice(0, 8);
  }

  const number = Number(term);
  if (Number.isInteger(number)) {
    return allQuestions.filter((question) => question.number === number).slice(0, 8);
  }

  return allQuestions
    .filter((question) =>
      [question.question, ...question.answers, question.category, question.subcategory ?? '']
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
    .slice(0, 8);
}
