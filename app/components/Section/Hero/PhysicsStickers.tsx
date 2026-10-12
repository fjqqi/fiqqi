"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useInView } from "framer-motion";
import { GithubIcon, LinkedInIcon, FacebookIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "@/app/components/Icons";

export interface StickerData {
    id: string;
    label: string;
    textColor: string;
    icon?: "linkedin" | "github" | "facebook" | "instagram" | "telegram" | "whatsapp";
    hasGreenLight?: boolean;
    href?: string;
}

export type StickerSize = "default" | "lg";

export const DEFAULT_HERO_STICKERS: StickerData[] = [
    {
        id: "linkedin",
        label: "LinkedIn",
        textColor: "text-[#0A66C2] dark:text-[#38bdf8]",
        icon: "linkedin",
        href: "https://linkedin.com",
    },
    {
        id: "github",
        label: "Github",
        textColor: "text-[#6366F1] dark:text-[#818cf8]",
        icon: "github",
        href: "https://github.com/fjqqi",
    },
    {
        id: "web-dev",
        label: "Web Developer",
        textColor: "text-black dark:text-zinc-100",
    },
    {
        id: "ui-ux",
        label: "UI / UX",
        textColor: "text-[#0066FF] dark:text-[#60a5fa]",
    },
    {
        id: "front-end",
        label: "Front - End",
        textColor: "text-black dark:text-zinc-100",
    },
    {
        id: "mobile-dev",
        label: "Mobile Developer",
        textColor: "text-black dark:text-zinc-100",
    },
    {
        id: "open-work",
        label: "Available for new project",
        textColor: "text-emerald-600 dark:text-emerald-400 font-medium",
        hasGreenLight: true,
    },
];

export interface PhysicsStickersProps {
    stickers?: StickerData[];
    floorOffset?: number;
    padding?: number;
    triggerOnScroll?: boolean;
    className?: string;
    size?: StickerSize;
}

export default function PhysicsStickers({
    stickers = DEFAULT_HERO_STICKERS,
    floorOffset = 148,
    padding = 20,
    triggerOnScroll = false,
    className = "",
    size = "default",
}: PhysicsStickersProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickerRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
    const [ready, setReady] = useState(false);
    const dragDistanceRef = useRef(0);
    const isDraggingRef = useRef(false);

    const isInView = useInView(containerRef, { once: true, margin: "-40px" });
    const shouldStart = triggerOnScroll ? isInView : true;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const { Engine, Bodies, Composite, Mouse, MouseConstraint } = Matter;

        // Snappy, energetic gravity with natural physical momentum
        const engine = Engine.create({
            gravity: { x: 0, y: 1.05, scale: 0.001 },
        });

        // If container is hidden (e.g. display:none or 0 dimensions), bail out immediately
        if (container.offsetWidth === 0 && container.offsetHeight === 0) return;

        const rect = container.getBoundingClientRect();
        const W = container.offsetWidth || rect.width || 340;
        const H = container.offsetHeight || rect.height || 360;
        const floorY = H - floorOffset;

        // Boundaries: walls inset by padding matching box padding; floor at bottom; perfectly slick walls
        const wallThickness = 60;
        const floor = Bodies.rectangle(W / 2, floorY + wallThickness / 2, W * 3, wallThickness, {
            isStatic: true,
            restitution: 0.1,
            friction: 0.3,
        });
        const leftWall = Bodies.rectangle(padding - wallThickness / 2, H / 2, wallThickness, H * 4, {
            isStatic: true,
            restitution: 0.1,
            friction: 0.0,
        });
        const rightWall = Bodies.rectangle((W - padding) + wallThickness / 2, H / 2, wallThickness, H * 4, {
            isStatic: true,
            restitution: 0.1,
            friction: 0.0,
        });
        const ceiling = Bodies.rectangle(W / 2, -1500, W * 3, 40, {
            isStatic: true,
        });

        Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

        // Shuffle stickers, keeping open-work at the end if present so it rests on top
        const openWorkIdx = stickers.findIndex((s) => s.id === "open-work");
        let dropOrder: number[];
        if (openWorkIdx !== -1) {
            const otherIndices = stickers.map((_, i) => i).filter((i) => i !== openWorkIdx);
            const shuffledOthers = otherIndices.sort(() => Math.random() - 0.5);
            dropOrder = [...shuffledOthers, openWorkIdx];
        } else {
            dropOrder = stickers.map((_, i) => i).sort(() => Math.random() - 0.5);
        }

        // Create sticker bodies
        const stickerBodies: Matter.Body[] = [];
        const isLg = size === "lg";
        const fallbackW = isLg ? 165 : 140;
        const fallbackH = isLg ? 50 : 42;

        stickers.forEach((item, index) => {
            const el = stickerRefs.current[index];
            const w = el ? el.offsetWidth : fallbackW;
            const h = el ? el.offsetHeight : fallbackH;

            // 8px physics gap: expand collision hull by 8px (4px on each side) so visible elements have an 8px gap/margin
            const bodyW = w + 8;
            const bodyH = h + 8;
            const radius = Math.min(bodyW, bodyH) / 2;

            // Ensure sticker spawns safely within the padded walls without clipping
            const minX = padding + bodyW / 2 + 2;
            const maxX = Math.max(minX, W - padding - bodyW / 2 - 2);

            // open-work drops centrally to cap the pile cleanly; others are randomly distributed
            const isTop = item.id === "open-work";
            const startX = isTop
                ? Math.max(minX, Math.min(maxX, W * 0.5 + (Math.random() - 0.5) * 20))
                : minX + Math.random() * (maxX - minX);

            // Snappy staggered drop height: brisk sequential cascade
            const dropRank = dropOrder.indexOf(index);
            const startY = -40 - dropRank * 48;

            // Subtle angle for open-work so it rests balanced; dynamic angle for others
            const randomAngle = isTop
                ? (Math.random() - 0.5) * 0.14
                : (Math.random() - 0.5) * 0.45;

            const body = Bodies.rectangle(startX, startY, bodyW, bodyH, {
                chamfer: { radius, quality: 8 },
                restitution: isTop ? 0.1 : 0.14,
                friction: 0.12,          // Slick dynamic friction
                frictionAir: 0.016,       // Crisp air resistance for responsive falling
                frictionStatic: 0.04,     // Very low static friction: prevents wedging or sticking
                density: 0.002,
                angle: randomAngle,
            });

            // Gentle tumbling spin and brisk initial downward momentum
            const randomSpin = isTop
                ? (Math.random() - 0.5) * 0.02
                : (Math.random() - 0.5) * 0.035;
            Matter.Body.setAngularVelocity(body, randomSpin);
            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.4, y: 0.6 });

            stickerBodies.push(body);
        });

        Composite.add(engine.world, stickerBodies);

        // Only attach mouse drag interaction on desktop (mouse/fine pointer)
        // This ensures mobile touch scrolling is NEVER hijacked or lagged
        const isFinePointer = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let mouseConstraint: Matter.MouseConstraint | null = null;

        if (isFinePointer) {
            const mouse = Mouse.create(container);
            mouse.element.removeEventListener("mousewheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);
            mouse.element.removeEventListener("DOMMouseScroll", (mouse as unknown as { mousewheel: EventListener }).mousewheel);

            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false },
                },
            });

            Composite.add(engine.world, mouseConstraint);

            Matter.Events.on(mouseConstraint, "startdrag", () => {
                dragDistanceRef.current = 0;
                isDraggingRef.current = false;
            });

            Matter.Events.on(mouseConstraint, "mousemove", () => {
                if (mouseConstraint?.body) {
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
        }

        // Cache sticker dimensions once to avoid layout thrashing during animation frames
        const stickerSizes = stickers.map((_, i) => {
            const el = stickerRefs.current[i];
            return {
                w: el?.offsetWidth || fallbackW,
                h: el?.offsetHeight || fallbackH,
            };
        });

        setReady(true);

        // Animation frame loop with reliable settle detection
        let animId: number = 0;
        let isRunning = true;
        let idleFrames = 0;

        const tick = () => {
            if (!isRunning) return;
            Engine.update(engine, 1000 / 60);

            let maxSpeed = 0;
            let allLanded = true;

            for (let i = 0; i < stickerBodies.length; i++) {
                const body = stickerBodies[i];
                const el = stickerRefs.current[i];
                if (!el) continue;

                const { w, h } = stickerSizes[i];
                const x = body.position.x - w / 2;
                const y = body.position.y - h / 2;
                el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${body.angle.toFixed(3)}rad)`;

                const speed = Math.hypot(body.velocity.x, body.velocity.y) + Math.abs(body.angularVelocity) * 15;
                if (speed > maxSpeed) {
                    maxSpeed = speed;
                }

                // Sticker has landed when it reaches the bottom pile region
                if (body.position.y < floorY - 140) {
                    allLanded = false;
                }
            }

            // Only enter idle state when ALL stickers have reached the bottom and stopped moving
            if (isDraggingRef.current || (mouseConstraint && mouseConstraint.body)) {
                idleFrames = 0;
            } else if (allLanded && maxSpeed < 0.2) {
                idleFrames++;
                // Stop loop once resting for 60 consecutive frames (~1s of stillness)
                if (idleFrames > 60) {
                    animId = 0;
                    return;
                }
            } else {
                idleFrames = 0;
            }

            animId = requestAnimationFrame(tick);
        };

        const wakeUp = () => {
            if (!isFinePointer) return; // Do not wake up on mobile touch
            idleFrames = 0;
            if (!animId && isRunning) {
                animId = requestAnimationFrame(tick);
            }
        };

        if (mouseConstraint) {
            Matter.Events.on(mouseConstraint, "startdrag", wakeUp);
            Matter.Events.on(mouseConstraint, "mousedown", wakeUp);
        }

        // Generous safety timeout: sleeps after 12 seconds if somehow not already settled
        const safetyTimeout = setTimeout(() => {
            if (animId) {
                cancelAnimationFrame(animId);
                animId = 0;
            }
        }, 12000);

        animId = requestAnimationFrame(tick);

        return () => {
            isRunning = false;
            clearTimeout(safetyTimeout);
            cancelAnimationFrame(animId);
            Composite.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [shouldStart]);

    const handleClick = (e: React.MouseEvent) => {
        if (isDraggingRef.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const isLg = size === "lg";
    const sizeClass = isLg
        ? "gap-2 sm:gap-2.5 px-5.5 sm:px-6.5 py-3 sm:py-3.5 text-[15.5px] sm:text-[17.5px] font-medium tracking-tight shadow-[0_5px_18px_rgba(0,0,0,0.16)] dark:shadow-[0_6px_22px_rgba(0,0,0,0.55)]"
        : "gap-1.5 px-5 py-2.5 text-[15px] font-normal tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.14)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.5)]";
    const iconClass = isLg ? "w-5 h-5 sm:w-[21px] sm:h-[21px] shrink-0" : "w-[18px] h-[18px] shrink-0";

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 pointer-events-auto overflow-hidden select-none ${className}`}
            style={{ touchAction: "pan-y" }}
        >
            {stickers.map((s, i) => {
                const content = (
                    <>
                        {s.hasGreenLight && (
                            <span className={`relative flex ${isLg ? "h-3.5 w-3.5" : "h-2.5 w-2.5"} items-center justify-center shrink-0`}>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className={`relative inline-flex rounded-full ${isLg ? "h-2.5 w-2.5" : "h-2 w-2"} bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]`}></span>
                            </span>
                        )}
                        {s.icon === "linkedin" && <LinkedInIcon className={iconClass} />}
                        {s.icon === "github" && <GithubIcon className={`${iconClass} fill-[#6366F1] dark:fill-[#818cf8]`} />}
                        {s.icon === "facebook" && <FacebookIcon className={`${iconClass} fill-[#1877F2] dark:fill-[#60a5fa]`} />}
                        {s.icon === "instagram" && <InstagramIcon className={`${iconClass} fill-[#E1306C] dark:fill-[#f472b6]`} />}
                        {s.icon === "telegram" && <TelegramIcon className={`${iconClass} fill-[#229ED9] dark:fill-[#38bdf8]`} />}
                        {s.icon === "whatsapp" && <WhatsappIcon className={`${iconClass} fill-[#25D366] dark:fill-[#4ade80]`} />}
                        <span>{s.label}</span>
                    </>
                );

                const zIndex = s.id === "open-work" ? "z-30" : "z-20";
                const commonClass =
                    `absolute top-0 left-0 bg-white dark:bg-zinc-900/90 text-black/80 shadow-lg font-mono tracking-tighter dark:text-zinc-100 border border-transparent dark:border-white/15 select-none rounded-full inline-flex items-center justify-center cursor-grab active:cursor-grabbing !transition-none will-change-transform ${sizeClass} ${zIndex}`;

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
                            style={{ touchAction: "pan-y" }}
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
                        style={{ touchAction: "pan-y" }}
                    >
                        {content}
                    </div>
                );
            })}
        </div>
    );
}
