import { FactCard } from './fact-card';
import type { PostCard } from '@/lib/data';

interface NewsPostProps {
  items: PostCard[];
}

export default function NewsPost({ items }: NewsPostProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {items.map((item, index) => (
        <FactCard key={index} post={item} />
      ))}
    </div>
  );
}
