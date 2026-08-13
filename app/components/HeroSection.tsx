import Image from "next/image";
import { LinkedInIcon, GitHubIcon } from "./Icons";
import WorkCard from "./WorkCard";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 lg:pt-28 pb-15 relative"
    >
      {/* Heading */}
      <div className="animate-fade-in-up text-center mb-6">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-[800] leading-[1.1] tracking-[-0.03em] text-center [text-shadow:0.5px_0_0_black,-0.5px_0_0_black,0_0.5px_0_black,0_-0.5px_0_black,0.5px_0.5px_0_black,-0.5px_-0.5px_0_black,0.5px_-0.5px_0_black,-0.5px_0.5px_0_black]">
          Building Aesthetic
          <br />
          Digital <span className="text-primary">Experiences</span>
        </h1>
      </div>

      {/* Intro line */}
      <div className="animate-fade-in-up animate-delay-1 flex items-center gap-3 mb-4 flex-wrap justify-center">
        <span className="text-[1.1rem] font-semibold tracking-[-0.01em]">
          Hi, I&apos;m Fiqqi
        </span>
        <span className="spin-slow text-primary font-extrabold text-[1.2rem]">✳</span>
        <span className="bg-primary text-white px-6 py-2 rounded-full font-semibold text-[0.95rem] tracking-[0.01em] cursor-pointer transition-all duration-300 inline-flex items-center gap-1.5 hover:bg-primary-dark hover:scale-105 hover:shadow-[0_4px_20px_rgba(29,185,84,0.3)]">
          Front-end Developer
        </span>
        <span className="spin-slow text-primary text-[1.2rem] font-extrabold ">✳</span>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-primary duration-300"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-primary duration-300"
        >
          <GitHubIcon />
        </a>
      </div>

      {/* Tech stack */}
      <div className="animate-fade-in-up animate-delay-2 mt-4 mb-12">
        <span className="bg-transparent text-foreground px-5 py-2 rounded-full font-medium text-[0.85rem] border-[1.5px] border-pill-border tracking-[0.02em]">
          Next.js &bull; Laravel &bull; Flutter &bull; TypeScript
        </span>
      </div>

      {/* Apple + scattered nav */}
      <div className="animate-fade-in-up animate-delay-3 relative w-[min(700px,90vw)] h-[min(700px,90vw)] flex items-center justify-center">
        {/* Apple image */}
        <div className="apple-float relative z-0">
          <Image
            src="/apple.png"
            alt="Halftone green apple"
            width={700}
            height={700}
            priority
            className="w-[min(660px,85vw)] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* Scattered nav links */}
        <a
          href="#projects"
          className="absolute left-[0%] sm:left-[-2%] top-[32%] z-10 no-underline  border-2 border-black bg-accent text-white px-6 sm:px-7 py-2.5 rounded-full font-semibold text-sm sm:text-base cursor-pointer transition-all duration-300 hover:bg-[#ef5350] hover:scale-110 hover:-rotate-3 hover:shadow-[0_4px_20px_rgba(248,113,113,0.3)]"
        >
          View Projects
        </a>

        <a
          href="#contact"
          className="absolute top-[40%]  [text-shadow:2px_0_0_white,-2px_0_0_white,0_2px_0_white,0_-2px_0_white,1.5px_1.5px_0_white,-1.5px_-1.5px_0_white,1.5px_-1.5px_0_white,-1.5px_1.5px_0_white]
 z-10 no-underline text-xl sm:text-2xl font-bold text-foreground  tracking-[-0.02em] transition-all duration-300 hover:scale-110 hover:-rotate-3"
        >
          Hire Me
        </a>

        <a
          href="#about"
          className="absolute right-[0%] sm:right-[-2%] top-[32%] z-10 no-underline border-2 border-black bg-accent text-white px-6 sm:px-7 py-2.5 rounded-full font-semibold text-sm sm:text-base cursor-pointer transition-all duration-300 hover:bg-[#ef5350] hover:scale-110 hover:rotate-3 hover:shadow-[0_4px_20px_rgba(248,113,113,0.3)]"
        >
          About Me
        </a>

        {/* <a
          href="#contact"
          className="nav-link absolute right-[18%] bottom-[12%] z-10 no-underline text-lg sm:text-xl font-semibold text-foreground rotate-2 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
        >
          Contact
        </a> */}
      </div>

      {/* Work availability card — right side */}
      <WorkCard />
    </section>
  );
}
