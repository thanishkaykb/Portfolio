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

    const STAR_COUNT = 70;
    const SPEED = 0.08;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2 + 0.5,
        size: Math.random() * 1.1 + 0.3,
        opacity: Math.random() * 0.25 + 0.06,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.x -= SPEED * star.z * 0.5;
        star.y -= SPEED * star.z * 0.3;

        if (star.x < -5) star.x = canvas.width + 5;
        if (star.y < -5) star.y = canvas.height + 5;

        const twinkle = Math.sin(Date.now() * 0.001 * star.z + star.x) * 0.12;
        const alpha = Math.max(0.04, Math.min(1, star.opacity + twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.z * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 241, 232, ${alpha})`;
        ctx.fill();

        if (star.size > 1.1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * star.z * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 198, 41, ${alpha * 0.12})`;
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
