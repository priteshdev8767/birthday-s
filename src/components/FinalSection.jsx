import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FinalSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.6]);

  return (
    <section
      ref={sectionRef}
      id="final-section"
      className="relative min-h-[100dvh] flex items-center justify-center py-24 md:py-32 overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Background with photo */}
      <div className="absolute inset-0">
        <img
          src="/photos/siddhi-8.png"
          alt=""
          className="w-full h-full object-cover opacity-15 cinematic-image"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-midnight/80" />

        {/* Warm glow that fades in */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(232,168,124,0.12) 0%, rgba(212,112,122,0.05) 40%, transparent 70%)',
            opacity: bgOpacity,
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        {/* Decorative element */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <div className="inline-flex items-center gap-3 text-rose-gold/50">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-rose-gold/30" />
            <span className="text-2xl">✨</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-rose-gold/30" />
          </div>
        </motion.div>

        {/* Main wish */}
        <motion.h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ animation: 'text-glow 4s ease-in-out infinite' }}
        >
          Happy Birthday, Siddhi ❤️
        </motion.h2>

        <motion.p
          className="font-serif text-base sm:text-lg md:text-xl text-pearl/75 mt-8 md:mt-10 leading-relaxed max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          May this year bring you more happiness, more beautiful memories and everything you&apos;ve been wishing for.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent mx-auto my-10 md:my-14"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
        />

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-2"
        >
          <p className="font-serif text-sm sm:text-base text-whisper tracking-wide">
            With lots of good wishes,
          </p>
          <p className="font-script text-2xl sm:text-3xl text-rose-gold">
            Pritesh Patil ❤️
          </p>
        </motion.div>

        {/* Final sparkle */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          <div className="flex items-center justify-center gap-2 text-sparkle/40 text-xs tracking-[0.3em]">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
          <p className="text-xs text-whisper mt-6 tracking-widest uppercase opacity-40">
            Made with love
          </p>
        </motion.div>
      </div>
    </section>
  );
}
