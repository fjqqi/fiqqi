import { NextResponse } from "next/server";
import { getNowPlaying } from "@/app/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const response = await getNowPlaying();

        // 204 means Spotify is open but nothing is playing
        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ isPlaying: false });
        }

        const song = await response.json();

        if (!song.item) {
            return NextResponse.json({ isPlaying: false });
        }

        // Extract clean track data for the frontend
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((artist: { name: string }) => artist.name).join(", ");
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images?.[0]?.url;
        const songUrl = song.item.external_urls?.spotify;
        const progressMs = song.progress_ms;
        const durationMs = song.item.duration_ms;

        return NextResponse.json({
            isPlaying,
            title,
            artist,
            album,
            albumImageUrl,
            songUrl,
            progressMs,
            durationMs,
        });
    } catch (error) {
        return NextResponse.json({ isPlaying: false });
    }
}
