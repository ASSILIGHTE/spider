import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingSpider() {
  const [spiderState, setSpiderState] = useState('hidden'); // 'descending', 'pausing', 'ascending', 'hidden'
  const [posX, setPosX] = useState(50); // percentage X
  const [threadLength, setThreadLength] = useState(150); // px

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const intervalTime = isMobile ? 22000 : 12000; // less frequent on mobile

    const triggerSpider = () => {
      // Random X position between 15% and 85%
      const randomX = Math.floor(Math.random() * 70) + 15;
      const randomDrop = Math.floor(Math.random() * 120) + 120;
      setPosX(randomX);
      setThreadLength(randomDrop);
      setSpiderState('descending');

      // Timeline of actions
      setTimeout(() => setSpiderState('pausing'), 3000);
      setTimeout(() => setSpiderState('ascending'), 7000);
      setTimeout(() => setSpiderState('hidden'), 10000);
    };

    // First trigger after 4 seconds
    const initialTimer = setTimeout(triggerSpider, 4000);
    const loopInterval = setInterval(triggerSpider, intervalTime);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, []);

  if (spiderState === 'hidden') return null;

  return (
    <div 
      className="fixed top-0 z-40 pointer-events-none flex flex-col items-center"
      style={{ left: `${posX}%` }}
    >
      {/* Spider Web Thread */}
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: spiderState === 'ascending' ? 0 : threadLength,
        }}
        transition={{
          duration: spiderState === 'ascending' ? 2.5 : 3,
          ease: "easeInOut"
        }}
        className="w-[1.5px] bg-gradient-to-b from-white/80 via-red-500/70 to-white/90 shadow-[0_0_6px_#EF233C]"
      />

      {/* Cute Spider Character */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: spiderState === 'ascending' ? [1, 0.8, 0] : 1,
          rotate: spiderState === 'pausing' ? [0, -12, 12, -6, 0] : 0,
          y: spiderState === 'pausing' ? [0, 4, -4, 0] : 0
        }}
        transition={{
          rotate: { duration: 2, repeat: spiderState === 'pausing' ? 1 : 0 },
          y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="relative -mt-1 cursor-pointer pointer-events-auto"
        onClick={() => {
          // Play ascending on click
          setSpiderState('ascending');
        }}
      >
        {/* Spider SVG Body */}
        <svg className="w-10 h-10 md:w-12 md:h-12 filter drop-shadow-[0_0_8px_rgba(239,35,60,0.8)]" viewBox="0 0 100 100">
          {/* Spider Legs */}
          {/* Left Legs */}
          <path d="M40,45 C20,30 10,40 15,55" fill="none" stroke="#EF233C" strokeWidth="4" strokeLinecap="round" />
          <path d="M40,50 C15,40 5,55 10,70" fill="none" stroke="#EF233C" strokeWidth="4" strokeLinecap="round" />
          <path d="M40,55 C18,55 8,70 15,85" fill="none" stroke="#EF233C" strokeWidth="4" strokeLinecap="round" />
          <path d="M42,60 C22,70 12,85 22,95" fill="none" stroke="#EF233C" strokeWidth="3.5" strokeLinecap="round" />

          {/* Right Legs */}
          <path d="M60,45 C80,30 90,40 85,55" fill="none" stroke="#EF233C" strokeWidth="4" strokeLinecap="round" />
          <path d="M60,50 C85,40 95,55 90,70" fill="none" stroke="#EF233C" strokeWidth="4" strokeLinecap="round" />
          <path d="M60,55 C82,55 92,70 85,85" fill="none" stroke="#EF233C" strokeWidth="4" strokeLinecap="round" />
          <path d="M58,60 C78,70 88,85 78,95" fill="none" stroke="#EF233C" strokeWidth="3.5" strokeLinecap="round" />

          {/* Spider Abdomen (Big back circle) */}
          <circle cx="50" cy="65" r="20" fill="#08090D" stroke="#EF233C" strokeWidth="4" />
          {/* Heart Motif on Abdomen */}
          <path d="M50,56 C47,52 42,54 42,58 C42,63 50,69 50,69 C50,69 58,63 58,58 C58,54 53,52 50,56 Z" fill="#EF233C" />

          {/* Spider Head */}
          <circle cx="50" cy="42" r="14" fill="#08090D" stroke="#EF233C" strokeWidth="3" />

          {/* Cute Big Eyes */}
          <circle cx="44" cy="40" r="4" fill="#FFFFFF" />
          <circle cx="56" cy="40" r="4" fill="#FFFFFF" />
          <circle cx="45" cy="40" r="2" fill="#08090D" />
          <circle cx="57" cy="40" r="2" fill="#08090D" />

          {/* Cute blushed cheeks */}
          <ellipse cx="40" cy="45" rx="2" ry="1" fill="#FF7AA2" />
          <ellipse cx="60" cy="45" rx="2" ry="1" fill="#FF7AA2" />
        </svg>
      </motion.div>
    </div>
  );
}
