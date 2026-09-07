import React, { useState } from 'react';
import { Gauge, CheckCircle, ArrowRight, Zap, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

export const BenchmarkSection: React.FC = () => {
  const [metricTab, setMetricTab] = useState<'latency' | 'coldstart' | 'deploy'>('latency');

  const benchmarkData = {
    latency: {
      title: 'Global P99 Response Latency',
      unit: 'milliseconds (lower is better)',
      description: 'Measured across 50,000 synthetic requests from 40 countries.',
      items: [
        { name: 'Veloic Edge v2.4', value: 8.4, display: '8.4 ms', percent: 15, isWinner: true, color: 'bg-cyan-400' },
        { name: 'Standard Serverless Edge', value: 42.1, display: '42.1 ms', percent: 55, isWinner: false, color: 'bg-zinc-600' },
        { name: 'Traditional Cloud Containers', value: 98.6, display: '98.6 ms', percent: 100, isWinner: false, color: 'bg-zinc-700' },
      ],
      winText: '5.2x faster than standard serverless edge layers',
    },
    coldstart: {
      title: 'Cold Start Spin-Up Latency',
      unit: 'milliseconds (lower is better)',
      description: 'Time taken to initialize a completely cold microVM environment from scratch.',
      items: [
        { name: 'Veloic Warm-Pool VM', value: 0.1, display: '0.1 ms', percent: 8, isWinner: true, color: 'bg-emerald-400' },
        { name: 'Leading Edge Provider', value: 35.0, display: '35 ms', percent: 45, isWinner: false, color: 'bg-zinc-600' },
        { name: 'Standard Cloud Functions', value: 240.0, display: '240 ms', percent: 100, isWinner: false, color: 'bg-zinc-700' },
      ],
      winText: 'Virtually 0ms cold starts with patented pre-warmed memory paging',
    },
    deploy: {
      title: 'Git Push to Global Live Propagation',
      unit: 'seconds (lower is better)',
      description: 'Total elapsed time from `git push main` to 280+ POP active traffic routing.',
      items: [
        { name: 'Veloic Instant Mesh', value: 3.8, display: '3.8 s', percent: 12, isWinner: true, color: 'bg-indigo-400' },
        { name: 'Modern CI/CD Platform', value: 28.5, display: '28.5 s', percent: 58, isWinner: false, color: 'bg-zinc-600' },
        { name: 'Legacy Kubernetes Rollout', value: 185.0, display: '185.0 s', percent: 100, isWinner: false, color: 'bg-zinc-700' },
      ],
      winText: '7.5x faster global deployment loops for high-frequency teams',
    },
  };

  const current = benchmarkData[metricTab];

  return (
    <section id="benchmarks" className="py-24 bg-[#0D0D0D] border-b border-[#F9F9F9]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#161616] border border-[#F9F9F9]/15 text-[#F9F9F9]/70 text-[10px] uppercase tracking-[0.3em] font-light mb-4">
            <Gauge className="w-3 h-3 text-[#F9F9F9]" />
            <span>Empirical Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#F9F9F9] tracking-tight font-serif" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            Independent verification. Zero hand-waving.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F9F9F9]/60 font-light max-w-2xl mx-auto leading-relaxed">
            Real performance telemetry benchmarking Veloic against traditional cloud computing platforms.
          </p>

          {/* Metric Selector Tabs - Pill */}
          <div className="mt-8 inline-flex p-1 rounded-full bg-[#161616] border border-[#F9F9F9]/15 gap-1 text-xs">
            <button
              id="benchmark-tab-latency"
              onClick={() => setMetricTab('latency')}
              className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                metricTab === 'latency'
                  ? 'bg-[#F9F9F9] text-[#0D0D0D] font-medium shadow-sm'
                  : 'text-[#F9F9F9]/60 hover:text-[#F9F9F9]'
              }`}
            >
              P99 Latency
            </button>
            <button
              id="benchmark-tab-coldstart"
              onClick={() => setMetricTab('coldstart')}
              className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                metricTab === 'coldstart'
                  ? 'bg-[#F9F9F9] text-[#0D0D0D] font-medium shadow-sm'
                  : 'text-[#F9F9F9]/60 hover:text-[#F9F9F9]'
              }`}
            >
              Cold Starts
            </button>
            <button
              id="benchmark-tab-deploy"
              onClick={() => setMetricTab('deploy')}
              className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                metricTab === 'deploy'
                  ? 'bg-[#F9F9F9] text-[#0D0D0D] font-medium shadow-sm'
                  : 'text-[#F9F9F9]/60 hover:text-[#F9F9F9]'
              }`}
            >
              Deploy Velocity
            </button>
          </div>
        </div>

        {/* Benchmark Visual Card - Editorial Frame */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-[#F9F9F9]/15 bg-[#141414] p-8 sm:p-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F9F9F9]/10 gap-3">
            <div>
              <h3 className="text-2xl font-normal font-serif text-[#F9F9F9]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>{current.title}</h3>
              <p className="text-xs text-[#F9F9F9]/50 font-light mt-1">{current.description}</p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F9F9F9]/60 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/10 self-start sm:self-auto">
              Unit: {current.unit}
            </span>
          </div>

          {/* Bars */}
          <div className="py-8 space-y-6">
            {current.items.map((item, idx) => (
              <div key={idx} className="space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-sans ${item.isWinner ? 'text-[#F9F9F9] font-medium flex items-center gap-2.5' : 'text-[#F9F9F9]/50 font-light'}`}>
                    {item.name}
                    {item.isWinner && (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#F9F9F9] text-[#0D0D0D] font-semibold">
                        Veloic Lead
                      </span>
                    )}
                  </span>
                  <span className={`font-mono ${item.isWinner ? 'text-[#F9F9F9] font-semibold text-base' : 'text-[#F9F9F9]/50'}`}>
                    {item.display}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-[#1C1C1C] rounded-full overflow-hidden p-0.5 border border-[#F9F9F9]/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${item.isWinner ? 'bg-[#F9F9F9]' : 'bg-[#F9F9F9]/25'}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Advantage Banner */}
          <div className="pt-6 border-t border-[#F9F9F9]/10 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[#F9F9F9]/80 font-mono">
            <Zap className="w-4 h-4 text-[#F9F9F9] shrink-0" />
            <span>{current.winText}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
