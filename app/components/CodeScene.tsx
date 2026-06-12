"use client";

import { Float, Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, type ErrorInfo, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

type JourneyNode = {
  id: string;
  year: string;
  title: string;
  stack: string;
  description: string;
  details: string[];
  tech: string[];
  color: string;
  position: [number, number, number];
  shape: "box" | "sphere" | "octa" | "mobile" | "modules";
};

type RenderProfile = "standard" | "lite";
type SceneMode = "dark" | "light";

const journeyNodes: JourneyNode[] = [
  {
    id: "marketa-chat",
    year: "2022",
    title: "Marketa Chat",
    stack: "Vue / Express",
    description: "CRM communication platform for property sales and customer support.",
    details: [
      "Built chat-based lead tracking and customer profiling workflows.",
      "Integrated Firebase Cloud Messaging and WhatsApp API communication.",
      "Converted the web app into cross-platform mobile delivery with CapacitorJS.",
    ],
    tech: ["Vue 2", "Express", "Socket", "Firebase", "CapacitorJS", "PostgreSQL"],
    color: "#7dd3fc",
    position: [-3.25, -0.28, 0.35],
    shape: "box",
  },
  {
    id: "qc-mobile",
    year: "2023",
    title: "QC Mobile",
    stack: "React Native",
    description: "Mobile quality-control app for construction site inspection and photo verification.",
    details: [
      "Supported on-site building QC audits from project locations.",
      "Connected inspection findings to backend services and real estate operations.",
      "Implemented mobile camera and verification workflows with TypeScript.",
    ],
    tech: ["React Native", "TypeScript", "Express", "PostgreSQL", "GCP"],
    color: "#fb7185",
    position: [-1.95, 0.28, -0.35],
    shape: "mobile",
  },
  {
    id: "happyhomes-crm",
    year: "2024",
    title: "HappyHomes CRM",
    stack: "React / SSE",
    description: "Property CRM for bookings, customer tracking, dashboarding, and payment monitoring.",
    details: [
      "Built order management and customer tracking for property sales operations.",
      "Implemented real-time payment tracking with Server-Sent Events.",
      "Created dashboard views for transactions, sales progress, and customer activity.",
    ],
    tech: ["React", "Express", "TanStack Query", "SSE", "PostgreSQL", "PocketBase"],
    color: "#f8d66d",
    position: [-0.65, -0.16, 0.45],
    shape: "octa",
  },
  {
    id: "real-estate-management",
    year: "2024",
    title: "REM Platform",
    stack: "Next / SSE",
    description: "Real estate management system for developer operations from land to procurement.",
    details: [
      "Covered land acquisition, permits, construction progress, and procurement workflows.",
      "Used typed frontend and backend architecture for maintainability.",
      "Enabled real-time authentication and status monitoring with SSE.",
    ],
    tech: ["Next.js", "Express.ts", "TypeScript", "PostgreSQL", "SSE", "GCP"],
    color: "#7ef7b9",
    position: [0.75, 0.34, -0.28],
    shape: "sphere",
  },
  {
    id: "amani-supplier",
    year: "2024",
    title: "Amani Supplier",
    stack: "Next / NestJS",
    description: "Material Management & Admin Platform for construction inventory and contractor operations.",
    details: [
      "Built the admin system for uploading and maintaining product catalogs available to contractors.",
      "Tracked contractor material orders in real time with a centralized logistics and supply-flow view.",
      "Improved inventory visibility and coordination between procurement and construction teams.",
    ],
    tech: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Material UI", "SSE"],
    color: "#38bdf8",
    position: [2.0, -0.14, 0.32],
    shape: "modules",
  },
  {
    id: "micro-fe",
    year: "2025",
    title: "Micro-FE",
    stack: "Vue 3 / Vite",
    description: "Enterprise internal modules integrated into host applications through micro-frontend architecture.",
    details: [
      "Integrated CRM, metering, route management, and reporting modules.",
      "Standardized reusable UI patterns for enterprise frontend teams.",
      "Optimized internal applications for high-traffic operational users.",
    ],
    tech: ["Vue 3", "Vite", "Module Federation", "Tailwind", "REST API", "JWT"],
    color: "#a78bfa",
    position: [3.25, 0.2, -0.22],
    shape: "modules",
  },
];

function ExperienceJourney({
  selectedId,
  onSelect,
  renderProfile,
  mode,
}: {
  selectedId: string;
  onSelect: (node: JourneyNode) => void;
  renderProfile: RenderProfile;
  mode: SceneMode;
}) {
  const groupRef = useRef<Group>(null);
  const isLite = renderProfile === "lite";
  const points = useMemo(
    () => journeyNodes.map((node) => node.position),
    [],
  );

  useFrame((state, delta) => {
    if (isLite) {
      return;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <Line points={points} color={mode === "light" ? "#047857" : "#7ef7b9"} lineWidth={2} transparent opacity={0.7} />
      <Line points={points.map(([x, y, z]) => [x, y - 0.18, z] as [number, number, number])} color={mode === "light" ? "#0369a1" : "#7dd3fc"} lineWidth={1} transparent opacity={0.28} />
      {journeyNodes.map((node, index) => (
        <Float
          key={node.title}
          speed={isLite ? 0 : 1.15 + index * 0.08}
          rotationIntensity={isLite ? 0 : 0.22}
          floatIntensity={isLite ? 0 : 0.35}
        >
          <group position={node.position}>
            <NodeMesh node={node} selected={selectedId === node.id} onSelect={onSelect} />
            <Html center distanceFactor={5.7} position={[0, 0.58, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: "auto" }}>
              <button
                aria-label={`Show ${node.title} project details`}
                className={`journey-label ${selectedId === node.id ? "journey-label-active" : ""}`}
                type="button"
                onClick={() => onSelect(node)}
              >
                <span>{node.year}</span>
                <strong>{node.title}</strong>
                <small>{node.stack}</small>
              </button>
            </Html>
          </group>
        </Float>
      ))}
      <mesh position={[0, -0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.01, 12, 160]} />
        <meshStandardMaterial color={mode === "light" ? "#047857" : "#7ef7b9"} emissive={mode === "light" ? "#064e3b" : "#1f8f5a"} emissiveIntensity={0.45} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function NodeMesh({
  node,
  selected,
  onSelect,
}: {
  node: JourneyNode;
  selected: boolean;
  onSelect: (node: JourneyNode) => void;
}) {
  const material = (
    <meshStandardMaterial
      color={node.color}
      emissive={node.color}
      emissiveIntensity={selected ? 1.05 : 0.55}
      metalness={0.35}
      roughness={0.24}
    />
  );
  const scale = selected ? 1.22 : 1;
  const interactions = {
    onClick: (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      onSelect(node);
    },
    onPointerOver: () => {
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      document.body.style.cursor = "";
    },
  };

  if (node.shape === "box") {
    return (
      <mesh scale={scale} rotation={[0.35, 0.55, 0.15]} {...interactions}>
        <boxGeometry args={[0.34, 0.34, 0.34]} />
        {material}
      </mesh>
    );
  }

  if (node.shape === "octa") {
    return (
      <mesh scale={scale} rotation={[0.25, 0.4, 0.1]} {...interactions}>
        <octahedronGeometry args={[0.25, 0]} />
        {material}
      </mesh>
    );
  }

  if (node.shape === "mobile") {
    return (
      <group scale={scale} {...interactions}>
        <mesh>
          <boxGeometry args={[0.22, 0.42, 0.04]} />
          {material}
        </mesh>
        <mesh position={[0, -0.15, 0.028]}>
          <boxGeometry args={[0.08, 0.018, 0.01]} />
          <meshStandardMaterial color="#07100d" emissive="#07100d" />
        </mesh>
      </group>
    );
  }

  if (node.shape === "modules") {
    return (
      <group scale={scale} {...interactions}>
        {[
          [-0.16, 0.08, 0],
          [0.16, 0.08, 0],
          [0, -0.16, 0],
        ].map((position) => (
          <mesh key={position.join(",")} position={position as [number, number, number]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            {material}
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <mesh scale={scale} {...interactions}>
      <icosahedronGeometry args={[0.28, 1]} />
      {material}
    </mesh>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("3D scene failed", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <CodeSceneFallback />;
    }

    return this.props.children;
  }
}

function hasWebGLSupport() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function getRenderProfile(): RenderProfile {
  if (typeof window === "undefined") {
    return "lite";
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrowScreen = window.matchMedia("(max-width: 640px)").matches;
  const lowCoreCount = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof deviceMemory === "number" ? deviceMemory <= 4 : false;

  return reducedMotion || narrowScreen || lowCoreCount || lowMemory ? "lite" : "standard";
}

export default function CodeScene({ mode }: { mode: SceneMode }) {
  const [canUseWebGL, setCanUseWebGL] = useState<boolean | null>(null);
  const [renderProfile, setRenderProfile] = useState<RenderProfile>("lite");
  const [selectedId, setSelectedId] = useState(journeyNodes[3].id);
  const selectedNode = journeyNodes.find((node) => node.id === selectedId) ?? journeyNodes[0];

  useEffect(() => {
    const updateProfile = () => {
      setCanUseWebGL(hasWebGLSupport());
      setRenderProfile(getRenderProfile());
    };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    updateProfile();
    window.addEventListener("resize", updateProfile);
    motionQuery.addEventListener("change", updateProfile);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("resize", updateProfile);
      motionQuery.removeEventListener("change", updateProfile);
    };
  }, []);

  if (canUseWebGL !== true) {
    return <CodeSceneFallback />;
  }

  return (
    <SceneBoundary>
      <div className="relative h-full w-full bg-[var(--scene-surface)]">
        <Canvas
          camera={{ position: [0, 1.45, 6.35], fov: 48 }}
          dpr={[1, renderProfile === "lite" ? 1 : 1.5]}
          fallback={<CodeSceneFallback />}
          frameloop={renderProfile === "lite" ? "demand" : "always"}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(mode === "light" ? "#f7fbf8" : "#07100d", 1)}
        >
          <color attach="background" args={[mode === "light" ? "#f7fbf8" : "#07100d"]} />
          <ambientLight intensity={mode === "light" ? 1.25 : 0.7} />
          <pointLight position={[3, 4, 4]} intensity={mode === "light" ? 46 : 70} color={mode === "light" ? "#047857" : "#7ef7b9"} />
          <pointLight position={[-4, -1, -3]} intensity={mode === "light" ? 24 : 40} color={mode === "light" ? "#0369a1" : "#fb7185"} />
          <ExperienceJourney selectedId={selectedId} onSelect={(node) => setSelectedId(node.id)} renderProfile={renderProfile} mode={mode} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={renderProfile === "standard"} autoRotateSpeed={0.7} />
        </Canvas>
        <ProjectDetail node={selectedNode} />
      </div>
    </SceneBoundary>
  );
}

function ProjectDetail({ node }: { node: JourneyNode }) {
  return (
    <aside className="project-detail-panel" aria-live="polite">
      <div className="font-mono text-[11px] text-[#7ef7b9]">{node.year} / selected.project</div>
      <h2>{node.title}</h2>
      <p>{node.description}</p>
      <ul>
        {node.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <div className="project-detail-stack">
        {node.tech.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </aside>
  );
}

export function CodeSceneFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07100d]">
      <div className="absolute inset-0 opacity-70 scan-grid" />
      <div className="code-orbit absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7ef7b9]/35" />
      <div className="code-orbit code-orbit-slow absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7dd3fc]/25" />
      <div className="code-cube absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 border border-[#7ef7b9]/50 bg-[#7ef7b9]/10 shadow-[0_0_60px_rgba(126,247,185,0.25)]" />
      <div className="absolute inset-x-6 top-8 grid gap-2 font-mono text-xs text-white/70 sm:grid-cols-2">
        <span className="rounded-md border border-white/10 bg-black/25 px-3 py-2">const architecture = scalable;</span>
        <span className="rounded-md border border-white/10 bg-black/25 px-3 py-2">stream.sync(SSE)</span>
        <span className="rounded-md border border-white/10 bg-black/25 px-3 py-2">microfrontend.mount()</span>
        <span className="rounded-md border border-white/10 bg-black/25 px-3 py-2">query.cache.persist()</span>
      </div>
    </div>
  );
}
