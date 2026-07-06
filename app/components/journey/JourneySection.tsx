"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { experiences } from "../../data/portfolio";
import { fadeUp } from "../shared/animation";
import { SectionHeading } from "../shared/SectionHeading";

function JourneySectionComponent() {
  return (
    <section
      id="journey"
      className="mx-auto max-w-[1680px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Experience line"
        title="A connected journey through production systems."
      />
      <div className="relative mt-12">
        <div className="timeline-rail absolute left-4 top-0 h-full w-px md:left-1/2" />
        <div className="space-y-7">
          {experiences.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.period}`}
              className={`relative grid gap-5 md:grid-cols-2 ${index % 2 ? "md:[&>div]:col-start-2" : ""}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
            >
              <div className="absolute left-2.5 top-7 h-3.5 w-3.5 rounded-full border-2 border-[#07100d] bg-[#7ef7b9] shadow-[0_0_28px_rgba(126,247,185,0.9)] md:left-[calc(50%-7px)]" />
              <div className="glass ml-10 rounded-lg p-6 md:ml-0">
                <div className="font-mono text-xs text-[#7dd3fc]">
                  {item.period}
                </div>
                <h3 className="mt-3 text-2xl font-black text-white">
                  {item.role}
                </h3>
                <p className="mt-1 text-[#7ef7b9]">{item.company}</p>
                <p className="mt-4 font-mono text-sm text-[#f8d66d]">
                  {item.signal}
                </p>
                <p className="mt-3 leading-7 text-white/68">{item.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const JourneySection = memo(JourneySectionComponent);
