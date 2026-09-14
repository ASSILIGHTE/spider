import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CityParallaxBg() {
  const { scrollY } = useScroll();

  // Hardware-accelerated GPU transforms off main thread
  const layer1Y = useTransform(scrollY, (y) => y * 0.04);
  const moonY = useTransform(scrollY, (y) => y * 0.08);
  const cloudY = useTransform(scrollY, (y) => y * 0.12);
  const distantCityY = useTransform(scrollY, (y) => y * 0.18);
  const foreCityY = useTransform(scrollY, (y) => y * 0.25);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#08090D] transform-gpu">
      {/* Halftone Overlay */}
      <div className="absolute inset-0 comic-dots opacity-40 z-10 pointer-events-none" />

      {/* Layer 1: Night Sky & Stars */}
      <motion.div 
        style={{ y: layer1Y }}
        className="absolute inset-0 bg-gradient-to-b from-[#06070a] via-[#0b0e17] to-[#120914] will-change-transform"
      >
        {/* Subtle twinkling stars */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                animationDuration: `${2.5 + (i % 3)}s`,
                animationDelay: `${(i % 5) * 0.3}s`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 2: Glowing Crimson Moon & Clouds */}
      <motion.div 
        style={{ y: moonY }}
        className="absolute top-10 right-[10%] md:right-[20%] w-44 h-44 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#EF233C] via-[#B91C2F] to-[#400810] opacity-80 filter blur-[1px] shadow-[0_0_80px_rgba(239,35,60,0.4)] will-change-transform"
      >
        {/* Spider Web motif on moon */}
        <svg className="w-full h-full opacity-25 stroke-white" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="20" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.5" />
          <line x1="15" y1="15" x2="85" y2="85" strokeWidth="0.5" />
          <line x1="15" y1="85" x2="85" y2="15" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Floating clouds */}
      <motion.div 
        style={{ y: cloudY }}
        className="absolute top-20 left-0 w-full h-40 opacity-20 pointer-events-none will-change-transform"
      >
        <motion.div 
          animate={{ x: ['-20%', '100%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="w-[600px] h-24 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent rounded-full filter blur-3xl"
        />
      </motion.div>

      {/* Layer 3: Distant Skyline Silhouette */}
      <motion.div 
        style={{ y: distantCityY }}
        className="absolute bottom-0 left-0 right-0 h-[45vh] opacity-40 bg-repeat-x bg-bottom flex items-end justify-around will-change-transform"
      >
        {/* SVG Distant Cityscape */}
        <svg className="w-full h-full text-[#141926] fill-current" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <rect x="50" y="150" width="80" height="250" />
          <rect x="150" y="100" width="110" height="300" />
          <rect x="280" y="200" width="70" height="200" />
          <rect x="370" y="80" width="130" height="320" />
          <polygon points="430,20 410,80 450,80" />
          <rect x="520" y="180" width="90" height="220" />
          <rect x="630" y="120" width="100" height="280" />
          <rect x="750" y="220" width="80" height="180" />
          <rect x="850" y="90" width="120" height="310" />
          <polygon points="910,30 890,90 930,90" />
          <rect x="990" y="160" width="100" height="240" />
          <rect x="1100" y="110" width="80" height="290" />
        </svg>
      </motion.div>

      {/* Animated Superhero Swinger Silhouette */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        <motion.div
          animate={{
            x: ['-20vw', '120vw'],
            y: ['20vh', '45vh', '15vh', '50vh', '30vh'],
            rotate: [12, -18, 20, -12, 8]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut"
          }}
          className="absolute w-20 h-20 md:w-28 md:h-28 opacity-90 will-change-transform transform-gpu"
        >
          {/* Iconic Acrobatic Swinging Spider-Man SVG */}
          <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(239,35,60,0.9)]">
            <line x1="-150" y1="-150" x2="65" y2="15" stroke="#F8F8F8" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.9" />
            <g transform="translate(5, 5)">
              <path d="M45 45 Q 25 35 15 25 Q 18 20 30 30 Q 42 38 48 42 Z" fill="#EF233C" />
              <path d="M52 38 Q 60 25 65 15 Q 70 18 64 28 Q 58 38 52 42 Z" fill="#EF233C" />
              <circle cx="65" cy="15" r="4.5" fill="#FFFFFF" stroke="#EF233C" strokeWidth="1.5" />
              <path d="M48 62 Q 35 70 28 85 Q 22 80 32 68 Q 42 58 52 58 Z" fill="#EF233C" />
              <path d="M28 85 Q 38 95 48 100 Q 45 105 32 96 Q 22 88 28 85 Z" fill="#B91C2F" />
              <path d="M45 65 Q 60 78 75 92 Q 78 88 65 72 Q 52 60 45 65 Z" fill="#EF233C" />
              <path d="M42 35 C 38 48, 40 60, 52 65 C 58 55, 56 42, 48 35 Z" fill="#EF233C" />
              <path d="M40 45 C 38 52, 40 58, 45 62 C 43 55, 42 48, 40 45 Z" fill="#2563EB" />
              <ellipse cx="46" cy="30" rx="9" ry="11" fill="#EF233C" transform="rotate(-15 46 30)" />
              <path d="M 41 24 C 44 22, 48 26, 48 31 C 44 32, 40 28, 41 24 Z" fill="#FFFFFF" stroke="#08090D" strokeWidth="1.5" />
              <path d="M 49 26 C 52 24, 55 28, 54 33 C 51 34, 48 30, 49 26 Z" fill="#FFFFFF" stroke="#08090D" strokeWidth="1.5" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Layer 4: Foreground Skyline Silhouette with Windows */}
      <motion.div 
        style={{ y: foreCityY }}
        className="absolute bottom-0 left-0 right-0 h-[35vh] md:h-[40vh] z-10 will-change-transform"
      >
        <svg className="w-full h-full text-[#0a0d14] fill-current" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <rect x="0" y="100" width="160" height="300" />
          <rect x="180" y="40" width="140" height="360" />
          {/* Windows */}
          <rect x="200" y="70" width="20" height="25" fill="#EF233C" opacity="0.7" />
          <rect x="240" y="70" width="20" height="25" fill="#2563EB" opacity="0.6" />
          <rect x="280" y="70" width="20" height="25" fill="#F8F8F8" opacity="0.5" />
          <rect x="200" y="120" width="20" height="25" fill="#F8F8F8" opacity="0.6" />
          <rect x="240" y="120" width="20" height="25" fill="#EF233C" opacity="0.8" />
          <rect x="280" y="120" width="20" height="25" fill="#2563EB" opacity="0.5" />
          
          <rect x="340" y="180" width="180" height="220" />
          <rect x="540" y="80" width="160" height="320" />
          <polygon points="620,10 590,80 650,80" />
          {/* Windows */}
          <rect x="570" y="110" width="25" height="30" fill="#EF233C" opacity="0.9" />
          <rect x="625" y="110" width="25" height="30" fill="#F8F8F8" opacity="0.7" />
          <rect x="570" y="160" width="25" height="30" fill="#2563EB" opacity="0.8" />
          
          <rect x="720" y="150" width="150" height="250" />
          <rect x="890" y="50" width="170" height="350" />
          <rect x="1080" y="120" width="120" height="280" />
        </svg>
      </motion.div>

      {/* Layer 5: Dark Vignette Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#08090D]/50 to-[#08090D] z-20 pointer-events-none" />
    </div>
  );
}
