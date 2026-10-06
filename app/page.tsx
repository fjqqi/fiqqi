import HeroSection from "./components/Section/Hero";
import Navbar from "./components/Navbar";
import ApproachSection from "./components/Section/Approach";



import Image from "next/image";
import ServicesSection from "./components/Section/Services";
import SecTitle from "./components/ui/SecTitle";
import ProjectsSection from "./components/Section/Projects";



export default function Home() {
  return (
    <>

      <Navbar></Navbar>


      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full min-h-screen pt-20 md:pt-24 text-black dark:text-white">
        <HeroSection />
        <ApproachSection />

        <ProjectsSection />
        <ServicesSection />








      </div>
    </>
  );
}
