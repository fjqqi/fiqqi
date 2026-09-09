import { skills } from "@/app/data";
import { AboutPanelConfig } from "./types";

interface ExperienceSlideProps {
  config: AboutPanelConfig;
  setBarRef: (index: number, el: HTMLDivElement | null) => void;
}

export default function ExperienceSlide({ config, setBarRef }: ExperienceSlideProps) {
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

      {/* Experience / Skills Bars */}
      <div className="flex flex-col gap-3.5 w-full mt-1">
        {skills.map((skill, j) => (
          <div key={skill.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline text-[0.88rem] sm:text-[0.92rem]">
              <span className="font-semibold text-foreground">{skill.name}</span>
              <span className="font-medium text-muted-light">{skill.level}%</span>
            </div>
            {/* Track */}
            <div className="h-[4px] rounded-full bg-skill-bg overflow-hidden">
              <div
                ref={(el) => setBarRef(j, el)}
                data-width={`${skill.level}%`}
                className="h-full rounded-full bg-primary"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
