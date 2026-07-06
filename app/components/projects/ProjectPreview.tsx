"use client";

import { memo } from "react";
import type { Project } from "../../data/portfolio";

type ProjectPreviewProps = {
  project: Project;
};

function ProjectPreviewComponent({ project }: ProjectPreviewProps) {
  return (
    <div
      className={`project-preview project-preview-${project.visual.accent}`}
      aria-label={`${project.name} representative system preview`}
    >
      <div className="project-preview-chrome">
        <span className="project-preview-dot" />
        <span className="project-preview-dot" />
        <span className="project-preview-dot" />
        <span className="project-preview-label">{project.visual.label}</span>
      </div>
      <ProjectPreviewContent variant={project.visual.variant} />
    </div>
  );
}

function ProjectPreviewContent({
  variant,
}: {
  variant: Project["visual"]["variant"];
}) {
  if (variant === "operations") {
    return (
      <div className="preview-layout preview-operations">
        <div className="preview-sidebar">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-panel">
          <div className="preview-metrics">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-flow">
            {["Land", "Permit", "Build", "Procure"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="preview-bars">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "supplier") {
    return (
      <div className="preview-table">
        {["Cement", "Steel", "Sand", "Paint"].map((item, index) => (
          <div key={item} className="preview-table-row">
            <span>{item}</span>
            <i style={{ width: `${78 - index * 10}%` }} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "commerce") {
    return (
      <div className="preview-checkout">
        <div className="preview-cart-lines">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-payment-card">
          <strong>Xendit</strong>
          <small>paid.sync</small>
        </div>
      </div>
    );
  }

  if (variant === "crm") {
    return (
      <div className="preview-pipeline">
        {["Lead", "Book", "Pay"].map((item, index) => (
          <div key={item} className="preview-column">
            <strong>{item}</strong>
            <span style={{ height: `${54 + index * 16}px` }} />
            <i />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="preview-mobile">
        <div className="preview-phone">
          <span />
          <strong>QC</strong>
          <i />
          <i />
          <i />
        </div>
        <div className="preview-photo-stack">
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (variant === "chat") {
    return (
      <div className="preview-chat">
        <div className="preview-contact-list">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-chat-window">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }

  if (variant === "website") {
    return (
      <div className="preview-website">
        <div className="preview-browser-bar">
          <span />
          <i />
          <strong>SSR</strong>
        </div>
        <div className="preview-web-grid">
          <div className="preview-seo-panel">
            <strong>SEO</strong>
            <span />
            <span />
          </div>
          <div className="preview-web-card">
            <span>News</span>
            <i />
          </div>
          <div className="preview-web-card">
            <span>MY</span>
            <i />
          </div>
          <div className="preview-web-metric">LCP</div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-modules">
      <div className="preview-host">
        <span />
        <span />
      </div>
      <div className="preview-module-grid">
        {["CRM", "ACMT", "RTR"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export const ProjectPreview = memo(ProjectPreviewComponent);
