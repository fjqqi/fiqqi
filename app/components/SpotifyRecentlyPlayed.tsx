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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1db954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatDuration(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function SpotifyRecentlyPlayed() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTracks(data.tracks || []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();

    // Refresh every 3 minutes
    const interval = setInterval(fetchTracks, 180000);
    return () => clearInterval(interval);
  }, []);

  if (error || (!loading && tracks.length === 0)) return null;

  return (
    <div className={`spotify-sidebar ${collapsed ? "spotify-sidebar--collapsed" : ""}`}>
      {/* Toggle button */}
      <button
        className="spotify-sidebar__toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand Spotify sidebar" : "Collapse Spotify sidebar"}
      >
        <SpotifyLogo />
        {!collapsed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )}
      </button>

      {/* Content */}
      {!collapsed && (
        <div className="spotify-sidebar__content">
          <div className="spotify-sidebar__header">
            <span className="spotify-sidebar__title">Recently Played</span>
            <span className="spotify-sidebar__badge">
              <span className="spotify-sidebar__pulse" />
              Live
            </span>
          </div>

          <div className="spotify-sidebar__tracks">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="spotify-track spotify-track--skeleton">
                    <div className="spotify-track__art-skeleton" />
                    <div className="spotify-track__info-skeleton">
                      <div className="skeleton-line skeleton-line--title" />
                      <div className="skeleton-line skeleton-line--artist" />
                    </div>
                  </div>
                ))
              : tracks.map((track, i) => (
                  <a
                    key={`${track.title}-${i}`}
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-track"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <img
                      src={track.albumArt}
                      alt={track.album}
                      className="spotify-track__art"
                      width={44}
                      height={44}
                    />
                    <div className="spotify-track__info">
                      <span className="spotify-track__title">{track.title}</span>
                      <span className="spotify-track__artist">{track.artist}</span>
                    </div>
                    <div className="spotify-track__meta">
                      <span className="spotify-track__duration">{formatDuration(track.durationMs)}</span>
                      <span className="spotify-track__time">{timeAgo(track.playedAt)}</span>
                    </div>
                  </a>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
