import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseRadius: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const COLORS = ["#00f5ff", "#ff00d4", "#00ff88", "#ffffff"];
const PARTICLE_COUNT = 170;
const CONNECTION_DIST = 130;
const REPEL_DIST = 220;
const EXPLODE_DIST = 350;

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseRadius = Math.random() * 2.2 + 0.6;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 + 0.05,
        radius: baseRadius,
        baseRadius,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;

      // Add shockwave visual
      shockwavesRef.current.push({
        x: mx,
        y: my,
        radius: 0,
        maxRadius: EXPLODE_DIST * 1.2,
        alpha: 1,
      });

      // Explosive force on particles
      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        if (dist < EXPLODE_DIST && dist > 0) {
          const force = ((EXPLODE_DIST - dist) / EXPLODE_DIST);
          const power = force * force * 25; // quadratic falloff for punchy center
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * power;
          p.vy += Math.sin(angle) * power;
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // --- Draw shockwaves ---
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 12;
        sw.alpha *= 0.94;
        if (sw.alpha < 0.01 || sw.radius > sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }
        // Outer ring
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 245, 255, ${sw.alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        // Inner glow ring
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 0, 212, ${sw.alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // --- Draw cursor proximity glow ---
      if (mx > -1000) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, REPEL_DIST);
        gradient.addColorStop(0, "rgba(0, 245, 255, 0.06)");
        gradient.addColorStop(0.5, "rgba(0, 245, 255, 0.02)");
        gradient.addColorStop(1, "rgba(0, 245, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mx, my, REPEL_DIST, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Update & draw particles ---
      for (const p of particles) {
        // Mouse repel — strong inverse-square-ish force
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < REPEL_DIST && dist > 1) {
          const normalizedDist = dist / REPEL_DIST; // 0 at cursor, 1 at edge
          const force = (1 - normalizedDist * normalizedDist) * 5; // quadratic, strong near center
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
          // Swell particle size near cursor
          p.radius = p.baseRadius + (1 - normalizedDist) * 3;
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.1; // ease back to normal
        }

        // Subtle gravity drift
        p.vy += 0.002;

        // Friction / damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges with energy loss
        if (p.x < 0) { p.x = 0; p.vx *= -0.7; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -0.7; }
        if (p.y < 0) { p.y = 0; p.vy *= -0.7; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -0.7; }

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // --- Draw connections ---
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Color lines based on particle colors
            const isSpecial = particles[i].color !== "#ffffff" && particles[j].color !== "#ffffff";
            ctx.strokeStyle = isSpecial
              ? `rgba(0, 245, 255, ${alpha})`
              : `rgba(255, 255, 255, ${alpha * 0.5})`;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleCanvas;
