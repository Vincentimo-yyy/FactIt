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

// Update the Comment interface to include a type field
export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  type: 'comment' | 'redflag' | 'greenflag'; // Type to distinguish between a regular comment, red flag justification, or green flag justification
  content: string;
  references: {
    id: number;
    title: string;
    url: string;
  }[];
  // Optional field to reference specific parts of the original post
  postReference?: {
    text: string;
    position: string; // Could be paragraph number or text snippet
  };
  stats: {
    upvotes: number;
    downvotes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
  parentId?: string;
  replies?: string[];
}

// Update the Reply interface to also include a type field
export interface Reply {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  level: number;
  type: 'comment' | 'redflag' | 'greenflag'; // Same types as Comment
  content: string;
  references: {
    id: number;
    title: string;
    url: string;
  }[];
  // Optional field to reference specific parts of the parent comment or post
  postReference?: {
    text: string;
    position: string;
  };
  stats: {
    upvotes: number;
    downvotes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
  parentId: string;
}

// Define a recursive type for the comment tree
export type CommentTreeItem = (Comment | Reply) & {
  children?: CommentTreeItem[];
};

// Update the existing postCards array to include different comment types
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
        type: 'greenflag', // Changed to greenflag
        content:
          'This reporting is accurate and consistent with multiple verified sources. The Philippine National Police has officially confirmed these details in their press briefing.',
        postReference: {
          // Added reference to specific text
          text: 'A Philippine general says that ex-Philippine President Rodrigo Duterte threatened him with lawsuits',
          position: 'headline',
        },
        references: [
          {
            id: 1,
            title: 'PNP Official Statement',
            url: 'https://www.example.com/pnp-statement',
          },
          {
            id: 2,
            title: 'Video of Police Press Conference',
            url: 'https://www.example.com/press-conference-video',
          },
        ],
        stats: {
          upvotes: 78,
          downvotes: 12,
          comments: 8,
          shares: 5,
        },
        timestamp: '45 minutes ago',
        replies: ['r1', 'r2'],
      },
      {
        id: 'c2',
        user: {
          name: 'Alex Johnson',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        type: 'redflag', // Changed to redflag
        content:
          "I question the accuracy of this report. The quote 'you have to kill me to bring me to jail' appears to be sensationalized and lacks proper context. I've reviewed the full transcript and this seems to be taken out of context.",
        postReference: {
          text: "'you have to kill me to bring me to jail.'",
          position: 'quote',
        },
        references: [
          {
            id: 1,
            title: 'Full Transcript of Encounter',
            url: 'https://www.example.com/full-transcript',
          },
          {
            id: 2,
            title: 'Analysis of Media Coverage',
            url: 'https://www.example.com/media-analysis',
          },
        ],
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
        type: 'comment', // Regular comment
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
        replies: ['r4'],
      },
      {
        id: 'c8',
        user: {
          name: 'Carlos Diaz',
          avatar: '/placeholder.svg?height=40&width=40',
          verified: false,
        },
        type: 'greenflag', // Changed to greenflag
        content:
          'I can confirm this information is accurate. I work with the judicial system in the Philippines and these details match our official records. The refusal to be fingerprinted is documented in the official arrest report.',
        postReference: {
          text: 'Duterte refused fingerprinting',
          position: 'headline',
        },
        references: [
          {
            id: 1,
            title: 'Official Arrest Documentation',
            url: 'https://www.example.com/arrest-documentation',
          },
          {
            id: 2,
            title: 'Judicial System Records',
            url: 'https://www.example.com/judicial-records',
          },
        ],
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
        type: 'comment', // Regular comment
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
        type: 'greenflag', // Changed to greenflag
        content:
          'As someone who works in the film industry in Atlanta, I can confirm this information is accurate. Several crew members I know have already been hired for this production and pre-production work has begun.',
        postReference: {
          text: 'begin production in Atlanta next month',
          position: 'description',
        },
        references: [
          {
            id: 1,
            title: 'Georgia Film Office Production Schedule',
            url: 'https://www.example.com/georgia-film-schedule',
          },
          {
            id: 2,
            title: 'Atlanta Film Industry Newsletter',
            url: 'https://www.example.com/atlanta-film-newsletter',
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
        type: 'comment', // Regular comment
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
        type: 'redflag', // Changed to redflag
        content:
          "This information is misleading. While pre-production may be starting, actual filming is scheduled for at least two months from now according to Marvel's official production timeline. I've worked on previous Marvel projects and their timelines are strictly controlled.",
        postReference: {
          text: 'begin production in Atlanta next month',
          position: 'description',
        },
        references: [
          {
            id: 1,
            title: 'Marvel Studios Production Schedule',
            url: 'https://www.example.com/marvel-schedule',
          },
          {
            id: 2,
            title: 'Interview with Marvel Executive Producer',
            url: 'https://www.example.com/producer-interview',
          },
        ],
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
        type: 'greenflag', // Changed to greenflag
        content:
          "As a quantum physicist, I can verify the accuracy of this report. The MIT team's approach using topological qubits represents a genuine breakthrough in the field. Their published results in Nature have been peer-reviewed and validated by multiple independent research groups.",
        postReference: {
          text: 'Scientists at MIT have demonstrated a new quantum computing technique',
          position: 'description',
        },
        references: [
          {
            id: 1,
            title: 'Nature Journal Publication',
            url: 'https://www.example.com/nature-quantum-paper',
          },
          {
            id: 2,
            title: 'Independent Verification by Caltech',
            url: 'https://www.example.com/caltech-verification',
          },
          {
            id: 3,
            title: 'Quantum Computing Standards Committee Review',
            url: 'https://www.example.com/qcsc-review',
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
        type: 'comment', // Regular comment
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
        type: 'redflag', // Changed to redflag
        content:
          "This headline is misleading and overstates the actual research findings. The MIT paper specifically states that practical applications are still 5-10 years away, and the technique has only been demonstrated in highly controlled laboratory conditions with significant limitations. The claim that it 'could revolutionize encryption' is premature and not supported by the actual research.",
        postReference: {
          text: 'could revolutionize encryption',
          position: 'headline',
        },
        references: [
          {
            id: 1,
            title: 'MIT Research Paper Limitations Section',
            url: 'https://www.example.com/mit-paper-limitations',
          },
          {
            id: 2,
            title: 'Interview with Lead Researcher',
            url: 'https://www.example.com/researcher-interview',
          },
          {
            id: 3,
            title: 'Quantum Computing Timeline Analysis',
            url: 'https://www.example.com/quantum-timeline',
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
        type: 'comment', // Regular comment
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

// Update some of the replies to include different types
const replies: Record<string, Reply> = {
  r1: {
    id: 'r1',
    user: {
      name: 'John Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: false,
    },
    level: 1,
    type: 'greenflag', // Changed to greenflag
    content:
      "I can further support this with evidence from my own sources. I'm a journalist who was present at the scene, and I personally witnessed the events described. The police report accurately documents what happened.",
    references: [
      {
        id: 1,
        title: 'My Eyewitness Account',
        url: 'https://www.example.com/eyewitness-account',
      },
      {
        id: 2,
        title: 'Police Report Documentation',
        url: 'https://www.example.com/police-report',
      },
    ],
    stats: {
      upvotes: 24,
      downvotes: 3,
      comments: 2,
      shares: 1,
    },
    timestamp: '30 minutes ago',
    parentId: 'c1',
  },
  r2: {
    id: 'r2',
    user: {
      name: 'Emily Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: true,
    },
    level: 1,
    type: 'redflag', // Changed to redflag
    content:
      "While I respect Maria's perspective, I believe there are inconsistencies in the police statement. The timeline presented doesn't match with other verified accounts, and some key details appear to be omitted.",
    postReference: {
      text: 'The Philippine National Police has officially confirmed these details',
      position: 'comment reference',
    },
    references: [
      {
        id: 1,
        title: 'Alternative Timeline Analysis',
        url: 'https://www.example.com/timeline-analysis',
      },
      {
        id: 2,
        title: 'Witness Statements Compilation',
        url: 'https://www.example.com/witness-statements',
      },
    ],
    stats: {
      upvotes: 18,
      downvotes: 2,
      comments: 1,
      shares: 0,
    },
    timestamp: '25 minutes ago',
    parentId: 'c1',
  },
  r3: {
    id: 'r3',
    user: {
      name: 'Michael Wong',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: false,
    },
    level: 2,
    type: 'comment', // Regular comment
    content:
      'The challenge is enforcing these principles consistently across different contexts.',
    references: [],
    stats: {
      upvotes: 12,
      downvotes: 1,
      comments: 0,
      shares: 0,
    },
    timestamp: '15 minutes ago',
    parentId: 'r1',
  },
  r4: {
    id: 'r4',
    user: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: false,
    },
    level: 1,
    type: 'greenflag', // Changed to greenflag
    content:
      "I agree with Liza about waiting for facts, but I can confirm that this particular report is well-sourced. I've cross-referenced it with multiple independent news outlets and official statements.",
    references: [
      {
        id: 1,
        title: 'Cross-Reference Analysis',
        url: 'https://www.example.com/cross-reference',
      },
      {
        id: 2,
        title: 'Media Verification Project',
        url: 'https://www.example.com/media-verification',
      },
    ],
    stats: {
      upvotes: 31,
      downvotes: 4,
      comments: 2,
      shares: 1,
    },
    timestamp: '1 hour ago',
    parentId: 'c3',
  },
  r5: {
    id: 'r5',
    user: {
      name: 'David Park',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: true,
    },
    level: 2,
    type: 'redflag', // Changed to redflag
    content:
      "I disagree with Sarah's assessment. While she claims to have cross-referenced the information, there are still significant discrepancies in the reporting. The original sources contain contradictory statements that haven't been addressed.",
    postReference: {
      text: "I've cross-referenced it with multiple independent news outlets",
      position: 'comment reference',
    },
    references: [
      {
        id: 1,
        title: 'Source Comparison Analysis',
        url: 'https://www.example.com/source-comparison',
      },
      {
        id: 2,
        title: 'Contradictions Documentation',
        url: 'https://www.example.com/contradictions',
      },
    ],
    stats: {
      upvotes: 22,
      downvotes: 1,
      comments: 1,
      shares: 0,
    },
    timestamp: '45 minutes ago',
    parentId: 'r4',
  },
  r6: {
    id: 'r6',
    user: {
      name: 'Lisa Rodriguez',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: false,
    },
    level: 3,
    type: 'comment', // Regular comment
    content: 'Thanks for doing that research, David. Very helpful context.',
    references: [],
    stats: {
      upvotes: 15,
      downvotes: 0,
      comments: 0,
      shares: 0,
    },
    timestamp: '30 minutes ago',
    parentId: 'r5',
  },
};

// Updated function to get all post cards with their comments
export function getPostCards(): PostCard[] {
  try {
    return postCards;
  } catch (error) {
    console.error('Error getting post cards:', error);
    return [];
  }
}

// Updated function to get a post card by ID with its comments
export function getPostCardById(id: string) {
  try {
    return postCards.find((post) => post.id === id);
  } catch (error) {
    console.error(`Error getting post card by ID ${id}:`, error);
    return null;
  }
}

// New function to get comments for a specific post
export function getCommentsForPost(postId: string): Comment[] {
  const post = getPostCardById(postId);
  return post ? (post.comments as Comment[]) : [];
}

// New function to get a reply by ID
export function getReplyById(replyId: string): Reply | undefined {
  return replies[replyId];
}

// New function to get all replies for a specific comment or reply
export function getRepliesForItem(itemId: string): Reply[] {
  // Get direct replies
  return Object.values(replies).filter((reply) => reply.parentId === itemId);
}

// New function to build a nested comment tree
export function buildCommentTree(postId: string): CommentTreeItem[] {
  try {
    const comments = getCommentsForPost(postId);

    // Function to recursively get replies
    const getNestedReplies = (
      parentId: string,
      level: number,
    ): CommentTreeItem[] => {
      try {
        const directReplies = getRepliesForItem(parentId);

        return directReplies.map((reply) => {
          // Set the correct level
          const replyWithLevel = { ...reply, level };

          // Get nested replies for this reply
          const nestedReplies = getNestedReplies(reply.id, level + 1);

          if (nestedReplies.length > 0) {
            return { ...replyWithLevel, children: nestedReplies };
          }

          return replyWithLevel;
        });
      } catch (error) {
        console.error(
          `Error getting nested replies for parent ${parentId}:`,
          error,
        );
        return [];
      }
    };

    // Build the tree
    return comments.map((comment) => {
      // Ensure comment has all required properties to satisfy CommentTreeItem
      const commentItem: CommentTreeItem = {
        ...comment,
        // Add any missing properties that might be required by CommentTreeItem
        parentId: comment.parentId || '', // Provide default value if missing
        type: comment.type || 'comment', // Ensure type is defined
      };

      const replies = getNestedReplies(comment.id, 1);

      if (replies.length > 0) {
        return { ...commentItem, children: replies };
      }

      return commentItem;
    });
  } catch (error) {
    console.error(`Error building comment tree for post ${postId}:`, error);
    return [];
  }
}
