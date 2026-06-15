"use client";

import { useState } from "react";
import { journeyNodes } from "../data/portfolio";

export function CodeSceneFallback() {
  const [selectedId, setSelectedId] = useState(journeyNodes[0].id);
  const selectedNode =
    journeyNodes.find((node) => node.id === selectedId) ?? journeyNodes[0];

  return (
    <div className="scene-fallback relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 opacity-70 scan-grid" />
      <div className="scene-orbit pointer-events-none absolute left-1/2 top-[46%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--line)]" />
      <div className="scene-diamond pointer-events-none absolute left-[58%] top-[44%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[var(--line)] bg-[color-mix(in_srgb,var(--mint)_9%,transparent)]" />

      <div className="scene-fallback-inner relative z-10 flex h-full flex-col p-5 sm:p-6">
        <div className="scene-fallback-heading">
          <div className="font-mono text-[11px] text-[#7ef7b9]">
            mobile.project_trace
          </div>
          <h3 className="mt-1 text-xl font-black leading-tight text-white">
            Tap through the build journey.
          </h3>
        </div>

        <div className="scene-node-scroll -mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-2 sm:mt-5">
          {journeyNodes.map((node) => (
            <button
              key={node.id}
              aria-pressed={node.id === selectedId}
              className={`scene-node-button ${node.id === selectedId ? "scene-node-button-active" : ""}`}
              type="button"
              onClick={() => setSelectedId(node.id)}
            >
              <span>{node.year}</span>
              <strong>{node.title}</strong>
              <small>{node.stack}</small>
            </button>
          ))}
        </div>

        <div className="scene-fallback-detail mt-5 rounded-lg p-5 sm:mt-auto">
          <div className="font-mono text-[11px] text-[#7ef7b9]">
            {selectedNode.year} / selected.project
          </div>
          <h4 className="mt-1 text-2xl font-black leading-tight text-white">
            {selectedNode.title}
          </h4>
          <p className="scene-fallback-description mt-2 text-sm leading-6 text-white/68">
            {selectedNode.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedNode.tech.slice(0, 5).map((item) => (
              <span key={item} className="scene-tech-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
