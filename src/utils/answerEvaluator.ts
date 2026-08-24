import type { CitizenshipQuestion } from '@/src/types/question';

export type AnswerOutcome = 'correct' | 'partial' | 'incorrect';

export interface AnswerEvaluation {
  outcome: AnswerOutcome;
  requiredMatches: number;
  matchedCount: number;
  matchedAnswers: string[];
  missingCount: number;
  normalizedTranscript: string;
  message: string;
}

const fillerPhrases = [
  'i think',
  'i believe',
  'i guess',
  'the answer is',
  'answer is',
  'it is',
  'its',
  'probably',
];

const commonWords = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'be',
  'been',
  'being',
  'by',
  'can',
  'did',
  'do',
  'does',
  'for',
  'from',
  'has',
  'have',
  'had',
  'in',
  'is',
  'may',
  'of',
  'on',
  'or',
  'the',
  'to',
  'was',
  'were',
  'with',
]);

const allowedTailVariants = new Set([
  'arms',
  'assembly',
  'constitution',
  'happiness',
  'jury',
  'liberty',
  'life',
  'petition',
  'press',
  'religion',
  'speech',
  'taxes',
  'vote',
]);

export function normalizeAnswer(text: string) {
  let value = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\bworld war ii\b/g, 'world war 2')
    .replace(/\bworld war i\b/g, 'world war 1')
    .replace(/\bworld war two\b/g, 'world war 2')
    .replace(/\bworld war second\b/g, 'world war 2')
    .replace(/\bworld war one\b/g, 'world war 1')
    .replace(/\bu\.?\s*s\.?\s*a\.?\b/g, ' united states ')
    .replace(/\bu\.?\s*s\.?\b/g, ' united states ')
    .replace(/\busa\b/g, ' united states ')
    .replace(/&/g, ' and ')
    .replace(/['\u2018\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bii\b/g, '2')
    .replace(/\s+/g, ' ')
    .trim();

  for (const phrase of fillerPhrases) {
    value = value.replace(new RegExp(`\\b${phrase}\\b`, 'g'), ' ');
  }

  return value.replace(/\s+/g, ' ').trim();
}

export function inferRequiredMatches(question: CitizenshipQuestion) {
  if (typeof question.requiredMatches === 'number' && question.requiredMatches > 0) {
    return question.requiredMatches;
  }

  const instruction = normalizeAnswer(question.answerInstruction ?? '');
  const prompt = normalizeAnswer(question.question);
  const text = `${instruction} ${prompt}`;

  if (/\bgive three\b/.test(text) || /\bname three\b/.test(text) || /\bwhat are three\b/.test(text)) {
    return 3;
  }

  if (/\bgive two\b/.test(text) || /\bname two\b/.test(text) || /\bwhat are two\b/.test(text)) {
    return 2;
  }

  if (
    /\bgive one\b/.test(text) ||
    /\bname one\b/.test(text) ||
    /\bwhat is one\b/.test(text) ||
    /\bone of the\b/.test(text)
  ) {
    return 1;
  }

  return 1;
}

export function getAnswerRequirementLabel(question: CitizenshipQuestion) {
  const required = inferRequiredMatches(question);
  if (required === 1) {
    return 'Give one key answer';
  }
  return `Give ${required} key answers`;
}

export function evaluateSpokenAnswer(
  question: CitizenshipQuestion,
  transcript: string,
): AnswerEvaluation {
  const normalizedTranscript = normalizeAnswer(transcript);
  const requiredMatches = inferRequiredMatches(question);
  const candidateAnswers = buildCandidateAnswers(question);
  const matchedAnswers = candidateAnswers
    .filter((answer) => answerMatchesTranscript(answer.variants, normalizedTranscript))
    .map((answer) => answer.label);
  const uniqueMatches = Array.from(new Set(matchedAnswers));
  const matchedCount = Math.min(uniqueMatches.length, requiredMatches);
  const missingCount = Math.max(requiredMatches - matchedCount, 0);

  if (matchedCount >= requiredMatches) {
    return {
      outcome: 'correct',
      requiredMatches,
      matchedCount,
      matchedAnswers: uniqueMatches,
      missingCount,
      normalizedTranscript,
      message:
        requiredMatches === 1
          ? 'Correct. You included the key answer.'
          : `Correct. You included ${requiredMatches} key answers.`,
    };
  }

  if (matchedCount > 0) {
    return {
      outcome: 'partial',
      requiredMatches,
      matchedCount,
      matchedAnswers: uniqueMatches,
      missingCount,
      normalizedTranscript,
      message: `Almost there. You gave ${matchedCount} of ${requiredMatches} required key answers.`,
    };
  }

  return {
    outcome: 'incorrect',
    requiredMatches,
    matchedCount,
    matchedAnswers: [],
    missingCount,
    normalizedTranscript,
    message: "Try again. I didn't hear the key answer yet.",
  };
}

function buildCandidateAnswers(question: CitizenshipQuestion) {
  if (question.keywordGroups?.length) {
    return question.keywordGroups.map((group, index) => ({
      label: question.answers[index] ?? group[0] ?? `Answer ${index + 1}`,
      variants: group.flatMap((keyword) => buildVariants(keyword)),
    }));
  }

  if (question.keywords?.length) {
    return question.keywords.map((keyword, index) => ({
      label: question.answers[index] ?? keyword,
      variants: buildVariants(keyword),
    }));
  }

  return question.answers.map((answer) => ({
    label: answer,
    variants: buildVariants(answer),
  }));
}

function buildVariants(answer: string) {
  const base = normalizeAnswer(answer);
  const withoutParentheses = normalizeAnswer(answer.replace(/\([^)]*\)/g, ' '));
  const withParenthesesText = normalizeAnswer(answer.replace(/[()]/g, ' '));
  const variants = new Set([base, withoutParentheses, withParenthesesText]);

  for (const variant of Array.from(variants)) {
    const tokens = importantTokens(variant);
    if (tokens.length === 0) {
      continue;
    }
    variants.add(tokens.join(' '));

    if ((tokens[0] === 'freedom' || tokens[0] === 'right' || tokens[0] === 'rights') && tokens.length > 1) {
      variants.add(tokens.slice(1).join(' '));
    }

    if (tokens.length === 2 && allowedTailVariants.has(tokens[1])) {
      variants.add(tokens[1]);
    }
  }

  return Array.from(variants).filter(Boolean);
}

function answerMatchesTranscript(variants: string[], normalizedTranscript: string) {
  if (!normalizedTranscript) {
    return false;
  }

  for (const variant of variants) {
    if (containsPhrase(normalizedTranscript, variant)) {
      return true;
    }
  }

  return variants.some((variant) => {
    const tokens = importantTokens(variant);
    if (tokens.length === 0) {
      return false;
    }
    if (tokens.length <= 3) {
      return tokens.every((token) => containsPhrase(normalizedTranscript, token));
    }
    const found = tokens.filter((token) => containsPhrase(normalizedTranscript, token)).length;
    return found >= Math.ceil(tokens.length * 0.75);
  });
}

function importantTokens(value: string) {
  return value
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !commonWords.has(token));
}

function containsPhrase(normalizedTranscript: string, normalizedPhrase: string) {
  const phrase = normalizedPhrase.trim();
  return phrase.length > 0 && ` ${normalizedTranscript} `.includes(` ${phrase} `);
}
