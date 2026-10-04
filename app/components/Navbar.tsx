"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./Icons";

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

export default function Navbar() {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 md:px-16 lg:px-24 border-b border-black/15 dark:border-white/15 bg-white/80 dark:bg-black/80 backdrop-blur-sm py-4 md:py-6  transition-colors duration-200 flex justify-center">
            <div className="flex justify-between items-center w-full max-w-6xl">
                <h1 className="text-primary font-bold text-2xl tracking-tighter">ぴき.</h1>

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

                    {/* Say Hello Button (Desktop) */}
                    <div className="hidden md:flex items-center gap-2">
                        <div className="px-4 py-2 flex items-center font-light tracking-widest gap-2 rounded-full justify-center border border-black/80 dark:border-white/80 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
                            <h1>SAY HELLO</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}