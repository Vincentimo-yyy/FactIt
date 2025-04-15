'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, MessagesSquare, Share2, Flag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { PostCard } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: PostCard;
}

export function FactCard({ post }: PostCardProps) {
  const router = useRouter();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(post.stats.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(post.stats.downvotes || 0);
  const [showReferences, setShowReferences] = useState(false);
  const [showJustificationForm, setShowJustificationForm] = useState(false);
  const [justificationType, setJustificationType] = useState<
    'greenflag' | 'redflag'
  >('greenflag');
  const [justificationText, setJustificationText] = useState('');
  const [selectedReference, setSelectedReference] = useState('');
  const [customReferences, setCustomReferences] = useState<
    { id: number; title: string; url: string }[]
  >([]);
  const [newReferenceTitle, setNewReferenceTitle] = useState('');
  const [newReferenceUrl, setNewReferenceUrl] = useState('');

  const handleCommentsClick = () => {
    router.push(`/post/${post.id}`);
  };

  const handleUpvote = () => {
    if (upvoted) {
      // If already upvoted, just remove the upvote
      setUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
    } else {
      // Show justification form for upvote
      setJustificationType('greenflag');
      setShowJustificationForm(true);
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      // If already downvoted, just remove the downvote
      setDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
    } else {
      // Show justification form for downvote
      setJustificationType('redflag');
      setShowJustificationForm(true);
    }
  };

  const handleAddReference = () => {
    if (newReferenceTitle && newReferenceUrl) {
      setCustomReferences([
        ...customReferences,
        {
          id: customReferences.length + 1,
          title: newReferenceTitle,
          url: newReferenceUrl,
        },
      ]);
      setNewReferenceTitle('');
      setNewReferenceUrl('');
    }
  };

  const handleSubmitJustification = () => {
    if (justificationText.trim()) {
      console.log(
        `Submitting ${justificationType} justification: ${justificationText}`,
      );
      console.log(`Selected reference: ${selectedReference}`);
      console.log(`Custom references:`, customReferences);

      // Here you would typically send this data to your backend

      // Update UI
      if (justificationType === 'greenflag') {
        setUpvoted(true);
        setUpvoteCount(upvoteCount + 1);
        if (downvoted) {
          setDownvoted(false);
          setDownvoteCount(downvoteCount - 1);
        }
      } else {
        setDownvoted(true);
        setDownvoteCount(downvoteCount + 1);
        if (upvoted) {
          setUpvoted(false);
          setUpvoteCount(upvoteCount - 1);
        }
      }

      // Reset form
      setShowJustificationForm(false);
      setJustificationText('');
      setSelectedReference('');
      setCustomReferences([]);
    }
  };

  const handleCancelJustification = () => {
    setShowJustificationForm(false);
    setJustificationText('');
    setSelectedReference('');
    setCustomReferences([]);
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
                    src="/Default_pfp.svg"
                    alt={post.user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {post.user.verified && (
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
                  <div className="font-semibold">{post.user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {post.timestamp}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1 mt-1 ml-12">
                {post.tags.map((tag, index) => (
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
            <div className="flex items-center mb-4">
              <Flag className="h-5 w-5 mr-1 scale-x-[-1] stroke-green-600 fill-green-600" />
              <div
                className={cn(
                  'text-white text-xs font-medium px-2 py-1 rounded-full',
                  getScoreColor(post.credibilityScore),
                )}
              >
                {post.credibilityScore}%
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
            <h2 className="text-xl font-bold mb-2">{post.headline}</h2>
            <p className="text-sm">{post.description}</p>
          </div>

          {/* References */}
          <div className="border-t border-b border-gray-200 py-2 mb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowReferences(!showReferences)}
            >
              <span className="text-sm font-medium text-gray-500">
                References {post.references.length}
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
                {post.references.map((reference) => (
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
              <div className="flex items-center space-x-4 bg-primary-foreground p-1  rounded-full mr-2">
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
                  className={cn('flex items-center', downvoted && 'fill-red')}
                  onClick={handleDownvote}
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-2xl group hover:bg-[#efecff]">
                    <Flag
                      className={`h-5 w-5 group-hover:stroke-red-600 ${downvoted ? 'fill-red-600 stroke-red-600' : ''}`}
                    />
                  </div>
                </button>
              </div>

              <button
                onClick={handleCommentsClick}
                className="flex items-center mr-2 bg-primary-foreground p-2 rounded-full hover:bg-[#efecff]"
              >
                <MessagesSquare className="h-5 w-5 mr-1" />
              </button>
              <button className="flex items-center bg-primary-foreground p-2 rounded-full mr-2 hover:bg-[#efecff]">
                <Share2 className="h-4 w-4 mr-1" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span>{post.stats.comments} comments</span>
              <span>{post.stats.shares} shares</span>
            </div>
          </div>
        </div>
      </CardContent>
      {showJustificationForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <Flag
                  className={`h-4 w-4 mr-2 ${
                    justificationType === 'greenflag'
                      ? 'fill-green-600 stroke-green-600 scale-x-[-1]'
                      : 'fill-red-600 stroke-red-600'
                  }`}
                />
                {justificationType === 'greenflag'
                  ? 'Support Credibility'
                  : 'Question Credibility'}
              </h3>
            </div>

            <div className="p-4">
              {/* Reference selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Reference specific content from the post (optional):
                </label>
                <select
                  className="w-full p-2 border rounded-lg text-sm"
                  value={selectedReference}
                  onChange={(e) => setSelectedReference(e.target.value)}
                >
                  <option value="">Select content to reference</option>
                  <option value={post.headline}>
                    Headline: {post.headline}
                  </option>
                  <option value={post.description}>
                    Description: {post.description}
                  </option>
                </select>
              </div>

              {/* Justification text */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {justificationType === 'greenflag'
                    ? 'Explain why you believe this information is credible:'
                    : 'Explain why you question the credibility of this information:'}
                </label>
                <textarea
                  value={justificationText}
                  onChange={(e) => setJustificationText(e.target.value)}
                  placeholder="Provide your reasoning..."
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[100px] text-sm"
                  required
                ></textarea>
              </div>

              {/* References section */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  References from the post:
                </label>
                <div className="bg-gray-50 p-2 rounded-md mb-2">
                  {post.references.map((ref) => (
                    <div key={ref.id} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        id={`ref-${ref.id}`}
                        className="mr-2"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCustomReferences([...customReferences, ref]);
                          } else {
                            setCustomReferences(
                              customReferences.filter((r) => r.id !== ref.id),
                            );
                          }
                        }}
                      />
                      <label htmlFor={`ref-${ref.id}`} className="text-sm">
                        {ref.title}
                      </label>
                    </div>
                  ))}
                </div>

                <label className="block text-sm font-medium mb-1">
                  Add your own references:
                </label>

                {/* Display added custom references */}
                {customReferences.filter(
                  (ref) => !post.references.some((r) => r.id === ref.id),
                ).length > 0 && (
                  <div className="bg-gray-50 p-2 rounded-md text-sm mb-2">
                    {customReferences
                      .filter(
                        (ref) => !post.references.some((r) => r.id === ref.id),
                      )
                      .map((ref, index) => (
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
                              setCustomReferences(
                                customReferences.filter((r) => r !== ref),
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
                <div className="flex flex-col space-y-2 mb-2">
                  <input
                    type="text"
                    value={newReferenceTitle}
                    onChange={(e) => setNewReferenceTitle(e.target.value)}
                    placeholder="Reference title"
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={newReferenceUrl}
                    onChange={(e) => setNewReferenceUrl(e.target.value)}
                    placeholder="URL (https://...)"
                    className="p-2 border rounded-lg text-sm"
                  />
                  <button
                    onClick={handleAddReference}
                    disabled={!newReferenceTitle || !newReferenceUrl}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm disabled:opacity-50"
                  >
                    Add Reference
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end space-x-2">
              <button
                onClick={handleCancelJustification}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitJustification}
                disabled={!justificationText.trim()}
                className={`px-4 py-2 text-white rounded-lg text-sm ${
                  justificationType === 'greenflag'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                } disabled:opacity-50`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
