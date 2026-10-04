import Asterisk from "@/public/asterisk.svg"
import Image from "next/image"

export default function HeroText() {
    return <>
        <div>
            <h1 className="text-[4rem] tracking-tight leading-[1] font-normal">
                {/* First line: text + pill */}
                <div className="flex items-center gap-4">
                    <span>I bring ideas to life</span>
                    <div className="border border-black dark:border-white rounded-full w-36 h-16 bg-green-500 overflow-hidden flex items-center justify-center">
                        {/* Pill container - ready for image/avatar */}
                    </div>
                </div>

                {/* Second line: through + asterisk badge + italic serif "design" + & code. */}
                <div className="flex items-center gap-4 mt-2">
                    <span>through</span>
                    <div className="border border-black dark:border-white rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                        <Image src={Asterisk} alt="" width={40} height={40}></Image>
                    </div>
                    <span className="italic font-serif text-[#3f6212] dark:text-lime-500">
                        design
                    </span>
                    <span>& code.</span>
                </div>
            </h1>

            <h4 className="mt-6 text-xl">
                making things for screens — sometimes with pixels, sometimes with code.
            </h4>
        </div>
    </>
}  
