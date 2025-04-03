'use client';

import { FactCard } from '@/components/fact-card';
import FloatingChat from '@/components/floatingchat';
import { getPostCards } from '@/lib/data';

export default function Home() {
  const posts = getPostCards();

  return (
    <div className="max-w-3xl mx-auto overflow-auto">
      {/* Fact Cards */}
      <div className="space-y-4">
        {posts.map((post) => (
          <FactCard key={post.id} post={post} />
        ))}
      </div>

      <div>
        <FloatingChat />
      </div>
    </div>
  );
}
