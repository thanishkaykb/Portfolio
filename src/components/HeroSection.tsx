import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import { RESUME_PATH, LINKS } from "@/data/content";
import { openExternalLink } from "@/lib/externalLink";
import portrait from "@/assets/thanishka-portrait.jpg";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden">
      {/* Editorial marginalia — pinned to the outer corners so it never overlaps the name */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <div className="absolute left-2 xl:left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 whitespace-nowrap">
            Chennai, India — 12.98° N, 80.22° E
          </p>
        </div>
        <div className="absolute right-2 xl:right-4 top-1/2 -translate-y-1/2 rotate-90 origin-right">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 whitespace-nowrap">
            Est. 2026 — Portfolio, Vol. 01
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
          <div>
            <motion.p {...fade(0.1)} className="editorial-label mb-6">
              Computer Science Engineering · Full-Stack &amp; Web Development
            </motion.p>

            <h1 className="font-display leading-[0.88] mb-8">
              <motion.span
                {...fade(0.2)}
                className="block text-[19vw] sm:text-[16vw] md:text-[12vw] lg:text-[7.5rem] xl:text-[9rem] text-foreground"
              >
                THANISHKA
              </motion.span>
              <motion.span
                {...fade(0.3)}
                className="block text-[19vw] sm:text-[16vw] md:text-[12vw] lg:text-[7.5rem] xl:text-[9rem] text-foreground"
              >
                YOGESH<span className="text-primary">.</span>
              </motion.span>
            </h1>

            <motion.p {...fade(0.45)} className="max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              I build thoughtful digital experiences, from intuitive interfaces to the systems that power them.
            </motion.p>

            <motion.p {...fade(0.55)} className="font-accent italic text-primary text-lg md:text-xl mb-5">
              Developer. Student. Experimenter.
            </motion.p>

            {/* Social icons */}
            <motion.div {...fade(0.6)} className="flex items-center gap-5 mb-10">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openExternalLink(LINKS.linkedin)}
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openExternalLink(LINKS.github)}
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
            </motion.div>

            <motion.div {...fade(0.65)} className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-[0.15em] hover:bg-accent transition-colors"
              >
                Explore My Work
              </a>
              <a
                href={RESUME_PATH}
                download="Thanishka_Yogesh_Resume.pdf"
                className="px-8 py-3.5 border border-border text-foreground font-body font-semibold text-sm uppercase tracking-[0.15em] hover:border-primary hover:text-primary transition-colors"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="font-accent italic text-lg text-muted-foreground hover:text-primary underline decoration-primary/40 underline-offset-8 transition-colors"
              >
                Let's Connect
              </a>
            </motion.div>
          </div>

          {/* Portrait with golden aura */}
          <motion.div
            {...fade(0.5)}
            className="relative mx-auto w-full max-w-sm lg:max-w-none flex justify-center lg:justify-end"
          >
            <img
              src={portrait}
              alt="Thanishka Yogesh"
              width={1024}
              height={1024}
              className="w-64 sm:w-80 lg:w-full max-w-md h-auto object-cover"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <p className="editorial-label !text-[9px]">Scroll</p>
        <div className="w-px h-10 bg-border" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
