import { Suspense } from 'react';
import { ReviewPage } from '@/src/pages/ReviewPage';

export default function Review() {
  return (
    <Suspense fallback={<div className="page-shell">Loading review...</div>}>
      <ReviewPage />
    </Suspense>
  );
}
