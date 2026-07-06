"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { fadeUp } from "./animation";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

function SectionHeadingComponent({ eyebrow, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
    >
      <div className="font-mono text-sm text-[#7ef7b9]">{eyebrow}</div>
      <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl">
        {title}
      </h2>
    </motion.div>
  );
}

export const SectionHeading = memo(SectionHeadingComponent);
