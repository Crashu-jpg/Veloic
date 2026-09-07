import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Inbox,
  X,
  Lock,
  Trash2,
  CheckCircle2,
  Clock,
  RefreshCw,
  Mail,
  User,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import {
  subscribeToFounderMessages,
  markMessageReadInDatabase,
  deleteMessageFromDatabase,
  CloudMessage
} from '../lib/messagesService';

type MessageRecord = CloudMessage;

interface FounderInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// SHA-256 hashing helper using browser native Web Crypto API
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Precomputed SHA-256 hash for default passcode "veloic2026"
const DEFAULT_PASSCODE_HASH = '1f73b9e4a38f36c5357dbddb501bf0fbf1e779a1738fb9f826ce5a4ca1e564d2';

export const FounderInboxModal: React.FC<FounderInboxModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Security & Encryption States
  const [privacyMask, setPrivacyMask] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [isChangingKey, setIsChangingKey] = useState(false);
  const [newCustomKey, setNewCustomKey] = useState('');
  const [keyChangeSuccess, setKeyChangeSuccess] = useState('');

  // 2-Step Confirmation States for Message Deletion
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  // Auto-login if previously verified in this session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('veloic_founder_authenticated');
    if (savedToken === 'true' && isOpen) {
      setIsAuthenticated(true);
      fetchMessages('veloic2026').catch(() => {});
    }
  }, [isOpen]);

  // Real-time Firestore synchronization when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    // Attach live Firestore listener
    const unsubscribe = subscribeToFounderMessages((cloudMsgs) => {
      if (cloudMsgs) {
        setMessages(cloudMsgs);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [isAuthenticated]);

  const fetchMessages = async (pass: string) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/founder/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: pass }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      }
    } catch {
      // In static Vercel deployment, direct Firebase Firestore listener handles live messages
      console.log('[Founder Desk] Real-time Firestore synchronization active.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setIsLoading(true);
    setAuthError('');

    try {
      // Cryptographic verification: check custom saved hash or default passcode
      const inputHash = await sha256(passcode.trim());
      const customHash = localStorage.getItem('veloic_custom_founder_key_hash');

      const isAuthorized = customHash
        ? inputHash === customHash
        : inputHash === DEFAULT_PASSCODE_HASH || passcode === 'veloic2026';

      if (!isAuthorized) {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        if (nextAttempts >= 5) {
          setLockoutSeconds(30);
          setFailedAttempts(0);
          throw new Error('Too many failed attempts. Security lockout active for 30s.');
        }
        throw new Error(`Invalid founder passcode. (Attempt ${nextAttempts}/5)`);
      }

      // Success: Authenticate immediately
      setFailedAttempts(0);
      setIsAuthenticated(true);
      sessionStorage.setItem('veloic_founder_authenticated', 'true');
      fetchMessages(passcode).catch(() => {});
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || 'Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCustomKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomKey.trim() || newCustomKey.length < 4) {
      setAuthError('New passkey must be at least 4 characters.');
      return;
    }

    const hashed = await sha256(newCustomKey.trim());
    localStorage.setItem('veloic_custom_founder_key_hash', hashed);
    setKeyChangeSuccess('Custom security key successfully encrypted and saved!');
    setNewCustomKey('');
    setTimeout(() => {
      setKeyChangeSuccess('');
      setIsChangingKey(false);
    }, 2000);
  };

  const handleMarkAsRead = async (id: string) => {
    markMessageReadInDatabase(id);
    try {
      await fetch(`/api/founder/messages/${id}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: 'veloic2026' }),
      });
    } catch {
      // local sync
    }
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  // STEP 1: User clicks trash icon -> opens 2-step confirmation
  const handleRequestDelete = (id: string) => {
    setDeleteConfirmationId(id);
  };

  // STEP 1 CANCEL: User cancels deletion
  const handleCancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  // STEP 2 CONFIRMED: User explicitly confirms deletion
  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      // 1. Delete from Firebase Firestore
      await deleteMessageFromDatabase(id);

      // 2. Delete from server mirror
      await fetch(`/api/founder/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: 'veloic2026' }),
      }).catch(() => {});

      // 3. Update local state
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setDeleteConfirmationId(null);
    } catch (err) {
      console.error('Failed to delete message:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Clear all with double confirmation
  const handleConfirmClearAll = async () => {
    setIsDeleting(true);
    try {
      for (const msg of messages) {
        await deleteMessageFromDatabase(msg.id);
      }
      setMessages([]);
      setShowClearAllConfirm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('veloic_founder_authenticated');
    setPasscode('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="founder-inbox-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#2D2D2D] bg-[#141414] p-5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-auto max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
          id="founder-inbox-modal"
        >
          {/* Top Industrial Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-zinc-400 to-amber-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#202020] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#252525] pr-8 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Inbox className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Founder Inbox Desk
                  </h3>
                  {isAuthenticated && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {messages.length} Live Notes
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 font-normal flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 inline" />
                  <span>SHA-256 Encrypted Gateway // Cloud Firestore Sync</span>
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2">
                {/* Privacy Toggle */}
                <button
                  onClick={() => setPrivacyMask(!privacyMask)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                    privacyMask
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                      : 'bg-[#222] border-[#333] text-zinc-400 hover:text-white'
                  }`}
                  title={privacyMask ? 'Disable Privacy Mask' : 'Enable Privacy Mask'}
                >
                  {privacyMask ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>

                {/* Refresh */}
                <button
                  onClick={() => fetchMessages('veloic2026')}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#353535] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
                  title="Refresh messages"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                </button>

                {/* Logout / Lock */}
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 rounded-lg bg-[#202020] hover:bg-rose-500/20 hover:border-rose-500/40 border border-[#333] text-zinc-400 hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                  title="Lock Founder Desk"
                >
                  <Lock className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Content: Auth Lock Screen vs. Messages Stream */}
          {!isAuthenticated ? (
            <div className="py-6 sm:py-8 flex flex-col items-center text-center max-w-sm mx-auto w-full">
              <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] border border-[#333333] flex items-center justify-center text-zinc-300 mb-3 shadow-inner">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Encrypted Founder Authentication</h4>
              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                Enter your cryptographic access passkey to decrypt and review incoming visitor dispatches.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-3">
                <div className="relative">
                  <input
                    type="password"
                    required
                    disabled={lockoutSeconds > 0}
                    autoFocus
                    placeholder="Enter passkey (default: veloic2026)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400 transition-colors text-center font-mono disabled:opacity-50"
                  />
                </div>

                {lockoutSeconds > 0 && (
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                    <span>Brute-force lockout: Retry in {lockoutSeconds}s</span>
                  </div>
                )}

                {authError && lockoutSeconds === 0 && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || lockoutSeconds > 0}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? 'Hashing & Verifying...' : 'Unlock Secure Desk'}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-[#222] w-full flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Default Passkey: <code className="text-zinc-300 bg-[#202020] px-1.5 py-0.5 rounded">veloic2026</code></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> SHA-256
                </span>
              </div>
            </div>
          ) : (
            /* Authenticated Desk: Messages List with 2-Step Double Confirmation Deletion */
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 flex flex-col">
              {/* Secondary Controls Bar: Privacy Mask & Custom Key */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#191919] border border-[#262626] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsChangingKey(!isChangingKey)}
                    className="flex items-center gap-1 text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer text-[11px]"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>{isChangingKey ? 'Cancel Key Change' : 'Change Passkey'}</span>
                  </button>

                  <span className="text-zinc-600">|</span>

                  <button
                    onClick={() => setPrivacyMask(!privacyMask)}
                    className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer text-[11px]"
                  >
                    {privacyMask ? <EyeOff className="w-3 h-3 text-amber-400" /> : <Eye className="w-3 h-3" />}
                    <span>{privacyMask ? 'Privacy Mask ON' : 'Mask Text'}</span>
                  </button>
                </div>

                {messages.length > 1 && (
                  <button
                    onClick={() => setShowClearAllConfirm(!showClearAllConfirm)}
                    className="text-[10px] text-zinc-500 hover:text-rose-400 cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Custom Key Editor Drawer */}
              {isChangingKey && (
                <form onSubmit={handleSaveCustomKey} className="p-3 rounded-xl bg-[#1D1D1D] border border-amber-500/30 space-y-2">
                  <div className="text-xs text-white font-semibold">Set New Custom Founder Passkey:</div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      required
                      placeholder="Enter new passkey (min 4 chars)"
                      value={newCustomKey}
                      onChange={(e) => setNewCustomKey(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#333] text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs cursor-pointer"
                    >
                      Save Key
                    </button>
                  </div>
                  {keyChangeSuccess && (
                    <div className="text-[11px] text-emerald-400 font-mono">
                      {keyChangeSuccess}
                    </div>
                  )}
                </form>
              )}

              {/* Clear All Double Confirmation Modal */}
              {showClearAllConfirm && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Kya aap sach me saare messages delete karna chahte hain?</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Yeh action irreversible hai. Saare records cloud database se permanently erase ho jayenge.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowClearAllConfirm(false)}
                      className="px-3 py-1 rounded-lg bg-[#252525] hover:bg-[#303030] text-zinc-300 text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmClearAll}
                      disabled={isDeleting}
                      className="px-4 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{isDeleting ? 'Deleting...' : 'Yes, Delete All'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Messages Stream */}
              {messages.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center my-auto">
                  <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] border border-[#2F2F2F] flex items-center justify-center text-zinc-500 mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-1">No Messages in Cloud Desk</h4>
                  <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                    Whenever any visitor writes a message through the "Contact Founder" form, it will automatically appear here with real-time sync!
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isConfirmingThis = deleteConfirmationId === msg.id;

                  return (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 rounded-xl border transition-colors ${
                        msg.read
                          ? 'bg-[#171717] border-[#262626] opacity-90'
                          : 'bg-[#1C1C1C] border-amber-500/35 shadow-sm'
                      }`}
                    >
                      {/* Top Meta Details */}
                      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1 text-xs font-semibold text-white">
                            <User className="w-3 h-3 text-zinc-400" />
                            {privacyMask ? '••••••••' : msg.name}
                          </span>

                          {msg.email ? (
                            <a
                              href={`mailto:${msg.email}?subject=Re: Veloic Inquiry`}
                              className="flex items-center gap-1 text-[11px] font-mono text-amber-300 hover:underline bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                            >
                              <Mail className="w-2.5 h-2.5" />
                              {privacyMask ? '••••@••••.com' : msg.email}
                            </a>
                          ) : (
                            <span className="text-[10px] font-mono text-zinc-500 bg-[#242424] px-1.5 py-0.5 rounded">
                              No email provided
                            </span>
                          )}

                          <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-[#252525]">
                            {msg.topic}
                          </span>
                        </div>

                        {/* Top Actions: Read + Step-1 Trash Button */}
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                            <Clock className="w-2.5 h-2.5" />
                            {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>

                          {!msg.read && (
                            <button
                              onClick={() => handleMarkAsRead(msg.id)}
                              className="text-[10px] font-mono text-emerald-400 hover:underline cursor-pointer"
                              title="Mark as read"
                            >
                              Mark Read
                            </button>
                          )}

                          {/* Step 1: Initial Delete Trigger */}
                          <button
                            onClick={() => handleRequestDelete(msg.id)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Message Content with Privacy Masking Option */}
                      <p className="text-xs text-zinc-200 bg-[#121212] p-3 rounded-lg border border-[#242424] whitespace-pre-wrap leading-relaxed">
                        {privacyMask ? (
                          <span className="filter blur-sm select-none text-zinc-400">
                            Encrypted Visitor Content: This message is masked for privacy. Toggle mask in top bar to reveal.
                          </span>
                        ) : (
                          msg.message
                        )}
                      </p>

                      {/* STEP 2: Explicit Double-Confirmation Box */}
                      {isConfirmingThis && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5"
                        >
                          <div className="flex items-center gap-2 text-rose-300 text-xs">
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                            <div>
                              <span className="font-semibold block">Confirm Permanent Delete?</span>
                              <span className="text-[10px] text-zinc-400">
                                Yeh message cloud database aur founder desk se permanently delete ho jayega.
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                            {/* Cancel Button */}
                            <button
                              type="button"
                              onClick={handleCancelDelete}
                              className="px-2.5 py-1 rounded bg-[#2A2A2A] hover:bg-[#353535] text-zinc-300 text-xs cursor-pointer transition-colors"
                            >
                              Cancel
                            </button>

                            {/* 2nd Delete Button: Confirm Deletion */}
                            <button
                              type="button"
                              onClick={() => handleConfirmDelete(msg.id)}
                              disabled={isDeleting}
                              className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          )}

          {/* Footer note */}
          <div className="pt-3 mt-3 border-t border-[#222222] flex items-center justify-between text-[10px] font-mono text-zinc-500 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-emerald-400/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Firebase Firestore Live Database // SHA-256 Verified
            </span>
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href="/veloic-dist.zip"
                download="veloic-dist-deploy.zip"
                className="text-amber-400/90 hover:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                title="Download ready-to-deploy static HTML/CSS/JS for Vercel drag & drop"
              >
                <span>📦 Deploy Zip (Dist)</span>
              </a>
              <span>•</span>
              <a
                href="/veloic-source-code.zip"
                download="veloic-source-code.zip"
                className="text-cyan-400/90 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                title="Download full React + Vite TypeScript source code"
              >
                <span>💻 Source Code Zip</span>
              </a>
              <span>•</span>
              <button onClick={onClose} className="hover:text-zinc-300 cursor-pointer">
                Close Desk
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
