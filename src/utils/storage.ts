export type ThemePreference = 'system' | 'light' | 'dark';

export interface ProgressPreferences {
  theme: ThemePreference;
  showNepali: boolean;
}

export interface UserProgress {
  studiedIds: string[];
  correctIds: string[];
  incorrectIds: string[];
  needPracticeIds: string[];
  favoriteIds: string[];
  practiceSessions: number;
  lastStudiedQuestionId: string | null;
  lastStudyDate: string | null;
  streakDays: number;
  preferences: ProgressPreferences;
}

export const STORAGE_KEY = 'citizenship-practice-progress-v1';
export const PROGRESS_EVENT = 'citizenship-progress-updated';

export function createDefaultProgress(): UserProgress {
  return {
    studiedIds: [],
    correctIds: [],
    incorrectIds: [],
    needPracticeIds: [],
    favoriteIds: [],
    practiceSessions: 0,
    lastStudiedQuestionId: null,
    lastStudyDate: null,
    streakDays: 0,
    preferences: {
      theme: 'system',
      showNepali: false,
    },
  };
}

export function readProgress(): UserProgress {
  if (!canUseStorage()) {
    return createDefaultProgress();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createDefaultProgress();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return normalizeProgress(parsed);
  } catch {
    return createDefaultProgress();
  }
}

export function writeProgress(progress: UserProgress) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function clearProgress() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function withStudyActivity(progress: UserProgress): UserProgress {
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  if (progress.lastStudyDate === today) {
    return progress;
  }

  return {
    ...progress,
    lastStudyDate: today,
    streakDays: progress.lastStudyDate === yesterday ? progress.streakDays + 1 : 1,
  };
}

export function unique(values: string[]) {
  return Array.from(new Set(values));
}

export function addId(values: string[], id: string) {
  return unique([...values, id]);
}

export function removeId(values: string[], id: string) {
  return values.filter((value) => value !== id);
}

function normalizeProgress(progress: Partial<UserProgress>): UserProgress {
  const defaults = createDefaultProgress();
  const preferences = progress.preferences ?? defaults.preferences;

  return {
    studiedIds: normalizeStringArray(progress.studiedIds),
    correctIds: normalizeStringArray(progress.correctIds),
    incorrectIds: normalizeStringArray(progress.incorrectIds),
    needPracticeIds: normalizeStringArray(progress.needPracticeIds),
    favoriteIds: normalizeStringArray(progress.favoriteIds),
    practiceSessions:
      typeof progress.practiceSessions === 'number'
        ? progress.practiceSessions
        : defaults.practiceSessions,
    lastStudiedQuestionId:
      typeof progress.lastStudiedQuestionId === 'string'
        ? progress.lastStudiedQuestionId
        : null,
    lastStudyDate:
      typeof progress.lastStudyDate === 'string' ? progress.lastStudyDate : null,
    streakDays:
      typeof progress.streakDays === 'number' ? progress.streakDays : defaults.streakDays,
    preferences: {
      theme: isThemePreference(preferences.theme) ? preferences.theme : 'system',
      showNepali:
        typeof preferences.showNepali === 'boolean'
          ? preferences.showNepali
          : defaults.preferences.showNepali,
    },
  };
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value)
    ? unique(value.filter((item): item is string => typeof item === 'string'))
    : [];
}

function canUseStorage() {
  return typeof window !== 'undefined' && 'localStorage' in window;
}

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark';
}

function getTodayKey() {
  return new Date().toLocaleDateString('en-CA');
}

function getYesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toLocaleDateString('en-CA');
}
