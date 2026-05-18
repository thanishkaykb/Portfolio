import { Linkedin, Github } from "lucide-react";
import { getEmailHref } from "@/lib/email";
import { openExternalLink } from "@/lib/externalLink";

const FooterSection = () => (
  <footer className="border-t border-border px-6 py-8 md:px-12 lg:px-24 xl:px-32">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground font-display">
        © 2026 Thanishka Yogesh. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href="https://www.linkedin.com/in/thanishka-yogesh/" target="_blank" rel="noopener noreferrer" onClick={openExternalLink("https://www.linkedin.com/in/thanishka-yogesh/")} className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin size={16} />
        </a>
        <a href="https://github.com/thanishkaykb" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Github size={16} />
        </a>
        <a href={getEmailHref("thanishka.ykb@gmail.com")} target="_blank" rel="noopener noreferrer" onClick={openExternalLink(getEmailHref("thanishka.ykb@gmail.com"))} className="text-muted-foreground hover:text-primary transition-colors">
          <Mail size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
