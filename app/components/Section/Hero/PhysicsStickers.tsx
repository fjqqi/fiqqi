"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { GithubIcon, LinkedInIcon } from "@/app/components/Icons";

interface StickerData {
    id: string;
    label: string;
    textColor: string;
    icon?: "linkedin" | "github";
    hasGreenLight?: boolean;
    href?: string;
}

const STICKERS: StickerData[] = [
    {
        id: "linkedin",
        label: "LinkedIn",
        textColor: "text-[#0A66C2]",
        icon: "linkedin",
        href: "https://linkedin.com",
    },
    {
        id: "github",
        label: "Github",
        textColor: "text-[#6366F1]",
        icon: "github",
        href: "https://github.com/fjqqi",
    },
    {
        id: "web-dev",
        label: "Web Developer",
        textColor: "text-black",
    },
    {
        id: "ui-ux",
        label: "UI / UX",
        textColor: "text-[#0066FF]",
    },
    {
        id: "front-end",
        label: "Front - End",
        textColor: "text-black",
    },
    {
        id: "mobile-dev",
        label: "Mobile Developer",
        textColor: "text-black",
    },
    {
        id: "open-work",
        label: "Available for new project",
        textColor: "text-emerald-600 font-medium",
        hasGreenLight: true,
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
        const W = container.offsetWidth || rect.width || 340;
        const H = container.offsetHeight || rect.height || 450;
        // Spotify card height (~85px) + bottom padding (14px) + margin = ~110px from bottom
        const floorY = H - 110;

        // Boundaries: floor at bottom; walls extend far upward to guide falling stickers
        const floor = Bodies.rectangle(W / 2, floorY + 15, W * 2, 30, {
            isStatic: true,
            restitution: 0.15,
            friction: 0.9,
        });
        const leftWall = Bodies.rectangle(6, -500, 20, 2600, {
            isStatic: true,
            restitution: 0.15,
            friction: 0.8,
        });
        const rightWall = Bodies.rectangle(W - 6, -500, 20, 2600, {
            isStatic: true,
            restitution: 0.15,
            friction: 0.8,
        });
        const ceiling = Bodies.rectangle(W / 2, -1800, W * 3, 40, {
            isStatic: true,
        });

        Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

        // Shuffle other stickers randomly, but keep open-work as the final sticker to drop so it always lands on top
        const openWorkIdx = STICKERS.findIndex((s) => s.id === "open-work");
        const otherIndices = STICKERS.map((_, i) => i).filter((i) => i !== openWorkIdx);
        const shuffledOthers = otherIndices.sort(() => Math.random() - 0.5);
        const dropOrder = [...shuffledOthers, openWorkIdx];

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

            // Ensure sticker spawns safely between walls without clipping
            const minX = bodyW / 2 + 14;
            const maxX = Math.max(minX, W - bodyW / 2 - 14);

            // open-work drops centrally to cap the pile cleanly; others are randomly distributed
            const isTop = item.id === "open-work";
            const startX = isTop
                ? Math.max(minX, Math.min(maxX, W * 0.5 + (Math.random() - 0.5) * 35))
                : minX + Math.random() * (maxX - minX);

            // Staggered drop height: open-work drops last after the stack forms
            const dropRank = dropOrder.indexOf(index);
            const startY = -120 - dropRank * (105 + Math.random() * 25);

            // Subtle angle for open-work so it rests balanced; dynamic angle for others
            const randomAngle = isTop
                ? (Math.random() - 0.5) * 0.25
                : (Math.random() - 0.5) * 0.8;

            const body = Bodies.rectangle(startX, startY, bodyW, bodyH, {
                chamfer: { radius },
                restitution: isTop ? 0.15 : 0.22,
                friction: 0.9,
                frictionAir: 0.025,
                frictionStatic: 1.0,
                density: 0.003,
                angle: randomAngle,
            });

            // Random tumbling spin while falling
            const randomSpin = isTop
                ? (Math.random() - 0.5) * 0.02
                : (Math.random() - 0.5) * 0.05;
            Matter.Body.setAngularVelocity(body, randomSpin);

            // Subtle random horizontal drift
            const driftX = isTop ? 0 : (Math.random() - 0.5) * 1.5;
            Matter.Body.setVelocity(body, { x: driftX, y: 0 });

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

        // Cache sticker dimensions once to avoid layout thrashing during animation frames
        const stickerSizes = STICKERS.map((_, i) => {
            const el = stickerRefs.current[i];
            return {
                w: el?.offsetWidth || 140,
                h: el?.offsetHeight || 42,
            };
        });

        setReady(true);

        // Animation frame loop with idle sleep
        let animId: number = 0;
        let isRunning = true;
        let idleFrames = 0;

        const tick = () => {
            if (!isRunning) return;
            Engine.update(engine, 1000 / 60);

            let hasMovement = false;

            for (let i = 0; i < stickerBodies.length; i++) {
                const body = stickerBodies[i];
                const el = stickerRefs.current[i];
                if (!el) continue;

                const { w, h } = stickerSizes[i];
                const x = body.position.x - w / 2;
                const y = body.position.y - h / 2;
                el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;

                if (
                    Math.abs(body.velocity.x) > 0.04 ||
                    Math.abs(body.velocity.y) > 0.04 ||
                    Math.abs(body.angularVelocity) > 0.008
                ) {
                    hasMovement = true;
                }
            }

            if (isDraggingRef.current || mouseConstraint.body) {
                hasMovement = true;
            }

            if (!hasMovement) {
                idleFrames++;
                // When stickers settle (after ~1.5s idle), stop the RAF loop to save CPU & GPU
                if (idleFrames > 90) {
                    animId = 0;
                    return;
                }
            } else {
                idleFrames = 0;
            }

            animId = requestAnimationFrame(tick);
        };

        const wakeUp = () => {
            idleFrames = 0;
            if (!animId && isRunning) {
                animId = requestAnimationFrame(tick);
            }
        };

        Matter.Events.on(mouseConstraint, "startdrag", wakeUp);
        Matter.Events.on(mouseConstraint, "mousedown", wakeUp);
        container.addEventListener("pointerdown", wakeUp, { passive: true });

        animId = requestAnimationFrame(tick);

        return () => {
            isRunning = false;
            cancelAnimationFrame(animId);
            container.removeEventListener("pointerdown", wakeUp);
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
                        {s.hasGreenLight && (
                            <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]"></span>
                            </span>
                        )}
                        {s.icon === "linkedin" && <LinkedInIcon className="w-[18px] h-[18px] shrink-0" />}
                        {s.icon === "github" && <GithubIcon className="w-[18px] h-[18px] shrink-0 fill-[#6366F1]" />}
                        <span>{s.label}</span>
                    </>
                );

                const zIndex = s.id === "open-work" ? "z-30" : "z-20";
                const commonClass =
                    `absolute top-0 left-0 bg-white select-none rounded-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-[15px] font-normal tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.14)] cursor-grab active:cursor-grabbing !transition-none will-change-transform ${zIndex}`;

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
