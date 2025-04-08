'use client';
import { cn } from '@/lib/utils';
import { Flag } from 'lucide-react';
import { useState } from 'react';

interface PostData {
  stats: {
    upvotes: number;
    downvotes: number;
  };
}

export default function PostClient({ postData }: { postData: PostData }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(postData.stats.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(postData.stats.downvotes);
  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoted(true);
      setUpvoteCount(upvoteCount + 1);
      if (downvoted) {
        setDownvoted(false);
        setDownvoteCount(downvoteCount - 1);
      }
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      setDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
    } else {
      setDownvoted(true);
      setDownvoteCount(downvoteCount + 1);
      if (upvoted) {
        setUpvoted(false);
        setUpvoteCount(upvoteCount - 1);
      }
    }
  };

  return (
    <div className="flex items-center bg-primary-foreground rounded-full ">
      <button
        className={cn('flex items-center mr-1', upvoted)}
        onClick={handleUpvote}
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-2xl group hover:bg-[#efecff]">
          <Flag
            className={`h-5 w-5 mr-1 scale-x-[-1] group-hover:stroke-green-600 ${upvoted ? 'fill-green-600 stroke-green-600' : ''} `}
          />
        </div>
        <span>{upvoteCount - downvoteCount}</span>
      </button>
      <button
        className={cn('flex items-center mr-1', upvoted)}
        onClick={handleDownvote}
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-2xl group hover:bg-[#efecff]">
          <Flag
            className={`h-5 w-5 group-hover:stroke-red-600 ${downvoted ? 'fill-red-600 stroke-red-600' : ''}`}
          />
        </div>
      </button>
    </div>
  );
}
