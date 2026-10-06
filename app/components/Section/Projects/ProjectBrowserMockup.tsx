import Image from "next/image";

interface ProjectBrowserMockupProps {
    image: string;
    title: string;
    priority?: boolean;
}

export default function ProjectBrowserMockup({
    image,
    title,
    priority = false,
}: ProjectBrowserMockupProps) {
    return (
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xs transition-shadow duration-300">
            {/* Browser Top Window Bar */}
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 sm:py-3 bg-white/10 border-b border-white/15 backdrop-blur-xs select-none">
                <span className="w-2 h-2 rounded-full bg-white/45 inline-block" />
                <span className="w-2 h-2 rounded-full bg-white/45 inline-block" />
                <span className="w-2 h-2 rounded-full bg-white/45 inline-block" />
            </div>

            {/* Screen Viewport with Website Screenshot */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden bg-black/25">
                <Image
                    src={image}
                    alt={`${title} project preview`}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 540px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    priority={priority}
                />
            </div>
        </div>
    );
}
