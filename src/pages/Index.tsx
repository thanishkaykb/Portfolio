import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import FramesGallery from "@/components/FramesGallery";
import MilestonesSection from "@/components/MilestonesSection";
import GithubSection from "@/components/GithubSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Starfield from "@/components/Starfield";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <Starfield />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <FramesGallery />
        <MilestonesSection />
        <GithubSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
