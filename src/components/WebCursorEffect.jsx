import React, { useEffect, useRef, useState } from 'react';
import { sfx } from '../utils/audioSynthesizer';

export default function WebCursorEffect() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Canvas Web Trail & Web Shot for Desktop (High FPS Optimized)
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const points = [];
    const webShots = [];
    let pendingMouseEvt = null;

    const handleMouseMove = (e) => {
      pendingMouseEvt = e;
    };

    const handleClick = (e) => {
      sfx.playWebShoot();
      const numRays = 8;
      const rayLength = 50 + Math.random() * 30;
      for (let i = 0; i < numRays; i++) {
        const angle = (i * (2 * Math.PI)) / numRays;
        webShots.push({
          x: e.clientX,
          y: e.clientY,
          targetX: e.clientX + Math.cos(angle) * rayLength,
          targetY: e.clientY + Math.sin(angle) * rayLength,
          progress: 0,
          alpha: 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    const render = () => {
      if (pendingMouseEvt) {
        points.push({
          x: pendingMouseEvt.clientX,
          y: pendingMouseEvt.clientY,
          life: 0,
        });
        if (points.length > 12) points.shift();
        pendingMouseEvt = null;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth Web Trail Lines
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        }

        ctx.strokeStyle = 'rgba(239, 35, 60, 0.75)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Cross Spider Threads
        for (let i = 0; i < points.length; i += 3) {
          if (i + 2 < points.length) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 2].x, points[i + 2].y);
            ctx.strokeStyle = 'rgba(248, 248, 248, 0.35)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Render Web Shots
      for (let i = webShots.length - 1; i >= 0; i--) {
        const shot = webShots[i];
        shot.progress += 0.18;
        shot.alpha -= 0.06;

        if (shot.alpha <= 0) {
          webShots.splice(i, 1);
          continue;
        }

        const currentX = shot.x + (shot.targetX - shot.x) * Math.min(shot.progress, 1);
        const currentY = shot.y + (shot.targetY - shot.y) * Math.min(shot.progress, 1);

        ctx.beginPath();
        ctx.moveTo(shot.x, shot.y);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = `rgba(239, 35, 60, ${shot.alpha})`;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  // Mobile Tap Web Ripple Effect
  const handleMobileTap = (e) => {
    if (!isMobile) return;
    sfx.playWebShoot();
    const touch = e.touches ? e.touches[0] : e;
    const newRipple = {
      id: Date.now() + Math.random(),
      x: touch.clientX,
      y: touch.clientY,
    };
    setRipples((prev) => [...prev.slice(-4), newRipple]); // keep max 4 ripples

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('touchstart', handleMobileTap, { passive: true });
      return () => window.removeEventListener('touchstart', handleMobileTap);
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 border-[#EF233C] animate-ping transform-gpu"
            style={{
              left: ripple.x - 30,
              top: ripple.y - 30,
              width: 60,
              height: 60,
              boxShadow: '0 0 15px #EF233C',
            }}
          >
            <svg className="w-full h-full stroke-white/60 p-1" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="none" strokeWidth="2" />
              <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="90" strokeWidth="1" />
              <line x1="20" y1="20" x2="80" y2="80" strokeWidth="1" />
              <line x1="20" y1="80" x2="80" y2="20" strokeWidth="1" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transform-gpu"
    />
  );
}
