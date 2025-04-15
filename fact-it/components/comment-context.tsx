'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CommentTreeItem } from '@/lib/data';

interface CommentContextType {
  comments: CommentTreeItem[];
  addComment: (
    comment: Omit<CommentTreeItem, 'id' | 'timestamp' | 'stats'>,
  ) => void;
  addReply: (
    parentId: string,
    reply: Omit<CommentTreeItem, 'id' | 'timestamp' | 'stats' | 'level'>,
  ) => void;
  postId: string;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export function CommentProvider({
  children,
  postId,
  initialComments,
}: {
  children: ReactNode;
  postId: string;
  initialComments: CommentTreeItem[];
}) {
  const [comments, setComments] = useState<CommentTreeItem[]>(initialComments);

  // Generate a unique ID for new comments
  const generateId = () => {
    return `new-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add a new top-level comment
  const addComment = (
    comment: Omit<CommentTreeItem, 'id' | 'timestamp' | 'stats'>,
  ) => {
    const newComment: CommentTreeItem = {
      ...comment,
      id: generateId(),
      timestamp: 'Just now',
      stats: {
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        shares: 0,
      },
    };

    setComments((prevComments) => [...prevComments, newComment]);
  };

  // Add a reply to an existing comment or reply
  const addReply = (
    parentId: string,
    reply: Omit<CommentTreeItem, 'id' | 'timestamp' | 'stats' | 'level'>,
  ) => {
    const newReply: CommentTreeItem = {
      ...reply,
      id: generateId(),
      parentId,
      timestamp: 'Just now',
      stats: {
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        shares: 0,
      },
    };

    // Function to recursively add reply to the correct parent
    const addReplyToTree = (items: CommentTreeItem[]): CommentTreeItem[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          // Add the reply to this item
          return {
            ...item,
            children: [
              ...(item.children || []),
              {
                ...newReply,
                level: ('level' in item ? (item.level as number) : 0) + 1,
              },
            ],
          };
        } else if (item.children && item.children.length > 0) {
          // Check children recursively
          return {
            ...item,
            children: addReplyToTree(item.children),
          };
        }
        return item;
      });
    };

    setComments((prevComments) => addReplyToTree(prevComments));
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
        addReply,
        postId,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
}
