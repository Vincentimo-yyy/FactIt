import type React from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { MobileNav } from '@/components/layout/mobile-nav';
import { LeftSidebar } from '@/components/layout/left-sidebar';
import { RightSidebar } from '@/components/layout/right-sidebar';
import { ChatProvider } from '@/components/chatcontext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from '@/components/error-boundary';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1 pt-14 pb-14 md:pb-0">
          <div className="flex flex-col md:flex-row w-full">
            {/* Left Sidebar - Hidden on mobile */}
            <div className="hidden md:block md:w-72 flex-shrink-0">
              <LeftSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 min-w-0 p-4 md:px-8 overflow-y-auto">
              <ErrorBoundary
                fallback={
                  <div>Something went wrong. Please refresh the page.</div>
                }
              >
                {children}
              </ErrorBoundary>
              <SpeedInsights />
              <Analytics />
            </main>

            {/* Right Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:w-72 flex-shrink-0">
              <RightSidebar />
            </div>
          </div>
        </div>
        <MobileNav />
      </div>
    </ChatProvider>
  );
}
