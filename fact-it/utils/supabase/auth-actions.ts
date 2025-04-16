import { createClient } from './server';
import { type AuthError } from './auth';

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw { message: error.message, status: 400 };
  }

  return data;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  metadata?: { first_name?: string; last_name?: string },
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/(auth)/callback`,
    },
  });

  if (error) {
    throw { message: error.message, status: 400 };
  }

  return data;
}

export async function resetPassword(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/(auth)/reset-password`,
  });

  if (error) {
    throw { message: error.message, status: 400 };
  }
}

export async function updatePassword(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw { message: error.message, status: 400 };
  }
}
