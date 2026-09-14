import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';
import { Mail, Heart, Sparkles, RefreshCw } from 'lucide-react';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fullText = storyData.loveLetter.content;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    sfx.playEnvelopeOpen();
    setIsOpen(true);
  };

  // Typing animation effect for the letter text
  useEffect(() => {
    if (!isOpen) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let index = 0;
    const speed = 35; // ms per character

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isOpen, fullText]);

  return (
    <section id="love-letter" className="relative w-full max-w-4xl mx-auto py-16 px-4 z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#FF7AA2]/20 border border-[#FF7AA2]/50 text-[#FF7AA2] text-sm font-semibold tracking-widest uppercase mb-3">
            BAB 03: SURAT UNTUKMU
          </span>
          <h2 className="text-4xl md:text-6xl font-comic text-[#F8F8F8] text-glow-red mb-3">
            SURAT DARI HATI 💌
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light italic max-w-md mx-auto">
            "{storyData.loveLetter.header}"
          </p>
        </motion.div>
      </div>

      {/* Interactive Envelope / Letter Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[420px]">
        {/* Warm Ambient Glow when letter opens */}
        <div
          className={`absolute inset-0 rounded-3xl transition-all duration-1000 pointer-events-none filter blur-3xl ${
            isOpen
              ? 'bg-gradient-to-r from-[#EF233C]/30 via-[#FF7AA2]/20 to-[#B91C2F]/30 opacity-100'
              : 'opacity-0'
          }`}
        />

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED RED ENVELOPE */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="relative cursor-pointer group"
              onClick={handleOpenEnvelope}
            >
              {/* Envelope Floating & Swaying Animation */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-[300px] h-[200px] sm:w-[380px] sm:h-[240px] bg-gradient-to-br from-[#B91C2F] via-[#EF233C] to-[#8a1020] rounded-2xl border-4 border-white/80 shadow-[0_20px_40px_rgba(239,35,60,0.5)] flex flex-col items-center justify-center relative overflow-hidden group-hover:shadow-[0_25px_50px_rgba(239,35,60,0.8)] group-hover:scale-105 transition-all"
              >
                {/* Envelope Front Flap V-Shape SVG */}
                <svg className="absolute inset-0 w-full h-full stroke-white/40 fill-none" viewBox="0 0 380 240">
                  <path d="M0,0 L190,130 L380,0" strokeWidth="3" />
                  <path d="M0,240 L150,110" strokeWidth="2" />
                  <path d="M380,240 L230,110" strokeWidth="2" />
                  {/* Subtle Spider Web Motif on Envelope */}
                  <circle cx="190" cy="130" r="30" stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
                </svg>

                {/* Central Wax Heart Seal */}
                <div className="z-10 w-16 h-16 rounded-full bg-[#08090D] border-2 border-[#EF233C] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                  <Heart className="w-8 h-8 text-[#EF233C] fill-[#EF233C] animate-pulse" />
                </div>

                {/* Click Instruction Badge */}
                <div className="z-10 mt-4 px-4 py-1 rounded-full bg-black/60 border border-white/30 text-white text-xs font-comic tracking-wider">
                  KLIK UNTUK MEMBUKA SURAT 💌
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* OPENED LOVE LETTER */
            <motion.div
              key="opened-letter"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 180 }}
              className="w-full max-w-2xl bg-[#0f121d] border-4 border-[#EF233C] rounded-3xl p-6 md:p-10 shadow-[0_0_60px_rgba(239,35,60,0.5)] relative comic-dots"
            >
              {/* Spider Web Corner Motifs */}
              <svg className="absolute top-0 right-0 w-24 h-24 stroke-red-500/40 pointer-events-none" viewBox="0 0 100 100">
                <path d="M100,0 L0,0 M100,0 L100,100 M100,0 L50,50" strokeWidth="2" />
                <path d="M100,30 Q70,30 70,0 M100,60 Q40,60 40,0" strokeWidth="1" fill="none" />
              </svg>

              {/* Top Letter Header */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6">
                <div className="flex items-center gap-2 text-[#EF233C] font-comic text-xl">
                  <Mail className="w-6 h-6" />
                  <span>Pesan Khusus Untukmu</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 bg-[#1c2233] text-slate-300 hover:text-white rounded-lg text-xs flex items-center gap-1.5 border border-slate-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Tutup Surat
                </button>
              </div>

              {/* Animated Typed Content */}
              <div className="font-handwriting text-2xl md:text-3xl text-slate-100 leading-relaxed font-semibold min-h-[200px] whitespace-pre-line tracking-wide">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-7 bg-[#EF233C] ml-1 animate-pulse" />
                )}
              </div>

              {/* Letter Sign-off Footer */}
              <div className="mt-8 pt-4 border-t border-slate-700/80 flex items-center justify-between text-slate-400 text-sm">
                <span className="italic">Dengan penuh kasih sayang,</span>
                <span className="font-comic text-lg text-[#EF233C] flex items-center gap-1">
                  <span>Spidermu</span>
                  <span>🕷️❤️</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
