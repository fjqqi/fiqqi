import { personal } from "@/app/data";

export interface AboutPanelConfig {
  id: "bio" | "speciality" | "experience";
  tag: string;
  headingLeft: string;
  headingRight: string;
  photo: string;
}

export const ABOUT_PANELS: AboutPanelConfig[] = [
  {
    id: "bio",
    tag: "ABOUT ME",
    headingLeft: "Hi, I'm",
    headingRight: personal.name,
    photo: "/about pics/first.png",
  },
  {
    id: "speciality",
    tag: "ABOUT ME",
    headingLeft: "My",
    headingRight: "Speciality",
    photo: "/about pics/second.png",
  },
  {
    id: "experience",
    tag: "ABOUT ME",
    headingLeft: "My",
    headingRight: "Experience",
    photo: "/about pics/third.png",
  },
];
