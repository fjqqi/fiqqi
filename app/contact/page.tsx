"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SecTitle from "@/app/components/ui/SecTitle";
import PageHeroHeader, { type MetaStatItem } from "@/app/components/ui/PageHeroHeader";
import { ArrowDownRightIcon } from "@/app/components/Icons";
import Button from "@/app/components/ui/Button";

const CONTACT_STATS: MetaStatItem[] = [
    { label: "STATUS", value: "Open To New Project" },
    { label: "RESPONSE", value: "< 10 Hours" },
];

const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.05,
        },
    },
};

const maskItemVariants: Variants = {
    hidden: {
        y: "120%",
        opacity: 0,
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            duration: 1.15,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const sectionItemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const BUDGET_OPTIONS = [
    "< Rp.200.000",
    "Rp.200.000 - Rp.500.000",
    "Rp.500.000 - Rp.2.000.000",
    "> Rp.2.000.000",
    "LET'S DISCUSS",
];

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Project Inquiry from ${name || "Client"}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nBudget: ${selectedBudget || "Not specified"}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:faqihzaky43@gmail.com?subject=${subject}&body=${body}`;

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <>
            <Navbar />

            <main
                id="main-content"
                className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 overflow-x-clip"
            >
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-24 sm:pt-28 md:pt-40 pb-8 md:pb-12 flex flex-col"
                >
                    {/* Section 01: Header */}
                    <div className="overflow-hidden pb-1 -mb-1">
                        <motion.div variants={maskItemVariants}>
                            <SecTitle
                                number="01"
                                title="Contact"
                                subtitle={
                                    <span className="w-6 h-[3px] bg-primary dark:bg-lime-600 inline-block rounded-full align-middle" />
                                }
                                mb="mb-4 sm:mb-6 md:mb-10"
                            />
                        </motion.div>
                    </div>

                    {/* Dynamic Hero Header (consistent in sizing & animation with About) */}
                    <motion.div variants={sectionItemVariants}>
                        <PageHeroHeader
                            titlePrefix="Get In"
                            titleHighlight="Touch"
                            description="Tell me about the project — I usually reply the same day"
                            stats={CONTACT_STATS}
                        />
                    </motion.div>

                    {/* Form + Direct Channels Content Grid (matching About's 12-col grid & sizing) */}
                    <motion.div
                        variants={sectionItemVariants}
                        className="grid grid-cols-1 md:grid-cols-12 mt-6 sm:mt-10 md:mt-16 gap-6 sm:gap-8 md:gap-12 items-start pb-8 sm:pb-12 md:pb-16"
                    >
                        {/* Left Column: Form Card */}
                        <div className="md:col-span-7 w-full bg-[#f6f6f6] dark:bg-zinc-900/60   p-6 sm:p-10 md:p-12   transition-colors">
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                {/* Field: NAME */}
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="contact-name"
                                        className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-1 sm:mb-2"
                                    >
                                        NAME
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="What should I call you"
                                        required
                                        className="w-full bg-transparent border-b border-black/15 dark:border-white/15 pb-3 sm:pb-4 text-sm sm:text-base text-black dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                    />
                                </div>

                                {/* Field: EMAIL */}
                                <div className="flex flex-col mt-6 sm:mt-8 md:mt-10">
                                    <label
                                        htmlFor="contact-email"
                                        className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-1 sm:mb-2"
                                    >
                                        EMAIL
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        required
                                        className="w-full bg-transparent border-b border-black/15 dark:border-white/15 pb-3 sm:pb-4 text-sm sm:text-base text-black dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                    />
                                </div>

                                {/* Field: BUDGET */}
                                <div className="flex flex-col mt-6 sm:mt-8 md:mt-10">
                                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-2 sm:mb-3">
                                        BUDGET
                                    </span>
                                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                        {BUDGET_OPTIONS.map((option) => (
                                            <Button
                                                key={option}
                                                type="button"
                                                variant="toggle"
                                                size="sm"
                                                isActive={selectedBudget === option}
                                                onClick={() =>
                                                    setSelectedBudget(selectedBudget === option ? null : option)
                                                }
                                            >
                                                {option}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Field: MESSAGE */}
                                <div className="flex flex-col mt-6 sm:mt-8 md:mt-10">
                                    <label
                                        htmlFor="contact-message"
                                        className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-1 sm:mb-2"
                                    >
                                        MESSAGE
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={3}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="A few words about the project, timeline and goals"
                                        required
                                        className="w-full bg-transparent border-b border-black/15 dark:border-white/15 pb-3 sm:pb-4 text-sm sm:text-base text-black dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6 sm:pt-8 md:pt-10 flex items-center gap-4">
                                    <Button type="submit" icon={<ArrowDownRightIcon className="w-3.5 h-3.5" />}>
                                        SEND
                                    </Button>

                                    {submitted && (
                                        <span className="text-xs text-primary dark:text-lime-500 font-mono tracking-wider">
                                            Opening email client...
                                        </span>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Direct Channels & Resume */}
                        <div className="md:col-span-5 w-full flex flex-col space-y-6 sm:space-y-8">
                            {/* Direct Channels Card */}
                            <div className="bg-primary dark:bg-primary text-white  p-6 sm:p-8 shadow-sm">
                                <h3 className="  tracking-tighter  font-normal text-white">
                                    Direct Channels
                                </h3>

                                <div className="w-full h-px bg-white/20 mt-3 sm:mt-4 mb-3 sm:mb-4" />

                                <div className="flex flex-col space-y-4 sm:space-y-5">
                                    {/* Email */}
                                    <div className="flex flex-col">
                                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/60 mb-1">
                                            EMAIL
                                        </span>
                                        <a
                                            href="mailto:faqihzaky43@gmail.com"
                                            className="text-sm sm:text-base md:text-lg font-normal text-white hover:underline transition-all block break-all"
                                        >
                                            faqihzaky43@gmail.com
                                        </a>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex flex-col">
                                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/60 mb-1">
                                            PHONE
                                        </span>
                                        <a
                                            href="tel:+62085791290386"
                                            className="text-sm sm:text-base md:text-lg font-normal text-white hover:underline transition-all block"
                                        >
                                            (+62) 085791290386
                                        </a>
                                    </div>

                                    {/* Telegram */}
                                    <div className="flex flex-col">
                                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/60 mb-1">
                                            TELEGRAM
                                        </span>
                                        <a
                                            href="https://t.me/sawitbukanpohon"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm sm:text-base md:text-lg font-normal text-white hover:underline transition-all block"
                                        >
                                            @sawitbukanpohon
                                        </a>
                                    </div>

                                    {/* GitHub */}
                                    <div className="flex flex-col">
                                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/60 mb-1">
                                            GITHUB
                                        </span>
                                        <a
                                            href="https://github.com/fjqqi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm sm:text-base md:text-lg font-normal text-white hover:underline transition-all block"
                                        >
                                            @fjqqi
                                        </a>
                                    </div>

                                    {/* Instagram */}
                                    <div className="flex flex-col">
                                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/60 mb-1">
                                            INSTAGRAM
                                        </span>
                                        <a
                                            href="https://instagram.com/fjqqi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm sm:text-base md:text-lg font-normal text-white hover:underline transition-all block"
                                        >
                                            @fjqqi
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Resume Download CV Section */}
                            <div className="flex flex-col items-start pt-1">
                                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-2">
                                    RESUME
                                </span>
                                <Button
                                    href="https://drive.google.com/file/d/12Wn6d5WhnpKf5145MKd29kVlEg5oSRzN/view?usp=drive_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    icon={<ArrowDownRightIcon className="w-3.5 h-3.5" />}
                                >
                                    DOWNLOAD CV
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </>
    );
}
