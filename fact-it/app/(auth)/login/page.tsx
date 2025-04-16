'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Facebook_Icon, Google_Icon } from '@/components/icons';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-[500px] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg border shadow-sm p-6">
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold mb-2">
            <span style={{ color: '#919191' }}>Fact</span>
            <span style={{ color: '#4F3E9E' }}>It</span>
          </div>
          <p className="text-muted-foreground">Log in to your account</p>
        </div>

        <form className="space-y-4 px-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F3E9E] focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#4F3E9E] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="h-10 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F3E9E] focus:border-transparent"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-[#4F3E9E] text-white rounded-md hover:bg-[#4F3E9E]/90 transition-colors"
          >
            Log in
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 justify-center gap-2">
            <button className="h-10 px-2 py-2 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Google_Icon width="20" height="20" className="mr-2" />
              <span> Google</span>
            </button>
            <button className="h-10 px-2 py-2 border space-x-2 border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Facebook_Icon />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Don&apos;t have an account?
          </span>{' '}
          <Link href="/signup" className="text-[#4F3E9E] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
