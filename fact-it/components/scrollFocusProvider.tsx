'use client';

import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { createContext, useContext, useRef } from 'react';

type ScrollFocusContextType = {
  focusInput: () => void;
};

const ScrollFocusContext = createContext<ScrollFocusContextType | null>(null);
export default function ScrollFocusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  };
  return (
    <ScrollFocusContext.Provider value={{ focusInput }}>
      {children}
      {/* Comment input */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="relative h-8 w-8 mr-3">
              <Image
                src="/Default_pfp.svg"
                alt="Your profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                ref={inputRef}
                placeholder="Write a comment..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[80px] text-sm"
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-secondary text-white rounded-lg text-sm">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollFocusContext.Provider>
  );
}

export function useScrollFocus() {
  const context = useContext(ScrollFocusContext);
  if (!context)
    throw new Error('useScrollFocus must be used within ScrollFocusProvider');
  return context;
}
