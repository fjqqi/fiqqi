"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";

export type ButtonVariant = "outline" | "solid" | "toggle" | "subtle";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonBaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isActive?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
    children: React.ReactNode;
}

export type ButtonAsButton = ButtonBaseProps &
    Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps> & {
        href?: undefined;
    };

export type ButtonAsLink = ButtonBaseProps &
    Omit<HTMLMotionProps<"a">, keyof ButtonBaseProps> & {
        href: string;
        target?: string;
        rel?: string;
    };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, (isActive?: boolean) => string> = {
    outline: () =>
        "border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-transparent",
    solid: () =>
        "border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm",
    toggle: (isActive) =>
        isActive
            ? "border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-sm"
            : "border border-black/20 dark:border-white/20 text-black/75 dark:text-white/75 hover:border-black/60 dark:hover:border-white/60 bg-transparent",
    subtle: () =>
        "border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white backdrop-blur-xs",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3.5 py-1.5 text-[11px] sm:text-xs",
    md: "px-5 py-2.5 text-[11px] sm:text-xs",
    lg: "px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm",
};

const MotionLink = motion.create(Link);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    function Button(props, ref) {
        const {
            variant = "outline",
            size = "md",
            isActive = false,
            icon,
            iconPosition = "right",
            className = "",
            children,
            href,
            ...rest
        } = props;

        const baseClasses =
            "rounded-full uppercase font-medium tracking-wider inline-flex items-center justify-center gap-2 select-none cursor-pointer transition-colors duration-200 outline-none";
        const variantClass = variantStyles[variant](isActive);
        const sizeClass = sizeStyles[size];
        const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();

        const content = (
            <>
                {icon && iconPosition === "left" && (
                    <span className="shrink-0 flex items-center justify-center">{icon}</span>
                )}
                <span>{children}</span>
                {icon && iconPosition === "right" && (
                    <span className="shrink-0 flex items-center justify-center">{icon}</span>
                )}
            </>
        );

        if (href) {
            const isExternal =
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("#");

            const motionLinkProps = rest as HTMLMotionProps<"a">;

            if (isExternal) {
                return (
                    <motion.a
                        ref={ref as React.Ref<HTMLAnchorElement>}
                        href={href}
                        whileHover={{ scale: 1.025 }}
                        whileTap={{ scale: 0.97 }}
                        className={combinedClasses}
                        {...motionLinkProps}
                    >
                        {content}
                    </motion.a>
                );
            }

            return (
                <MotionLink
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={href}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.97 }}
                    className={combinedClasses}
                    {...motionLinkProps}
                >
                    {content}
                </MotionLink>
            );
        }

        const motionButtonProps = rest as HTMLMotionProps<"button">;

        return (
            <motion.button
                ref={ref as React.Ref<HTMLButtonElement>}
                type={motionButtonProps.type ?? "button"}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                className={combinedClasses}
                {...motionButtonProps}
            >
                {content}
            </motion.button>
        );
    }
);

export default Button;
