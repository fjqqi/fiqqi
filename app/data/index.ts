// ─────────────────────────────────────────────
//  PORTFOLIO DATA — edit this file to update
//  content across the entire site automatically
// ─────────────────────────────────────────────

// ── Personal Info ──────────────────────────────
export const personal = {
  name: "Fiqqi",
  title: "Web Developer",
  email: "faqihzaky43@gmail.com",
  location: "Makassar, Indonesia",
  tagline: "Building uncommon digital experiences.",
  headline: ["Building Aesthetic", "Digital Experiences"],
  bio: [
    "I'm a Web Developer with a passion for clean code and stunning user interfaces. I specialize in building modern web applications with Next.js, React, and Laravel, bringing designs to life with pixel-perfect precision.",
    "Beyond the browser, I explore mobile development with Flutter and backend systems with Laravel. Every project is an opportunity to push boundaries and create something truly uncommon.",
  ],
};

// ── Tech Stack pill (Hero) ──────────────────────
export const techStack = ["Next.js", "Laravel", "Flutter", "TypeScript"];

// ── Social Links ───────────────────────────────
export const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  // { label: "Upwork", href: "https://upwork.com", icon: "upwork" },
];

// ── Nav Links (StickyNav + Hero pills) ─────────
export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// ── Hero nav pills (overlay on apple) ──────────
export const heroPills = [
  { label: "View Projects", href: "#projects", rotate: "hover:-rotate-3", primary: false },
  { label: "Get in Touch", href: "#contact", rotate: "hover:rotate-2", primary: true },
  { label: "About Me", href: "#about", rotate: "hover:rotate-3", primary: false },
];

// ── Connect Platforms (Get in Touch Modal) ───────
export const contactPlatforms = [
  {
    name: "Email",
    handle: personal.email,
    href: `mailto:${personal.email}`,
    icon: "email",
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/fiqqi",
    href: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    handle: "github.com/fiqqi",
    href: "https://github.com",
    icon: "github",
  },
  {
    name: "Instagram",
    handle: "@fiqqi",
    href: "https://instagram.com",
    icon: "instagram",
  },
  {
    name: "Behance",
    handle: "behance.net/fiqqi",
    href: "https://behance.net",
    icon: "behance",
  },
  {
    name: "Links",
    handle: "fiqqi.dev/links",
    href: "#contact",
    icon: "links",
  },
];

// ── Greetings (AboutSection cycling text) ──────
export const greetings = [
  { text: "Hello!", lang: "English" },
  { text: "こんにちは!", lang: "Japanese" },
  { text: "Bonjour!", lang: "French" },
  { text: "안녕하세요!", lang: "Korean" },
  { text: "¡Hola!", lang: "Spanish" },
  { text: "Ciao!", lang: "Italian" },
  { text: "Olá!", lang: "Portuguese" },
  { text: "Hallo!", lang: "German" },
  { text: "Halo!", lang: "Indonesian" },
  { text: "你好!", lang: "Chinese" },
];

// ── Stats (AboutSection) ───────────────────────
export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "10+", label: "Happy Clients" },
];

// ── Skills (AboutSection progress bars) ────────
export const skills = [
  { name: "Next.js / React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "CSS / Tailwind", level: 90 },
  { name: "Laravel / PHP", level: 78 },
  { name: "Flutter / Dart", level: 72 },
  { name: "UI / UX Design", level: 80 },
];

// ── Projects (ProjectsSection Showcase) ─────────
export const projects = [
  {
    num: "01",
    title: "RT Administration System",
    image: "/projects/rt-admin.jpg",
    category: "Full Stack Development",
    desc: "A Modern Residential Administration and Financial Management Platform for Neighborhood Communities.",
    tags: ["Next.js", "Laravel API", "SSO", "TanStack Query", "Full Stack Development"],
    color: "#1db954",
    href: "https://github.com",
    demoUrl: "https://rt-administration-system.vercel.app",
  },
  {
    num: "02",
    title: "Pulse Analytics Dashboard",
    image: "/projects/pulse-analytics.jpg",
    category: "SaaS Telemetry",
    desc: "Interactive financial telemetry dashboard with live WebSocket feeds and high-density real-time data visualization.",
    tags: ["React", "D3.js", "Laravel", "PostgreSQL", "TailwindCSS"],
    color: "#ef5350",
    href: "https://github.com",
    demoUrl: "https://github.com",
  },
  {
    num: "03",
    title: "Aura Luxury Commerce",
    image: "/projects/aura-ecommerce.jpg",
    category: "E-Commerce Experience",
    desc: "Next-generation luxury commerce experience with headless checkout, sub-second transitions, and real-time inventory management.",
    tags: ["Next.js", "TypeScript", "Stripe", "TailwindCSS", "Headless CMS"],
    color: "#1db954",
    href: "https://github.com",
    demoUrl: "https://github.com",
  },
  {
    num: "04",
    title: "Apex Mobile Banking",
    image: "/projects/rt-admin.jpg",
    category: "Fintech App",
    desc: "Cross-platform mobile banking application featuring biometric facial auth, contactless NFC, and instant budget insights.",
    tags: ["Flutter", "Dart", "Firebase", "State Management", "Mobile App"],
    color: "#6366f1",
    href: "https://github.com",
    demoUrl: "https://github.com",
  },
];

// ── Marquee text (MarqueeSection) ──────────────
export const marqueeText =
  "front-end developer ✦ just call me if you need a";

// ── Client Logos (ClientMarquee) ───────────────
export const clientLogos = [
  {
    name: "USAID",
    logo: "/client/LOGO-KLIEN-USAID.png",
  },
  {
    name: "iNews Makassar",
    logo: "/client/LOGO-KLIEN-INEWS.png",
  },
  {
    name: "KIPAN BNN Kemenpora",
    logo: "/client/LOGO-KLIEN-KIPAN-BNN-KEMENPORA.png",
  },
  {
    name: "Tamansari Skylounge WIKA",
    logo: "/client/LOGO-KLIEN-TAMANSARI-WIKA.png",
  },
  {
    name: "IDN Lab",
    logo: "/client/LOGO-KLIEN-IDNLAB.png",
    isWhiteArtwork: true,
  },
  {
    name: "MW",
    logo: "/client/LOGO-KLIEN-MW.png",
  },
];

// ── Work availability (WorkCard) ───────────────
export const workAvailability = {
  status: "Available for Work",
  openTo: ["Freelance", "Part-time", "Full-time"],
  location: personal.location,
};
