import { requireAuth } from '@/utils/supabase/auth';
import { signOut } from '../auth/actions';

export default async function ProtectedPage() {
  const session = await requireAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Protected Page</h1>
        <p className="mb-4">Welcome, {session.user.email}!</p>
        <p className="mb-4">
          This page is protected and only visible to authenticated users.
        </p>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
