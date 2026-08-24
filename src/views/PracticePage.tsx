'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import { EmptyState } from '@/src/components/EmptyState';
import { NepaliToggleButton } from '@/src/components/NepaliToggleButton';
import { ProgressBar } from '@/src/components/ProgressBar';
import { SpeechButton } from '@/src/components/SpeechButton';
import { USFlagMark } from '@/src/components/USFlagMark';
import { questionSetMeta, questions } from '@/src/data/questions';
import { useProgress, type PracticeAnswer } from '@/src/hooks/useProgress';
import type { CitizenshipQuestion } from '@/src/types/question';

type QuestionCount = 5 | 10 | 20 | 'all';
type QuestionOrder = 'random' | 'in-order';
type PracticeFilter = 'all' | 'American Government' | 'American History' | 'Symbols and Holidays';

export function PracticePage() {
  const [count, setCount] = useState<QuestionCount>(20);
  const [filter, setFilter] = useState<PracticeFilter>('all');
  const [order, setOrder] = useState<QuestionOrder>('random');
  const [sessionQuestions, setSessionQuestions] = useState<CitizenshipQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [answers, setAnswers] = useState<PracticeAnswer[]>([]);
  const [complete, setComplete] = useState(false);
  const { progress, recordAnswer, recordPracticeSession, setShowNepali } = useProgress();

  const pool = useMemo(() => filterQuestions(filter), [filter]);
  const currentQuestion = sessionQuestions[currentIndex];
  const currentQuestionHasNepali = Boolean(
    currentQuestion?.nepaliQuestion || currentQuestion?.nepaliAnswers?.length,
  );
  const nepaliPanelId = currentQuestion ? `practice-nepali-${currentQuestion.id}` : undefined;
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
        <section className="result-panel">
          <p className="section-label">
            <USFlagMark />
            Practice Complete
          </p>
          <h1>{score} / {sessionQuestions.length} Correct</h1>
          <ProgressBar label="Session score" value={score} max={sessionQuestions.length} detail={`${percentage}%`} />
          <div className="result-stat-grid">
            <ResultStat label="Correct" value={score} />
            <ResultStat label="Incorrect" value={sessionQuestions.length - score} />
            <ResultStat label="Questions to Review" value={incorrectAnswers.length} />
          </div>
          <div className="result-actions">
            <a className="secondary-action focus-ring" href="/review?tab=incorrect">
              Review Incorrect Questions
            </a>
            <button className="primary-action focus-ring" type="button" onClick={begin}>
              Practice Again
            </button>
            <a className="secondary-action focus-ring" href="/">
              Return Home
            </a>
          </div>
        </section>
      </div>
    );
  }

  if (sessionQuestions.length === 0) {
    return (
      <div className="page-shell practice-shell">
        <div className="page-heading">
          <p className="section-label">
            <USFlagMark />
            Practice Interview
          </p>
          <h1>Practice Interview</h1>
          <p>
            Choose a focused session from the {questionSetMeta.totalQuestions}-question civics set. Answer out loud,
            reveal the accepted answer, then mark how you did.
          </p>
        </div>

        <section className="settings-panel">
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
              All 128
            </SegmentedButton>
          </SettingGroup>

          <SettingGroup label="Question Category">
            <SegmentedButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All Questions
            </SegmentedButton>
            <SegmentedButton
              active={filter === 'American Government'}
              onClick={() => setFilter('American Government')}
            >
              Government
            </SegmentedButton>
            <SegmentedButton
              active={filter === 'American History'}
              onClick={() => setFilter('American History')}
            >
              History
            </SegmentedButton>
            <SegmentedButton
              active={filter === 'Symbols and Holidays'}
              onClick={() => setFilter('Symbols and Holidays')}
            >
              Symbols & Holidays
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
              description="Choose another category or check the question dataset."
            />
          ) : (
            <button className="primary-action focus-ring" type="button" onClick={begin}>
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
          description="The interview session could not find a current question."
        />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="interview-card">
        <p className="section-label">
          <USFlagMark />
          Practice Interview
        </p>
        <p className="interview-count">Question {currentIndex + 1} of {sessionQuestions.length}</p>
        <h1>{currentQuestion.question}</h1>
        <div className="interview-audio">
          <SpeechButton label="Listen to interview question" text={currentQuestion.question} variant="primary" />
          <NepaliToggleButton
            active={progress.preferences.showNepali}
            available={currentQuestionHasNepali}
            controls={nepaliPanelId}
            onToggle={() => setShowNepali(!progress.preferences.showNepali)}
          />
        </div>

        {currentQuestionHasNepali && progress.preferences.showNepali ? (
          <section id={nepaliPanelId} className="nepali-panel interview-nepali-panel" aria-label="Nepali translation">
            {currentQuestion.nepaliQuestion ? (
              <p>
                <strong>नेपाली:</strong> {currentQuestion.nepaliQuestion}
              </p>
            ) : null}
            {answerVisible && currentQuestion.nepaliAnswers?.length ? (
              <p>
                <strong>उत्तर:</strong> {currentQuestion.nepaliAnswers.join(' · ')}
              </p>
            ) : null}
          </section>
        ) : null}

        {!answerVisible ? (
          <button
            className="primary-action focus-ring"
            type="button"
            onClick={() => setAnswerVisible(true)}
          >
            Show Correct Answer
          </button>
        ) : (
          <section className="interview-answer">
            <p>{currentQuestion.answerInstruction ?? 'Accepted answer.'}</p>
            <ul>
              {currentQuestion.answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
            {currentQuestion.note ? <span>{currentQuestion.note}</span> : null}
            <div className="interview-score-actions">
              <button
                className="success-action focus-ring"
                type="button"
                onClick={() => scoreQuestion(true)}
              >
                <Check aria-hidden="true" size={18} />
                Correct
              </button>
              <button
                className="secondary-action danger focus-ring"
                type="button"
                onClick={() => scoreQuestion(false)}
              >
                <X aria-hidden="true" size={18} />
                Need Practice
              </button>
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

  return questions.filter((question) => question.category === filter);
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function SettingGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="setting-group">
      <legend>{label}</legend>
      <div>{children}</div>
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
      className={`segmented-button focus-ring ${active ? 'is-active' : ''}`}
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
    <div className="result-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
