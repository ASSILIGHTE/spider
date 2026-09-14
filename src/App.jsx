import React, { useState, useEffect } from 'react';
import CityParallaxBg from './components/CityParallaxBg';
import WebCursorEffect from './components/WebCursorEffect';
import FloatingSpider from './components/FloatingSpider';
import Hero from './components/Hero';
import WebNavigation from './components/WebNavigation';
import StoryTimeline from './components/StoryTimeline';
import PhotoWeb from './components/PhotoWeb';
import LoveLetter from './components/LoveLetter';
import LoveCards from './components/LoveCards';
import MusicPlayer from './components/MusicPlayer';
import FinalSurprise from './components/FinalSurprise';
import { storyData } from './data/storyData';
import { RotateCcw } from 'lucide-react';
import { sfx } from './utils/audioSynthesizer';

export default function App() {
  const [activeSection, setActiveSection] = useState('our-story');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHeroEnter = () => {
    const musicSection = document.getElementById('our-song');
    if (musicSection) {
      musicSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToSection('our-story');
    }
  };

  const handleReplay = () => {
    sfx.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#08090D] text-[#F8F8F8] overflow-x-hidden font-sans selection:bg-[#EF233C] selection:text-white">
      {/* Background City Parallax */}
      <CityParallaxBg />

      {/* Web Shooting & Ripple Cursor Overlay */}
      <WebCursorEffect />

      {/* Floating Spider Character */}
      <FloatingSpider />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 🕷️ Hero Section */}
        <Hero onEnter={handleHeroEnter} />

        {/* 🎵 Section — Our Song (Placed before Web Navigation) */}
        <MusicPlayer />

        {/* 🕸️ Interactive Spider Web Navigation */}
        <div id="web-nav" className="pt-8">
          <WebNavigation
            activeSection={activeSection}
            onSelectNode={scrollToSection}
          />
        </div>

        {/* ❤️ Section 01 — Our Story */}
        <StoryTimeline />

        {/* 📸 Section 02 — Photo Web */}
        <PhotoWeb />

        {/* 💌 Section 03 — Love Letter */}
        <LoveLetter />

        {/* 🎁 Section 04 — The Last Web */}
        <FinalSurprise onReplay={handleReplay} />

        {/* 💕 Final Section — Things I Love About You */}
        <LoveCards />

        {/* 🔄 Replay Button at the end of all chapters */}
        <div className="py-12 text-center">
          <button
            onClick={handleReplay}
            className="px-8 py-4 bg-[#1e2433] hover:bg-[#B91C2F] text-white font-comic text-xl md:text-2xl rounded-2xl border-2 border-slate-500 hover:border-white transition-all flex items-center gap-3 mx-auto shadow-[0_0_25px_rgba(239,35,60,0.4)] hover:shadow-[0_0_40px_rgba(239,35,60,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-6 h-6 text-[#EF233C]" />
            <span>REPLAY OUR STORY</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 py-8 px-4 text-center bg-[#06070a]/90 backdrop-blur-md">
        <p className="font-comic text-lg text-slate-300">
          SPIDER WEB LOVE 🕷️❤️
        </p>
        <p className="text-xs text-slate-500 mt-1 font-light">
          Made with love for {storyData.couple.name2} • {storyData.couple.anniversary}
        </p>
      </footer>
    </div>
  );
}
