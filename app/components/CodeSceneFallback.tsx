"use client";

export function CodeSceneFallback() {
  return (
    <div className="scene-fallback relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 opacity-70 scan-grid" />
      <div className="code-orbit absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="code-orbit code-orbit-slow absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="code-cube absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-x-6 top-8 grid gap-2 font-mono text-xs sm:grid-cols-2">
        <span className="scene-fallback-token rounded-md px-3 py-2">const architecture = scalable;</span>
        <span className="scene-fallback-token rounded-md px-3 py-2">stream.sync(SSE)</span>
        <span className="scene-fallback-token rounded-md px-3 py-2">microfrontend.mount()</span>
        <span className="scene-fallback-token rounded-md px-3 py-2">query.cache.persist()</span>
      </div>
    </div>
  );
}
