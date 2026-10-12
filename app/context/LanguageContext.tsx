"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "id";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {},
    toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        try {
            const saved = localStorage.getItem("language") as Language | null;
            if (saved === "en" || saved === "id") {
                setLanguageState(saved);
            }
        } catch {
            // Ignore storage errors in restricted contexts
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        try {
            localStorage.setItem("language", lang);
        } catch {
            // Ignore
        }
    };

    const toggleLanguage = () => {
        const next = language === "en" ? "id" : "en";
        setLanguage(next);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
