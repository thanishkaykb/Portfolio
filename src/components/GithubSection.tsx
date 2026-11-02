import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { LINKS } from "@/data/content";
import { openExternalLink } from "@/lib/externalLink";

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
}

const GithubSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/thanishkaykb/repos?sort=updated&per_page=30")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setRepos(
            data
              .filter((d: { fork?: boolean }) => !d.fork)
              .slice(0, 6)
              .map((d: { name: string; html_url: string; description: string | null }) => ({
                name: d.name,
                html_url: d.html_url,
                description: d.description,
              }))
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-padding bg-card/40" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="editorial-label mb-4">06 — Technical Work</p>
            <h2 className="font-display text-5xl md:text-7xl">
              MORE ON <span className="text-primary">GITHUB.</span>
            </h2>
            <p className="font-accent italic text-muted-foreground text-lg mt-4">
              More experiments, code, and projects live on my GitHub.
            </p>
          </div>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openExternalLink(LINKS.github)}
            className="inline-flex items-center gap-2 px-7 py-3 border border-primary/40 text-primary font-body font-semibold text-sm uppercase tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-colors w-fit"
          >
            <Github size={15} />
            github.com/thanishkaykb
          </a>
        </motion.div>

        {repos && repos.length > 0 && (
          <>
            <div className="mt-12 grid md:grid-cols-3 border border-border">
              {repos.map((r, i) => (
                <motion.a
                  key={r.html_url}
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openExternalLink(r.html_url)}
                  className="bg-background p-6 border border-border hover:bg-card transition-colors group"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {r.name}
                    </span>
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {r.description && (
                    <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">{r.description}</p>
                  )}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex justify-center"
            >
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openExternalLink(LINKS.github)}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-body font-semibold text-sm uppercase tracking-[0.15em] hover:border-primary hover:text-primary transition-colors"
              >
                <Github size={15} />
                View more on my GitHub
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default GithubSection;
