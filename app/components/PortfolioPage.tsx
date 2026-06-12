"use client";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SchoolIcon from "@mui/icons-material/School";
import StorageIcon from "@mui/icons-material/Storage";
import TimelineIcon from "@mui/icons-material/Timeline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Button,
  Chip,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { CodeSceneFallback } from "./CodeSceneFallback";
import {
  achievements,
  cvFiles,
  experiences,
  heroStats,
  navLinks,
  profileLinks,
  projects,
  stackGroups,
  type StackGroup,
} from "../data/portfolio";

const CodeScene = dynamic(() => import("./CodeScene"), {
  ssr: false,
  loading: () => <CodeSceneFallback />,
});

type ThemeMode = "dark" | "light";

function makeTheme(mode: ThemeMode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: isDark ? "#7ef7b9" : "#047857" },
      secondary: { main: isDark ? "#7dd3fc" : "#0369a1" },
      background: {
        default: isDark ? "#07100d" : "#f6fbf8",
        paper: isDark ? "#0c1916" : "#ffffff",
      },
      text: {
        primary: isDark ? "#edf7f1" : "#0c1714",
        secondary: isDark
          ? "rgba(237, 247, 241, 0.68)"
          : "rgba(12, 23, 20, 0.68)",
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: "var(--font-inter), Arial, sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            borderColor: isDark
              ? "rgba(237, 247, 241, 0.16)"
              : "rgba(12, 23, 20, 0.14)",
            backgroundColor: isDark
              ? "rgba(237, 247, 241, 0.06)"
              : "rgba(4, 120, 87, 0.08)",
          },
        },
      },
    },
  });
}

const stackIcons: Record<StackGroup["icon"], ReactNode> = {
  frontend: <DataObjectIcon />,
  backend: <StorageIcon />,
  mobile: <PhoneIphoneIcon />,
  cloud: <IntegrationInstructionsIcon />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function PortfolioPage() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [richSceneEnabled, setRichSceneEnabled] = useState(false);
  const [sceneInView, setSceneInView] = useState(true);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const theme = useMemo(() => makeTheme(mode), [mode]);

  useEffect(() => {
    const savedMode = window.localStorage.getItem("portfolio-theme");

    if (savedMode === "dark" || savedMode === "light") {
      setMode(savedMode);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setMode("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem("portfolio-theme", mode);
  }, [mode]);

  useEffect(() => {
    const hasWebGLSupport = () => {
      try {
        const canvas = document.createElement("canvas");
        return Boolean(
          window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
        );
      } catch {
        return false;
      }
    };

    const updateRichScenePreference = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const narrowScreen = window.matchMedia("(max-width: 767px)").matches;
      const lowCoreCount = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const lowMemory = typeof deviceMemory === "number" ? deviceMemory <= 4 : false;

      setRichSceneEnabled(
        hasWebGLSupport() && !reducedMotion && !narrowScreen && !lowCoreCount && !lowMemory,
      );
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const screenQuery = window.matchMedia("(max-width: 767px)");

    updateRichScenePreference();
    motionQuery.addEventListener("change", updateRichScenePreference);
    screenQuery.addEventListener("change", updateRichScenePreference);

    return () => {
      motionQuery.removeEventListener("change", updateRichScenePreference);
      screenQuery.removeEventListener("change", updateRichScenePreference);
    };
  }, []);

  useEffect(() => {
    const heroVisual = heroVisualRef.current;

    if (!heroVisual || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneInView(entry.isIntersecting);
      },
      {
        rootMargin: "180px",
        threshold: 0.08,
      },
    );

    observer.observe(heroVisual);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main
        className="portfolio-shell scan-grid min-h-screen overflow-hidden"
        data-theme={mode}
      >
        <nav className="site-nav fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4">
            <a
              href="#home"
              className="font-mono text-sm font-bold tracking-normal text-[#7ef7b9]"
              onClick={() => setMobileMenuOpen(false)}
            >
              NF.dev
            </a>
            <div className="hidden items-center gap-6 text-sm text-white/72 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Tooltip
                title={
                  mode === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                <IconButton
                  aria-label={
                    mode === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  color="primary"
                  onClick={() =>
                    setMode((current) =>
                      current === "dark" ? "light" : "dark",
                    )
                  }
                  size="small"
                >
                  {mode === "dark" ? (
                    <LightModeIcon fontSize="small" />
                  ) : (
                    <DarkModeIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
              <Button
                href={profileLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                size="small"
                variant="outlined"
                startIcon={<WhatsAppIcon />}
              >
                WhatsApp
              </Button>
              <IconButton
                aria-controls="mobile-navigation"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="md:!hidden"
                color="primary"
                onClick={() => setMobileMenuOpen((current) => !current)}
                size="small"
              >
                {mobileMenuOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
              </IconButton>
            </div>
          </div>
          <div
            id="mobile-navigation"
            className={`mobile-nav-panel md:hidden ${mobileMenuOpen ? "mobile-nav-panel-open" : ""}`}
          >
            <div className="mx-auto grid max-w-[1500px] gap-2 px-5 pb-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-3 text-sm font-bold text-white/78"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <section
          id="home"
          className="relative mx-auto grid min-h-screen max-w-[1500px] scroll-mt-24 items-center gap-12 px-5 pb-16 pt-28 lg:grid-cols-[0.98fr_1.02fr]"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-md px-3 py-2 font-mono text-xs">
              <AutoAwesomeIcon fontSize="small" />
              Full stack engineer from Tangerang, Indonesia
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Nicholas Fortune, Full Stack Engineer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              I build scalable CRM, real-time, mobile, and enterprise platforms
              across frontend, backend, cloud, and team leadership. The work is
              practical: clean architecture, fast interfaces, reliable data
              flows, and systems that operators can use every day.
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
            ref={heroVisualRef}
            data-testid="hero-visual"
            className="glass relative h-[410px] overflow-hidden rounded-lg lg:h-[560px]"
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

        <section
          id="journey"
          className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20"
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

        <section
          id="projects"
          className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20"
        >
          <SectionHeading
            eyebrow="Selected builds"
            title="Projects shaped around operations, data, and speed."
          />
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                className="glass flex min-h-[300px] flex-col rounded-lg p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.03 }}
              >
                <div className="font-mono text-xs text-[#7dd3fc]">
                  {project.type}
                </div>
                <h3 className="mt-3 text-2xl font-black text-white">
                  {project.name}
                </h3>
                <p className="mt-4 flex-1 leading-7 text-white/66">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Chip key={item} label={item} size="small" />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="stack"
          className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20"
        >
          <SectionHeading
            eyebrow="Tech stack"
            title="Typed apps, resilient APIs, and practical architecture."
          />
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2">
            {stackGroups.map((group) => (
              <div
                key={group.label}
                className="glass flex h-full flex-col rounded-lg p-6"
              >
                <div className="flex items-center gap-3 text-[#7ef7b9]">
                  {stackIcons[group.icon]}
                  <h3 className="text-xl font-black text-white">
                    {group.label}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="certification"
          className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20"
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
                      Coding bootcamp certification covering JavaScript,
                      full-stack web development, application architecture, and
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
                engineering. The later work experience expands that foundation
                into CRM systems, mobile apps, real-time operations, and
                micro-frontend architecture.
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

        <section className="mx-auto max-w-[1500px] px-5 py-20">
          <SectionHeading
            eyebrow="Impact"
            title="A few outcomes that matter."
          />
          <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                className="glass h-full rounded-lg p-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <div className="font-mono text-sm text-[#7ef7b9]">
                  0{index + 1}
                </div>
                <p className="mt-3 leading-7 text-white/74">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-24"
        >
          <div className="glass grid gap-8 rounded-lg p-8 lg:grid-cols-[0.98fr_1.02fr] lg:p-10">
            <div>
              <div className="font-mono text-sm text-[#7ef7b9]">
                contact.init()
              </div>
              <h2 className="mt-3 text-4xl font-black text-white">
                Let’s build something clean, fast, and useful.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/68">
                Available for full-stack, frontend, and backend engineering
                roles across enterprise products, mobile apps, and real-time
                operational systems.
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
                Download the latest CV as a searchable PDF, or reach out
                directly for full-stack, frontend, backend, mobile, and
                real-time product work.
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
      </main>
    </ThemeProvider>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
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
