'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, Eye, Globe, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Community data type
type Community = {
  id: string;
  name: string;
  members: string;
  icon: React.ReactNode;
};

// Sample community data
const communities: Community[] = [
  {
    id: 'tilthpth',
    name: '@TILTHPTH',
    members: '4.2M followers',
    icon: (
      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs">
        T
      </div>
    ),
  },
  {
    id: 'abcdefghp',
    name: '@ABCDEFGHP',
    members: '3.8M followers',
    icon: (
      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
        <MessageCircle className="w-3 h-3 text-gray-600" />
      </div>
    ),
  },
  {
    id: 'newsandpolitics',
    name: '@NewsAndPolitics',
    members: '2.7M followers',
    icon: (
      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
        <Globe className="w-3 h-3 text-white" />
      </div>
    ),
  },
  {
    id: 'popularglobal',
    name: '@PopularGlobal',
    members: '1.9M followers',
    icon: (
      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
        <Eye className="w-3 h-3 text-white" />
      </div>
    ),
  },
  {
    id: 'cnnpths',
    name: '@CNNPTHS',
    members: '1.5M followers',
    icon: (
      <div className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center text-white text-xs">
        C
      </div>
    ),
  },
  {
    id: 'prbcommunity',
    name: '@PRBCommunity',
    members: '925K followers',
    icon: (
      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
        <Eye className="w-3 h-3 text-white" />
      </div>
    ),
  },
  {
    id: 'youtube',
    name: '@YouTube',
    members: '825K followers',
    icon: (
      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
        <Youtube className="w-3 h-3 text-white" />
      </div>
    ),
  },
];

export function PopularCommunities() {
  const router = useRouter();

  const handleCommunityClick = (communityId: string) => {
    // Navigate to the community page using the ID as the slug
    router.push(`/communities/${communityId}`);
  };

  return (
    <Card className="border-none shadow-sm mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#4F3E9E] text-lg font-semibold flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              fill="#4F3E9E"
            />
            <path
              d="M18 21C19.1046 21 20 20.1046 20 19C20 17.8954 19.1046 17 18 17C16.8954 17 16 17.8954 16 19C16 20.1046 16.8954 21 18 21Z"
              fill="#4F3E9E"
            />
            <path
              d="M6 21C7.10457 21 8 20.1046 8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21Z"
              fill="#4F3E9E"
            />
            <path
              d="M18 15C15.7909 15 14 16.7909 14 19H20C20 16.7909 18.2091 15 18 15Z"
              fill="#4F3E9E"
            />
            <path
              d="M12 13C9.23858 13 7 15.2386 7 18H17C17 15.2386 14.7614 13 12 13Z"
              fill="#4F3E9E"
            />
            <path
              d="M6 15C3.79086 15 2 16.7909 2 19H8C8 16.7909 6.20914 15 6 15Z"
              fill="#4F3E9E"
            />
          </svg>
          Popular Communities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {communities.map((community) => (
            <button
              key={community.id}
              className="w-full flex items-center space-x-3 py-1 hover:bg-muted rounded-md transition-colors px-1"
              onClick={() => handleCommunityClick(community.id)}
            >
              {community.icon}
              <div className="text-left">
                <p className="font-medium text-sm">{community.name}</p>
                <p className="text-xs text-muted-foreground">
                  {community.members}
                </p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
