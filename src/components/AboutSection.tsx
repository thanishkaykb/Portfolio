import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Globe, Heart } from "lucide-react";

const stats = [
  { value: "20+", label: "Roles & Positions", icon: Rocket },
  { value: "10+", label: "Organizations", icon: Globe },
  { value: "4", label: "Languages Spoken", icon: Heart },
  { value: "2029", label: "Expected Grad", icon: Code2 },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">About Me</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
            Crafting Digital <span className="text-gradient">Experiences</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm Thanishka Yogesh, a B.E. Computer Science undergraduate at Sri Sairam Engineering College, Chennai.
              My core domains are <span className="text-foreground font-semibold">Full Stack Development</span> and <span className="text-foreground font-semibold">Web Development</span>.
            </p>
            <p>
              Beyond coding, I'm deeply involved in campus leadership — serving as Campus Ambassador for organizations like Google, HCL GUVI, and multiple tech communities.
              I'm also the Founder of TS Hub, a WhatsApp community for events and hackathons.
            </p>
            <p>
              I'm a passionate artist sharing my creative work on Instagram as <a href="https://www.instagram.com/art_by_thanishka" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@art_by_thanishka</a>,
              and a published poet on <a href="https://www.poetrysoup.com/poems_poets/poems_by_poet_read.aspx?ID=181303" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PoetrySoup</a>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glow-border rounded-xl p-5 bg-card card-lift group cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <s.icon size={18} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-3xl font-display font-bold text-primary mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
