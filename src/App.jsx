import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import HeroIntro from './components/HeroIntro';
import CinematicReveal from './components/CinematicReveal';
import BirthdayMessage from './components/BirthdayMessage';
import PhotoGallery from './components/PhotoGallery';
import SurpriseSection from './components/SurpriseSection';
import FinalSection from './components/FinalSection';
import MusicControl from './components/MusicControl';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    // Smooth scroll to reveal section after a brief delay
    setTimeout(() => {
      const target = document.getElementById('cinematic-reveal');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-midnight">
      {/* Global particle background */}
      <ParticleBackground />

      {/* Hero intro — full screen overlay until dismissed */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="hero-overlay"
            className="fixed inset-0"
            style={{ zIndex: 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroIntro onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — always rendered but hidden behind intro */}
      <main className="relative" style={{ zIndex: 2 }}>
        {/* Cinematic photo reveal */}
        <CinematicReveal />

        {/* Birthday message */}
        <BirthdayMessage />

        {/* Photo gallery */}
        <PhotoGallery />

        {/* Surprise section */}
        <SurpriseSection />

        {/* Final section */}
        <FinalSection />
      </main>

      {/* Music control */}
      <MusicControl />
    </div>
  );
}
