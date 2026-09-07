import React, { useState } from 'react';
import { Logo } from './Logo';
import { Mail, ArrowRight, Check, Send, Globe, Terminal, Shield, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  const founderEmail = 'founder.veloic@gmail.com';

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setJoinedWaitlist(true);
    setTimeout(() => {
      setJoinedWaitlist(false);
      setWaitlistEmail('');
    }, 4000);
  };

  return (
    <footer id="main-footer" className="bg-[#0D0D0D] border-t border-[#F9F9F9]/10 relative overflow-hidden">
      {/* Bottom CTA Pre-Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-20">
        <div className="relative rounded-3xl border border-[#F9F9F9]/15 bg-[#141414] p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-[10px] font-mono font-light uppercase tracking-[0.3em] text-[#F9F9F9]/60 mb-4 px-4 py-1 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/10">
              Zero Cold Starts • Pure Speed
            </span>
            <h3 className="text-3xl sm:text-5xl font-normal text-[#F9F9F9] tracking-tight leading-[1.15] font-serif" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
              Ready to accelerate your engineering velocity?
            </h3>
            <p className="mt-4 text-[#F9F9F9]/60 text-sm sm:text-base leading-relaxed font-light">
              Connect directly with our founder to deploy your first high-velocity workload with custom isolation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="footer-cta-contact-founder-btn"
                onClick={onOpenContact}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F9F9F9] hover:bg-[#E5E5E5] text-[#0D0D0D] font-medium text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-[#0D0D0D]" />
                <span>Contact Founder</span>
              </button>

              <a
                href="#architecture"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-transparent hover:bg-[#1A1A1A] border border-[#F9F9F9]/20 text-[#F9F9F9] text-[11px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-[#F9F9F9]/70" />
                <span>Live Test Suite</span>
              </a>
            </div>

            {/* Quick Access Subscription Box */}
            <form onSubmit={handleWaitlistSubmit} className="mt-10 max-w-md mx-auto">
              <div className="flex items-center p-1 rounded-full bg-[#0D0D0D] border border-[#F9F9F9]/20 focus-within:border-[#F9F9F9]/50 transition-all">
                <input
                  type="email"
                  required
                  placeholder="Enter email for private release dispatches..."
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent text-[#F9F9F9] text-xs placeholder-[#F9F9F9]/40 focus:outline-none font-light"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#F9F9F9] hover:bg-[#E5E5E5] text-[#0D0D0D] text-[10px] font-medium uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {joinedWaitlist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0D0D0D]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links Cluster */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 border-t border-[#F9F9F9]/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-[#F9F9F9]/60 leading-relaxed font-light">
              High-velocity runtime and edge compute substrate engineered for software craftsmen and fast-moving teams.
            </p>
            <div className="pt-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#F9F9F9]/40 block mb-1">Founder Direct</span>
              <a
                href={`mailto:${founderEmail}`}
                className="text-xs font-mono text-[#F9F9F9] hover:underline transition-colors"
              >
                {founderEmail}
              </a>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F9F9F9]/50">Architecture</div>
            <ul className="space-y-2.5 text-xs text-[#F9F9F9]/65 font-light">
              <li><a href="#architecture" className="hover:text-[#F9F9F9] transition-colors">Anycast Edge Mesh</a></li>
              <li><a href="#architecture" className="hover:text-[#F9F9F9] transition-colors">Hardware MicroVMs</a></li>
              <li><a href="#benchmarks" className="hover:text-[#F9F9F9] transition-colors">Telemetry Benchmarks</a></li>
              <li><a href="#capabilities" className="hover:text-[#F9F9F9] transition-colors">Autonomous Grid Diagnostics</a></li>
            </ul>
          </div>

          {/* Column 3: Resources & Deploy */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F9F9F9]/50">Deployment & Code</div>
            <ul className="space-y-2.5 text-xs text-[#F9F9F9]/65 font-light">
              <li>
                <a
                  href="/veloic-dist.zip"
                  download="veloic-dist-deploy.zip"
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
                  title="Direct drag & drop package for Vercel"
                >
                  <span>📦 Vercel Deploy Zip</span>
                </a>
              </li>
              <li>
                <a
                  href="/veloic-source-code.zip"
                  download="veloic-source-code.zip"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
                  title="Full React + Vite TypeScript source code"
                >
                  <span>💻 Full Source Code Zip</span>
                </a>
              </li>
              <li><a href="#architecture" className="hover:text-[#F9F9F9] transition-colors">Anycast Edge Mesh</a></li>
              <li><a href="#benchmarks" className="hover:text-[#F9F9F9] transition-colors">Telemetry Benchmarks</a></li>
            </ul>
          </div>

          {/* Column 4: Status & Founder Direct */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F9F9F9]/50">Direct Access</div>
            <div className="p-4 rounded-2xl bg-[#141414] border border-[#F9F9F9]/15 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#F9F9F9]">
                <span className="w-2 h-2 rounded-full bg-[#F9F9F9] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Network: 100% Nominal</span>
              </div>
              <p className="text-[11px] text-[#F9F9F9]/50 font-light leading-relaxed">
                Need enterprise cluster SLA or early architecture preview? Talk directly with the founder.
              </p>
              <button
                id="footer-contact-founder-btn"
                onClick={onOpenContact}
                className="w-full py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-[#F9F9F9]/15 text-[#F9F9F9] text-[10px] font-medium uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#F9F9F9]" />
                <span>Contact Founder</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#F9F9F9]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F9F9F9]/40 font-light">
          <div>
            © {new Date().getFullYear()} Veloic Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#founder" className="hover:text-[#F9F9F9] transition-colors">Manifesto</a>
            <a href="#capabilities" className="hover:text-[#F9F9F9] transition-colors">Zero-Trust</a>
            <a href={`mailto:${founderEmail}`} className="hover:text-[#F9F9F9] font-mono transition-colors">
              {founderEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
