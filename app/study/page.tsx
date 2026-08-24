import { Suspense } from 'react';
import { StudyPage } from '@/src/pages/StudyPage';

export default function Study() {
  return (
    <Suspense fallback={<div className="page-shell">Loading study questions...</div>}>
      <StudyPage />
    </Suspense>
  );
}
