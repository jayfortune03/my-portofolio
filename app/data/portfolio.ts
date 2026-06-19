export type Experience = {
  role: string;
  company: string;
  period: string;
  signal: string;
  body: string;
};

export type Project = {
  name: string;
  type: string;
  description: string;
  stack: string[];
};

export type StackGroup = {
  label: string;
  icon: "frontend" | "backend" | "mobile" | "cloud";
  items: string[];
};

export type Achievement = {
  year: string;
  title: string;
  description: string;
  contribution: string;
};

export type JourneyNode = {
  id: string;
  year: string;
  title: string;
  stack: string;
  description: string;
  details: string[];
  tech: string[];
  color: string;
  position: [number, number, number];
  shape: "box" | "sphere" | "octa" | "mobile" | "modules";
};

export const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Certification", href: "#certification" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroStats = [
  ["4+", "years"],
  ["12+", "major builds"],
  ["Full", "stack scope"],
] as const;

export const experiences: Experience[] = [
  {
    role: "Frontend Developer",
    company: "PLN Icon Plus",
    period: "Oct 2025 - Present",
    signal: "Enterprise micro-frontends",
    body: "Modernizing internal CRM, metering, route management, and financial reporting systems with Vue 3, Vite, TypeScript, Tailwind, Ant Design Vue, REST APIs, JWT auth, and Module Federation.",
  },
  {
    role: "Lead Fullstack Engineer",
    company: "Amani Group Indonesia",
    period: "Sep 2024 - Sep 2025",
    signal: "Real estate operations platform",
    body: "Led REM, partner sales, supplier, and contractor platforms using Next.js, Express, NestJS, Golang, PostgreSQL, Material UI, GCP, Xendit, TanStack Query, and Server-Sent Events.",
  },
  {
    role: "Lead Fullstack Engineer",
    company: "HappyHomes",
    period: "Sep 2023 - Sep 2024",
    signal: "CRM and mobile QC systems",
    body: "Built property CRM flows, payment tracking, dashboards, and React Native quality-control tooling with Express, PostgreSQL, PocketBase, GCP, and real-time updates.",
  },
  {
    role: "Fullstack Engineer",
    company: "Marketa Technology Indonesia",
    period: "Jun 2022 - Sep 2023",
    signal: "Chat CRM across web and mobile",
    body: "Delivered Vue 2, Express, PostgreSQL, Socket, Firebase Cloud Messaging, WhatsApp API, CapacitorJS, and GCP architecture for property sales and customer-support workflows.",
  },
  {
    role: "Frontend Engineer",
    company: "Growth and Wealth Capital",
    period: "Sep 2021 - Jun 2022",
    signal: "First production CRM foundation",
    body: "Developed Vue 2 CRM interfaces with Vuex, Vuetify, Tailwind, and WhatsApp API integrations for sales team communication.",
  },
];

export const projects: Project[] = [
  {
    name: "Real Estate Management",
    type: "Developer operations system",
    description:
      "Land acquisition, permit tracking, construction progress, procurement, dashboards, and SSE status monitoring for property developers.",
    stack: ["Next.js", "Express.ts", "TypeScript", "PostgreSQL", "SSE", "GCP"],
  },
  {
    name: "Amani Supplier",
    type: "Material Management & Admin Platform | Mar 2024 - May 2024",
    description:
      "Internal admin platform for construction material inventory, product catalog maintenance, real-time contractor order tracking, and centralized logistics visibility for procurement and construction teams.",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Material UI",
      "SSE",
    ],
  },
  {
    name: "Amani Contractor",
    type: "Construction material commerce",
    description:
      "Contractor-facing purchasing flow connected to supplier inventory, real-time material tracking, clean backend architecture, and Xendit payment integration.",
    stack: ["Next.js", "Golang", "Gin", "PostgreSQL", "Material UI", "Xendit"],
  },
  {
    name: "HappyHomes CRM",
    type: "Property sales CRM",
    description:
      "Order management, customer tracking, transaction dashboards, and real-time payment tracking designed to avoid conflicting sales operations.",
    stack: ["React", "Express", "TanStack Query", "SSE", "PocketBase", "GCP"],
  },
  {
    name: "QC Mobile",
    type: "On-site inspection app",
    description:
      "React Native app for construction quality checks, photo verification, mobile camera workflows, and backend inspection data processing.",
    stack: ["React Native", "TypeScript", "Express", "PostgreSQL", "GCP"],
  },
  {
    name: "Marketa Chat",
    type: "CRM communication platform",
    description:
      "CRM web and mobile system with chat-based lead tracking, customer profiling, push notifications, and WhatsApp API communication.",
    stack: [
      "Vue 2",
      "Express",
      "Socket",
      "Firebase",
      "CapacitorJS",
      "PostgreSQL",
    ],
  },
  {
    name: "AP2T / ACMT / RTR",
    type: "Enterprise internal modules",
    description:
      "CRM, metering, route-base meter, and reporting modules integrated into host apps through micro-frontend architecture.",
    stack: [
      "Vue 3",
      "Vite",
      "Module Federation",
      "Tailwind",
      "REST API",
      "JWT",
    ],
  },
];

export const stackGroups: StackGroup[] = [
  {
    label: "Frontend",
    icon: "frontend",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "Tailwind",
      "Material UI",
      "Ant Design Vue",
      "Vite",
    ],
  },
  {
    label: "Backend",
    icon: "backend",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Golang",
      "Gin",
      "REST API",
      "Clean Architecture",
    ],
  },
  {
    label: "Mobile & Desktop",
    icon: "mobile",
    items: [
      "React Native",
      "CapacitorJS",
      "Electron",
      "Firebase Cloud Messaging",
    ],
  },
  {
    label: "Cloud & Data",
    icon: "cloud",
    items: [
      "PostgreSQL",
      "PocketBase",
      "CouchDB",
      "GCP",
      "Docker",
      "Xendit",
      "JWT",
      "OAuth",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    year: "2025",
    title: "Reliable Data Migration",
    description:
      "Migrated operational CRM data from PocketBase into PostgreSQL through an ETL pipeline while preserving record consistency and data integrity.",
    contribution:
      "Designed the data mapping and transformation flow, validated migrated records, and reconciled relationships between the source and destination databases.",
  },
  {
    year: "2025 - Present",
    title: "Scalable Micro-Frontend Architecture",
    description:
      "Introduced a modular frontend architecture for enterprise CRM, metering, route management, and reporting platforms at PLN Icon Plus.",
    contribution:
      "Implemented Vue 3 and Vite modules with Module Federation, integrated them into host applications, and standardized reusable UI and API integration patterns.",
  },
  {
    year: "2024 - 2025",
    title: "Real-Time Transaction Tracking",
    description:
      "Architected SSE-based payment and construction-material tracking to keep operational teams aligned and reduce conflicting transaction updates.",
    contribution:
      "Designed the real-time event flow, connected backend status changes to frontend dashboards, and delivered live visibility for payment and material-order operations.",
  },
  {
    year: "2023 - 2025",
    title: "Engineering Leadership & Mentorship",
    description:
      "Led full-stack engineering delivery across CRM, real-estate operations, supplier, contractor, and mobile quality-control products.",
    contribution:
      "Set technical direction, reviewed implementation quality, coordinated frontend and backend work, and mentored junior developers in clean code and maintainable architecture.",
  },
];

export const journeyNodes: JourneyNode[] = [
  {
    id: "marketa-chat",
    year: "2022",
    title: "Marketa Chat",
    stack: "Vue / Express",
    description:
      "CRM communication platform for property sales and customer support.",
    details: [
      "Built chat-based lead tracking and customer profiling workflows.",
      "Integrated Firebase Cloud Messaging and WhatsApp API communication.",
      "Converted the web app into cross-platform mobile delivery with CapacitorJS.",
    ],
    tech: [
      "Vue 2",
      "Express",
      "Socket",
      "Firebase",
      "CapacitorJS",
      "PostgreSQL",
    ],
    color: "#7dd3fc",
    position: [-3.25, -0.28, 0.35],
    shape: "box",
  },
  {
    id: "qc-mobile",
    year: "2023",
    title: "QC Mobile",
    stack: "React Native",
    description:
      "Mobile quality-control app for construction site inspection and photo verification.",
    details: [
      "Supported on-site building QC audits from project locations.",
      "Connected inspection findings to backend services and real estate operations.",
      "Implemented mobile camera and verification workflows with TypeScript.",
    ],
    tech: ["React Native", "TypeScript", "Express", "PostgreSQL", "GCP"],
    color: "#fb7185",
    position: [-1.95, 0.28, -0.35],
    shape: "mobile",
  },
  {
    id: "happyhomes-crm",
    year: "2024",
    title: "HappyHomes CRM",
    stack: "React / SSE",
    description:
      "Property CRM for bookings, customer tracking, dashboarding, and payment monitoring.",
    details: [
      "Built order management and customer tracking for property sales operations.",
      "Implemented real-time payment tracking with Server-Sent Events.",
      "Created dashboard views for transactions, sales progress, and customer activity.",
    ],
    tech: [
      "React",
      "Express",
      "TanStack Query",
      "SSE",
      "PostgreSQL",
      "PocketBase",
    ],
    color: "#f8d66d",
    position: [-0.65, -0.16, 0.45],
    shape: "octa",
  },
  {
    id: "real-estate-management",
    year: "2024",
    title: "REM Platform",
    stack: "Next / SSE",
    description:
      "Real estate management system for developer operations from land to procurement.",
    details: [
      "Covered land acquisition, permits, construction progress, and procurement workflows.",
      "Used typed frontend and backend architecture for maintainability.",
      "Enabled real-time authentication and status monitoring with SSE.",
    ],
    tech: ["Next.js", "Express.ts", "TypeScript", "PostgreSQL", "SSE", "GCP"],
    color: "#7ef7b9",
    position: [0.75, 0.34, -0.28],
    shape: "sphere",
  },
  {
    id: "amani-supplier",
    year: "2024",
    title: "Amani Supplier",
    stack: "Next / NestJS",
    description:
      "Material Management & Admin Platform for construction inventory and contractor operations.",
    details: [
      "Built the admin system for uploading and maintaining product catalogs available to contractors.",
      "Tracked contractor material orders in real time with a centralized logistics and supply-flow view.",
      "Improved inventory visibility and coordination between procurement and construction teams.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Material UI",
      "SSE",
    ],
    color: "#38bdf8",
    position: [2.0, -0.14, 0.32],
    shape: "modules",
  },
  {
    id: "micro-fe",
    year: "2025",
    title: "AP2T / ACMT / RTR",
    stack: "Vue 3 / Vite",
    description:
      "Enterprise internal modules integrated into host applications through micro-frontend architecture.",
    details: [
      "Integrated CRM, metering, route management, and reporting modules.",
      "Standardized reusable UI patterns for enterprise frontend teams.",
      "Optimized internal applications for high-traffic operational users.",
    ],
    tech: ["Vue 3", "Vite", "Module Federation", "Tailwind", "REST API", "JWT"],
    color: "#a78bfa",
    position: [3.25, 0.2, -0.22],
    shape: "modules",
  },
];

export const cvFiles = {
  pdf: "/cv/nicholas-fortune-cv.pdf",
  certificate: "/certificates/hacktiv8-full-stack-javascript-immersive.pdf",
};

export const profileLinks = {
  email: "mailto:nfortune03@gmail.com",
  github: "https://github.com/jayfortune03",
  linkedin: "https://www.linkedin.com/in/nicholas-fortune/",
  whatsapp: "https://wa.me/6287741029000",
};
