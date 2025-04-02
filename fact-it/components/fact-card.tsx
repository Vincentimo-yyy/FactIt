'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, MessagesSquare, Share2, Flag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Reference = {
  id: number;
  title: string;
  url: string;
};

type FactCardProps = {
  user: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  tags: string[];
  credibilityScore: number;
  headline: string;
  description: string;
  references: Reference[];
  stats: {
    upvotes: number;
    downvotes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
};

export function FactCard({
  user,
  tags,
  credibilityScore,
  headline,
  description,
  references,
  stats,
  timestamp,
}: FactCardProps) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(stats.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(stats.downvotes || 0);
  const [showReferences, setShowReferences] = useState(false);

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

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="px-4">
          {/* Header with user info and score */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="relative h-10 w-10 mr-3">
                  <Image
                    src={user.avatar || '/placeholder.svg'}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {user.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-[#4F3E9E] rounded-full p-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {timestamp}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1 mt-1 ml-12">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={cn(
                      'px-2 py-0.5 text-xs rounded-full',
                      tag.toLowerCase() === 'politics' &&
                        'bg-[#F3F0FF] text-[#4F3E9E]',
                      tag.toLowerCase() === 'personal' &&
                        'bg-[#E6F7ED] text-[#0E6245]',
                      tag.toLowerCase() === 'entertainment' &&
                        'bg-[#FFE9F8] text-[#9C1C7B]',
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Flag className="h-5 w-5 mr-1 scale-x-[-1] stroke-green-600 fill-green-600" />
              <div
                className={cn(
                  'text-white text-xs font-medium px-2 py-1 rounded-full',
                  getScoreColor(credibilityScore),
                )}
              >
                {credibilityScore}%
              </div>
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="6" r="2" fill="currentColor" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <circle cx="12" cy="18" r="2" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mb-3">
            <h2 className="text-xl font-bold mb-2">{headline}</h2>
            <p className="text-sm">{description}</p>
          </div>

          {/* References */}
          <div className="border-t border-b border-gray-200 py-2 mb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowReferences(!showReferences)}
            >
              <span className="text-sm font-medium text-gray-500">
                References {references.length}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-gray-500 transition-transform',
                  showReferences && 'transform rotate-180',
                )}
              />
            </div>

            {showReferences && (
              <div className="mt-2 space-y-2">
                {references.map((reference) => (
                  <div key={reference.id} className="text-xs">
                    <div className="flex items-center mb-1">
                      <span className="text-gray-500">
                        Reference {reference.id}
                      </span>
                      <button className="ml-auto">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M7 7L17 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:underline break-all"
                    >
                      {reference.url}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interaction buttons */}
          <div className="flex items-center text-sm text-gray-500 justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-4 bg-primary-foreground p-2 px-3 rounded-full mr-2">
                <button
                  className={cn(
                    'flex items-center mr-1',
                    upvoted && 'text-[#4F3E9E]',
                  )}
                  onClick={handleUpvote}
                >
                  <Flag className="h-5 w-5 mr-1 scale-x-[-1] stroke-green-600 fill-green-600" />
                  <span>{upvoteCount}</span>
                </button>
                <button
                  className={cn(
                    'flex items-center',
                    downvoted && 'text-[#4F3E9E]',
                  )}
                  onClick={handleDownvote}
                >
                  <Flag className="h-5 w-5 stroke-red-600 fill-red-600" />
                  <span>{downvoteCount}</span>
                </button>
              </div>

              <button className="flex items-center mr-2 bg-primary-foreground p-2 rounded-full">
                <MessagesSquare className="h-5 w-5 mr-1" />
              </button>
              <button className="flex items-center bg-primary-foreground p-2 rounded-full mr-2">
                <Share2 className="h-4 w-4 mr-1" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span>{stats.comments} comments</span>
              <span>{stats.shares} shares</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
