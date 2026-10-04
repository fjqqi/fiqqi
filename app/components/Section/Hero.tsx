import Asterisk from "@/public/asterisk.svg"
import Image from "next/image"
import HeroText from "./Hero/HeroText";
import SpotifyCard from "./Hero/SpotifyCard";


export default function HeroSection() {
    return (
        <main className=" w-full max-w-7xl  px-16 bg-white dark:bg-black sm:items-start">

            <div className="flex w-full justify-between">
                <div className="mt-10">
                    <HeroText />
                </div>

                <div className="flex p-4 w-[340px] justify-end flex-col rounded-[28px] h-[440px] bg-primary">
                    <SpotifyCard />

                </div>
            </div>


        </main>
    );
}