import { FactCard } from './fact-card';

type newsItem = {
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  tags: string[];
  credibilityScore: number;
  headline: string;
  description: string;
  references: {
    id: number;
    title: string;
    url: string;
  }[];
  stats: {
    upvotes: number;
    downvotes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
};

interface NewsPostProps {
  items: newsItem[];
}

export default function NewsPost({ items }: NewsPostProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {items.map((item, index) => (
        <FactCard
          key={index}
          user={item.user}
          tags={item.tags}
          credibilityScore={item.credibilityScore}
          headline={item.headline}
          description={item.description}
          references={item.references}
          stats={item.stats}
          timestamp={item.timestamp}
        />
      ))}
    </div>
  );
}
