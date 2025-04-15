'use client';

import type React from 'react';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { createContext, useContext, useRef, useState } from 'react';
import { useComments } from './comment-context';

type ScrollFocusContextType = {
  focusInput: () => void;
};

const ScrollFocusContext = createContext<ScrollFocusContextType | null>(null);
export default function CommentEntry({
  children,
}: {
  children: React.ReactNode;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [commentType, setCommentType] = useState<
    'comment' | 'redflag' | 'greenflag'
  >('comment');
  const [commentText, setCommentText] = useState('');
  const [showReferenceInput, setShowReferenceInput] = useState(false);
  const [referenceText, setReferenceText] = useState('');
  const [references, setReferences] = useState<
    { id: number; title: string; url: string }[]
  >([]);
  const [newReferenceTitle, setNewReferenceTitle] = useState('');
  const [newReferenceUrl, setNewReferenceUrl] = useState('');

  // Get the addComment function from the context
  const { addComment } = useComments();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  };

  const handleAddReference = () => {
    if (newReferenceTitle && newReferenceUrl) {
      setReferences([
        ...references,
        {
          id: references.length + 1,
          title: newReferenceTitle,
          url: newReferenceUrl,
        },
      ]);
      setNewReferenceTitle('');
      setNewReferenceUrl('');
    }
  };

  const handlePostComment = () => {
    if (commentText.trim()) {
      // Create a new comment object
      const newComment = {
        user: {
          name: 'You', // Assuming the current user
          avatar: '/Default_pfp.svg',
          verified: false,
        },
        type: commentType,
        content: commentText,
        references: references,
        postReference: referenceText
          ? {
              text: referenceText,
              position: 'user-selected',
            }
          : undefined,
      };

      // Add the comment to the context
      addComment(newComment);

      // Reset form
      setCommentText('');
      setCommentType('comment');
      setReferenceText('');
      setReferences([]);
      setShowReferenceInput(false);
    }
  };

  return (
    <ScrollFocusContext.Provider value={{ focusInput }}>
      {children}
      {/* Comment input */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="relative h-8 w-8 mr-3">
              <Image
                src="/Default_pfp.svg"
                alt="Your profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              {/* Comment type selector */}
              <div className="flex mb-3 space-x-2">
                <button
                  onClick={() => setCommentType('comment')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    commentType === 'comment'
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Regular Comment
                </button>
                <button
                  onClick={() => setCommentType('greenflag')}
                  className={`px-3 py-1 text-xs rounded-full flex items-center ${
                    commentType === 'greenflag'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 scale-x-[-1]"
                    style={{
                      fill:
                        commentType === 'greenflag' ? 'rgb(22 163 74)' : 'none',
                      stroke:
                        commentType === 'greenflag'
                          ? 'rgb(22 163 74)'
                          : 'currentColor',
                    }}
                  >
                    <path
                      d="M4 21V16M4 16V5C4 4.44772 4.44772 4 5 4H19.4C19.7314 4 20 4.26863 20 4.6V15.4C20 15.7314 19.7314 16 19.4 16H4Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Support Credibility
                </button>
                <button
                  onClick={() => setCommentType('redflag')}
                  className={`px-3 py-1 text-xs rounded-full flex items-center ${
                    commentType === 'redflag'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                    style={{
                      fill:
                        commentType === 'redflag' ? 'rgb(220 38 38)' : 'none',
                      stroke:
                        commentType === 'redflag'
                          ? 'rgb(220 38 38)'
                          : 'currentColor',
                    }}
                  >
                    <path
                      d="M4 21V16M4 16V5C4 4.44772 4.44772 4 5 4H19.4C19.7314 4 20 4.26863 20 4.6V15.4C20 15.7314 19.7314 16 19.4 16H4Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Question Credibility
                </button>
              </div>

              {/* Reference selector for stand comments */}
              {(commentType === 'greenflag' || commentType === 'redflag') && (
                <div className="mb-3">
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
                      value={referenceText}
                      onChange={(e) => setReferenceText(e.target.value)}
                      placeholder="Copy and paste the specific text you're referencing..."
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[60px] text-xs mb-2"
                    ></textarea>
                  )}
                </div>
              )}

              {/* Comment text area */}
              <textarea
                ref={inputRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  commentType === 'comment'
                    ? 'Write a comment...'
                    : commentType === 'greenflag'
                      ? 'Explain why you believe this information is credible...'
                      : 'Explain why you question the credibility of this information...'
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] h-[100px] text-sm resize-none"
              ></textarea>

              {/* References section for stand comments */}
              {(commentType === 'greenflag' || commentType === 'redflag') && (
                <div className="mt-3 mb-3">
                  <p className="text-sm font-medium mb-1">
                    Add references to support your stance:
                  </p>

                  {/* Display added references */}
                  {references.length > 0 && (
                    <div className="bg-gray-50 p-2 rounded-md text-xs mb-2">
                      {references.map((ref, index) => (
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
                              setReferences(
                                references.filter((_, i) => i !== index),
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
                      className="p-2 border rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={newReferenceUrl}
                      onChange={(e) => setNewReferenceUrl(e.target.value)}
                      placeholder="URL (https://...)"
                      className="p-2 border rounded-lg text-xs"
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
                  onClick={handlePostComment}
                  disabled={!commentText.trim()}
                  className={`px-4 py-2 text-white rounded-lg text-sm ${
                    commentType === 'greenflag'
                      ? 'bg-green-600'
                      : commentType === 'redflag'
                        ? 'bg-red-600'
                        : 'bg-secondary'
                  } disabled:opacity-50`}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollFocusContext.Provider>
  );
}

export function useScrollFocus() {
  const context = useContext(ScrollFocusContext);
  if (!context)
    throw new Error('useScrollFocus must be used within ScrollFocusProvider');
  return context;
}
