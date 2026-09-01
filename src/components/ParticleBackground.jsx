import { useEffect, useRef, useCallback } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  const initParticles = useCallback((width, height) => {
    const isMobile = width < 768;
    const count = isMobile ? 25 : 45;
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        opacitySpeed: (Math.random() - 0.5) * 0.005,
        hue: Math.random() > 0.5
          ? 30 + Math.random() * 20   // warm gold
          : 340 + Math.random() * 20, // soft pink
        saturation: 60 + Math.random() * 30,
        lightness: 70 + Math.random() * 20,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    resize();
    initParticles(width, height);
    window.addEventListener('resize', resize);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        if (!prefersReduced) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.opacity += p.opacitySpeed;

          if (p.opacity <= 0.05 || p.opacity >= 0.5) {
            p.opacitySpeed *= -1;
          }

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.opacity})`;
        ctx.fill();

        // Soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.opacity * 0.15})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
