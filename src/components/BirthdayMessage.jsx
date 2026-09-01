import { motion } from 'framer-motion';

const messageLines = [
  { text: 'Dear Siddhi,', style: 'script', size: 'text-2xl sm:text-3xl md:text-4xl' },
  { text: '', spacer: true },
  { text: 'Some people make ordinary moments feel special.' },
  { text: '' , spacer: true },
  { text: "You're one of those people." },
  { text: '', spacer: true },
  { text: 'On your special day, I just want to wish you happiness, success, laughter and countless beautiful memories.' },
  { text: '', spacer: true },
  { text: 'Keep smiling, keep shining and keep being the amazing person you are. ❤️' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function BirthdayMessage() {
  return (
    <section
      id="birthday-message"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-midnight">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(232,168,124,0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Decorative line top */}
      <motion.div
        className="relative z-10 w-16 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent mx-auto mb-16 md:mb-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Message container */}
      <motion.div
        className="relative z-10 max-w-xl mx-auto px-8 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {messageLines.map((line, index) =>
          line.spacer ? (
            <div key={index} className="h-6 md:h-8" />
          ) : (
            <motion.p
              key={index}
              variants={lineVariants}
              className={`
                leading-relaxed md:leading-loose
                ${line.style === 'script'
                  ? `font-script ${line.size} text-rose-gold-light mb-4`
                  : 'font-serif text-base sm:text-lg md:text-xl text-pearl/85'
                }
              `}
            >
              {line.text}
            </motion.p>
          )
        )}
      </motion.div>

      {/* Final birthday wish */}
      <motion.div
        className="relative z-10 text-center mt-16 md:mt-24 px-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gradient"
          style={{ animation: 'text-glow 4s ease-in-out infinite' }}
        >
          Happy Birthday, Siddhi ❤️
        </motion.h2>

        <motion.div
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="font-script text-xl sm:text-2xl text-rose-gold/80">
            — Pritesh Patil
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative line bottom */}
      <motion.div
        className="relative z-10 w-16 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent mx-auto mt-16 md:mt-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </section>
  );
}
