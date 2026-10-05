"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./Icons";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
    window.addEventListener("storage", callback);
    return () => {
        observer.disconnect();
        window.removeEventListener("storage", callback);
    };
}

function getSnapshot(): "light" | "dark" {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
    return "light";
}

const NAV_LINKS = [
    { label: "WORK", href: "/work" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [isOpen, setIsOpen] = useState(false);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    // Close mobile menu on resize to desktop width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-black/15 dark:border-white/15 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-200">
            <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-4 md:py-6 flex justify-center">
                <div className="flex justify-between items-center w-full max-w-6xl">
                    <Link href="/" className="text-primary font-bold text-2xl tracking-tighter">
                        ぴき.
                    </Link>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex gap-10 text-black dark:text-white tracking-widest font-light text-sm">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="hover:text-primary transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3">
                        {/* Light / Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            type="button"
                            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                            className="w-10 h-10 rounded-full border border-black/15 dark:border-white/20 bg-white/70 dark:bg-zinc-900/70 flex items-center justify-center text-black dark:text-white hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                        >
                            {theme === "dark" ? (
                                <SunIcon className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
                            ) : (
                                <MoonIcon className="w-5 h-5 text-zinc-700 transition-transform duration-200 hover:-rotate-12" />
                            )}
                        </button>

                        {/* Hamburger Button (Mobile only) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            className="md:hidden w-10 h-10 rounded-full border border-black/15 dark:border-white/20 bg-white/70 dark:bg-zinc-900/70 flex flex-col items-center justify-center gap-1 text-black dark:text-white hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-4 h-[1.5px] bg-current block origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.15 }}
                                className="w-4 h-[1.5px] bg-current block"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-4 h-[1.5px] bg-current block origin-center"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden overflow-hidden border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-xl"
                    >
                        <div className="px-6 sm:px-12 py-6">
                            <motion.ul
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: {
                                        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                                    },
                                    closed: {
                                        transition: { staggerChildren: 0.04, staggerDirection: -1 },
                                    },
                                }}
                                className="flex flex-col gap-4 text-black dark:text-white tracking-widest font-light text-base"
                            >
                                {NAV_LINKS.map((link) => (
                                    <motion.li
                                        key={link.href}
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -8 },
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block py-1 hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}