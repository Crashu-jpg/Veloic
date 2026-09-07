import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  onOpenContact: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Architecture',
      question: 'What makes Veloic fundamentally faster than conventional cloud stacks?',
      answer:
        'Veloic replaces slow container virtualization and cold serverless runtimes with pre-warmed, memory-isolated microVMs deployed across 280+ anycast edge locations worldwide. Instead of routing traffic back to a centralized cluster, requests execute within 12ms of the end-user with instant hot-swapping.',
    },
    {
      id: 'faq-2',
      category: 'Deployment',
      question: 'Can I deploy Veloic apps to Vercel, Cloud Run, or custom domains?',
      answer:
        'Yes. Veloic projects are built on standard modern standards (TypeScript, Vite, React, standard ESM). You can deploy the web frontend instantly on Vercel, connect your custom domain with automatic SSL, and wire into Veloic high-speed edge nodes with a single command.',
    },
    {
      id: 'faq-3',
      category: 'Compatibility',
      question: 'Is migration difficult for existing Next.js, Node.js, or Go apps?',
      answer:
        'Zero code rewrites required. Veloic supports standard web runtimes and Docker/Wasm container specifications out of the box. Our migration CLI inspects your repository dependencies and provisions compatible edge configurations in under 3 minutes.',
    },
    {
      id: 'faq-4',
      category: 'Security',
      question: 'What security compliance and DDoS protections are included?',
      answer:
        'All Veloic clusters feature multi-terabit anycast DDoS mitigation, automatic TLS 1.3 key exchanges, hardware isolation envelopes, and end-to-end telemetry logging meeting SOC-2 Type II standards.',
    },
    {
      id: 'faq-5',
      category: 'Access',
      question: 'How do I request private founder access or pilot an enterprise cluster?',
      answer:
        'We work directly with founders and lead engineers during early access. Click the "Contact Founder" button or write directly to founder.veloic@gmail.com for priority onboarding and architecture reviews.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0D0D0D] border-b border-[#F9F9F9]/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#161616] border border-[#F9F9F9]/15 text-[#F9F9F9]/70 text-[10px] uppercase tracking-[0.3em] font-light mb-4">
            <HelpCircle className="w-3 h-3 text-[#F9F9F9]" />
            <span>Inquiries & Clarifications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#F9F9F9] tracking-tight font-serif" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            Frequently addressed inquiries.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F9F9F9]/60 font-light max-w-xl mx-auto leading-relaxed">
            Precise technical details regarding microVM architecture, custom domain deployments, and founder collaboration.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-[#F9F9F9]/15 bg-[#141414] overflow-hidden transition-all hover:border-[#F9F9F9]/30"
              >
                <button
                  id={`faq-toggle-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-normal font-serif text-[#F9F9F9] tracking-tight" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/15 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#F9F9F9] text-[#0D0D0D]' : 'text-[#F9F9F9]'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-[#F9F9F9]/65 leading-relaxed border-t border-[#F9F9F9]/10 font-light">
                        {faq.answer}
                        {index === 4 && (
                          <div className="mt-4 pt-3 border-t border-[#F9F9F9]/10">
                            <button
                              onClick={onOpenContact}
                              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F9F9F9] hover:underline cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Direct line: founder.veloic@gmail.com</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
