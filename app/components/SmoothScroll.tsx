"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
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
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Only enable Lenis on desktop with mouse (fine pointer and no touch)
        const hasFinePointer =
            window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
            !("ontouchstart" in window);
        setIsDesktop(hasFinePointer);
    }, []);

    // On mobile and touch devices, never mount Lenis. Native OS momentum scroll is 100% unblocked and buttery smooth.
    if (!isDesktop) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            autoRaf={false}
            options={{
                lerp: 0.1,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            <LenisScrollTriggerSync />

            {children}
        </ReactLenis>
    );
}