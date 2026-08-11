const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=8";

async function getAccessToken() {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return res.json();
}

export async function GET() {
  if (!REFRESH_TOKEN) {
    return Response.json(
      { error: "SPOTIFY_REFRESH_TOKEN not set. Visit /api/spotify/auth to authorize." },
      { status: 500 }
    );
  }

  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch recently played" },
        { status: res.status }
      );
    }

    const data = await res.json();

    interface SpotifyArtist {
      name: string;
    }

    interface SpotifyImage {
      url: string;
      height: number;
      width: number;
    }

    interface SpotifyTrack {
      name: string;
      artists: SpotifyArtist[];
      album: {
        name: string;
        images: SpotifyImage[];
      };
      external_urls: {
        spotify: string;
      };
      duration_ms: number;
    }

    interface SpotifyPlayHistoryItem {
      track: SpotifyTrack;
      played_at: string;
    }

    const tracks = data.items.map((item: SpotifyPlayHistoryItem) => ({
      title: item.track.name,
      artist: item.track.artists.map((a: SpotifyArtist) => a.name).join(", "),
      album: item.track.album.name,
      albumArt: item.track.album.images[1]?.url || item.track.album.images[0]?.url,
      url: item.track.external_urls.spotify,
      playedAt: item.played_at,
      durationMs: item.track.duration_ms,
    }));

    return Response.json({ tracks }, {
      headers: {
        "Cache-Control": "public, s-maxage=180, stale-while-revalidate=90",
      },
    });
  } catch {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
