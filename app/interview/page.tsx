import type { Metadata } from 'next';
import { VoiceInterviewPage } from '@/src/views/VoiceInterviewPage';

export const metadata: Metadata = {
  title: 'Real Interview',
  description:
    'Practice the U.S. citizenship civics questions by answering aloud with browser-based voice recognition.',
};

export default function Interview() {
  return <VoiceInterviewPage />;
}
