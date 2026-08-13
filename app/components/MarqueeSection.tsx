export default function MarqueeSection() {
  return (
    <section className="overflow-hidden border-y-2 bg border-border py-5 bg-green-900">
      <div className="marquee-track">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="text-[clamp(2rem,5vw,4.5rem)] text-white font-black tracking-[-0.04em] whitespace-nowrap px-10  opacity-90"
          >
            just call me if you need a frontend developer ✦ just call me if
            you need a frontend developer ✦&nbsp;
          </span>
        ))}
      </div>
    </section>
  );
}
