export interface Community {
  id: string;
  name: string;
  displayName: string;
  members: string;
  description: string;
  icon: string;
  coverImage: string;
  posts: CommunityPost[];
  moderators: string[];
  rules: { title: string; description: string }[];
  tags: string[];
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  tags: string[];
  credibilityScore: number;
}

// Sample community data
export const communities: Community[] = [
  {
    id: 'tilthpth',
    name: '@TILTHPTH',
    displayName: 'Today I Learned That Happened',
    members: '4.2M followers',
    description:
      'A community dedicated to sharing interesting facts and surprising discoveries that people learned today.',
    icon: '/placeholder.svg?height=80&width=80',
    coverImage: '/placeholder.svg?height=300&width=1200',
    moderators: ['user123', 'mod456', 'admin789'],
    rules: [
      {
        title: 'Posts must be factual',
        description:
          'All posts must be verifiable facts with credible sources.',
      },
      {
        title: 'Be respectful',
        description: 'No harassment, hate speech, or personal attacks.',
      },
      {
        title: 'No politics',
        description:
          'This is not a political forum. Keep posts neutral and educational.',
      },
    ],
    tags: ['Education', 'Facts', 'Learning'],
    posts: [
      {
        id: 'post1',
        title:
          'TIL that honey never spoils and archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.',
        content:
          "Honey's unique chemical properties make it one of the only foods that doesn't spoil. Its low moisture content and acidic pH create an environment where bacteria cannot survive.",
        author: 'FactEnthusiast',
        timestamp: '2 hours ago',
        upvotes: 1245,
        downvotes: 32,
        comments: 87,
        tags: ['History', 'Food', 'Science'],
        credibilityScore: 92,
      },
      {
        id: 'post2',
        title:
          'TIL that octopuses have three hearts, nine brains, and blue blood.',
        content:
          'Octopuses have one main brain and a mini-brain in each of their eight arms. They also have three hearts - one pumps blood through the body while the other two pump blood through the gills.',
        author: 'OceanExplorer',
        timestamp: '5 hours ago',
        upvotes: 876,
        downvotes: 21,
        comments: 54,
        tags: ['Biology', 'Marine Life'],
        credibilityScore: 95,
      },
    ],
  },
  {
    id: 'abcdefghp',
    name: '@ABCDEFGHP',
    displayName: 'Alphabet Soup Community',
    members: '3.8M followers',
    description:
      'A community for language enthusiasts, word games, and linguistic discussions.',
    icon: '/placeholder.svg?height=80&width=80',
    coverImage: '/placeholder.svg?height=300&width=1200',
    moderators: ['wordsmith', 'grammar_guru', 'lexicon_lover'],
    rules: [
      {
        title: 'Keep it clean',
        description: 'No profanity or offensive language.',
      },
      {
        title: 'Stay on topic',
        description:
          'All posts should relate to language, words, or linguistics.',
      },
    ],
    tags: ['Language', 'Words', 'Linguistics'],
    posts: [
      {
        id: 'post1',
        title:
          "The longest word in English without repeating any letters is 'uncopyrightable'",
        content:
          "At 15 letters long, 'uncopyrightable' is the longest English word where no letter appears more than once.",
        author: 'WordWizard',
        timestamp: '3 hours ago',
        upvotes: 542,
        downvotes: 18,
        comments: 32,
        tags: ['Words', 'Trivia'],
        credibilityScore: 88,
      },
    ],
  },
  {
    id: 'newsandpolitics',
    name: '@NewsAndPolitics',
    displayName: 'News & Politics',
    members: '2.7M followers',
    description:
      'A community for discussing current events, news stories, and political developments from around the world.',
    icon: '/placeholder.svg?height=80&width=80',
    coverImage: '/placeholder.svg?height=300&width=1200',
    moderators: ['news_junkie', 'political_analyst', 'fact_checker'],
    rules: [
      {
        title: 'Cite sources',
        description: 'All news claims must include credible sources.',
      },
      {
        title: 'No misinformation',
        description: 'Spreading false information will result in a ban.',
      },
      {
        title: 'Civil discussion',
        description: 'Respect different viewpoints and engage constructively.',
      },
    ],
    tags: ['News', 'Politics', 'Current Events'],
    posts: [
      {
        id: 'post1',
        title:
          'Breaking: New climate agreement reached at international summit',
        content:
          'World leaders have agreed to new carbon reduction targets at the latest climate summit, with major economies pledging to cut emissions by 50% by 2030.',
        author: 'GlobalReporter',
        timestamp: '1 hour ago',
        upvotes: 1876,
        downvotes: 243,
        comments: 412,
        tags: ['Climate', 'International', 'Politics'],
        credibilityScore: 85,
      },
    ],
  },
  {
    id: 'popularglobal',
    name: '@PopularGlobal',
    displayName: 'Popular Global',
    members: '1.9M followers',
    description: 'Trending topics and viral content from around the world.',
    icon: '/placeholder.svg?height=80&width=80',
    coverImage: '/placeholder.svg?height=300&width=1200',
    moderators: ['trend_spotter', 'viral_curator'],
    rules: [
      {
        title: 'Keep it fresh',
        description: 'Content should be recent and trending.',
      },
      {
        title: 'Global perspective',
        description: 'Content from all regions is welcome.',
      },
    ],
    tags: ['Trending', 'Viral', 'Global'],
    posts: [
      {
        id: 'post1',
        title:
          'This drone footage of an erupting volcano has gone viral with over 50 million views',
        content:
          'A photographer captured stunning aerial footage of the recent volcanic eruption, showing rivers of lava from a perspective never seen before.',
        author: 'ViralHunter',
        timestamp: '6 hours ago',
        upvotes: 24532,
        downvotes: 132,
        comments: 1243,
        tags: ['Video', 'Nature', 'Photography'],
        credibilityScore: 90,
      },
    ],
  },
  {
    id: 'cnnpths',
    name: '@CNNPTHS',
    displayName: 'CNN Philippines',
    members: '1.5M followers',
    description: 'Official community for CNN Philippines news and updates.',
    icon: '/placeholder.svg?height=80&width=80',
    coverImage: '/placeholder.svg?height=300&width=1200',
    moderators: ['cnn_admin', 'news_editor', 'ph_correspondent'],
    rules: [
      {
        title: 'Official content only',
        description: 'Only verified CNN Philippines content is allowed.',
      },
      {
        title: 'No fake news',
        description: 'Spreading misinformation will result in immediate ban.',
      },
    ],
    tags: ['News', 'Philippines', 'CNN'],
    posts: [
      {
        id: 'post1',
        title:
          'Typhoon Mawar approaches Philippines, evacuations underway in coastal areas',
        content:
          'Authorities have begun evacuating residents from coastal areas as Typhoon Mawar is expected to make landfall within 48 hours. The storm has intensified to Category 4.',
        author: 'CNNPhilippines',
        timestamp: '30 minutes ago',
        upvotes: 3421,
        downvotes: 45,
        comments: 567,
        tags: ['Weather', 'Disaster', 'Safety'],
        credibilityScore: 97,
      },
    ],
  },
  {
    id: 'prbcommunity',
    name: '@PRBCommunity',
    displayName: 'Philippine Reality Bytes',
    members: '925K followers',
    description:
      'A community discussing Philippine reality shows, entertainment, and celebrity news.',
    icon: '/placeholder.svg?height=80&width=80',
    coverImage: '/placeholder.svg?height=300&width=1200',
    moderators: ['reality_fan', 'celeb_watcher', 'show_critic'],
    rules: [
      {
        title: 'No spoilers',
        description: 'Use spoiler tags for recent episodes.',
      },
      {
        title: 'Respect privacy',
        description: "No sharing of celebrities' private information.",
      },
    ],
    tags: ['Entertainment', 'Reality TV', 'Celebrities'],
    posts: [
      {
        id: 'post1',
        title:
          'PBB Season 15 finale breaks viewership records with 12.5 million concurrent viewers',
        content:
          'The season finale of Pinoy Big Brother reached unprecedented viewership numbers across TV and streaming platforms, becoming the most-watched reality show episode in Philippine television history.',
        author: 'RealityTVExpert',
        timestamp: '12 hours ago',
        upvotes: 5432,
        downvotes: 321,
        comments: 876,
        tags: ['PBB', 'TV Ratings', 'Entertainment'],
        credibilityScore: 82,
      },
    ],
  },
  {
    id: 'youtube',
    name: '@YouTube',
    displayName: 'YouTube Community',
    members: '825K followers',
    description:
      'Discussions about YouTube content, creators, and platform updates.',
    icon: '/placeholder.svg?height=80&width=80',
    coverImage: '/placeholder.svg?height=300&width=1200',
    moderators: ['tube_enthusiast', 'content_creator', 'video_expert'],
    rules: [
      {
        title: 'No self-promotion',
        description: "Don't spam your own channels or videos.",
      },
      {
        title: 'Credit creators',
        description: 'Always give proper attribution when discussing content.',
      },
    ],
    tags: ['YouTube', 'Video', 'Creators'],
    posts: [
      {
        id: 'post1',
        title:
          'YouTube announces new monetization options for short-form content creators',
        content:
          "YouTube is expanding its Partner Program to include more monetization opportunities for creators who focus on short-form videos, directly competing with TikTok's creator fund.",
        author: 'PlatformWatcher',
        timestamp: '4 hours ago',
        upvotes: 3245,
        downvotes: 87,
        comments: 432,
        tags: ['Monetization', 'Shorts', 'Creators'],
        credibilityScore: 89,
      },
    ],
  },
];

export function getCommunityById(id: string): Community | undefined {
  return communities.find((community) => community.id === id);
}

export function getAllCommunities(): Community[] {
  return communities;
}
