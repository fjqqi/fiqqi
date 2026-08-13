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

function SpotifyLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1db954">
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
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const tracks = data.tracks || [];
        if (tracks.length > 0) {
          setTrack(tracks[0]);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTrack();

    const interval = setInterval(fetchTrack, 180000);
    return () => clearInterval(interval);
  }, []);

  if (error || (!loading && !track)) return null;

  return (
    <div className="absolute top-60 left-20 z-40 w-80 animate-[spotify-slide-in_0.6s_ease-out] max-[1100px]:hidden">
      {loading ? (
        <div className="flex items-center gap-3 px-4 py-3.5 bg-card backdrop-blur-[20px] border-[1.5px] border-card-border rounded-[18px]">
          <div className="w-14 h-14 rounded-[10px] bg-skill-bg animate-[skeleton-pulse_1.5s_ease-in-out_infinite] shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-2.5 w-4/5 rounded bg-skill-bg animate-[skeleton-pulse_1.5s_ease-in-out_infinite]" />
            <div className="h-2 w-[55%] rounded bg-skill-bg animate-[skeleton-pulse_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      ) : track && (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-3 px-4 py-3.5 bg-card backdrop-blur-[20px] border-[1.5px] border-card-border rounded-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] no-underline text-inherit transition-all duration-300 cursor-pointer hover:border-primary hover:shadow-[0_4px_20px_rgba(29,185,84,0.12)] hover:-translate-y-0.5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] group"
        >
          {/* Top row: art + info + spotify logo */}
          <div className="flex items-center gap-3">
            <img
              src={track.albumArt}
              alt={track.album}
              className="w-14 h-14 rounded-[10px] object-cover shrink-0 transition-transform duration-200 group-hover:scale-[1.04]"
              width={56}
              height={56}
            />
            <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
              <span className="text-[0.85rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-foreground leading-[1.4]">
                {track.title} &nbsp;•&nbsp; {track.artist}
              </span>
              <span className="text-xs text-muted-light leading-[1.3]">
                Now Listening
              </span>
            </div>
            <div className="shrink-0 opacity-85 transition-opacity duration-200 group-hover:opacity-100">
              <SpotifyLogo />
            </div>
          </div>

          {/* Duration bar */}
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] text-muted-light tabular-nums shrink-0 min-w-7">
              {formatDuration(track.durationMs)}
            </span>
            <div className="flex-1 h-1 bg-skill-bg rounded-sm overflow-hidden">
              <div className="w-[55%] h-full bg-black/40 rounded-sm" />
            </div>
            <span className="text-[0.65rem] text-muted-light tabular-nums shrink-0 min-w-7">
              -{formatDuration(track.durationMs)}
            </span>
          </div>
        </a>
      )}
    </div>
  );
}
