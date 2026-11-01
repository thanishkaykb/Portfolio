import { Linkedin, Github, ArrowUp } from "lucide-react";
import { openExternalLink } from "@/lib/externalLink";
import { LINKS } from "@/data/content";

const FooterSection = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-6 py-12 md:px-12 lg:px-24 xl:px-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-xl text-foreground">
            THANISHKA <span className="text-primary">YOGESH.</span>
          </p>
          <p className="font-accent italic text-muted-foreground text-sm mt-1">
            Designed with intention. Built with curiosity.
          </p>
          <p className="editorial-label mt-2">© {year} — All rights reserved</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openExternalLink(LINKS.linkedin)}
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={17} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors"
          >
            Back to Top
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
