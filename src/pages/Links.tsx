import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Phone, Palette, PenLine, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getEmailHref } from "@/lib/email";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thanishka-yogesh", icon: Linkedin, color: "from-[hsl(210,80%,45%)] to-[hsl(210,90%,55%)]" },
  { label: "GitHub", href: "https://github.com/thanishkaykb", icon: Github, color: "from-[hsl(0,0%,20%)] to-[hsl(0,0%,35%)]" },
  { label: "Art Account", href: "https://instagram.com", icon: Palette, color: "from-[hsl(330,80%,50%)] to-[hsl(20,90%,55%)]" },
  { label: "Poetry Account", href: "https://instagram.com", icon: PenLine, color: "from-[hsl(270,60%,50%)] to-[hsl(300,70%,60%)]" },
  { label: "Email Me", href: getEmailHref("thanishka.ykb@gmail.com"), icon: Mail, color: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]" },
  { label: "+91 90256 58705", href: "tel:+919025658705", icon: Phone, color: "from-[hsl(150,60%,40%)] to-[hsl(170,70%,45%)]" },
];

const Links = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
    <motion.div
      className="w-full max-w-md space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center space-y-2 mb-10">
        <h1 className="font-display text-3xl font-bold text-gradient">Thanishka Yogesh</h1>
        <p className="text-muted-foreground text-sm font-body">Full Stack Developer · Creator · Poet</p>
      </div>

      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group flex items-center gap-4 w-full p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0`}>
            <link.icon size={18} className="text-white" />
          </div>
          <span className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-display">
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>
      </motion.div>
    </motion.div>
  </div>
);

export default Links;
