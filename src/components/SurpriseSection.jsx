import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function createConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  const confettiCount = 120;
  const colors = [
    '#e8a87c', '#d4707a', '#f0c4a0', '#d4a574',
    '#ffe4b5', '#ffd700', '#ff69b4', '#ff6347',
    '#ffa07a', '#f5f0eb',
  ];

  const pieces = [];
  for (let i = 0; i < confettiCount; i++) {
    pieces.push({
      x: width / 2 + (Math.random() - 0.5) * width * 0.5,
      y: height * 0.4 + (Math.random() - 0.5) * 100,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -15 - 5,
      gravity: 0.3 + Math.random() * 0.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      decay: 0.005 + Math.random() * 0.005,
    });
  }

  let animFrame;
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    let alive = false;

    pieces.forEach((p) => {
      if (p.opacity <= 0) return;
      alive = true;

      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (alive) {
      animFrame = requestAnimationFrame(animate);
    }
  };

  animate();

  return () => {
    if (animFrame) cancelAnimationFrame(animFrame);
  };
}

export default function SurpriseSection() {
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  const handleReveal = useCallback(() => {
    setRevealed(true);
    // Fire confetti after a short delay for the transition
    setTimeout(() => {
      if (canvasRef.current) {
        cleanupRef.current = createConfetti(canvasRef.current);
      }
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <section
      id="surprise-section"
      className="relative min-h-[80dvh] flex items-center justify-center py-20 md:py-28 overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-midnight">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(232,168,124,0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 20 }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="font-serif text-xl sm:text-2xl md:text-3xl text-pearl/80 mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                I have one more thing for you...
              </motion.p>

              <motion.button
                onClick={handleReveal}
                className="relative px-10 py-5 rounded-full glass cursor-pointer overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 25px rgba(232,168,124,0.2), 0 0 50px rgba(232,168,124,0.05)',
                    '0 0 40px rgba(232,168,124,0.35), 0 0 80px rgba(232,168,124,0.1)',
                    '0 0 25px rgba(232,168,124,0.2), 0 0 50px rgba(232,168,124,0.05)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(232,168,124,0.5), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2.5s ease-in-out infinite',
                  }}
                />
                <span className="relative font-sans text-base sm:text-lg tracking-wide text-rose-gold-light">
                  Open your surprise 🎁
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              {/* Decorative sparkles */}
              <motion.div
                className="text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
              >
                🎉
              </motion.div>

              <motion.p
                className="font-serif text-xl sm:text-2xl md:text-3xl text-pearl/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                You deserve all the happiness in the world, Siddhi. ❤️
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                  Happy Birthday once again!
                </p>
              </motion.div>

              <motion.p
                className="font-script text-lg sm:text-xl text-rose-gold/70 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                — Pritesh
              </motion.p>

              {/* Photo reveal */}
              <motion.div
                className="mt-10 mx-auto max-w-xs sm:max-w-sm"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.8, duration: 1, ease: 'easeOut' }}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/photos/siddhi-5.png"
                    alt="Siddhi"
                    className="w-full h-auto cinematic-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-2xl border border-rose-gold/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
