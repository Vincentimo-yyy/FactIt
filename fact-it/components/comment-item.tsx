'use client';

import type React from 'react';
import Image from 'next/image';
import { Flag, MessagesSquare, Share2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Reply, CommentTreeItem } from '@/lib/data';
import { useComments } from './comment-context';

type CommentItemProps = {
  item: CommentTreeItem;
  children?: React.ReactNode;
};

export function CommentItem({ item, children }: CommentItemProps) {
  const { addReply } = useComments();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(item.stats.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(item.stats.downvotes || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyType, setReplyType] = useState<
    'comment' | 'redflag' | 'greenflag'
  >('comment');
  const [replyReference, setReplyReference] = useState('');
  const [showReferenceInput, setShowReferenceInput] = useState(false);
  const [replyReferences, setReplyReferences] = useState<
    { id: number; title: string; url: string }[]
  >([]);
  const [newReferenceTitle, setNewReferenceTitle] = useState('');
  const [newReferenceUrl, setNewReferenceUrl] = useState('');

  // Determine if this is a reply (has level property) and get the level
  const isReply = 'level' in item;
  const level = isReply ? (item as Reply).level : 0;

  // Calculate left margin based on nesting level
  const marginLeft = level > 0 ? `${level * 2}rem` : '0';

  const handleUpvote = () => {
    setReplyType('greenflag');
    setShowReplyForm(true);
  };

  const handleDownvote = () => {
    setReplyType('redflag');
    setShowReplyForm(true);
  };

  const handleReplyClick = () => {
    setReplyType('comment');
    setShowReplyForm(!showReplyForm);
  };

  const handleAddReference = () => {
    if (newReferenceTitle && newReferenceUrl) {
      setReplyReferences([
        ...replyReferences,
        {
          id: replyReferences.length + 1,
          title: newReferenceTitle,
          url: newReferenceUrl,
        },
      ]);
      setNewReferenceTitle('');
      setNewReferenceUrl('');
    }
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // Create a new reply object
      const newReply = {
        user: {
          name: 'You', // Assuming the current user
          avatar: '/Default_pfp.svg',
          verified: false,
        },
        type: replyType,
        content: replyText,
        references: replyReferences,
        postReference: replyReference
          ? {
              text: replyReference,
              position: 'user-selected',
            }
          : undefined,
      };

      // Add the reply to the context
      addReply(item.id, newReply);

      // Update UI based on reply type
      if (replyType === 'greenflag') {
        setUpvoted(true);
        setUpvoteCount(upvoteCount + 1);
        if (downvoted) {
          setDownvoted(false);
          setDownvoteCount(downvoteCount - 1);
        }
      } else if (replyType === 'redflag') {
        setDownvoted(true);
        setDownvoteCount(downvoteCount + 1);
        if (upvoted) {
          setUpvoted(false);
          setUpvoteCount(upvoteCount - 1);
        }
      }

      // Reset form
      setReplyText('');
      setReplyType('comment');
      setReplyReference('');
      setReplyReferences([]);
      setShowReplyForm(false);
      setShowReferenceInput(false);
    }
  };

  // Get background color based on comment type
  const getCommentTypeBackground = () => {
    if (item.type === 'greenflag')
      return 'bg-green-50 border-l-4 border-green-500';
    if (item.type === 'redflag') return 'bg-red-50 border-l-4 border-red-500';
    return '';
  };

  return (
    <div className="comment-item">
      <div
        className={`flex items-start mt-1 ${getCommentTypeBackground()}`}
        style={{ marginLeft }}
      >
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
            {item.type === 'greenflag' && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">
                Supports Credibility
              </span>
            )}
            {item.type === 'redflag' && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full mr-2">
                Questions Credibility
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {item.timestamp}
            </span>
          </div>

          {/* Display referenced text if available */}
          {item.postReference && (
            <div className="bg-gray-100 p-2 rounded-md text-xs mb-2 border-l-2 border-gray-400">
              <p className="font-medium text-gray-700 mb-1">Referenced:</p>
              <p className="italic">{`"${item.postReference.text}"`}</p>
            </div>
          )}

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
              {/* Reply type indicator */}
              <div className="mb-2 flex items-center">
                {replyType === 'greenflag' && (
                  <div className="flex items-center text-green-600 text-xs font-medium">
                    <Flag className="h-3 w-3 mr-1 scale-x-[-1] fill-green-600 stroke-green-600" />
                    <span>Supporting with evidence</span>
                  </div>
                )}
                {replyType === 'redflag' && (
                  <div className="flex items-center text-red-600 text-xs font-medium">
                    <Flag className="h-3 w-3 mr-1 fill-red-600 stroke-red-600" />
                    <span>Questioning with evidence</span>
                  </div>
                )}
                {replyType === 'comment' && (
                  <div className="flex items-center text-gray-600 text-xs font-medium">
                    <MessagesSquare className="h-3 w-3 mr-1" />
                    <span>Regular comment</span>
                  </div>
                )}
              </div>

              {/* Reference selector */}
              {(replyType === 'greenflag' || replyType === 'redflag') && (
                <div className="mb-2">
                  <button
                    onClick={() => setShowReferenceInput(!showReferenceInput)}
                    className="text-xs text-[#4F3E9E] underline mb-1"
                  >
                    {showReferenceInput
                      ? 'Hide reference selector'
                      : 'Reference specific text'}
                  </button>

                  {showReferenceInput && (
                    <textarea
                      value={replyReference}
                      onChange={(e) => setReplyReference(e.target.value)}
                      placeholder="Copy and paste the specific text you're referencing..."
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[60px] text-xs mb-2"
                    ></textarea>
                  )}
                </div>
              )}

              {/* Reply text */}
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={
                  replyType === 'comment'
                    ? 'Write your reply...'
                    : replyType === 'greenflag'
                      ? 'Explain why you believe this information is credible...'
                      : 'Explain why you question the credibility of this information...'
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[60px] text-sm"
              ></textarea>

              {/* References section */}
              {(replyType === 'greenflag' || replyType === 'redflag') && (
                <div className="mt-2 mb-2">
                  <p className="text-xs font-medium mb-1">
                    Add references to support your stance:
                  </p>

                  {/* Display added references */}
                  {replyReferences.length > 0 && (
                    <div className="bg-gray-50 p-2 rounded-md text-xs mb-2">
                      {replyReferences.map((ref, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between mb-1"
                        >
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4F3E9E] hover:underline"
                          >
                            {ref.title}
                          </a>
                          <button
                            onClick={() =>
                              setReplyReferences(
                                replyReferences.filter((_, i) => i !== index),
                              )
                            }
                            className="text-red-500 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new reference form */}
                  <div className="flex flex-col space-y-1 mb-2">
                    <input
                      type="text"
                      value={newReferenceTitle}
                      onChange={(e) => setNewReferenceTitle(e.target.value)}
                      placeholder="Reference title"
                      className="p-1 border rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={newReferenceUrl}
                      onChange={(e) => setNewReferenceUrl(e.target.value)}
                      placeholder="URL (https://...)"
                      className="p-1 border rounded-lg text-xs"
                    />
                    <button
                      onClick={handleAddReference}
                      disabled={!newReferenceTitle || !newReferenceUrl}
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg text-xs disabled:opacity-50"
                    >
                      Add Reference
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-2">
                <button
                  className={`px-3 py-1 text-white rounded-lg text-xs ${
                    replyType === 'greenflag'
                      ? 'bg-green-600'
                      : replyType === 'redflag'
                        ? 'bg-red-600'
                        : 'bg-secondary'
                  }`}
                  onClick={handleSubmitReply}
                >
                  {replyType === 'comment' ? 'Reply' : 'Submit'}
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
