import type { ReactNode } from "react";

interface SecTitleProps {
    title: string;
    subtitle?: ReactNode;
    number?: string;
    className?: string;
    mb?: string;
}

export default function SecTitle({
    title,
    subtitle,
    number = "01",
    className = "",
    mb = "mb-6 md:mb-12",
}: SecTitleProps) {
    return (
        <div className={`w-full ${className}`.trim()}>
            <section className="text-black dark:text-white">
                <div
                    className={`sectionTittle flex justify-between ${mb} pb-4 border-b border-black/15 dark:border-white/15`}
                >
                    <h2 className="text-lg tracking-tighter">
                        <span className="font-bold mr-3 text-primary dark:text-lime-600">{number}</span>
                        {title}
                    </h2>
                    <span className="font-semibold">{subtitle}</span>
                </div>
            </section>
        </div>
    );
}