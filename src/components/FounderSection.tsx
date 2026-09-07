import React, { useState } from 'react';
import { Mail, Copy, Check, MessageSquare, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface FounderSectionProps {
  onOpenContact: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenContact }) => {
  const founderEmail = 'founder.veloic@gmail.com';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(founderEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="founder" className="py-24 sm:py-32 bg-[#0D0D0D] relative overflow-hidden border-b border-[#F9F9F9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Founder Note & Mission */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#161616] border border-[#F9F9F9]/15 text-[#F9F9F9]/70 text-[10px] uppercase tracking-[0.3em] font-light mb-6">
              <Sparkles className="w-3 h-3 text-[#F9F9F9]" />
              <span>Perspective & Manifesto</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal text-[#F9F9F9] tracking-tight leading-[1.15] font-serif" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
              &ldquo;We built Veloic because engineering deserves <span className="italic">instantaneous</span> infrastructure.&rdquo;
            </h2>

            <div className="mt-8 space-y-5 text-[#F9F9F9]/65 text-base leading-relaxed font-light">
              <p>
                In the era of real-time intelligence and instantaneous distributed applications, engineering teams are still tethered to 10-minute CI build queues, bloated container clusters, and unpredictable cold starts.
              </p>
              <p>
                Veloic was born out of a single obsession: removing every microsecond of friction between a developer writing code and that code executing seamlessly at the global edge.
              </p>
              <p>
                Whether you are an engineer seeking sub-10ms response times or a founder building the next generation of software, my desk is directly open to you.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 pt-6 border-t border-[#F9F9F9]/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#F9F9F9] flex items-center justify-center font-bold text-[#0D0D0D] text-base">
                  V
                </div>
                <div>
                  <div className="font-sans text-sm font-medium text-[#F9F9F9] uppercase tracking-wider">Founder & Lead Architect</div>
                  <div className="text-xs text-[#F9F9F9]/50 font-mono tracking-widest mt-0.5">Veloic Platform Technologies</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Connection Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#F9F9F9]/15 bg-[#141414] p-8 sm:p-10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-5 border-b border-[#F9F9F9]/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F9F9F9] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#F9F9F9] uppercase tracking-[0.25em]">
                    Direct Founder Desk
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F9F9F9]/50">
                  Priority Access
                </span>
              </div>

              <div className="my-7 space-y-4">
                <p className="text-xs text-[#F9F9F9]/60 leading-relaxed font-light">
                  Want to evaluate Veloic for your production workload, discuss an investment inquiry, or explore private early integration?
                </p>

                {/* Email Box */}
                <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#F9F9F9]/15 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <span className="text-[9px] text-[#F9F9F9]/40 uppercase tracking-widest block font-mono">Founder Inbox</span>
                    <a
                      href={`mailto:${founderEmail}`}
                      className="font-mono text-sm text-[#F9F9F9] hover:underline"
                    >
                      {founderEmail}
                    </a>
                  </div>
                  <button
                    id="founder-section-copy-email-btn"
                    onClick={handleCopy}
                    className="p-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-[#F9F9F9]/70 hover:text-[#F9F9F9] transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#F9F9F9]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 py-5 border-t border-b border-[#F9F9F9]/10 text-xs text-[#F9F9F9]/60 font-light">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#F9F9F9]/70" />
                  <span>Direct response SLA: Within 4 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F9F9F9]/70" />
                  <span>Confidential NDA-protected architecture review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#F9F9F9]/70" />
                  <span>1-on-1 technical onboarding directly with the founder</span>
                </div>
              </div>

              {/* Contact Button */}
              <div className="mt-7">
                <button
                  id="founder-section-contact-btn"
                  onClick={onOpenContact}
                  className="w-full py-3.5 rounded-full bg-[#F9F9F9] hover:bg-[#E5E5E5] text-[#0D0D0D] font-medium text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Founder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
