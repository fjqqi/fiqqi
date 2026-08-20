"use client";

export default function WorkCard() {
  return (
    <div className="animate-fade-in-up animate-delay-3 bg-card backdrop-blur-[20px] border-[1.5px] border-card-border rounded-[14px] sm:rounded-2xl p-2.5 sm:p-4 xl:px-6 xl:py-5 flex flex-col gap-1.5 sm:gap-3 w-[160px] sm:w-[200px] xl:w-auto xl:min-w-[220px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:-translate-y-1">
      {/* Status badge */}
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-[pulse-dot_2s_ease-in-out_infinite] shrink-0" />
        <span className="text-[0.6rem] sm:text-[0.7rem] font-bold tracking-[0.08em] uppercase text-primary leading-tight">
          AVAILABLE FOR WORK
        </span>
      </div>

      {/* Open to */}
      <div className="flex flex-col gap-0.5 sm:gap-1">
        <span className="text-[0.65rem] sm:text-xs text-muted-light font-medium">Open to</span>
        <span className="text-[0.72rem] sm:text-[0.85rem] font-semibold text-foreground tracking-[-0.01em] leading-tight">
          Freelance · Part-time · Full-time
        </span>
      </div>

      {/* Location */}
      <div className="hidden lg:flex items-center gap-1 sm:gap-1.5 text-[0.65rem] sm:text-xs text-muted font-medium pt-1 border-t border-card-border">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Makassar, Indonesia</span>
      </div>
    </div>
  );
}
