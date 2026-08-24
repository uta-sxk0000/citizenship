import { questions } from '@/src/data/questions';
import type { CitizenshipQuestion } from '@/src/types/question';

export const allQuestions = questions;

export function getQuestionFilters(list: CitizenshipQuestion[] = questions) {
  const values = new Set<string>();

  for (const question of list) {
    values.add(question.category);
    if (question.subcategory) {
      values.add(question.subcategory);
    }
  }

  return ['All', ...Array.from(values).sort((a, b) => a.localeCompare(b))];
}

export function matchesQuestionFilter(question: CitizenshipQuestion, filter: string) {
  if (filter === 'All') {
    return true;
  }

  const normalizedFilter = normalize(filter);
  const possibleValues = [
    question.category,
    question.subcategory,
  ];

  return possibleValues.some((value) => value && normalize(value) === normalizedFilter);
}

export function searchQuestions(
  list: CitizenshipQuestion[],
  query: string,
  filter: string,
) {
  const term = query.trim().toLowerCase();

  return list.filter((question) => {
    const matchesFilter = matchesQuestionFilter(question, filter);
    if (!matchesFilter) {
      return false;
    }

    if (!term) {
      return true;
    }

    const haystack = [
      question.question,
      ...question.answers,
      question.category,
      question.subcategory ?? '',
      question.explanation ?? '',
      question.note ?? '',
      question.answerInstruction ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(term);
  });
}

export function groupQuestionsBySection(list: CitizenshipQuestion[]) {
  const groups: {
    category: string;
    subcategory: string;
    questions: CitizenshipQuestion[];
  }[] = [];

  for (const question of list) {
    const subcategory = question.subcategory ?? 'General';
    const last = groups[groups.length - 1];
    if (!last || last.category !== question.category || last.subcategory !== subcategory) {
      groups.push({
        category: question.category,
        subcategory,
        questions: [question],
      });
    } else {
      last.questions.push(question);
    }
  }

  return groups;
}

export function getQuestionById(id: string | null) {
  if (!id) {
    return undefined;
  }

  return questions.find((question) => question.id === id);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}
