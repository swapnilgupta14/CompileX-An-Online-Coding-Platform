/**
 * Marketing site config — nav, footer, brand. Single source of truth so
 * pages stay declarative.
 */
export const siteConfig = {
  name: "CompileX",
  tagline: "Where code battles are won.",
  description:
    "CompileX is a competitive coding platform for practice, arena problems, and live battlegrounds with real-time leaderboards.",
  url: "https://compilex.dev",
  nav: [
    { label: "Product", href: "#product" },
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Coders", href: "#coders" },
    { label: "FAQ", href: "#faq" },
  ],
  footer: {
    Product: [
      { label: "Playground", href: "/login" },
      { label: "Arena", href: "/login" },
      { label: "Battleground", href: "/login" },
      { label: "Leaderboards", href: "#" },
    ],
    Company: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Coders", href: "#coders" },
      { label: "Contact", href: "#" },
    ],
    Resources: [
      { label: "Docs", href: "#" },
      { label: "Guides", href: "#" },
      { label: "API", href: "#" },
      { label: "Status", href: "#" },
    ],
    Legal: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
