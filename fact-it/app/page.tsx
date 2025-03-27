export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Fact Cards */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="p-4 border rounded-lg bg-background">
            <div className="mb-2 text-sm text-muted-foreground">
              r/factchecking • 2d • 167k views
            </div>
            <h3 className="text-xl font-semibold mb-2">Claim #{item}</h3>
            <p className="text-muted-foreground mb-4">
              This is a sample claim that has been fact-checked. The claim
              states that...
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm">
                  <span>↑</span>
                  <span>{Math.floor(Math.random() * 500)}</span>
                </button>
                <button className="flex items-center space-x-1 text-sm">
                  <span>↓</span>
                </button>
                <button className="flex items-center space-x-1 text-sm">
                  <span>💬</span>
                  <span>{Math.floor(Math.random() * 100)}</span>
                </button>
              </div>
              <div>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
