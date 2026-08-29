import React, { useState, useRef } from 'react';
import {
  Bot,
  Copy,
  Check,
  Smartphone,
  Sliders,
  Terminal,
  Database,
  RefreshCw,
  Sparkles,
  Zap,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Play,
  Cpu,
  Layers,
  Globe,
  Code
} from 'lucide-react';

interface McpDocsSectionProps {
  soundEnabled: boolean;
}

interface AIClientConfig {
  id: string;
  name: string;
  badge: string;
  filePath: string;
  fileDetails?: string[];
  type: 'json' | 'cli';
  cliCommand?: string;
  getConfigJson: (ip: string, token: string) => string;
}

export const McpDocsSection: React.FC<McpDocsSectionProps> = ({ soundEnabled }) => {
  // Connection input defaults from real Android Settings screen
  const phoneIp = '192.168.20.6:8080';
  const authToken = 'ovld_f83904cd9b4a45ac9943b5a2';

  // Selected AI Client tab
  const [activeClientTab, setActiveClientTab] = useState<string>('antigravity');

  // Tab container ref for horizontal scrolling
  const tabsRef = useRef<HTMLDivElement>(null);

  // Copy feedback states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live MCP agent simulator state
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      playClickSound();
    }
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch {
      // Audio fallback
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playClickSound();
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const getEffectiveUrl = (ip: string) => {
    const trimmed = ip.trim() || '192.168.20.6:8080';
    return trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `http://${trimmed}`;
  };

  const getEffectiveToken = (token: string) => {
    return token.trim() || 'ovld_f83904cd9b4a45ac9943b5a2';
  };

  // Supported AI Clients list
  const aiClients: AIClientConfig[] = [
    {
      id: 'antigravity',
      name: 'Google Antigravity',
      badge: 'GEMINI 3.6',
      filePath: '~/.gemini/antigravity/mcp_config.json',
      type: 'json',
      getConfigJson: (ip, token) => `{
  "mcpServers": {
    "overload": {
      "command": "npx",
      "args": ["-y", "@jesv1n/overload-mcp-server"],
      "env": {
        "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
        "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
      }
    }
  }
}`
    },
    {
      id: 'cursor',
      name: 'Cursor',
      badge: 'IDE',
      filePath: 'Cursor Settings → Features → MCP or .cursor/mcp.json',
      type: 'json',
      getConfigJson: (ip, token) => `{
  "mcpServers": {
    "overload": {
      "command": "npx",
      "args": ["-y", "@jesv1n/overload-mcp-server"],
      "env": {
        "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
        "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
      }
    }
  }
}`
    },
    {
      id: 'claude-desktop',
      name: 'Claude Desktop',
      badge: 'DESKTOP',
      filePath: 'claude_desktop_config.json',
      fileDetails: [
        'macOS: ~/Library/Application Support/Claude/claude_desktop_config.json',
        'Windows: %APPDATA%\\Claude\\claude_desktop_config.json',
        'Linux: ~/.config/Claude/claude_desktop_config.json'
      ],
      type: 'json',
      getConfigJson: (ip, token) => `{
  "mcpServers": {
    "overload": {
      "command": "npx",
      "args": ["-y", "@jesv1n/overload-mcp-server"],
      "env": {
        "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
        "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
      }
    }
  }
}`
    },
    {
      id: 'claude-code',
      name: 'Claude Code (CLI)',
      badge: 'TERMINAL',
      filePath: '~/.claude.json or CLI Command',
      type: 'cli',
      cliCommand: 'claude mcp add overload -- npx -y @jesv1n/overload-mcp-server',
      getConfigJson: (ip, token) => `{
  "mcpServers": {
    "overload": {
      "command": "npx",
      "args": ["-y", "@jesv1n/overload-mcp-server"],
      "env": {
        "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
        "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
      }
    }
  }
}`
    },
    {
      id: 'opencode',
      name: 'OpenCode',
      badge: 'OPEN SOURCE',
      filePath: 'opencode.json or OpenCode Config',
      type: 'json',
      getConfigJson: (ip, token) => `{
  "mcp": {
    "servers": {
      "overload": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@jesv1n/overload-mcp-server"],
        "env": {
          "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
          "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
        }
      }
    }
  }
}`
    },
    {
      id: 'windsurf',
      name: 'Windsurf (Codeium)',
      badge: 'FLOW ENGINE',
      filePath: '~/.codeium/windsurf/mcp_config.json',
      type: 'json',
      getConfigJson: (ip, token) => `{
  "mcpServers": {
    "overload": {
      "command": "npx",
      "args": ["-y", "@jesv1n/overload-mcp-server"],
      "env": {
        "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
        "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
      }
    }
  }
}`
    },
    {
      id: 'cline',
      name: 'VS Code (Cline / Roo)',
      badge: 'VS CODE',
      filePath: 'cline_mcp_settings.json or roo_code_mcp_settings.json',
      type: 'json',
      getConfigJson: (ip, token) => `{
  "mcpServers": {
    "overload": {
      "command": "npx",
      "args": ["-y", "@jesv1n/overload-mcp-server"],
      "env": {
        "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
        "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
      }
    }
  }
}`
    },
    {
      id: 'zed',
      name: 'Zed Editor',
      badge: 'HIGH SPEED',
      filePath: '~/.config/zed/settings.json',
      type: 'json',
      getConfigJson: (ip, token) => `{
  "context_servers": {
    "overload": {
      "command": {
        "path": "npx",
        "args": ["-y", "@jesv1n/overload-mcp-server"],
        "env": {
          "OVERLOAD_API_URL": "${getEffectiveUrl(ip)}",
          "OVERLOAD_API_TOKEN": "${getEffectiveToken(token)}"
        }
      }
    }
  }
}`
    }
  ];

  const currentClient = aiClients.find((c) => c.id === activeClientTab) || aiClients[0];

  // Tool API Reference Data
  const mcpTools = [
    {
      name: 'fetch_exercise_library',
      category: 'READ ONLY • EXERCISE CATALOG',
      icon: Database,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgColor: 'bg-cyan-500/10',
      description: 'Fetches valid exercise IDs, muscle categories (Chest, Back, Legs, etc.), and equipment types needed for formulating new splits.'
    },
    {
      name: 'fetch_workout_history',
      category: 'READ ONLY • ANALYTICS & VOLUME',
      icon: Layers,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
      description: 'Retrieves completed sessions, volume totals, set metrics, and muscle group breakdowns for 7-day, 30-day, or all-time ranges.'
    },
    {
      name: 'fetch_current_splits',
      category: 'READ ONLY • ACTIVE ROUTINES',
      icon: Sliders,
      color: 'text-[#FC4C02]',
      borderColor: 'border-[#FC4C02]/30',
      bgColor: 'bg-[#FC4C02]/10',
      description: 'Inspects currently active workout groups and exercise sequences stored in your Android app.'
    },
    {
      name: 'replace_workout_splits',
      category: 'MUTATION • ATOMIC PHONE SYNC',
      icon: RefreshCw,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/10',
      description: 'Atomically replaces workout routines with newly generated, science-backed structured training splits straight to your app database.'
    }
  ];

  // Example Prompts Showcase
  const examplePrompts = [
    {
      title: '30-Day Hypertrophy Optimization',
      prompt: 'Analyze my last 30 days of Overload workout history and create an Upper/Lower 4-day hypertrophy split for me.',
      tag: 'HYPERTROPHY FOCUS'
    },
    {
      title: 'Targeted Weak Point Adjustment',
      prompt: 'Check my current Overload splits and adjust exercise order to prioritize shoulder development.',
      tag: 'CUSTOM ADJUSTMENT'
    },
    {
      title: 'Hybrid Marathon & Strength Plan',
      prompt: 'Formulate a 16-week half-marathon and strength training split and push it to my Overload app.',
      tag: 'HYBRID ENDURANCE'
    }
  ];

  // Simulation execution handler
  const startSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimStep(1);
    playClickSound();

    setTimeout(() => setSimStep(2), 1200);
    setTimeout(() => setSimStep(3), 2600);
    setTimeout(() => setSimStep(4), 4200);
    setTimeout(() => {
      setSimStep(5);
      setSimulating(false);
    }, 5800);
  };

  return (
    <section id="mcp-docs" className="py-28 px-6 md:px-12 bg-black relative border-t border-white/10 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#00F0FF]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-[600px] h-[600px] bg-[#FC4C02]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header & AI Personal Trainer Spotlight */}
        <div className="space-y-8">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs uppercase tracking-widest box-glow-cyan">
              <Bot className="w-4 h-4 text-[#00F0FF] animate-pulse" />
              FIRST AI-NATIVE FITNESS TRACKING APP
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              YOUR AI ASSISTANT IS NOW YOUR <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38bdf8] to-[#FC4C02] text-glow-cyan">
                PERSONAL TRAINER.
              </span>
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Connect Overload directly to your favorite AI IDEs or Desktop LLMs via the official Model Context Protocol (MCP) server. Allow agents to read workout metrics, evaluate fatigue, and program custom splits straight into your phone.
            </p>

            {/* NPM Package Pill */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-3 p-2 px-4 rounded-xl bg-zinc-900/90 border border-white/15 backdrop-blur-xl">
                <span className="font-mono text-xs text-zinc-400">NPM Package:</span>
                <code className="font-mono text-xs text-[#00F0FF] font-bold">@jesv1n/overload-mcp-server</code>
                <button
                  onClick={() => handleCopy('npx -y @jesv1n/overload-mcp-server', 'npm-pkg')}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'npm-pkg' ? <Check className="w-3.5 h-3.5 text-[#2DCC71]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* 3 Core Selling Points Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Selling Point 1 */}
            <div className="glass-card-cyan p-7 rounded-2xl space-y-4 relative group">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-[#00F0FF]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Context-Aware Split Creation
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Let AI analyze your last 30 days of training volume, set metrics, and frequency to formulate science-backed hypertrophy & strength routines tailored to your baseline.
              </p>
            </div>

            {/* Selling Point 2 */}
            <div className="glass-card-orange p-7 rounded-2xl space-y-4 relative group">
              <div className="w-12 h-12 rounded-xl bg-orange-950/60 border border-[#FC4C02]/40 flex items-center justify-center text-[#FC4C02]">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Two-Way Sync to Android
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                AI agents inspect your exercise library and program routines straight into your Android app via fast, zero-cloud local network sync.
              </p>
            </div>

            {/* Selling Point 3 */}
            <div className="glass-card p-7 rounded-2xl space-y-4 relative group border-t border-emerald-500/40">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Local & Secure Auth
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Uses local network IP pairing and ephemeral session token handshakes—your personal health and workout data remains strictly under your control.
              </p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE MCP SETUP GUIDE HUB */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" /> INTEGRATION GUIDE
              </div>
              <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight">
                2-STEP MCP SERVER SETUP
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-md">
              Pair your Android phone over your Wi-Fi network and configure your AI tool in under 60 seconds.
            </p>
          </div>

          {/* STEP 1: GET APP CONNECTION CREDENTIALS */}
          <div className="glass-card p-8 rounded-3xl space-y-6 relative overflow-hidden border border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00F0FF] text-black font-extrabold font-mono flex items-center justify-center text-sm shadow-lg shadow-[#00F0FF]/30">
                1
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#00F0FF]" /> STEP 1: GET APP CONNECTION CREDENTIALS
              </h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Instructions List */}
              <div className="lg:col-span-6 space-y-4">
                <ol className="space-y-4 font-sans text-sm text-zinc-300">
                  <li className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-white/10">
                    <span className="font-mono text-[#00F0FF] font-bold text-base">1.</span>
                    <div>
                      <strong className="text-white">Open Overload Settings</strong>
                      <p className="text-xs text-zinc-400 mt-0.5">Open the Overload app on your Android device and tap the <strong>Settings</strong> tab at the bottom right.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-white/10">
                    <span className="font-mono text-[#00F0FF] font-bold text-base">2.</span>
                    <div>
                      <strong className="text-white">Enable Local Server</strong>
                      <p className="text-xs text-zinc-400 mt-0.5">Toggle <span className="text-[#FC4C02] font-semibold">CONNECT OVER WI-FI</span> to ON under <strong>AGENTIC MCP API CONTROL</strong>.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-white/10">
                    <span className="font-mono text-[#00F0FF] font-bold text-base">3.</span>
                    <div>
                      <strong className="text-white">Copy Connection Credentials</strong>
                      <p className="text-xs text-zinc-400 mt-1">
                        • Copy <code className="text-[#00F0FF] bg-cyan-950/80 px-1.5 py-0.5 rounded font-mono font-bold">Active Endpoint</code> → maps to <code className="text-[#00F0FF] font-mono">OVERLOAD_API_URL</code><br/>
                        • Copy <code className="text-[#FC4C02] bg-orange-950/80 px-1.5 py-0.5 rounded font-mono font-bold">Master Secret</code> → maps to <code className="text-[#FC4C02] font-mono">OVERLOAD_API_TOKEN</code>
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Real Android Settings Screen Mockup Card with Direct Annotations */}
              <div className="lg:col-span-6">
                <div className="p-5 rounded-3xl bg-[#121212] border border-[#FC4C02]/30 shadow-2xl space-y-4 font-sans relative overflow-hidden">
                  
                  {/* Android Screen Top Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FC4C02] animate-pulse" />
                      <h5 className="text-xl font-bold text-[#FC4C02]">Settings</h5>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                      Server Active
                    </span>
                  </div>

                  {/* Settings Box Replicating Real App Screenshot */}
                  <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/10 space-y-3.5 text-xs">
                    {/* Wi-Fi Switcher */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono text-[10px] text-[#FC4C02] font-bold uppercase tracking-wider">
                          CONNECT OVER WI-FI
                        </div>
                        <div className="text-xs text-zinc-300">Enabled (LAN Subnet Access)</div>
                      </div>
                      {/* Toggle */}
                      <div className="w-10 h-5.5 rounded-full bg-[#FC4C02] p-0.5 flex items-center justify-end shadow-inner">
                        <div className="w-4.5 h-4.5 rounded-full bg-white shadow-md" />
                      </div>
                    </div>

                    {/* Warning Alert */}
                    <div className="p-3 rounded-xl bg-[#2a1d08] border border-[#FC4C02]/40 text-[11px] text-amber-200 flex items-start gap-2">
                      <span className="text-amber-400 text-xs">⚠️</span>
                      <p className="leading-snug">
                        Port 8080 is exposed to all devices on this Wi-Fi network. Please turn this off after completing your AI analysis session.
                      </p>
                    </div>

                    {/* Active Endpoint Field (Annotated) */}
                    <div className="space-y-1 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-zinc-400">Active Endpoint:</span>
                        <span className="font-mono text-[10px] text-[#00F0FF] font-bold bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/30">
                          📍 MAPS TO: OVERLOAD_API_URL
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/80 border border-[#00F0FF]/60 font-mono text-xs text-white">
                        <span className="font-bold text-[#00F0FF]">http://192.168.20.6:8080</span>
                        <span className="text-[10px] text-[#FC4C02] font-mono font-bold cursor-pointer hover:underline">Copy</span>
                      </div>
                    </div>

                    {/* Master Secret Field (Annotated) */}
                    <div className="space-y-1 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-zinc-400">Master Secret (Handshake Key):</span>
                        <span className="font-mono text-[10px] text-[#FC4C02] font-bold bg-[#FC4C02]/10 px-2 py-0.5 rounded border border-[#FC4C02]/30">
                          🔑 MAPS TO: OVERLOAD_API_TOKEN
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#27150c] border border-[#FC4C02]/60 font-mono text-xs text-[#FC4C02] space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold break-all">ovld_f83904cd9b4a45ac9943b5a2</span>
                          <span className="text-[10px] bg-[#FC4C02]/20 px-2 py-0.5 rounded text-[#FC4C02] font-bold shrink-0">Copy Key</span>
                        </div>
                        <div className="flex justify-end gap-3 text-[10px] text-zinc-400 pt-1.5 border-t border-white/5">
                          <span className="hover:text-white cursor-pointer">Revoke Sessions</span>
                          <span className="text-[#FC4C02] hover:underline cursor-pointer">Roll Secret</span>
                        </div>
                      </div>
                    </div>

                    {/* USB Cable ADB Option */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-zinc-400">USB Cable ADB Forward Command:</span>
                        <span className="text-zinc-400 cursor-pointer hover:text-white">Copy</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/60 font-mono text-[11px] text-zinc-300">
                        <code>adb forward tcp:8080 tcp:8080</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: CONFIGURE YOUR FAVORITE AI CLIENT */}
          <div className="glass-card p-8 rounded-3xl space-y-6 relative overflow-hidden border border-white/15">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FC4C02] text-black font-extrabold font-mono flex items-center justify-center text-sm shadow-lg shadow-[#FC4C02]/30">
                  2
                </div>
                <h4 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#FC4C02]" /> STEP 2: CONFIGURE YOUR FAVORITE AI CLIENT
                </h4>
              </div>

              <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-white/10">
                <Globe className="w-3.5 h-3.5 text-[#00F0FF]" /> 8 SUPPORTED AI CLIENTS
              </div>
            </div>

            {/* AI Client Tabs Header with Clean Inline Scroll Controls */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              {/* Scroll Left Button */}
              <button
                onClick={() => scrollTabs('left')}
                className="p-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-zinc-300 hover:text-white hover:border-[#00F0FF] hover:bg-zinc-800 transition-all shrink-0 cursor-pointer shadow-md flex items-center justify-center active:scale-95"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4 text-[#00F0FF]" />
              </button>

              {/* Horizontal Scrollable Tabs Container */}
              <div
                ref={tabsRef}
                className="flex-1 flex items-center gap-2.5 overflow-x-auto py-1 px-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent hover:scrollbar-thumb-[#00F0FF]/40 transition-colors"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0, 240, 255, 0.4) transparent' }}
              >
                {aiClients.map((client) => {
                  const isActive = activeClientTab === client.id;
                  return (
                    <button
                      key={client.id}
                      onClick={() => {
                        setActiveClientTab(client.id);
                        playClickSound();
                      }}
                      className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#00F0FF]/20 to-[#FC4C02]/20 text-white border border-[#00F0FF]/50 shadow-lg scale-[1.02]'
                          : 'bg-zinc-900/70 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span>{client.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-[#00F0FF] text-black font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                        {client.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Scroll Right Button */}
              <button
                onClick={() => scrollTabs('right')}
                className="p-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-zinc-300 hover:text-white hover:border-[#00F0FF] hover:bg-zinc-800 transition-all shrink-0 cursor-pointer shadow-md flex items-center justify-center active:scale-95"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4 text-[#00F0FF]" />
              </button>
            </div>

            {/* Active Code Block Container */}
            <div className="space-y-4">
              {/* Target File / Path Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-950 border border-white/10">
                <div className="space-y-1">
                  <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                    TARGET CONFIGURATION FILE LOCATION
                  </div>
                  <div className="font-mono text-xs text-[#00F0FF] font-bold flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                    {currentClient.filePath}
                  </div>
                  {currentClient.fileDetails && (
                    <div className="space-y-1 pt-1">
                      {currentClient.fileDetails.map((detail, idx) => (
                        <div key={idx} className="font-mono text-[10px] text-zinc-400">
                          • {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {currentClient.cliCommand && (
                    <button
                      onClick={() => handleCopy(currentClient.cliCommand!, 'cli-cmd')}
                      className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-200 font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'cli-cmd' ? <Check className="w-3.5 h-3.5 text-[#2DCC71]" /> : <Copy className="w-3.5 h-3.5 text-[#00F0FF]" />}
                      Copy CLI Command
                    </button>
                  )}

                  <button
                    onClick={() => handleCopy(currentClient.getConfigJson(phoneIp, authToken), 'config-json')}
                    className="px-4 py-2 rounded-lg bg-[#FC4C02] hover:bg-[#e04300] text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#FC4C02]/20 hover:scale-105 active:scale-95"
                  >
                    {copiedKey === 'config-json' ? (
                      <>
                        <Check className="w-4 h-4" /> COPIED!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> COPY CONFIG JSON
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Snippet Display */}
              {currentClient.cliCommand && (
                <div className="p-4 rounded-xl bg-black/90 border border-white/10 space-y-2">
                  <div className="font-mono text-[11px] text-zinc-500 uppercase">CLI Command Quick Add:</div>
                  <pre className="font-mono text-xs text-[#00F0FF] overflow-x-auto p-2 bg-zinc-950 rounded">
                    <code>{currentClient.cliCommand}</code>
                  </pre>
                </div>
              )}

              <div className="relative rounded-2xl bg-zinc-950 border border-white/15 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-white/10 font-mono text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FC4C02]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2DCC71]" />
                    <span className="ml-2 text-zinc-300">{currentClient.name} MCP Config</span>
                  </span>
                  <span className="text-[10px] text-zinc-500">JSON Format</span>
                </div>

                <pre className="p-5 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed">
                  <code>{currentClient.getConfigJson(phoneIp, authToken)}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* MCP TOOL API REFERENCE GRID */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" /> API CAPABILITIES
            </div>
            <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight">
              MCP TOOL API REFERENCE GRID
            </h3>
            <p className="text-sm text-zinc-400">
              The Overload MCP Server exposes 4 high-level atomic tools for agent exploration and training program updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mcpTools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className={`glass-card p-6 rounded-2xl space-y-4 border ${tool.borderColor} hover:scale-[1.01] transition-transform`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${tool.bgColor} border ${tool.borderColor} flex items-center justify-center ${tool.color}`}>
                        <ToolIcon className="w-5 h-5" />
                      </div>
                      <code className="font-mono text-base font-bold text-white">{tool.name}</code>
                    </div>

                    <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full border ${tool.borderColor} ${tool.bgColor} ${tool.color}`}>
                      {tool.category}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE AGENT DEMO & PROMPT SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Example Prompts Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs text-[#FC4C02] uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> READY-TO-USE PROMPTS
              </div>
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                EXAMPLE PROMPTS SHOWCASE
              </h3>
              <p className="text-xs text-zinc-400">
                Copy and paste these commands into Antigravity, Cursor, or Claude once connected to your phone:
              </p>
            </div>

            <div className="space-y-4">
              {examplePrompts.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPromptIndex(index)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedPromptIndex === index
                      ? 'bg-zinc-900/90 border-[#00F0FF]/60 shadow-lg shadow-[#00F0FF]/10'
                      : 'bg-zinc-950/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#00F0FF] font-bold">{item.title}</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5">
                      {item.tag}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-zinc-200 leading-relaxed italic mb-3">
                    "{item.prompt}"
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.prompt, `prompt-${index}`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedKey === `prompt-${index}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#2DCC71]" /> Copied Prompt
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#00F0FF]" /> Copy Prompt
                        </>
                      )}
                    </button>

                    <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                      Click to preview simulation <ChevronRight className="w-3 h-3 text-[#00F0FF]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Interactive Agent Execution Simulator */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#00F0FF]/30 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/20 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white uppercase">AI AGENT EXECUTION SIMULATOR</h4>
                    <span className="font-mono text-[10px] text-zinc-400">Live Overload Protocol Handshake Trace</span>
                  </div>
                </div>

                <button
                  onClick={startSimulation}
                  disabled={simulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#FC4C02] text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-lg"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  {simulating ? 'EXECUTING...' : 'RUN SIMULATION'}
                </button>
              </div>

              {/* Active Prompt Banner */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 font-mono text-[11px] text-zinc-300">
                <span className="text-zinc-500">// User Input Prompt:</span>
                <div className="text-white pt-1 italic">
                  "{examplePrompts[selectedPromptIndex].prompt}"
                </div>
              </div>

              {/* Execution Steps Trace */}
              <div className="space-y-3 font-mono text-xs min-h-[260px]">
                {/* Step 1: Network Connection */}
                <div className={`p-3 rounded-xl border transition-all ${simStep >= 1 ? 'bg-zinc-900 border-[#00F0FF]/40 text-zinc-200' : 'opacity-30 bg-zinc-950 border-white/5'}`}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#00F0FF] font-bold">1. NETWORK PAIRING HANDSHAKE</span>
                    {simStep >= 1 && <span className="text-[#2DCC71] text-[10px]">CONNECTED 200 OK</span>}
                  </div>
                  {simStep >= 1 && (
                    <div className="text-[10px] text-zinc-400 pt-1">
                      POST http://{phoneIp}/api/v1/auth • Token verified
                    </div>
                  )}
                </div>

                {/* Step 2: Fetch History Tool Call */}
                <div className={`p-3 rounded-xl border transition-all ${simStep >= 2 ? 'bg-zinc-900 border-emerald-500/40 text-zinc-200' : 'opacity-30 bg-zinc-950 border-white/5'}`}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold">2. TOOL: fetch_workout_history()</span>
                    {simStep >= 2 && <span className="text-[#2DCC71] text-[10px]">14 SESSIONS RETRIEVED</span>}
                  </div>
                  {simStep >= 2 && (
                    <div className="text-[10px] text-zinc-400 pt-1">
                      Volume: 42,500kg • Chest: 32 sets, Back: 28 sets, Legs: 24 sets
                    </div>
                  )}
                </div>

                {/* Step 3: AI Model Planning */}
                <div className={`p-3 rounded-xl border transition-all ${simStep >= 3 ? 'bg-zinc-900 border-purple-500/40 text-zinc-200' : 'opacity-30 bg-zinc-950 border-white/5'}`}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-purple-400 font-bold">3. LLM HYPERTROPHY REASONING</span>
                    {simStep >= 3 && <span className="text-purple-300 text-[10px]">SPLIT FORMULATED</span>}
                  </div>
                  {simStep >= 3 && (
                    <div className="text-[10px] text-zinc-400 pt-1">
                      Generated 4-day Upper/Lower Split with progressive set ramping logic.
                    </div>
                  )}
                </div>

                {/* Step 4: Atomic Sync to Android */}
                <div className={`p-3 rounded-xl border transition-all ${simStep >= 4 ? 'bg-zinc-900 border-[#FC4C02]/40 text-zinc-200' : 'opacity-30 bg-zinc-950 border-white/5'}`}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#FC4C02] font-bold">4. TOOL: replace_workout_splits()</span>
                    {simStep >= 4 && <span className="text-[#2DCC71] text-[10px]">PHONE SYNC SUCCESS</span>}
                  </div>
                  {simStep >= 4 && (
                    <div className="text-[10px] text-zinc-400 pt-1">
                      Pushed routines: [Upper A, Lower A, Upper B, Lower B] to Android SQLite DB!
                    </div>
                  )}
                </div>
              </div>

              {simStep === 5 && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center font-mono text-xs text-emerald-300 animate-fadeIn flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  PROFIT! Training split is active on your Android app!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
