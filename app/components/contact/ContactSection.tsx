"use client";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DescriptionIcon from "@mui/icons-material/Description";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "@mui/material";
import { memo } from "react";
import { cvFiles, profileLinks } from "../../data/portfolio";

function ContactSectionComponent() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1680px] scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="glass grid gap-8 rounded-lg p-8 lg:grid-cols-[0.98fr_1.02fr] lg:p-10">
        <div>
          <div className="font-mono text-sm text-[#7ef7b9]">contact.init()</div>
          <h2 className="mt-3 text-4xl font-black text-white">
            Let’s build something clean, fast, and useful.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/68">
            Available for full-stack, frontend, and backend engineering roles
            across enterprise products, mobile apps, and real-time operational
            systems.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-8 lg:p-10">
          <div className="flex items-center gap-3 text-[#7ef7b9]">
            <DescriptionIcon />
            <h3 className="text-xl font-black text-white">
              Resume and contact
            </h3>
          </div>
          <p className="mt-3 leading-7 text-white/64">
            Download the latest CV as a searchable PDF, or reach out directly
            for full-stack, frontend, backend, mobile, and real-time product
            work.
          </p>
          <div className="mt-5 space-y-3">
            <Button
              className="contact-action w-full"
              href={cvFiles.pdf}
              download
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
            >
              Download CV
            </Button>
            <div className="contact-actions grid mt-4 gap-3 sm:grid-cols-2">
              <Button
                className="contact-action"
                href={profileLinks.email}
                variant="outlined"
                startIcon={<AlternateEmailIcon />}
              >
                Email
              </Button>
              <Button
                className="contact-action"
                href={profileLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<WhatsAppIcon />}
              >
                WhatsApp
              </Button>
              <Button
                className="contact-action"
                href={profileLinks.github}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<GitHubIcon />}
              >
                GitHub
              </Button>
              <Button
                className="contact-action"
                href={profileLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<LinkedInIcon />}
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const ContactSection = memo(ContactSectionComponent);
