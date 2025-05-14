'use client';

import { useState, useEffect } from 'react';
import { Search, TrendingUp, Hash, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCommunities, type Community } from '@/lib/community-data';
import { getPostCards, type PostCard } from '@/lib/data';
import { FactCard } from '@/components/fact-card';

// Define categories for exploration
const categories = [
  { id: 'all', name: 'All', icon: <TrendingUp size={16} /> },
  { id: 'news', name: 'News', icon: <Hash size={16} /> },
  { id: 'politics', name: 'Politics', icon: <Hash size={16} /> },
  { id: 'technology', name: 'Technology', icon: <Hash size={16} /> },
  { id: 'entertainment', name: 'Entertainment', icon: <Hash size={16} /> },
  { id: 'science', name: 'Science', icon: <Hash size={16} /> },
  { id: 'health', name: 'Health', icon: <Hash size={16} /> },
  { id: 'education', name: 'Education', icon: <Hash size={16} /> },
];

// Define trending topics
const trendingTopics = [
  'Fact Checking',
  'Misinformation',
  'Media Literacy',
  'Digital Citizenship',
  'Source Verification',
  'Critical Thinking',
  'Information Evaluation',
  'News Analysis',
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(
    [],
  );
  const [filteredPosts, setFilteredPosts] = useState<PostCard[]>([]);
  const [activeTab, setActiveTab] = useState<
    'communities' | 'posts' | 'topics'
  >('communities');

  // Get all communities and posts
  const communities = getAllCommunities();

  // Filter content based on search query and selected category
  useEffect(() => {
    // Filter communities
    const communitiesResult = communities.filter((community) => {
      const matchesSearch =
        searchQuery === '' ||
        community.displayName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        community.tags.some(
          (tag) => tag.toLowerCase() === selectedCategory.toLowerCase(),
        );

      return matchesSearch && matchesCategory;
    });

    setFilteredCommunities(communitiesResult);
  }, [searchQuery, selectedCategory, communities]);

  useEffect(() => {
    async function fetchAndFilterPosts() {
      const posts = await getPostCards();
      const filtered = posts.filter((post) => {
        const matchesSearch =
          searchQuery === '' ||
          post.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === 'all' ||
          post.tags.some(
            (tag) => tag.toLowerCase() === selectedCategory.toLowerCase(),
          );

        return matchesSearch && matchesCategory;
      });
      setFilteredPosts(filtered);
    }

    fetchAndFilterPosts();
  }, [searchQuery, selectedCategory]);

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-secondary">Explore</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search communities, posts, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-10 pr-10 bg-[#F3F0FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F3E9E]"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-secondary text-white'
                  : 'bg-[#F3F0FF] text-secondary hover:bg-[#E6E0FF]'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('communities')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'communities'
              ? 'text-secondary border-b-2 border-secondary'
              : 'text-muted-foreground'
          }`}
        >
          Communities
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'posts'
              ? 'text-secondary border-b-2 border-secondary'
              : 'text-muted-foreground'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'topics'
              ? 'text-secondary border-b-2 border-secondary'
              : 'text-muted-foreground'
          }`}
        >
          Trending Topics
        </button>
      </div>

      {/* Communities Tab Content */}
      {activeTab === 'communities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCommunities.length > 0 ? (
            filteredCommunities.map((community) => (
              <Link key={community.id} href={`/communities/${community.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 relative mr-3 rounded-full overflow-hidden bg-white border">
                        <Image
                          src={community.icon || '/placeholder.svg'}
                          alt={community.displayName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {community.displayName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {community.members}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {community.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {community.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[#F3F0FF] text-secondary text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No communities found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Posts Tab Content */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <FactCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No posts found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Trending Topics Tab Content */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingTopics.map((topic, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#F3F0FF] text-secondary rounded-full mr-3">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{topic}</h3>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 1000) + 100} posts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* For You Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communities.slice(0, 3).map((community) => (
            <Link key={community.id} href={`/communities/${community.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 relative mr-2 rounded-full overflow-hidden bg-white border">
                      <Image
                        src={community.icon || '/placeholder.svg'}
                        alt={community.displayName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {community.displayName}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {community.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {community.members}
                    </span>
                    <button className="px-3 py-1 bg-secondary text-white text-xs rounded-full">
                      Join
                    </button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
