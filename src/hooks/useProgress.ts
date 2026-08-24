'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { questions } from '@/src/data/questions';
import {
  addId,
  clearProgress,
  createDefaultProgress,
  PROGRESS_EVENT,
  readProgress,
  removeId,
  type ThemePreference,
  type UserProgress,
  withStudyActivity,
  writeProgress,
} from '@/src/utils/storage';

export interface PracticeAnswer {
  questionId: string;
  correct: boolean;
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(createDefaultProgress);

  useEffect(() => {
    const syncProgress = () => setProgress(readProgress());
    syncProgress();

    window.addEventListener('storage', syncProgress);
    window.addEventListener(PROGRESS_EVENT, syncProgress);

    return () => {
      window.removeEventListener('storage', syncProgress);
      window.removeEventListener(PROGRESS_EVENT, syncProgress);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (progress.preferences.theme === 'system') {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = progress.preferences.theme;
    }
  }, [progress.preferences.theme]);

  const updateProgress = useCallback((updater: (current: UserProgress) => UserProgress) => {
    const next = updater(readProgress());
    writeProgress(next);
    setProgress(next);
  }, []);

  const markKnown = useCallback(
    (questionId: string) => {
      updateProgress((current) => {
        const active = withStudyActivity(current);
        return {
          ...active,
          studiedIds: addId(active.studiedIds, questionId),
          correctIds: addId(active.correctIds, questionId),
          incorrectIds: removeId(active.incorrectIds, questionId),
          needPracticeIds: removeId(active.needPracticeIds, questionId),
          lastStudiedQuestionId: questionId,
        };
      });
    },
    [updateProgress],
  );

  const markNeedsPractice = useCallback(
    (questionId: string) => {
      updateProgress((current) => {
        const active = withStudyActivity(current);
        return {
          ...active,
          studiedIds: addId(active.studiedIds, questionId),
          needPracticeIds: addId(active.needPracticeIds, questionId),
          lastStudiedQuestionId: questionId,
        };
      });
    },
    [updateProgress],
  );

  const recordAnswer = useCallback(
    (questionId: string, correct: boolean) => {
      updateProgress((current) => applyAnswer(current, { questionId, correct }));
    },
    [updateProgress],
  );

  const recordPracticeSession = useCallback(
    (answers: PracticeAnswer[]) => {
      updateProgress((current) => {
        const answered = answers.reduce(applyAnswer, current);
        return {
          ...answered,
          practiceSessions: answered.practiceSessions + 1,
        };
      });
    },
    [updateProgress],
  );

  const markMastered = useCallback(
    (questionId: string) => {
      updateProgress((current) => {
        const active = withStudyActivity(current);
        return {
          ...active,
          studiedIds: addId(active.studiedIds, questionId),
          correctIds: addId(active.correctIds, questionId),
          incorrectIds: removeId(active.incorrectIds, questionId),
          needPracticeIds: removeId(active.needPracticeIds, questionId),
          lastStudiedQuestionId: questionId,
        };
      });
    },
    [updateProgress],
  );

  const toggleFavorite = useCallback(
    (questionId: string) => {
      updateProgress((current) => {
        const isFavorite = current.favoriteIds.includes(questionId);
        return {
          ...current,
          favoriteIds: isFavorite
            ? removeId(current.favoriteIds, questionId)
            : addId(current.favoriteIds, questionId),
        };
      });
    },
    [updateProgress],
  );

  const rememberQuestion = useCallback(
    (questionId: string) => {
      updateProgress((current) => ({
        ...withStudyActivity(current),
        lastStudiedQuestionId: questionId,
      }));
    },
    [updateProgress],
  );

  const setTheme = useCallback(
    (theme: ThemePreference) => {
      updateProgress((current) => ({
        ...current,
        preferences: {
          ...current.preferences,
          theme,
        },
      }));
    },
    [updateProgress],
  );

  const setShowNepali = useCallback(
    (showNepali: boolean) => {
      updateProgress((current) => ({
        ...current,
        preferences: {
          ...current.preferences,
          showNepali,
        },
      }));
    },
    [updateProgress],
  );

  const resetProgress = useCallback(() => {
    clearProgress();
    setProgress(createDefaultProgress());
  }, []);

  const stats = useMemo(() => {
    const reviewIds = new Set([...progress.needPracticeIds, ...progress.incorrectIds]);
    const studiedIds = new Set(progress.studiedIds);
    const categoryGroups = questions.reduce<Record<string, { studied: number; total: number }>>(
      (groups, question) => {
        groups[question.category] ??= { studied: 0, total: 0 };
        groups[question.category].total += 1;
        if (studiedIds.has(question.id)) {
          groups[question.category].studied += 1;
        }
        return groups;
      },
      {},
    );

    return {
      totalQuestions: questions.length,
      studied: progress.studiedIds.length,
      correct: progress.correctIds.length,
      incorrect: progress.incorrectIds.length,
      needReview: reviewIds.size,
      favorites: progress.favoriteIds.length,
      practiceSessions: progress.practiceSessions,
      streakDays: progress.streakDays,
      categoryProgress: Object.entries(categoryGroups).map(([category, value]) => ({
        category,
        studied: value.studied,
        total: value.total,
        percent: value.total === 0 ? 0 : Math.round((value.studied / value.total) * 100),
      })),
    };
  }, [progress]);

  return {
    progress,
    stats,
    markKnown,
    markNeedsPractice,
    recordAnswer,
    recordPracticeSession,
    markMastered,
    toggleFavorite,
    rememberQuestion,
    setTheme,
    setShowNepali,
    resetProgress,
  };
}

function applyAnswer(progress: UserProgress, answer: PracticeAnswer): UserProgress {
  const active = withStudyActivity(progress);

  if (answer.correct) {
    return {
      ...active,
      studiedIds: addId(active.studiedIds, answer.questionId),
      correctIds: addId(active.correctIds, answer.questionId),
      incorrectIds: removeId(active.incorrectIds, answer.questionId),
      needPracticeIds: removeId(active.needPracticeIds, answer.questionId),
      lastStudiedQuestionId: answer.questionId,
    };
  }

  return {
    ...active,
    studiedIds: addId(active.studiedIds, answer.questionId),
    incorrectIds: addId(active.incorrectIds, answer.questionId),
    needPracticeIds: addId(active.needPracticeIds, answer.questionId),
    correctIds: removeId(active.correctIds, answer.questionId),
    lastStudiedQuestionId: answer.questionId,
  };
}
