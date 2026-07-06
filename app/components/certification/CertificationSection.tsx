"use client";

import DownloadIcon from "@mui/icons-material/Download";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
import { cvFiles } from "../../data/portfolio";
import { fadeUp } from "../shared/animation";
import { SectionHeading } from "../shared/SectionHeading";

function CertificationSectionComponent() {
  return (
    <section
      id="certification"
      className="mx-auto max-w-[1680px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Certification"
        title="Bootcamp foundation behind the production experience."
      />
      <div className="mt-10 grid auto-rows-fr items-stretch gap-5 lg:grid-cols-2">
        <motion.article
          className="glass flex h-full flex-col rounded-lg p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-3 text-[#7ef7b9]">
            <WorkspacePremiumIcon />
            <h3 className="text-2xl font-black text-white">
              Hacktiv8 Certification
            </h3>
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-black/24 p-5">
            <div className="flex items-start gap-3">
              <SchoolIcon className="mt-1 text-[#7dd3fc]" />
              <div>
                <div className="font-mono text-xs text-[#7dd3fc]">
                  June 2021 - September 2021
                </div>
                <p className="mt-2 text-lg font-bold text-white">
                  Full Stack JavaScript Immersive
                </p>
                <p className="mt-2 leading-7 text-white/64">
                  Coding bootcamp certification covering JavaScript, full-stack
                  web development, application architecture, and
                  production-oriented delivery.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <Button
              href={cvFiles.certificate}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              startIcon={<WorkspacePremiumIcon />}
            >
              View certificate
            </Button>
            <Button
              href={cvFiles.certificate}
              download
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Download
            </Button>
          </div>
        </motion.article>

        <motion.article
          className="glass flex h-full flex-col rounded-lg p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          <div className="font-mono text-sm text-[#7dd3fc]">
            career.foundation
          </div>
          <h3 className="mt-3 text-2xl font-black text-white">
            From JavaScript fundamentals to enterprise platforms.
          </h3>
          <p className="mt-4 leading-7 text-white/68">
            Hacktiv8 was the launch point for the full-stack path: frontend
            delivery, backend APIs, database workflows, and product-minded
            engineering. The later work experience expands that foundation into
            CRM systems, mobile apps, real-time operations, and micro-frontend
            architecture.
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {[
              "JavaScript",
              "Full Stack",
              "REST APIs",
              "Frontend",
              "Backend",
              "Deployment",
            ].map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export const CertificationSection = memo(CertificationSectionComponent);
