import { createClient } from '../utils/supabase/client';

const supabase = createClient();

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
export async function getPostCards(): Promise<PostCard[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        user:users (
          name,
          avatar,
          verified
        ),
        tags:post_tags (tag_id),
        credibility_score,
        headline,
        description,
        references:post_references (
          id,
          title,
          url
        ),
        stats:post_stats (
          upvotes,
          downvotes,
          comments,
          shares
        ),
        timestamp
      `);

    if (error) throw error;

    return (data || []).map((post) => ({
      ...post,
      credibilityScore: post.credibility_score,
      tags: post.tags.map((tag: { tag_id: string }) => tag.tag_id),
      user: post.user[0], // Map user to a single object
      stats: post.stats[0], // Map stats to a single object
    }));
  } catch (error) {
    console.error('Error fetching post cards:', error);
    return [];
  }
}

// Updated function to get a post card by ID with its comments
export async function getPostCardById(id: string): Promise<PostCard | undefined> {
  try {
    const postCards = await getPostCards(); // Fetch post cards using the function
    return postCards.find((post: PostCard) => post.id === id); // Explicitly type `post` as `PostCard`
  } catch (error) {
    console.error(`Error fetching post card by ID ${id}:`, error);
    return undefined;
  }
}

// New function to get comments for a specific post
export async function getCommentsForPost(postId: string): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        user:users (
          name,
          avatar,
          verified
        ),
        type,
        content,
        postReference:post_references (
          text,
          position
        ),
        references:comment_references (
          id,
          title,
          url
        ),
        stats:comment_stats (
          upvotes,
          downvotes,
          comments,
          shares
        ),
        timestamp,
        parent_id,
        level
      `)
      .eq('post_id', postId);

    if (error) throw error;

    return (data || []).map((comment) => ({
      ...comment,
      parentId: comment.parent_id,
      postReference: comment.postReference?.[0] || null, // Map postReference to a single object
      user: comment.user[0], // Map user to a single object
      stats: comment.stats[0], // Map stats to a single object
    }));
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
}

// New function to get a reply by ID
export function getReplyById(replyId: string): Reply | undefined {
  return replies[replyId];
}

// New function to get all replies for a specific comment or reply
export async function getRepliesForItem(itemId: string): Promise<Reply[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        user:users (
          name,
          avatar,
          verified
        ),
        level,
        type,
        content,
        postReference:post_references (
          text,
          position
        ),
        references:comment_references (
          id,
          title,
          url
        ),
        stats:comment_stats (
          upvotes,
          downvotes,
          comments,
          shares
        ),
        timestamp,
        parent_id
      `)
      .eq('parent_id', itemId);

    if (error) throw error;

    return (data || []).map((reply) => ({
      ...reply,
      parentId: reply.parent_id,
      postReference: reply.postReference?.[0] || null, // Map postReference to a single object
      user: reply.user[0], // Map user to a single object
      stats: reply.stats[0], // Map stats to a single object
    }));
  } catch (error) {
    console.error(`Error fetching replies for item ${itemId}:`, error);
    return [];
  }
}

// New function to build a nested comment tree
export async function buildCommentTree(postId: string): Promise<CommentTreeItem[]> {
  try {
    const comments = await getCommentsForPost(postId);

    const getNestedReplies = async (
      parentId: string,
      level: number
    ): Promise<CommentTreeItem[]> => {
      const directReplies = await getRepliesForItem(parentId);

      return Promise.all(
        directReplies.map(async (reply) => {
          const nestedReplies = await getNestedReplies(reply.id, level + 1);

          return nestedReplies.length > 0
            ? { ...reply, level, children: nestedReplies }
            : { ...reply, level };
        })
      );
    };

    return Promise.all(
      comments.map(async (comment) => {
        const replies = await getNestedReplies(comment.id, 1);

        return replies.length > 0
          ? { ...comment, children: replies }
          : comment;
      })
    );
  } catch (error) {
    console.error(`Error building comment tree for post ${postId}:`, error);
    return [];
  }
}
