"use client"

import Link from "next/link"
import { Home, Search, Bell, Bookmark, User } from "lucide-react"

export function LeftSidebar() {
  return (
    <div className="hidden md:block fixed top-14 left-0 w-64 h-[calc(100vh-3.5rem)] overflow-y-auto bg-background border-r">
      <div className="flex h-full flex-col">
        <div className="space-y-4 px-3 py-4">
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
            <div className="space-y-1">
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <Home className="mr-2 h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <Search className="mr-2 h-5 w-5" />
                <span>Search</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <Bell className="mr-2 h-5 w-5" />
                <span>Notifications</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <Bookmark className="mr-2 h-5 w-5" />
                <span>Bookmarks</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <User className="mr-2 h-5 w-5" />
                <span>Profile</span>
              </Link>
            </div>
          </div>

          {/* Additional navigation sections */}
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Explore</h2>
            <div className="space-y-1">
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <span>Trending</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <span>News</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <span>Communities</span>
              </Link>
            </div>
          </div>

          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Settings</h2>
            <div className="space-y-1">
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <span>Account</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <span>Privacy</span>
              </Link>
              <Link href="#" className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <span>Notifications</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

