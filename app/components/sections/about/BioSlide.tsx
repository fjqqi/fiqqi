import { personal } from "@/app/data";
import { AboutPanelConfig } from "./types";

interface BioSlideProps {
  config: AboutPanelConfig;
}

export default function BioSlide({ config }: BioSlideProps) {
  return (
    <>
      {/* Tag */}
      <p className="text-[0.8rem] font-bold tracking-[0.18em] uppercase text-primary">
        {config.tag}
      </p>


      {/* Heading */}
      <h2 className="text-[clamp(2.4rem,5.2vw,4.2rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-foreground">
        {config.headingLeft}{" "}
        <span className="text-primary font-[900]">{config.headingRight}</span>
      </h2>


      {/* Bio Paragraphs */}
      <div className="flex flex-col gap-4 mt-1">
        <p className="text-[0.96rem] sm:text-[1.02rem] leading-[1.75] text-muted">
          I&apos;m Building etc,{" "}
          <strong className="text-foreground font-bold">
            Fresh Like an Apple.
          </strong>{" "}
          {personal.bio[0]}
        </p>
        <p className="text-[0.96rem] sm:text-[1.02rem] leading-[1.75] text-muted">
          {personal.bio[1]}
        </p>
      </div>
    </>
  );
}
