import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { UnderDevelopmentBoard } from './components/UnderDevelopmentBoard';
import { ContactFounderModal } from './components/ContactFounderModal';
import { FloatingContactButton } from './components/FloatingContactButton';
import { PageReveal } from './components/PageReveal';
import { FounderInboxModal } from './components/FounderInboxModal';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactModalOpen(false);
  };

  const handleOpenInbox = () => {
    setIsInboxOpen(true);
  };

  const handleCloseInbox = () => {
    setIsInboxOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F9F9F9] selection:bg-[#F9F9F9]/20 selection:text-[#F9F9F9] relative flex flex-col justify-between overflow-x-hidden">
      {/* Cinematic Staging Protocol Page Reveal */}
      <PageReveal />

      {/* Background Architectural Ambient Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Navigation with Brand Name, Founder Desk, and Contact Button */}
      <Navbar onOpenContact={handleOpenContact} onOpenInbox={handleOpenInbox} />

      {/* Main Staging Display: Suspended Animated Under Development Board */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-6 sm:py-16 pb-28 sm:pb-16">
        <UnderDevelopmentBoard
          onOpenContact={handleOpenContact}
          onOpenInbox={handleOpenInbox}
        />
      </main>

      {/* Minimalist Under-Development Footer */}
      <footer className="relative z-10 py-6 border-t border-white/5 text-center text-[10px] font-mono tracking-widest text-[#F9F9F9]/40 uppercase">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} Veloic. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleOpenContact}
              className="hover:text-[#F9F9F9] transition-colors cursor-pointer"
            >
              Direct Founder Desk
            </button>
            <span className="text-zinc-600">•</span>
            <button
              onClick={handleOpenInbox}
              className="hover:text-amber-300 transition-colors cursor-pointer text-zinc-500"
            >
              Founder Inbox
            </button>
          </div>
        </div>
      </footer>

      {/* Spring-based Magnetic Floating "Contact Founder" Pill */}
      <FloatingContactButton onOpenContact={handleOpenContact} />

      {/* Direct Contact Founder Modal (In-App Dispatch) */}
      <ContactFounderModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContact}
      />

      {/* Secure Founder Messages Inbox */}
      <FounderInboxModal
        isOpen={isInboxOpen}
        onClose={handleCloseInbox}
      />
    </div>
  );
}

