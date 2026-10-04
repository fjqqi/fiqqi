import Asterisk from "@/public/asterisk.svg"
import Image from "next/image"

export default function HeroText() {
    return (
        <div>
            {/* Mobile Layout (< md) */}
            <div className="flex md:hidden flex-col items-center text-center">
                <h1 className="text-[2.25rem] sm:text-[2.75rem] tracking-tighter leading-[1.15] font-normal flex flex-col items-center">
                    {/* Line 1: text */}
                    <span>I bring ideas to life</span>

                    {/* Line 2: avatar pill + through + asterisk */}
                    <div className="flex items-center justify-center gap-2.5 mt-2">
                        <div className="border border-black dark:border-white rounded-full w-24 h-11 bg-primary overflow-hidden flex items-center justify-center shrink-0">
                            {/* Pill container - ready for image/avatar */}
                        </div>
                        <span>through</span>
                        <div className="border border-black dark:border-white rounded-full w-11 h-11 flex items-center justify-center shrink-0">
                            <Image src={Asterisk} alt="" width={26} height={26} className="text-primary" />
                        </div>
                    </div>

                    {/* Line 3: italic serif "design" + & code. */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="italic font-serif text-[#3f6212] dark:text-lime-500">
                            design
                        </span>
                        <span>& code.</span>
                    </div>
                </h1>

                <h4 className="mt-5 text-[15px] sm:text-base leading-snug text-black/80 dark:text-white/80 max-w-[280px]">
                    making things for screens. sometimes with pixels, sometimes with code :3
                </h4>
            </div>

            {/* Desktop Layout (>= md) */}
            <div className="hidden md:block">
                <h1 className="text-[4rem] tracking-tighter leading-[1] font-normal">
                    {/* First line: text + pill */}
                    <div className="flex items-center gap-4">
                        <span>I bring ideas to life</span>
                        <div className="border border-black dark:border-white rounded-full w-36 h-16 bg-primary overflow-hidden flex items-center justify-center">
                            {/* Pill container - ready for image/avatar */}
                        </div>
                    </div>

                    {/* Second line: through + asterisk badge + italic serif "design" + & code. */}
                    <div className="flex items-center gap-4 mt-2">
                        <span>through</span>
                        <div className="border border-black dark:border-white rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                            <Image src={Asterisk} alt="" width={40} height={40} className="text-primary" />
                        </div>
                        <span className="italic font-serif text-[#3f6212] dark:text-lime-500">
                            design
                        </span>
                        <span>& code.</span>
                    </div>
                </h1>

                <h4 className="mt-6 text-lg">
                    making things for screens — sometimes with pixels, sometimes with code.
                </h4>
            </div>
        </div>
    );
}  
