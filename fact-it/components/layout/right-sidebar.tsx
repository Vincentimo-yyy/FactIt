export function RightSidebar() {
  return (
    <div className="fixed top-14 right-0 w-64 h-[calc(100vh-3.5rem)] overflow-y-auto border-l p-4 bg-background">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3">Trending Topics</h3>
          <div className="space-y-3">
            {[
              'AI and Fact-checking',
              'Digital Literacy',
              'Information Verification',
            ].map((topic) => (
              <div
                key={topic}
                className="rounded-lg p-3 hover:bg-muted cursor-pointer"
              >
                <p className="font-medium">{topic}</p>
                <p className="text-sm text-muted-foreground">Trending now</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Suggested Resources</h3>
          <div className="space-y-3">
            {[
              {
                name: 'Fact Check Explorer',
                desc: "Google's fact checking tool",
              },
              { name: 'Media Bias Chart', desc: 'Evaluate news sources' },
              { name: 'Snopes', desc: 'Fact-checking website' },
            ].map((resource) => (
              <div
                key={resource.name}
                className="rounded-lg p-3 hover:bg-muted cursor-pointer"
              >
                <p className="font-medium">{resource.name}</p>
                <p className="text-sm text-muted-foreground">{resource.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Communities</h3>
          <div className="space-y-3">
            {[
              { name: 'Fact Checkers Network', members: '2.3k members' },
              { name: 'Digital Literacy Hub', members: '1.8k members' },
              { name: 'Information Science', members: '5.4k members' },
              { name: 'Media Truth Seekers', members: '3.7k members' },
              { name: 'Source Verification', members: '1.2k members' },
              { name: 'Critical Thinking', members: '4.1k members' },
            ].map((community) => (
              <div
                key={community.name}
                className="rounded-lg p-3 hover:bg-muted cursor-pointer border border-border"
              >
                <p className="font-medium">{community.name}</p>
                <p className="text-sm text-muted-foreground">
                  {community.members}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-3 text-primary hover:underline text-sm font-medium">
            See all communities
          </button>
        </div>
      </div>
    </div>
  );
}
