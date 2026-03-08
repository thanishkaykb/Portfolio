import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Send, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getEmailHref } from "@/lib/email";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || null,
      message: form.message.trim(),
    };

    // Save to database
    const { error: dbError } = await supabase.from("contact_messages").insert(payload);

    if (dbError) {
      setSending(false);
      setError("Something went wrong. Please try again.");
      return;
    }

    // Send email notification (fire and forget - don't block on failure)
    supabase.functions.invoke("send-contact-email", { body: payload }).catch(() => {});

    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Contact</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              Whether you have a project idea, collaboration opportunity, or just want to say hi — I'd love to hear from you!
            </p>

            <div className="space-y-4">
              {[
                { href: "mailto:thanishka.ykb@gmail.com", icon: Mail, text: "THANISHKA.YKB@GMAIL.COM", external: true },
                { icon: Phone, text: "+91 90256 58705" },
                { icon: MapPin, text: "Chennai, Tamil Nadu 600045" },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] transition-all">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              {[
                { href: "https://www.linkedin.com/in/thanishka-yogesh-7496b637b", icon: Linkedin },
                { href: "https://github.com/thanishkaykb", icon: Github },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {["name", "email", "subject"].map((field) => (
              <motion.input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field === "name" ? "Your Name" : field === "email" ? "Your Email" : "Subject"}
                required={field !== "subject"}
                maxLength={field === "email" ? 255 : field === "subject" ? 200 : 100}
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all text-sm font-body"
                whileFocus={{ scale: 1.01 }}
              />
            ))}
            <motion.textarea
              placeholder="Your Message"
              required
              rows={5}
              maxLength={2000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all text-sm font-body resize-none"
              whileFocus={{ scale: 1.01 }}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive font-body"
              >
                {error}
              </motion.p>
            )}

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-primary font-display font-semibold text-sm py-3"
              >
                <CheckCircle size={18} />
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            ) : (
              <motion.button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-xl hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] transition-all disabled:opacity-50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending..." : "Send Message"}
              </motion.button>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
