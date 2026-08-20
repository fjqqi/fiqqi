// ─────────────────────────────────────────────
//  PORTFOLIO DATA — edit this file to update
//  content across the entire site automatically
// ─────────────────────────────────────────────

// ── Personal Info ──────────────────────────────
export const personal = {
  name: "Fiqqi",
  title: "Front-end Developer",
  email: "hello@fiqqi.dev",
  location: "Makassar, Indonesia",
  tagline: "Building uncommon digital experiences.",
  headline: ["Building Aesthetic", "Digital Experiences"],
  bio: [
    "I'm a front-end developer with a passion for clean code and stunning user interfaces. I specialize in building modern web applications with Next.js, React, and Laravel, bringing designs to life with pixel-perfect precision.",
    "Beyond the browser, I explore mobile development with Flutter and backend systems with Laravel. Every project is an opportunity to push boundaries and create something truly uncommon.",
  ],
};

// ── Tech Stack pill (Hero) ──────────────────────
export const techStack = ["Next.js", "Laravel", "Flutter", "TypeScript"];

// ── Social Links ───────────────────────────────
export const socials = [
  { label: "LinkedIn",  href: "https://linkedin.com",  icon: "linkedin"  },
  { label: "GitHub",    href: "https://github.com",    icon: "github"    },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  // { label: "Upwork", href: "https://upwork.com", icon: "upwork" },
];

// ── Nav Links (StickyNav + Hero pills) ─────────
export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About",    href: "#about"    },
  { label: "Contact",  href: "#contact"  },
];

// ── Hero nav pills (overlay on apple) ──────────
export const heroPills = [
  { label: "View Projects", href: "#projects", rotate: "hover:-rotate-3" },
  { label: "Hire Me!",      href: "#contact",  rotate: "hover:rotate-2"  },
  { label: "About Me",      href: "#about",    rotate: "hover:rotate-3"  },
];

// ── Greetings (AboutSection cycling text) ──────
export const greetings = [
  { text: "Hello!",       lang: "English"    },
  { text: "こんにちは!",  lang: "Japanese"   },
  { text: "Bonjour!",     lang: "French"     },
  { text: "안녕하세요!",  lang: "Korean"     },
  { text: "¡Hola!",       lang: "Spanish"    },
  { text: "Ciao!",        lang: "Italian"    },
  { text: "Olá!",         lang: "Portuguese" },
  { text: "Hallo!",       lang: "German"     },
  { text: "Halo!",        lang: "Indonesian" },
  { text: "你好!",        lang: "Chinese"    },
];

// ── Stats (AboutSection) ───────────────────────
export const stats = [
  { value: "2+",  label: "Years Experience" },
  { value: "20+", label: "Projects Built"   },
  { value: "10+", label: "Happy Clients"    },
];

// ── Skills (AboutSection progress bars) ────────
export const skills = [
  { name: "Next.js / React",  level: 92 },
  { name: "TypeScript",        level: 88 },
  { name: "CSS / Tailwind",    level: 90 },
  { name: "Laravel / PHP",     level: 78 },
  { name: "Flutter / Dart",    level: 72 },
  { name: "UI / UX Design",    level: 80 },
];

// ── Projects (ProjectsSection) ─────────────────
export const projects = [
  {
    num: "01",
    title: "E-Commerce Platform",
    desc: "Full-stack online store with Next.js, Stripe integration, and real-time inventory management.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    color: "#1db954",
    href: "https://github.com",
  },
  {
    num: "02",
    title: "Dashboard Analytics",
    desc: "Interactive analytics dashboard with live data visualization and customizable widgets.",
    tags: ["React", "D3.js", "Laravel"],
    color: "#f87171",
    href: "https://github.com",
  },
  {
    num: "03",
    title: "Mobile Banking App",
    desc: "Cross-platform banking application with biometric authentication and transaction tracking.",
    tags: ["Flutter", "Dart", "Firebase"],
    color: "#6366f1",
    href: "https://github.com",
  },
];

// ── Marquee text (MarqueeSection) ──────────────
export const marqueeText =
  "front-end developer ✦ just call me if you need a";

// ── Work availability (WorkCard) ───────────────
export const workAvailability = {
  status: "Available for Work",
  openTo: ["Freelance", "Part-time", "Full-time"],
  location: personal.location,
};
