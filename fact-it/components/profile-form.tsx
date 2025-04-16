'use client';

import type React from 'react';

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export default function ProfileForm({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;

        if (data) {
          setUsername(data.username || '');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [userId, supabase]);

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <form onSubmit={updateProfile} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {success && (
        <div className="text-green-600 text-sm">
          Profile updated successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
