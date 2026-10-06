"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerSync() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const update = () => {
            ScrollTrigger.update();
        };

        lenis.on("scroll", update);

        const ticker = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(ticker);

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.off("scroll", update);
            gsap.ticker.remove(ticker);
        };
    }, [lenis]);

    return null;
}

export default function SmoothScroll({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <ReactLenis
            root
            autoRaf={false}
            options={{
                lerp: 0.1,
                smoothWheel: true,
                syncTouch: false,
                touchMultiplier: 1,
            }}
        >
            <LenisScrollTriggerSync />

            {children}
        </ReactLenis>
    );
}