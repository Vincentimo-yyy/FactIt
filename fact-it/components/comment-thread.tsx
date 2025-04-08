'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CommentItem } from './comment-item';
import type { Comment, Reply } from '@/lib/data';

// Define a recursive type that can handle nested comments and replies
type CommentTreeItem = (Comment | Reply) & {
  children?: CommentTreeItem[];
};

type CommentThreadProps = {
  comments: CommentTreeItem[];
};

export function CommentThread({ comments }: CommentThreadProps) {
  // Recursive function to render a comment and its replies
  const renderCommentWithReplies = (item: CommentTreeItem) => {
    return (
      <CommentItem key={item.id} item={item}>
        {item.children && item.children.length > 0 && (
          <div className="replies-container">
            {item.children.map((reply) => renderCommentWithReplies(reply))}
          </div>
        )}
      </CommentItem>
    );
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={comment.id}>
                {index > 0 && (
                  <div className="my-4 border-t border-gray-100"></div>
                )}
                {renderCommentWithReplies(comment)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
