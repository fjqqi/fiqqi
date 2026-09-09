"use client";

import { useEffect } from "react";
import {
  CloseIcon,
  MailIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
  BehanceIcon,
  LinkChainIcon,
  ArrowUpRight,
} from "./Icons";
import { contactPlatforms } from "../data";

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const renderPlatformIcon = (iconName: string) => {
  switch (iconName) {
    case "email":
      return <MailIcon size={20} />;
    case "linkedin":
      return <LinkedInIcon size={20} className="" />;
    case "github":
      return <GitHubIcon size={20} className="" />;
    case "instagram":
      return <InstagramIcon size={20} className="" />;
    case "behance":
      return <BehanceIcon size={20} />;
    case "links":
    default:
      return <LinkChainIcon size={20} />;
  }
};

export default function GetInTouchModal({ isOpen, onClose }: GetInTouchModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-get-in-touch-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[460px] bg-[#0e100f] border border-white/[0.12] rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-1">
          <div>
            <h2
              id="modal-get-in-touch-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight"
            >
              Get in touch
            </h2>
            <p className="text-xs sm:text-sm text-[#8a8a80] mt-1">
              Choose a platform to connect
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#8a8a80] hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Platforms List */}
        <div className="flex flex-col gap-2.5 mt-5">
          {contactPlatforms.map((platform) => {
            const isExternal = platform.href.startsWith("http");
            return (
              <a
                key={platform.name}
                href={platform.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (platform.href.startsWith("#")) {
                    onClose();
                  }
                }}
                className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#161816]/90 hover:bg-[#202220] border border-white/[0.06] hover:border-white/[0.18] transition-all duration-200 cursor-pointer no-underline text-white"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#222422] border border-white/[0.08] flex items-center justify-center text-white/90 shrink-0 group-hover:scale-105 group-hover:text-white transition-all duration-200">
                    {renderPlatformIcon(platform.icon)}
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[0.95rem] font-semibold text-white tracking-tight leading-tight">
                      {platform.name}
                    </div>
                    <div className="text-xs sm:text-[0.82rem] text-[#8a8a80] group-hover:text-white/70 transition-colors truncate mt-0.5">
                      {platform.handle}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 ml-3 text-[#6a6a62] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  <ArrowUpRight size={18} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
