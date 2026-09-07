import React from 'react';
import { Logo } from './Logo';
import { Mail } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenInbox?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenInbox }) => {
  return (
    <header 
      id="main-navigation-header"
      className="sticky top-0 z-40 w-full bg-[#0D0D0D] border-b border-[#222222]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center group" title="Veloic">
            <Logo size="md" />
          </a>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-[#F9F9F9]/50 uppercase">
            Official Portal
          </span>
        </div>

        {/* Center/Right Status & Contact Founder Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenInbox && (
            <button
              onClick={onOpenInbox}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161616] hover:bg-[#202020] border border-white/10 text-[9px] uppercase tracking-wider text-zinc-400 hover:text-zinc-200 font-mono transition-colors cursor-pointer"
              title="Founder Inbox Access (Passcode: veloic2026)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Founder Desk</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-amber-500/20 text-[9px] uppercase tracking-[0.18em] text-amber-300/80 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>v0.9</span>
          </div>

          {/* Contact Founder Primary Button */}
          <button
            id="nav-contact-founder-btn"
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium border border-[#F9F9F9] text-[#F9F9F9] hover:bg-[#F9F9F9] hover:text-[#0D0D0D] transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.08)]"
          >
            <Mail className="w-3.5 h-3.5 opacity-80 group-hover:rotate-12 transition-transform" />
            <span>Contact Founder</span>
          </button>
        </div>
      </div>
    </header>
  );
};

