"use client";

import DataObjectIcon from "@mui/icons-material/DataObject";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import StorageIcon from "@mui/icons-material/Storage";
import { Chip } from "@mui/material";
import { memo, type ReactNode } from "react";
import { stackGroups, type StackGroup } from "../../data/portfolio";
import { SectionHeading } from "../shared/SectionHeading";

const stackIcons: Record<StackGroup["icon"], ReactNode> = {
  frontend: <DataObjectIcon />,
  backend: <StorageIcon />,
  mobile: <PhoneIphoneIcon />,
  cloud: <IntegrationInstructionsIcon />,
};

function StackSectionComponent() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-[1680px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
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
              <h3 className="text-xl font-black text-white">{group.label}</h3>
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
  );
}

export const StackSection = memo(StackSectionComponent);
