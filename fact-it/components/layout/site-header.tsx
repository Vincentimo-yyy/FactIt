'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, User, ChevronDown, Home, TrendingUp } from 'lucide-react';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          {/* Mobile Logo and Menu */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-2 flex items-center"
            >
              <div className="flex flex-col space-y-1.5 p-1.5">
                <span className="h-0.5 w-5 bg-foreground"></span>
                <span className="h-0.5 w-5 bg-foreground"></span>
                <span className="h-0.5 w-5 bg-foreground"></span>
              </div>
            </button>
            <Link href="/" className="flex items-center">
              <div className="text-xl font-bold">
                <span style={{ color: '#919191' }}>Fact</span>
                <span style={{ color: '#4F3E9E' }}>It</span>
              </div>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:block">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold">
                <span style={{ color: '#919191' }}>Fact</span>
                <span style={{ color: '#4F3E9E' }}>It</span>
              </div>
            </Link>
          </div>

          {/* Search - Hidden on smallest screens */}
          <div className="hidden sm:flex sm:flex-1 sm:justify-center px-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-muted h-9 rounded-md border border-input pl-8 pr-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Mobile Search Icon */}
          <div className="flex md:hidden">
            <button className="rounded-full p-2">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* User Icon */}
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/profile" className="rounded-full p-2 hover:bg-muted">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-background border-b z-50 md:hidden">
          <div className="p-2">
            <Link
              href="/"
              className="flex items-center p-2 rounded-md hover:bg-muted"
            >
              <Home className="mr-2 h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/popular"
              className="flex items-center p-2 rounded-md hover:bg-muted"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              <span>Popular</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
