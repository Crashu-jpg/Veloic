import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Construction,
  Clock,
  Mail,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  ArrowRight,
  Bell,
  Sparkles,
  RefreshCw,
  Send
} from 'lucide-react';
import { subscribeToAlertsInDatabase } from '../lib/messagesService';

interface UnderDevelopmentBoardProps {
  onOpenContact: () => void;
  onOpenInbox?: () => void;
}

export const UnderDevelopmentBoard: React.FC<UnderDevelopmentBoardProps> = ({
  onOpenContact,
  onOpenInbox,
}) => {
  const [copied, setCopied] = useState(false);
  const founderEmail = 'founder.veloic@gmail.com';

  // Implementation Notify State
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const notifyInputRef = useRef<HTMLInputElement>(null);

  // Mouse Spotlight Tracking
  const boardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringBoard, setIsHoveringBoard] = useState(false);

  // Interactive bolt rotation state
  const [boltAngle, setBoltAngle] = useState(0);

  // Load existing notify subscription from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('veloic_implementation_subscriber');
      if (saved) {
        setSubscribedEmail(saved);
        setIsSubscribed(true);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(founderEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubscribeNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes('@')) return;

    setIsSubscribing(true);
    const emailToSave = notifyEmail.trim();

    // Persist to Firebase Firestore Cloud Database
    subscribeToAlertsInDatabase(emailToSave);

    setTimeout(() => {
      try {
        localStorage.setItem('veloic_implementation_subscriber', emailToSave);
      } catch {
        // safe fallback
      }
      setSubscribedEmail(emailToSave);
      setIsSubscribed(true);
      setIsSubscribing(false);
      setNotifyEmail('');
    }, 600);
  };

  const handleResetSubscription = () => {
    try {
      localStorage.removeItem('veloic_implementation_subscriber');
    } catch {
      // safe fallback
    }
    setIsSubscribed(false);
    setSubscribedEmail('');
    setTimeout(() => {
      notifyInputRef.current?.focus();
    }, 100);
  };

  const handleBoltClick = () => {
    setBoltAngle((prev) => prev + 45);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col items-center">
      {/* Fixed Overhead Ceiling Mount Girder & Anchor Eyelets */}
      <div className="w-full max-w-lg flex items-center justify-between px-6 sm:px-16 mb-[-2px] z-20 select-none pointer-events-none">
        {/* Left Ceiling Mount */}
        <div className="flex flex-col items-center group">
          <div className="w-7 sm:w-8 h-2.5 bg-[#252525] border border-white/20 rounded-t-sm shadow-sm" />
          <div className="w-4 h-4 rounded-full border-2 border-zinc-400 bg-[#161616] flex items-center justify-center -mt-1 shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          </div>
        </div>

        {/* Center Tension Span Indicator */}
        <div className="flex-1 mx-3 sm:mx-4 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Right Ceiling Mount */}
        <div className="flex flex-col items-center group">
          <div className="w-7 sm:w-8 h-2.5 bg-[#252525] border border-white/20 rounded-t-sm shadow-sm" />
          <div className="w-4 h-4 rounded-full border-2 border-zinc-400 bg-[#161616] flex items-center justify-center -mt-1 shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          </div>
        </div>
      </div>

      {/* Unified Suspended Assembly: Chains + Signboard Float Together in 100% Fluid Harmonic Sync */}
      <div
        id="suspended-hanging-assembly"
        className="w-full flex flex-col items-center animate-hanging"
      >
        {/* Connected Suspension Cables / Chain Links (Moving in Lockstep with Board) */}
        <div className="w-full max-w-lg flex justify-between px-6 sm:px-16 select-none z-10">
          {/* Left Suspension Cable */}
          <motion.div
            whileHover={{ scale: 1.06, rotate: -1.5 }}
            className="flex flex-col items-center cursor-pointer transition-transform"
            title="Suspension Cable (Rigid Linkage)"
          >
            <div className="w-3 h-3 rounded-full border border-zinc-400 bg-[#1F1F1F] -mb-1 shadow" />
            <div className="flex flex-col items-center gap-[1px]">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`left-link-${i}`}
                  className="w-2 h-3 sm:h-3.5 rounded-full border border-zinc-400/80 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.5)] hover:border-amber-400 transition-colors"
                />
              ))}
            </div>
            <div className="w-3.5 h-3.5 border-2 border-zinc-300 bg-[#222222] rounded-t-md -mt-1 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            </div>
          </motion.div>

          {/* Right Suspension Cable */}
          <motion.div
            whileHover={{ scale: 1.06, rotate: 1.5 }}
            className="flex flex-col items-center cursor-pointer transition-transform"
            title="Suspension Cable (Rigid Linkage)"
          >
            <div className="w-3 h-3 rounded-full border border-zinc-400 bg-[#1F1F1F] -mb-1 shadow" />
            <div className="flex flex-col items-center gap-[1px]">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`right-link-${i}`}
                  className="w-2 h-3 sm:h-3.5 rounded-full border border-zinc-400/80 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.5)] hover:border-amber-400 transition-colors"
                />
              ))}
            </div>
            <div className="w-3.5 h-3.5 border-2 border-zinc-300 bg-[#222222] rounded-t-md -mt-1 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            </div>
          </motion.div>
        </div>

        {/* Main Suspended Signboard - High-Definition Solid Dark Panel with Interactive Spotlight */}
        <div
          id="under-development-board"
          ref={boardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringBoard(true)}
          onMouseLeave={() => {
            setIsHoveringBoard(false);
            setMousePos(null);
          }}
          className="w-full relative rounded-2xl bg-[#141414] border border-[#2D2D2D] hover:border-[#3D3D3D] shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] p-5 sm:p-8 md:p-10 overflow-hidden transition-all duration-300"
        >
          {/* Dynamic Cursor Spotlight Radial Layer on Hover */}
          {mousePos && isHoveringBoard && (
            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100"
              style={{
                background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04), transparent 70%)`,
              }}
            />
          )}

          {/* Crisp Hazard Caution Stripes with Slide Motion on Board Hover */}
          <div
            className={`absolute top-0 inset-x-0 h-1.5 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_12px,#000000_12px,#000000_24px)] ${
              isHoveringBoard ? 'animate-stripes-active' : ''
            }`}
          />
          <div
            className={`absolute bottom-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_12px,#000000_12px,#000000_24px)] opacity-60 ${
              isHoveringBoard ? 'animate-stripes-active' : ''
            }`}
          />

          {/* Top Status Header with Interactive Mechanical Bolts */}
          <div className="relative z-10 flex items-center justify-between mb-5 sm:mb-6 text-xs text-zinc-400 font-mono gap-2 flex-wrap">
            {/* Left Interactive Bolt */}
            <div
              onClick={handleBoltClick}
              className="flex items-center gap-2 cursor-pointer group"
              title="Click to torque bolt"
            >
              <motion.span
                animate={{ rotate: boltAngle }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-3 h-3 rounded-full bg-[#262626] border border-white/40 group-hover:border-amber-400 flex items-center justify-center transition-colors shadow-sm"
              >
                <div className="w-1.5 h-[1px] bg-zinc-300" />
              </motion.span>
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase text-zinc-400 group-hover:text-zinc-200 font-medium transition-colors">
                REV-0.9 // STAGED
              </span>
            </div>

            {/* Pulsing Status Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold hover:bg-amber-500/15 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span>UNDER DEVELOPMENT</span>
            </div>

            {/* Right Interactive Bolt / Desk trigger */}
            <div
              onClick={onOpenInbox ? onOpenInbox : handleBoltClick}
              className="hidden xs:flex items-center gap-2 cursor-pointer group"
              title={onOpenInbox ? "Open Founder Desk Inbox" : "Click to torque bolt"}
            >
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase text-zinc-400 group-hover:text-amber-300 font-medium transition-colors">
                VELOIC DESK
              </span>
              <motion.span
                animate={{ rotate: -boltAngle }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-3 h-3 rounded-full bg-[#262626] border border-white/40 group-hover:border-amber-400 flex items-center justify-center transition-colors shadow-sm"
              >
                <div className="w-1.5 h-[1px] bg-zinc-300" />
              </motion.span>
            </div>
          </div>

          {/* Board Header & Construction Icon with Hover Elevation */}
          <div className="relative z-10 text-center flex flex-col items-center mb-6 sm:mb-8">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1F1F1F] border border-[#353535] hover:border-amber-500/50 flex items-center justify-center mb-4 sm:mb-5 text-amber-400 shadow-md cursor-pointer transition-colors"
            >
              <Construction className="w-7 h-7 sm:w-8 sm:h-8" />
            </motion.div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-3">
              Website is Under Development
            </h1>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-300 font-mono tracking-wide font-medium mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Content upload hona abhi baaki hai.</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed font-normal">
              We are currently staging the official release of Veloic. Brand identity and communication channels are live while platform modules and technical documentation are being prepared.
            </p>
          </div>

          {/* Staged Deployment Tracker / Content Upload Status with Hover Accents */}
          <div className="relative z-10 w-full bg-[#181818] rounded-xl border border-[#2B2B2B] p-3.5 sm:p-5 mb-5 sm:mb-6">
            <div className="flex items-center justify-between mb-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-400 pb-2 border-b border-[#2B2B2B]">
              <span className="font-semibold text-zinc-300">Staging Status</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Loader2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 animate-spin" /> In Progress
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {/* Active Item 1 */}
              <div className="flex items-center justify-between text-zinc-200 p-2 rounded-lg hover:bg-[#1E1E1E] transition-colors gap-2">
                <span className="flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                  <span className="font-sans font-medium text-[11px] sm:text-xs">Brand Name & Domain Resolution</span>
                </span>
                <span className="text-emerald-400 text-[9px] sm:text-[10px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                  ACTIVE
                </span>
              </div>

              {/* Active Item 2 */}
              <div className="flex items-center justify-between text-zinc-200 p-2 rounded-lg hover:bg-[#1E1E1E] transition-colors gap-2">
                <span className="flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                  <span className="font-sans font-medium text-[11px] sm:text-xs">Founder Direct Line & Dispatch System</span>
                </span>
                <span className="text-emerald-400 text-[9px] sm:text-[10px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                  ONLINE
                </span>
              </div>

              {/* Pending Upload Item 3 */}
              <div className="flex items-center justify-between text-amber-200 p-2 rounded-lg bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-colors gap-2">
                <span className="flex items-center gap-2 text-left">
                  <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 shrink-0 animate-pulse" />
                  <span className="font-sans font-medium text-[11px] sm:text-xs">Platform Content & Full Architecture Showcase</span>
                </span>
                <span className="text-amber-300 text-[9px] sm:text-[10px] font-semibold bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/40 shrink-0">
                  UPLOADING SOON
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              IMPLEMENTATION NOTIFY STATION (GET NOTIFIED ON CONTENT & FEATURE UPLOAD)
              ========================================================================= */}
          <div
            id="implementation-notify-station"
            className="relative z-10 w-full bg-[#181818] rounded-xl border border-[#2B2B2B] hover:border-[#383838] p-4 sm:p-5 mb-6 transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Bell className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white tracking-wide block">
                    Implementation Alerts
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-normal">
                    Get pinged the instant platform content and documentation go live
                  </span>
                </div>
              </div>

              {isSubscribed && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                  <Check className="w-3 h-3" />
                  ALERT SUBSCRIBED
                </span>
              )}
            </div>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1F1F1F] rounded-lg border border-[#333333] p-3 flex items-center justify-between gap-3 flex-wrap"
              >
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-zinc-300">
                    We will notify <strong className="text-white font-mono">{subscribedEmail}</strong> on launch.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResetSubscription}
                  className="text-[10px] font-mono text-zinc-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-4 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Change Email
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribeNotify} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  ref={notifyInputRef}
                  type="email"
                  required
                  placeholder="Enter your email for upload dispatch..."
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#111111] border border-[#2F2F2F] text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400 transition-colors font-mono"
                />
                <button
                  id="implementation-notify-btn"
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 shrink-0 shadow-sm"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Notify Me</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Founder Contact Station with Hover Enhancements */}
          <div className="relative z-10 bg-[#1C1C1C] rounded-xl border border-[#303030] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-widest text-white mb-1 font-semibold">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Founder Direct Channel</span>
              </div>
              <p className="text-xs text-zinc-400 font-normal">
                Need early access, partnerships, or immediate inquiries?
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2.5 justify-center w-full sm:w-auto">
              <button
                id="board-copy-email-btn"
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-initial px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg bg-[#252525] hover:bg-[#2C2C2C] border border-[#3C3C3C] text-[11px] sm:text-xs text-zinc-200 font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                title="Copy founder email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{founderEmail}</span>
                  </>
                )}
              </button>

              <button
                id="board-contact-founder-btn"
                onClick={onOpenContact}
                className="flex-1 sm:flex-initial px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-white hover:bg-zinc-100 text-black font-semibold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <span>Contact Founder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
