export type StackKnowledge = {
  name: string;
  category: "Frontend" | "Backend" | "Mobile" | "Cloud & Data" | "Architecture";
  aliases: string[];
  explanation: string;
  usedFor: string[];
  usedInProjects: string[];
};

export type ProjectTraining = {
  name: string;
  aliases: string[];
  summary: string;
  domain: string;
  responsibilities: string[];
  stackRole: string[];
  highlights: string[];
};

export type WebsiteStructure = {
  aliases: string[];
  summary: string;
  sections: Array<{
    name: string;
    purpose: string;
  }>;
  stack: string[];
  architecture: string[];
  optimizations: string[];
};

export const websiteStructure: WebsiteStructure = {
  aliases: [
    "website",
    "portfolio website",
    "portfolio ini",
    "website ini",
    "struktur website",
    "struktur portfolio",
    "tech stack website",
    "dibuat pakai apa",
    "web ini pakai apa",
  ],
  summary:
    "This portfolio is a single-page Next.js application with themed sections, a responsive layout, an interactive project scene, and an OpenAI-backed portfolio Q&A assistant with local fallback.",
  sections: [
    {
      name: "Home",
      purpose:
        "Introduces Nicholas as a Full Stack Engineer and shows the primary project/journey calls to action.",
    },
    {
      name: "Journey",
      purpose:
        "Shows work history and progression through production systems.",
    },
    {
      name: "Projects",
      purpose:
        "Highlights selected builds across CRM, real estate operations, mobile QC, chat, and enterprise modules.",
    },
    {
      name: "Stack",
      purpose:
        "Groups Nicholas's frontend, backend, mobile, cloud, and data technologies.",
    },
    {
      name: "Certification",
      purpose:
        "Shows the Hacktiv8 Full Stack JavaScript Immersive foundation and certificate links.",
    },
    {
      name: "Contact",
      purpose:
        "Provides CV download and direct contact channels including email, WhatsApp, GitHub, and LinkedIn.",
    },
  ],
  stack: [
    "Next.js App Router",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Material UI",
    "MUI Icons",
    "Framer Motion",
    "Three.js with React Three Fiber and Drei",
    "OpenAI Responses API via a server route",
  ],
  architecture: [
    "Portfolio content lives in shared data modules so page sections and the assistant can reuse the same source of truth.",
    "The OpenAI API key stays server-side in /api/assistant and is never exposed to the browser.",
    "The assistant falls back to local trained answers if OpenAI is unavailable or not configured.",
    "The 3D scene is dynamically imported and falls back to a lighter visual for small or low-resource devices.",
  ],
  optimizations: [
    "Client bundle stays smaller because assistant training data is handled by the server route.",
    "Theme state is stored in localStorage and synced with CSS variables.",
    "Active navigation is handled client-side to show the current section while scrolling.",
    "OpenAI output is capped and instructed to stay concise for cost control.",
  ],
};

export const stackKnowledge: StackKnowledge[] = [
  {
    name: "React",
    category: "Frontend",
    aliases: ["react", "reactjs", "react.js"],
    explanation:
      "React is one of Nicholas's main UI tools for building CRM dashboards, operational views, and interactive web flows.",
    usedFor: [
      "Dashboard and CRM interface development",
      "Component-based frontend architecture",
      "Stateful operational workflows",
    ],
    usedInProjects: ["HappyHomes CRM"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    aliases: ["next", "nextjs", "next.js"],
    explanation:
      "Next.js is used by Nicholas for typed, production-ready web applications with clear frontend structure and strong routing patterns.",
    usedFor: [
      "Real estate operation platforms",
      "Internal admin tools",
      "Material commerce and procurement flows",
    ],
    usedInProjects: ["Real Estate Management", "Amani Supplier", "Amani Contractor"],
  },
  {
    name: "Vue.js",
    category: "Frontend",
    aliases: ["vue", "vuejs", "vue.js", "vue 2", "vue 3"],
    explanation:
      "Vue is important in Nicholas's experience because it appears in both early CRM work and current enterprise micro-frontend systems.",
    usedFor: [
      "CRM interfaces",
      "Enterprise internal modules",
      "Micro-frontend delivery with Vue 3 and Vite",
    ],
    usedInProjects: ["Marketa Chat", "AP2T / ACMT / RTR"],
  },
  {
    name: "TypeScript",
    category: "Architecture",
    aliases: ["typescript", "ts", "typed javascript"],
    explanation:
      "TypeScript is a core part of Nicholas's stack for keeping frontend and backend contracts safer in larger applications.",
    usedFor: [
      "Typed frontend development",
      "Backend API implementation",
      "Reducing runtime mistakes in multi-module apps",
    ],
    usedInProjects: [
      "Real Estate Management",
      "Amani Supplier",
      "QC Mobile",
      "AP2T / ACMT / RTR",
    ],
  },
  {
    name: "Node.js / Express",
    category: "Backend",
    aliases: ["node", "node.js", "express", "express.js", "express.ts"],
    explanation:
      "Node.js and Express are used by Nicholas to build backend APIs for CRM, real estate operations, mobile apps, and chat systems.",
    usedFor: [
      "REST API development",
      "CRM backend services",
      "Real-time status and payment flows",
    ],
    usedInProjects: [
      "Real Estate Management",
      "HappyHomes CRM",
      "QC Mobile",
      "Marketa Chat",
    ],
  },
  {
    name: "NestJS",
    category: "Backend",
    aliases: ["nestjs", "nest", "nest.js"],
    explanation:
      "NestJS is used for more structured backend services where modular architecture and maintainability matter.",
    usedFor: [
      "Material management backend services",
      "Admin platform APIs",
      "Structured service modules",
    ],
    usedInProjects: ["Amani Supplier"],
  },
  {
    name: "Golang / Gin",
    category: "Backend",
    aliases: ["golang", "go", "gin", "go gin"],
    explanation:
      "Golang with Gin appears in Nicholas's stack for backend services that need clean structure and efficient API handling.",
    usedFor: [
      "Contractor-facing backend APIs",
      "Commerce and payment-related flows",
      "Clean backend architecture",
    ],
    usedInProjects: ["Amani Contractor"],
  },
  {
    name: "PostgreSQL",
    category: "Cloud & Data",
    aliases: ["postgresql", "postgres", "sql", "database"],
    explanation:
      "PostgreSQL is Nicholas's main relational database choice for operational data, CRM records, transactions, inventory, and reporting.",
    usedFor: [
      "Operational data modeling",
      "Transaction and CRM records",
      "Inventory, procurement, and reporting data",
    ],
    usedInProjects: [
      "Real Estate Management",
      "Amani Supplier",
      "Amani Contractor",
      "QC Mobile",
      "Marketa Chat",
    ],
  },
  {
    name: "Server-Sent Events",
    category: "Architecture",
    aliases: ["sse", "server-sent events", "server sent events", "real time", "realtime", "real-time"],
    explanation:
      "SSE is one of Nicholas's practical real-time tools for one-way status updates such as payments, material orders, and operational monitoring.",
    usedFor: [
      "Payment tracking",
      "Material order tracking",
      "Operational status monitoring",
    ],
    usedInProjects: [
      "Real Estate Management",
      "Amani Supplier",
      "HappyHomes CRM",
    ],
  },
  {
    name: "React Native",
    category: "Mobile",
    aliases: ["react native", "mobile app", "mobile"],
    explanation:
      "React Native is used by Nicholas for mobile workflows that need camera usage, site inspection, and typed app logic.",
    usedFor: [
      "Construction quality-control apps",
      "Photo verification",
      "On-site inspection workflows",
    ],
    usedInProjects: ["QC Mobile"],
  },
  {
    name: "Module Federation",
    category: "Architecture",
    aliases: ["module federation", "micro frontend", "micro-frontend", "microfrontends"],
    explanation:
      "Module Federation is used in Nicholas's enterprise frontend work to integrate independent modules into host applications.",
    usedFor: [
      "Enterprise internal modules",
      "Independent frontend deployment",
      "Shared operational UI patterns",
    ],
    usedInProjects: ["AP2T / ACMT / RTR"],
  },
  {
    name: "GCP",
    category: "Cloud & Data",
    aliases: ["gcp", "google cloud", "google cloud platform", "cloud"],
    explanation:
      "GCP appears across Nicholas's production work as the cloud environment for deploying and supporting backend/platform systems.",
    usedFor: [
      "Production deployment support",
      "Backend and data infrastructure",
      "Operational application hosting",
    ],
    usedInProjects: [
      "Real Estate Management",
      "HappyHomes CRM",
      "QC Mobile",
    ],
  },
];

export const projectTraining: ProjectTraining[] = [
  {
    name: "Real Estate Management",
    aliases: ["rem", "real estate management", "real estate", "developer operations"],
    summary:
      "A developer operations system that supports land acquisition, permits, construction progress, procurement, dashboards, and real-time status monitoring.",
    domain: "Real estate developer operations",
    responsibilities: [
      "Built typed frontend and backend flows for operational teams.",
      "Connected land, permit, construction, procurement, and dashboard workflows.",
      "Used SSE for status monitoring and operational updates.",
    ],
    stackRole: [
      "Next.js and TypeScript for the web application.",
      "Express.ts for API services.",
      "PostgreSQL for operational data.",
      "SSE for real-time updates.",
      "GCP for cloud-side delivery.",
    ],
    highlights: [
      "Designed around real daily operator workflows.",
      "Focused on reliable data flow and maintainable architecture.",
    ],
  },
  {
    name: "Amani Supplier",
    aliases: ["amani supplier", "supplier", "material management", "inventory"],
    summary:
      "An internal material management and admin platform for inventory, product catalog maintenance, contractor order tracking, and logistics visibility.",
    domain: "Construction procurement and supplier operations",
    responsibilities: [
      "Built admin flows for product catalog and construction material inventory.",
      "Tracked contractor material orders in real time.",
      "Improved logistics visibility for procurement and construction teams.",
    ],
    stackRole: [
      "Next.js and TypeScript for the admin interface.",
      "NestJS for structured backend services.",
      "PostgreSQL for product, inventory, and order data.",
      "Material UI for admin-heavy interface work.",
      "SSE for contractor order tracking.",
    ],
    highlights: [
      "Centralized material visibility across teams.",
      "Reduced coordination friction between procurement and construction operations.",
    ],
  },
  {
    name: "Amani Contractor",
    aliases: ["amani contractor", "contractor", "construction commerce", "xendit"],
    summary:
      "A contractor-facing material commerce flow connected to supplier inventory, real-time material tracking, backend services, and payment integration.",
    domain: "Construction material commerce",
    responsibilities: [
      "Built contractor purchasing flows.",
      "Connected contractor orders to supplier inventory.",
      "Integrated payment handling through Xendit.",
    ],
    stackRole: [
      "Next.js for the contractor-facing interface.",
      "Golang and Gin for backend APIs.",
      "PostgreSQL for orders, product, and transaction data.",
      "Material UI for consistent application UI.",
      "Xendit for payment integration.",
    ],
    highlights: [
      "Commerce flow tied directly into construction material operations.",
      "Backend architecture focused on clean service boundaries.",
    ],
  },
  {
    name: "HappyHomes CRM",
    aliases: ["happyhomes", "happyhomes crm", "payment tracking", "property sales crm"],
    summary:
      "A property sales CRM for order management, customer tracking, transaction dashboards, and real-time payment tracking.",
    domain: "Property sales operations",
    responsibilities: [
      "Built CRM flows for property sales operations.",
      "Implemented order, customer, transaction, and dashboard views.",
      "Added real-time payment tracking to reduce conflicting sales operations.",
    ],
    stackRole: [
      "React for CRM interface work.",
      "Express for backend APIs.",
      "TanStack Query for frontend data synchronization.",
      "SSE for payment tracking.",
      "PocketBase and PostgreSQL for data workflows.",
      "GCP for production support.",
    ],
    highlights: [
      "Real-time payment tracking was central to avoiding operational conflicts.",
      "Dashboard work focused on clear sales and transaction visibility.",
    ],
  },
  {
    name: "QC Mobile",
    aliases: ["qc", "qc mobile", "inspection", "quality control", "mobile qc"],
    summary:
      "A React Native inspection app for construction quality checks, photo verification, camera workflows, and backend inspection processing.",
    domain: "Construction site quality control",
    responsibilities: [
      "Built mobile inspection workflows for on-site quality checks.",
      "Handled photo verification and camera-based flows.",
      "Connected mobile inspection data to backend services.",
    ],
    stackRole: [
      "React Native and TypeScript for the mobile app.",
      "Express for backend services.",
      "PostgreSQL for inspection data.",
      "GCP for backend/cloud support.",
    ],
    highlights: [
      "Designed for field usage, not just back-office users.",
      "Focused on practical capture and verification workflows.",
    ],
  },
  {
    name: "Marketa Chat",
    aliases: ["marketa", "marketa chat", "chat crm", "whatsapp crm"],
    summary:
      "A CRM communication platform for chat-based lead tracking, customer profiling, push notifications, and WhatsApp API communication.",
    domain: "Property sales and customer-support communication",
    responsibilities: [
      "Built chat-based lead tracking and customer profiling workflows.",
      "Integrated WhatsApp API communication.",
      "Added Firebase Cloud Messaging for push notifications.",
      "Converted the web app into cross-platform mobile delivery with CapacitorJS.",
    ],
    stackRole: [
      "Vue 2 for the CRM web interface.",
      "Express and PostgreSQL for backend/data workflows.",
      "Socket for chat-style real-time communication.",
      "Firebase Cloud Messaging for notifications.",
      "CapacitorJS for mobile delivery.",
    ],
    highlights: [
      "Connected CRM workflow directly with chat and WhatsApp communication.",
      "Covered both web and mobile delivery paths.",
    ],
  },
  {
    name: "AP2T / ACMT / RTR",
    aliases: ["ap2t", "acmt", "rtr", "enterprise modules", "pln", "micro frontend"],
    summary:
      "Enterprise internal modules for CRM, metering, route-base meter, and reporting, integrated into host applications through micro-frontend architecture.",
    domain: "Enterprise internal operations",
    responsibilities: [
      "Modernized internal CRM, metering, route management, and reporting modules.",
      "Integrated modules into host apps through micro-frontend architecture.",
      "Worked with reusable UI patterns for enterprise frontend teams.",
    ],
    stackRole: [
      "Vue 3 and Vite for modern frontend delivery.",
      "TypeScript for safer module development.",
      "Tailwind and Ant Design Vue for UI implementation.",
      "Module Federation for micro-frontend integration.",
      "REST API and JWT for backend integration and auth.",
    ],
    highlights: [
      "Enterprise-facing work with operational users.",
      "Micro-frontend architecture is a key differentiator in this project.",
    ],
  },
];

export const assistantTrainingRules = [
  "For tech stack questions, explain the technology, how Nicholas used it, and which project examples prove the experience.",
  "For project questions, prioritize the projects shown on the website and explain domain, responsibility, stack role, and practical impact.",
  "If a visitor asks for a comparison, compare using project evidence instead of generic opinions.",
  "If the answer is not supported by portfolio data, say the portfolio does not include that detail and suggest contacting Nicholas.",
  "Keep tone concise, practical, and recruiter-friendly.",
];
