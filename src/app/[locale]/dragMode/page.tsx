'use client'
// import { useTranslations} from 'next-intl';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Editor from './Editor';

export default function Order() {
  return (
    <main>
      <Suspense>
          <Editor />
      </Suspense>
    </main>
    
  );
}