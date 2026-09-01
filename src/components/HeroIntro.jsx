import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lines = [
  { text: 'Hey Siddhi...', delay: 0.5 },
  { text: "Today isn't just another day.", delay: 2.5 },
  { text: 'It\'s YOUR day. ✨', delay: 5.0 },
  { text: 'Happy Birthday, Siddhi ❤️', delay: 7.5, isMain: true },
];

export default function HeroIntro({ onComplete }) {
  const [started, setStarted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleStart = useCallback(() => {
    setStarted(true);
    // Show CTA after last text animation
    setTimeout(() => setShowButton(true), 10500);
  }, []);

  const handleContinue = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 800);
  }, [onComplete]);

  return (
    <section
      id="hero-intro"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-midnight">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(232,168,124,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <AnimatePresence>
        {!exiting && (
          <motion.div
            className="relative z-10 text-center px-6 max-w-lg mx-auto"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Initial tap-to-start */}
            {!started && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                onClick={handleStart}
                className="group cursor-pointer flex flex-col items-center gap-6"
                aria-label="Start the birthday experience"
              >
                {/* Decorative ring */}
                <motion.div
                  className="w-28 h-28 rounded-full border border-rose-gold/30 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(232,168,124,0.15)',
                      '0 0 40px rgba(232,168,124,0.3)',
                      '0 0 20px rgba(232,168,124,0.15)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full border border-rose-gold/20 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="text-3xl">✨</span>
                  </motion.div>
                </motion.div>

                <div>
                  <p className="font-serif text-xl text-pearl/80 tracking-wide">
                    A surprise for you
                  </p>
                  <p className="text-sm text-whisper mt-2 tracking-widest uppercase">
                    Tap to begin
                  </p>
                </div>
              </motion.button>
            )}

            {/* Text sequence */}
            {started && (
              <div className="space-y-8">
                {lines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: line.delay,
                      duration: 1.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`
                      font-serif tracking-wide leading-relaxed
                      ${line.isMain
                        ? 'text-3xl sm:text-4xl md:text-5xl font-bold text-gradient'
                        : 'text-xl sm:text-2xl md:text-3xl text-pearl/90'
                      }
                    `}
                    style={line.isMain ? { animation: 'text-glow 3s ease-in-out infinite' } : {}}
                  >
                    {line.text}
                  </motion.p>
                ))}

                {/* Continue button */}
                <AnimatePresence>
                  {showButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="pt-8"
                    >
                      <motion.button
                        onClick={handleContinue}
                        className="group relative px-8 py-4 rounded-full glass cursor-pointer overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(232,168,124,0.15)',
                            '0 0 35px rgba(232,168,124,0.25)',
                            '0 0 20px rgba(232,168,124,0.15)',
                          ],
                        }}
                        transition={{
                          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                        }}
                      >
                        {/* Shimmer effect */}
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(232,168,124,0.4), transparent)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 3s ease-in-out infinite',
                          }}
                        />
                        <span className="relative font-sans text-sm tracking-widest uppercase text-rose-gold-light">
                          Start the surprise →
                        </span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
