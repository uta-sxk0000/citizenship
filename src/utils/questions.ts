import { questions } from '@/src/data/questions';
import { questionTypeLabels, type CitizenshipQuestion } from '@/src/types/question';

export const allQuestions = questions;

export function getQuestionFilters(list: CitizenshipQuestion[] = questions) {
  const values = new Set<string>();

  for (const question of list) {
    values.add(question.category);
    if (question.subcategory) {
      values.add(question.subcategory);
    }
    if (question.type) {
      values.add(questionTypeLabels[question.type]);
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
    question.type ? questionTypeLabels[question.type] : undefined,
    question.type,
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
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(term);
  });
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
