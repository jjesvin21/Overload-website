import React, { useState, useEffect } from 'react';
import { Dumbbell, Menu, X, Volume2, VolumeX, Download } from 'lucide-react';

interface NavbarProps {
  onOpenDownload: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDownload,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 px-6 md:px-12 shadow-2xl border-b border-white/10'
          : 'bg-transparent py-5 px-6 md:px-12'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FC4C02] to-[#ff7738] p-0.5 shadow-lg shadow-[#FC4C02]/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0e0e0e] rounded-[10px] flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[#FC4C02] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              OVERLOAD
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
              LIQUID ATHLETIC ENGINE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs text-zinc-300 uppercase tracking-widest">
          <a href="#mcp-docs" className="text-[#00F0FF] hover:text-white transition-colors relative py-1 group flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
            MCP Server (AI)
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F0FF] group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#features" className="hover:text-[#FC4C02] transition-colors relative py-1 group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FC4C02] group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#heatmap" className="hover:text-[#FC4C02] transition-colors relative py-1 group">
            Heatmap Grid
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FC4C02] group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full bg-zinc-900/80 border border-white/10 hover:border-[#FC4C02]/50 text-zinc-400 hover:text-white transition-all"
            title={soundEnabled ? 'Disable Haptic Sound Effects' : 'Enable Haptic Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FC4C02]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* CTA Download Button */}
          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FC4C02] hover:bg-[#e04300] text-black font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#FC4C02]/25 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            DOWNLOAD APK
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onOpenDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FC4C02] text-black font-bold font-mono text-[11px]"
          >
            <Download className="w-3 h-3" />
            APK
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#0c0c0c]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-5 shadow-2xl animate-fadeIn">
          <a
            href="#mcp-docs"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm uppercase text-[#00F0FF] hover:text-white font-bold flex items-center gap-2"
          >
            ⚡ MCP Server (AI Agent Integration)
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm uppercase text-zinc-300 hover:text-[#FC4C02]"
          >
            Features
          </a>
          <a
            href="#heatmap"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm uppercase text-zinc-300 hover:text-[#FC4C02]"
          >
            Heatmap Grid
          </a>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full py-3 rounded-xl bg-[#FC4C02] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FC4C02]/20"
            >
              <Download className="w-4 h-4" />
              Download Android APK
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
