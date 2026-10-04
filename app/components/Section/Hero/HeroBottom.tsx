import { ArrowUpRightIcon } from "../../Icons"


export default function HeroBottom() {
    return (
        <>
            <div className="w-full h-[1px] bg-black/15 dark:bg-white/15"></div>

            <div className="bottomHero  text-black dark:text-white max-w-7xl mx-auto w-full py-6 md:py-8 px-6 sm:px-12 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className=" text-sm tracking-tighter text-center sm:text-left">
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
        </>
    )
}