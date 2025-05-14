'use client';
import { cn } from '@/lib/utils';
import { Flag } from 'lucide-react';
import { useState } from 'react';
import { PostCard } from '@/lib/data';

interface PostClientProps {
  postData: PostCard;
}

export default function PostClient({ postData }: PostClientProps) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(postData.stats.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(postData.stats.downvotes);

  // New state for the justification form
  const [showJustificationForm, setShowJustificationForm] = useState(false);
  const [justificationType, setJustificationType] = useState<
    'greenflag' | 'redflag'
  >('greenflag');
  const [justificationText, setJustificationText] = useState('');
  const [selectedReference, setSelectedReference] = useState('');
  const [customReferences, setCustomReferences] = useState<
    PostCard['references']
  >([]);
  const [newReferenceTitle, setNewReferenceTitle] = useState('');
  const [newReferenceUrl, setNewReferenceUrl] = useState('');

  const handleUpvote = () => {
    if (upvoted) {
      // If already upvoted, just remove the upvote
      setUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
    } else {
      // Show justification form for upvote
      setJustificationType('greenflag');
      setShowJustificationForm(true);
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      // If already downvoted, just remove the downvote
      setDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
    } else {
      // Show justification form for downvote
      setJustificationType('redflag');
      setShowJustificationForm(true);
    }
  };

  const handleAddReference = () => {
    if (newReferenceTitle && newReferenceUrl) {
      setCustomReferences([
        ...customReferences,
        {
          id: customReferences.length + 1,
          title: newReferenceTitle,
          url: newReferenceUrl,
        },
      ]);
      setNewReferenceTitle('');
      setNewReferenceUrl('');
    }
  };

  const handleSubmitJustification = () => {
    if (justificationText.trim()) {
      console.log(
        `Submitting ${justificationType} justification: ${justificationText}`,
      );
      console.log(`Selected reference: ${selectedReference}`);
      console.log(`Custom references:`, customReferences);

      // Here you would typically send this data to your backend

      // Update UI
      if (justificationType === 'greenflag') {
        setUpvoted(true);
        setUpvoteCount(upvoteCount + 1);
        if (downvoted) {
          setDownvoted(false);
          setDownvoteCount(downvoteCount - 1);
        }
      } else {
        setDownvoted(true);
        setDownvoteCount(downvoteCount + 1);
        if (upvoted) {
          setUpvoted(false);
          setUpvoteCount(upvoteCount - 1);
        }
      }

      // Reset form
      setShowJustificationForm(false);
      setJustificationText('');
      setSelectedReference('');
      setCustomReferences([]);
    }
  };

  const handleCancelJustification = () => {
    setShowJustificationForm(false);
    setJustificationText('');
    setSelectedReference('');
    setCustomReferences([]);
  };

  return (
    <>
      <div className="flex items-center bg-primary-foreground rounded-full">
        <button
          className={cn('flex items-center mr-1', upvoted)}
          onClick={handleUpvote}
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-2xl group hover:bg-[#efecff]">
            <Flag
              className={`h-5 w-5 mr-1 scale-x-[-1] group-hover:stroke-green-600 ${upvoted ? 'fill-green-600 stroke-green-600' : ''} `}
            />
          </div>
          <span>{upvoteCount - downvoteCount}</span>
        </button>
        <button
          className={cn('flex items-center mr-1', downvoted)}
          onClick={handleDownvote}
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-2xl group hover:bg-[#efecff]">
            <Flag
              className={`h-5 w-5 group-hover:stroke-red-600 ${downvoted ? 'fill-red-600 stroke-red-600' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Justification Form */}
      {showJustificationForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <Flag
                  className={`h-4 w-4 mr-2 ${
                    justificationType === 'greenflag'
                      ? 'fill-green-600 stroke-green-600 scale-x-[-1]'
                      : 'fill-red-600 stroke-red-600'
                  }`}
                />
                {justificationType === 'greenflag'
                  ? 'Support Credibility'
                  : 'Question Credibility'}
              </h3>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Reference specific content from the post (optional):
                </label>
                <select
                  className="w-full p-2 border rounded-lg text-sm"
                  value={selectedReference}
                  onChange={(e) => setSelectedReference(e.target.value)}
                >
                  <option value="">Select content to reference</option>
                  <option value={postData.headline}>
                    Headline: {postData.headline}
                  </option>
                  <option value={postData.description}>
                    Description: {postData.description}
                  </option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {justificationType === 'greenflag'
                    ? 'Explain why you believe this information is credible:'
                    : 'Explain why you question the credibility of this information:'}
                </label>
                <textarea
                  value={justificationText}
                  onChange={(e) => setJustificationText(e.target.value)}
                  placeholder="Provide your reasoning..."
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3E9E] min-h-[100px] text-sm"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  References from the post:
                </label>
                <div className="bg-gray-50 p-2 rounded-md mb-2">
                  {postData.references.map((ref) => (
                    <div key={ref.id} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        id={`ref-${ref.id}`}
                        className="mr-2"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCustomReferences([...customReferences, ref]);
                          } else {
                            setCustomReferences(
                              customReferences.filter((r) => r.id !== ref.id),
                            );
                          }
                        }}
                      />
                      <label htmlFor={`ref-${ref.id}`} className="text-sm">
                        {ref.title}
                      </label>
                    </div>
                  ))}
                </div>

                <label className="block text-sm font-medium mb-1">
                  Add your own references:
                </label>

                {/* Display added custom references */}
                {customReferences.filter(
                  (ref) => !postData.references.some((r) => r.id === ref.id),
                ).length > 0 && (
                  <div className="bg-gray-50 p-2 rounded-md text-sm mb-2">
                    {customReferences
                      .filter(
                        (ref) =>
                          !postData.references.some((r) => r.id === ref.id),
                      )
                      .map((ref, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between mb-1"
                        >
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4F3E9E] hover:underline"
                          >
                            {ref.title}
                          </a>
                          <button
                            onClick={() =>
                              setCustomReferences(
                                customReferences.filter((r) => r !== ref),
                              )
                            }
                            className="text-red-500 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                  </div>
                )}

                {/* Add new reference form */}
                <div className="flex flex-col space-y-2 mb-2">
                  <input
                    type="text"
                    value={newReferenceTitle}
                    onChange={(e) => setNewReferenceTitle(e.target.value)}
                    placeholder="Reference title"
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={newReferenceUrl}
                    onChange={(e) => setNewReferenceUrl(e.target.value)}
                    placeholder="URL (https://...)"
                    className="p-2 border rounded-lg text-sm"
                  />
                  <button
                    onClick={handleAddReference}
                    disabled={!newReferenceTitle || !newReferenceUrl}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm disabled:opacity-50"
                  >
                    Add Reference
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end space-x-2">
              <button
                onClick={handleCancelJustification}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitJustification}
                disabled={!justificationText.trim()}
                className={`px-4 py-2 text-white rounded-lg text-sm ${
                  justificationType === 'greenflag'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                } disabled:opacity-50`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
