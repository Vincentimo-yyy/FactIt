import type React from 'react';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Sign Up - Factit',
  description: 'Create a new Factit account',
};

// This tells Next.js that this layout should replace the root layout
// rather than being nested inside it
export const dynamic = 'force-static';

// This is critical - it tells Next.js not to use the root layout
export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
