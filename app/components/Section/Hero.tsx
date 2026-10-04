import Asterisk from "@/public/asterisk.svg"
import Image from "next/image"
import HeroText from "./Hero/HeroText";


export default function HeroSection() {
    return (
        <main className=" w-full max-w-7xl  px-16 bg-white dark:bg-black sm:items-start">

            <div className="flex w-full justify-between">
                <div className="mt-10">
                    <HeroText />
                </div>

                <div className="flex p-4 w-[340px] justify-end flex-col rounded-[28px] h-[440px] bg-primary">
                    <div className="spotifyCard   w-56 bg-white flex-col flex h-fit p-2 rounded-xl">
                        <div className="flex">
                            <div className="albumCover w-12 h-12 bg-black rounded-lg"></div>
                            <div className="ml-2 mt-[2px] ">
                                <div className="text-sm  flex gap-2 ">
                                    <span className="">Title</span>
                                    <span>•</span>
                                    <span className="">Artist</span>
                                </div>
                                <span className="text-xs text-gray-500">Now Listening</span>
                            </div>
                        </div>

                        <div className="timeStamp mt-2">
                            <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                        </div>

                    </div>

                </div>
            </div>


        </main>
    );
}