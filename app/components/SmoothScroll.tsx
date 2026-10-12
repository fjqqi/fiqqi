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
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isTouch =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches;
        setIsTouchDevice(isTouch);
    }, []);

    // On touch/mobile devices, bypass Lenis completely for native 120Hz momentum scrolling without frame drops
    if (isTouchDevice) {
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