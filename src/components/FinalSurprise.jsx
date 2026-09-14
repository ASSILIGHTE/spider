import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';
import { Heart, RotateCcw, Sparkles, Star } from 'lucide-react';

export default function FinalSurprise({ onReplay }) {
  const [isPulled, setIsPulled] = useState(false);

  const data = storyData.finalSurprise;

  const handlePullWeb = () => {
    sfx.playWebShoot();
    setIsPulled(true);

    // Fire Confetti bursts
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#EF233C', '#FFFFFF', '#B91C2F'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#2563EB', '#FF7AA2'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#EF233C', '#FFFFFF'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section id="final-surprise" className="relative w-full max-w-5xl mx-auto py-20 px-4 z-20 text-center min-h-[600px] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!isPulled ? (
          /* PRE-PULL STATE: TEASER & BIG WEB */
          <motion.div
            key="pre-pull"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EF233C]/20 border border-[#EF233C]/50 text-[#EF233C] text-sm font-semibold tracking-widest uppercase mb-4">
              CHAPTER 04: FINAL SURPRISE
            </span>

            <h2 className="text-3xl md:text-5xl font-comic text-[#F8F8F8] text-glow-red mb-2">
              {data.teaserHeader}
            </h2>
            <p className="text-slate-300 text-lg md:text-xl font-light italic mb-8">
              "{data.teaserSub}"
            </p>

            {/* Central Web Pull Trigger Target */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center my-4">
              <svg className="w-full h-full stroke-red-600/60 web-glow-red" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="180" strokeWidth="1.5" strokeDasharray="6 4" />
                <circle cx="200" cy="200" r="120" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="60" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="0" y1="200" x2="400" y2="200" strokeWidth="1.5" />
                <line x1="200" y1="0" x2="200" y2="400" strokeWidth="1.5" />
                <line x1="50" y1="50" x2="350" y2="350" strokeWidth="1.5" />
                <line x1="350" y1="50" x2="50" y2="350" strokeWidth="1.5" />
              </svg>

              {/* Big Pull Web Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePullWeb}
                className="absolute px-8 py-5 bg-gradient-to-r from-[#B91C2F] via-[#EF233C] to-[#B91C2F] text-white font-comic text-2xl md:text-3xl rounded-3xl border-4 border-white shadow-[0_0_40px_rgba(239,35,60,0.8)] hover:shadow-[0_0_60px_rgba(239,35,60,1)] transition-all flex items-center gap-3 group"
              >
                <span className="group-hover:rotate-45 transition-transform">🕷️</span>
                <span>{data.buttonText}</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* POST-PULL STATE: CINEMATIC REVEAL & CONFETTI */
          <motion.div
            key="post-pull"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
            className="w-full flex flex-col items-center"
          >
            {/* Comic Panel Container */}
            <div className="comic-panel p-6 md:p-10 rounded-3xl max-w-3xl w-full border-4 border-[#EF233C] shadow-[0_0_80px_rgba(239,35,60,0.8)] relative comic-dots overflow-hidden">
              {/* Couple Center Photo */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-[0_0_30px_#EF233C] mb-6 relative group"
              >
                <img
                  src={data.couplePhoto}
                  alt="Us"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>

              {/* Main Headline */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-5xl font-comic text-[#F8F8F8] text-glow-red leading-tight mb-4"
              >
                {data.mainQuote}
              </motion.h2>

              {/* Sub quote */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-handwriting text-2xl md:text-4xl text-[#FF7AA2] font-bold mb-8 max-w-lg mx-auto leading-relaxed"
              >
                "{data.subQuote}"
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
