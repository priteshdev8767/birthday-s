import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';

const photos = [
  '/photos/siddhi-1.png',
  '/photos/siddhi-2.png',
  '/photos/siddhi-3.png',
  '/photos/siddhi-4.png',
  '/photos/siddhi-5.png',
  '/photos/siddhi-6.png',
  '/photos/siddhi-7.png',
  '/photos/siddhi-8.png',
];

// Define aspect styles for masonry effect on desktop
const photoStyles = [
  'row-span-2',      // tall - saree side profile
  '',                 // normal - front facing smile
  'row-span-2',      // tall - side profile jewelry
  '',                 // normal - looking down
  'row-span-2',      // tall - garden profile
  '',                 // normal - mountain smile
  '',                 // normal - mountain standing
  'row-span-2',      // tall - purple saree portrait
];

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback((index) => {
    if (index >= 0 && index < photos.length) {
      setLightboxIndex(index);
    }
  }, []);

  return (
    <section
      id="photo-gallery"
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-deep" />

      {/* Section title */}
      <motion.div
        className="relative z-10 text-center mb-12 md:mb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-pearl">
          Moments
        </h2>
        <p className="text-sparkle text-xl mt-3 opacity-70">✨</p>
      </motion.div>

      {/* Mobile: Horizontal scroll carousel */}
      <div className="md:hidden relative z-10">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory gallery-scroll"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style>{`
            .gallery-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          {photos.map((photo, index) => (
            <motion.button
              key={index}
              className="flex-shrink-0 snap-center cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => openLightbox(index)}
              aria-label={`View photo ${index + 1}`}
            >
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden">
                <img
                  src={photo}
                  alt={`Siddhi - Photo ${index + 1}`}
                  className="w-full h-full object-cover cinematic-image transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl border border-glass-border" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.p
          className="text-center text-whisper text-xs tracking-widest mt-4 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
        >
          Swipe to explore · Tap to view
        </motion.p>
      </div>

      {/* Desktop: Masonry-ish grid */}
      <div className="hidden md:grid relative z-10 max-w-5xl mx-auto px-8 grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
        {photos.map((photo, index) => (
          <motion.button
            key={index}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${photoStyles[index]}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            aria-label={`View photo ${index + 1}`}
          >
            <img
              src={photo}
              alt={`Siddhi - Photo ${index + 1}`}
              className="w-full h-full object-cover cinematic-image transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
              decoding="async"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Border */}
            <div className="absolute inset-0 rounded-2xl border border-glass-border group-hover:border-rose-gold/20 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
}
