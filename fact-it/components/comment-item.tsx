'use client';

import type React from 'react';

import Image from 'next/image';
import { Flag, MessagesSquare, Share2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Reply, CommentTreeItem } from '@/lib/data';

type CommentItemProps = {
  item: CommentTreeItem;
  children?: React.ReactNode;
  onReply?: (parentId: string) => void;
};

export function CommentItem({ item, children, onReply }: CommentItemProps) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(item.stats.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(item.stats.downvotes || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Determine if this is a reply (has level property) and get the level
  const isReply = 'level' in item;
  const level = isReply ? (item as Reply).level : 0;

  // Calculate left margin based on nesting level
  const marginLeft = level > 0 ? `${level * 2}rem` : '0';

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

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
    if (onReply) {
      onReply(item.id);
    }
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      console.log(`Replying to ${item.id}: ${replyText}`);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="comment-item">
      <div className="flex items-start mt-1" style={{ marginLeft }}>
        <div className="relative h-8 w-8 mr-3 mt-1">
          <Image
            src={'/Default_pfp.svg'}
            alt={item.user.name}
            fill
            className="rounded-full object-cover"
          />
          {item.user.verified && (
            <div className="absolute -bottom-1 -right-1 bg-[#4F3E9E] rounded-full p-0.5">
              <svg
                width="8"
                height="8"
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
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="font-semibold text-sm mr-2">{item.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {item.timestamp}
            </span>
          </div>
          <p className="text-sm mb-2">{item.content}</p>

          {item.references && item.references.length > 0 && (
            <div className="bg-gray-50 p-2 rounded-md text-xs mb-2">
              <p className="font-medium text-gray-700 mb-1">References:</p>
              {item.references.map((ref) => (
                <a
                  key={ref.id}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4F3E9E] hover:underline block"
                >
                  {ref.title}
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center text-xs text-gray-500">
            <button
              className={cn(
                'flex items-center mr-3 hover:text-[#4F3E9E]',
                upvoted && 'text-green-600',
              )}
              onClick={handleUpvote}
            >
              <Flag
                className={cn(
                  'h-3 w-3 mr-1 scale-x-[-1]',
                  upvoted && 'fill-green-600 stroke-green-600',
                )}
              />
              <span>{upvoteCount}</span>
            </button>
            <button
              className={cn(
                'flex items-center mr-3 hover:text-[#4F3E9E]',
                downvoted && 'text-red-600',
              )}
              onClick={handleDownvote}
            >
              <Flag
                className={cn(
                  'h-3 w-3 mr-1',
                  downvoted && 'fill-red-600 stroke-red-600',
                )}
              />
              <span>{downvoteCount}</span>
            </button>
            <button
              className="flex items-center mr-3 hover:text-[#4F3E9E]"
              onClick={handleReplyClick}
            >
              <MessagesSquare className="h-3 w-3 mr-1" />
              <span>Reply</span>
            </button>
            <button className="flex items-center hover:text-[#4F3E9E]">
              <Share2 className="h-3 w-3 mr-1" />
              <span>Share</span>
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-3 mb-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[60px] text-sm"
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  className="px-3 py-1 bg-secondary text-white rounded-lg text-xs"
                  onClick={handleSubmitReply}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render children (nested replies) */}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
