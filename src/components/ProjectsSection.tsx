import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="projects" className="section-padding bg-card/40" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="editorial-label mb-4">02 · Selected Projects</p>
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            THINGS I'VE <span className="text-primary">BUILT.</span>
          </h2>
          <p className="font-accent italic text-muted-foreground text-lg mb-16">
            A selection of ideas I've turned into working digital experiences.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={p.name}
                className={`grid md:grid-cols-12 gap-8 md:gap-6 items-start border-t border-border pt-10 ${
                  reversed ? "" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Oversized number */}
                <div className={`md:col-span-3 ${reversed ? "md:order-3 md:text-left" : ""}`}>
                  <span
                    className={`font-display text-[6rem] md:text-[8rem] leading-none block transition-colors duration-500 ${
                      hovered === p.name ? "text-primary" : "text-foreground/10"
                    }`}
                  >
                    {p.index}
                  </span>
                </div>

                {/* Body */}
                <div className={`md:col-span-9 space-y-6 ${reversed ? "md:order-1 md:pr-10" : ""}`}>
                  <div>
                    <h3 className="font-display text-4xl md:text-6xl text-foreground">{p.name}</h3>
                    <p className="font-accent italic text-accent text-lg mt-1">{p.title}</p>
                  </div>

                  {p.achievement && (
                    <p className="inline-block font-body text-[11px] uppercase tracking-[0.25em] text-primary border border-primary/40 px-3 py-1.5">
                      {p.achievement}
                    </p>
                  )}

                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{p.description}</p>

                  <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-2 max-w-3xl">
                    {p.features.map((f) => (
                      <li key={f} className="font-body text-sm text-foreground/80 flex gap-3">
                        <span className="text-primary mt-[7px] w-1 h-1 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {p.stack.map((s) => (
                      <span key={s} className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-[0.2em] text-primary group w-fit"
                  >
                    <span className="border-b border-primary/40 pb-0.5 group-hover:border-primary transition-colors">
                      View Project
                    </span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
