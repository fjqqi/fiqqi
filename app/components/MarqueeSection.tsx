export default function MarqueeSection() {
  return (
    <section
      className="overflow-hidden border-y-2 border-black py-5 relative"
      style={{ background: "#0a1a0c", contain: "layout paint" }}
    >
      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a1a0c, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a1a0c, transparent)" }}
      />

      <div className="marquee-track">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="text-[clamp(2rem,5vw,4.5rem)] font-black tracking-[-0.04em] whitespace-nowrap px-10"
            style={{ color: "#1db954" }}
          >
            just call me if you need a frontend developer ✦ just call me if
            you need a frontend developer ✦&nbsp;
          </span>
        ))}
      </div>
    </section>
  );
}

