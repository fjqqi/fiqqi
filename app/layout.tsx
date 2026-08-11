import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiqqi — Front-end Developer | Portfolio",
  description:
    "Building uncommon digital experiences. Front-end developer specializing in Next.js, Laravel, Flutter, and TypeScript.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/helvetica-neue-lt-pro-55"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
