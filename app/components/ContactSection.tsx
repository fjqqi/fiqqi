import { LinkedInIcon, GitHubIcon } from "./Icons";

export default function ContactSection() {
  return (
    <>
      {/* ════════════════ CONTACT ════════════════ */}
      <section
        id="contact"
        style={{
          padding: "80px 24px 120px",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--green)",
              marginBottom: 12,
            }}
          >
            Get in Touch
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}
          >
            Let&apos;s work{" "}
            <span style={{ color: "var(--green)" }}>together</span>
          </h2>
          <p style={{ color: "var(--muted-light)", fontSize: "1rem" }}>
            Have a project in mind? Drop me a message.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
            }}
          >
            <input
              className="contact-input"
              type="text"
              placeholder="Your Name"
              id="contact-name"
            />
            <input
              className="contact-input"
              type="email"
              placeholder="Your Email"
              id="contact-email"
            />
          </div>
          <input
            className="contact-input"
            type="text"
            placeholder="Subject"
            id="contact-subject"
          />
          <textarea
            className="contact-input"
            placeholder="Tell me about your project..."
            rows={4}
            id="contact-message"
            style={{ resize: "vertical" }}
          />
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <button className="pill-green" type="submit" style={{ fontSize: "1rem", padding: "14px 48px" }}>
              Send Message
              <span style={{ marginLeft: 4 }}>→</span>
            </button>
          </div>
        </form>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer
        style={{
          borderTop: "2px solid var(--border)",
          padding: "40px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p style={{ fontSize: "0.85rem", color: "var(--muted-light)" }}>
          © {new Date().getFullYear()} Fiqqi. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "var(--muted-light)", transition: "color 0.3s" }}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "var(--muted-light)", transition: "color 0.3s" }}
          >
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </>
  );
}
