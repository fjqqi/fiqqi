#!/usr/bin/env node

/**
 * Spotify Auth Helper
 * 
 * Usage: node scripts/spotify-auth.mjs
 * 
 * Steps:
 * 1. Register https://localhost:3000/api/spotify/callback in your Spotify Dashboard
 * 2. Run this script
 * 3. Open the URL it prints in your browser
 * 4. Authorize the app
 * 5. The browser will show an error page (that's expected!)
 * 6. Copy the FULL URL from the browser address bar
 * 7. Paste it into this script
 * 8. The script will extract the refresh token and save it to .env.local
 */

import { createInterface } from "readline/promises";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = resolve(__dirname, "..", ".env.local");

const CLIENT_ID = "9a6f7311152140e3a1dcdf4f31944ce0";
const CLIENT_SECRET = "21f37a5c904a439293c37489a242e63b";
const REDIRECT_URI = "https://localhost:3000/api/spotify/callback";
const SCOPES = "user-read-recently-played";

const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  response_type: "code",
  client_id: CLIENT_ID,
  scope: SCOPES,
  redirect_uri: REDIRECT_URI,
}).toString()}`;

const rl = createInterface({ input: process.stdin, output: process.stdout });

console.log("\n🎵  Spotify Authorization Setup\n");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n1. Make sure you've added this Redirect URI in your Spotify Dashboard:");
console.log(`   ${REDIRECT_URI}\n`);
console.log("2. Open this URL in your browser:\n");
console.log(`   ${authUrl}\n`);
console.log("3. Authorize the app on Spotify");
console.log("4. The browser will show an error page — that's EXPECTED!");
console.log("5. Copy the FULL URL from the address bar (it contains ?code=...)");
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

const pastedUrl = await rl.question("Paste the redirect URL here: ");

let code;
try {
  code = new URL(pastedUrl.trim()).searchParams.get("code");
} catch {
  console.log("\n❌  Invalid URL. Make sure you copied the full URL from the address bar.");
  rl.close();
  process.exit(1);
}

if (!code) {
  console.log("\n❌  No authorization code found in the URL.");
  console.log("    Make sure you copied the full URL including ?code=...");
  rl.close();
  process.exit(1);
}

console.log("\n⏳  Exchanging code for tokens...");

const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  }),
});

const data = await tokenRes.json();

if (!data.refresh_token) {
  console.log("\n❌  Failed to get refresh token:");
  console.log(JSON.stringify(data, null, 2));
  rl.close();
  process.exit(1);
}

console.log("\n✅  Got refresh token!\n");

// Update .env.local
try {
  let envContent = readFileSync(ENV_PATH, "utf-8");
  envContent = envContent.replace(
    /SPOTIFY_REFRESH_TOKEN=.*/,
    `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`
  );
  writeFileSync(ENV_PATH, envContent);
  console.log("✅  Saved to .env.local");
  console.log("    Restart your dev server for changes to take effect.\n");
} catch {
  console.log("⚠️  Could not write to .env.local. Add this manually:\n");
  console.log(`   SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
}

rl.close();
