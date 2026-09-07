import React, { useState } from 'react';
import { Mail, ArrowRight, Zap, ShieldCheck, Terminal, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const [copiedCli, setCopiedCli] = useState(false);
  const cliSnippet = 'curl -fsSL https://veloic.dev/install | sh';

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliSnippet);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2200);
  };

  return (
    <section 
      id="hero-section"
      className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden bg-[#0D0D0D] editorial-grid"
    >
      {/* Editorial Decorative Architectural Rings */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-[#F9F9F9]/[0.04] pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-[#F9F9F9]/[0.08] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full border border-[#F9F9F9]/[0.04] pointer-events-none" />

      {/* Subtle top hairline */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#F9F9F9]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill / Announce Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#161616] border border-[#F9F9F9]/15 text-[10px] uppercase tracking-[0.3em] font-light text-[#F9F9F9]/80 backdrop-blur-md mb-8"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#F9F9F9] animate-pulse" />
            <span className="font-mono tracking-widest text-[#F9F9F9]">
              Vol. 01 — Veloic Core Engine
            </span>
            <span className="text-[#F9F9F9]/20 hidden sm:inline">|</span>
            <span className="text-[#F9F9F9]/60 hidden sm:inline">Private Founder Preview</span>
            <ArrowRight className="w-3 h-3 text-[#F9F9F9]/70" />
          </motion.div>

          {/* Main Headline - Editorial Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F9F9F9] leading-[1.1] font-serif"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            Form follows <span className="italic font-light text-[#F9F9F9]">velocity</span>.
            <span className="block mt-2 font-sans font-light text-2xl sm:text-3xl lg:text-4xl text-[#F9F9F9]/80 tracking-normal">
              The architecture for velocity-first engineering.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-[#F9F9F9]/65 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Engineered for microsecond edge orchestration, automated branch environments, and relentless runtime performance. Built for ambitious founders who refuse to compromise.
          </motion.p>

          {/* Action CTAs Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Main Contact Founder Button */}
            <button
              id="hero-contact-founder-btn"
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F9F9F9] text-[#0D0D0D] font-medium text-[11px] uppercase tracking-[0.25em] transition-all hover:bg-[#E5E5E5] flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Founder</span>
              <span className="px-2 py-0.5 rounded-full bg-[#0D0D0D]/10 text-[9px] uppercase font-mono tracking-wider font-semibold">
                Direct
              </span>
            </button>

            {/* Direct Architecture Demo Jump */}
            <a
              id="hero-explore-demo-btn"
              href="#architecture"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent hover:bg-[#F9F9F9]/5 border border-[#F9F9F9]/30 hover:border-[#F9F9F9] text-[#F9F9F9] text-[11px] uppercase tracking-[0.25em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 opacity-70" />
              <span>Edge Terminal Demo</span>
            </a>
          </motion.div>

          {/* Founder Direct Guarantee & Email Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-[11px] text-[#F9F9F9]/50 flex items-center justify-center gap-2 font-mono uppercase tracking-widest"
          >
            <span>Direct desk:</span>
            <button
              onClick={onOpenContact}
              className="text-[#F9F9F9] hover:underline font-medium transition-all cursor-pointer lowercase tracking-normal"
            >
              founder.veloic@gmail.com
            </button>
            <span className="text-[#F9F9F9]/20">•</span>
            <span className="text-[#F9F9F9]/70 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#F9F9F9]" /> Verified Founder
            </span>
          </motion.div>

          {/* CLI Fast-Install Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-[#141414] border border-[#F9F9F9]/15 hover:border-[#F9F9F9]/30 transition-all font-mono text-xs text-[#F9F9F9]/80 shadow-sm">
              <div className="flex items-center gap-2.5 overflow-hidden truncate">
                <span className="text-[#F9F9F9]/40 select-none">$</span>
                <span className="text-[#F9F9F9]/90 truncate">{cliSnippet}</span>
              </div>
              <button
                id="copy-hero-cli-btn"
                onClick={handleCopyCli}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#F9F9F9]/60 hover:text-[#F9F9F9] transition-colors cursor-pointer shrink-0"
                title="Copy to clipboard"
                aria-label="Copy install command"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-[#F9F9F9]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </motion.div>

          {/* Trust Highlights Grid - Editorial Aesthetic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-16 pt-10 border-t border-[#F9F9F9]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
          >
            <div className="p-4 rounded-xl bg-[#141414] border border-[#F9F9F9]/10">
              <div className="flex items-center gap-2 text-[#F9F9F9] mb-1.5">
                <Zap className="w-3.5 h-3.5 opacity-70" />
                <span className="text-base font-normal text-[#F9F9F9] font-mono">&lt; 12ms</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#F9F9F9]/50">P99 Edge Latency</p>
            </div>

            <div className="p-4 rounded-xl bg-[#141414] border border-[#F9F9F9]/10">
              <div className="flex items-center gap-2 text-[#F9F9F9] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 opacity-70" />
                <span className="text-base font-normal text-[#F9F9F9] font-mono">0.0ms</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#F9F9F9]/50">Warm Standby</p>
            </div>

            <div className="p-4 rounded-xl bg-[#141414] border border-[#F9F9F9]/10">
              <div className="flex items-center gap-2 text-[#F9F9F9] mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 opacity-70" />
                <span className="text-base font-normal text-[#F9F9F9] font-mono">99.999%</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#F9F9F9]/50">Autonomous Uptime</p>
            </div>

            <div className="p-4 rounded-xl bg-[#141414] border border-[#F9F9F9]/10">
              <div className="flex items-center gap-2 text-[#F9F9F9] mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 opacity-70" />
                <span className="text-base font-normal text-[#F9F9F9] font-mono">3.8s</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#F9F9F9]/50">Push to Production</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
