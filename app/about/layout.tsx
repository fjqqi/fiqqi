import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Fiqqi (ぴき)",
    description: "Hi. Im Fiqqi Im a Frontend Web Developer based in Makassar, INA.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
