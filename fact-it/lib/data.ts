export interface PostCard {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  tags: string[];
  credibilityScore: number;
  headline: string;
  description: string;
  references: {
    id: number;
    title: string;
    url: string;
  }[];
  stats: {
    upvotes: number;
    downvotes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  references: {
    id: number;
    title: string;
    url: string;
  }[];
  stats: {
    upvotes: number;
    downvotes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
}

const postCards = [
  {
    id: '1',
    user: {
      name: 'Pedro San Pedro',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: true,
    },
    tags: ['Politics', 'Personal'],
    credibilityScore: 71,
    headline:
      'Duterte refused fingerprinting and threatened lawsuits during chaotic arrest, Philippine police say',
    description:
      'A Philippine general says that ex-Philippine President Rodrigo Duterte threatened him with lawsuits, refused to be fingerprinted and told law enforcers "you have to kill me to bring me to jail."',
    references: [
      {
        id: 1,
        title: 'Independent article',
        url: 'https://www.independent.co.uk/news/world/rodrigo-duterte-the-hague-international-criminal-court-davao-manila-b2714419.html',
      },
      {
        id: 2,
        title: 'Independent article 2',
        url: 'https://www.independent.co.uk/news/rodrigo-duterte-icc-manila-netherlands-duterte-b2714419.html',
      },
    ],
    stats: {
      upvotes: 249,
      downvotes: 42,
      comments: 32,
      shares: 52,
    },
    timestamp: '2 hours ago',
    // Nested comments for this post
    comments: [
      {
        id: 'c1',
        user: {
          name: 'Maria Santos',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: true,
        },
        content:
          'This is concerning news. The rule of law must be respected by everyone, including former presidents.',
        references: [
          {
            id: 1,
            title: 'Rule of Law Index',
            url: 'https://www.example.com/rule-of-law-index',
          },
        ],
        stats: {
          upvotes: 78,
          downvotes: 12,
          comments: 8,
          shares: 5,
        },
        timestamp: '45 minutes ago',
      },
      {
        id: 'c2',
        user: {
          name: 'Alex Johnson',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        content:
          "I'm not surprised by his reaction. His administration was known for similar behavior.",
        references: [],
        stats: {
          upvotes: 45,
          downvotes: 23,
          comments: 4,
          shares: 1,
        },
        timestamp: '1 hour ago',
      },
      {
        id: 'c3',
        user: {
          name: 'Liza Reyes',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: true,
        },
        content:
          'We need to wait for all the facts before jumping to conclusions. The media often sensationalizes these stories.',
        references: [
          {
            id: 1,
            title: 'Media Bias Report',
            url: 'https://www.example.com/media-bias-report',
          },
        ],
        stats: {
          upvotes: 92,
          downvotes: 8,
          comments: 12,
          shares: 7,
        },
        timestamp: '1.5 hours ago',
      },
      {
        id: 'c8',
        user: {
          name: 'Carlos Diaz',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        content:
          'This is just another distraction from real issues. We should focus on policies, not personalities.',
        references: [],
        stats: {
          upvotes: 67,
          downvotes: 18,
          comments: 7,
          shares: 4,
        },
        timestamp: '2 hours ago',
      },
    ],
  },
  {
    id: '2',
    user: {
      name: 'JayJay Mariano',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: false,
    },
    tags: ['Entertainment', 'Personal'],
    credibilityScore: 85,
    headline: 'New Marvel movie to begin filming next month, sources confirm',
    description:
      'Multiple industry insiders have confirmed that the next installment in the Marvel Cinematic Universe will begin production in Atlanta next month.',
    references: [
      {
        id: 1,
        title: 'Hollywood Reporter',
        url: 'https://www.example.com/marvel-movie-production-begins',
      },
    ],
    stats: {
      upvotes: 187,
      downvotes: 23,
      comments: 45,
      shares: 23,
    },
    timestamp: '5 hours ago',
    // Nested comments for this post
    comments: [
      {
        id: 'c4',
        user: {
          name: 'Kevin Marvel',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        content:
          "Can't wait for this movie! The last few Marvel films have been incredible.",
        references: [],
        stats: {
          upvotes: 56,
          downvotes: 3,
          comments: 7,
          shares: 2,
        },
        timestamp: '30 minutes ago',
      },
      {
        id: 'c5',
        user: {
          name: 'Sophia Chen',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: true,
        },
        content:
          "I heard they're bringing back some fan-favorite characters for this one. The casting choices look promising!",
        references: [
          {
            id: 1,
            title: 'Entertainment Weekly',
            url: 'https://www.example.com/marvel-casting-news',
          },
        ],
        stats: {
          upvotes: 87,
          downvotes: 5,
          comments: 9,
          shares: 11,
        },
        timestamp: '2 hours ago',
      },
      {
        id: 'c6',
        user: {
          name: 'Diego Mendoza',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        content:
          'The filming location is perfect. Atlanta has great tax incentives for film production and amazing studios.',
        references: [
          {
            id: 1,
            title: 'Film Industry Report',
            url: 'https://www.example.com/film-production-incentives',
          },
        ],
        stats: {
          upvotes: 34,
          downvotes: 2,
          comments: 3,
          shares: 1,
        },
        timestamp: '3 hours ago',
      },
      {
        id: 'c7',
        user: {
          name: 'Jasmine Lee',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: true,
        },
        content:
          "I'm getting tired of superhero movies. They all follow the same formula at this point.",
        references: [],
        stats: {
          upvotes: 29,
          downvotes: 41,
          comments: 15,
          shares: 2,
        },
        timestamp: '4 hours ago',
      },
    ],
  },
  {
    id: '3',
    user: {
      name: 'Maow Maow',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: false,
    },
    tags: ['Technology', 'Science'],
    credibilityScore: 92,
    headline:
      'New breakthrough in quantum computing could revolutionize encryption',
    description:
      'Scientists at MIT have demonstrated a new quantum computing technique that could solve complex problems exponentially faster than traditional computers, with major implications for cybersecurity.',
    references: [
      {
        id: 1,
        title: 'MIT Technology Review',
        url: 'https://www.example.com/quantum-computing-breakthrough',
      },
      {
        id: 2,
        title: 'Nature Journal',
        url: 'https://www.example.com/nature-quantum-research',
      },
    ],
    stats: {
      upvotes: 312,
      downvotes: 18,
      comments: 37,
      shares: 89,
    },
    timestamp: '3 hours ago',
    // Nested comments for this post
    comments: [
      {
        id: 'c9',
        user: {
          name: 'Dr. Raj Patel',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: true,
        },
        content:
          'This is a significant advancement in the field. The implications for cryptography and secure communications are profound.',
        references: [
          {
            id: 1,
            title: 'Quantum Cryptography Paper',
            url: 'https://www.example.com/quantum-cryptography-implications',
          },
        ],
        stats: {
          upvotes: 76,
          downvotes: 2,
          comments: 8,
          shares: 12,
        },
        timestamp: '45 minutes ago',
      },
      {
        id: 'c10',
        user: {
          name: 'Emma Wilson',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        content:
          'Can someone explain how this affects everyday encryption? Will my banking apps need to be updated?',
        references: [],
        stats: {
          upvotes: 42,
          downvotes: 3,
          comments: 7,
          shares: 1,
        },
        timestamp: '1.5 hours ago',
      },
      {
        id: 'c11',
        user: {
          name: 'Tyler Jackson',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        content:
          "I'm skeptical about the timeline. We've been hearing about quantum computing breakthroughs for years, but practical applications remain elusive.",
        references: [
          {
            id: 1,
            title: 'Quantum Computing Challenges',
            url: 'https://www.example.com/quantum-computing-challenges',
          },
        ],
        stats: {
          upvotes: 38,
          downvotes: 29,
          comments: 12,
          shares: 3,
        },
        timestamp: '2 hours ago',
      },
      {
        id: 'c12',
        user: {
          name: 'Aisha Patel',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: true,
        },
        content:
          'As someone working in cybersecurity, this is both exciting and concerning. We need to accelerate post-quantum cryptography standards.',
        references: [
          {
            id: 1,
            title: 'NIST Post-Quantum Standards',
            url: 'https://www.example.com/post-quantum-cryptography',
          },
        ],
        stats: {
          upvotes: 95,
          downvotes: 4,
          comments: 9,
          shares: 17,
        },
        timestamp: '2.5 hours ago',
      },
    ],
  },
];

// Updated function to get all post cards with their comments
export function getPostCards(): PostCard[] {
  return postCards;
}

// Updated function to get a post card by ID with its comments
export function getPostCardById(id: string) {
  return postCards.find((post) => post.id === id);
}

// New function to get comments for a specific post
export function getCommentsForPost(postId: string) {
  const post = getPostCardById(postId);
  return post ? post.comments : [];
}
