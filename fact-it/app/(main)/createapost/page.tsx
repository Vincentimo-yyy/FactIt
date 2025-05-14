'use client';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Link,
  Paperclip,
  Video,
  ChevronDown,
  Users,
  Camera,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function CreatePost() {
  const supabase = createClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [references, setReferences] = useState<string[]>([]);
  const [newReference, setNewReference] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedCommunity, setSelectedCommunity] =
    useState('Select a Community');

  const handleAddReference = () => {
    if (newReference.trim()) {
      setReferences([...references, newReference]);
      setNewReference('');
    }
  };

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.');
      return;
    }

    setIsPosting(true);

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData) {
        console.error('Error fetching user:', userError);
        alert('Failed to fetch user information. Please log in again.');
        return;
      }

      // Insert the post into the posts table
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            user_id: userData.user.id,
            headline: title,
            description: content,
            timestamp: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (postError) {
        console.error('Error creating post:', postError);
        alert('Failed to create post.');
        return;
      }

      // Insert references into the references table
      const referencesData = references.map((ref) => ({
        post_id: post.id, // Link to the created post
        title: ref,
        url: ref,
      }));

      const { error: referencesError } = await supabase
        .from('references')
        .insert(referencesData);

      if (referencesError) {
        console.error('Error creating references:', referencesError);
        alert('Failed to add references.');
        return;
      }

      alert('Post created successfully!');
      setTitle('');
      setContent('');
      setReferences([]);
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-1 text-gray-700 border border-gray-300 rounded-full">
          add tag +
        </button>

        {/* Community Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-1 border border-gray-300 rounded-lg text-gray-600">
            <Users size={16} />
            <span>{selectedCommunity}</span>
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white shadow-lg border border-gray-200 rounded-lg"
          >
            <DropdownMenuItem
              onClick={() => setSelectedCommunity('ABS-CBN PH')}
            >
              ABS-CBN PH
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedCommunity('PBB Community')}
            >
              PBB Community
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedCommunity('GMA News Online')}
            >
              GMA News Online
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCommunity('Team PH')}>
              Team PH
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Editor */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-secondary mb-3">
          Create a Post
        </h2>

        {/* Toolbar */}
        <div className="flex items-center space-x-3 border-b pb-2 mb-3">
          <button className="p-2 text-gray-700 hover:text-[#4f3e9e] hover:bg-[#c8c3e3] rounded-lg transition">
            <Bold size={16} />
          </button>
          <button className="p-2 text-gray-700 hover:text-[#4f3e9e] hover:bg-[#c8c3e3] rounded-lg transition">
            <Italic size={16} />
          </button>
          <button className="p-2 text-gray-700 hover:text-[#4f3e9e] hover:bg-[#c8c3e3] rounded-lg transition">
            <Underline size={16} />
          </button>
          <button className="p-2 text-gray-700 hover:text-[#4f3e9e] hover:bg-[#c8c3e3] rounded-lg transition">
            <Link size={16} />
          </button>
        </div>

        <div className="space-y-1">
          {/* Title Input */}
          <input
            type="text"
            className="w-full px-4 py-1 text-2xl font-semibold focus:outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Post Content */}
          <textarea
            className="w-full h-40 px-4 focus:outline-none resize-none"
            placeholder="Write your post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* References Input */}
        <div className="mb-3">
          <label className="text-gray-700 font-semibold">References:</label>
          <input
            type="text"
            placeholder="Enter your reference here..."
            className="w-full p-2 mt-1 border rounded-lg"
            value={newReference}
            onChange={(e) => setNewReference(e.target.value)}
          />
          <button
            onClick={handleAddReference}
            className="mt-2 px-4 py-2 bg-secondary text-white rounded-lg"
          >
            Add Reference
          </button>
          <ul className="mt-2">
            {references.map((ref, index) => (
              <li key={index} className="text-sm text-gray-600">
                {ref}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        {/* Attachments Container - Takes Available Space */}
        <div className="flex items-center space-x-3 flex-1 p-2 bg-[#FAF9FF] shadow-md rounded-lg">
          <button className="flex items-center space-x-1 text-muted-foreground p-1 hover:text-[#4f3e9e] hover:bg-[#c8c3e3] rounded-lg transition">
            <Paperclip size={18} className="text-secondary" />{' '}
            <span>Attach File</span>
          </button>
          <button className="flex items-center space-x-1 text-muted-foreground p-1 hover:text-[#4f3e9e] hover:bg-[#c8c3e3] rounded-lg transition">
            <Camera size={18} className="text-secondary" />{' '}
            <span>Upload Photo</span>
          </button>
          <button className="flex items-center space-x-1 text-muted-foreground p-1 hover:text-[#4f3e9e] hover:bg-[#c8c3e3] rounded-lg transition">
            <Video size={18} className="text-secondary" />{' '}
            <span>Upload Video</span>
          </button>
        </div>

        {/* Action Buttons - Positioned Properly */}
        <div className="flex space-x-2 ml-3">
          <button className="px-4 py-2 bg-secondary text-white rounded-2xl">
            Save as draft
          </button>
          <button
            onClick={handlePost}
            disabled={isPosting}
            className="px-4 py-2 bg-secondary text-white rounded-2xl"
          >
            {isPosting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
