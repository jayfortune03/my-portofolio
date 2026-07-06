"use client";

import { memo } from "react";
import { projects } from "../../data/portfolio";
import { SectionHeading } from "../shared/SectionHeading";
import { ProjectCard } from "./ProjectCard";

function ProjectsSectionComponent() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1680px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Selected builds"
        title="Projects shaped around operations, data, and speed."
      />
      <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export const ProjectsSection = memo(ProjectsSectionComponent);
