import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export default function PhotoWeb() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const photos = storyData.photos;

  const handleNext = () => {
    sfx.playPop();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    sfx.playPop();
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="photo-web" className="relative w-full max-w-6xl mx-auto py-16 px-4 z-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/50 text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
            CHAPTER 02: GALLERY
          </span>
          <h2 className="text-4xl md:text-6xl font-comic text-[#F8F8F8] text-glow-blue mb-3">
            OUR MEMORY GALLERY
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light italic max-w-lg mx-auto">
            "A collection of sweet moments that always bring a smile to my face."
          </p>
        </motion.div>
      </div>

      {/* Spider Web Photo Grid Container */}
      <div className="relative p-6 md:p-10 rounded-3xl bg-[#0b0e17]/60 backdrop-blur-md border-2 border-[#1e2433] shadow-[0_0_50px_rgba(0,0,0,0.9)] comic-dots overflow-hidden">
        {/* SVG Web Background Mesh */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-700/40 pointer-events-none" viewBox="0 0 1000 600" fill="none">
          <circle cx="500" cy="300" r="120" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="300" r="240" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="300" r="380" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="0" x2="1000" y2="600" strokeWidth="1" />
          <line x1="1000" y1="0" x2="0" y2="600" strokeWidth="1" />
          <line x1="500" y1="0" x2="500" y2="600" strokeWidth="1" />
          <line x1="0" y1="300" x2="1000" y2="300" strokeWidth="1" />
        </svg>

        {/* Photo Grid (2-3 columns on mobile to preserve polaroid collage feel) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-6 md:gap-8 relative z-10">
          {photos.map((photo, index) => {
            const isHovered = hoveredIndex === index;

            return (
              /* Outer Scroll Entrance & Steady Card Wrapper */
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ scale: 1.04 }}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  sfx.playPop();
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  sfx.playPop();
                  setSelectedIndex(index);
                }}
                className="relative cursor-pointer group w-full"
                style={{ transform: `rotate(${photo.angle}deg)` }}
              >
                  {/* Connected Spider Thread to top */}
                  <div className="hidden sm:block absolute -top-6 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-gradient-to-b from-transparent to-red-500/60" />

                  {/* Comic Polaroid Photo Card */}
                  <div
                    className={`bg-white p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-xl transition-all duration-300 border-2 ${
                      isHovered
                        ? 'border-[#EF233C] shadow-[0_0_30px_rgba(239,35,60,0.6)] scale-105 z-20'
                        : 'border-slate-300 shadow-lg z-10'
                    }`}
                  >
                    {/* Photo Frame */}
                    <div className="relative aspect-[4/3] rounded-md sm:rounded-lg overflow-hidden bg-slate-900 mb-1.5 sm:mb-3">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Overlay Web Badge */}
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/30 opacity-80 group-hover:opacity-100">
                        <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#EF233C]" />
                      </div>
                    </div>

                  {/* Caption Banner */}
                  <p className="font-handwriting text-slate-800 text-xs sm:text-base md:text-lg leading-tight font-bold text-center truncate">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Background Floating Red Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#EF233C]/60 animate-ping"
                  style={{
                    top: `${(i * 29) % 100}%`,
                    left: `${(i * 47) % 100}%`,
                    animationDuration: `${2 + (i % 3)}s`,
                  }}
                />
              ))}
            </div>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a0d14] border-4 border-[#EF233C] rounded-3xl p-4 md:p-6 shadow-[0_0_60px_rgba(239,35,60,0.8)] comic-dots"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-4 -right-4 md:top-4 md:right-4 z-30 p-2.5 bg-[#B91C2F] text-white rounded-full hover:bg-[#EF233C] transition-colors border-2 border-white shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Image View */}
              <div className="relative w-full max-h-[65vh] h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-black mb-4">
                <img
                  src={photos[selectedIndex].src}
                  alt={photos[selectedIndex].caption}
                  className="w-full h-full object-contain"
                />

                {/* Left/Right Navigation Buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white border border-white/40 hover:bg-[#EF233C] transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white border border-white/40 hover:bg-[#EF233C] transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption & Counter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left px-2">
                <div>
                  <span className="text-xs font-comic text-[#EF233C] tracking-widest uppercase">
                    Memory {selectedIndex + 1} of {photos.length}
                  </span>
                  <h4 className="text-xl md:text-2xl font-handwriting text-white font-bold leading-snug">
                    "{photos[selectedIndex].caption}"
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-full bg-[#EF233C]/20 border border-[#EF233C] text-[#EF233C] flex items-center gap-1 font-comic">
                    <Sparkles className="w-3.5 h-3.5" />
                    Captured Forever
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
