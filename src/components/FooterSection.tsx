import { Linkedin, Github, Mail } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border section-padding py-8">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground font-display">
        © 2026 Thanishka Yogesh. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href="https://www.linkedin.com/in/thanishka-yogesh-7496b637b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin size={16} />
        </a>
        <a href="https://github.com/thanishkaykb" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Github size={16} />
        </a>
        <a href="mailto:THANISHKA.YKB@GMAIL.COM" className="text-muted-foreground hover:text-primary transition-colors">
          <Mail size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
