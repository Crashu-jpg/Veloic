import React, { useState, useEffect } from 'react';
import { Terminal, Globe, Cpu, Play, Check, Copy, Activity, RefreshCw, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EdgeNode {
  city: string;
  code: string;
  latency: number;
  status: 'Optimal' | 'Active';
  region: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'latency' | 'pipeline' | 'config'>('latency');
  const [selectedNode, setSelectedNode] = useState<string>('hnd');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const edgeNodes: EdgeNode[] = [
    { city: 'San Francisco', code: 'sfo1', latency: 4, status: 'Optimal', region: 'North America' },
    { city: 'Tokyo', code: 'hnd', latency: 8, status: 'Optimal', region: 'Asia Pacific' },
    { city: 'Frankfurt', code: 'fra1', latency: 11, status: 'Optimal', region: 'Europe' },
    { city: 'London', code: 'lhr', latency: 9, status: 'Optimal', region: 'Europe' },
    { city: 'Singapore', code: 'sin1', latency: 12, status: 'Optimal', region: 'Asia Pacific' },
    { city: 'Sydney', code: 'syd1', latency: 17, status: 'Optimal', region: 'Oceania' },
  ];

  const configCode = `// veloic.config.ts
import { defineConfig } from '@veloic/runtime';

export default defineConfig({
  edge: {
    regions: 'global-adaptive',
    maxLatencyTargetMs: 15,
    autoHeal: true,
  },
  pipelines: {
    microVMs: 'sandboxed-tier1',
    cachePolicy: 'stale-while-revalidate-edge',
    compression: 'brotli-hyper',
  },
  security: {
    ddosProtection: 'adaptive-quantum',
    zeroTrustAuth: true,
  }
});`;

  const runPipelineSimulation = () => {
    setIsSimulating(true);
    setSimulatedLogs([]);

    const steps = [
      '⚡ [0.02s] Veloic CLI v2.4 initialized: targeted project detected',
      '📦 [0.41s] Compiling edge TypeScript bundle with native Turbopack engine',
      '🔒 [0.89s] MicroVM isolate sandbox initialized with zero-trust envelope',
      '🌐 [1.44s] Distributing artifacts to 280+ POP edge network nodes',
      '⚡ [2.12s] Hot-swap routing tables synchronized (0 dropped packets)',
      '✅ [2.95s] DEPLOYMENT COMPLETE -> https://app-production.veloic.dev (TTFB: 4.2ms)'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulatedLogs((prev) => [...prev, step]);
        if (index === steps.length - 1) {
          setIsSimulating(false);
        }
      }, (index + 1) * 450);
    });
  };

  useEffect(() => {
    if (activeTab === 'pipeline' && simulatedLogs.length === 0) {
      runPipelineSimulation();
    }
  }, [activeTab]);

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(configCode);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const currentNode = edgeNodes.find((n) => n.code === selectedNode) || edgeNodes[0];

  return (
    <section id="architecture" className="py-20 sm:py-28 relative bg-[#0D0D0D] border-b border-[#F9F9F9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#161616] border border-[#F9F9F9]/15 text-[#F9F9F9]/70 text-[10px] uppercase tracking-[0.3em] font-light mb-4">
            <Activity className="w-3 h-3 text-[#F9F9F9]" />
            <span>Interactive Runtime Diagnostic</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#F9F9F9] tracking-tight font-serif" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
            Real-time edge telemetry.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F9F9F9]/60 font-light max-w-2xl mx-auto leading-relaxed">
            Explore live edge latency metrics, trigger automated branch pipelines, and inspect zero-config infrastructure specifications.
          </p>
        </div>

        {/* High-Tech Terminal Window Container - Editorial Edition */}
        <div className="relative rounded-2xl border border-[#F9F9F9]/15 bg-[#141414] shadow-2xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#111111] border-b border-[#F9F9F9]/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F9F9F9]/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F9F9F9]/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F9F9F9]/20" />
              <span className="ml-3 font-mono text-[11px] text-[#F9F9F9]/50 uppercase tracking-widest hidden sm:inline">
                node://edge-cluster-01.veloic.network
              </span>
            </div>

            {/* View Switcher Tabs - Pill Design */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#1A1A1A] border border-[#F9F9F9]/10 text-xs">
              <button
                id="tab-latency-btn"
                onClick={() => setActiveTab('latency')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === 'latency'
                    ? 'bg-[#F9F9F9] text-[#0D0D0D] font-medium shadow-sm'
                    : 'text-[#F9F9F9]/60 hover:text-[#F9F9F9]'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Edge Ping</span>
              </button>

              <button
                id="tab-pipeline-btn"
                onClick={() => setActiveTab('pipeline')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === 'pipeline'
                    ? 'bg-[#F9F9F9] text-[#0D0D0D] font-medium shadow-sm'
                    : 'text-[#F9F9F9]/60 hover:text-[#F9F9F9]'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>Pipeline</span>
              </button>

              <button
                id="tab-config-btn"
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === 'config'
                    ? 'bg-[#F9F9F9] text-[#0D0D0D] font-medium shadow-sm'
                    : 'text-[#F9F9F9]/60 hover:text-[#F9F9F9]'
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span>Config</span>
              </button>
            </div>
          </div>

          {/* Terminal Body Content */}
          <div className="p-6 sm:p-8 min-h-[380px]">
            {/* TAB 1: LATENCY SIMULATOR */}
            {activeTab === 'latency' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Edge Node Selector */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F9F9F9]/50">
                      Global Edge Nodes
                    </span>
                    <span className="text-[10px] font-mono text-[#F9F9F9]/80">
                      Avg P99: 9.8ms
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {edgeNodes.map((node) => {
                      const isSelected = selectedNode === node.code;
                      return (
                        <button
                          key={node.code}
                          onClick={() => setSelectedNode(node.code)}
                          className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1E1E1E] border-[#F9F9F9] shadow-sm'
                              : 'bg-[#161616] border-[#F9F9F9]/10 hover:border-[#F9F9F9]/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-[#F9F9F9] uppercase">
                              {node.code}
                            </span>
                            <span className="text-xs font-mono font-medium text-[#F9F9F9]">
                              {node.latency}ms
                            </span>
                          </div>
                          <p className="text-xs text-[#F9F9F9]/70 mt-1 truncate font-sans">{node.city}</p>
                          <span className="inline-block text-[9px] text-[#F9F9F9]/40 uppercase tracking-widest font-mono mt-0.5">
                            {node.region}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Real-time Telemetry Dashboard */}
                <div className="lg:col-span-7 p-6 rounded-xl bg-[#0D0D0D] border border-[#F9F9F9]/10 font-mono text-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F9F9F9]/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#F9F9F9] animate-ping" />
                      <span className="text-[#F9F9F9] font-medium font-sans">
                        Node: {currentNode.city} [{currentNode.code.toUpperCase()}]
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-[#F9F9F9]/80 border border-[#F9F9F9]/15 text-[9px] font-mono tracking-widest uppercase">
                      Fiber Route Active
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-5">
                    <div className="p-3 rounded-lg bg-[#141414] border border-[#F9F9F9]/10">
                      <span className="text-[9px] text-[#F9F9F9]/50 uppercase tracking-wider block">TTFB</span>
                      <span className="text-xl font-normal text-[#F9F9F9] font-mono">{currentNode.latency}ms</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#141414] border border-[#F9F9F9]/10">
                      <span className="text-[9px] text-[#F9F9F9]/50 uppercase tracking-wider block">TLS Handshake</span>
                      <span className="text-xl font-normal text-[#F9F9F9] font-mono">1.2ms</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#141414] border border-[#F9F9F9]/10">
                      <span className="text-[9px] text-[#F9F9F9]/50 uppercase tracking-wider block">Packet Loss</span>
                      <span className="text-xl font-normal text-[#F9F9F9] font-mono">0.00%</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[#F9F9F9]/60 text-[11px] bg-[#141414] p-4 rounded-lg border border-[#F9F9F9]/5 font-mono">
                    <p className="text-[#F9F9F9]">&gt; veloic traceroute --target {currentNode.code}.edge.veloic.network</p>
                    <p>1. Local Gateway (0.1ms)</p>
                    <p>2. Anycast BGP Peering IXP (0.8ms)</p>
                    <p>3. Veloic High-Speed Dark Fiber Backbone (2.4ms)</p>
                    <p className="text-[#F9F9F9]">
                      4. {currentNode.city} Edge Gateway ({currentNode.latency}ms) [SYNCHRONIZED]
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE DEPLOY PIPELINE */}
            {activeTab === 'pipeline' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F9F9F9]/60">
                    <Zap className="w-3.5 h-3.5 text-[#F9F9F9]" />
                    <span>Real-time edge compilation & multi-region distribution</span>
                  </div>
                  <button
                    id="run-pipeline-btn"
                    onClick={runPipelineSimulation}
                    disabled={isSimulating}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-[#F9F9F9] text-[#0D0D0D] hover:bg-[#E5E5E5] transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {isSimulating ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    <span>{isSimulating ? 'Deploying...' : 'Run Pipeline'}</span>
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-[#0D0D0D] border border-[#F9F9F9]/10 font-mono text-xs text-[#F9F9F9]/80 min-h-[220px] space-y-2.5 overflow-x-auto">
                  {simulatedLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={
                        log.includes('COMPLETE')
                          ? 'text-[#F9F9F9] font-medium bg-[#1A1A1A] p-3 rounded-lg border border-[#F9F9F9]/20'
                          : log.includes('Distributing')
                          ? 'text-[#F9F9F9]'
                          : 'text-[#F9F9F9]/60'
                      }
                    >
                      {log}
                    </motion.div>
                  ))}
                  {isSimulating && (
                    <div className="flex items-center gap-2 text-[#F9F9F9] animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F9F9F9]" />
                      <span>Processing isolate stages...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: CONFIG SPEC */}
            {activeTab === 'config' && (
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#F9F9F9]/60 font-light">
                    Declarative TypeScript runtime configuration. 100% type-safe with zero YAML boilerplates.
                  </span>
                  <button
                    id="copy-terminal-config-btn"
                    onClick={handleCopyConfig}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-[#1A1A1A] hover:bg-[#222222] text-[#F9F9F9] border border-[#F9F9F9]/15 transition-colors cursor-pointer"
                  >
                    {copiedConfig ? (
                      <>
                        <Check className="w-3 h-3 text-[#F9F9F9]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 opacity-60" />
                        <span>Copy Spec</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-6 rounded-xl bg-[#0D0D0D] border border-[#F9F9F9]/10 font-mono text-xs sm:text-sm text-[#F9F9F9]/90 overflow-x-auto leading-relaxed">
                  <code>{configCode}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
