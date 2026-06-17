export const PORTFOLIO = {
  name: "Vanessa Martin",
  role: "Frontend Engineer & Architect",
  tagline: "Systems from first principles.",
  bioShort: "Eight years building production frontend — from PlayStation traffic records to mid-flight aviation rescues to open-source design systems. I design systems the way nature does: from proportion outward.",
  email: "vanessa.s.martin96@gmail.com",
  github: "vsm1996",
  substack: "https://rengenoikigai.substack.com",
  location: "Oakland ↔ Remote",
  status: "Available · Q3 2026",

  about: [
    {
      kicker: "縁",
      text: "I build the layer where math becomes feeling. Capacity-adaptive frameworks, φ-proportional design systems, recovery work on platforms shipping under fire.",
    },
    {
      kicker: "理",
      text: "Most adaptive interfaces guess. Mine ask. The user declares cognitive load, available time, emotional state — the framework derives everything else. Inputs over inference.",
    },
    {
      kicker: "形",
      text: "Every dimension derived, nothing chosen. Typography from the golden ratio. Spacing from Fibonacci. Color in OKLCH. When the math is right, the aesthetics follow.",
    },
  ],

  stats: [
    { num: "8yr", label: "Production frontend" },
    { num: "21", label: "Renge components" },
    { num: "100+", label: "Tokens, runtime-switched" },
  ],

  work: [
    {
      idx: "01",
      kanji: "和",
      title: "Harmonia UI",
      sub: "Capacity-adaptive framework. Cognitive × temporal × emotional input → 4-layer derivation → density / motion / focus / tone tokens. No inference, no profiling.",
      meta: ["npm published", "Production", "Open source"],
      link: "https://harmonia-ui.dev/",
      shape: "tomoe" as const,
    },
    {
      idx: "02",
      kanji: "蓮",
      title: "Renge Design System",
      sub: "Proportion as first principle. φ type scale, Fibonacci spacing, OKLCH color, 6 named profiles, runtime injection. 21 React components, 100+ CSS variables.",
      meta: ["@renge-ui/tokens", "@renge-ui/react", "Tailwind v4 plugin"],
      link: "https://renge-ui.vercel.app/",
      shape: "lotus" as const,
    },
    {
      idx: "03",
      kanji: "森",
      title: "Grove Intel",
      sub: "Monorepo of four packages. Capacity inputs piped through a derivation graph into adaptive layouts. The infrastructure beneath Harmonia.",
      meta: ["Monorepo", "4 packages", "Live demo"],
      link: "https://grove-intel.vercel.app/",
      shape: "tree" as const,
    },
    {
      idx: "04",
      kanji: "本",
      title: "The Hondana",
      sub: "Reading tracker built on Renge tokens. Profile switching in production — every spacing, type and color value derived from the system. Proof the math composes.",
      meta: ["Built on Renge", "Production proof"],
      link: "https://the-hondana.vercel.app/",
      shape: "book" as const,
    },
  ],

  experience: [
    {
      year: "2025",
      role: "Senior Front-end Engineer",
      org: "Hello Goodwin",
      tag: "Aviation rescue",
      bullets: [
        "Inherited a non-functional multi-tenant aviation platform mid-development. Shipped production-ready in 3 months against undocumented, schema-inconsistent APIs.",
        "Diagnosed and resolved critical React Query data persistence failure causing client profile mutations not to sync. Corrected company-level branding isolation breaking cross-tenant context boundaries.",
        "Built entire frontend-to-backend integration from scratch. Reverse-engineered data contracts in the absence of reliable backend communication.",
        "Operated through significant org instability: team lead departure, principal backend engineer terminated. Delivery uninterrupted.",
        "Produced handoff documentation for Persona KYC/KYB integration, giving the incoming engineer a clear pathway for the B2B/B2C fintech authorization layer.",
      ],
      stack: ["React", "TypeScript", "Next.js", "React Query", "Mantine", "Vercel"],
    },
    {
      year: "2022",
      role: "Frontend Engineer",
      org: "PlayStation",
      tag: "Traffic records",
      bullets: [
        "Shipped consumer surfaces touched by tens of millions monthly. Set internal traffic records on launch campaigns through performance and pre-render discipline.",
        "Owned the component library extension for marketing surfaces. Brought tokenized theming, responsive density rules, and motion guardrails to a system that lacked them.",
        "Mentored two contractors and ran code review for cross-team contributions to the marketing monorepo.",
      ],
      stack: ["React", "Next.js", "TypeScript", "Styled Components", "GraphQL"],
    },
    {
      year: "2020",
      role: "Software Engineer",
      org: "Aleph Inc",
      tag: "First principles",
      bullets: [
        "Built the data visualization layer for a financial planning product from zero. Tokenized chart system, custom canvas renderers, accessibility-first interaction.",
        "Co-architected the design-token pipeline that became the seed for Renge — Fibonacci spacing, φ type, runtime profile switching.",
        "Hired into a four-person eng team. Helped grow it to twelve, set the frontend interview rubric still in use.",
      ],
      stack: ["React", "D3", "TypeScript", "Node", "PostgreSQL"],
    },
  ],

  skills: [
    {
      group: "Stack",
      items: ["React", "TypeScript", "Next.js", "Node", "GraphQL", "React Query", "Tailwind", "Vite"],
    },
    {
      group: "Systems",
      items: ["Design tokens", "OKLCH color", "Adaptive layout", "Capacity modeling", "Monorepos", "Accessibility", "Performance"],
    },
    {
      group: "Tooling",
      items: ["Figma", "Storybook", "Vercel", "Turborepo", "Playwright", "Vitest", "Linear"],
    },
    {
      group: "Soft",
      items: ["Mid-flight rescues", "Reverse engineering APIs", "Mentorship", "Documentation", "Stakeholder translation"],
    },
  ],

  principles: [
    {
      num: "01",
      kanji: "問",
      title: "Inputs over inference",
      body: "Behavior should not be guessed from past patterns. If the system needs information, ask for it. Explicit state is safer, more respectful, and more accurate than prediction.",
    },
    {
      num: "02",
      kanji: "今",
      title: "Capacity, not preference",
      body: "A user who chose dense layouts last Tuesday may not have the bandwidth for them today. Adapt to what the user can handle now — not what they usually prefer.",
    },
    {
      num: "03",
      kanji: "比",
      title: "Proportion as first principle",
      body: "Every dimension in the system should be derived, not chosen. When the math is right, the aesthetics follow. Arbitrary numbers are technical debt.",
    },
    {
      num: "04",
      kanji: "応",
      title: "Form without behavior is decoration",
      body: "A component that only renders is not an interface. Interfaces respond. Every visual element should have a defined behavioral contract.",
    },
  ],
} as const;
