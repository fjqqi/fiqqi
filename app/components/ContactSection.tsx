import { LinkedInIcon, GitHubIcon, InstagramIcon } from "./Icons";

export default function ContactSection() {
  return (
    <>
      {/* ════════════════ CONTACT ════════════════ */}
      <section id="contact" className="py-24 pb-32 px-6 max-w-[700px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            Get in Touch
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] tracking-[-0.03em] mb-2">
            Let&apos;s work{" "}
            <span className="text-primary">together</span>
          </h2>
          <p className="text-muted-light text-base mb-4">
            Have a project in mind? Drop me a message.
          </p>
          {/* Quick email link */}
          <a
            href="mailto:hello@fiqqi.dev"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline border-b border-primary/40 hover:border-primary transition-colors duration-200 pb-0.5"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            hello@fiqqi.dev
          </a>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <input
              className="contact-input bg-transparent border-0 border-b-2 border-b-input-border py-3 text-base font-sans text-foreground w-full outline-none transition-[border-color,color] duration-300 focus:border-b-primary"
              type="text"
              placeholder="Your Name"
              id="contact-name"
            />
            <input
              className="contact-input bg-transparent border-0 border-b-2 border-b-input-border py-3 text-base font-sans text-foreground w-full outline-none transition-[border-color,color] duration-300 focus:border-b-primary"
              type="email"
              placeholder="Your Email"
              id="contact-email"
            />
          </div>
          <input
            className="contact-input bg-transparent border-0 border-b-2 border-b-input-border py-3 text-base font-sans text-foreground w-full outline-none transition-[border-color,color] duration-300 focus:border-b-primary"
            type="text"
            placeholder="Subject"
            id="contact-subject"
          />
          <textarea
            className="contact-input bg-transparent border-0 border-b-2 border-b-input-border py-3 text-base font-sans text-foreground w-full outline-none transition-[border-color,color] duration-300 focus:border-b-primary resize-y"
            placeholder="Tell me about your project..."
            rows={4}
            id="contact-message"
          />
          <div className="text-center mt-2">
            <button
              className="bg-primary text-white px-12 py-3.5 rounded-full font-semibold text-base cursor-pointer transition-all duration-300 inline-flex items-center gap-1.5 hover:bg-primary-dark hover:scale-105 hover:shadow-[0_4px_20px_rgba(29,185,84,0.3)]"
              type="submit"
            >
              Send Message
              <span className="ml-1">→</span>
            </button>
          </div>
        </form>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="border-t-2 border-border py-10 px-6 max-w-[1100px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[0.9rem] font-semibold text-foreground">Fiqqi</p>
            <p className="text-[0.8rem] text-muted-light mt-0.5">
              Building uncommon digital experiences.
            </p>
            <p className="text-[0.75rem] text-muted-light mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-light transition-colors duration-300 hover:text-primary"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-light transition-colors duration-300 hover:text-primary"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-light transition-colors duration-300 hover:text-primary"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
