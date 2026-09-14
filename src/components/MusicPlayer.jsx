import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';
import { Play, Pause, Volume2, VolumeX, Music, Radio, Sparkles } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [useSynthMode, setUseSynthMode] = useState(false);

  const audioRef = useRef(null);
  const song = storyData.music;

  const togglePlay = () => {
    sfx.playPop();

    if (isPlaying) {
      // Pause both audio sources
      if (audioRef.current) audioRef.current.pause();
      sfx.stopRomanticMusic();
      setIsPlaying(false);
    } else {
      if (useSynthMode) {
        sfx.startRomanticMusic();
        setIsPlaying(true);
      } else {
        if (!audioRef.current) return;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("HTML5 audio playback error, falling back to Romantic Synth BGM:", err);
            setUseSynthMode(true);
            sfx.startRomanticMusic();
            setIsPlaying(true);
          });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !useSynthMode) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current && !useSynthMode) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    sfx.enabled = isMuted; // Toggle synth mute as well
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="our-song" className="relative w-full max-w-4xl mx-auto py-16 px-4 z-20">
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={song.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
        onError={() => {
          // If local audio file fails to load, fallback to synth mode
          setUseSynthMode(true);
        }}
      />

      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/50 text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
            Soundtrack Cinta
          </span>
          <h2 className="text-4xl md:text-6xl font-comic text-[#F8F8F8] text-glow-blue mb-2">
            LAGU CINTA KITA
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Tekan putar untuk mendengarkan alunan musik romantis semesta cinta kita
          </p>
        </motion.div>
      </div>

      {/* Vinyl Music Player Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative bg-[#0b0e17] border-4 border-[#1e2433] rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] comic-dots max-w-2xl mx-auto overflow-hidden"
      >
        {/* Background Equalizer Pulse Glow */}
        <div
          className={`absolute -inset-10 rounded-3xl transition-opacity duration-700 pointer-events-none filter blur-3xl ${
            isPlaying ? 'bg-[#EF233C]/20 opacity-100 animate-pulse' : 'opacity-0'
          }`}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Vinyl Record Disc Animation */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
              }}
              className="w-full h-full rounded-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-950 p-2 border-4 border-slate-700 shadow-2xl flex items-center justify-center relative"
            >
              {/* Vinyl Groove Rings */}
              <div className="w-[90%] h-[90%] rounded-full border border-neutral-700/50 flex items-center justify-center">
                <div className="w-[75%] h-[75%] rounded-full border border-neutral-700/50 flex items-center justify-center">
                  <div className="w-[60%] h-[60%] rounded-full border border-neutral-700/50 flex items-center justify-center">
                    {/* Vinyl Center Cover Art Label */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/60 shadow-md">
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Central Spindle Hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#08090D] border-2 border-white pointer-events-none" />
          </div>

          {/* Player Info & Controls */}
          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#EF233C] text-xs font-comic tracking-wider mb-1">
              <Music className="w-4 h-4" />
              <span>{isPlaying ? "SEDANG DIPUTAR 🎵" : "SIAP DIPUTAR"}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-comic text-white mb-1">
              {useSynthMode ? "Spider Love Synthesizer Melody 🎹" : song.title}
            </h3>
            <p className="text-slate-400 text-sm mb-4 font-light">
              {useSynthMode ? "Lush Web Audio Romantic Lo-Fi Chords" : song.artist}
            </p>

            {/* Animated Equalizer Bars */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 h-6 mb-4">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [6, 24, 10, 20, 6] : 4,
                  }}
                  transition={{
                    duration: 0.8 + (i % 5) * 0.2,
                    repeat: isPlaying ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 rounded-full bg-[#EF233C]"
                />
              ))}
            </div>

            {/* Progress Slider (Only active in audio mode) */}
            {!useSynthMode && (
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#EF233C]"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Play/Pause & Audio Source Toggle Controls */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <button
                onClick={togglePlay}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B91C2F] to-[#EF233C] text-white font-comic text-xl flex items-center gap-2 shadow-[0_0_25px_rgba(239,35,60,0.7)] hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-white" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    <span>PLAY MUSIC 🎵</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-3 rounded-2xl bg-[#171c2b] text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Mute/Unmute"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => {
                  sfx.playPop();
                  if (isPlaying) {
                    if (audioRef.current) audioRef.current.pause();
                    sfx.stopRomanticMusic();
                    setIsPlaying(false);
                  }
                  setUseSynthMode(!useSynthMode);
                }}
                className="p-3 rounded-2xl bg-[#171c2b] text-[#FF7AA2] hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Switch Sound Engine"
              >
                <Sparkles className="w-4 h-4 text-[#FF7AA2]" />
                <span>{useSynthMode ? "MP3 Mode" : "Synth BGM"}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
