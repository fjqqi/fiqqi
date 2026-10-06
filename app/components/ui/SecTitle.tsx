export default function SecTitle(props: { title: string; subtitle: string; number?: string }) {
    return (
        <div className="w-full">
            <section className="text-black dark:text-white">
                <div className="sectionTittle flex justify-between mb-6 md:mb-12 pb-4 border-b border-black/15 dark:border-white/15">
                    <h2 className="text-lg tracking-tighter">
                        <span className="font-bold mr-3 text-primary">{props.number || "01"}</span>
                        {props.title}
                    </h2>
                    <span className="font-semibold">{props.subtitle}</span>
                </div>
            </section>
        </div>
    );
}