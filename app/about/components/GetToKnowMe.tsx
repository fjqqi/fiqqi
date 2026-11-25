"use client";

import Image from "next/image";
import MePic from "@/public/me.webp";
import { motion, type Variants } from "framer-motion";
import PageHeroHeader, { type MetaStatItem } from "@/app/components/ui/PageHeroHeader";
import Button from "@/app/components/ui/Button";
import { ArrowDownRightIcon } from "@/app/components/Icons";
import { useLanguage } from "@/app/context/LanguageContext";
import profile from "@/app/data/profile.json";

const ABOUT_STATS_EN: MetaStatItem[] = [
    { label: "BASED IN", value: "Makassar, INA" },
    { label: "EXPERIENCE", value: "Since 2022" },
    { label: "LANGUAGE", value: "INDO - ENG C1" },
];

const ABOUT_STATS_ID: MetaStatItem[] = [
    { label: "LOKASI", value: "Makassar, INA" },
    { label: "PENGALAMAN", value: "Sejak 2022" },
    { label: "BAHASA", value: "INDO - ENG C1" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.16,
            delayChildren: 0.1,
        },
    },
};

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function GetToKnowMe() {
    const { language } = useLanguage();
    const stats = language === "id" ? ABOUT_STATS_ID : ABOUT_STATS_EN;
    const description =
        language === "id"
            ? "Halo, saya Fiqqi. Saya seorang Frontend Web Developer"
            : "Hi. Im Fiqqi Im a Frontend Web Developer";

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            {/* Dynamic Page Hero Header matching Contact */}
            <PageHeroHeader
                titlePrefix="About"
                titleHighlight="Me"
                description={description}
                stats={stats}
            />

            {/* Photo + 3 Paragraphs Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 mt-6 sm:mt-10 md:mt-16 gap-6 sm:gap-8 md:gap-12 items-start pb-8 sm:pb-12 md:pb-16">
                {/* Left Column: Photo */}
                <motion.div variants={imageVariants} className="md:col-span-5 w-full">
                    <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-sm">
                        <Image
                            src={MePic}
                            alt="Fiqqi"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 42vw"
                            className="object-cover contrast-[1.05]"
                        />
                    </div>
                </motion.div>

                {/* Right Column: Bio Paragraphs + 3 Buttons */}
                <motion.div
                    variants={fadeUpVariants}
                    className="md:col-span-7 flex flex-col h-full space-y-4"
                >
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] dark:text-zinc-300 font-light">
                        I’m Fiqqi, a web developer and UI/UX designer based in Makassar, Indonesia. I build digital experiences that combine thoughtful design, intuitive interfaces, and functional development. I care about creating websites that not only look good but also perform well, load fast, and are optimized for search engines (SEO).
                    </p>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] dark:text-zinc-300 font-light">
                        Right now, I’m a freelance web developer at{" "}
                        <a
                            href="https://makassarwebsite.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 text-primary dark:text-lime-500 hover:opacity-80 transition-opacity"
                        >
                            makassarwebsite.com
                        </a>
                        , building and designing frontend interfaces and custom web applications using modern technologies. I work across the entire process, from translating ideas and business requirements into visual interfaces to developing responsive, functional, and user-friendly websites.
                    </p>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] dark:text-zinc-300 font-light">
                        I’m a fresh graduate in Software Engineering from Universitas Dipa Makassar, with hands-on experience working on web development and UI/UX projects for different clients and industries.
                    </p>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] dark:text-zinc-300 font-light">
                        I love building and exploring aesthetic websites, experimenting with layouts, typography, interactions, and visual details. I’m always curious about how design and technology can come together to create meaningful digital experiences.
                    </p>

                    {/* Button Pills Row */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
                        <Button href="/contact" icon={<ArrowDownRightIcon className="w-3.5 h-3.5" />}>
                            CONTACT
                        </Button>

                        <Button
                            href={`mailto:${profile.email}?subject=Hire%20Inquiry`}
                            icon={<ArrowDownRightIcon className="w-3.5 h-3.5" />}
                        >
                            HIRE ME
                        </Button>

                        <Button
                            href={language === "id" ? profile.cv.id : profile.cv.en}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={<ArrowDownRightIcon className="w-3.5 h-3.5" />}
                        >
                            DOWNLOAD CV
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
