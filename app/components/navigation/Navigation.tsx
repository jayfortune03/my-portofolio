"use client";

import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Tooltip } from "@mui/material";
import { memo } from "react";
import { navLinks } from "../../data/portfolio";

type NavigationProps = {
  activeSection: string;
  mode: "dark" | "light";
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onToggleMobileMenu: () => void;
  onToggleMode: () => void;
};

function NavigationComponent({
  activeSection,
  mode,
  mobileMenuOpen,
  onCloseMobileMenu,
  onToggleMobileMenu,
  onToggleMode,
}: NavigationProps) {
  const isNavLinkActive = (href: string) => activeSection === href.slice(1);

  return (
    <nav className="site-nav fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className={`site-brand font-mono text-sm font-bold tracking-normal text-[#7ef7b9] ${activeSection === "home" ? "site-brand-active" : ""}`}
          onClick={onCloseMobileMenu}
          aria-current={activeSection === "home" ? "page" : undefined}
        >
          NF.dev
        </a>
        <div className="hidden items-center gap-6 text-sm text-white/72 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`site-nav-link ${isNavLinkActive(link.href) ? "site-nav-link-active" : ""}`}
              aria-current={isNavLinkActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Tooltip
            title={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <IconButton
              aria-label={
                mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              color="primary"
              onClick={onToggleMode}
              size="small"
            >
              {mode === "dark" ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <IconButton
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="md:!hidden"
            color="primary"
            onClick={onToggleMobileMenu}
            size="small"
          >
            {mobileMenuOpen ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </IconButton>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-nav-panel md:hidden ${mobileMenuOpen ? "mobile-nav-panel-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mx-auto grid max-w-[1680px] gap-2 px-4 pb-4 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`site-nav-link mobile-nav-link rounded-md px-3 py-3 text-sm font-bold text-white/78 ${isNavLinkActive(link.href) ? "site-nav-link-active" : ""}`}
              onClick={onCloseMobileMenu}
              aria-current={isNavLinkActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export const Navigation = memo(NavigationComponent);
