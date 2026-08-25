import React from 'react';
import { getContent } from '@/lib/content-service';
import { PortfolioViewContainer } from '@/components/layout/portfolio-view-container';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getContent();

  return (
    <main className="w-full min-h-screen">
      <PortfolioViewContainer content={content} />
    </main>
  );
}
