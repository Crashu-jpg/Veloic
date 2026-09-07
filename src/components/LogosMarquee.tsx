import React from 'react';
import { ShieldCheck, Sparkles, Terminal, Layers, Compass, Boxes } from 'lucide-react';

export const LogosMarquee: React.FC = () => {
  const logos = [
    { name: 'SYNAPSE LABS', icon: Sparkles },
    { name: 'HYPERSCALE AI', icon: Layers },
    { name: 'QUANTIX DATA', icon: Terminal },
    { name: 'ORBIT ARCHITECTURE', icon: Compass },
    { name: 'VERIDIAN SYSTEMS', icon: ShieldCheck },
    { name: 'NEXUS CLOUD', icon: Boxes },
  ];

  return (
    <section className="py-12 border-y border-[#F9F9F9]/10 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] font-light text-[#F9F9F9]/40 mb-8">
          Selected Deployments & Distributed Infrastructure Partners
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-center">
          {logos.map((logo, index) => {
            const IconComponent = logo.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full border border-[#F9F9F9]/10 bg-[#141414] text-[#F9F9F9]/60 hover:text-[#F9F9F9] hover:border-[#F9F9F9]/30 transition-all select-none"
              >
                <IconComponent className="w-3.5 h-3.5 opacity-60" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-light">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
