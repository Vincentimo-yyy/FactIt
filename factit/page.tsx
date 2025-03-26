export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-span-2">
        <h1 className="text-4xl font-bold text-center">Factit</h1>
        <p className="text-center">A simple fact-checking app</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Fact-checking</h2>
          <p>
            Factit is a simple fact-checking app that allows you to check the credibility of any information you come
            across on the internet.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">How it works</h2>
          <p>
            Factit uses the <a href="https://www.google.com">Google Fact Check API</a> to verify the credibility of
            information. Simply enter the information you want to fact-check and Factit will return{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

