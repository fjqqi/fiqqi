import Image from "next/image";
import { LinkedInIcon, GitHubIcon } from "./Icons";

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 60px",
        position: "relative",
      }}
    >
      {/* Heading */}
      <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 className="section-title">
          Building Uncommon
          <br />
          Digital <span style={{ color: "var(--green)" }}>Experiences</span>
        </h1>
      </div>

      {/* Intro line */}
      <div
        className="animate-fade-in-up animate-delay-1"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          Hi, I&apos;m Fiqqi
        </span>
        <span className="spin-slow" style={{ color: "var(--green)", fontSize: "1.2rem" }}>
          ✳
        </span>
        <span className="pill-green">Front-end Developer</span>
        <span className="spin-slow" style={{ color: "var(--green)", fontSize: "1.2rem" }}>
          ✳
        </span>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
      </div>

      {/* Tech stack */}
      <div className="animate-fade-in-up animate-delay-2" style={{ marginBottom: 48 }}>
        <span className="pill-outline">
          Next.js &bull; Laravel &bull; Flutter &bull; TypeScript
        </span>
      </div>

      {/* Apple + scattered nav */}
      <div
        className="animate-fade-in-up animate-delay-3"
        style={{
          position: "relative",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Apple image */}
        <div className="apple-float" style={{ position: "relative", zIndex: 2 }}>
          <Image
            src="/apple.png"
            alt="Halftone green apple"
            width={700}
            height={700}
            priority
            style={{
              width: "min(660px, 85vw)",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.1))",
            }}
          />
        </div>

        {/* Scattered nav links */}
        <a
          href="#projects"
          className="pill-coral sticker"
          style={{
            position: "absolute",
            left: "-5%",
            top: "42%",
            zIndex: 3,
            textDecoration: "none",
            transform: "rotate(-4deg)",
          }}
        >
          View Projects
        </a>

        <a
          href="#contact"
          className="sticker"
          style={{
            position: "absolute",
            left: "38%",
            top: "50%",
            zIndex: 3,
            textDecoration: "none",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--foreground)",
            transform: "rotate(1deg)",
            letterSpacing: "-0.02em",
          }}
        >
          Hire Me
        </a>

        <a
          href="#about"
          className="pill-coral sticker"
          style={{
            position: "absolute",
            right: "-5%",
            top: "42%",
            zIndex: 3,
            textDecoration: "none",
            transform: "rotate(3deg)",
          }}
        >
          About Me
        </a>

        <a
          href="#about"
          className="nav-link sticker"
          style={{
            position: "absolute",
            left: "18%",
            bottom: "12%",
            zIndex: 3,
            textDecoration: "none",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--foreground)",
            transform: "rotate(-2deg)",
          }}
        >
          About me
        </a>

        <a
          href="#contact"
          className="nav-link sticker"
          style={{
            position: "absolute",
            right: "18%",
            bottom: "12%",
            zIndex: 3,
            textDecoration: "none",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--foreground)",
            transform: "rotate(2deg)",
          }}
        >
          Contact
        </a>
      </div>
    </section>
  );
}
