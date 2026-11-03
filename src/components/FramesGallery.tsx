import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { frames, type Frame } from "@/data/frames";

/**
 * LIFE IN FRAMES — endless drifting film-strip gallery.
 *
 * Photos flow past in a slow infinite marquee (like a projected film reel).
 * Hovering / pressing the strip pauses it; clicking a frame opens a lightbox
 * with previous / next navigation. With prefers-reduced-motion the strip
 * becomes a swipeable scroller instead of auto-moving.
 *
 * With no photographs yet, it shows an editorial empty state instead of
 * faking content. The strip fills automatically from src/data/frames.ts.
 */

const FramesGallery = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = frames.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const openAt = useCallback((i: number) => setLightbox(i), []);

  const stepLightbox = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) => {
        if (cur === null) return cur;
        return (cur + dir + count) % count;
      });
    },
    [count]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, stepLightbox]);

  const marqueeDuration = `${Math.max(36, count * 7)}s`;

  const tile = (f: Frame, i: number) => (
    <div className="pr-4 md:pr-5">
      <button
        onClick={() => openAt(i)}
        className="group relative block h-56 w-44 md:h-72 md:w-56 overflow-hidden frame-line bg-secondary focus-visible:outline focus-visible:outline-primary transition-transform duration-500 ease-out hover:-translate-y-1.5"
        aria-label={f.caption || `Open photograph ${i + 1}`}
      >
        <img
          src={f.src}
          alt={f.caption || `Photograph ${i + 1}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          draggable={false}
          loading="lazy"
        />
        {f.caption && (
          <span className="absolute inset-x-0 bottom-0 translate-y-full bg-background/85 px-3 py-2 text-left font-accent italic text-xs text-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {f.caption}
          </span>
        )}
      </button>
    </div>
  );

  return (
    <section id="frames" className="section-padding bg-card/40 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="editorial-label mb-4">04 — Gallery</p>
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            LIFE IN <span className="text-primary">FRAMES.</span>
          </h2>
          <p className="font-accent italic text-muted-foreground text-lg mb-6">
            Visual journey — moments that shaped my journey.
          </p>
        </motion.div>

        {count === 0 ? (
          <motion.div
            className="mt-8 border border-dashed border-border px-8 py-16 md:py-24 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-display text-3xl md:text-5xl text-foreground/25 mb-4">THE GALLERY AWAITS.</p>
            <p className="font-hand text-accent text-2xl mb-6">
              real photographs are being curated for this space…
            </p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              This gallery will fill up with genuine moments from college life, hackathons, projects and
              everyday experiences — no placeholders, no fakes.
            </p>
          </motion.div>
        ) : reducedMotion ? (
          <div
            className="mt-8 flex overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory" }}
            role="region"
            aria-label="Photo gallery — scroll sideways"
            tabIndex={0}
          >
            {frames.map((f, i) => (
              <div key={`${f.src}-${i}`} style={{ scrollSnapAlign: "center" }}>
                {tile(f, i)}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="relative mt-8 select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            role="region"
            aria-label="Photo gallery — drifts slowly, hover to pause, click a frame to open"
          >
            <div
              className={`flex w-max ${paused ? "frames-marquee-paused" : "frames-marquee"}`}
              style={{ animationDuration: marqueeDuration }}
            >
              {[...frames, ...frames].map((f, i) => (
                <div key={`${f.src}-${i}`}>{tile(f, i)}</div>
              ))}
            </div>
            {/* Soft edge fade so frames drift out of view instead of hard-clipping */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32"
              style={{ background: "linear-gradient(to right, hsl(0 0% 4% / 0.9), transparent)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32"
              style={{ background: "linear-gradient(to left, hsl(0 0% 4% / 0.9), transparent)" }}
              aria-hidden="true"
            />
            <p className="text-center editorial-label mt-10">Hover to pause · Click a frame to open</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && frames[lightbox] && (
        <div
          className="fixed inset-0 z-[10000] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={frames[lightbox].caption || "Photograph"}
        >
          <button
            className="absolute top-6 right-6 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={26} />
          </button>
          {count > 1 && (
            <button
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(-1);
              }}
              aria-label="Previous photograph"
            >
              <ChevronLeft size={34} />
            </button>
          )}
          {count > 1 && (
            <button
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(1);
              }}
              aria-label="Next photograph"
            >
              <ChevronRight size={34} />
            </button>
          )}
          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={frames[lightbox].src}
              alt={frames[lightbox].caption || "Photograph"}
              className="w-full max-h-[75vh] object-contain border border-border"
            />
            {frames[lightbox].caption && (
              <figcaption className="font-accent italic text-center text-accent mt-4">
                {frames[lightbox].caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
};

export default FramesGallery;
