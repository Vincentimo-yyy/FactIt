import { getCommunityById } from '@/lib/community-data';
import { Flag, MessageSquare, Share2, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const community = getCommunityById(name);

  if (!community) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Community not found</h1>
        <p className="mb-6">
          The community you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/communities"
          className="px-4 py-2 bg-secondary text-white rounded-lg"
        >
          Back to Communities
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Community Header with Cover Image */}
      <div className="relative h-48 md:h-64 w-full mb-16">
        <Image
          src={community.coverImage || '/placeholder.svg'}
          alt={community.displayName}
          fill
          className="object-cover rounded-t-lg"
        />
        <div className="absolute -bottom-12 left-6 flex items-end">
          <div className="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden bg-white">
            <Image
              src={community.icon || '/placeholder.svg'}
              alt={community.displayName}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-4 mb-2">
            <h1 className="text-2xl font-bold">{community.displayName}</h1>
            <p className="text-muted-foreground">{community.name}</p>
          </div>
        </div>
      </div>

      {/* Community Info and Actions */}
      <div className="px-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center text-sm text-muted-foreground mb-4 md:mb-0">
          <Users className="h-4 w-4 mr-1" />
          <span>{community.members}</span>
          <span className="mx-2">•</span>
          <span>{community.posts.length} posts</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">
            Join Community
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content - Posts */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>

          {community.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-sm rounded-lg overflow-hidden border"
            >
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{post.author}</span>
                    <span className="mx-2 text-xs text-muted-foreground">
                      •
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`text-white text-xs font-medium px-2 py-1 rounded-full ${
                        post.credibilityScore >= 70
                          ? 'bg-green-500'
                          : post.credibilityScore >= 40
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                    >
                      {post.credibilityScore}%
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-sm mb-3">{post.content}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#F3F0FF] text-secondary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Flag className="h-4 w-4 mr-1 scale-x-[-1]" />
                      <span>{post.upvotes - post.downvotes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar - About and Rules */}
        <div className="space-y-4">
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">About Community</h3>
              <p className="text-sm mb-4">{community.description}</p>

              <div className="text-sm text-muted-foreground mb-2">
                <span className="font-medium">Created:</span> January 2020
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {community.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#F3F0FF] text-secondary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg border">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Community Rules</h3>
              <div className="space-y-3">
                {community.rules.map((rule, index) => (
                  <div key={index}>
                    <p className="font-medium text-sm">
                      {index + 1}. {rule.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {rule.description}
                    </p>
                    {index < community.rules.length - 1 && (
                      <div className="my-2 border-t border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg border">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Moderators</h3>
              <div className="space-y-2">
                {community.moderators.map((mod, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-xs mr-2">
                      {mod.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm">{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
