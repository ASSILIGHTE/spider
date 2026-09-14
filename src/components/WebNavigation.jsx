import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sfx } from '../utils/audioSynthesizer';
import { storyData } from '../data/storyData';

export default function WebNavigation({ activeSection, onSelectNode }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = storyData.navigation;

  const handleNodeClick = (nodeId) => {
    sfx.playWebShoot();
    onSelectNode(nodeId);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 md:py-12 px-3 sm:px-4 z-20">
      {/* Section Header */}
      <div className="text-center mb-6 md:mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-[#B91C2F]/30 border border-[#EF233C]/60 text-[#EF233C] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
          Peta Cerita Cinta
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-comic text-[#F8F8F8] text-glow-red">
          JARING NAVIGASI CINTA
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-1">
          Klik titik jaring mana saja untuk langsung berseluncur ke momen manis kita
        </p>
      </div>

      {/* Universal Radial Spider Web Layout (Responsive on Mobile, Tablet & Desktop) */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-[#0b0e17]/85 backdrop-blur-md rounded-3xl border-2 sm:border-3 border-[#1e2433] shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden comic-dots">
        {/* SVG Web Background Structure */}
        <svg className="absolute inset-0 w-full h-full stroke-red-600/40" viewBox="0 0 800 480" fill="none" preserveAspectRatio="xMidYMid meet">
          {/* Radial Spokes connecting center to nodes */}
          {nodes.map((node, i) => {
            const angle = (i * 360) / nodes.length - 90;
            const rad = (angle * Math.PI) / 180;
            const x2 = 400 + 260 * Math.cos(rad);
            const y2 = 240 + 175 * Math.sin(rad);
            const isHighlighted = hoveredNode === node.id || activeSection === node.id;

            return (
              <g key={`spoke-${node.id}`}>
                <line
                  x1="400"
                  y1="240"
                  x2={x2}
                  y2={y2}
                  stroke={isHighlighted ? '#EF233C' : '#334155'}
                  strokeWidth={isHighlighted ? '3' : '1.5'}
                  strokeDasharray={isHighlighted ? 'none' : '4 3'}
                  className="transition-all duration-300"
                />
                {/* Cross connecting webs between adjacent nodes */}
                {i > 0 && (
                  <path
                    d={`M ${400 + 260 * Math.cos(((i-1) * 360 / nodes.length - 90) * Math.PI / 180)} ${240 + 175 * Math.sin(((i-1) * 360 / nodes.length - 90) * Math.PI / 180)} Q 400 240 ${x2} ${y2}`}
                    stroke={isHighlighted ? 'rgba(239,35,60,0.6)' : 'rgba(255,255,255,0.1)'}
                    strokeWidth="1.2"
                    fill="none"
                  />
                )}
              </g>
            );
          })}

          {/* Central Glowing Web Hub */}
          <circle cx="400" cy="240" r="45" fill="#08090D" stroke="#EF233C" strokeWidth="2.5" />
          <circle cx="400" cy="240" r="25" fill="#B91C2F" opacity="0.4" />
        </svg>

        {/* Center Spider Hub Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
          <span className="text-xl sm:text-2xl md:text-3xl animate-bounce block">🕷️</span>
          <span className="text-[8px] sm:text-[10px] font-comic tracking-widest text-[#EF233C] block uppercase">OUR HUB</span>
        </div>

        {/* Floating Radial Node Items */}
        {nodes.map((node, i) => {
          const angle = (i * 360) / nodes.length - 90;
          const rad = (angle * Math.PI) / 180;
          // Responsive radius for mobile vs desktop positioning
          const posX = 50 + 37 * Math.cos(rad);
          const posY = 50 + 35 * Math.sin(rad);
          const isHovered = hoveredNode === node.id;
          const isActive = activeSection === node.id;

          return (
            <motion.div
              key={node.id}
              style={{ left: `${posX}%`, top: `${posY}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            >
              <div className="relative group">
                {/* Node Button */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => {
                    setHoveredNode(node.id);
                    sfx.playPop();
                  }}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(node.id)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-1 sm:p-2 transition-all duration-300 border-2 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#EF233C] to-[#B91C2F] border-white shadow-[0_0_25px_#EF233C]'
                      : isHovered
                      ? 'bg-[#151926] border-[#EF233C] shadow-[0_0_20px_rgba(239,35,60,0.6)]'
                      : 'bg-[#0f121d]/90 border-[#2a334a] shadow-lg'
                  }`}
                >
                  <span className="text-xl sm:text-2xl md:text-3xl mb-0.5 sm:mb-1">{node.icon}</span>
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] font-comic tracking-wider text-center leading-none text-white">
                    {node.label}
                  </span>
                </motion.button>

                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#08090D] border border-[#EF233C] text-white text-[10px] sm:text-xs rounded-lg whitespace-nowrap z-30 shadow-xl pointer-events-none"
                  >
                    <span className="text-[#EF233C] font-semibold">✦ {node.title}</span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#EF233C]" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
