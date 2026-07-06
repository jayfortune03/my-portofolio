"use client";

import { Chip } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
import type { Project } from "../../data/portfolio";
import { fadeUp } from "../shared/animation";
import { ProjectPreview } from "./ProjectPreview";

type ProjectCardProps = {
  index: number;
  project: Project;
};

function ProjectCardComponent({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="glass project-card flex min-h-[430px] flex-col overflow-hidden rounded-lg p-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.45, delay: index * 0.03 }}
    >
      <ProjectPreview project={project} />
      <div className="mt-5 font-mono text-xs text-[#7dd3fc]">
        {project.type}
      </div>
      <h3 className="mt-3 text-2xl font-black text-white">{project.name}</h3>
      <p className="mt-4 flex-1 leading-7 text-white/66">
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Chip key={item} label={item} size="small" />
        ))}
      </div>
    </motion.article>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
