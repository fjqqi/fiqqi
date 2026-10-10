import React from "react";

interface StickerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    href?: string;
    target?: string;
    rel?: string;
}

export default function Sticker({
    children,
    className = "",
    href,
    target,
    rel,
    ...props
}: StickerProps) {
    const baseClasses =
        "absolute bg-white dark:bg-zinc-900/90 text-black dark:text-zinc-100 border border-transparent dark:border-white/15 select-none rounded-full transition-all duration-200 hover:scale-105 hover:z-30 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-[16px] tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.14)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.5)]";

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                className={`${baseClasses} cursor-pointer ${className}`}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </a>
        );
    }

    return (
        <div
            className={`${baseClasses} cursor-default ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
