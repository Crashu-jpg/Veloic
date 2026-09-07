import React from 'react';
import { Zap, Shield, Cpu, GitBranch, Layers, Activity, ArrowUpRight, Gauge, Lock } from 'lucide-react';

interface BentoFeaturesProps {
  onOpenContact: () => void;
}

export const BentoFeatures: React.FC<BentoFeaturesProps> = ({ onOpenContact }) => {
  return (
    <section id="capabilities" className="py-24 bg-[#0D0D0D] relative overflow-hidden border-b border-[#F9F9F9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#161616] border border-[#F9F9F9]/15 text-[#F9F9F9]/70 text-[10px] uppercase tracking-[0.3em] font-light mb-4">
            <Layers className="w-3 h-3 text-[#F9F9F9]" />
            <span>Infrastructure Principles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#F9F9F9] tracking-tight font-serif leading-[1.15]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            Engineered to remove friction from high-output teams.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F9F9F9]/60 font-light leading-relaxed">
            Every layer of Veloic is synthesized for raw runtime speed, unyielding reliability, and quiet engineering elegance.
          </p>
        </div>

        {/* Bento Grid Layout - Editorial Monochrome */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
          {/* Card 1: Hyper-Distributed Edge Mesh (Large Span: 8 cols) */}
          <div className="lg:col-span-8 p-8 rounded-2xl bg-[#141414] border border-[#F9F9F9]/10 hover:border-[#F9F9F9]/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/15 flex items-center justify-center text-[#F9F9F9]">
                  <Zap className="w-4 h-4 opacity-80" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full bg-[#1A1A1A] text-[#F9F9F9]/60 border border-[#F9F9F9]/10">
                  280+ POPs Global
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal font-serif text-[#F9F9F9] mb-3 tracking-tight" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                Microsecond Global Edge Mesh
              </h3>
              <p className="text-[#F9F9F9]/60 text-sm leading-relaxed max-w-xl font-light">
                Run workloads in physical proximity to every client on Earth. Intelligent anycast routing routes requests to the nearest substation with instantaneous TLS terminations and warm runtime pools.
              </p>
            </div>

            {/* Visual Micro-Card Inside */}
            <div className="mt-8 p-4 rounded-xl bg-[#0D0D0D] border border-[#F9F9F9]/10 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#161616] text-[#F9F9F9]">
                  <Gauge className="w-4 h-4 opacity-70" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[#F9F9F9] font-medium font-sans">Smart Anycast BGP</div>
                  <div className="text-[11px] text-[#F9F9F9]/50 font-light">Sub-network route optimization</div>
                </div>
              </div>
              <div className="font-mono text-xs text-[#F9F9F9] uppercase tracking-wider">
                P99 &lt; 12ms Worldwide
              </div>
            </div>
          </div>

          {/* Card 2: MicroVM Sandboxing (Span: 4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#141414] border border-[#F9F9F9]/10 hover:border-[#F9F9F9]/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/15 flex items-center justify-center text-[#F9F9F9]">
                  <Cpu className="w-4 h-4 opacity-80" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full bg-[#1A1A1A] text-[#F9F9F9]/60 border border-[#F9F9F9]/10">
                  Zero Cold Starts
                </span>
              </div>
              <h3 className="text-2xl font-normal font-serif text-[#F9F9F9] mb-3 tracking-tight" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                Hardware MicroVMs
              </h3>
              <p className="text-[#F9F9F9]/60 text-sm leading-relaxed font-light">
                Sub-millisecond spin-up speeds with isolated memory hardware bounds. Total tenant isolation without the weight of legacy containers.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F9F9F9]/10 flex items-center justify-between text-xs text-[#F9F9F9]/50">
              <span className="uppercase tracking-widest text-[10px]">Execution Overhead</span>
              <span className="font-mono text-[#F9F9F9] font-medium">0.05ms</span>
            </div>
          </div>

          {/* Card 3: Autonomous Telemetry (Span: 4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#141414] border border-[#F9F9F9]/10 hover:border-[#F9F9F9]/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/15 flex items-center justify-center text-[#F9F9F9] mb-5">
                <Activity className="w-4 h-4 opacity-80" />
              </div>
              <h3 className="text-2xl font-normal font-serif text-[#F9F9F9] mb-3 tracking-tight" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                Self-Healing Grids
              </h3>
              <p className="text-[#F9F9F9]/60 text-sm leading-relaxed font-light">
                Adaptive telemetry monitors allocation curves, stale caches, and edge anomalies in real time, automatically rerouting traffic without human intervention.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F9F9F9]/10 flex items-center justify-between text-xs text-[#F9F9F9]/50">
              <span className="uppercase tracking-widest text-[10px]">Incident Avoidance</span>
              <span className="font-mono text-[#F9F9F9] font-medium">99.98%</span>
            </div>
          </div>

          {/* Card 4: Git-Native Automation (Span: 4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#141414] border border-[#F9F9F9]/10 hover:border-[#F9F9F9]/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/15 flex items-center justify-center text-[#F9F9F9] mb-5">
                <GitBranch className="w-4 h-4 opacity-80" />
              </div>
              <h3 className="text-2xl font-normal font-serif text-[#F9F9F9] mb-3 tracking-tight" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                Atomic Environments
              </h3>
              <p className="text-[#F9F9F9]/60 text-sm leading-relaxed font-light">
                Every commit generates an isolated production preview clone with its own edge data replica. Instant rollbacks happen in a single HTTP header flip.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F9F9F9]/10 flex items-center justify-between text-xs text-[#F9F9F9]/50">
              <span className="uppercase tracking-widest text-[10px]">Rollback Velocity</span>
              <span className="font-mono text-[#F9F9F9] font-medium">&lt; 100ms</span>
            </div>
          </div>

          {/* Card 5: Post-Quantum Security & Compliance (Span: 4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#141414] border border-[#F9F9F9]/10 hover:border-[#F9F9F9]/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/15 flex items-center justify-center text-[#F9F9F9] mb-5">
                <Lock className="w-4 h-4 opacity-80" />
              </div>
              <h3 className="text-2xl font-normal font-serif text-[#F9F9F9] mb-3 tracking-tight" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                Zero-Trust Envelope
              </h3>
              <p className="text-[#F9F9F9]/60 text-sm leading-relaxed font-light">
                Hardware-enforced key enclaves, automated SOC2 compliance audit trails, and post-quantum encryption across all intra-mesh node packets.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F9F9F9]/10 flex items-center justify-between text-xs text-[#F9F9F9]/50">
              <span className="uppercase tracking-widest text-[10px]">Compliance Baseline</span>
              <span className="font-mono text-[#F9F9F9] font-medium">SOC2 / ISO</span>
            </div>
          </div>
        </div>

        {/* Mid-Page Founder Direct CTA Banner - Editorial Frame */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#141414] border border-[#F9F9F9]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase font-mono text-[#F9F9F9]/60 tracking-[0.25em] mb-2">
              <span>Direct Founder Partnership</span>
            </div>
            <h4 className="text-2xl font-normal font-serif text-[#F9F9F9]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
              Need bespoke architecture or dedicated cluster isolation?
            </h4>
            <p className="text-sm text-[#F9F9F9]/60 mt-1 font-light">
              Reach out directly to the founder at <strong className="text-[#F9F9F9] font-mono">founder.veloic@gmail.com</strong>.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-8 py-3.5 rounded-full bg-[#F9F9F9] text-[#0D0D0D] font-medium text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[#E5E5E5] whitespace-nowrap cursor-pointer shadow-sm"
          >
            Talk to Founder
          </button>
        </div>
      </div>
    </section>
  );
};
