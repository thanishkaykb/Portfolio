import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Slow-moving ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] top-[10%] left-[-10%] rounded-full bg-primary/[0.04] blur-[150px] animate-[drift-1_25s_ease-in-out_infinite]" />
        <div className="absolute w-[500px] h-[500px] top-[50%] right-[-10%] rounded-full bg-glow-secondary/[0.05] blur-[130px] animate-[drift-2_30s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] bottom-[10%] left-[30%] rounded-full bg-primary/[0.03] blur-[120px] animate-[drift-3_35s_ease-in-out_infinite]" />
        <div className="absolute w-[300px] h-[300px] top-[30%] left-[50%] rounded-full bg-glow-secondary/[0.03] blur-[100px] animate-[drift-4_20s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
