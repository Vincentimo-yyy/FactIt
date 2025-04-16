'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg border shadow-sm p-6">
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold mb-2">
            <span style={{ color: '#919191' }}>Fact</span>
            <span style={{ color: '#4F3E9E' }}>It</span>
          </div>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First name
              </label>
              <input
                id="firstName"
                placeholder="John"
                className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F3E9E] focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </label>
              <input
                id="lastName"
                placeholder="Doe"
                className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F3E9E] focus:border-transparent"
                required
              />
            </div>
          </div>

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
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
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
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-gray-300 text-[#4F3E9E] focus:ring-[#4F3E9E]"
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-none"
            >
              I agree to the{' '}
              <Link href="/terms" className="text-[#4F3E9E] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#4F3E9E] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-[#4F3E9E] text-white rounded-md hover:bg-[#4F3E9E]/90 transition-colors"
          >
            Create account
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
              <svg width="20" height="20" fill="currentColor" className="mr-2">
                <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"></path>
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
            Already have an account?
          </span>{' '}
          <Link href="/login" className="text-[#4F3E9E] hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
