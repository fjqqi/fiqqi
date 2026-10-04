import { ArrowDownRightIcon, ArrowUpRightIcon } from "../Icons";
import GreenCard from "./Hero/GreenCard";
import HeroText from "./Hero/HeroText";

export default function HeroSection() {
    return (
        <div className="w-full flex flex-col justify-between overflow-x-hidden">
            <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 text-black dark:text-white">
                <div className="flex-1 flex flex-col md:flex-row w-full justify-between items-center md:py-12 gap-0 md:gap-12">
                    {/* Top Content: HeroText + Mobile Buttons (fills viewport so GreenCard is 30% visible before scroll) */}
                    <div className="w-full md:w-auto flex flex-col items-center md:items-start justify-center min-h-[calc(100dvh-135px-5rem)] md:min-h-0 py-6 md:py-0">
                        <HeroText />

                        {/* Mobile Buttons: shown only on mobile between text and green card */}
                        <div className="flex md:hidden items-center justify-center gap-2.5 sm:gap-4 w-full max-w-[340px] mt-6">
                            <div className="flex-1 py-2.5 px-3 flex items-center justify-center font-light tracking-wider gap-1.5 rounded-full border border-black/80 dark:border-white/80 text-[12px] sm:text-[13px] bg-white dark:bg-zinc-900 shadow-sm cursor-pointer hover:bg-zinc-50 transition-colors">
                                <h1>SAY HELLO</h1>
                                <ArrowDownRightIcon className="w-3.5 h-3.5 shrink-0" />
                            </div>
                            <div className="flex-1 py-2.5 px-3 flex items-center justify-center font-light tracking-wider gap-1.5 rounded-full border border-black/80 dark:border-white/80 text-[12px] sm:text-[13px] bg-white dark:bg-zinc-900 shadow-sm cursor-pointer hover:bg-zinc-50 transition-colors">
                                <h1>SELECTED WORK</h1>
                                <ArrowDownRightIcon className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Green Card Container: peeks 30% (135px) on mobile at the bottom before scrolling */}
                    <div className="w-full md:w-auto flex justify-center pb-12 md:pb-0">
                        <GreenCard />
                    </div>
                </div>
            </main>

            <div className="w-full h-[1px] bg-black/15 dark:bg-white/15"></div>

            <div className="bottomHero max-w-7xl mx-auto w-full py-6 md:py-8 px-6 sm:px-12 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-black text-sm tracking-tighter dark:text-white text-center sm:text-left">
                    based in makassar, indonesia
                </h1>

                {/* Desktop Buttons (hidden on mobile, where they appear above GreenCard) */}
                <div className="hidden md:flex items-center gap-2">
                    <div className="px-4 py-2 flex items-center font-light tracking-widest gap-2 rounded-full justify-center border border-black/80 dark:border-white/80 cursor-pointer">
                        <h1>SAY HELLO</h1>
                        <ArrowUpRightIcon className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="px-4 py-2 flex items-center font-light tracking-widest gap-2 rounded-full justify-center border border-black/80 dark:border-white/80 cursor-pointer">
                        <h1>SELECTED WORK</h1>
                        <ArrowUpRightIcon className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}