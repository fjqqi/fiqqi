"use client";

import { motion, type Variants } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import ExperienceSection from "./components/ExperienceSection";
import SecTitle from "../components/ui/SecTitle";
import GetToKnowMe from "./components/GetToKnowMe";
import ContactSection from "../components/Section/Contact";
import EducationSection from "./components/EducationSection";
import Footer from "../components/Footer";


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

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main
                id="main-content"
                className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 overflow-x-hidden"
            >
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-24 sm:pt-28 md:pt-40 pb-8 md:pb-12 flex flex-col"
                >
                    {/* Section 01: Header */}
                    <motion.div variants={sectionItemVariants}>
                        <SecTitle
                            number="01"
                            title="Get To Know Me"
                            subtitle="経歴"
                            mb="mb-4 sm:mb-6 md:mb-10"
                        />
                    </motion.div>

                    {/* Section 01: Content */}
                    <motion.div variants={sectionItemVariants}>
                        <GetToKnowMe />
                    </motion.div>

                    {/* Section 02: Experience */}
                    <motion.div variants={sectionItemVariants}>
                        <ExperienceSection />
                    </motion.div>

                    {/* Section 03: Education */}
                    <motion.div variants={sectionItemVariants}>
                        <EducationSection />
                    </motion.div>
                </motion.div>

                {/* Section 04: Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full pb-8 md:pb-16"
                >
                    <ContactSection />
                </motion.div>
            </main>

            <Footer />
        </>
    );
}
