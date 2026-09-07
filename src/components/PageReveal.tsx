import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield } from 'lucide-react';

interface PageRevealProps {
  onComplete?: () => void;
}

export const PageReveal: React.FC<PageRevealProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'revealing' | 'done'>('revealing');

  useEffect(() => {
    // Elegant quick 900ms reveal sequence
    const timer = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 950);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage === 'revealing' && (
        <motion.div
          key="page-reveal-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between overflow-hidden"
        >
          {/* Top Shutter Curtain */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.77, 0, 0.175, 1] }}
            className="w-full h-1/2 bg-[#0A0A0A] border-b border-amber-500/40 relative flex items-end justify-center pb-4 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          >
            {/* High-tech grid background on shutter */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-amber-400 font-semibold uppercase relative z-10">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>INITIALIZING STAGING PROTOCOL</span>
            </div>
          </motion.div>

          {/* Center Amber Laser Scan Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: [1, 1, 0] }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b] z-20"
          />

          {/* Bottom Shutter Curtain */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.77, 0, 0.175, 1] }}
            className="w-full h-1/2 bg-[#0A0A0A] border-t border-amber-500/40 relative flex items-start justify-center pt-4 shadow-[0_-10px_30px_rgba(0,0,0,0.9)]"
          >
            {/* High-tech grid background on shutter */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-400 font-semibold uppercase relative z-10">
              <Shield className="w-3.5 h-3.5 text-zinc-500" />
              <span>VELOIC // STAGE REVEAL 0.9</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
