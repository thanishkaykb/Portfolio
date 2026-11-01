import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RESUME_PATH } from "@/data/content";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Frames", href: "#frames" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.href.replace("#", ""));
        if (el && el.getBoundingClientRect().top <= 140) current = l.href.replace("#", "");
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">
        <a href="#home" className="font-display text-lg tracking-wide text-foreground">
          THANISHKA <span className="text-primary">YOGESH</span>
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-[12px] uppercase tracking-[0.18em] transition-colors ${
                activeSection === l.href.replace("#", "")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={RESUME_PATH}
            download="Thanishka_Yogesh_Resume.pdf"
            className="font-body text-[12px] uppercase tracking-[0.18em] text-primary border border-primary/40 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Resume ↗
          </a>
        </nav>

        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden glass px-6 pb-6 flex flex-col gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            aria-label="Mobile navigation"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm uppercase tracking-[0.18em] py-1 text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={RESUME_PATH}
              download="Thanishka_Yogesh_Resume.pdf"
              onClick={() => setOpen(false)}
              className="font-body text-sm uppercase tracking-[0.18em] text-primary border border-primary/40 px-3 py-2 w-fit"
            >
              Resume ↗
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
