import { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: { x: number; y: number; z: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 80;
    const SPEED = 0.1;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2 + 0.5,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.3 + 0.08,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        // Move stars diagonally (slow drift)
        star.x -= SPEED * star.z * 0.5;
        star.y -= SPEED * star.z * 0.3;

        // Wrap around
        if (star.x < -5) star.x = canvas.width + 5;
        if (star.y < -5) star.y = canvas.height + 5;

        // Twinkle
        const twinkle = Math.sin(Date.now() * 0.001 * star.z + star.x) * 0.15;
        const alpha = Math.max(0.05, Math.min(1, star.opacity + twinkle));

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.z * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${alpha})`;
        ctx.fill();

        // Glow for brighter stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * star.z * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 210, 255, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default Starfield;
