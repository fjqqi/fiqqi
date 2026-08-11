import { NextRequest } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/spotify/callback`;

  if (!code) {
    return new Response("Missing authorization code", { status: 400 });
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    return new Response(
      `<html><body style="font-family:monospace;padding:40px;background:#111;color:#ededed;">
        <h2 style="color:red;">Error getting token</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new Response(
    `<html><body style="font-family:monospace;padding:40px;background:#111;color:#ededed;">
      <h2 style="color:#1db954;">✅ Spotify Authorization Successful!</h2>
      <p>Copy this <strong>refresh token</strong> and paste it into your <code>.env.local</code> file:</p>
      <pre style="background:#222;padding:16px;border-radius:8px;overflow-x:auto;color:#1db954;font-size:1.1rem;word-break:break-all;">${data.refresh_token}</pre>
      <p style="color:#888;margin-top:24px;">Set it as: <code>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</code></p>
      <p style="color:#888;">Then restart your dev server.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
