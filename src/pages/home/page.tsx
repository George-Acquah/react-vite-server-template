import { Suspense, lazy } from "react";

const Card = lazy(() => import("../../Card"));

function HomePage() {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <h1>Vite + React</h1>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Suspense fallback={<p>Loading card component...</p>}>
          <Card />
        </Suspense>

        <p>Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default HomePage;
