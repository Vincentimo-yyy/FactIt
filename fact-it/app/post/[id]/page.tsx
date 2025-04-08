import { getPostCardById, buildCommentTree } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Flag, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PostClient from './postClient';
import CommentButton from '../../../components/comment-button';
import { CommentThread } from '@/components/comment-thread';
import CommentEntry from '@/components/comment-entry';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPostCardById(id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
      </div>
    );
  }

  // Build the nested comment tree
  const commentTree = buildCommentTree(id);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <CommentEntry>
        {/* Post Content */}
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
                          tag.toLowerCase() === 'technology' &&
                            'bg-[#E6F7FF] text-[#0E6292]',
                          tag.toLowerCase() === 'science' &&
                            'bg-[#F0F7FF] text-[#0E4A92]',
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
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">{post.headline}</h1>
                <p className="text-base mb-4">{post.description}</p>
              </div>

              {/* References */}
              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  References ({post.references.length})
                </h3>
                <div className="space-y-3">
                  {post.references.map((reference) => (
                    <div key={reference.id} className="text-sm">
                      <div className="flex items-center mb-1">
                        <span className="text-gray-700 font-medium">
                          {reference.title}
                        </span>
                      </div>
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4F3E9E] hover:underline break-all"
                      >
                        {reference.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interaction buttons */}
              <div className="flex items-center text-sm text-gray-500 justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center  bg-primary-foreground p-1 rounded-full">
                    <PostClient postData={post} />
                  </div>

                  <CommentButton />

                  <button className="flex items-center bg-primary-foreground p-2 rounded-full mr-2 hover:bg-[#efecff]">
                    <Share2 className="h-4 w-4 mr-1" />
                  </button>
                </div>

                <div className="flex text-[16px] items-center space-x-2">
                  <span>{post.stats.comments} comments</span>
                  <span>{post.stats.shares} shares</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          {/* Render the nested comment tree */}
          <CommentThread comments={commentTree} />
        </div>
      </CommentEntry>
    </div>
  );
}
