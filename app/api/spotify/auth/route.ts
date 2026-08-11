import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SCOPES = "user-read-recently-played";

export async function GET(request: NextRequest) {
  // Build redirect URI from the current request's origin (works locally & deployed)
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/spotify/callback`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: redirectUri,
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}
