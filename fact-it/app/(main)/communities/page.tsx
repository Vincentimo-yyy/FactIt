import { getAllCommunities } from '@/lib/community-data';
import Image from 'next/image';
import Link from 'next/link';

export default function CommunitiesPage() {
  const communities = getAllCommunities();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Communities</h1>
      <p className="text-muted-foreground mb-8">
        Explore and join communities to connect with people who share your
        interests.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map((community) => (
          <Link href={`/communities/${community.id}`} key={community.id}>
            <div className="bg-white shadow-sm rounded-lg border h-full hover:shadow-md transition-shadow cursor-pointer">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={community.icon || '/placeholder.svg'}
                      alt={community.displayName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {community.displayName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {community.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {community.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{community.members}</span>
                  <span className="mx-2">•</span>
                  <span>{community.posts.length} posts</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
