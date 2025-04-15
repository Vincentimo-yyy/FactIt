'use client';

import Link from 'next/link';
import { Home, Users, PlusCircle, MessageCircle, Bell } from 'lucide-react';

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t bg-background md:hidden">
      <Link
        href="/"
        className="flex flex-col items-center justify-center text-xs"
      >
        <Home className="h-5 w-5 mb-1" />
        <span>Home</span>
      </Link>
      <Link
        href="/communities"
        className="flex flex-col items-center justify-center text-xs"
      >
        <Users className="h-5 w-5 mb-1" />
        <span>Communities</span>
      </Link>
      <Link
        href="/createapost"
        className="flex flex-col items-center justify-center text-xs"
      >
        <PlusCircle className="h-5 w-5 mb-1" />
        <span>Create</span>
      </Link>
      <Link
        href="/chat"
        className="flex flex-col items-center justify-center text-xs"
      >
        <MessageCircle className="h-5 w-5 mb-1" />
        <span>Chat</span>
      </Link>
      <Link
        href="/inbox"
        className="flex flex-col items-center justify-center text-xs"
      >
        <Bell className="h-5 w-5 mb-1" />
        <span>Inbox</span>
      </Link>
    </div>
  );
}
