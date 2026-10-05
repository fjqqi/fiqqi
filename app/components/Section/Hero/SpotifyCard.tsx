"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

interface SpotifyData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    albumImageUrl?: string;
    songUrl?: string;
    progressMs?: number;
    durationMs?: number;
}

const DEFAULT_TRACK = {
    title: "Automatic",
    artist: "Hikaru Utada",
    albumImageUrl: "/albumcover.webp",
    songUrl: "https://open.spotify.com/track/6DJ3dfsY7fOU161ZMjzWIH",
    currentTime: "3.04",
    remainingTime: "-1.42",
    progressPercent: 68,
};

const cardContainerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delayChildren: 0.3,
            staggerChildren: 0.08,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const albumVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const TOTAL_DEFAULT_SEC = 286; // 4m 46s (3.04 + 1.42)

export default function SpotifyCard() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [currentSec, setCurrentSec] = useState<number>(184); // 3:04 initial for hydration match
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        // Pick a random progress between 25% and 75% on client mount
        const randomPercent = Math.floor(Math.random() * 50) + 25;
        const initialSec = Math.floor((randomPercent / 100) * TOTAL_DEFAULT_SEC);
        setCurrentSec(initialSec);

        // Transition from initial entrance ease to smooth linear playback progression
        const timer = setTimeout(() => {
            setHasEntered(true);
        }, 1700);

        return () => clearTimeout(timer);
    }, []);

    // Fetch live Spotify data if available
    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch("/api/spotify");
                if (res.ok) {
                    const json = await res.json();
                    if (json.isPlaying) {
                        setData(json);
                        if (json.progressMs != null) {
                            setCurrentSec(Math.floor(json.progressMs / 1000));
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch Spotify", err);
            }
        };

        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 15000);
        return () => clearInterval(interval);
    }, []);

    // Continuously advance track time & progress bar second by second
    useEffect(() => {
        const ticker = setInterval(() => {
            setCurrentSec((prev) => {
                const total = data?.durationMs ? Math.floor(data.durationMs / 1000) : TOTAL_DEFAULT_SEC;
                if (prev >= total - 3) {
                    // Loop back to a random start point in the early part of the track
                    return Math.floor(Math.random() * 25) + 15;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(ticker);
    }, [data?.durationMs]);

    const isLive = data?.isPlaying;
    const title = isLive && data?.title ? data.title : DEFAULT_TRACK.title;
    const artist = isLive && data?.artist ? data.artist : DEFAULT_TRACK.artist;
    const albumImageUrl = isLive && data?.albumImageUrl ? data.albumImageUrl : DEFAULT_TRACK.albumImageUrl;
    const songUrl = isLive && data?.songUrl ? data.songUrl : DEFAULT_TRACK.songUrl;

    const totalSec = isLive && data?.durationMs != null
        ? Math.floor(data.durationMs / 1000)
        : TOTAL_DEFAULT_SEC;

    const formatSec = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}.${secs < 10 ? "0" : ""}${secs}`;
    };

    const currentTime = formatSec(currentSec);
    const remainingTime = `-${formatSec(Math.max(0, totalSec - currentSec))}`;
    const progressPercent = Math.min(100, Math.max(0, (currentSec / totalSec) * 100));

    return (
        <motion.a
            href={songUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="spotifyCard group block w-full bg-white text-black p-2.5 rounded-[20px] shadow-sm hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex items-center gap-2.5">
                {/* Album Cover */}
                <motion.div
                    variants={albumVariants}
                    className="relative w-11 h-11 rounded-[10px] overflow-hidden shrink-0 shadow-inner bg-neutral-100"
                >
                    <Image
                        src={albumImageUrl}
                        alt={`${title} by ${artist}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="44px"
                    />
                </motion.div>

                {/* Song Details */}
                <motion.div variants={itemVariants} className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[14px] font-semibold text-neutral-800 leading-tight">
                        <span className="truncate max-w-[90px]">{title}</span>
                    </div>

                    <div className="text-[12px] text-neutral-500 font-normal mt-0.5">
                        <span className="truncate text-neutral-500 font-normal max-w-[75px]">{artist}</span>
                    </div>
                </motion.div>

                {/* Spotify Logo */}
                <motion.div variants={itemVariants} className="shrink-0 self-start mt-0.5">
                    <Image
                        src="/spotify.svg"
                        alt="Spotify"
                        width={18}
                        height={18}
                        className="w-[24px] h-[24px] opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                </motion.div>
            </div>

            {/* Time / Progress Bar */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mt-3 px-0.5">
                <span className="text-[10.5px] font-medium text-neutral-400 tabular-nums shrink-0">
                    {currentTime}
                </span>

                <div className="flex-1 h-1.5 bg-neutral-200/90 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={
                            !hasEntered
                                ? { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }
                                : { duration: 1, ease: "linear" }
                        }
                        className="h-full bg-neutral-400 rounded-full"
                    />
                </div>

                <span className="text-[10.5px] font-medium text-neutral-400 tabular-nums shrink-0">
                    {remainingTime}
                </span>
            </motion.div>
        </motion.a>
    );
}
