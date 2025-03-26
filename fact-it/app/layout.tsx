import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { LeftSidebar } from "@/components/layout/left-sidebar"
import { RightSidebar } from "@/components/layout/right-sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Factit - A simple fact-checking app",
  description: "Factit is a simple fact-checking app that allows you to check the credibility of information",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1 pt-14 pb-14 md:pb-0">
            <div className="flex flex-col md:flex-row w-full">
              {/* Left Sidebar - Hidden on mobile */}
              <div className=" md:block md:w-64 flex-shrink-0">
                <LeftSidebar />
              </div>

              {/* Main Content */}
              <main className="flex-1 min-w-0 p-4 md:px-8 overflow-y-auto">{children}</main>

              {/* Right Sidebar - Hidden on mobile */}
              <div className="hidden lg:block lg:w-64 flex-shrink-0">
                <RightSidebar />
              </div>
            </div>
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  )
}

