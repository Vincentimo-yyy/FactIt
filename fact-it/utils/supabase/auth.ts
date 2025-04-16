import { createClient } from './server';
import { redirect } from 'next/navigation';
import { type Session, type User } from '@supabase/supabase-js';

export type AuthError = {
  message: string;
  status: number;
};

export async function getSession(): Promise<Session | null> {
  const supabase = createClient();
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      throw { message: error.message, status: 500 };
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const session = await getSession();
    return session?.user ?? null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    redirect('/(auth)/login');
  }
  return session;
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw { message: error.message, status: 500 };
  }
  redirect('/(auth)/login');
}
