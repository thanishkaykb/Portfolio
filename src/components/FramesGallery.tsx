import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { frames, type Frame } from "@/data/frames";

/**
 * LIFE IN FRAMES · interactive 3D photo sphere.
 *
 * Every photograph sits on the surface of a slowly rotating sphere
 * (like a globe of memories). Drag it to spin in any direction; photos on the
 * far side dim and blur away. Clicking a frame opens a lightbox with
 * previous / next navigation.
 *
 * With prefers-reduced-motion the sphere becomes a swipeable scroller.
 * With no photographs yet, it shows an editorial empty state instead of
 * faking content.
 */

const FramesGallery = () => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dims, setDims] = useState({ w: 960, h: 620 });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rot = useRef({ y: 0, tilt: -8, vel: 0, dragging: false, lastX: 0, lastY: 0 });
  const moved = useRef(0);

  const count = frames.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [count]);

  const layout = useMemo(() => {
    const n = Math.max(count, 1);
    const tileSize = Math.max(78, Math.min(118, dims.w / 6.5));
    const R = tileSize * 1.55;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const tiles = Array.from({ length: n }, (_, i) => {
      const y = 1 - ((i + 0.5) * 2) / n;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(Math.cos(theta) * r, Math.sin(theta) * r) * 180) / Math.PI;
      return { lat, lon, transform: `rotateY(${lon}deg) rotateX(${-lat}deg) translateZ(${R}px)` };
    });
    return { tileSize, R, tiles };
  }, [dims.w, count]);

  // Apply each tile's fixed spherical placement whenever the layout changes.
  useEffect(() => {
    layout.tiles.forEach((t, i) => {
      const el = tileRefs.current[i];
      if (!el) return;
      el.style.width = `${layout.tileSize}px`;
      el.style.height = `${layout.tileSize * 1.16}px`;
      el.style.marginLeft = `${-layout.tileSize / 2}px`;
      el.style.marginTop = `${-layout.tileSize * 0.58}px`;
      el.style.transform = t.transform;
    });
  }, [layout]);

  // Rotation loop: slow auto-spin, drag with inertia, per-frame facing dim/blur.
  useEffect(() => {
    if (reducedMotion || count === 0) return;
    let raf = 0;
    const { R, tiles } = layout;
    const state = rot.current;
    const tick = () => {
      if (!state.dragging) {
        state.y += 0.12 + state.vel;
        state.vel *= 0.94;
        if (Math.abs(state.vel) < 0.01) state.vel = 0;
      }
      const sphere = sphereRef.current;
      if (sphere) {
        sphere.style.transform = `translateZ(${-R}px) rotateX(${state.tilt}deg) rotateY(${state.y}deg)`;
      }
      for (let i = 0; i < tiles.length; i++) {
        const el = tileRefs.current[i];
        if (!el) continue;
        const eff = ((tiles[i].lon + state.y) * Math.PI) / 180;
        const front = Math.cos(eff) * Math.cos((tiles[i].lat * Math.PI) / 180);
        const f = Math.max(front, 0);
        el.style.opacity = String(0.14 + 0.86 * Math.pow(f, 1.35));
        el.style.filter = front < 0.08 ? `blur(${Math.min(4, (0.08 - front) * 45)}px)` : "none";
        el.style.pointerEvents = front > 0.3 ? "auto" : "none";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [layout, reducedMotion, count]);

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

  const onPointerDown = (e: React.PointerEvent) => {
    const s = rot.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.vel = 0;
    moved.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = rot.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    moved.current += Math.abs(dx) + Math.abs(dy);
    s.y += dx * 0.35;
    s.vel = Math.max(-6, Math.min(6, dx * 0.35));
    s.tilt = Math.max(-35, Math.min(35, s.tilt - dy * 0.15));
  };
  const endDrag = () => {
    rot.current.dragging = false;
  };

  const tile = (f: Frame, i: number) => (
    <button
      onClick={() => {
        if (moved.current > 8) return;
        openAt(i);
      }}
      className="group block h-full w-full overflow-hidden rounded-[24%] frame-line bg-secondary transition-[border-color] duration-300 hover:border-primary/60"
      aria-label={f.caption || `Open photograph ${i + 1}`}
    >
      <img
        src={f.src}
        alt={f.caption || `Photograph ${i + 1}`}
        className="h-full w-full object-cover"
        draggable={false}
        loading="lazy"
      />
    </button>
  );

  return (
    <section id="frames" className="section-padding bg-card/40 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="editorial-label mb-4">04 · Gallery</p>
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            LIFE IN <span className="text-primary">FRAMES.</span>
          </h2>
          <p className="font-accent italic text-muted-foreground text-lg mb-6">
            Visual journey · moments that shaped my journey.
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
              everyday experiences · no placeholders, no fakes.
            </p>
          </motion.div>
        ) : reducedMotion ? (
          <div
            className="mt-8 flex overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory" }}
            role="region"
            aria-label="Photo gallery · scroll sideways"
            tabIndex={0}
          >
            {frames.map((f, i) => (
              <div key={`${f.src}-${i}`} style={{ scrollSnapAlign: "center" }} className="pr-4 shrink-0">
                <div className="h-56 w-44 md:h-72 md:w-56 overflow-hidden frame-line bg-secondary rounded-[18%]">
                  {tile(f, i)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={stageRef}
            className="relative mt-4 h-[480px] sm:h-[560px] md:h-[640px] w-full select-none"
            style={{ perspective: "1200px", touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            role="region"
            aria-label="Photo sphere · drag to spin, click a frame to open"
          >
            <div
              ref={sphereRef}
              className="absolute left-1/2 top-1/2"
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {frames.map((f, i) => (
                <div
                  key={`${f.src}-${i}`}
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  className="absolute left-0 top-0 will-change-transform"
                  style={{ backfaceVisibility: "visible" }}
                >
                  {tile(f, i)}
                </div>
              ))}
            </div>
            {/* Soft edge fade so the sphere melts into the background */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
              style={{ background: "linear-gradient(to top, hsl(30 3% 7%), transparent)" }}
              aria-hidden="true"
            />
          </div>
        )}
        {count > 0 && (
          <p className="text-center editorial-label mt-8">Drag to spin the sphere · Click a frame to open</p>
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
            <div className="relative">
              <img
                src={frames[lightbox].src}
                alt={frames[lightbox].caption || "Photograph"}
                className="w-full max-h-[75vh] object-contain"
              />
              {frames[lightbox].caption && (
                <figcaption className="absolute inset-x-0 bottom-0 pb-4 pt-10 text-center font-display text-2xl md:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {frames[lightbox].caption}
                </figcaption>
              )}
            </div>
          </figure>
        </div>
      )}
    </section>
  );
};

export default FramesGallery;
