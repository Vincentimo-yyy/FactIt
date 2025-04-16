import { requireAuth } from '../../utils/supabase/auth';
import { signOut } from '../auth/actions';

export default async function ProtectedPage() {
  const user = await requireAuth();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
        <p className="mb-4">Welcome, {user.email}</p>
        <p className="mb-6 text-gray-600">
          This page is protected and only visible to authenticated users.
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
