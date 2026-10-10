import HeroSection from "./components/Section/Hero";
import Navbar from "./components/Navbar";
import ApproachSection from "./components/Section/Approach";
import ProjectsSection from "./components/Section/Projects";
import NumbersSection from "./components/Section/Numbers";
import ServicesSection from "./components/Section/Services";
import ContactSection from "./components/Section/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full min-h-screen pt-20 md:pt-[5.5rem] text-black dark:text-white">
        <HeroSection />
        <ApproachSection />
        <ProjectsSection />
        <NumbersSection />
        <ServicesSection />
        <ContactSection />
      </div>

      <Footer />
    </>
  );
}
