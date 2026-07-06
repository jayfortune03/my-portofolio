"use client";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import TimelineIcon from "@mui/icons-material/Timeline";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { forwardRef, memo } from "react";
import { heroStats } from "../../data/portfolio";
import { CodeSceneFallback } from "../CodeSceneFallback";
import { fadeUp } from "../shared/animation";

const CodeScene = dynamic(() => import("../CodeScene"), {
  ssr: false,
  loading: () => <CodeSceneFallback />,
});

type HeroSectionProps = {
  mode: "dark" | "light";
  richSceneEnabled: boolean;
  sceneInView: boolean;
};

function HeroSectionComponent(
  { mode, richSceneEnabled, sceneInView }: HeroSectionProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-screen max-w-[1680px] scroll-mt-24 items-center gap-10 px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-[0.98fr_1.02fr] lg:items-start lg:px-8 lg:pt-36 xl:gap-14 xl:pt-40"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        <div className="hero-badge mb-6 inline-flex items-center rounded-md px-4 py-2.5 font-mono text-sm font-bold">
          Full Stack Engineer | Tangerang, Indonesia
        </div>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
          Nicholas Fortune, Full Stack Engineer.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
          I build scalable CRM, real-time, mobile, and enterprise platforms
          across frontend, backend, cloud, and team leadership. The work is
          practical: clean architecture, fast interfaces, reliable data flows,
          and systems that operators can use every day.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href="#projects"
            variant="contained"
            endIcon={<ArrowOutwardIcon />}
            size="large"
          >
            View projects
          </Button>
          <Button
            href="#journey"
            variant="outlined"
            startIcon={<TimelineIcon />}
            size="large"
          >
            Work journey
          </Button>
        </div>
        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
          {heroStats.map(([value, label]) => (
            <div key={label} className="glass rounded-lg px-4 py-5">
              <div className="font-mono text-2xl font-black text-[#7ef7b9]">
                {value}
              </div>
              <div className="mt-1 text-sm text-white/58">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={ref}
        data-testid="hero-visual"
        className="glass relative h-[500px] overflow-hidden rounded-lg sm:h-[430px] lg:h-[560px]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.12 }}
      >
        {richSceneEnabled ? (
          <CodeScene isActive={sceneInView} mode={mode} />
        ) : (
          <CodeSceneFallback />
        )}
      </motion.div>
    </section>
  );
}

HeroSectionComponent.displayName = "HeroSection";

export const HeroSection = memo(forwardRef(HeroSectionComponent));
