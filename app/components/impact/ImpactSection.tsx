"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { achievements } from "../../data/portfolio";
import { fadeUp } from "../shared/animation";
import { SectionHeading } from "../shared/SectionHeading";

function ImpactSectionComponent() {
  return (
    <section className="mx-auto max-w-[1680px] px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Impact" title="A few outcomes that matter." />
      <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            className="glass h-full rounded-lg p-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="font-mono text-sm text-[#7ef7b9]">
                0{index + 1}
              </div>
              <div className="rounded-full border border-[#7dd3fc]/25 bg-[#7dd3fc]/8 px-3 py-1 font-mono text-xs text-[#7dd3fc]">
                {achievement.year}
              </div>
            </div>
            <h3 className="mt-4 text-xl font-black text-white">
              {achievement.title}
            </h3>
            <p className="mt-3 leading-7 text-white/68">
              {achievement.description}
            </p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#7ef7b9]">
                My contribution
              </div>
              <p className="mt-2 leading-7 text-white/78">
                {achievement.contribution}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export const ImpactSection = memo(ImpactSectionComponent);
