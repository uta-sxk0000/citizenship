import type { CitizenshipQuestion } from '@/src/types/question';

export interface QuestionValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateQuestionSet(
  questions: CitizenshipQuestion[],
  expectedCount = 128,
): QuestionValidationResult {
  const errors: string[] = [];
  const ids = new Set<string>();
  const numbers = new Set<number>();

  if (questions.length !== expectedCount) {
    errors.push(`Expected ${expectedCount} questions, found ${questions.length}.`);
  }

  for (const question of questions) {
    if (!question.id) {
      errors.push(`Question ${question.number ?? 'unknown'} is missing an ID.`);
    }
    if (ids.has(question.id)) {
      errors.push(`Duplicate question ID: ${question.id}.`);
    }
    ids.add(question.id);

    if (typeof question.number !== 'number') {
      errors.push(`Question ${question.id} is missing a number.`);
    } else {
      if (numbers.has(question.number)) {
        errors.push(`Duplicate question number: ${question.number}.`);
      }
      numbers.add(question.number);
    }

    if (!question.question.trim()) {
      errors.push(`Question ${question.number ?? question.id} is missing text.`);
    }
    if (!question.answers.length || question.answers.some((answer) => !answer.trim())) {
      errors.push(`Question ${question.number ?? question.id} is missing answers.`);
    }
  }

  for (let number = 1; number <= expectedCount; number += 1) {
    if (!numbers.has(number)) {
      errors.push(`Missing question number ${number}.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function warnIfInvalidQuestionSet(questions: CitizenshipQuestion[]) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const result = validateQuestionSet(questions);
  if (!result.valid) {
    console.warn('Citizenship question dataset validation failed:', result.errors);
  }
}
