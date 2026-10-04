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

export default function SpotifyCard() {
    const [data, setData] = useState<SpotifyData | null>(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch("/api/spotify");
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Failed to fetch Spotify", err);
            }
        };

        fetchNowPlaying();
        // Poll every 15 seconds so it updates automatically
        const interval = setInterval(fetchNowPlaying, 15000);
        return () => clearInterval(interval);
    }, []);

    const isPlaying = data?.isPlaying;
    const title = isPlaying ? data?.title : "Not Playing";
    const artist = isPlaying ? data?.artist : "Spotify";
    const progressPercent =
        data?.progressMs && data?.durationMs
            ? (data.progressMs / data.durationMs) * 100
            : 0;

    return (
        <div className="spotifyCard w-60 bg-white flex-col flex h-fit p-2.5 rounded-xl shadow-sm">
            <div className="flex items-center">
                {/* Album Cover */}
                <div className="albumCover relative w-12 h-12 bg-black rounded-lg overflow-hidden shrink-0">
                    {data?.albumImageUrl ? (
                        <Image
                            src={data.albumImageUrl}
                            alt={title || "Album Cover"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-white">
                            🎵
                        </div>
                    )}
                </div>

                {/* Title & Artist */}
                <div className="ml-2.5 min-w-0 flex-1">
                    <div className="text-sm flex items-center gap-1.5 font-medium text-black">
                        <span className="truncate max-w-[90px]">{title}</span>
                        <span className="text-gray-400">•</span>
                        <span className="truncate text-xs text-gray-500 max-w-[70px]">{artist}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                        {isPlaying ? "Now Playing" : "Offline"}
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="timeStamp mt-2">
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
