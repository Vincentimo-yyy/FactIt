'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg border shadow-sm p-6">
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold mb-2">
            <span style={{ color: '#919191' }}>Fact</span>
            <span style={{ color: '#4F3E9E' }}>It</span>
          </div>
          <p className="text-muted-foreground">Log in to your account</p>
        </div>

        <form className="space-y-4">
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

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className="h-10 px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg
                width="800px"
                height="800px"
                viewBox="-3 0 262 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              <span>Google</span>
            </button>
            <button className="h-10 px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" fill="currentColor" className="mr-2">
                <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"></path>
              </svg>
              <span>Apple</span>
            </button>
            <button className="h-10 px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" fill="currentColor" className="mr-2">
                <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"></path>
              </svg>
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
