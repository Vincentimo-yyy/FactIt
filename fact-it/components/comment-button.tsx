'use client';
import { MessagesSquare } from 'lucide-react';
import { useScrollFocus } from './scrollFocusProvider';

export default function CommentButton() {
  const { focusInput } = useScrollFocus();
  return (
    <button
      onClick={focusInput}
      className="flex items-center mr-2 bg-primary-foreground p-2 rounded-full hover:bg-[#efecff]"
    >
      <MessagesSquare className="h-5 w-5 mr-1" />
    </button>
  );
}
