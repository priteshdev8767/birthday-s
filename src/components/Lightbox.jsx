import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight') onNavigate(currentIndex + 1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNavigate, currentIndex]);

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0 && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      } else if (distance < 0 && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
    }
  }, [touchStart, touchEnd, currentIndex, images.length, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 100 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-midnight/95 backdrop-blur-xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-pearl/80 hover:text-pearl transition-colors cursor-pointer safe-top"
          aria-label="Close lightbox"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-7 left-6 z-50 text-sm text-whisper font-sans tracking-widest safe-top">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Image */}
        <motion.div
          className="relative z-40 w-full h-full flex items-center justify-center px-4 py-20"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>

        {/* Navigation arrows (desktop) */}
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full glass items-center justify-center text-pearl/70 hover:text-pearl transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="12,4 6,10 12,16" />
            </svg>
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full glass items-center justify-center text-pearl/70 hover:text-pearl transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="8,4 14,10 8,16" />
            </svg>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
