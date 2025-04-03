import { getPostCardById } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Flag, MessageSquare, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const post = await getPostCardById(id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Post Content */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-0">
          <div className="px-4 py-4">
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
                <div className="flex items-center space-x-4 bg-primary-foreground p-1 rounded-full mr-2">
                  <button className="flex items-center mr-1">
                    <div className="flex items-center justify-center h-8 w-8 rounded-2xl group hover:bg-[#efecff]">
                      <Flag className="h-5 w-5 mr-1 scale-x-[-1] group-hover:stroke-green-600" />
                    </div>
                    <span>{post.stats.upvotes - post.stats.downvotes}</span>
                  </button>
                  <button className="flex items-center">
                    <div className="flex items-center justify-center h-8 w-8 rounded-2xl group hover:bg-[#efecff]">
                      <Flag className="h-5 w-5 group-hover:stroke-red-600" />
                    </div>
                  </button>
                </div>

                <button className="flex items-center mr-2 bg-primary-foreground p-2 rounded-full hover:bg-[#efecff]">
                  <MessageSquare className="h-5 w-5 mr-1" />
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
      </Card>

      {/* Comments Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <Card key={comment.id} className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="relative h-8 w-8 mr-3 mt-1">
                    <Image
                      src={'/Default_pfp.svg'}
                      alt={comment.user.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {comment.user.verified && (
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
                      <span className="font-semibold text-sm mr-2">
                        {comment.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>

                    {comment.references && comment.references.length > 0 && (
                      <div className="bg-gray-50 p-2 rounded-md text-xs mb-2">
                        <p className="font-medium text-gray-700 mb-1">
                          References:
                        </p>
                        {comment.references.map((ref) => (
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
                      <button className="flex items-center mr-3 hover:text-[#4F3E9E]">
                        <Flag className="h-3 w-3 mr-1 scale-x-[-1]" />
                        <span>{comment.stats.upvotes}</span>
                      </button>
                      <button className="flex items-center mr-3 hover:text-[#4F3E9E]">
                        <Flag className="h-3 w-3 mr-1" />
                        <span>{comment.stats.downvotes}</span>
                      </button>
                      <button className="flex items-center mr-3 hover:text-[#4F3E9E]">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        <span>Reply</span>
                      </button>
                      <button className="flex items-center hover:text-[#4F3E9E]">
                        <Share2 className="h-3 w-3 mr-1" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No comments yet. Be the first to comment!
          </p>
        )}

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
                <textarea
                  placeholder="Write a comment..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[80px] text-sm"
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button className="px-4 py-2 bg-secondary text-white rounded-lg text-sm">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
