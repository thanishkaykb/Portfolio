import { motion } from "framer-motion";
import { RESUME_PATH } from "@/data/content";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden">
      {/* Editorial marginalia */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <div className="absolute left-12 xl:left-32 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 whitespace-nowrap">
            Chennai, India — 12.98° N, 80.22° E
          </p>
        </div>
        <div className="absolute right-12 xl:right-32 top-1/2 -translate-y-1/2 rotate-90 origin-right">
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 whitespace-nowrap">
            Est. 2026 — Portfolio, Vol. 01
          </p>
        </div>
        <div className="absolute top-28 left-1/2 w-px h-24 bg-border" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.p {...fade(0.1)} className="editorial-label mb-6">
          Computer Science Engineering · Full-Stack &amp; Web Development
        </motion.p>

        <h1 className="font-display leading-[0.88] mb-8">
          <motion.span
            {...fade(0.2)}
            className="block text-[19vw] md:text-[13vw] lg:text-[10rem] text-foreground"
          >
            THANISHKA
          </motion.span>
          <motion.span
            {...fade(0.3)}
            className="block text-[19vw] md:text-[13vw] lg:text-[10rem] text-foreground"
          >
            YOGESH<span className="text-primary">.</span>
          </motion.span>
        </h1>

        <motion.p {...fade(0.45)} className="max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
          I build thoughtful digital experiences, from intuitive interfaces to the systems that power them.
        </motion.p>

        <motion.p {...fade(0.55)} className="font-accent italic text-primary text-lg md:text-xl mb-12">
          Developer. Student. Experimenter.
        </motion.p>

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
