import React, { useState } from 'react';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';
import { Heart, RotateCw, Sparkles, X } from 'lucide-react';

export default function LoveCards() {
  const [flipped, setFlipped] = useState({});

  const cards = storyData.thingsILove;

  const handleCardClick = (id) => {
    sfx.playPop();
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="things-i-love" className="relative w-full max-w-5xl mx-auto py-16 px-4 z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-[#EF233C]/20 border border-[#EF233C]/50 text-[#EF233C] text-sm font-semibold tracking-widest uppercase mb-3">
            SPECIAL REASONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-comic text-[#F8F8F8] text-glow-red mb-3">
            THINGS I LOVE ABOUT YOU
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-xl font-light italic max-w-md mx-auto">
            "Click any comic card below to read a little note about you."
          </p>
        </div>
      </div>

      {/* Grid of Solid Interactive Cards (Fail-Proof Toggle) */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {cards.map((card) => {
          const isFlipped = flipped[card.id];

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="w-full min-h-[220px] sm:min-h-[240px] cursor-pointer relative select-none rounded-2xl transition-all duration-300 transform active:scale-95"
            >
              {!isFlipped ? (
                /* FRONT OF CARD (Unflipped State) */
                <div className="w-full h-full min-h-[220px] sm:min-h-[240px] bg-[#0f121d] border-3 border-[#EF233C] rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center comic-dots shadow-[0_0_25px_rgba(239,35,60,0.3)] hover:border-white hover:shadow-[0_0_35px_rgba(239,35,60,0.6)] transition-all">
                  {/* Comic Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#B91C2F] text-white text-[11px] font-comic tracking-wider">
                    #{card.id}
                  </div>

                  <div className="w-12 h-12 rounded-full bg-[#EF233C]/20 border border-[#EF233C] flex items-center justify-center mb-3">
                    <Heart className="w-6 h-6 text-[#EF233C] fill-[#EF233C]/40 animate-pulse" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-comic text-white mb-2 leading-tight">
                    "{card.front}"
                  </h3>

                  <div className="mt-3 px-3 py-1 rounded-full bg-[#EF233C]/20 border border-[#EF233C]/60 text-xs font-semibold text-[#FF7AA2] flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-[#EF233C]" />
                    <span>Click to reveal ✦</span>
                  </div>
                </div>
              ) : (
                /* BACK OF CARD (Flipped State) */
                <div className="w-full h-full min-h-[220px] sm:min-h-[240px] bg-gradient-to-br from-[#2b0d1e] via-[#3a1028] to-[#170813] border-3 border-[#FF7AA2] rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_0_35px_rgba(255,122,162,0.6)] relative animate-fadeIn">
                  {/* Close Indicator */}
                  <div className="absolute top-3 right-3 p-1 rounded-full bg-[#FF7AA2]/20 border border-[#FF7AA2] text-[#FF7AA2]">
                    <X className="w-4 h-4" />
                  </div>

                  <div className="flex items-center gap-1.5 text-[#FF7AA2] text-xs font-comic mb-2">
                    <Sparkles className="w-4 h-4 text-[#FF7AA2]" />
                    <span className="tracking-widest uppercase">Secret Note #{card.id}</span>
                  </div>

                  <p className="font-handwriting text-xl sm:text-2xl md:text-3xl text-slate-100 leading-relaxed font-semibold my-2 px-2">
                    "{card.back}"
                  </p>

                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    (Click anywhere to close)
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
