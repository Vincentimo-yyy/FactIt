'use client';

import { FactCard } from '@/components/fact-card';
import { getPostCards, type PostCard } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<PostCard[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getPostCards();
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto overflow-auto">
      {/* Fact Cards */}
      <div className="space-y-4">
        {posts.map((post) => (
          <FactCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
