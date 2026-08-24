export type QuestionType =
  | 'civics'
  | 'n400'
  | 'yes-no'
  | 'vocabulary'
  | 'reading'
  | 'writing';

export interface CitizenshipQuestion {
  id: string;
  number?: number;
  category: string;
  subcategory?: string;
  question: string;
  answers: string[];
  nepaliQuestion?: string;
  nepaliAnswers?: string[];
  explanation?: string;
  nepaliExplanation?: string;
  acceptedAnswers?: string[];
  type?: QuestionType;
  currentAnswer?: boolean;
  important?: boolean;
  sample?: boolean;
}

export const questionTypeLabels: Record<QuestionType, string> = {
  civics: 'Civics',
  n400: 'N-400',
  'yes-no': 'Yes/No',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  writing: 'Writing',
};
