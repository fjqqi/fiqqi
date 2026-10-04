import { ArrowUpRightIcon } from "@/app/components/Icons";
import SpotifyCard from "./SpotifyCard";
import PhysicsStickers from "./PhysicsStickers";

export default function GreenCard() {
    return (
        <div className="relative w-full h-[360px] md:w-[340px] md:h-[450px] p-3.5 rounded-[34px] bg-primary flex flex-col justify-end overflow-hidden shadow-sm">
            {/* Interactive Physics Stickers with 4px Gap */}
            <PhysicsStickers />

            {/* Bottom Row: Spotify Card + Diagonal Arrow Button */}
            <div className="relative z-10 flex items-end gap-2 w-full">
                <div className="flex-1 min-w-0">
                    <SpotifyCard />
                </div>

                <a
                    href="#about"
                    aria-label="Open"
                    className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95 transition-all text-black group"
                >
                    <ArrowUpRightIcon className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
            </div>
        </div>
    );
}