import React from 'react';
import { Dumbbell, ArrowUp, Sparkles, Download } from 'lucide-react';

interface FooterProps {
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-zinc-400 border-t border-white/10 relative overflow-hidden">
      {/* Bottom Orange Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#FC4C02]/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Main Pre-footer CTA */}
      <div className="py-24 px-6 md:px-12 text-center border-b border-white/10 relative z-10 space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FC4C02]/10 border border-[#FC4C02]/30 text-[#FC4C02] font-mono text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> NO SUBSCRIPTIONS • 100% ATHLETIC FOCUS
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          READY TO <span className="text-[#FC4C02] text-glow-orange">OVERLOAD?</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto font-normal">
          Join thousands of athletes tracking their progressive overload with military precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <button
            onClick={onOpenDownload}
            className="px-8 py-4 rounded-xl bg-[#FC4C02] hover:bg-[#e04300] text-black font-extrabold text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 box-glow-orange cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> DOWNLOAD FOR ANDROID
          </button>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FC4C02] flex items-center justify-center text-black">
            <Dumbbell className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-white text-base tracking-tight font-mono">
            OVERLOAD
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">
            FEATURES
          </a>
          <a href="#heatmap" className="hover:text-white transition-colors">
            HEATMAP
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-zinc-900 border border-white/10 hover:border-[#FC4C02] text-zinc-400 hover:text-white transition-all cursor-pointer"
          title="Scroll Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Copyright Bar */}
      <div className="py-6 border-t border-white/5 text-center font-mono text-[11px] text-zinc-600 uppercase tracking-widest relative z-10">
        © 2026 OVERLOAD APP. LIQUID GLASS ATHLETIC SYSTEM. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};
