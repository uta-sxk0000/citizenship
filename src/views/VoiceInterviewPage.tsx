'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Check, Mic, RotateCcw, Square } from 'lucide-react';
import { EmptyState } from '@/src/components/EmptyState';
import { ProgressBar } from '@/src/components/ProgressBar';
import { SpeechButton } from '@/src/components/SpeechButton';
import { USFlagMark } from '@/src/components/USFlagMark';
import { questions } from '@/src/data/questions';
import { useProgress } from '@/src/hooks/useProgress';
import type { CitizenshipQuestion } from '@/src/types/question';
import {
  evaluateSpokenAnswer,
  getAnswerRequirementLabel,
  inferRequiredMatches,
  type AnswerEvaluation,
} from '@/src/utils/answerEvaluator';
import {
  createSpeechRecognition,
  supportsSpeechRecognition,
  type BrowserSpeechRecognition,
} from '@/src/utils/speechRecognition';
import { stopSpeech } from '@/src/utils/speech';

type InterviewCount = 5 | 10 | 20 | 'all';
type InterviewOrder = 'random' | 'in-order';
type VoiceStatus = 'idle' | 'listening' | 'processing' | 'complete' | 'error';

interface VoiceResult {
  questionId: string;
  outcome: 'correct' | 'partial' | 'incorrect';
  transcript: string;
}

export function VoiceInterviewPage() {
  const [count, setCount] = useState<InterviewCount>(20);
  const [order, setOrder] = useState<InterviewOrder>('random');
  const [sessionQuestions, setSessionQuestions] = useState<CitizenshipQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [supported, setSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [results, setResults] = useState<VoiceResult[]>([]);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { recordAnswer } = useProgress();

  const currentQuestion = sessionQuestions[currentIndex];
  const correctCount = results.filter((result) => result.outcome === 'correct').length;
  const complete = sessionQuestions.length > 0 && currentIndex >= sessionQuestions.length;

  useEffect(() => {
    const timer = window.setTimeout(() => setSupported(supportsSpeechRecognition()), 0);
    return () => {
      window.clearTimeout(timer);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  const begin = () => {
    const ordered = order === 'random' ? shuffle(questions) : [...questions];
    const selected = count === 'all' ? ordered : ordered.slice(0, count);
    setSessionQuestions(selected);
    setCurrentIndex(0);
    setResults([]);
    resetAttempt();
  };

  const startListening = () => {
    if (!currentQuestion) {
      return;
    }

    const recognition = createSpeechRecognition();
    if (!recognition) {
      setSupported(false);
      setStatus('error');
      setErrorMessage("Voice answer checking isn't supported by this browser. You can still use Practice mode.");
      return;
    }

    stopRecognition();
    stopSpeech();
    setTranscript('');
    setEvaluation(null);
    setAnswerVisible(false);
    setErrorMessage('');
    setStatus('listening');

    let heard = '';
    let finished = false;

    const finish = (text: string) => {
      if (finished) {
        return;
      }
      finished = true;
      clearListenTimeout();
      recognitionRef.current = null;
      const cleaned = text.trim();
      if (!cleaned) {
        setStatus('error');
        setErrorMessage("I didn't hear an answer. Try again.");
        return;
      }
      setStatus('processing');
      const result = evaluateSpokenAnswer(currentQuestion, cleaned);
      setEvaluation(result);
      setTranscript(cleaned);
      setStatus('complete');
      if (result.outcome === 'correct') {
        saveResult(currentQuestion.id, result.outcome, cleaned, true);
      }
    };

    recognition.onresult = (event) => {
      const parts: string[] = [];
      let finalResult = false;
      for (let index = 0; index < event.results.length; index += 1) {
        parts.push(event.results[index][0]?.transcript ?? '');
        finalResult ||= event.results[index].isFinal;
      }
      heard = parts.join(' ').trim();
      setTranscript(heard);
      if (finalResult) {
        finish(heard);
      }
    };

    recognition.onerror = (event) => {
      if (finished) {
        return;
      }
      finished = true;
      clearListenTimeout();
      recognitionRef.current = null;
      setStatus('error');
      setErrorMessage(getRecognitionErrorMessage(event.error));
    };

    recognition.onend = () => finish(heard);
    recognitionRef.current = recognition;
    timeoutRef.current = window.setTimeout(() => {
      recognition.stop();
    }, 12000);

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      clearListenTimeout();
      setStatus('error');
      setErrorMessage('The microphone could not start. Please try again.');
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const markCorrect = () => {
    if (!currentQuestion) {
      return;
    }
    const text = transcript || 'Marked correct manually';
    saveResult(currentQuestion.id, 'correct', text, true);
    setEvaluation({
      outcome: 'correct',
      requiredMatches: inferRequiredMatches(currentQuestion),
      matchedCount: inferRequiredMatches(currentQuestion),
      matchedAnswers: [],
      missingCount: 0,
      normalizedTranscript: '',
      message: 'Marked correct.',
    });
    setStatus('complete');
  };

  const goNext = () => {
    if (!currentQuestion) {
      return;
    }

    if (!results.some((result) => result.questionId === currentQuestion.id)) {
      saveResult(currentQuestion.id, evaluation?.outcome ?? 'incorrect', transcript, evaluation?.outcome === 'correct');
    }

    resetAttempt();
    setCurrentIndex((value) => value + 1);
  };

  if (complete) {
    const percent = sessionQuestions.length === 0 ? 0 : Math.round((correctCount / sessionQuestions.length) * 100);
    return (
      <div className="page-shell">
        <section className="result-panel">
          <p className="section-label">
            <USFlagMark />
            Real Interview Complete
          </p>
          <h1>{correctCount} / {sessionQuestions.length} Correct</h1>
          <ProgressBar label="Voice interview score" value={correctCount} max={sessionQuestions.length} detail={`${percent}%`} />
          <div className="result-actions">
            <button className="primary-action focus-ring" type="button" onClick={begin}>
              Start Again
            </button>
            <a className="secondary-action focus-ring" href="/study">
              Study Missed Questions
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
            Real Interview
          </p>
          <h1>Answer by Audio</h1>
          <p>
            Practice like the interview: hear or read a question, answer out loud, and let your browser check the key
            answer words. Your audio is not saved or uploaded.
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
              20 Real Test Practice
            </SegmentedButton>
            <SegmentedButton active={count === 'all'} onClick={() => setCount('all')}>
              128 Question Marathon
            </SegmentedButton>
          </SettingGroup>

          <SettingGroup label="Question Order">
            <SegmentedButton active={order === 'random'} onClick={() => setOrder('random')}>
              Random
            </SegmentedButton>
            <SegmentedButton active={order === 'in-order'} onClick={() => setOrder('in-order')}>
              In Official Order
            </SegmentedButton>
          </SettingGroup>

          {!supported ? (
            <EmptyState
              title="Voice checking is not available"
              description="This browser does not support built-in speech recognition. You can still use Practice mode and grade yourself."
            />
          ) : (
            <button className="primary-action focus-ring" type="button" onClick={begin}>
              <Mic aria-hidden="true" size={18} />
              Start Real Interview
            </button>
          )}
        </section>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="page-shell">
        <EmptyState title="No question loaded" description="The interview session could not find the current question." />
      </div>
    );
  }

  const required = inferRequiredMatches(currentQuestion);

  return (
    <div className="page-shell">
      <section className="interview-card voice-interview-card">
        <p className="section-label">
          <USFlagMark />
          Real Interview
        </p>
        <p className="interview-count">
          Question {currentIndex + 1} of {sessionQuestions.length}
        </p>
        <h1>{currentQuestion.question}</h1>
        <p className="answer-requirement">{getAnswerRequirementLabel(currentQuestion)}</p>

        <div className="interview-audio">
          <SpeechButton label="Listen to interview question" text={currentQuestion.question} variant="primary" />
        </div>

        <div className="voice-control-row" aria-live="polite">
          {status === 'listening' ? (
            <>
              <div className="listening-indicator">
                <span aria-hidden="true" />
                Listening...
              </div>
              <button className="secondary-action focus-ring" type="button" onClick={stopListening} aria-label="Stop listening">
                <Square aria-hidden="true" size={16} />
                Stop
              </button>
            </>
          ) : (
            <button className="primary-action mic-action focus-ring" type="button" onClick={startListening}>
              <Mic aria-hidden="true" size={18} />
              Answer by Audio
            </button>
          )}
        </div>

        {status === 'processing' ? <p className="voice-helper">Checking answer...</p> : null}
        {status === 'error' ? <p className="voice-error" role="status">{errorMessage}</p> : null}

        {transcript ? (
          <section className="transcript-panel" aria-label="Recognized transcript">
            <p>I heard</p>
            <strong>{`"${transcript}"`}</strong>
          </section>
        ) : null}

        {evaluation ? (
          <section className={`voice-evaluation is-${evaluation.outcome}`} aria-live="polite">
            <strong>{evaluationTitle[evaluation.outcome]}</strong>
            <p>{evaluation.message}</p>
            {evaluation.matchedAnswers.length ? (
              <span>Key answers heard: {evaluation.matchedAnswers.slice(0, required).join(', ')}</span>
            ) : null}
          </section>
        ) : null}

        {answerVisible ? (
          <section className="interview-answer">
            <p>{currentQuestion.answerInstruction ?? 'Accepted answer.'}</p>
            <ul>
              {currentQuestion.answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="result-actions">
          <button className="secondary-action focus-ring" type="button" onClick={startListening}>
            <RotateCcw aria-hidden="true" size={16} />
            Try Again
          </button>
          <button className="secondary-action focus-ring" type="button" onClick={() => setAnswerVisible((value) => !value)}>
            {answerVisible ? 'Hide Official Answer' : 'Show Official Answer'}
          </button>
          <button className="success-action focus-ring" type="button" onClick={markCorrect}>
            <Check aria-hidden="true" size={17} />
            Mark Correct
          </button>
          <button className="primary-action focus-ring" type="button" onClick={goNext}>
            {currentIndex >= sessionQuestions.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        </div>
      </section>
    </div>
  );

  function resetAttempt() {
    stopRecognition();
    setStatus('idle');
    setTranscript('');
    setEvaluation(null);
    setAnswerVisible(false);
    setErrorMessage('');
  }

  function stopRecognition() {
    clearListenTimeout();
    recognitionRef.current?.abort();
    recognitionRef.current = null;
  }

  function clearListenTimeout() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function saveResult(
    questionId: string,
    outcome: VoiceResult['outcome'],
    resultTranscript: string,
    correct: boolean,
  ) {
    setResults((current) => {
      const next = [
        ...current.filter((result) => result.questionId !== questionId),
        { questionId, outcome, transcript: resultTranscript },
      ];
      return next;
    });
    recordAnswer(questionId, correct);
  }
}

function getRecognitionErrorMessage(error: string) {
  if (error === 'not-allowed' || error === 'service-not-allowed') {
    return 'Microphone access is blocked. Enable it in your browser settings or continue with self-grade Practice mode.';
  }
  if (error === 'no-speech') {
    return "I didn't hear an answer. Try again.";
  }
  if (error === 'audio-capture') {
    return 'No microphone was found. Check your device microphone and try again.';
  }
  return "I couldn't understand that attempt. Please try again.";
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

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

const evaluationTitle = {
  correct: 'Correct',
  partial: 'Almost there',
  incorrect: 'Try again',
} as const;
