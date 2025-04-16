import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = (cookieStore = cookies()) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Handle cookies in Edge functions or other environments
            // where setting cookies immediately isn't possible
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch {
            // Handle cookies in Edge functions or other environments
          }
        },
      },
    },
  );
};
