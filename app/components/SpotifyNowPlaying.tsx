"use client";

import { useState, useEffect } from "react";

interface Track {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  playedAt: string;
  durationMs: number;
}

const DEFAULT_TRACK: Track = {
  title: "Cookie",
  artist: "NewJeans",
  album: "New Jeans 1st EP 'New Jeans'",
  albumArt: "https://i.scdn.co/image/ab67616d0000b2739d28e78b6f001684c311c52d",
  url: "https://open.spotify.com/track/2Dwov5bUqSsmF94595m6S7",
  playedAt: new Date().toISOString(),
  durationMs: 235000,
};

function SpotifyLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1db954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function formatDuration(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}.${secs.toString().padStart(2, "0")}`;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<Track>(DEFAULT_TRACK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) return;
        const data = await res.json();
        const tracks = data.tracks || [];
        if (tracks.length > 0 && tracks[0].title) {
          setTrack(tracks[0]);
        }
      } catch {
        // Fallback to default track
      }
    }
    fetchTrack();

    const interval = setInterval(fetchTrack, 180000);
    return () => clearInterval(interval);
  }, []);

  const displayTrack = track || DEFAULT_TRACK;

  return (
    <div className="w-full max-w-[340px] animate-fade-in">
      <a
        href={displayTrack.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-2.5 p-3 sm:px-4 sm:py-3.5 bg-white/95 dark:bg-[#161c16]/95 backdrop-blur-[20px] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] no-underline text-inherit transition-all duration-300 cursor-pointer hover:border-primary/50 hover:shadow-[0_10px_35px_rgba(29,185,84,0.18)] hover:-translate-y-0.5 group"
      >
        {/* Top row: art + info + spotify logo */}
        <div className="flex items-center gap-3">
          <img
            src={displayTrack.albumArt}
            alt={displayTrack.album}
            className="w-12 h-12 rounded-xl object-cover shrink-0 transition-transform duration-200 group-hover:scale-[1.04] shadow-xs"
            width={48}
            height={48}
          />
          <div className="flex-1 min-w-0 flex flex-col gap-0.5 text-left">
            <span className="text-[0.88rem] font-bold whitespace-nowrap overflow-hidden text-ellipsis text-foreground leading-[1.3]">
              {displayTrack.title}
            </span>
            <span className="text-xs text-muted-light leading-[1.2] whitespace-nowrap overflow-hidden text-ellipsis">
              {displayTrack.artist}
            </span>
          </div>
          <div className="shrink-0 opacity-90 transition-opacity duration-200 group-hover:opacity-100">
            <SpotifyLogo />
          </div>
        </div>

        {/* Duration bar */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[0.68rem] text-muted-light tabular-nums shrink-0 min-w-7 text-left font-mono">
            {formatDuration(displayTrack.durationMs)}
          </span>
          <div className="flex-1 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="w-[45%] h-full bg-neutral-600 dark:bg-neutral-300 rounded-full" />
          </div>
          <span className="text-[0.68rem] text-muted-light tabular-nums shrink-0 min-w-7 text-right font-mono">
            -{formatDuration(displayTrack.durationMs)}
          </span>
        </div>
      </a>
    </div>
  );
}
