'use client';

import { useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Languages,
  RotateCcw,
} from 'lucide-react';
import { SpeechButton } from '@/src/components/SpeechButton';
import type { CitizenshipQuestion } from '@/src/types/question';

interface QuestionCardProps {
  question: CitizenshipQuestion;
  position: number;
  total: number;
  isFavorite: boolean;
  showNepaliByDefault?: boolean;
  answerVisible?: boolean;
  questionOnly?: boolean;
  showNavigation?: boolean;
  onAnswerVisibleChange?: (visible: boolean) => void;
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
  showNepaliByDefault = false,
  answerVisible,
  questionOnly = false,
  showNavigation = true,
  onAnswerVisibleChange,
  onKnow,
  onNeedPractice,
  onToggleFavorite,
  onPrevious,
  onNext,
  canPrevious = true,
  canNext = true,
  primaryActionLabel = 'I Know This',
}: QuestionCardProps) {
  const [internalAnswerVisible, setInternalAnswerVisible] = useState(false);
  const [nepaliVisible, setNepaliVisible] = useState(showNepaliByDefault);
  const resolvedAnswerVisible = questionOnly
    ? false
    : answerVisible ?? internalAnswerVisible;
  const hasNepali = Boolean(question.nepaliQuestion || question.nepaliAnswers?.length);
  const nepaliPanelId = `nepali-panel-${question.id}`;
  const setAnswerVisible = (visible: boolean) => {
    if (onAnswerVisibleChange) {
      onAnswerVisibleChange(visible);
    } else {
      setInternalAnswerVisible(visible);
    }
  };

  return (
    <article
      id={`question-${question.number ?? position}`}
      className="question-card"
      aria-labelledby={`question-title-${question.id}`}
    >
      <div className="question-card-topline" />
      <header className="question-card-header">
        <div>
          <p className="question-kicker">Question {question.number ?? position}</p>
          <p className="question-meta">
            {question.subcategory ?? question.category} · {position} / {total}
          </p>
        </div>
        <div className="question-badges" aria-label="Question notes">
          {question.specialConsideration ? <span>65/20</span> : null}
          {question.currentAnswer ? (
            <span>Current answer</span>
          ) : null}
          {!question.currentAnswer && question.variableAnswer ? <span>Variable answer</span> : null}
        </div>
      </header>

      <div className="question-line">
        <h2 id={`question-title-${question.id}`}>{question.question}</h2>
        <div className="audio-cluster" aria-label="Question audio controls">
          <SpeechButton label="Listen to question" text={question.question} variant="primary" />
        </div>
      </div>

      {question.currentAnswer || question.variableAnswer ? (
        <p className="current-answer-note">
          Verify this answer before your interview.
        </p>
      ) : null}

      <div className="question-answer-region">
        {!resolvedAnswerVisible ? (
          <button
            className="primary-action focus-ring"
            type="button"
            disabled={questionOnly}
            onClick={() => setAnswerVisible(true)}
          >
            Show Answer
          </button>
        ) : (
          <section className="answer-panel" aria-label="Answer">
            <div className="answer-heading">
              <div>
                <p>Answer</p>
                {question.answerInstruction ? <span>{question.answerInstruction}</span> : null}
              </div>
            </div>
            <ul className="answer-list">
              {question.answers.map((answer) => (
                <li key={answer}>
                  <span>{answer}</span>
                  <div className="audio-cluster answer-audio" aria-label="Answer audio controls">
                    <SpeechButton label={`Listen to answer: ${answer}`} text={answer} />
                  </div>
                </li>
              ))}
            </ul>
            {question.note ? <p className="question-note">{question.note}</p> : null}
            {question.explanation ? (
              <p className="question-note">{question.explanation}</p>
            ) : null}
          </section>
        )}
      </div>

      {hasNepali ? (
        <div className="nepali-region">
          <button
            className="quiet-action focus-ring"
            type="button"
            aria-expanded={nepaliVisible}
            aria-controls={nepaliPanelId}
            onClick={() => setNepaliVisible((value) => !value)}
          >
            <Languages aria-hidden="true" size={16} />
            नेपाली
          </button>
          {nepaliVisible ? (
            <section id={nepaliPanelId} className="nepali-panel" aria-label="Nepali translation">
              {question.nepaliQuestion ? (
                <p>
                  <strong>नेपाली:</strong> {question.nepaliQuestion}
                </p>
              ) : null}
              {resolvedAnswerVisible && question.nepaliAnswers?.length ? (
                <p>
                  <strong>उत्तर:</strong> {question.nepaliAnswers.join(' · ')}
                </p>
              ) : null}
            </section>
          ) : null}
        </div>
      ) : null}

      <footer className="question-actions">
        <div className="action-group">
          <button
            className="success-action focus-ring"
            type="button"
            onClick={() => onKnow(question.id)}
          >
            <Check aria-hidden="true" size={17} />
            {primaryActionLabel}
          </button>
          <button
            className="secondary-action focus-ring"
            type="button"
            onClick={() => onNeedPractice(question.id)}
          >
            <RotateCcw aria-hidden="true" size={16} />
            Need Practice
          </button>
          <button
            className="secondary-action focus-ring"
            type="button"
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(question.id)}
          >
            <Bookmark aria-hidden="true" size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            {isFavorite ? 'Saved' : 'Save'}
          </button>
        </div>

        {showNavigation ? (
          <div className="card-nav">
            <button
              className="nav-action focus-ring"
              type="button"
              disabled={!canPrevious}
              onClick={onPrevious}
              aria-label="Previous question"
            >
              <ChevronLeft aria-hidden="true" size={18} />
              Previous
            </button>
            <span>
              {position} / {total}
            </span>
            <button
              className="nav-action focus-ring"
              type="button"
              disabled={!canNext}
              onClick={onNext}
              aria-label="Next question"
            >
              Next
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
        ) : null}
      </footer>
    </article>
  );
}
