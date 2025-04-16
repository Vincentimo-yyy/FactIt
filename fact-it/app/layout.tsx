import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Factit - A simple fact-checking app',
  description:
    'Factit is a simple fact-checking app that allows you to check the credibility of information',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-arial antialiased bg-background">{children}</body>
    </html>
  );
}
