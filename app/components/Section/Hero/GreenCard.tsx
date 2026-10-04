"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@/app/components/Icons";
import SpotifyCard from "./SpotifyCard";
import PhysicsStickers from "./PhysicsStickers";

export default function GreenCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 1.25,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25,
            }}
            className="relative w-full h-[360px] md:w-[340px] md:h-[450px] p-3.5 rounded-[34px] bg-primary/75 dark:bg-primary/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/30 dark:border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_16px_40px_rgba(55,93,5,0.25)] flex flex-col justify-end overflow-hidden will-change-transform"
        >
            {/* Subtle Glass Sheen / Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10 pointer-events-none rounded-[34px] z-0" />

            {/* Frosted Glass Grain / Noise Texture */}
            <div
                className="absolute inset-0 pointer-events-none rounded-[34px] opacity-25 dark:opacity-35 mix-blend-overlay z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Interactive Physics Stickers with 4px Gap */}
            <PhysicsStickers />

            {/* Bottom Row: Spotify Card + Diagonal Arrow Button */}
            <div className="relative z-10 flex items-end gap-2 w-full">
                <div className="flex-1 min-w-0">
                    <SpotifyCard />
                </div>

                <a
                    href="#about"
                    aria-label="Open"
                    className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95 transition-all text-black group"
                >
                    <ArrowUpRightIcon className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
            </div>
        </motion.div>
    );
}