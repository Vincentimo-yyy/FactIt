import { ExploreChannels } from '../explore-channels';
import { PopularCommunities } from '../popular-communities';

export function RightSidebar() {
  return (
    <div className="fixed top-14 right-0 w-80 h-[calc(100vh-3.5rem)] overflow-y-auto shadow-lg p-4 bg-background">
      <div className="space-y-4">
        <ExploreChannels />
        <PopularCommunities />
      </div>
    </div>
  );
}
