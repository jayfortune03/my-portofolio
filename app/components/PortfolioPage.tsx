"use client";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { navLinks } from "../data/portfolio";
import { CertificationSection } from "./certification/CertificationSection";
import { ContactSection } from "./contact/ContactSection";
import { HeroSection } from "./hero/HeroSection";
import { ImpactSection } from "./impact/ImpactSection";
import { JourneySection } from "./journey/JourneySection";
import { Navigation } from "./navigation/Navigation";
import { ProjectsSection } from "./projects/ProjectsSection";
import { StackSection } from "./stack/StackSection";

const PortfolioAssistant = dynamic(() => import("./PortfolioAssistant"), {
  ssr: false,
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

export default function PortfolioPage() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [richSceneEnabled, setRichSceneEnabled] = useState(false);
  const [sceneInView, setSceneInView] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
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
            (canvas.getContext("webgl") ||
              canvas.getContext("experimental-webgl")),
        );
      } catch {
        return false;
      }
    };

    const updateRichScenePreference = () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const narrowScreen = window.matchMedia("(max-width: 767px)").matches;
      const lowCoreCount = navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency <= 4
        : false;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
        .deviceMemory;
      const lowMemory =
        typeof deviceMemory === "number" ? deviceMemory <= 4 : false;
      const nextRichSceneEnabled =
        hasWebGLSupport() &&
        !reducedMotion &&
        !narrowScreen &&
        !lowCoreCount &&
        !lowMemory;

      setRichSceneEnabled((current) =>
        current === nextRichSceneEnabled ? current : nextRichSceneEnabled,
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
        setSceneInView((current) =>
          current === entry.isIntersecting ? current : entry.isIntersecting,
        );
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

  useEffect(() => {
    const sectionIds = ["home", ...navLinks.map((link) => link.href.slice(1))];
    let frameId = 0;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.36;
      let currentSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= activationLine) {
          currentSection = sectionId;
        }
      }

      const isNearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;
      const nextSection = isNearBottom
        ? sectionIds[sectionIds.length - 1]
        : currentSection;

      setActiveSection((currentActiveSection) =>
        currentActiveSection === nextSection
          ? currentActiveSection
          : nextSection,
      );
    };

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((current) => !current);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main
        className="portfolio-shell scan-grid min-h-screen overflow-hidden"
        data-theme={mode}
      >
        <Navigation
          activeSection={activeSection}
          mode={mode}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={closeMobileMenu}
          onToggleMobileMenu={toggleMobileMenu}
          onToggleMode={toggleMode}
        />
        <HeroSection
          ref={heroVisualRef}
          mode={mode}
          richSceneEnabled={richSceneEnabled}
          sceneInView={sceneInView}
        />
        <JourneySection />
        <ProjectsSection />
        <StackSection />
        <CertificationSection />
        <ImpactSection />
        <ContactSection />
        <PortfolioAssistant />
      </main>
    </ThemeProvider>
  );
}
