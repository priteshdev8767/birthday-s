import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicReveal() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const blurValue = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [6, 0, 0, 3]);
  const backdropBlur = useTransform(blurValue, (v) => `blur(${v}px)`);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], ['40px', '0px']);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const lightLeakOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="cinematic-reveal"
      className="relative h-[130vh] md:h-[150vh] overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Image container */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale, y }}
        >
          <motion.img
            src="/photos/siddhi-2.png"
            alt="Siddhi"
            className="w-full h-full object-cover cinematic-image"
            style={{ opacity: imageOpacity }}
            loading="eager"
            decoding="async"
          />

          {/* Animated blur overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              backdropFilter: backdropBlur,
              WebkitBackdropFilter: backdropBlur,
            }}
          />
        </motion.div>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(10,10,26,0.6) 0%,
                transparent 30%,
                transparent 60%,
                rgba(10,10,26,0.8) 100%
              )
            `,
          }}
        />

        {/* Side vignettes */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: `
              linear-gradient(to right,
                rgba(10,10,26,0.4) 0%,
                transparent 20%,
                transparent 80%,
                rgba(10,10,26,0.4) 100%
              )
            `,
          }}
        />

        {/* Text overlay */}
        <motion.div
          className="absolute bottom-16 md:bottom-24 left-0 right-0 text-center px-6"
          style={{ y: textY, opacity: textOpacity }}
        >
          <p className="font-script text-2xl sm:text-3xl md:text-4xl text-rose-gold-light tracking-wide drop-shadow-lg">
            The birthday girl
          </p>
          <p className="text-sparkle text-lg mt-2 opacity-80">✨</p>
        </motion.div>

        {/* Warm light leak */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 20%, rgba(232,168,124,0.4), transparent 70%)',
            opacity: lightLeakOpacity,
          }}
        />
      </div>
    </section>
  );
}
