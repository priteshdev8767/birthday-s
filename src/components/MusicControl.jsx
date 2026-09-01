import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if audio file exists
    const audio = new Audio('/music/birthday-song.mp3');
    audio.addEventListener('canplaythrough', () => {
      setHasAudio(true);
      audioRef.current = audio;
      audio.loop = true;
      audio.volume = 0.4;

      // Check localStorage for saved preference
      const saved = localStorage.getItem('siddhi-birthday-music');
      if (saved === 'playing') {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    });
    audio.addEventListener('error', () => {
      // No audio file — show placeholder
      setHasAudio(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('siddhi-birthday-music', 'paused');
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        localStorage.setItem('siddhi-birthday-music', 'playing');
      }).catch(() => {});
    }
  }, [isPlaying]);

  // Don't render if no audio
  if (!hasAudio) return null;

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer safe-bottom"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.svg
            key="playing"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-rose-gold-light"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
          </motion.svg>
        ) : (
          <motion.svg
            key="paused"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-whisper"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Pulse ring when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border border-rose-gold/30"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.button>
  );
}
