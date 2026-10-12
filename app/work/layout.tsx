import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work — Fiqqi (ぴき)",
    description: "Selected projects and design work by Fiqqi — Frontend Web Developer & Designer.",
};

export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
