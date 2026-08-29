import React from 'react';
import { ArrowRight, Shield, Flame, Activity, Sparkles, ChevronDown } from 'lucide-react';
import { LiquidSphere3D } from './LiquidSphere3D';
import { HeroWebGLCanvas } from './HeroWebGLCanvas';

interface HeroProps {
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden bg-black">
      {/* Background WebGL Liquid Shader */}
      <HeroWebGLCanvas />

      {/* Hero Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FC4C02]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Announcement Badge */}
          <a
            href="#mcp-docs"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-[#00F0FF]/40 backdrop-blur-xl shadow-lg hover:border-[#00F0FF] transition-all group cursor-pointer box-glow-cyan"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF]" />
            </span>
            <span className="font-mono text-xs text-white tracking-wider uppercase flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              ⚡ NEW: Connect Overload to your AI Agent via MCP
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00F0FF] group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-black leading-[0.95] tracking-tighter uppercase text-white">
              SHATTER<br />
              YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC4C02] via-[#ff7d47] to-[#D4AF37] text-glow-orange">
                LIMITS.
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-zinc-400 font-normal max-w-xl leading-relaxed">
            High-performance workout tracking built for absolute athletic focus. Let AI agents analyze your history and program custom training routines directly into your phone via MCP.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onOpenDownload}
              className="group px-8 py-4 rounded-xl bg-[#FC4C02] hover:bg-[#e04300] text-black font-black text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 box-glow-orange cursor-pointer"
            >
              Download Android App
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#mcp-docs"
              className="px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#00F0FF]/40 text-[#00F0FF] font-extrabold font-mono text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer box-glow-cyan"
            >
              <Sparkles className="w-4 h-4" /> MCP AI DOCS
            </a>
          </div>

          {/* Metric Badges */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <Flame className="w-3.5 h-3.5 text-[#FC4C02]" />
                OVERLOAD
              </div>
              <div className="font-mono text-xl font-bold text-white">Automated</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <Shield className="w-3.5 h-3.5 text-[#2DCC71]" />
                PRIVACY
              </div>
              <div className="font-mono text-xl font-bold text-white">100% Local</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
                EXPORTS
              </div>
              <div className="font-mono text-xl font-bold text-white">Universal CSV</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Liquid Centerpiece & Floating Glass Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <LiquidSphere3D />

          {/* Floating Metric Pill 1 */}
          <div className="absolute top-10 -left-6 glass-card p-3.5 rounded-xl hidden sm:flex items-center gap-3 box-glow-orange animate-float">
            <div className="w-9 h-9 rounded-lg bg-[#FC4C02]/20 flex items-center justify-center border border-[#FC4C02]/40">
              <Flame className="w-5 h-5 text-[#FC4C02]" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                Bench Press PR
              </div>
              <div className="font-mono text-base font-extrabold text-white flex items-center gap-1">
                120.0 kg <span className="text-xs text-[#FC4C02] font-mono">+2.5kg</span>
              </div>
            </div>
          </div>

          {/* Floating Metric Pill 2 */}
          <div className="absolute -bottom-4 -right-4 glass-card p-3.5 rounded-xl hidden sm:flex items-center gap-3 border border-white/15 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/40">
              <Activity className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                Session Volume
              </div>
              <div className="font-mono text-base font-extrabold text-white">
                18,450 kg logged
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 pt-16 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <a href="#features" className="flex flex-col items-center gap-1.5 font-mono text-[11px] text-zinc-400 tracking-widest uppercase">
          EXPLORE COCKPIT
          <ChevronDown className="w-4 h-4 text-[#FC4C02] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
