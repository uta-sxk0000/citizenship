import type { Metadata } from 'next';
import { VoiceInterviewPage } from '@/src/views/VoiceInterviewPage';

export const metadata: Metadata = {
  title: 'Real Interview',
  description:
    'Practice the U.S. citizenship civics questions with system-graded audio or typed interview answers.',
};

export default function Interview() {
  return <VoiceInterviewPage />;
}
