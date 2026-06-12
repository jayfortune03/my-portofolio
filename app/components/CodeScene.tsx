"use client";

import { Float, Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, type ErrorInfo, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { CodeSceneFallback } from "./CodeSceneFallback";
import { journeyNodes, type JourneyNode } from "../data/portfolio";

type RenderProfile = "standard" | "lite";
type SceneMode = "dark" | "light";

function ExperienceJourney({
  isActive,
  selectedId,
  onSelect,
  renderProfile,
  mode,
}: {
  isActive: boolean;
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
    if (isLite || !isActive) {
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
          speed={isLite || !isActive ? 0 : 1.15 + index * 0.08}
          rotationIntensity={isLite || !isActive ? 0 : 0.22}
          floatIntensity={isLite || !isActive ? 0 : 0.35}
        >
          <group position={node.position}>
            <NodeMesh node={node} selected={selectedId === node.id} onSelect={onSelect} />
            <Html center distanceFactor={5.7} position={[0, 0.58, 0]} zIndexRange={[8, 1]} style={{ pointerEvents: "auto" }}>
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

export default function CodeScene({
  isActive,
  mode,
}: {
  isActive: boolean;
  mode: SceneMode;
}) {
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
      <div className="code-scene-root relative h-full w-full bg-[var(--scene-surface)]">
        <Canvas
          camera={{ position: [0, 1.45, 6.35], fov: 48 }}
          dpr={[1, renderProfile === "lite" ? 1 : 1.5]}
          fallback={<CodeSceneFallback />}
          frameloop={renderProfile === "lite" || !isActive ? "demand" : "always"}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(mode === "light" ? "#f7fbf8" : "#07100d", 1)}
        >
          <color attach="background" args={[mode === "light" ? "#f7fbf8" : "#07100d"]} />
          <ambientLight intensity={mode === "light" ? 1.25 : 0.7} />
          <pointLight position={[3, 4, 4]} intensity={mode === "light" ? 46 : 70} color={mode === "light" ? "#047857" : "#7ef7b9"} />
          <pointLight position={[-4, -1, -3]} intensity={mode === "light" ? 24 : 40} color={mode === "light" ? "#0369a1" : "#fb7185"} />
          <ExperienceJourney
            isActive={isActive}
            selectedId={selectedId}
            onSelect={(node) => setSelectedId(node.id)}
            renderProfile={renderProfile}
            mode={mode}
          />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={renderProfile === "standard" && isActive} autoRotateSpeed={0.7} />
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
