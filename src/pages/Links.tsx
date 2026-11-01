import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Phone, Palette, PenLine, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getEmailHref } from "@/lib/email";
import { openExternalLink } from "@/lib/externalLink";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thanishka-yogesh/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/thanishkaykb", icon: Github },
  { label: "Art Account", href: "https://www.instagram.com/art_by_thanishka", icon: Palette },
  { label: "Poetry on PoetrySoup", href: "https://www.poetrysoup.com/poems_poets/poems_by_poet_read.aspx?ID=181303", icon: PenLine },
  { label: "Email Me", href: getEmailHref("thanishka.ykb@gmail.com"), icon: Mail },
  { label: "+91 90256 58705", href: "tel:+919025658705", icon: Phone },
];

const Links = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
    <motion.div
      className="w-full max-w-md space-y-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center space-y-2 mb-10">
        <h1 className="font-display text-4xl text-foreground">
          THANISHKA <span className="text-primary">YOGESH</span>
        </h1>
        <p className="font-accent italic text-muted-foreground text-sm">Full Stack Developer · Creator · Poet</p>
      </div>

      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") || link.href.startsWith("mailto:") ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={link.href.startsWith("http") || link.href.startsWith("mailto:") ? openExternalLink(link.href) : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group flex items-center gap-4 w-full p-4 border border-border bg-card hover:border-primary/50 transition-colors"
        >
          <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0">
            <link.icon size={18} className="text-primary" />
          </div>
          <span className="font-body font-medium text-sm text-foreground group-hover:text-primary transition-colors">
            {link.label}
          </span>
        </motion.a>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-6 text-center"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>
      </motion.div>
    </motion.div>
  </div>
);

export default Links;
