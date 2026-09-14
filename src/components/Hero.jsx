import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';

export default function Hero({ onEnter }) {
  const [webReady, setWebReady] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    // Reveal text after web lines finish drawing
    const timer = setTimeout(() => {
      setWebReady(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = () => {
    sfx.playWebShoot();
    setIsZooming(true);
    setTimeout(() => {
      onEnter();
    }, 600);
    setTimeout(() => {
      setIsZooming(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden z-20 px-4">
      {/* Zoom-in overlay on click */}
      <motion.div
        initial={false}
        animate={{
          scale: isZooming ? 15 : 1,
          opacity: isZooming ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="w-full flex flex-col items-center justify-center relative"
      >
        {/* Large Central SVG Spider Web */}
        <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          <svg
            className="w-full h-full text-red-600/80 web-glow-red"
            viewBox="0 0 500 500"
            fill="none"
          >
            {/* Concentric Web Rings */}
            {[50, 100, 160, 220].map((radius, idx) => (
              <motion.polygon
                key={`ring-${idx}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 + idx * 0.25,
                  ease: "easeInOut"
                }}
                points={`
                  ${250 + radius * Math.cos(0)},${250 + radius * Math.sin(0)}
                  ${250 + radius * Math.cos(Math.PI/4)},${250 + radius * Math.sin(Math.PI/4)}
                  ${250 + radius * Math.cos(Math.PI/2)},${250 + radius * Math.sin(Math.PI/2)}
                  ${250 + radius * Math.cos(3*Math.PI/4)},${250 + radius * Math.sin(3*Math.PI/4)}
                  ${250 + radius * Math.cos(Math.PI)},${250 + radius * Math.sin(Math.PI)}
                  ${250 + radius * Math.cos(5*Math.PI/4)},${250 + radius * Math.sin(5*Math.PI/4)}
                  ${250 + radius * Math.cos(3*Math.PI/2)},${250 + radius * Math.sin(3*Math.PI/2)}
                  ${250 + radius * Math.cos(7*Math.PI/4)},${250 + radius * Math.sin(7*Math.PI/4)}
                `}
                stroke="#EF233C"
                strokeWidth="1.8"
                fill="none"
              />
            ))}

            {/* Radial Web Spoke Lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 250 + 240 * Math.cos(rad);
              const y2 = 250 + 240 * Math.sin(rad);
              return (
                <motion.line
                  key={`spoke-${idx}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{
                    duration: 1,
                    delay: 0.1 * idx,
                    ease: "easeOut"
                  }}
                  x1="250"
                  y1="250"
                  x2={x2}
                  y2={y2}
                  stroke="#F8F8F8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
              );
            })}

            {/* Glowing Web Center Node */}
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              cx="250"
              cy="250"
              r="8"
              fill="#EF233C"
              className="web-glow-red"
            />
          </svg>

          {/* Center Couple Photo Frame in the Spider Web */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: webReady ? 1 : 0, opacity: webReady ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute z-20 pointer-events-none"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-white shadow-[0_0_30px_#EF233C] group">
              <img
                src={storyData.hero.centerPhoto || "/photos/photo1.jpeg"}
                alt="Us in the web"
                className="w-full h-full object-cover"
              />
              {/* Overlay Web Badge icon */}
              <div className="absolute bottom-0 right-0 p-1 bg-[#EF233C] rounded-full border border-white">
                <span className="text-xs block leading-none">🕷️</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Reveal & Action Button */}
        <AnimatePresence>
          {webReady && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mt-6 z-30 max-w-xl"
            >
              {/* Main Title */}
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-comic text-[#F8F8F8] tracking-wider text-glow-red mb-3"
              >
                {storyData.hero.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-slate-200 font-light italic mb-8 max-w-md mx-auto leading-relaxed"
              >
                "{storyData.hero.subtitle}"
              </motion.p>

              {/* Enter Button */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative inline-block"
              >
                {/* Button Hover Web Shooters Effect */}
                {buttonHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    className="absolute -inset-4 pointer-events-none"
                  >
                    <svg className="w-full h-full stroke-red-500/60" viewBox="0 0 100 100">
                      <line x1="0" y1="50" x2="100" y2="50" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="50" y1="0" x2="50" y2="100" strokeWidth="1" strokeDasharray="2 2" />
                      <circle cx="50" cy="50" r="45" fill="none" strokeWidth="1" opacity="0.4" />
                    </svg>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => {
                    setButtonHovered(true);
                    sfx.playPop();
                  }}
                  onHoverEnd={() => setButtonHovered(false)}
                  onClick={handleEnterClick}
                  className="px-8 py-4 bg-gradient-to-r from-[#B91C2F] via-[#EF233C] to-[#B91C2F] text-white font-comic text-2xl rounded-2xl border-2 border-white/30 shadow-[0_0_25px_rgba(239,35,60,0.6)] hover:shadow-[0_0_40px_rgba(239,35,60,0.9)] transition-all duration-300 flex items-center gap-3 mx-auto tracking-wide group"
                >
                  <span className="group-hover:rotate-12 transition-transform duration-300">🕷️</span>
                  <span>{storyData.hero.buttonText}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
