import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { frames, type Frame } from "@/data/frames";

/**
 * LIFE IN FRAMES — immersive 3D curved photo gallery.
 *
 * The ring of tiles is a CSS 3D cylinder: each tile sits at
 * rotateY(i · step) translateZ(radius). Drag / touch rotates the ring;
 * it drifts gently on its own when idle. Click a tile to open the lightbox.
 *
 * Honors prefers-reduced-motion (no auto-rotation).
 * With no photographs yet, it shows an editorial empty state instead of
 * faking content.
 */

const TILE_W = 230;
const TILE_H = 300;
const RADIUS = 480;

const FramesGallery = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ringRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const raf = useRef(0);
  const [lightbox, setLightbox] = useState<Frame | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = frames.length;
  const step = count > 0 ? 360 / count : 0;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    const animate = () => {
      if (!dragging.current) {
        velocity.current *= 0.95; // inertia decay
        if (!reducedMotion && Math.abs(velocity.current) < 0.02) {
          velocity.current += (0.06 - velocity.current) * 0.02; // gentle ambient drift
        }
        rotation.current += velocity.current;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(-${RADIUS}px) rotateY(${rotation.current}deg)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [count, reducedMotion]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    rotation.current += dx * 0.25;
    velocity.current = dx * 0.25;
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === "Escape") setLightbox(null);
        return;
      }
      if (count === 0) return;
      if (e.key === "ArrowLeft") rotation.current += step;
      if (e.key === "ArrowRight") rotation.current -= step;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, step, lightbox]);

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
            Moments, people, places, and experiences that shaped my journey.
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
        ) : (
          <div
            className="relative mt-8 select-none"
            style={{ perspective: "1400px", touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            role="region"
            aria-label="Photo gallery — drag to rotate"
            tabIndex={0}
          >
            <div
              ref={ringRef}
              className="relative mx-auto"
              style={{
                width: TILE_W,
                height: TILE_H,
                transformStyle: "preserve-3d",
                transition: dragging.current ? "none" : undefined,
              }}
            >
              {frames.map((f, i) => (
                <button
                  key={f.src}
                  onClick={() => !dragging.current && setLightbox(f)}
                  className="absolute inset-0 overflow-hidden focus-visible:outline focus-visible:outline-primary"
                  style={{
                    transform: `rotateY(${i * step}deg) translateZ(${RADIUS}px)`,
                    backfaceVisibility: "hidden",
                  }}
                  aria-label={f.caption || `Photograph ${i + 1}`}
                >
                  <img
                    src={f.src}
                    alt={f.caption || `Photograph ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                  <span className="absolute inset-0 border border-primary/20 pointer-events-none" aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className="text-center editorial-label mt-10">Drag to rotate · Click a frame to open</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[10000] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption || "Photograph"}
        >
          <button
            className="absolute top-6 right-6 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={26} />
          </button>
          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption || "Photograph"} className="w-full max-h-[75vh] object-contain border border-border" />
            {lightbox.caption && (
              <figcaption className="font-accent italic text-center text-accent mt-4">{lightbox.caption}</figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
};

export default FramesGallery;
