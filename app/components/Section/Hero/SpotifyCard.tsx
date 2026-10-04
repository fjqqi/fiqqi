"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

export default function SpotifyCard() {
    const [data, setData] = useState<SpotifyData | null>(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch("/api/spotify");
                if (res.ok) {
                    const json = await res.json();
                    if (json.isPlaying) {
                        setData(json);
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

    const isLive = data?.isPlaying;
    const title = isLive && data?.title ? data.title : DEFAULT_TRACK.title;
    const artist = isLive && data?.artist ? data.artist : DEFAULT_TRACK.artist;
    const albumImageUrl = isLive && data?.albumImageUrl ? data.albumImageUrl : DEFAULT_TRACK.albumImageUrl;
    const songUrl = isLive && data?.songUrl ? data.songUrl : DEFAULT_TRACK.songUrl;

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}.${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const currentTime = isLive && data?.progressMs != null
        ? formatTime(data.progressMs)
        : DEFAULT_TRACK.currentTime;

    const remainingTime = isLive && data?.progressMs != null && data?.durationMs != null
        ? `-${formatTime(Math.max(0, data.durationMs - data.progressMs))}`
        : DEFAULT_TRACK.remainingTime;

    const progressPercent = isLive && data?.progressMs != null && data?.durationMs != null
        ? Math.min(100, Math.max(0, (data.progressMs / data.durationMs) * 100))
        : DEFAULT_TRACK.progressPercent;

    return (
        <a
            href={songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotifyCard group block w-full bg-white text-black p-2.5 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-200"
        >
            <div className="flex items-center gap-2.5">
                {/* Album Cover */}
                <div className="relative w-11 h-11 rounded-[10px] overflow-hidden shrink-0 shadow-inner bg-neutral-100">
                    <Image
                        src={albumImageUrl}
                        alt={`${title} by ${artist}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="44px"
                    />
                </div>

                {/* Song Details */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[14px] font-semibold text-neutral-800 leading-tight">
                        <span className="truncate max-w-[90px]">{title}</span>

                    </div>

                    <div className="text-[12px] text-neutral-500 font-normal mt-0.5">
                        <span className="truncate text-neutral-500 font-normal max-w-[75px]">{artist}</span>
                    </div>
                </div>

                {/* Spotify Logo */}
                <div className="shrink-0 self-start mt-0.5">
                    <Image
                        src="/spotify.svg"
                        alt="Spotify"
                        width={18}
                        height={18}
                        className="w-[24px] h-[24px]  opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>

            {/* Time / Progress Bar */}
            <div className="flex items-center gap-2 mt-3 px-0.5">
                <span className="text-[10.5px] font-medium text-neutral-400 tabular-nums shrink-0">
                    {currentTime}
                </span>

                <div className="flex-1 h-1.5 bg-neutral-200/90 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-neutral-400 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                <span className="text-[10.5px] font-medium text-neutral-400 tabular-nums shrink-0">
                    {remainingTime}
                </span>
            </div>
        </a>
    );
}
