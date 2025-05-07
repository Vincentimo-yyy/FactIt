'use client';
import React from 'react';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  getAllCommunities,
  type Community,
  type CommunityPost,
} from '@/lib/community-data';
import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

export default function PopularPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Get all communities
  const communities = getAllCommunities();

  // Collect all community posts and sort by popularity
  const allCommunityPosts: Array<{
    post: CommunityPost;
    community: Community;
  }> = [];

  communities.forEach((community) => {
    community.posts.forEach((post) => {
      allCommunityPosts.push({
        post,
        community,
      });
    });
  });

  // Create trending items from communities
  const trendingCommunities = [...communities]
    .sort(
      (a, b) =>
        Number.parseInt(a.members.replace(/[^0-9]/g, '')) -
        Number.parseInt(b.members.replace(/[^0-9]/g, '')),
    )
    .slice(0, 6); // Get top 6 communities for the carousel

  // Handle carousel navigation
  const nextSlide = () => {
    if (carouselRef.current) {
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newScrollLeft = Math.min(
        carouselRef.current.scrollLeft + 300,
        maxScrollLeft,
      );
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const newScrollLeft = Math.max(carouselRef.current.scrollLeft - 300, 0);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Trending Communities Carousel */}
      <div className="mb-6 p-2">
        <h1 className="text-2xl font-bold mb-4 text-secondary px-4">
          Popular Communities
        </h1>

        {/* Carousel container */}
        <div className="relative px-4">
          <div className="flex items-center">
            {/* Left navigation button */}
            <button
              onClick={prevSlide}
              className="bg-white shadow-md hover:bg-gray-100 rounded-full p-2 z-10 mr-2 flex-shrink-0"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="text-secondary" />
            </button>

            {/* Carousel items */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {trendingCommunities.map((community) => (
                <Link
                  key={community.id}
                  href={`/communities/${community.id}`}
                  className="snap-start flex-shrink-0"
                  style={{ width: isMobile ? '85%' : '300px' }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow border overflow-hidden">
                    <div className="relative h-24 w-full">
                      <Image
                        src={community.coverImage || '/placeholder.svg'}
                        alt={community.displayName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 relative mr-3 rounded-full overflow-hidden bg-white border">
                          <Image
                            src={community.icon || '/placeholder.svg'}
                            alt={community.displayName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold line-clamp-1">
                            {community.displayName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {community.members}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2 text-muted-foreground mb-3">
                        {community.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {community.tags.slice(0, 2).map((tag) => (
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
              ))}
            </div>

            {/* Right navigation button */}
            <button
              onClick={nextSlide}
              className="bg-white shadow-md hover:bg-gray-100 rounded-full p-2 z-10 ml-2 flex-shrink-0"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
