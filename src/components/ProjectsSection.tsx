import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Loader2 } from "lucide-react";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
}

// Fallback data in case GitHub API fails
const fallbackProjects = [
  { name: "CongestiQ-AI", desc: "AI-powered smart traffic intelligence platform with real-time map data, weather insights, and intelligent routing.", tech: ["TypeScript", "AI", "Maps API"], repo: "https://github.com/thanishkaykb/CongestiQ-AI" },
  { name: "Anonymous Whispers", desc: "Privacy-first web app for sharing thoughts and confessions completely anonymously.", tech: ["TypeScript", "React", "Full Stack"], repo: "https://github.com/thanishkaykb/Anonymous_Whispers" },
  { name: "Social Media Platform", desc: "Full-stack social platform with user profiles, posts, likes, and comments using Node.js, Express & MySQL.", tech: ["JavaScript", "Node.js", "MySQL"], repo: "https://github.com/thanishkaykb/Social-Media-Platform" },
];

const GITHUB_USERNAME = "thanishkaykb";

const ProjectCard = ({ project }: { project: { name: string; desc: string; tech: string[]; repo: string } }) => (
  <motion.a
    href={project.repo}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
    className="group relative rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.1)] cursor-pointer"
  >
    <div className="relative z-10 p-6">
      <div className="flex items-start gap-3 mb-3">
        <Github size={18} className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        <h3 className="font-display font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
          {project.name.replace(/-/g, " ").replace(/_/g, " ")}
        </h3>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4 font-body line-clamp-3">
        {project.desc || "No description available."}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="text-[10px] font-display font-medium px-2 py-0.5 rounded-full text-primary/80 bg-primary/5 border border-primary/10">
            {t}
          </span>
        ))}
      </div>
      <ExternalLink size={14} className="absolute bottom-5 right-5 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
    </div>
  </motion.a>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<{ name: string; desc: string; tech: string[]; repo: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
          { headers: { Accept: "application/vnd.github.mercy-preview+json" } }
        );
        if (!response.ok) throw new Error("GitHub API error");
        
        const repos: GitHubRepo[] = await response.json();
        const mapped = repos
          .filter((r) => !r.fork)
          .map((r) => ({
            name: r.name,
            desc: r.description || "",
            tech: r.topics?.length ? r.topics.slice(0, 3) : r.language ? [r.language] : [],
            repo: r.html_url,
          }));
        
        setProjects(mapped.length > 0 ? mapped : fallbackProjects);
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Projects</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Things I've <span className="text-gradient">Built</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-12 max-w-xl">
            Live from GitHub — every new project automatically appears here.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-display text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
