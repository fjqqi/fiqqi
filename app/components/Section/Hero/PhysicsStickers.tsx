"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { GithubIcon, LinkedInIcon } from "@/app/components/Icons";

interface StickerData {
    id: string;
    label: string;
    textColor: string;
    icon?: "linkedin" | "github";
    href?: string;
    xPercent: number;
    startY: number;
    angle: number;
}

const STICKERS: StickerData[] = [
    {
        id: "linkedin",
        label: "LinkedIn",
        textColor: "text-[#0A66C2]",
        icon: "linkedin",
        href: "https://linkedin.com",
        xPercent: 0.35,
        startY: -120,
        angle: -0.35,
    },
    {
        id: "github",
        label: "Github",
        textColor: "text-[#6366F1]",
        icon: "github",
        href: "https://github.com/fjqqi",
        xPercent: 0.68,
        startY: -240,
        angle: 0.28,
    },
    {
        id: "web-dev",
        label: "Web Developer",
        textColor: "text-black",
        xPercent: 0.3,
        startY: -360,
        angle: -0.15,
    },
    {
        id: "ui-ux",
        label: "UI / UX",
        textColor: "text-[#0066FF]",
        xPercent: 0.72,
        startY: -480,
        angle: -0.22,
    },
    {
        id: "front-end",
        label: "Front - End",
        textColor: "text-black",
        xPercent: 0.62,
        startY: -600,
        angle: 0.18,
    },
    {
        id: "mobile-dev",
        label: "Mobile Developer",
        textColor: "text-black",
        xPercent: 0.38,
        startY: -720,
        angle: -0.32,
    },
];

export default function PhysicsStickers() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickerRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
    const [ready, setReady] = useState(false);
    const dragDistanceRef = useRef(0);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const { Engine, Bodies, Composite, Mouse, MouseConstraint } = Matter;

        // Realistic gravity for crisp falling animation
        const engine = Engine.create({
            gravity: { x: 0, y: 1.1, scale: 0.001 },
        });

        const rect = container.getBoundingClientRect();
        const W = rect.width || 340;
        const H = rect.height || 450;
        // Spotify card height (~85px) + bottom padding (14px) + margin = ~110px from bottom
        const floorY = H - 110;

        // Boundaries: floor at bottom; walls extend far upward to guide falling stickers
        const floor = Bodies.rectangle(W / 2, floorY + 15, W * 2, 30, {
            isStatic: true,
            restitution: 0.15,
            friction: 0.9,
        });
        const leftWall = Bodies.rectangle(6, -200, 20, 1800, {
            isStatic: true,
            restitution: 0.15,
            friction: 0.8,
        });
        const rightWall = Bodies.rectangle(W - 6, -200, 20, 1800, {
            isStatic: true,
            restitution: 0.15,
            friction: 0.8,
        });
        const ceiling = Bodies.rectangle(W / 2, -1000, W * 3, 40, {
            isStatic: true,
        });

        Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

        // Create sticker bodies
        const stickerBodies: Matter.Body[] = [];

        STICKERS.forEach((item, index) => {
            const el = stickerRefs.current[index];
            const w = el ? el.offsetWidth : 140;
            const h = el ? el.offsetHeight : 42;

            // 4px physics gap: expand collision hull by 4px (2px per side)
            const bodyW = w + 4;
            const bodyH = h + 4;
            const radius = Math.min(bodyW, bodyH) / 2;

            const startX = W * item.xPercent;
            const startY = item.startY;

            const body = Bodies.rectangle(startX, startY, bodyW, bodyH, {
                chamfer: { radius },
                restitution: 0.22,
                friction: 0.85,
                frictionAir: 0.025,
                frictionStatic: 1.0,
                density: 0.003,
                angle: item.angle,
            });

            // Subtle tumbling spin while falling
            Matter.Body.setAngularVelocity(body, (index % 2 === 0 ? -1 : 1) * 0.025);

            stickerBodies.push(body);
        });

        Composite.add(engine.world, stickerBodies);

        // Mouse & Touch interaction
        const mouse = Mouse.create(container);
        // Prevent Matter from capturing wheel/scroll
        mouse.element.removeEventListener("mousewheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", (mouse as unknown as { mousewheel: EventListener }).mousewheel);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        Composite.add(engine.world, mouseConstraint);

        // Track drag to prevent accidental click on links
        Matter.Events.on(mouseConstraint, "startdrag", () => {
            dragDistanceRef.current = 0;
            isDraggingRef.current = false;
        });

        Matter.Events.on(mouseConstraint, "mousemove", () => {
            if (mouseConstraint.body) {
                dragDistanceRef.current += 1;
                if (dragDistanceRef.current > 5) {
                    isDraggingRef.current = true;
                }
            }
        });

        Matter.Events.on(mouseConstraint, "enddrag", () => {
            setTimeout(() => {
                isDraggingRef.current = false;
                dragDistanceRef.current = 0;
            }, 50);
        });

        setReady(true);

        // Animation frame loop
        let animId: number;
        const tick = () => {
            Engine.update(engine, 1000 / 60);

            stickerBodies.forEach((body, i) => {
                const el = stickerRefs.current[i];
                if (!el) return;
                const w = el.offsetWidth;
                const h = el.offsetHeight;
                const x = body.position.x - w / 2;
                const y = body.position.y - h / 2;
                el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
            });

            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animId);
            Composite.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        if (isDraggingRef.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-auto overflow-hidden select-none"
            style={{ touchAction: "pan-y" }}
        >
            {STICKERS.map((s, i) => {
                const content = (
                    <>
                        {s.icon === "linkedin" && <LinkedInIcon className="w-[18px] h-[18px] shrink-0" />}
                        {s.icon === "github" && <GithubIcon className="w-[18px] h-[18px] shrink-0 fill-[#6366F1]" />}
                        <span>{s.label}</span>
                    </>
                );

                const commonClass =
                    "absolute top-0 left-0 bg-white select-none rounded-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-[15px] font-normal tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.14)] cursor-grab active:cursor-grabbing !transition-none will-change-transform z-20";

                if (s.href) {
                    return (
                        <a
                            key={s.id}
                            ref={(el) => {
                                stickerRefs.current[i] = el;
                            }}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick}
                            className={`${commonClass} ${s.textColor} ${ready ? "opacity-100" : "opacity-0"}`}
                            style={{ touchAction: "none" }}
                        >
                            {content}
                        </a>
                    );
                }

                return (
                    <div
                        key={s.id}
                        ref={(el) => {
                            stickerRefs.current[i] = el;
                        }}
                        className={`${commonClass} ${s.textColor} ${ready ? "opacity-100" : "opacity-0"}`}
                        style={{ touchAction: "none" }}
                    >
                        {content}
                    </div>
                );
            })}
        </div>
    );
}
