import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';
import { X, Calendar, Heart, Sparkles } from 'lucide-react';

export default function StoryTimeline() {
  const [selectedItem, setSelectedItem] = useState(null);

  const timelineItems = storyData.storyTimeline;

  return (
    <section id="our-story" className="relative w-full max-w-5xl mx-auto py-16 px-4 z-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#EF233C]/20 border border-[#EF233C]/50 text-[#EF233C] text-sm font-semibold tracking-widest uppercase mb-3">
            BAB 01: AWAL MULA
          </span>
          <h2 className="text-4xl md:text-6xl font-comic text-[#F8F8F8] text-glow-red mb-3">
            KRONOLOGI BERSAMAMU
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light italic max-w-lg mx-auto">
            "Niatnya cuma kenalan biasa, eh malah bikin kecanduan kangen setiap hari!"
          </p>
        </motion.div>
      </div>

      {/* Web Path Timeline Container */}
      <div className="relative">
        {/* Animated Web Thread Line running down center (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-0">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="w-full h-full bg-gradient-to-b from-[#EF233C] via-[#2563EB] to-[#EF233C] shadow-[0_0_12px_#EF233C]"
          />
          {/* Animated Web Nodes along the path */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#EF233C] animate-ping" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#EF233C] animate-ping" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-20 relative z-10">
          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-6 md:gap-12`}
              >
                {/* Comic Card */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.03, rotate: isEven ? 1.5 : -1.5 }}
                    onClick={() => {
                      sfx.playPop();
                      setSelectedItem(item);
                    }}
                    className="comic-panel p-5 md:p-6 rounded-2xl cursor-pointer group"
                  >
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-3 border-b border-slate-700/60 pb-2">
                      <span className="text-xs md:text-sm font-comic tracking-widest text-[#EF233C] bg-[#EF233C]/10 px-3 py-1 rounded-full border border-[#EF233C]/30 flex items-center gap-1.5">
                        <span>{item.icon}</span>
                        <span>{item.tag}</span>
                      </span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                        {item.date}
                      </span>
                    </div>

                    {/* Content & Comic Photo Frame */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-full aspect-[16/10] sm:aspect-square sm:w-40 sm:h-40 shrink-0 rounded-xl overflow-hidden border-2 border-white bg-slate-900 shadow-md group-hover:shadow-[0_0_15px_rgba(239,35,60,0.5)] transition-all">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 text-left w-full">
                        <h3 className="text-2xl font-comic text-white group-hover:text-[#EF233C] transition-colors mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                        <span className="inline-block mt-3 text-xs font-semibold text-[#FF7AA2] group-hover:underline">
                          Klik untuk baca cerita ✦
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Center Web Node Circle (Desktop) */}
                <div className="hidden md:flex relative items-center justify-center shrink-0 w-12 h-12 rounded-full bg-[#08090D] border-4 border-[#EF233C] shadow-[0_0_20px_#EF233C] text-xl z-20">
                  <span>{item.icon}</span>
                </div>

                {/* Empty Spacer Column for layout symmetry */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Card Detail Fullscreen Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f121d] border-4 border-[#EF233C] rounded-3xl max-w-lg w-full p-6 relative shadow-[0_0_50px_rgba(239,35,60,0.6)] comic-dots"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-[#B91C2F] text-white rounded-full hover:bg-[#EF233C] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="w-full h-56 rounded-2xl overflow-hidden border-4 border-white mb-5 shadow-lg">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tag & Title */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-comic text-[#EF233C] bg-[#EF233C]/20 px-3 py-1 rounded-full border border-[#EF233C]">
                  {selectedItem.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedItem.date}</span>
              </div>
              <h3 className="text-3xl font-comic text-white mb-3">{selectedItem.title}</h3>

              <p className="text-slate-200 text-base leading-relaxed mb-6 font-light">
                {selectedItem.description}
              </p>

              {/* Romantic Quote */}
              <div className="p-4 rounded-xl bg-[#171c2b] border-l-4 border-[#2563EB] italic text-[#FF7AA2] text-sm flex items-center gap-3">
                <Sparkles className="w-5 h-5 shrink-0 text-[#2563EB]" />
                <span>"{selectedItem.quote}"</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
